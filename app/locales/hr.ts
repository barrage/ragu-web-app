export default {
  details: 'Detalji',
  chatDock: 'Chat panel',
  login: {
    title: 'Prijava',
    description: 'Odaberite način prijave',
    continueWith: 'Nastavite sa',
  },
  timePeriod: {
    today: 'Danas',
    yesterday: 'Jučer',
    last7days: 'Posljednjih 7 dana',
    last30days: 'Posljednjih 30 dana',
    lastYear: 'Prošle godine',
  },

  profileDropdown: {
    switchToAdmin: 'Prebaci se na Administratora',
    switchToUser: 'Prebaci se na Korisnika',
    profile: 'Profil',
    settings: 'Postavke',
    agents: 'Agenti',
    support: 'Podrška',
    signOut: 'Odjavi se',
  },
  getHelp: {
    title: 'Traži pomoć',
  },

  chat: {
    editTitle: 'Uredi naslov',
    deleteChat: 'Izbriši chat',
    chatInputPlaceholder: 'Pošalji poruku',
    chatHistory: 'Povijest chata',

    newChat: {
      title: 'Novi chat',
      description: 'Izaberite agenta s kojim želite započeti razgovor',
      choseFrom: 'Agenti:',
    },
  },
  documents: {
    title: 'Dokumenti',
    description: 'Upravljajte i organizirajte sve dokumente koji pomažu AI-ju u učenju.',
    name: 'Naziv',
    extension: 'Format',
    path: 'Lokacija',
    source: 'Izvor',
    id: 'Dokument ID',
    hash: 'Hash',
  },
  users: {
    title: 'Korisnici',
    description: 'Upravljajte članovima svog tima i postavite njihove razine pristupa.',
    invite_user: 'Dodaj korisnika',
    user_card: {
      role: 'Uloga',
      status: 'Status',
      active_status: 'Aktivan',
      inactive_status: 'Neaktivan',
      created_at: 'Kreiran',
      view_more: 'Pogledaj detalje korisnika',
      edit_user: 'Uredi korisnika',
      delete_user: 'Obrisi korisnika',
      adminRole: 'Administrator',
      userRole: 'Korisnik',
      updated_at: 'Ažurirano',
      user_id: 'Korisnički ID',
      first_name: 'Ime',
      last_name: 'Prezime',
      username: 'Korisničko ime',
      email: 'Email',
    },
  },
  dashboard: {
    title: 'Nadzorna ploča',
    description: '',
  },
  agents: {
    title: 'Agenti',
    titles: {
      mainTitle: 'Agenti',
      details: 'Detalji agenta',
      description: 'Upravljajte agentima odgovornim za interakciju s AI',
      edit: 'Uredi agenta',
      create: 'Stvori agenta',
      createDescription: 'Stvorite novog agenta unosom njegovog imena i konteksta kako biste započeli!',
      deleteTitle: 'Izbrisati agenta?',
      deleteDescription: 'Jeste li sigurni da želite izbrisati agenta?',
    },
    agent_card: {
      unknown_id: 'Nepoznati ID agenta',
      unknown_agentname: 'Nepoznato ime agenta',
      unknown_agentcontext: 'Nedostaje kontekst agenta',
      unknown_description: 'Nedostaje opis agenta',
      unknown_llmProvider: 'Nepoznati llmProvider',
      unknown_model: 'Nepoznati model',
      unknown_language: 'Nepoznati jezik',
      unknown_temperature: 'Nepoznata temperatura',
      unknown_vectorProvider: 'Nepoznati pružatelj vektora',
      unknown_embeddingProvider: 'Nepoznati pružatelj ugrađivanja',
      unknown_embeddingModel: 'Nepoznati model ugrađivanja',
      unknown_date: 'Nepoznati datum',
      active_status: 'Aktivan',
      inactive_status: 'Neaktivan',
      created_at: 'Nepoznati datum',
      edit_agent: 'Uredi agenta',
      delete_agent: 'Obriši agenta',
      view_more: 'Pogledajte detalje agenta',
    },
    labels: {
      id: 'Agent ID',
      name: 'Ime agenta',
      context: 'Kontekst',
      created_at: 'Stvoren',
      updated_at: 'Ažuriran',
      actions: 'Radnje',
      description: 'Opis',
      llmProvider: 'LLM davatelj',
      model: 'Model',
      language: 'Jezik',
      temperature: 'Temperatura',
      vectorProvider: 'Davatelj vektora',
      embeddingProvider: 'Davatelj ugrađivanja',
      embeddingModel: 'Model ugrađivanja',
      active: 'aktivan',
      status: 'Status agenta',
    },
    buttons: {
      create: 'Stvori agenta',
      edit: 'Uredi',
      delete: 'Izbriši',
      cancel: 'Otkaži',
      save: 'Spremi',
      overview: 'Pregled agenta',
      filter: 'Filter',
    },

    placeholder: {
      llmProvider: 'Odaberite LLM davatelja',
      model: 'Odaberite model',
      vecotrProvider: 'Odaberite davatelja vektora',
      embeddingProvider: 'Odaberite davatelja ugrađivanja',
      search: 'Pretraži agente',

    },

    notifications: {
      delete_title: 'Uspjeh',
      delete_message: 'Agent {name} je izbrisan!',
      update_title: 'Uspjeh',
      update_message: 'Agent {name} je ažuriran!',
      create_title: 'Uspjeh',
      create_message: 'Agent {name} je stvoren!',
      form_title: 'Pogreška u obrascu',
      form_message: 'Ispravite istaknute pogreške u obrascu.',
      invalid_agent: 'Oops! Nešto je pošlo po zlu. Čini se da agent kojeg pokušavate izbrisati ne postoji.',
    },
    rules: {
      name: {
        required_message: 'Molimo unesite ime agenta',
        length_message: 'Ime treba imati između {min} i {max} znakova',
      },
      context: {
        required_message: 'Molimo unesite kontekst agenta',
        length_message: 'Kontekst treba imati između {min} i {max} znakova',
      },
      description: {
        required_message: 'Molimo pružite opis',
      },
      llmProvider: {
        required_message: 'Molimo odaberite valjanog LLM davatelja',
      },
      model: {
        required_message: 'Molimo odaberite model',
      },
      language: {
        required_message: 'Molimo odaberite jezik',
      },
      temperature: {
        required_message: 'Molimo postavite temperaturu između 0 i 1',
      },
      vectorProvider: {
        required_message: 'Molimo odaberite valjanog davatelja vektora',
      },
      embeddingProvider: {
        required_message: 'Molimo odaberite davatelja ugrađivanja',
      },
      embeddingModel: {
        required_message: 'Molimo unesite model ugrađivanja',
      },
      active: {
        required_message: 'Molimo navedite je li agent aktivan',
      },
    },
  },

  collections: {
    title: 'Kolekcije',
    titles: {
      title: 'Kolekcije',
      subTitle: 'Upravljajte kolekcijama sadržaja koje vode bazu znanja AI-a.',
      deleteTitle: 'Izbrisati kolekciju?',
      deleteDescription: 'Jeste li sigurni da želite izbrisati kolekciju?',
      create: 'Kreiraj kolekciju',
      createDescription: 'Kreirajte novu kolekciju prema vašim potrebama!',
    },
    buttons: {
      create: 'Kreiraj kolekciju',
      delete: 'Izbriši',
      cancel: 'Otkaži',
      save: 'Spremi',
      filter: 'Filtriraj',
    },
    placeholders: {
      search: 'Pretraži kolekcije',
      vectorPlaceholder: 'Odaberi davatelja vektora',
      embeddingPlaceholder: 'Odaberi davatelja ugrađivanja',
      modelPlaceholder: 'Odaberi model',
    },
    labels: {
      name: 'Naziv kolekcije',
      vectorProvider: 'Davatelj vektora',
      embeddingProvider: 'Davatelj ugrađivanja',
      model: 'Model',
      updated_at: 'Ažurirano',
      created_at: 'Kreirano',
    },
    deleteModal: {
      title: 'Izbriši kolekciju',
      text: 'Jeste li sigurni da želite izbrisati ovu kolekciju?',
    },
    rules: {
      name: {
        required_message: 'Unesite naziv kolekcije',
        length_message: 'Naziv bi trebao imati između {min} i {max} znakova',
      },
      vectorProvider: 'Odaberite davatelja vektora',
      embeddingProvider: 'Odaberite davatelja ugrađivanja',
      model: 'Odaberite model',
    },
    notifications: {
      delete_title: 'Uspjeh',
      delete_message: 'Kolekcija {name} je izbrisana!',
      delete_error: 'Kolekcija nije izbrisana',
      create_title: 'Uspjeh',
      create_message: 'Kolekcija {name} je kreirana!',
      form_title: 'Greška u obrascu',
      form_message: 'Molimo popravite označene greške u obrascu.',
      invalid_collection: 'Ups! Nešto je pošlo po zlu. Čini se da kolekcija koju pokušavate izbrisati ne postoji.',
    },
  },

  auth: {
    notifications: {
      user_authenticate: 'Korisnik nije autentificiran, preusmjerava se na prijavu',
    },

  },

}
