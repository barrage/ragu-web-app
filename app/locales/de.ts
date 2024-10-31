export default {
  details: 'Details',
  chatDock: 'Chat-Panel',
  login: {
    title: 'Login',
    description: 'Wählen Sie eine Anmeldemethode',
    continueWith: 'Weiter mit',
  },
  timePeriod: {
    today: 'Heute',
    yesterday: 'Gestern',
    last7days: 'Letzte 7 Tage',
    last30days: 'Letzte 30 Tage',
    lastYear: 'Letztes Jahr',
  },
  profileDropdown: {
    switchToAdmin: 'Wechseln zu Admin',
    switchToUser: 'Wechseln zu Benutzer',
    user: 'User Panel',
    profile: 'Profil',
    settings: 'Einstellungen',
    agents: 'Agenten',
    support: 'Support',
    signOut: 'Abmelden',
  },
  getHelp: {
    title: 'Hilfe erhalten',
  },
  chat: {
    user: 'Benutzer',
    assistant: 'Assistent',
    admin: {
      title: 'Chats',
      description: 'Verwalten Sie alle Ihre Chats an einem Ort',
      chat_card: {
        created_at: 'Erstellt am',
        updated_at: 'Aktualisiert am',
        view_details: 'Details anzeigen',
        edit_chat: 'Chat bearbeiten',
        delete_chat: 'Chat löschen',
      },
      chat_details: {
        title: 'Chat-Details',
        description: 'Alle Details zu diesem Chat anzeigen',
      },
    },
    editTitle: 'Titel bearbeiten',
    deleteChat: 'Chat löschen',
    chatInputPlaceholder: 'Nachricht senden',
    chatHistory: 'Chatverlauf',
    newChat: {
      title: 'Neuer Chat',
      description: 'Wählen Sie einen Agenten, um den Chat zu starten',
      choseFrom: 'Agenten:',
    },
  },
  documents: {
    title: 'Dokumente',
    description: 'Verwalten und organisieren Sie alle Dokumente, die der KI beim Lernen helfen.',
    name: 'Name',
    extension: 'Format',
    path: 'Speicherort',
    source: 'Quelle',
    id: 'Dokument-ID',
    hash: 'Hash',
  },

  agents: {
    title: 'Agenten',
    titles: {
      mainTitle: 'Agenten',
      details: 'Agentendetails',
      description: 'Verwalten Sie die Agenten, die für die Interaktion mit der KI verantwortlich sind',
      edit: 'Agent bearbeiten',
      create: 'Agent erstellen',
      createDescription: 'Erstellen Sie einen neuen Agenten, indem Sie seinen Namen und Kontext eingeben, um loszulegen!',
      deleteTitle: 'Agent löschen?',
      deleteDescription: 'Sind Sie sicher, dass Sie den Agenten löschen möchten?',
    },
    agent_card: {
      unknown_id: 'Unbekannte Agenten-ID',
      unknown_agentname: 'Unbekannter Agentenname',
      unknown_agentcontext: 'Fehlender Agentkontext',
      unknown_description: 'Fehlende Agentenbeschreibung',
      unknown_llmProvider: 'Unbekannter llmProvider',
      unknown_model: 'Unbekanntes Modell',
      unknown_language: 'Unbekannte Sprache',
      unknown_temperature: 'Unbekannte Temperatur',
      unknown_vectorProvider: 'Unbekannter Vektoranbieter',
      unknown_embeddingProvider: 'Unbekannter Einbettungsanbieter',
      unknown_embeddingModel: 'Unbekanntes Einbettungsmodell',
      unknown_date: 'Unbekanntes Datum',
      active_status: 'Aktiv',
      inactive_status: 'Inaktiv',
      created_at: 'Unbekanntes Datum',
      edit_agent: 'Agent bearbeiten',
      delete_agent: 'Agent löschen',
      view_more: 'Agentdetails anzeigen',
    },
    labels: {
      id: 'Agente ID',
      name: 'Agentenname',
      context: 'Kontext',
      created_at: 'Erstellt am',
      updated_at: 'Aktualisiert am',
      actions: 'Aktionen',
      description: 'Beschreibung',
      llmProvider: 'LLM-Anbieter',
      model: 'Modell',
      language: 'Sprache',
      temperature: 'Temperatur',
      vectorProvider: 'Vektor-Anbieter',
      embeddingProvider: 'Embedding-Anbieter',
      embeddingModel: 'Embedding-Modell',
      active: 'aktiv',
      status: 'Agentenstatus',
    },
    buttons: {
      create: 'Agent erstellen',
      edit: 'Bearbeiten',
      delete: 'Löschen',
      cancel: 'Abbrechen',
      save: 'Speichern',
      overview: 'Agentenübersicht',
      filter: 'Filter',
    },

    placeholder: {
      llmProvider: 'LLM-Anbieter auswählen',
      model: 'Modell auswählen',
      vecotrProvider: 'Vektoranbieter auswählen',
      embeddingProvider: 'Embedding-Anbieter auswählen',
      search: 'Agenten suchen',

    },

    notifications: {
      delete_title: 'Erfolg',
      delete_message: 'Agent {name} wurde gelöscht!',
      update_title: 'Erfolg',
      update_message: 'Agent {name} wurde aktualisiert!',
      create_title: 'Erfolg',
      create_message: 'Agent {name} wurde erstellt!',
      form_title: 'Formularfehler',
      form_message: 'Bitte beheben Sie die markierten Fehler im Formular.',
      invalid_agent: 'Oops! Etwas ist schiefgelaufen. Der Agent, den Sie löschen möchten, scheint nicht zu existieren.',
    },
    rules: {
      name: {
        required_message: 'Bitte geben Sie den Namen des Agenten ein',
        length_message: 'Der Name sollte zwischen {min} und {max} Zeichen lang sein',
      },
      context: {
        required_message: 'Bitte geben Sie den Kontext des Agenten ein',
        length_message: 'Der Kontext sollte zwischen {min} und {max} Zeichen lang sein',
      },
      description: {
        required_message: 'Bitte geben Sie eine Beschreibung an',
      },
      llmProvider: {
        required_message: 'Bitte wählen Sie einen gültigen LLM-Anbieter',
      },
      model: {
        required_message: 'Bitte wählen Sie ein Modell',
      },
      language: {
        required_message: 'Bitte wählen Sie eine Sprache',
      },
      temperature: {
        required_message: 'Bitte legen Sie eine Temperatur zwischen 0 und 1 fest',
      },
      vectorProvider: {
        required_message: 'Bitte wählen Sie einen gültigen Vektoranbieter',
      },
      embeddingProvider: {
        required_message: 'Bitte wählen Sie einen Embedding-Anbieter',
      },
      embeddingModel: {
        required_message: 'Bitte geben Sie ein Embedding-Modell an',
      },
      active: {
        required_message: 'Bitte geben Sie an, ob der Agent aktiv ist',
      },
    },
  },

  collections: {
    title: 'Sammlungen',
    titles: {
      title: 'Sammlungen',
      subTitle: 'Verwalten Sie die Inhaltssammlungen, die die Wissensbasis der KI leiten.',
      deleteTitle: 'Sammlung löschen?',
      deleteDescription: 'Sind Sie sicher, dass Sie die Sammlung löschen möchten?',
      create: 'Sammlung erstellen',
      createDescription: 'Erstellen Sie eine neue Sammlung nach Ihren Bedürfnissen!',
    },
    buttons: {
      create: 'Sammlung erstellen',
      delete: 'Löschen',
      cancel: 'Abbrechen',
      save: 'Speichern',
      filter: 'Filtern',
    },
    placeholders: {
      search: 'Sammlungen durchsuchen',
      vectorPlaceholder: 'Wählen Sie den Vektor-Anbieter',
      embeddingPlaceholder: 'Wählen Sie den Einbettungsanbieter',
      modelPlaceholder: 'Modell auswählen',
      collectionName: 'Bitte geben Sie den Namen der Sammlung ein',
    },
    collection_card: {
      unknown_id: 'Unbekannte Sammlungs-ID',
      unknown_collectin_name: 'Unbekannter Sammlungsname',
      unknown_provider: 'Unbekannter Anbieter',
      unknown_embedder: 'Unbekannter Einbettungsanbieter',
      unknown_model: 'Unbekanntes Modell',
      unknown_date: 'Unbekanntes Datum',
    },

    labels: {
      id: 'Sammlungs-ID',
      name: 'Sammlungsname',
      created_at: 'Erstellt am',
      updated_at: 'Aktualisiert am',
      provider: 'Anbieter',
      model: 'Modell',
      embedder: 'Einbettung',
    },

    deleteModal: {
      title: 'Sammlung löschen',
      text: 'Sind Sie sicher, dass Sie diese Sammlung löschen möchten?',
    },
    rules: {
      name: {
        required_message: 'Bitte geben Sie den Sammlungsnamen ein',
        length_message: 'Der Name sollte zwischen {min} und {max} Zeichen lang sein',
        ascii_alphanumeric_underscored_message: 'Bitte geben Sie einen Namen ein, der mit einem Großbuchstaben beginnt und nur Buchstaben, Zahlen oder Unterstriche ( _ ) enthält.',
      },
      vectorProvider: 'Bitte wählen Sie einen Vektor-Anbieter',
      embeddingProvider: 'Bitte wählen Sie einen Einbettungsanbieter',
      model: 'Bitte wählen Sie ein Modell',
    },
    notifications: {
      delete_title: 'Erfolg',
      delete_message: 'Sammlung {name} wurde gelöscht!',
      delete_error: 'Sammlung wurde nicht gelöscht',
      create_title: 'Erfolg',
      create_message: 'Sammlung {name} wurde erstellt!',
      form_title: 'Formularfehler',
      form_message: 'Bitte beheben Sie die hervorgehobenen Fehler im Formular.',
      invalid_collection: 'Hoppla! Etwas ist schiefgelaufen. Die Sammlung, die Sie löschen möchten, scheint nicht zu existieren.',
    },
  },

  users: {
    title: 'Benutzer',
    description: 'Verwalten Sie die Mitglieder Ihres Teams und legen Sie deren Zugriffsrechte fest.',
    invite_user: 'Benutzer einladen',
    form: {
      first_name: 'Vorname',
      first_name_placeholder: 'Vornamen eingeben',
      last_name: 'Nachname',
      last_name_placeholder: 'Nachnamen eingeben',
      email: 'E-Mail',
      email_placeholder: 'E-Mail-Adresse eingeben',
      role: 'Rolle',
      role_placeholder: 'Wählen Sie eine Rolle für den Benutzer',
      submit: 'Bestätigen',
      cancel: 'Abbrechen',
      rules: {
        required: 'Dieses Feld ist erforderlich',
        invalid_email: 'Ungültiges E-Mail-Format',
      },
    },

    notifications: {
      create_error_title: 'Fehler beim Hinzufügen eines Benutzers',
      create_error_description: 'Das Hinzufügen eines neuen Benutzers ist fehlgeschlagen.',
      create_error_existing_user_description: 'Benutzer existiert bereits.',
    },
    user_card: {
      role: 'Rolle',
      status: 'Status',
      active_status: 'Aktiv',
      inactive_status: 'Inaktiv',
      created_at: 'Erstellt',
      view_more: 'Benutzerdetails anzeigen',
      edit_user: 'Benutzer bearbeiten',
      delete_user: 'Benutzer löschen',
      adminRole: 'Administrator',
      userRole: 'Benutzer',
      updated_at: 'Aktualisiert am',
      user_id: 'Benutzer-ID',
      first_name: 'Vorname',
      last_name: 'Nachname',
      username: 'Benutzername',
      email: 'E-Mail',
    },
  },

  error_notifications: {
    default: 'Ein unbekannter Fehler ist aufgetreten.',
    status_400: 'Schlechte Anfrage: Bitte versuchen Sie es erneut.',
    status_401: 'Nicht autorisiert: Sie müssen angemeldet sein, um darauf zuzugreifen.',
    status_403: 'Verboten: Sie haben keine Berechtigung, auf diese Ressource zuzugreifen.',
    status_404: 'Nicht gefunden: Die gesuchte Ressource existiert nicht.',
    status_422: 'Nicht verarbeitbare Entität: Es gab ein Problem mit den bereitgestellten Daten.',
    status_500: 'Serverfehler: Etwas ist bei uns schiefgelaufen. Bitte versuchen Sie es später erneut.',
    status_503: 'Dienst nicht verfügbar: Der Server kann die Anfrage derzeit nicht bearbeiten.',
  },

}
