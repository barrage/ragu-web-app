export interface AgentSettingsResponse {
  CHAT_MAX_HISTORY_TOKENS: SettingsItems
  AGENT_PRESENCE_PENALTY: SettingsItems
  AGENT_TITLE_MAX_COMPLETION_TOKENS: SettingsItems
  AGENT_SUMMARY_MAX_COMPLETION_TOKENS: SettingsItems
  WHATSAPP_AGENT_MAX_COMPLETION_TOKENS: SettingsItems
}

export interface SettingsItems {
  name: string
  value: string
  createdAt: null
  updatedAt: null
}
