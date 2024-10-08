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
  members: {
    title: 'Members',
    description: 'Manage team members of your organization and set their access level',
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
