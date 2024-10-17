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
      unknown_agentname: 'Nome agente sconosciuto',
      unknown_agentcontext: 'Contesto agente mancante',
      active_status: 'Attivo',
      inactive_status: 'Inattivo',
      created_at: 'Data sconosciuta',
      edit_agent: 'Modifica agente',
      delete_agent: 'Elimina agente',
    },
    labels: {
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
    },
    labels: {
      name: 'Nome della collezione',
      vectorProvider: 'Fornitore di vettori',
      embeddingProvider: 'Fornitore di embeddings',
      model: 'Modello',
      updated_at: 'Aggiornato il',
      created_at: 'Creato il',
    },
    deleteModal: {
      title: 'Elimina collezione',
      text: 'Sei sicuro di voler eliminare questa collezione?',
    },
    rules: {
      name: {
        required_message: 'Inserisci il nome della collezione',
        length_message: 'Il nome deve essere lungo da {min} a {max} caratteri',
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

}
