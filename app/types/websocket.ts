// Outgoing chat message

export interface WsChatMessage {
  type: "chat";
  text: string;
}

// Outgoing system messages

export interface WsPayload {
  type:
    | "workflow.new"
    | "workflow.existing"
    | "workflow.close"
    | "workflow.cancel_stream";
  payload:
    | WsNewWorkflowMessage
    | WsOpenWorkflowMessage
    | WsCloseWorkflowMessage
    | WsCancelStreamMessage;
  agentId?: string;
  workflowId?: string;
}

export interface WsNewWorkflowMessage {
  type: "workflow.new";
}

export interface WsOpenWorkflowMessage {
  type: "workflow.open";
  workflowId: string;
}

export interface WsCloseWorkflowMessage {
  type: "workflow.close";
}

export interface WsCancelStreamMessage {
  type: "workflow.cancel_stream";
}

// Incoming system messages

export interface WsResponseChatOpen {
  type: "workflow.open";
  chatId: string;
}

export interface WsResponseChatClosed {
  type: "workflow.closed";
}

// Incoming system events

export interface WsResponseAgentDeactivated {
  type: "event.agent.deactivated";
}

// Incoming chat messages

export interface WsResponseChatTitle {
  type: "chat.title";
  chatId: string;
  title: string;
}

export interface WsResponseFinishEvent {
  type: "workflow.stream_complete";
  workflowId: string;
  messageGroupId: string;
  reason: string;
  content: string | null;
  attachmentPaths: string[] | null;
}

export interface WsResponseStreamChunk {
  type: "workflow.stream_chunk";
  chunk: string;
}

export interface WsResponseError {
  errorType: "API" | "Internal";
  errorReason: string;
  errorDescription: string;
}
