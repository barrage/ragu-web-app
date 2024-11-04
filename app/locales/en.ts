import { textProps } from 'element-plus'

export default {

  details: 'Details',
  chatDock: 'Chat panel',
  login: {
    title: 'Login',
    description: 'Choose a login method',
    continueWith: 'Continue with',
  },
  timePeriod: {
    today: 'Today',
    yesterday: 'Yesterday',
    last7days: 'Last 7 days',
    last30days: 'Last 30 days',
    lastYear: 'Last year',
  },
  profileDropdown: {
    switchToAdmin: 'Switch to Admin',
    switchToUser: 'Switch to User',
    profile: 'Profile',
    settings: 'Settings',
    agents: 'Agents',
    support: 'Support',
    signOut: 'Sign out',
  },
  getHelp: {
    title: 'Get help',
  },
  chat: {
    user: 'User',
    assistant: 'Assistant',
    admin: {
      title: 'Chats',
      description: 'Manage all your chats in one place',
      chat_card: {
        created_at: 'Created At',
        updated_at: 'Updated At',
        view_details: 'View Details',
        edit_chat: 'Edit Chat',
        delete_chat: 'Delete Chat',
      },
      chat_details: {
        title: 'Chat Details',
        description: 'View all details related to this chat',
      },
    },
    edit_title: {
      title: 'Edit Title',
      title_label: 'Title',
      title_placeholder: 'Please enter a new title',
      notifications: {
        success_title: 'Title successfully updated',
        success_description: 'Chat title has been successfully updated.',
        error_title: 'Error',
        error_description: 'An error occurred while setting the new chat title.',
      },
    },
    delete_chat: {
      title: 'Delete Chat',
      description: 'Are you sure you want to delete the chat?',
      notifications: {
        success_title: 'Successfully deleted',
        success_description: 'The chat has been successfully deleted.',
        error_title: 'Error',
        error_description: 'An error occurred while deleting the chat.',
      },
    },
    chatInputPlaceholder: 'Send a message',
    chatHistory: 'Chat history',
    newChat: {
      title: 'New chat',
      description: 'Choose an agent to start a chat with',
      choseFrom: 'Agents:',
    },
  },
  documents: {
    title: 'Documents',
    description: 'Manage and organize all documents that help AI in learning.',
    name: 'Name',
    extension: 'Format',
    path: 'Location',
    source: 'Source',
    id: 'Document ID',
    hash: 'Hash',

    notifications: {
      create: {
        success_title: 'New Document',
        success_description: 'Successfully created a new document',
        error_title: 'New Document',
        error_description: 'Error occurred while adding',
        error_existing_document_title: 'Existing Document',
        error_existing_document_description: 'This document already exists',
        error_file_size_title: 'File Size Issue',
        error_file_size_description: 'File size cannot exceed 50 MB!',
        error_file_type_title: 'File Format Issue',
        error_file_type_description: 'File must be in PDF, TXT, JSON, or DOCX format!',
      },
    }
    ,

  },
  users: {
    title: 'Users',
    description: 'Manage team members of your organization and set their access level',
    invite_user: 'Invite user',
    form: {
      first_name: 'First Name',
      first_name_placeholder: 'Enter first name',
      last_name: 'Last Name',
      last_name_placeholder: 'Enter last name',
      email: 'Email',
      email_placeholder: 'Enter email address',
      role: 'Role',
      role_placeholder: 'Select a role for the user',
      submit: 'Submit',
      cancel: 'Cancel',
      rules: {
        required: 'This field is required',
        invalid_email: 'Invalid email format',
      },
    },

    notifications: {
      create_error_title: 'User Addition Error',
      create_error_description: 'Failed to add a new user.',
      create_error_existing_user_description: 'User already exists.',
      delete_title: 'Success',
      update_title: 'Success',
      delete_message: 'User {name} is deleted!',
      create_title: 'Success',
      create_message: 'User {name} is created!',
      form_title: 'Form Error',
      form_message: 'Please fix the highlighted errors in the form.',
      invalid_user: 'Oops! Something went wrong. The user you are trying to delete doesn’t seem to exist.',
    },
    user_card: {
      role: 'Role',
      status: 'Status',
      active_status: 'Active',
      inactive_status: 'Inactive',
      created_at: 'Created at',
      view_more: 'View user details',
      edit_user: 'Edit user',
      delete_user: 'Delete user',
      adminRole: 'Administrator',
      userRole: 'User',
      updated_at: 'Updated at',
      user_id: 'User ID',
      first_name: 'First Name',
      last_name: 'Last Name',
      username: 'Username',
      email: 'Email',
    },
  },
  dashboard: {
    title: 'Dashboard',
    description: '',
  },
  agents: {
    title: 'Agents',
    titles: {
      mainTitle: 'Agents',
      details: 'Agent Details',
      description: 'Manage the agents responsible for interacting with the AI',
      edit: 'Edit Agent',
      create: 'Create Agent',
      createDescription: 'Create your new agent by providing their name and context to get started!',
      deleteTitle: 'Delete agent?',
      deleteDescription: 'Are you sure you want to delete agent?',
    },
    agent_card: {
      unknown_id: 'Unknown agent id',
      unknown_agentname: 'Unknown agent name',
      unknown_agentcontext: 'Missing agent context',
      unknown_description: 'Missing agent description',
      unknown_llmProvider: 'Unknown llmProvider',
      unknown_model: 'Unknown model',
      unknown_language: 'Unknown language',
      unknown_temperature: 'Unknown temperature',
      unknown_vectorProvider: 'Unknown vectorProvider',
      unknown_embeddingProvider: 'Unknown embeddingProvider',
      unknown_embeddingModel: 'Unknown embeddingModel',
      unknown_date: 'Unknown date',
      active_status: 'Active',
      inactive_status: 'Inactive',
      created_at: 'Unknown Date',
      edit_agent: 'Edit agent',
      delete_agent: 'Delete agent',
      view_more: 'View agent details',
    },
    labels: {
      id: 'Agent ID',
      name: 'Agent Name',
      context: 'Context',
      created_at: 'Created At',
      updated_at: 'Updated At',
      actions: 'Actions',
      description: 'Description',
      llmProvider: 'Llm Provider',
      model: 'Model',
      language: 'Language',
      temperature: 'Temperature',
      vectorProvider: 'Vector Provider',
      embeddingProvider: 'Embedding Provider',
      embeddingModel: 'Embedding Model',
      active: 'active',
      status: 'Agent Status',
    },
    buttons: {
      create: 'Create Agent',
      edit: 'Edit',
      delete: 'Delete',
      cancel: 'Cancel',
      save: 'Save',
      overview: 'Agent overview',
      filter: 'Filter',
    },

    placeholder: {
      llmProvider: 'Select LLM Provider',
      model: 'Select Model',
      vecotrProvider: 'Select Vector Provider',
      embeddingProvider: 'Select Embedding Provider',
      search: 'Search Agents',
    },

    notifications: {
      delete_title: 'Success',
      delete_message: 'Agent {name} is deleted!',
      update_title: 'Success',
      update_message: 'Agent {name} is updated!',
      create_title: 'Success',
      create_message: 'Agent {name} is created!',
      form_title: 'Form Error',
      form_message: 'Please fix the highlighted errors in the form.',
      invalid_agent: 'Oops! Something went wrong. The agent you are trying to delete doesn’t seem to exist.',
    },
    rules: {
      name: {
        required_message: 'Please input Agent name',
        length_message: 'Name should be {min} to {max} charaters long',
      },
      context: {
        required_message: 'Please input Agent context',
        length_message: 'Context should be {min} to {max} charaters long',
      },
      description: {
        required_message: 'Please provide a description',
      },
      llmProvider: {
        required_message: 'Please select a valid LLM provider',
      },
      model: {
        required_message: 'Please select a model',
      },
      language: {
        required_message: 'Please specify a language',
      },
      temperature: {
        required_message: 'Please set a temperature between 0 and 1',
      },
      vectorProvider: {
        required_message: 'Please select a valid vector provider',
      },
      embeddingProvider: {
        required_message: 'Please select an embedding provider',
      },
      embeddingModel: {
        required_message: 'Please provide an embedding model',
      },
      active: {
        required_message: 'Please specify whether the agent is active',
      },
    },

  },

  collections: {
    title: 'Collections',
    titles: {
      title: 'Collections',
      subTitle: 'Manage the content collections that guide the AI\'s knowledge base.',
      deleteTitle: 'Delete collection?',
      deleteDescription: 'Are you sure you want to delete collection?',
      create: 'Create Collection',
      createDescription: 'Create a new collection according to your needs!',
    },

    buttons: {
      create: 'Create Collection',
      delete: 'Delete',
      cancel: 'Cancel',
      save: 'Save',
      filter: 'Filter',
    },

    placeholders: {
      search: 'Search Collections',
      vectorPlaceholder: 'Select Vector Provider',
      embeddingPlaceholder: 'Select Embedding Provider',
      modelPlaceholder: 'Select Model',
      collectionName: 'Please enter the collection name',
    },

    collection_card: {
      unknown_id: 'Unknown collection id',
      unknown_collectin_name: 'Unknown collection name',
      unknown_provider: 'Unknown provider',
      unknown_embedder: 'Unknown embeddingProvider',
      unknown_model: 'Unknown model',
      unknown_date: 'Unknown date',
    },
    labels: {
      id: 'Collection ID',
      name: 'Collection Name',
      created_at: 'Created At',
      updated_at: 'Updated At',
      provider: 'Provider',
      model: 'Model',
      embedder: 'Embedder',
      addDocument: 'Add documents to collection',
    },

    deleteModal: {
      title: 'Delete Collection',
      text: 'Are you sure you want to delete this collection?',
    },
    rules: {
      name: {
        required_message: 'Please input Collection name',
        length_message: 'Name should be {min} to {max} charaters long',
        ascii_alphanumeric_underscored_message: 'Please enter a name that starts with a capital letter and contains only letters, numbers, or underscores ( _ ).',
      },
      vectorProvider: 'Please select Vector provider',
      embeddingProvider: 'Please select Embedding provider',
      model: 'Please select Model',
    },
    notifications: {
      delete_title: 'Success',
      delete_message: 'Collection {name} is deleted!',
      delete_error: 'Collection is not deleted',
      create_title: 'Success',
      create_message: 'Collection {name} is created!',
      form_title: 'Form Error',
      form_message: 'Please fix the highlighted errors in the form.',
      invalid_collection: 'Oops! Something went wrong. The agent you are trying to delete doesn’t seem to exist.',
    },
  },

  auth: {
    notifications: {
      user_authenticate: 'User not authenticated, redirecting to login',
    },

  },

  error_notifications: {
    default: 'An unknown error occurred',
    status_400: 'Bad Request: Please try again.',
    status_401: 'Unauthorized: You need to be logged in to access this.',
    status_403: 'Forbidden: You do not have permission to access this resource.',
    status_404: 'Not Found: The resource you’re looking for doesn’t exist.',
    status_422: 'Unprocessable Entity: There was an issue with the provided data.',
    status_500: 'Server Error: Something went wrong on our end. Please try again later.',
    status_503: 'Service Unavailable: The server is currently unable to handle the request.',
  },

}
