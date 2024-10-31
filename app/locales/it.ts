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
  chat: {
    user: 'Utente',
    assistant: 'Assistente',
    admin: {
      title: 'Chat',
      description: 'Gestisci tutte le tue chat in un unico posto',
      chat_card: {
        created_at: 'Creato il',
        updated_at: 'Aggiornato il',
        view_details: 'Visualizza dettagli',
        edit_chat: 'Modifica chat',
        delete_chat: 'Elimina chat',
      },
      chat_details: {
        title: 'Dettagli della chat',
        description: 'Visualizza tutti i dettagli relativi a questa chat',
      },
    },
    editTitle: 'Modifica titolo',
    deleteChat: 'Elimina chat',
    chatInputPlaceholder: 'Invia un messaggio',
    chatHistory: 'Cronologia chat',
    newChat: {
      title: 'Nuova chat',
      description: 'Scegli un agente per avviare la chat',
      choseFrom: 'Agenti:',
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
      unknown_date: 'Data sconosciuta',
      active_status: 'Attivo',
      inactive_status: 'Inattivo',
      created_at: 'Data sconosciuta',
      edit_agent: 'Modifica agente',
      delete_agent: 'Elimina agente',
      view_more: 'Visualizza dettagli agente',
    },

    labels: {
      id: 'Agente ID',
      name: 'Nome agente',
      context: 'Contesto',
      created_at: 'Creato il',
      updated_at: 'Aggiornato il',
      actions: 'Azioni',
      description: 'Descrizione',
      llmProvider: 'Fornitore LLM',
      model: 'Modello',
      language: 'Lingua',
      temperature: 'Temperatura',
      vectorProvider: 'Fornitore vettoriale',
      embeddingProvider: 'Fornitore embedding',
      embeddingModel: 'Modello embedding',
      active: 'attivo',
      status: 'Stato agente',
    },
    buttons: {
      create: 'Crea agente',
      edit: 'Modifica',
      delete: 'Elimina',
      cancel: 'Annulla',
      save: 'Salva',
      overview: 'Panoramica agente',
      filter: 'Filtro',
    },

    placeholder: {
      llmProvider: 'Seleziona fornitore LLM',
      model: 'Seleziona modello',
      vecotrProvider: 'Seleziona fornitore vettoriale',
      embeddingProvider: 'Seleziona fornitore embedding',
      search: 'Cerca agenti',

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
        ascii_alphanumeric_underscored_message: 'Inserisci un nome che inizi con una lettera maiuscola e contenga solo lettere, numeri o trattini bassi ( _ ).',
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
  },

  users: {
    title: 'Utenti',
    description: 'Gestisci i membri del tuo team e imposta i loro livelli di accesso.',
    invite_user: 'Invita utente',
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
