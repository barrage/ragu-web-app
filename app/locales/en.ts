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
    editTitle: 'Edit title',
    deleteChat: 'Delete chat',
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
    description: 'Organize and manage all documents that contribute to the AI\'s learning.',
  },
  users: {
    title: 'Users',
    description: 'Manage team members of your organization and set their access level',
    invite_user: 'Invite User',
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
    labels: {
      name: 'Name',
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

    },
    buttons: {
      create: 'Create Agent',
      edit: 'Edit',
      delete: 'Delete',
      cancel: 'Cancel',
      save: 'Save',
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
    },

    labels: {
      name: 'Collection Name',
      vectorProvider: 'Vector Provider',
      vectorPlaceholder: 'Select Vector Provider',
      embeddingProvider: 'Embedding Provider',
      embeddingPlaceholder: 'Select Embedding Provider',
      model: 'Model',
      modelPlaceholder: 'Select Model',

    },

    rules: {
      name: {
        required_message: 'Please input Collection name',
        length_message: 'Name should be {min} to {max} charaters long',
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
}
