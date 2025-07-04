import { createError } from "h3";
import FetchFactory from "../fetchFactory";
import type { User } from "~/types/auth";

export default class AuthService extends FetchFactory {
  /**
   * Generates default headers for API requests.
   *
   * @param {Record<string, string>} [additionalHeaders] Optional additional headers to merge with the default headers.
   * @returns {Record<string, string>} The merged headers object, including default headers and any additional ones passed.
   */
  private getDefaultHeaders(
    additionalHeaders: Record<string, string> = {},
  ): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...additionalHeaders,
    };

    if (process.dev) {
      const token = useCookie("access_token")?.value;
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    return headers;
  }

  /**
   * Logs out the current authenticated user.
   * @returns A promise that resolves to a success message upon successful logout.
   * @throws Will throw an error if the request fails.
   */
  async Logout(): Promise<void> {
    if (!useRuntimeConfig().public.enableAuth) {
      return;
    }

    try {
      await fetch("/api/oauth/logout", {
        credentials: "include",
        method: "GET",
        headers: this.getDefaultHeaders(),
      });
    } catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || "Failed to logout",
      });
    }
  }

  /**
   * Fetches the current authenticated user's information.
   * @returns A promise that resolves to a User object containing the user's details.
   * @throws Will throw an error if the request fails.
   */
  async GetCurrentUser(): Promise<{ user: User; expiresAt: number }> {
    if (!useRuntimeConfig().public.enableAuth) {
      return {
        user: {
          id: "admin",
          fullName: "admin",
          email: "admin@ragu.com",
          avatar: undefined,
          entitlements: ["admin"],
        },
        expiresAt: Math.floor(new Date(8640000000000000).getTime() / 1000),
      };
    }

    try {
      const response = await fetch("/api/oauth/user", {
        credentials: "include",
        headers: this.getDefaultHeaders(),
        method: "GET",
      });

      if (response.status !== 200) {
        throw createError({
          statusCode: response.status,
          statusMessage: "Failed to fetch current user",
        });
      }

      const { user, expiresAt } = await response.json();

      return {
        user: {
          id: user.sub,
          fullName: user.name,
          email: user.email,
          avatar: user.avatar,
          entitlements: user.entitlements,
        },
        expiresAt,
      };
    } catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || "Failed to fetch current user",
      });
    }
  }

  /**
   * Fetches all users from Autentik.
   * @returns A promise that resolves to an array of User objects.
   * @throws Will throw an error if the request fails.
   */

  async GetAllUsers(): Promise<any[]> {
    try {
      const response = await fetch("/api/oauth/users", {
        credentials: "include",
        method: "GET",
        headers: this.getDefaultHeaders(),
      });

      if (response.status !== 200) {
        throw createError({
          statusCode: response.status,
          statusMessage: "Failed to fetch users",
        });
      }

      return await response.json();
    } catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || "Failed to fetch users",
      });
    }
  }

  Refresh = async (): Promise<void> => {
    if (!useRuntimeConfig().public.enableAuth) {
      return;
    }

    try {
      const response = await fetch("/api/oauth/refresh", {
        credentials: "include",
        headers: this.getDefaultHeaders(),
        method: "GET",
      });

      if (response.status !== 200) {
        throw createError({
          statusCode: response.status,
          statusMessage: "Failed to refresh token",
        });
      }

      response.json().then(({ expiresIn }) => {
        const timeout =
          expiresIn > 30 ? (expiresIn - 30) * 1000 : expiresIn * 1000;
        console.log(`refreshing in: ${timeout / 1000}s`);
        setTimeout(this.Refresh, timeout);
      });
    } catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || "Failed to refresh token",
      });
    }
  };
}
