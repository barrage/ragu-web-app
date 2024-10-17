export default {
  details: 'Détails',
  chatDock: 'Panneau de chat',
  login: {
    title: 'Se connecter',
    description: 'Choisissez une méthode de connexion',
    continueWith: 'Continuer avec',
  },
  timePeriod: {
    today: 'Aujourd\'hui',
    yesterday: 'Hier',
    last7days: 'Les 7 derniers jours',
    last30days: 'Les 30 derniers jours',
    lastYear: 'L\'année dernière',
  },
  profileDropdown: {
    switchToAdmin: 'Passer à Admin',
    switchToUser: 'Passer à Utilisateur',
    profile: 'Profil',
    settings: 'Paramètres',
    agents: 'Agents',
    support: 'Support',
    signOut: 'Se déconnecter',
  },
  getHelp: {
    title: 'Obtenir de l\'aide',
  },
  chat: {
    editTitle: 'Modifier le titre',
    deleteChat: 'Supprimer le chat',
    chatInputPlaceholder: 'Envoyer un message',
    chatHistory: 'Historique de chat',
    newChat: {
      title: 'Nouveau chat',
      description: 'Choisissez un agent pour commencer à discuter',
      choseFrom: 'Agents :',
    },
  },

  agents: {
    title: 'Agents',
    titles: {
      mainTitle: 'Agents',
      details: 'Détails de l’agent',
      description: 'Gérer les agents responsables de l’interaction avec l’IA',
      edit: 'Modifier l’agent',
      create: 'Créer un agent',
      createDescription: 'Créez votre nouvel agent en fournissant son nom et son contexte pour commencer !',
      deleteTitle: 'Supprimer l’agent ?',
      deleteDescription: 'Êtes-vous sûr de vouloir supprimer cet agent ?',
    },
    agent_card: {
      unknown_agentname: 'Nom d’agent inconnu',
      unknown_agentcontext: 'Contexte d’agent manquant',
      active_status: 'Actif',
      inactive_status: 'Inactif',
      created_at: 'Date inconnue',
      edit_agent: 'Modifier l’agent',
      delete_agent: 'Supprimer l’agent',
    },
    labels: {
      name: 'Nom de l’agent',
      context: 'Contexte',
      created_at: 'Créé le',
      updated_at: 'Mis à jour le',
      actions: 'Actions',
      description: 'Description',
      llmProvider: 'Fournisseur LLM',
      model: 'Modèle',
      language: 'Langue',
      temperature: 'Température',
      vectorProvider: 'Fournisseur de vecteurs',
      embeddingProvider: 'Fournisseur d’embeddings',
      embeddingModel: 'Modèle d’embeddings',
      active: 'actif',
      status: 'Statut de l’agent',
    },
    buttons: {
      create: 'Créer un agent',
      edit: 'Modifier',
      delete: 'Supprimer',
      cancel: 'Annuler',
      save: 'Enregistrer',
      overview: 'Aperçu de l’agent',
      filter: 'Filtre',
    },

    placeholder: {
      llmProvider: 'Sélectionner le fournisseur LLM',
      model: 'Sélectionner le modèle',
      vecotrProvider: 'Sélectionner le fournisseur de vecteurs',
      embeddingProvider: 'Sélectionner le fournisseur d’embeddings',
      search: 'Rechercher des agents',
    },

    notifications: {
      delete_title: 'Succès',
      delete_message: 'Agent {name} supprimé !',
      update_title: 'Succès',
      update_message: 'Agent {name} mis à jour !',
      create_title: 'Succès',
      create_message: 'Agent {name} créé !',
      form_title: 'Erreur de formulaire',
      form_message: 'Veuillez corriger les erreurs dans le formulaire.',
      invalid_agent: 'Oups ! Quelque chose a mal tourné. L’agent que vous essayez de supprimer ne semble pas exister.',
    },
    rules: {
      name: {
        required_message: 'Veuillez entrer le nom de l’agent',
        length_message: 'Le nom doit être compris entre {min} et {max} caractères',
      },
      context: {
        required_message: 'Veuillez entrer le contexte de l’agent',
        length_message: 'Le contexte doit être compris entre {min} et {max} caractères',
      },
      description: {
        required_message: 'Veuillez fournir une description',
      },
      llmProvider: {
        required_message: 'Veuillez sélectionner un fournisseur LLM valide',
      },
      model: {
        required_message: 'Veuillez sélectionner un modèle',
      },
      language: {
        required_message: 'Veuillez sélectionner une langue',
      },
      temperature: {
        required_message: 'Veuillez définir une température entre 0 et 1',
      },
      vectorProvider: {
        required_message: 'Veuillez sélectionner un fournisseur de vecteurs valide',
      },
      embeddingProvider: {
        required_message: 'Veuillez sélectionner un fournisseur d’embeddings',
      },
      embeddingModel: {
        required_message: 'Veuillez fournir un modèle d’embeddings',
      },
      active: {
        required_message: 'Veuillez indiquer si l’agent est actif',
      },
    },
  },

  collections: {
    title: 'Collections',
    titles: {
      title: 'Collections',
      subTitle: 'Gérer les collections de contenu qui guident la base de connaissances de l\'IA.',
      deleteTitle: 'Supprimer la collection?',
      deleteDescription: 'Êtes-vous sûr de vouloir supprimer la collection?',
      create: 'Créer une collection',
      createDescription: 'Créez une nouvelle collection selon vos besoins!',
    },
    buttons: {
      create: 'Créer une collection',
      delete: 'Supprimer',
      cancel: 'Annuler',
      save: 'Enregistrer',
      filter: 'Filtrer',
    },
    placeholders: {
      search: 'Rechercher des collections',
      vectorPlaceholder: 'Sélectionnez le fournisseur de vecteurs',
      embeddingPlaceholder: 'Sélectionnez le fournisseur d\'embedding',
      modelPlaceholder: 'Sélectionnez le modèle',
    },
    labels: {
      name: 'Nom de la collection',
      vectorProvider: 'Fournisseur de vecteurs',
      embeddingProvider: 'Fournisseur d\'embedding',
      model: 'Modèle',
      updated_at: 'Mis à jour le',
      created_at: 'Créé le',
    },
    deleteModal: {
      title: 'Supprimer la collection',
      text: 'Êtes-vous sûr de vouloir supprimer cette collection?',
    },
    rules: {
      name: {
        required_message: 'Veuillez entrer le nom de la collection',
        length_message: 'Le nom doit comporter entre {min} et {max} caractères',
      },
      vectorProvider: 'Veuillez sélectionner un fournisseur de vecteurs',
      embeddingProvider: 'Veuillez sélectionner un fournisseur d\'embedding',
      model: 'Veuillez sélectionner un modèle',
    },
    notifications: {
      delete_title: 'Succès',
      delete_message: 'La collection {name} a été supprimée!',
      delete_error: 'La collection n\'a pas été supprimée',
      create_title: 'Succès',
      create_message: 'La collection {name} a été créée!',
      form_title: 'Erreur de formulaire',
      form_message: 'Veuillez corriger les erreurs surlignées dans le formulaire.',
      invalid_collection: 'Oups! Quelque chose a mal tourné. La collection que vous essayez de supprimer semble ne pas exister.',
    },
  },

  users: {
    title: 'Utilisateurs',
    description: 'Gérez les membres de votre équipe et définissez leurs niveaux d\'accès.',
    invite_user: 'Inviter un utilisateur',
    user_card: {
      role: 'Rôle',
      status: 'Statut',
      active_status: 'Actif',
      inactive_status: 'Inactif',
      created_at: 'Créé',
      view_more: 'Voir les détails de l\'utilisateur',
      edit_user: 'Modifier l\'utilisateur',
      delete_user: 'Supprimer l\'utilisateur',
      adminRole: 'Administrateur',
      userRole: 'Utilisateur',
      updated_at: 'Mis à jour le',
      user_id: 'ID Utilisateur',
      first_name: 'Prénom',
      last_name: 'Nom',
      username: 'Nom d\'utilisateur',
      email: 'E-mail',
    },

  },

}
