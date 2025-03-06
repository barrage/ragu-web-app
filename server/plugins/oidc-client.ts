import * as client from "openid-client";

/**
 * Runs the discovery request once and hooks the server configuration to the context
 * of requests.
 */
export default defineNitroPlugin(async (nitroApp) => {
	const config = useRuntimeConfig();

	const authServer = new URL(config.public.oauthEndpoint);
	const clientId = config.public.oauthClientId;
	const clientSecret = config.server.oauthClientSecret;

	const oidcConfig = await client.discovery(authServer, clientId, clientSecret);

	nitroApp.hooks.hook("request", (event) => {
		event.context.oidcConfig = oidcConfig;
	});

	console.log("OIDC discovery plugin configured");
});
