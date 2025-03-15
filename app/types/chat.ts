import type { SingleAgent } from "~/types/agent.ts";
import type { User } from "~/types/users";
import type { MonthName } from "~/components/EndUser/Chat/ChatListTimeLabel.vue";

export interface Message {
  // Model fields
  id: string;
  messageGroupId: string;
  order: number;
  senderType: "user" | "assistant" | "tool";
  content: string;
  finishReason: string;
  toolCallId: string;
  // JSON string
  toolCalls: string;
  createdAt: string;
  updatedAt: string;

  // Fields for display purposes
  errorType?: string;
  errorReason?: string;
  displayMessage?: string;
}

export interface MessageGroupAggregate {
  id: string;
  group: MessageGroup;
  messages: Message[];
}

export interface MessageGroup {
  id: string;
  agentConfigurationId: string;
  chatId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatConfig {
  id: string;
  chatId: string;
  model: string;
  streaming: boolean;
  temperature: number;
  language: string;
  createdAt: string;
  updatedAt: string;
}

export interface Chat {
  id: string;
  userId: string;
  username: string;
  agentId: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
  config: ChatConfig;
}

export interface GroupedChats {
  today: Chat[];
  yesterday: Chat[];
  last7days: Chat[];
  last30days: Chat[];
  monthsThisYear: Partial<Record<MonthName, Chat[]>>;
  lastYear: Chat[];
  older: Chat[];
}
export interface ChatsResponse {
  items: Chat[];
  total: number;
}

export interface AdminChatsResponse {
  items: AdminChatDetails[];
  total: number;
}

export interface AdminChatDetails {
  agent: SingleAgent;
  chat: Chat;
  user: User;
}

export interface EndUserChatDetails {
  agent: SingleAgent;
  chat: Chat;
}

export interface EditChatTitlePayload {
  title: string;
}

export interface ChatListFilterForm {
  userId: undefined | string;
  agentId: undefined | string;
}
