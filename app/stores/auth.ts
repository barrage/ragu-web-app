import { defineStore } from "pinia";
import { ref } from "vue";
import { useNuxtApp } from "#app";
import type { User } from "~/types/auth";

export const useAuthStore = defineStore("auth", () => {
  // CONSTANTS
  const { $api } = useNuxtApp();

  // STATE

  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => user.value !== null);
  const iscurrentUserLoading = ref<boolean>(true);

  const isAdmin = computed(() => {
    return user.value?.entitlements?.includes("admin") ?? false;
  });

  // ACTIONS

  /**
   * Get the current user instance, or redirect to the login page if not authenticated.
   */
  async function GET_CurrentUser() {
    iscurrentUserLoading.value = true;

    if (user.value !== null) {
      return;
    }

    try {
      const { user: currentUser, expiresAt } = await $api.auth.GetCurrentUser();
      user.value = currentUser;
      const expiresIn = expiresAt - Math.round(Date.now() / 1000);
      if (expiresIn > 30) {
        console.log("Setting refresh timeout:", (expiresIn - 30) * 1000);
        setTimeout($api.auth.Refresh, (expiresIn - 30) * 1000);
      } else {
        $api.auth.Refresh();
      }
    } catch (error) {
      console.error("Failed fetch current user", error);
      user.value = null;
    } finally {
      iscurrentUserLoading.value = false;
    }
  }

  /**
   * Logout the current user.
   */
  async function POST_Logout() {
    await $api.auth.Logout();
    user.value = null;
  }

  async function initializeAuth(): Promise<void> {
    if (!user.value) {
      await GET_CurrentUser();
    }
  }

  return {
    user,
    isAuthenticated,
    iscurrentUserLoading,
    isAdmin,
    POST_Logout,
    GET_CurrentUser,
    initializeAuth,
  };
});
