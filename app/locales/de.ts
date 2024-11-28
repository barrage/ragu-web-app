export default {
  empty_title: 'Hier gibt es noch nichts zu sehen',
  empty_description: 'Hier gibt es keine Elemente, die angezeigt werden sollen.',
  details: 'Details',
  chatDock: 'Chat-Panel',
  login: {
    title: 'Login',
    description: 'Wählen Sie eine Anmeldemethode',
    continueWith: 'Weiter mit',
    notifications: {
      error_title: 'Anmeldung fehlgeschlagen',
      error_description: 'Authentifizierung fehlgeschlagen. Bitte versuchen Sie es erneut.',
    },

  },
  logout: {
    error_title: 'Abmeldung fehlgeschlagen',
    error_description: 'Beim Versuch, sich abzumelden, ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
  },
  timePeriod: {
    today: 'Heute',
    yesterday: 'Gestern',
    last7days: 'Letzte 7 Tage',
    last30days: 'Letzte 30 Tage',
    lastYear: 'Letztes Jahr',
    unknown_date: 'Unbekanntes Datum',
  },
  sort: {
    title: 'Sortieroptionen',
    description: 'Sortieren nach',
    asc: 'Aufsteigend',
    desc: 'Absteigend',
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
    browse_agents: 'Durchsuchen Sie alle Chat-Agenten, die bereit sind, Ihnen zu helfen',
    signout_text: 'Sind Sie sicher, dass Sie sich abmelden möchten?',
    profile_settings: 'Profileinstellungen',
  },
  getHelp: {
    title: 'Hilfe erhalten',
  },
  form_rules: {
    required: 'Dieses Feld ist erforderlich',
    min_length: 'Die Mindestanzahl der benötigten Zeichen beträgt {min}',
    max_length: 'Die maximale Anzahl der Zeichen beträgt {max}',
  },

  chat: {
    user: 'Benutzer',
    assistant: 'Assistent',
    messages: 'Nachrichten',
    inactive_agent: 'Dieser Agent ist nicht mehr aktiv. Bitte wählen Sie einen aktiven Agenten, um ein neues Gespräch zu beginnen.',
    copy_title: 'Kopiert',
    copy_message: 'In die Zwischenablage kopiert',
    all_chats: 'Alle Chats',
    admin: {
      title: 'Chats',
      description: 'Verwalten Sie alle Ihre Chats an einem Ort',
      chat_card: {
        title: 'Titel',
        unknown_title: 'Unbekannt',
        created_at: 'Erstellt am',
        updated_at: 'Aktualisiert am',
        view_details: 'Details anzeigen',
        edit_chat: 'Chat bearbeiten',
        delete_chat: 'Chat löschen',
        empty_state_title: 'Keine Chats',
        empty_state_desc: 'Derzeit gibt es keine Chats, die angezeigt werden sollen.',
      },
      chat_details: {
        title: 'Chat-Details',
        description: 'Alle Details zu diesem Chat anzeigen',
        empty_messages: 'Derzeit gibt es keine Nachrichten in diesem Chat',
      },
    },
    edit_title: {
      title: 'Titel bearbeiten',
      title_label: 'Titel',
      title_placeholder: 'Bitte neuen Titel eingeben',
      notifications: {
        success_title: 'Titel erfolgreich bearbeitet',
        success_description: 'Chat wurde erfolgreich bearbeitet.',
        error_title: 'Fehler',
        error_description: 'Fehler beim Festlegen des neuen Chat-Titels.',
      },
    },
    delete_chat: {
      title: 'Chat löschen',
      description: 'Sind Sie sicher, dass Sie den Chat löschen möchten?',
      notifications: {
        success_title: 'Erfolgreich gelöscht',
        success_description: 'Der Chat wurde erfolgreich gelöscht.',
        error_title: 'Fehler',
        error_description: 'Ein Fehler ist beim Löschen des Chats aufgetreten.',
      },
    },
    chatInputPlaceholder: 'Nachricht senden',
    chatHistory: 'Chatverlauf',
    newChat: {
      title: 'Neuer Chat',
      description: 'Wählen Sie einen Agenten, um den Chat zu starten',
      choseFrom: 'Agenten:',
      empty: 'Derzeit sind keine Agenten für das Gespräch verfügbar. Um einen Chat zu starten, muss mindestens ein Agent hinzugefügt oder aktiviert werden. Bitte wenden Sie sich an den Systemadministrator oder überprüfen Sie die Agenteneinstellungen, um fortzufahren.',
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
    formats: 'Formate',
    total: 'Gesamt',
    sync: 'Synchronisieren',
    upload: 'Hochladen',
    most_recent: 'Am neuesten',
    specific_formats: 'Spezifische Formate',
    series_name: 'Format',
    sync_docs: 'Dokumente synchronisieren',

    tooltip: {
      delete_document: 'Löschen Sie Ihr Dokument',
      manage_document: 'Verwalten Sie Ihr Dokument',
      display_total: 'Gesamtanzahl der Dokumente anzeigen',
      most_recent: 'Zeigt die 5 zuletzt aktualisierten oder erstellten Dokumente an',
      document_formats: 'Zeigt die Verteilung der verschiedenen Dokumentformate in einem Kreisdiagramm an',
    },

    uploads: {
      title: 'Datei hochladen',
      description: 'Datei hier ablegen oder',
      description_link: 'klicken, um hochzuladen',
    },

    details: {
      empty: 'Dieses Dokument ist nicht verfügbar oder existiert nicht mehr.',
    },
    delete_document: {
      title: 'Dokument Löschen',
      description: 'Sind Sie sicher, dass Sie dieses Dokument löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
      notifications: {
        success_title: 'Dokument Gelöscht',
        success_description: 'Das Dokument wurde erfolgreich gelöscht.',
        error_title: 'Löschen Fehlgeschlagen',
        error_description: 'Beim Löschen des Dokuments ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.',
      },
    },

    notifications: {
      create: {
        success_title: 'Neues Dokument',
        success_description: 'Neues Dokument erfolgreich erstellt',
        error_title: 'Neues Dokument',
        error_description: 'Fehler beim Hinzufügen',
        error_existing_document_title: 'Vorhandenes Dokument',
        error_existing_document_description: 'Dieses Dokument existiert bereits',
        error_file_size_title: 'Dateigrößenproblem',
        error_file_size_description: 'Die Dateigröße darf 50 MB nicht überschreiten!',
        error_file_type_title: 'Dateiformatproblem',
        error_file_type_description: 'Die Datei muss im PDF-, TXT-, JSON- oder DOCX-Format vorliegen!',
      },
    },
    edit_configuration: 'Konfiguration bearbeiten',
    configuration: 'Konfiguration',
    parser: {
      title: 'Parser',
      description: 'Der Parser ermöglicht die Analyse und Verarbeitung von Daten aus Dokumenten.',
      load_more: 'Mehr laden',
      selected_document: 'Ausgewähltes Dokument',
      empty_configuration: 'Konfiguration ist nicht festgelegt.',
      parser_preview: 'Parser-Vorschau',
      parser_preview_empty_state: 'Keine Daten zur Vorschau im Parser verfügbar.',
      form: {
        start: 'Start',
        end: 'Ende',
        range: 'Bereich',
        filters: 'Filter',
        actions: {
          preview: 'Vorschau',
          save: 'Speichern',
          save_description: 'Speichern Sie die neu erstellte Parser-Konfiguration.',
          preview_description: 'Vorschau des Dokuments mit den aktuellen Parser-Einstellungen.',
        },
      },
      validation: {
        start_0_with_range: 'Start darf nicht 0 sein, wenn ein Bereich verwendet wird.',
        start_greater_with_range: 'Start darf nicht größer als Ende sein, wenn ein Bereich verwendet wird.',
      },
    },
    chunker: {
      title: 'Chunker',
      description: 'Zerlegen Sie das ausgewählte Dokument in sinnvolle Abschnitte für eine bessere semantische Analyse und Verarbeitung.',
      chunk_preview: 'Chunk-Vorschau',
      chunk_preview_empty_state: 'Keine Chunks zum Anzeigen. Passen Sie die Einstellungen an und zeigen Sie die Ergebnisse an, um Chunks für dieses Dokument zu generieren.',
      load_more: 'Mehr laden',
      chunk: 'Chunk',
      selected_document: 'Ausgewähltes Dokument',
      total_chunk: 'Gesamtanzahl der Chunks',
      no_parser_state: 'Parser-Konfiguration muss zuerst eingerichtet werden',
      empty_configuration: 'Leere Konfiguration',
      unknown_configuration: 'Unbekannte Konfiguration',
      selected_type: 'Ausgewählter Typ',

      validation: {
        size_validation: 'Die Größe muss größer als die Überlappung sein',
        threshold_validation: 'Der Schwellenwert darf nicht negativ sein',
      },
      notifications: {
        preview: {
          success_title: 'Vorschau erfolgreich',
          success_description: 'Ihre Vorschau wurde erfolgreich erstellt. Überprüfen Sie sie unten.',
          error_title: 'Vorschau fehlgeschlagen',
          error_description: 'Bei der Erstellung Ihrer Vorschau ist ein Problem aufgetreten. Bitte versuchen Sie es später erneut.',
        },
        update: {
          success_title: 'Aktualisierung erfolgreich',
          success_description: 'Ihre Änderungen wurden erfolgreich gespeichert.',
          error_title: 'Aktualisierung fehlgeschlagen',
          error_description: 'Beim Speichern Ihrer Änderungen ist ein Fehler aufgetreten. Bitte überprüfen Sie Ihre Verbindung und versuchen Sie es erneut.',
        },
      },
      semantic: {
        title: 'Semantisches Chunking konfigurieren',
        description: 'Richten Sie den semantischen Chunker für dieses Dokument ein und passen Sie ihn an. Vorschau der Chunks in Echtzeit, um die Konfiguration zu optimieren.',
        name: 'Semantisch',
        form: {
          size: 'Chunk-Größe (Wörter)',
          threshold: 'Relevanzschwelle',
          distance_function: 'Distanzfunktion',
          delimiter: 'Chunk-Trennzeichen',
          embed_model: 'Einbettungsmodell',
          embed_provider: 'Einbettungsanbieter',
          skip_foward: 'Chunks überspringen (vorwärts)',
          skip_back: 'Chunks überspringen (rückwärts)',
          actions: {
            preview: 'Vorschau',
            save: 'Speichern',
          },
        },
      },
      sliding: {
        title: 'Konfiguration des gleitenden Chunking',
        description: 'Richten Sie ein gleitendes Chunking mit überlappenden Abschnitten ein, um den Text präzise zu segmentieren.',
        name: 'Sliding',
        form: {
          size: 'Chunk-Größe',
          overlap: 'Überlappungsgröße',
          actions: {
            preview: 'Vorschau',
            save: 'Speichern',
          },
        },
      },
      snapping: {
        title: 'Konfiguration des Snapping-Chunks',
        description: 'Richten Sie snapping-basiertes Chunking mit vordefinierten Trennzeichen für strukturierte Texte ein.',
        name: 'Snapping',
        form: {
          size: 'Chunk-Größe',
          overlap: 'Überlappungsgröße',
          delimiter: 'Chunk-Trennzeichen',
          skip_foward: 'Chunks überspringen (vorwärts)',
          skip_back: 'Chunks überspringen (rückwärts)',
          actions: {
            preview: 'Vorschau',
            save: 'Speichern',
          },
        },
      },
    },

  },
  dashboard: {
    title: 'Dashboard',
    description: 'Verwalten Sie die LLMAO-Administrationsanwendung.',
    service_widgets: {
      agents: {
        title: 'Agenten',
        description: 'aktive Agenten',
        view_more: 'Mehr anzeigen',
      },
      users: {
        title: 'Benutzer',
        description: 'aktive Benutzer',
        view_more: 'Mehr anzeigen',
      },
      documents: {
        title: 'Dokumente',
        description: 'Gesamte Dokumente',
        view_more: 'Mehr anzeigen',
      },
      collections: {
        title: 'Sammlungen',
        description: 'Gesamte Sammlungen',
        view_more: 'Mehr anzeigen',
      },
    },
    chat_usage_line_chart: {
      title: 'Chat-Nutzung',
      period: {
        week: 'Woche',
        month: 'Monat',
        year: 'Jahr',
      },
    },
    chats: {
      most_recent: {
        title: 'Neueste Chats',
        description: 'Zeigt Ihren letzten Chatverlauf an',
      },
      all_chat_usage: {
        title: 'Gesamte Chat-Nutzung',
        description: 'Die häufigsten Chats durch die Nutzung aller Agenten',
        series_name: 'Agent',
        pie_chart_subtext: 'Gesamte Chats',
      },
      available_agents: {
        title: 'Verfügbare Agenten',
        description: 'Anzeigen und Interagieren mit verfügbaren KI-Agenten.',
      },
    },
    agents: {
      total_widget: {
        active: 'Aktiv',
      },
      providers: {
        title: 'Anbieter',
        description: 'Zeigt den aktiven Agentenanbieter an',
        series_name: 'Anbieter',
      },
      most_used_agent: {
        title: 'Meistgenutzter Agent',
        description: 'Am häufigsten verwendeter Agent durch alle Chats',
        chats: 'Chats',
      },
    },
    users: {
      total_widget: {
        total: 'Gesamt',
      },
      most_recent_users: {
        title: 'Neueste Benutzer',
        description: 'Finden Sie Ihre neuesten Benutzer',
      },
      user_roles: {
        admins: 'Administratoren',
        users: 'Benutzer',
        active: 'Aktiv',
        inactive: 'Inaktiv',
      },
    },
  },
  agents: {
    title: 'Agenten',
    all_agents: 'Alle Agenten',
    titles: {
      mainTitle: 'Agenten',
      details: 'Agentendetails',
      configuration: 'Konfiguration',
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
      unknown_instruction: 'Unbekannte Anweisung',
      unknown_date: 'Unbekanntes Datum',
      active_status: 'Aktiv',
      inactive_status: 'Inaktiv',
      created_at: 'Unbekanntes Datum',
      edit_agent: 'Agent bearbeiten',
      delete_agent: 'Agent löschen',
      view_more: 'Agentdetails anzeigen',
      empty_state_title: 'Agent nicht gefunden',
      empty_state_desc: 'Der gesuchte Agent existiert nicht oder ist derzeit nicht verfügbar. Bitte überprüfen Sie die Agentendaten erneut oder erstellen Sie einen neuen Agenten.',
      deactivate_agent: 'Agent deaktivieren',
      activate_agent: 'Agent aktivieren',
    },
    activate_agent: {
      title: 'Agent aktivieren',
      description: 'Aktivieren Sie den ausgewählten Agenten, um mit ihm zu chatten.',
      confirm: 'Aktivieren',
      cancel: 'Abbrechen',
      notifications: {
        success_title: 'Agent aktiviert',
        success_description: 'Der Agent wurde erfolgreich aktiviert.',
        error_title: 'Aktivierung fehlgeschlagen',
        error_description: 'Beim Aktivieren des Agenten ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
      },
    },
    deactivate_agent: {
      title: 'Agent deaktivieren',
      description: 'Deaktivieren Sie den ausgewählten Agenten.',
      confirm: 'Deaktivieren',
      cancel: 'Abbrechen',
      notifications: {
        success_title: 'Agent deaktiviert',
        success_description: 'Der Agent wurde erfolgreich deaktiviert.',
        error_title: 'Deaktivierung fehlgeschlagen',
        error_description: 'Beim Deaktivieren des Agenten ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
      },
    },
    labels: {
      id: 'Agenten-ID',
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
      active: 'Aktiv',
      status: 'Agentenstatus',
      languageInstruction: 'Sprachanweisung',
      summaryInstruction: 'Zusammenfassungsanweisung',
      titleInstruction: 'Titelanweisung',
    },
    buttons: {
      create: 'Agent Erstellen',
      edit: 'Bearbeiten',
      delete: 'Löschen',
      cancel: 'Abbrechen',
      save: 'Speichern',
      overview: 'Agentenübersicht',
      filter: 'Filtern',
    },
    placeholder: {
      llmProvider: 'LLM-Anbieter auswählen',
      model: 'Modell auswählen',
      vecotrProvider: 'Vektor-Anbieter auswählen',
      embeddingProvider: 'Embedding-Anbieter auswählen',
      search: 'Agenten suchen',
      agentName: 'Agentennamen eingeben',
      context: 'Agentenkontext eingeben...',
      description: 'Agentenbeschreibung eingeben',
      language: 'Agentensprache eingeben',
      languageInstruction: 'Sprachanweisung eingeben',
      summaryInstruction: 'Zusammenfassungsanweisung eingeben',
      titleInstruction: 'Titelanweisung eingeben',
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
    all_collections: 'Alle Sammlungen',
    empty_state: {
      title: 'Keine Sammlungen zugewiesen',
      description: 'Dieser Agent hat derzeit keine Sammlungen zugewiesen.',
    },

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
      empty_collection: 'Keine Sammlung verfügbar',
    },
    collection_card: {
      unknown_id: 'Unbekannte Sammlungs-ID',
      unknown_collectin_name: 'Unbekannter Sammlungsname',
      unknown_embedder: 'Unbekannter Einbettungsanbieter',
      unknown_model: 'Unbekanntes Modell',
      unknown_date: 'Unbekanntes Datum',
      empty_state_title: 'Sammlung nicht gefunden',
      empty_state_desc: 'Die gesuchte Sammlung existiert nicht oder ist derzeit nicht verfügbar. Bitte überprüfen Sie die Sammlungsdaten erneut oder versuchen Sie eine andere Suche.',
      view_more: 'Sammlungsdetails anzeigen',
      delete_collection: 'Sammlung löschen',

    },

    labels: {
      id: 'Sammlungs-ID',
      name: 'Sammlungsname',
      created_at: 'Erstellt am',
      updated_at: 'Aktualisiert am',
      provider: 'Anbieter',
      model: 'Modell',
      embedder: 'Einbettung',
      add_document: 'Dokumente zur Sammlung hinzufügen',
    },

    deleteModal: {
      title: 'Sammlung löschen',
      text: 'Sind Sie sicher, dass Sie diese Sammlung löschen möchten?',
    },
    rules: {
      name: {
        required_message: 'Bitte geben Sie den Sammlungsnamen ein',
        length_message: 'Der Name sollte zwischen {min} und {max} Zeichen lang sein',
        ascii_alphanumeric_underscored_message: 'Bitte geben Sie einen Namen ein, der mit einem Großbuchstaben beginnt und nur Buchstaben, Zahlen und Unterstriche für Leerzeichen ( _ ) enthält.',
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
    assign_collection: {
      agent_collections: 'Agenten-Sammlungen',
      title: 'Sammlung zuweisen',
      rules: {
        collection_name: 'Bitte wählen Sie eine Sammlung',
        amount: 'Bitte geben Sie eine Antworttiefe ein',
        instruction: 'Bitte geben Sie eine Anweisung ein',
      },
      placeholder: {
        select: 'Sammlung auswählen',
        instruction: 'Anweisung eingeben',
        amount: 'Geben Sie die Antworttiefe ein',
      },
      labels: {
        name: 'Sammlungsname',
        instructions: 'Anweisungen',
        amount: 'Antworttiefe',
      },
      descriptions: {
        response_depth: {
          low_depth: {
            title: 'Niedrige Tiefe (1-2 Chunks)',
            description: 'Ideal für präzise und präzise Antworten. Geeignet, wenn Sie kurze Antworten oder eine eng fokussierte Sammlung haben möchten.',
          },
          high_depth: {
            title: 'Hohe Tiefe (6+ Chunks)',
            description: 'Ruft ausführlichen Kontext für umfassende Antworten ab. Beste für große oder komplexe Sammlungen, in denen Abfragen einen tiefen Einblick in das Material erfordern.',
          },
          moderate_depth: {
            title: 'Mittlere Tiefe (3-5 Chunks)',
            description: 'Bietet mehr Kontext für abgestimmte oder detaillierte Abfragen. Empfohlen für Sammlungen mit mittelgroßen Dokumenten oder unterschiedlichen Themen.',
          },
          note: 'Hinweis: Das Anpassen dieser Einstellung hat sowohl Auswirkungen auf die Detailtiefe der Antwort als auch auf die Geschwindigkeit der Verarbeitung des Agenten. Wählen Sie eine Tiefe, die Ihren Bedarf an Detail mit der Leistung des Agenten abgleicht.',
        },
      },

      notification: {
        error_title: 'Fehler',
        assign_error_title: 'Fehler beim Zuweisen der Sammlung zum Agenten!',
        assign_cuccess_title: 'Sammlung zugewiesen!',
        delete_collection: 'Sie haben keine Sammlung zum Löschen, bitte weisen Sie eine neue Sammlung zu!',
        update_error_collection: 'Aktualisierung der Sammlung fehlgeschlagen.',
        update_collection: 'Sammlung erfolgreich aktualisiert!',
      },
    },
  },

  users: {
    empty_title: 'Benutzer nicht gefunden.',
    empty_description: 'Der Benutzer, den Sie suchen, existiert nicht oder ist derzeit nicht verfügbar. Bitte überprüfen Sie die Benutzerinformationen erneut oder versuchen Sie eine andere Suche.',
    title: 'Benutzer',
    description: 'Verwalten Sie die Mitglieder Ihres Teams und legen Sie deren Zugriffsrechte fest.',
    invite_user: 'Benutzer einladen',
    all_users: 'Alle Benutzer',
    delete_user: {
      title: 'Benutzer löschen',
      description: 'Sind Sie sicher, dass Sie diesen Benutzer löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
      confirm: 'Löschen',
      cancel: 'Abbrechen',
      notifications: {
        success_title: 'Benutzer gelöscht',
        success_description: 'Der Benutzer wurde erfolgreich gelöscht.',
        error_title: 'Löschen fehlgeschlagen',
        error_description: 'Ein Fehler ist aufgetreten. Der Benutzer konnte nicht gelöscht werden.',
      },
    },
    edit_user: {
      title: 'Benutzer Bearbeiten',
      description: 'Ändern Sie die Benutzerdetails unten.',
      confirm: 'Änderungen Speichern',
      cancel: 'Abbrechen',
      notifications: {
        success_title: 'Änderungen Gespeichert',
        success_description: 'Die Benutzerinformationen wurden erfolgreich aktualisiert.',
        error_title: 'Aktualisierung Fehlgeschlagen',
        error_description: 'Beim Aktualisieren der Benutzerinformationen ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
      },
    },
    activate_user: {
      title: 'Benutzer Aktivieren',
      description: 'Aktivieren Sie den ausgewählten Benutzer, um den Zugriff zu ermöglichen.',
      confirm: 'Aktivieren',
      cancel: 'Abbrechen',
      notifications: {
        success_title: 'Benutzer Aktiviert',
        success_description: 'Der Benutzer wurde erfolgreich aktiviert.',
        error_title: 'Aktivierung Fehlgeschlagen',
        error_description: 'Beim Aktivieren des Benutzers ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
      },
    },
    deactivate_user: {
      title: 'Benutzer Deaktivieren',
      description: 'Deaktivieren Sie den ausgewählten Benutzer, um den Zugriff einzuschränken.',
      confirm: 'Deaktivieren',
      cancel: 'Abbrechen',
      notifications: {
        success_title: 'Benutzer Deaktiviert',
        success_description: 'Der Benutzer wurde erfolgreich deaktiviert.',
        error_title: 'Deaktivierung Fehlgeschlagen',
        error_description: 'Beim Deaktivieren des Benutzers ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
      },
    },
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
      delete_user_title: 'Löschen',
      activate_user_title: 'Aktivieren',
      deactivate_user_title: 'Deaktivieren',
      edit_user_title: 'Bearbeiten',
      activate_user: 'Benutzer aktivieren',
      deactivate_user: 'Benutzer deaktivieren',
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
