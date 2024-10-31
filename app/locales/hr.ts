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
    user: 'Korisnik',
    assistant: 'Asistent',
    admin: {
      title: 'Razgovori',
      description: 'Upravljajte svim razgovorima na jednom mjestu',
      chat_card: {
        created_at: 'Kreirano',
        updated_at: 'Ažurirano',
        view_details: 'Pogledaj detalje',
        edit_chat: 'Uredi razgovor',
        delete_chat: 'Obriši razgovor',
      },
      chat_details: {
        title: 'Detalji razgovora',
        description: 'Pregledajte sve detalje vezane za ovaj razgovor',
      },
    },
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
    form: {
      first_name: 'Ime',
      first_name_placeholder: 'Unesite ime',
      last_name: 'Prezime',
      last_name_placeholder: 'Unesite prezime',
      email: 'E-mail',
      email_placeholder: 'Unesite e-mail adresu',
      role: 'Uloga',
      role_placeholder: 'Odaberite ulogu za korisnika',
      submit: 'Potvrdi',
      cancel: 'Odustani',
      rules: {
        required: 'Ovo polje je obavezno',
        invalid_email: 'Neispravan format e-mail adrese',
      },
    },

    notifications: {
      create_error_title: 'Greška prilikom dodavanja korisnika',
      create_error_description: 'Nije moguće dodati novog korisnika.',
      create_error_existing_user_description: 'Korisnik već postoji.',
    },
    user_card: {
      role: 'Uloga',
      status: 'Status',
      active_status: 'Aktivan',
      inactive_status: 'Neaktivan',
      created_at: 'Kreiran',
      view_more: 'Pogledaj detalje korisnika',
      edit_user: 'Uredi korisnika',
      delete_user: 'Obrisi korisnika',
      activate_user: 'Aktiviraj korisnika',
      deactivate_user: 'Deaktiviraj korisnika',
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
      name: 'Ime',
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
      status: 'Status',
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
      collectionName: 'Unesite naziv kolekcije',
    },
    collection_card: {
      unknown_id: 'Nepoznati ID kolekcije',
      unknown_collectin_name: 'Nepoznato ime kolekcije',
      unknown_provider: 'Nepoznati davatelj usluga',
      unknown_embedder: 'Nepoznati pružatelj ugrađivanja',
      unknown_model: 'Nepoznati model',
      unknown_date: 'Nepoznati datum',
      view_more: 'Pogledaj detalje kolekcije',
    },

    labels: {
      id: 'ID kolekcije',
      name: 'Naziv kolekcije',
      created_at: 'Stvoreno',
      updated_at: 'Ažurirano',
      provider: 'Pružatelj usluga',
      model: 'Model',
      embedder: 'Ugraditelj',
    },

    deleteModal: {
      title: 'Izbriši kolekciju',
      text: 'Jeste li sigurni da želite izbrisati ovu kolekciju?',
    },
    rules: {
      name: {
        required_message: 'Unesite naziv kolekcije',
        length_message: 'Naziv bi trebao imati između {min} i {max} znakova',
        ascii_alphanumeric_underscored_message: 'Molimo unesite ime koje počinje velikim slovom i sadrži samo slova, brojeve ili podvlake ( _ ).',

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

  error_notifications: {
    default: 'Došlo je do nepoznate greške.',
    status_400: 'Nevažeća zahtjev: Pokušajte ponovo.',
    status_401: 'Nema ovlasti: Morate biti prijavljeni za pristup ovome.',
    status_403: 'Zabranjeno: Nemate dozvolu za pristup ovoj resursu.',
    status_404: 'Nema nađeno: Resurs koji tražite ne postoji.',
    status_422: 'Neobradiva entiteta: Došlo je do problema s unesenim podacima.',
    status_500: 'Greška poslužitelja: Nešto je pošlo po zlu s naše strane. Pokušajte ponovo kasnije.',
    status_503: 'Usluga nije dostupna: Poslužitelj trenutno ne može obraditi zahtjev.',
  },

}
