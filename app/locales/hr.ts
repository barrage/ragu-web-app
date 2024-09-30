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
  agents: {
    titles: {
      mainTitle: 'Agenti',
      details: 'Detalji agenta',
      description: 'Pregled u kojem možete jednostavno pregledavati, uređivati i upravljati detaljima i statusima svojih agenata na jednom mjestu.',
      edit: 'Uredi agenta',
      create: 'Kreiraj agenta',
      createDescription: 'Stvorite svog novog agenta tako da navedete njegovo ime i kontekst da biste započeli!',
      deleteTitle: 'Izbriši agenta',
      deleteDescription: 'Jeste li sigurni da želite izbrisati agenta?',

    },
    labels: {
      name: 'Ime agenta',
      context: 'Kontekst',
      created_at: 'Stvoren',
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

}
