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
    unknown_date: 'Date inconnue',
  },
  sort: {
    title: 'Options de tri',
    description: 'Trier par',
    asc: 'Ascendant',
    desc: 'Descendant',
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
    user: 'Utilisateur',
    assistant: 'Assistant',
    admin: {
      title: 'Conversations',
      description: 'Gérez toutes vos conversations à un seul endroit',
      chat_card: {
        title: 'Titre',
        unknown_title: 'Inconnu',
        created_at: 'Créé le',
        updated_at: 'Mis à jour le',
        view_details: 'Voir les détails',
        edit_chat: 'Modifier la conversation',
        delete_chat: 'Supprimer la conversation',
      },
      chat_details: {
        title: 'Détails de la conversation',
        description: 'Voir tous les détails liés à cette conversation',
      },
    },
    edit_title: {
      title: 'Modifier le titre',
      title_label: 'Titre',
      title_placeholder: 'Veuillez saisir un nouveau titre',
      notifications: {
        success_title: 'Titre mis à jour avec succès',
        success_description: 'Le titre du chat a été mis à jour avec succès.',
        error_title: 'Erreur',
        error_description: 'Une erreur s\'est produite lors de la modification du titre du chat.',
      },
    },
    delete_chat: {
      title: 'Supprimer la discussion',
      description: 'Êtes-vous sûr de vouloir supprimer la discussion ?',
      notifications: {
        success_title: 'Supprimé avec succès',
        success_description: 'La discussion a été supprimée avec succès.',
        error_title: 'Erreur',
        error_description: 'Une erreur est survenue lors de la suppression de la discussion.',
      },
    },
    chatInputPlaceholder: 'Envoyer un message',
    chatHistory: 'Historique de chat',
    newChat: {
      title: 'Nouveau chat',
      description: 'Choisissez un agent pour commencer à discuter',
      choseFrom: 'Agents :',
      empty: 'Il n\'y a actuellement aucun agent disponible pour la conversation. Pour démarrer un chat, vous devez ajouter ou activer au moins un agent. Veuillez contacter l\'administrateur système ou vérifier les paramètres des agents pour continuer.',
    },
  },
  documents: {
    title: 'Documents',
    description: 'Gérez et organisez tous les documents qui aident l\'IA dans son apprentissage.',
    name: 'Nom',
    extension: 'Format',
    path: 'Emplacement',
    source: 'Source',
    id: 'ID Document',
    hash: 'Hash',
    details: {
      empty: 'Ce document n\'est pas disponible ou n\'existe plus.',
    },
    notifications: {
      create: {
        success_title: 'Nouveau Document',
        success_description: 'Nouveau document créé avec succès',
        error_title: 'Nouveau Document',
        error_description: 'Erreur lors de l\'ajout',
        error_existing_document_title: 'Document Existant',
        error_existing_document_description: 'Ce document existe déjà',
        error_file_size_title: 'Problème de Taille de Fichier',
        error_file_size_description: 'La taille du fichier ne peut pas dépasser 50 MB!',
        error_file_type_title: 'Problème de Format de Fichier',
        error_file_type_description: 'Le fichier doit être en format PDF, TXT, JSON ou DOCX!',
      },
    },

  },
  dashboard: {
    title: 'Tableau de bord',
    description: 'Gérez l\'application d\'administration LLMAO.',
    service_widgets: {
      agents: {
        title: 'Total des agents',
        description: 'agents actifs',
        view_more: 'Voir plus',
      },
      users: {
        title: 'Total des utilisateurs',
        description: 'utilisateurs actifs',
        view_more: 'Voir plus',
      },
      documents: {
        title: 'Documents',
        description: 'Total des documents',
        view_more: 'Voir plus',
      },
      collections: {
        title: 'Collections',
        description: 'Total des collections',
        view_more: 'Voir plus',
      },
    },
    chat_usage_line_chart: {
      title: 'Utilisation du chat',
      period: {
        week: 'Semaine',
        month: 'Mois',
        year: 'Année',
      },
    },
    chats: {
      most_recent: {
        title: 'Chats récents',
        description: 'Affiche votre historique de chat le plus récent',
      },
      all_chat_usage: {
        title: 'Utilisation de tous les chats',
        description: 'Les chats les plus courants par l\'utilisation de tous les agents',
        series_name: 'Agent',
        pie_chart_subtext: 'Total des chats',
      },
      available_agents: {
        title: 'Agents disponibles',
        description: 'Affichez et interagissez avec les agents disponibles alimentés par l\'IA.',
      },
    },
    agents: {
      total_widget: {
        active: 'Actif',
      },
      providers: {
        title: 'Fournisseurs',
        description: 'Affiche le fournisseur des agents actifs',
        series_name: 'Fournisseur',
      },
      most_used_agent: {
        title: 'Agent le plus utilisé',
        description: 'Agent le plus utilisé par tous les chats',
        chats: 'Chats',
      },
    },
    users: {
      total_widget: {
        total: 'Total',
      },
      most_recent_users: {
        title: 'Utilisateurs les plus récents',
        description: 'Trouvez vos utilisateurs les plus récents',
      },
      user_roles: {
        admins: 'Administrateurs',
        users: 'Utilisateurs',
        active: 'Actif',
        inactive: 'Inactif',
      },
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
      unknown_id: 'ID d’agent inconnu',
      unknown_agentname: 'Nom d’agent inconnu',
      unknown_agentcontext: 'Contexte d’agent manquant',
      unknown_description: 'Description d’agent manquante',
      unknown_llmProvider: 'llmProvider inconnu',
      unknown_model: 'Modèle inconnu',
      unknown_language: 'Langue inconnue',
      unknown_temperature: 'Température inconnue',
      unknown_vectorProvider: 'Fournisseur de vecteurs inconnu',
      unknown_embeddingProvider: 'Fournisseur d’embeddings inconnu',
      unknown_embeddingModel: 'Modèle d’embeddings inconnu',
      unknown_instruction: 'Instruction inconnue',
      unknown_date: 'Date inconnue',
      active_status: 'Actif',
      inactive_status: 'Inactif',
      created_at: 'Date inconnue',
      edit_agent: 'Modifier l’agent',
      delete_agent: 'Supprimer l’agent',
      view_more: 'Voir les détails de l’agent',
    },
    labels: {
      id: 'ID de l’Agent',
      name: 'Nom de l’Agent',
      context: 'Contexte',
      created_at: 'Créé le',
      updated_at: 'Mis à jour le',
      actions: 'Actions',
      description: 'Description',
      llmProvider: 'Fournisseur LLM',
      model: 'Modèle',
      language: 'Langue',
      temperature: 'Température',
      vectorProvider: 'Fournisseur Vectoriel',
      embeddingProvider: 'Fournisseur d’Embedding',
      embeddingModel: 'Modèle d’Embedding',
      active: 'Actif',
      status: 'Statut de l’Agent',
      languageInstruction: 'Instruction de Langue',
      summaryInstruction: 'Instruction de Résumé',
      titleInstruction: 'Instruction de Titre',
    },
    buttons: {
      create: 'Créer l’Agent',
      edit: 'Modifier',
      delete: 'Supprimer',
      cancel: 'Annuler',
      save: 'Sauvegarder',
      overview: 'Aperçu de l’Agent',
      filter: 'Filtrer',
    },
    placeholder: {
      llmProvider: 'Sélectionner Fournisseur LLM',
      model: 'Sélectionner le Modèle',
      vecotrProvider: 'Sélectionner Fournisseur Vectoriel',
      embeddingProvider: 'Sélectionner Fournisseur d’Embedding',
      search: 'Rechercher des Agents',
      agentName: 'Entrer le Nom de l’Agent',
      context: 'Entrer le Contexte de l’Agent...',
      description: 'Entrer la Description de l’Agent',
      language: 'Entrer la Langue de l’Agent',
      languageInstruction: 'Entrer l’Instruction de Langue de l’Agent',
      summaryInstruction: 'Entrer l’Instruction de Résumé de l’Agent',
      titleInstruction: 'Entrer l’Instruction de Titre de l’Agent',
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
      collectionName: 'Veuillez entrer le nom de la collection',
    },
    collection_card: {
      unknown_id: 'ID de collection inconnu',
      unknown_collectin_name: 'Nom de collection inconnu',
      unknown_provider: 'Fournisseur inconnu',
      unknown_embedder: 'Fournisseur d\'intégration inconnu',
      unknown_model: 'Modèle inconnu',
      unknown_date: 'Date inconnue',
    },

    labels: {
      id: 'ID de la collection',
      name: 'Nom de la collection',
      created_at: 'Créé le',
      updated_at: 'Mis à jour le',
      provider: 'Fournisseur',
      model: 'Modèle',
      embedder: 'Intégrateur',
    },

    deleteModal: {
      title: 'Supprimer la collection',
      text: 'Êtes-vous sûr de vouloir supprimer cette collection?',
    },
    rules: {
      name: {
        required_message: 'Veuillez entrer le nom de la collection',
        length_message: 'Le nom doit comporter entre {min} et {max} caractères',
        ascii_alphanumeric_underscored_message: 'Veuillez entrer un nom qui commence par une majuscule et ne contient que des lettres, des chiffres et des tirets bas pour les espaces ( _ ).',
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

    assign_collection: {
      title: 'Attribuer la Collection',
      rules: {
        collection_name: 'Veuillez sélectionner une collection',
        amount: 'Veuillez entrer une quantité',
        instruction: 'Veuillez entrer une instruction',
      },
      placeholder: {
        select: 'Sélectionner une collection',
        instruction: 'Entrer une instruction',
        amount: 'Entrer une quantité',
      },
      labels: {
        name: 'Nom de la collection',
        instructions: 'Instructions',
        amount: 'Quantité',
      },
      notification: {
        error_title: 'Erreur',
        assign_error_title: 'Échec de l\'attribution de la collection à l\'agent!',
        assign_cuccess_title: 'Collection assignée!',
        delete_collection: 'Vous n\'avez pas de collection à supprimer, veuillez en assigner une nouvelle!',
      },
    },
  },

  users: {
    title: 'Utilisateurs',
    description: 'Gérez les membres de votre équipe et définissez leurs niveaux d\'accès.',
    invite_user: 'Inviter un utilisateur',
    delete_user: {
      title: 'Supprimer l\'Utilisateur',
      description: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.',
      confirm: 'Supprimer',
      cancel: 'Annuler',
      notifications: {
        success_title: 'Utilisateur Supprimé',
        success_description: 'L\'utilisateur a été supprimé avec succès.',
        error_title: 'Échec de la Suppression',
        error_description: 'Une erreur est survenue. L\'utilisateur n\'a pas pu être supprimé.',
      },
    },
    form: {
      first_name: 'Prénom',
      first_name_placeholder: 'Entrez le prénom',
      last_name: 'Nom',
      last_name_placeholder: 'Entrez le nom',
      email: 'E-mail',
      email_placeholder: 'Entrez l\'adresse e-mail',
      role: 'Rôle',
      role_placeholder: 'Sélectionnez un rôle pour l\'utilisateur',
      submit: 'Valider',
      cancel: 'Annuler',
      rules: {
        required: 'Ce champ est requis',
        invalid_email: 'Format d\'e-mail invalide',
      },
    },
    notifications: {
      create_error_title: 'Erreur d\'ajout d\'utilisateur',
      create_error_description: 'Échec de l\'ajout d\'un nouvel utilisateur.',
      create_error_existing_user_description: 'L\'utilisateur existe déjà.',
    },
    user_card: {
      role: 'Rôle',
      status: 'Statut',
      active_status: 'Actif',
      inactive_status: 'Inactif',
      created_at: 'Créé',
      view_more: 'Voir les détails de l\'utilisateur',
      edit_user: 'Modifier l\'utilisateur',
      delete_user: 'Supprimer l\'utilisateur',
      delete_user_title: 'Supprimer',
      activate_user_title: 'Activer',
      deactivate_user_title: 'Désactiver',
      edit_user_title: 'Modifier',
      activate_user: 'Activer l\'utilisateur',
      deactivate_user: 'Désactiver l\'utilisateur',
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

  error_notifications: {
    default: 'Une erreur inconnue s\'est produite.',
    status_400: 'Mauvaise demande : Veuillez réessayer.',
    status_401: 'Non autorisé : Vous devez être connecté pour accéder à cela.',
    status_403: 'Interdit : Vous n\'avez pas la permission d\'accéder à cette ressource.',
    status_404: 'Non trouvé : La ressource que vous recherchez n\'existe pas.',
    status_422: 'Entité non traitable : Il y avait un problème avec les données fournies.',
    status_500: 'Erreur serveur : Un problème est survenu de notre côté. Veuillez réessayer plus tard.',
    status_503: 'Service indisponible : Le serveur est actuellement incapable de traiter la demande.',
  },

}
