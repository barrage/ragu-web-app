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
      description: 'Upravljajte agentima odgovornima za interakciju s AI-om.',
      edit: 'Uredi agenta',
      create: 'Kreiraj agenta',
      createDescription: 'Stvorite svog novog agenta tako da navedete njegovo ime i kontekst da biste započeli!',
      deleteTitle: 'Izbriši agenta',
      deleteDescription: 'Jeste li sigurni da želite izbrisati agenta?',

    },
    labels: {
      name: 'Naziv',
      context: 'Kontekst',
      created_at: 'Kreiran',
      updated_at: 'Ažuriran',
      actions: 'Radnje',
    },
    buttons: {
      create: 'Kreiraj agenta',
      edit: 'Uredi',
      delete: 'Izbriši',
      cancel: 'Odustani',
      save: 'Spremi',
    },
    popconfirm: 'Izbriši {name} agenta?',
    notifications: {
      delete_title: 'Uspjeh',
      delete_message: 'Agent {name} je izbrisan!',
      update_title: 'Uspjeh',
      update_message: 'Agent {name} je ažuriran!',
      create_title: 'Uspjeh',
      create_message: 'Agent {name} je kreiran!',
      form_title: 'Greška u obrascu',
      form_message: 'Molimo popravite označene pogreške u obrascu.',
      invalid_agent: 'Ups! Nešto nije u redu. Čini se da agent kojeg pokušavate izbrisati ne postoji.',
    },
    rules: {
      name: {
        required_message: 'Molimo unesite ime agenta',
        length_message: 'Ime mora biti dugačko između {min} i {max} znakova',
      },
      context: {
        required_message: 'Molimo unesite kontekst agenta',
        length_message: 'Kontekst mora biti dugačak između {min} i {max} znakova',
      },
    },

  },
  collections: {
    title: 'Kolekcije',
    titles: {
      title: 'Kolekcije',
      subTitle: 'Upravljajte kolekcijama sadržaja koje usmjeravaju bazu znanja AI-a.',
      deleteTitle: 'Izbriši kolekciju',
      deleteDescription: 'Jeste li sigurni da želite izbrisati kolekciju?',
      create: 'Kreiraj kolekciju',
      createDescription: 'Kreirajte novu kolekciju prema svojim potrebama!',
    },
    buttons: {
      create: 'Kreiraj kolekciju',
      delete: 'Izbriši',
      cancel: 'Odustani',
      save: 'Spremi',
    },

    labels: {
      name: 'Ime Kolekcije',
      vectorProvider: 'Pružatelj vektora',
      vectorPlaceholder: 'Odaberite pružatelja vektora',
      embeddingProvider: 'Pružatelj ugrađivanja',
      embeddingPlaceholder: 'Odaberite pružatelja ugrađivanja',
      model: 'Model',
      modelPlaceholder: 'Odaberite model',
    },
    rules: {
      name: {
        required_message: 'Unesite naziv kolekcije',
        length_message: 'Naziv treba biti dug {min} do {max} znakova',
      },
      vectorProvider: 'Molimo odaberite pružatelja vektora',
      embeddingProvider: 'Molimo odaberite pružatelja ugrađivanja',
      model: 'Molimo odaberite model',
    },

    notifications: {
      delete_title: 'Uspjeh',
      delete_message: 'Kolekcija {name} je izbrisan!',
      delete_error: 'Kolekcija nije izbrisana',
      update_title: 'Uspjeh',
      update_message: 'Kolekcija {name} je ažuriran!',
      create_title: 'Uspjeh',
      create_message: 'Kolekcija {name} je kreiran!',
      form_title: 'Greška u obrascu',
      form_message: 'Molimo popravite označene pogreške u obrascu.',
      invalid_agent: 'Ups! Nešto nije u redu. Čini se da Kolekcija kojeg pokušavate izbrisati ne postoji.',
    },
  },

  auth: {
    notifications: {
      user_authenticate: 'Korisnik nije autentificiran, preusmjerava se na prijavu',
    },

  },

}
