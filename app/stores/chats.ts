import { defineStore } from "pinia";
import type {
  AdminChatDetails,
  AdminChatsResponse,
  Chat,
  ChatsResponse,
  EndUserChatDetails,
  Message,
} from "~/types/chat.ts";

export const useChatStore = defineStore("chat", () => {
  // State
  const chats = ref<Chat[]>([]);
  const chatsResponse = ref<ChatsResponse | null>(null);
  const messages = ref<Message[]>();
  const selectedChat = ref<EndUserChatDetails | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const isWebSocketStreaming = ref(false);
  const route = useRoute();
  const currentChatId = computed(() => {
    const chatId = route.params.chatId;
    return Array.isArray(chatId) ? chatId[0] : chatId || null;
  });
  const hasChats = computed(() => chats.value.length > 0);
  const { $api } = useNuxtApp();

  /* API */

  async function GET_ChatMessages(chatId: string): Promise<Message[]> {
    const data = await $api.chat.GetChatMessages(chatId);

    if (data) {
      return (messages.value = data.items
        .reverse()
        .flatMap((group) =>
          group.messages.toSorted((a, b) => a.order - b.order),
        ));
    } else {
      return [];
    }
  }

  async function GET_Chat(chatId: string): Promise<EndUserChatDetails | null> {
    try {
      const data = await $api.chat.GetEndUserChat(chatId);
      if (data) {
        return (selectedChat.value = data);
      } else {
        selectedChat.value = null;
        return null;
      }
    } catch (error) {
      console.error("Failed to fetch agents:", error);
      selectedChat.value = null;
      return null;
    }
  }

  async function GET_AllChats(): Promise<ChatsResponse | null> {
    const data = await $api.chat.GetAllChats();

    if (data) {
      chats.value = data.items;
      return (chatsResponse.value = data);
    } else {
      return (chatsResponse.value = null);
    }
  }

  /**
   * Fetches a paginated and sorted list of chats.
   * @param page - The page number to fetch.
   * @param perPage - The number of chats per page.
   * @param sortBy - The field to sort by (e.g., 'title').
   * @param sortOrder - The order of sorting ('asc' or 'desc').
   *  @param userId - Optional parametar for specific user chats.
   * @returns A promise that resolves to an ChatsResponse type or null.
   */
  const adminAllChatsResponse = ref<AdminChatsResponse | null>(null);
  const adminAllChatsData = ref<AdminChatDetails[]>([]);
  async function GET_AllAdminChats(
    page: number = 1,
    perPage: number = 10,
    sortBy: string = "firstName",
    sortOrder: "asc" | "desc" = "desc",
    userId?: string,
  ): Promise<AdminChatsResponse | null> {
    try {
      const data = await $api.chat.GetAllAdminChats(
        page,
        perPage,
        sortBy,
        sortOrder,
        userId,
      );

      if (data) {
        adminAllChatsData.value = data.items;
        adminAllChatsResponse.value = data;
        return data;
      } else {
        adminAllChatsData.value = [];
        adminAllChatsResponse.value = null;
        return null;
      }
    } catch (error) {
      console.error("Error fetching admin chats:", error);
      adminAllChatsData.value = [];
      adminAllChatsResponse.value = null;
      throw error;
    }
  }

  const selectedBoChatDetails = ref<AdminChatDetails | null>(null);

  const setSelectedBoChatDetails = (chat: AdminChatDetails | null) => {
    return (selectedBoChatDetails.value = chat);
  };

  const getChatById = (chatId: string) => {
    return chats.value?.find((chat) => chat.id === chatId) || null;
  };

  async function DELETE_Chat(chatId: string): Promise<void> {
    await $api.chat.DeleteChat(chatId);
  }

  async function DELETE_ChatBackoffice(chatId: string): Promise<void> {
    await $api.chat.DeleteChatBackoffice(chatId);
  }
  async function PUT_UpdateChatTitle(
    chatid: string,
    newChatTitle: string,
  ): Promise<void> {
    await $api.chat.PutUpdateChatTitle(chatid, newChatTitle);
  }
  async function PUT_UpdateChatTitleBackoffice(
    chatid: string,
    newChatTitle: string,
  ): Promise<void> {
    await $api.chat.PutUpdateChatTitleBackoffice(chatid, newChatTitle);
  }

  return {
    chats,
    messages,
    isLoading,
    error,
    hasChats,
    selectedChat,
    isWebSocketStreaming,
    GET_ChatMessages,
    GET_AllChats,
    getChatById,
    currentChatId,
    GET_AllAdminChats,
    adminAllChatsData,
    adminAllChatsResponse,
    selectedBoChatDetails,
    setSelectedBoChatDetails,
    DELETE_Chat,
    DELETE_ChatBackoffice,
    PUT_UpdateChatTitle,
    PUT_UpdateChatTitleBackoffice,
    GET_Chat,
  };
});
