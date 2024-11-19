export default {
  details: 'Dettagli',
  chatDock: 'Pannello chat',
  login: {
    title: 'Login',
    description: 'Scegli un metodo di accesso',
    continueWith: 'Continua con',
  },
  timePeriod: {
    today: 'Oggi',
    yesterday: 'Ieri',
    last7days: 'Ultimi 7 giorni',
    last30days: 'Ultimi 30 giorni',
    lastYear: 'L\'anno scorso',
    unknown_date: 'Data sconosciuta',
  },
  sort: {
    title: 'Opzioni di ordinamento',
    description: 'Ordina per',
    asc: 'Ascendente',
    desc: 'Discendente',
  },
  profileDropdown: {
    switchToAdmin: 'Passa all\'amministratore',
    switchToUser: 'Passa all\'utente',
    profile: 'Profilo',
    settings: 'Impostazioni',
    agents: 'Agenti',
    support: 'Supporto',
    signOut: 'Disconnetti',
  },
  getHelp: {
    title: 'Richiedi aiuto',
  },
  form_rules: {
    required: 'Questo campo è obbligatorio',
    min_length: 'Il numero minimo di caratteri richiesti è {min}',
    max_length: 'Il numero massimo di caratteri è {max}',
  },
  chat: {
    user: 'Utente',
    assistant: 'Assistente',
    messages: 'Messaggi',
    inactive_agent: 'Questo agente non è più attivo. Seleziona un agente attivo per iniziare una nuova conversazione. ',
    admin: {
      title: 'Chat',
      description: 'Gestisci tutte le tue chat in un unico posto',
      chat_card: {
        title: 'Titolo',
        unknown_title: 'Sconosciuto',
        created_at: 'Creato il',
        updated_at: 'Aggiornato il',
        view_details: 'Visualizza dettagli',
        edit_chat: 'Modifica chat',
        delete_chat: 'Elimina chat',
      },
      chat_details: {
        title: 'Dettagli della chat',
        description: 'Visualizza tutti i dettagli relativi a questa chat',
        empty_messages: 'Attualmente non ci sono messaggi in questa chat',
      },
    },
    edit_title: {
      title: 'Modifica titolo',
      title_label: 'Titolo',
      title_placeholder: 'Inserisci un nuovo titolo',
      notifications: {
        success_title: 'Titolo aggiornato con successo',
        success_description: 'Il titolo della chat è stato aggiornato con successo.',
        error_title: 'Errore',
        error_description: 'Si è verificato un errore durante l\'impostazione del nuovo titolo della chat.',
      },
    },
    delete_chat: {
      title: 'Elimina chat',
      description: 'Sei sicuro di voler eliminare la chat?',
      notifications: {
        success_title: 'Eliminato con successo',
        success_description: 'La chat è stata eliminata con successo.',
        error_title: 'Errore',
        error_description: 'Si è verificato un errore durante l\'eliminazione della chat.',
      },
    },
    chatInputPlaceholder: 'Invia un messaggio',
    chatHistory: 'Cronologia chat',
    newChat: {
      title: 'Nuova chat',
      description: 'Scegli un agente per avviare la chat',
      choseFrom: 'Agenti:',
      empty: 'Attualmente non ci sono agenti disponibili per la conversazione. Per avviare una chat, è necessario aggiungere o abilitare almeno un agente. Si prega di contattare l\'amministratore di sistema o verificare le impostazioni degli agenti per continuare.',
    },
  },
  documents: {
    title: 'Documenti',
    description: 'Gestisci e organizza tutti i documenti che aiutano l\'IA nell\'apprendimento.',
    name: 'Nome',
    extension: 'Formato',
    path: 'Posizione',
    source: 'Fonte',
    id: 'ID Documento',
    hash: 'Hash',
    details: {
      empty: 'Questo documento non è disponibile o non esiste più.',
    },
    notifications: {
      create: {
        success_title: 'Nuovo Documento',
        success_description: 'Nuovo documento creato con successo',
        error_title: 'Nuovo Documento',
        error_description: 'Errore durante l\'aggiunta',
        error_existing_document_title: 'Documento Esistente',
        error_existing_document_description: 'Questo documento esiste già',
        error_file_size_title: 'Problema di Dimensione del File',
        error_file_size_description: 'La dimensione del file non può superare i 50 MB!',
        error_file_type_title: 'Problema di Formato del File',
        error_file_type_description: 'Il file deve essere in formato PDF, TXT, JSON o DOCX!',
      },
    },

  },
  dashboard: {
    title: 'Pannello di controllo',
    description: 'Gestisci l\'app di amministrazione LLMAO.',
    service_widgets: {
      agents: {
        title: 'Agenti',
        description: 'agenti attivi',
        view_more: 'Visualizza di più',
      },
      users: {
        title: 'Utenti',
        description: 'utenti attivi',
        view_more: 'Visualizza di più',
      },
      documents: {
        title: 'Documenti',
        description: 'Totale documenti',
        view_more: 'Visualizza di più',
      },
      collections: {
        title: 'Collezioni',
        description: 'Totale collezioni',
        view_more: 'Visualizza di più',
      },
    },
    chat_usage_line_chart: {
      title: 'Utilizzo della chat',
      period: {
        week: 'Settimana',
        month: 'Mese',
        year: 'Anno',
      },
    },
    chats: {
      most_recent: {
        title: 'Chat recenti',
        description: 'Mostra la cronologia delle tue chat più recenti',
      },
      all_chat_usage: {
        title: 'Utilizzo di tutte le chat',
        description: 'Chat più comuni per utilizzo di tutti gli agenti',
        series_name: 'Agente',
        pie_chart_subtext: 'Totale chat',
      },
      available_agents: {
        title: 'Agenti disponibili',
        description: 'Visualizzazione degli agenti disponibili per la comunicazione',
      },
    },
    agents: {
      total_widget: {
        active: 'Attivo',
      },
      providers: {
        title: 'Fornitori',
        description: 'Mostra il fornitore degli agenti attivi',
        series_name: 'Fornitore',
      },
      most_used_agent: {
        title: 'Agente più utilizzato',
        description: 'Agente più comune per l\'uso di tutte le chat',
        chats: 'Chat',
      },
    },
    users: {
      total_widget: {
        total: 'Totale',
      },
      most_recent_users: {
        title: 'Utenti più recenti',
        description: 'Trova i tuoi utenti più recenti',
      },
      user_roles: {
        admins: 'Amministratori',
        users: 'Utenti',
        active: 'Attivo',
        inactive: 'Inattivo',
      },
    },
  },
  agents: {
    title: 'Agenti',
    titles: {
      mainTitle: 'Agenti',
      details: 'Dettagli agente',
      description: 'Gestisci gli agenti responsabili dell’interazione con l’AI',
      edit: 'Modifica agente',
      create: 'Crea agente',
      createDescription: 'Crea un nuovo agente fornendo il nome e il contesto per iniziare!',
      deleteTitle: 'Eliminare l’agente?',
      deleteDescription: 'Sei sicuro di voler eliminare l’agente?',
    },
    agent_card: {
      unknown_id: 'ID agente sconosciuto',
      unknown_agentname: 'Nome agente sconosciuto',
      unknown_agentcontext: 'Contesto agente mancante',
      unknown_description: 'Descrizione agente mancante',
      unknown_llmProvider: 'llmProvider sconosciuto',
      unknown_model: 'Modello sconosciuto',
      unknown_language: 'Lingua sconosciuta',
      unknown_temperature: 'Temperatura sconosciuta',
      unknown_vectorProvider: 'Fornitore di vettori sconosciuto',
      unknown_embeddingProvider: 'Fornitore di embedding sconosciuto',
      unknown_embeddingModel: 'Modello di embedding sconosciuto',
      unknown_instruction: 'Istruzione sconosciuta',
      unknown_date: 'Data sconosciuta',
      active_status: 'Attivo',
      inactive_status: 'Inattivo',
      created_at: 'Data sconosciuta',
      edit_agent: 'Modifica agente',
      delete_agent: 'Elimina agente',
      view_more: 'Visualizza dettagli agente',
    },

    labels: {
      id: 'ID Agente',
      name: 'Nome Agente',
      context: 'Contesto',
      created_at: 'Creato il',
      updated_at: 'Aggiornato il',
      actions: 'Azioni',
      description: 'Descrizione',
      llmProvider: 'Fornitore LLM',
      model: 'Modello',
      language: 'Lingua',
      temperature: 'Temperatura',
      vectorProvider: 'Fornitore Vettoriale',
      embeddingProvider: 'Fornitore Embedding',
      embeddingModel: 'Modello Embedding',
      active: 'Attivo',
      status: 'Stato Agente',
      languageInstruction: 'Istruzione Lingua',
      summaryInstruction: 'Istruzione Sommario',
      titleInstruction: 'Istruzione Titolo',
    },
    buttons: {
      create: 'Crea Agente',
      edit: 'Modifica',
      delete: 'Elimina',
      cancel: 'Annulla',
      save: 'Salva',
      overview: 'Panoramica Agente',
      filter: 'Filtra',
    },
    placeholder: {
      llmProvider: 'Seleziona Fornitore LLM',
      model: 'Seleziona Modello',
      vecotrProvider: 'Seleziona Fornitore Vettoriale',
      embeddingProvider: 'Seleziona Fornitore Embedding',
      search: 'Cerca Agenti',
      agentName: 'Inserisci Nome Agente',
      context: 'Inserisci Contesto Agente...',
      description: 'Inserisci Descrizione Agente',
      language: 'Inserisci Lingua Agente',
      languageInstruction: 'Inserisci Istruzioni Lingua Agente',
      summaryInstruction: 'Inserisci Istruzioni Sommario Agente',
      titleInstruction: 'Inserisci Istruzioni Titolo Agente',
    },

    notifications: {
      delete_title: 'Successo',
      delete_message: 'Agente {name} eliminato!',
      update_title: 'Successo',
      update_message: 'Agente {name} aggiornato!',
      create_title: 'Successo',
      create_message: 'Agente {name} creato!',
      form_title: 'Errore nel modulo',
      form_message: 'Correggi gli errori evidenziati nel modulo.',
      invalid_agent: 'Oops! Qualcosa è andato storto. L’agente che stai tentando di eliminare sembra non esistere.',
    },
    rules: {
      name: {
        required_message: 'Inserisci il nome dell’agente',
        length_message: 'Il nome deve essere tra {min} e {max} caratteri',
      },
      context: {
        required_message: 'Inserisci il contesto dell’agente',
        length_message: 'Il contesto deve essere tra {min} e {max} caratteri',
      },
      description: {
        required_message: 'Fornisci una descrizione',
      },
      llmProvider: {
        required_message: 'Seleziona un fornitore LLM valido',
      },
      model: {
        required_message: 'Seleziona un modello',
      },
      language: {
        required_message: 'Seleziona una lingua',
      },
      temperature: {
        required_message: 'Imposta una temperatura tra 0 e 1',
      },
      vectorProvider: {
        required_message: 'Seleziona un fornitore vettoriale valido',
      },
      embeddingProvider: {
        required_message: 'Seleziona un fornitore embedding',
      },
      embeddingModel: {
        required_message: 'Fornisci un modello embedding',
      },
      active: {
        required_message: 'Specifica se l’agente è attivo',
      },
    },
  },

  collections: {
    title: 'Collezioni',
    titles: {
      title: 'Collezioni',
      subTitle: 'Gestisci le collezioni di contenuti che guidano la base di conoscenza dell\'IA.',
      deleteTitle: 'Eliminare la collezione?',
      deleteDescription: 'Sei sicuro di voler eliminare la collezione?',
      create: 'Crea collezione',
      createDescription: 'Crea una nuova collezione in base alle tue esigenze!',
    },
    buttons: {
      create: 'Crea collezione',
      delete: 'Elimina',
      cancel: 'Annulla',
      save: 'Salva',
      filter: 'Filtra',
    },
    placeholders: {
      search: 'Cerca collezioni',
      vectorPlaceholder: 'Seleziona il fornitore di vettori',
      embeddingPlaceholder: 'Seleziona il fornitore di embeddings',
      modelPlaceholder: 'Seleziona il modello',
      collectionName: 'Inserisci il nome della collezione',
    },
    collection_card: {
      unknown_id: 'ID della collezione sconosciuto',
      unknown_collectin_name: 'Nome della collezione sconosciuto',
      unknown_provider: 'Provider sconosciuto',
      unknown_embedder: 'Provider di embedding sconosciuto',
      unknown_model: 'Modello sconosciuto',
      unknown_date: 'Data sconosciuta',
    },

    labels: {
      id: 'ID della collezione',
      name: 'Nome della collezione',
      created_at: 'Creato il',
      updated_at: 'Aggiornato il',
      provider: 'Provider',
      model: 'Modello',
      embedder: 'Incorporatore',
    },

    deleteModal: {
      title: 'Elimina collezione',
      text: 'Sei sicuro di voler eliminare questa collezione?',
    },
    rules: {
      name: {
        required_message: 'Inserisci il nome della collezione',
        length_message: 'Il nome deve essere lungo da {min} a {max} caratteri',
        ascii_alphanumeric_underscored_message: 'Inserisci un nome che inizi con una lettera maiuscola e contenga solo lettere, numeri e trattini bassi per spaziatura ( _ ).',
      },
      vectorProvider: 'Seleziona il fornitore di vettori',
      embeddingProvider: 'Seleziona il fornitore di embeddings',
      model: 'Seleziona un modello',
    },
    notifications: {
      delete_title: 'Successo',
      delete_message: 'La collezione {name} è stata eliminata!',
      delete_error: 'La collezione non è stata eliminata',
      create_title: 'Successo',
      create_message: 'La collezione {name} è stata creata!',
      form_title: 'Errore nel modulo',
      form_message: 'Correggi gli errori evidenziati nel modulo.',
      invalid_collection: 'Oops! Qualcosa è andato storto. Sembra che la collezione che stai cercando di eliminare non esista.',
    },
    assign_collection: {
      title: 'Assegna Collezione',
      rules: {
        collection_name: 'Per favore seleziona una collezione',
        amount: 'Per favore inserisci una quantità',
        instruction: 'Per favore inserisci un’istruzione',
      },
      placeholder: {
        select: 'Seleziona collezione',
        instruction: 'Inserisci istruzione',
        amount: 'Inserisci quantità',
      },
      labels: {
        name: 'Nome della collezione',
        instructions: 'Istruzioni',
        amount: 'Quantità',
      },
      notification: {
        error_title: 'Errore',
        assign_error_title: 'Errore nell’assegnazione della collezione all’agente!',
        assign_cuccess_title: 'Collezione assegnata!',
        delete_collection: 'Non ci sono collezioni da eliminare, per favore assegna una nuova collezione!',
      },
    },
  },

  users: {
    title: 'Utenti',
    description: 'Gestisci i membri del tuo team e imposta i loro livelli di accesso.',
    invite_user: 'Invita utente',
    all_users: 'Tutti gli utenti',
    delete_user: {
      title: 'Elimina Utente',
      description: 'Sei sicuro di voler eliminare questo utente? Questa azione non può essere annullata.',
      confirm: 'Elimina',
      cancel: 'Annulla',
      notifications: {
        success_title: 'Utente Eliminato',
        success_description: 'L\'utente è stato eliminato con successo.',
        error_title: 'Eliminazione Fallita',
        error_description: 'Si è verificato un errore. L\'utente non è stato eliminato.',
      },
    },
    edit_user: {
      title: 'Modifica Utente',
      description: 'Apporta modifiche ai dettagli dell\'utente di seguito.',
      confirm: 'Salva Modifiche',
      cancel: 'Annulla',
      notifications: {
        success_title: 'Modifiche Salvate',
        success_description: 'Le informazioni dell\'utente sono state aggiornate con successo.',
        error_title: 'Aggiornamento Fallito',
        error_description: 'Si è verificato un errore durante l\'aggiornamento delle informazioni dell\'utente. Per favore riprova.',
      },
    },
    activate_user: {
      title: 'Attiva Utente',
      description: 'Attiva l\'utente selezionato per consentire l\'accesso.',
      confirm: 'Attiva',
      cancel: 'Annulla',
      notifications: {
        success_title: 'Utente Attivato',
        success_description: 'L\'utente è stato attivato con successo.',
        error_title: 'Attivazione Fallita',
        error_description: 'Si è verificato un errore durante l\'attivazione dell\'utente. Per favore riprova.',
      },
    },
    deactivate_user: {
      title: 'Disattiva Utente',
      description: 'Disattiva l\'utente selezionato per limitare l\'accesso.',
      confirm: 'Disattiva',
      cancel: 'Annulla',
      notifications: {
        success_title: 'Utente Disattivato',
        success_description: 'L\'utente è stato disattivato con successo.',
        error_title: 'Disattivazione Fallita',
        error_description: 'Si è verificato un errore durante la disattivazione dell\'utente. Per favore riprova.',
      },
    },
    form: {
      first_name: 'Nome',
      first_name_placeholder: 'Inserisci il nome',
      last_name: 'Cognome',
      last_name_placeholder: 'Inserisci il cognome',
      email: 'Email',
      email_placeholder: 'Inserisci l\'indirizzo email',
      role: 'Ruolo',
      role_placeholder: 'Seleziona un ruolo per l\'utente',
      submit: 'Conferma',
      cancel: 'Annulla',
      rules: {
        required: 'Questo campo è obbligatorio',
        invalid_email: 'Formato e-mail non valido',
      },
    },
    notifications: {
      create_error_title: 'Errore nell\'aggiunta dell\'utente',
      create_error_description: 'Impossibile aggiungere un nuovo utente.',
      create_error_existing_user_description: 'L\'utente esiste già.',
    },

    user_card: {
      role: 'Ruolo',
      status: 'Stato',
      active_status: 'Attivo',
      inactive_status: 'Inattivo',
      created_at: 'Creato',
      view_more: 'Visualizza dettagli utente',
      edit_user: 'Modifica utente',
      delete_user: 'Elimina utente',
      delete_user_title: 'Elimina',
      activate_user_title: 'Attiva',
      deactivate_user_title: 'Disattiva',
      edit_user_title: 'Modifica',
      activate_user: 'Attiva utente',
      deactivate_user: 'Disattiva utente',
      adminRole: 'Amministratore',
      userRole: 'Utente',
      updated_at: 'Aggiornato il',
      user_id: 'ID Utente',
      first_name: 'Nome',
      last_name: 'Cognome',
      username: 'Nome utente',
      email: 'Email',
    },

  },

  error_notifications: {
    default: 'Si è verificato un errore sconosciuto.',
    status_400: 'Richiesta non valida: Per favore riprova.',
    status_401: 'Non autorizzato: Devi essere connesso per accedere a questo.',
    status_403: 'Proibito: Non hai il permesso di accedere a questa risorsa.',
    status_404: 'Non trovato: La risorsa che stai cercando non esiste.',
    status_422: 'Entità non elaborabile: Si è verificato un problema con i dati forniti.',
    status_500: 'Errore del server: Qualcosa è andato storto da parte nostra. Per favore riprova più tardi.',
    status_503: 'Servizio non disponibile: Il server non è attualmente in grado di gestire la richiesta.',
  },

}
