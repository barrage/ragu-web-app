export default {
  details: 'Detalji',
  chatDock: 'Chat panel',
  login: {
    title: 'Prijava',
    description: 'Odaberite način prijave',
    continueWith: 'Nastavite sa',
    notifications: {
      error_title: 'Prijava nije uspjela',
      error_description: 'Autentifikacija nije uspjela. Molimo pokušajte ponovno.',
    },
  },
  logout: {
    error_title: 'Odjava nije uspjela',
    error_description: 'Došlo je do pogreške prilikom pokušaja odjave. Molimo pokušajte ponovno.',
  },

  timePeriod: {
    today: 'Danas',
    yesterday: 'Jučer',
    last7days: 'Posljednjih 7 dana',
    last30days: 'Posljednjih 30 dana',
    lastYear: 'Prošle godine',
    unknown_date: 'Nepoznati datum',
  },
  sort: {
    title: 'Opcije sortiranja',
    description: 'Sortiraj po',
    asc: 'Uzlazno',
    desc: 'Silazno',
  },

  profileDropdown: {
    switchToAdmin: 'Prebaci se na Administratora',
    switchToUser: 'Prebaci se na Korisnika',
    profile: 'Profil',
    settings: 'Postavke',
    agents: 'Agenti',
    support: 'Podrška',
    signOut: 'Odjavi se',
    browse_agents: 'Pregledajte sve chat agente spremne da vam pomognu',
    signout_text: 'Jeste li sigurni da želite nastaviti s odjavom?',
    profile_settings: 'Postavke profila',
  },
  getHelp: {
    title: 'Traži pomoć',
  },

  form_rules: {
    required: 'Ovo polje je obavezno',
    min_length: 'Minimalan broj potrebnih znakova je {min}',
    max_length: 'Makimalan broj znakova je {max}',
  },

  chat: {
    user: 'Korisnik',
    assistant: 'Asistent',
    messages: 'Poruke',
    all_chats: 'Svi razgovori',
    inactive_agent: 'Ovaj agent više nije aktivan. Molimo odaberite aktivnog agenta za započinjanje novog razgovora.',
    copy_title: 'Kopirano',
    copy_message: 'Kopirano u međuspremnik',
    admin: {
      title: 'Razgovori',
      description: 'Upravljajte svim razgovorima na jednom mjestu',
      chat_card: {
        title: 'Naslov',
        unknown_title: 'Nepoznato',
        created_at: 'Kreirano',
        updated_at: 'Ažurirano',
        view_details: 'Pogledaj detalje',
        edit_chat: 'Uredi razgovor',
        delete_chat: 'Obriši razgovor',
      },
      chat_details: {
        title: 'Detalji razgovora',
        description: 'Pregledajte sve detalje vezane za ovaj razgovor',
        empty_messages: 'Trenutno nema poruka u ovom razgovoru',
      },
    },
    edit_title: {
      title: 'Uredi naslov',
      title_label: 'Naslov',
      title_placeholder: 'Molimo unesite novi naslov',
      notifications: {
        success_title: 'Uspješno uređen naslov',
        success_description: 'Chat je uspješno uređen.',
        error_title: 'Greška',
        error_description: 'Došlo je do greške pri postavljanju novog naslova chata.',

      },
    },
    delete_chat: {
      title: 'Izbriši chat',
      description: 'Da li ste sigurni da želite obrisati chat?',
      notifications: {
        success_title: 'Uspješno izbrisano',
        success_description: 'Chat je uspješno izbrisan.',
        error_title: 'Greška',
        error_description: 'Došlo je do greške pri brisanju chata.',
      },
    },
    chatInputPlaceholder: 'Pošalji poruku',
    chatHistory: 'Povijest chata',

    newChat: {
      title: 'Novi chat',
      description: 'Izaberite agenta s kojim želite započeti razgovor',
      choseFrom: 'Agenti:',
      empty: 'Trenutno nema dostupnih agenata za razgovor. Kako biste započeli chat, potrebno je dodati ili omogućiti barem jednog agenta. Molimo vas da se obratite administratoru sustava ili provjerite postavke agenata kako biste nastavili.',
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
    formats: 'Formati',
    total: 'Ukupno',
    sync: 'Sinkronizacija',
    upload: 'Učitaj',
    most_recent: 'Najnovije',
    specific_formats: 'Specifični formati',
    series_name: 'Format',
    sync_docs: 'Sinkroniziraj dokumente',

    tooltip: {
      delete_document: 'Izbriši svoj dokument',
      manage_document: 'Upravljaj svojim dokumentom',
      display_total: 'Prikaži ukupan broj dokumenata',
      most_recent: 'Prikazuje 5 najnovije ažuriranih ili stvorenih dokumenata',
      document_formats: 'Prikazuje distribuciju različitih formata dokumenata u tortnom grafikonu',
    },

    uploads: {
      title: 'Učitaj datoteku',
      description: 'Ispustite datoteku ovdje ili',
      description_link: 'kliknite za učitavanje',
    },

    details: {
      empty: 'Ovaj dokument nije dostupan ili više ne postoji.',
    },
    delete_document: {
      title: 'Brisanje dokumenta',
      description: 'Jeste li sigurni da želite izbrisati ovaj dokument? Ova radnja se ne može poništiti.',
      notifications: {
        success_title: 'Dokument izbrisan',
        success_description: 'Dokument je uspješno izbrisan.',
        error_title: 'Neuspješno brisanje',
        error_description: 'Došlo je do pogreške prilikom pokušaja brisanja dokumenta. Molimo pokušajte ponovno kasnije.',
      },
    },

    notifications: {
      create: {
        success_title: 'Novi Dokument',
        success_description: 'Uspješno kreiran novi dokument',
        error_title: 'Novi Dokument',
        error_description: 'Greška prilikom dodavanja',
        error_existing_document_title: 'Postojeći Dokument',
        error_existing_document_description: 'Ovaj dokument već postoji',
        error_file_size_title: 'Problem s Veličinom Datoteke',
        error_file_size_description: 'Veličina datoteke ne smije prelaziti 50 MB!',
        error_file_type_title: 'Problem s Formatom Datoteke',
        error_file_type_description: 'Datoteka mora biti u PDF, TXT, JSON ili DOCX formatu!',
      },
    },
    edit_configuration: 'Uredi konfiguraciju',
    configuration: 'Konfiguracija',
    parser: {
      title: 'Parser',
      description: 'Parser omogućuje analizu i obradu podataka iz dokumenata.',
      load_more: 'Učitaj više',
      selected_document: 'Odabrani dokument',
      empty_configuration: 'Konfiguracija nije postavljena.',
      parser_preview: 'Pregled parsera',
      parser_preview_empty_state: 'Nema podataka za prikaz u parseru.',
      form: {
        start: 'Početak',
        end: 'Kraj',
        range: 'Raspon',
        filters: 'Filtri',
        actions: {
          preview: 'Pregledaj',
          save: 'Spremi',
          save_description: 'Spremite novostvorenu konfiguraciju parsera.',
          preview_description: 'Pregledajte dokument s trenutnim postavkama parsera.',
        },
      },
      validation: {
        start_0_with_range: 'Početak ne može biti 0 kada se koristi raspon.',
        start_greater_with_range: 'Početak ne može biti veći od kraja kada se koristi raspon.',
      },

    },

    chunker: {
      title: 'Podjeljivač Segmenata',
      description: 'Razdvoji odabrani dokument na značenje punije segmente za bolju semantičku analizu i obradu.',
      chunk_preview: 'Pregled segmenata',
      chunk_preview_empty_state: 'Nema segmenata za prikazivanje. Podesite postavke i pregledajte rezultate kako biste generirali segmente za ovaj dokument.',
      load_more: 'Učitaj više',
      chunk: 'Segment',
      selected_document: 'Odabrani dokument',
      total_chunk: 'Ukupno segmenata',
      no_parser_state: 'Prvo morate postaviti Parser',
      empty_configuration: 'Prazna konfiguracija',
      unknown_configuration: 'Nepoznata konfiguracija',
      selected_type: 'Odabrani tip',

      notifications: {
        preview: {
          success_title: 'Pregled uspješan',
          success_description: 'Pregled je uspješno generiran. Provjerite ga u nastavku.',
          error_title: 'Pregled nije uspio',
          error_description: 'Došlo je do problema prilikom generiranja pregleda. Pokušajte ponovno kasnije.',
        },
        update: {
          success_title: 'Ažuriranje uspješno',
          success_description: 'Podaci su uspješno ažurirani.',
          error_title: 'Ažuriranje nije uspjelo',
          error_description: 'Došlo je do problema prilikom ažuriranja. Pokušajte ponovno.',
        },
      },

      validation: {
        size_validation: 'Veličina mora biti veća od preklapanja',
        threshold_validation: 'Prag ne može biti negativan',
      },

      semantic: {
        title: 'Konfigurirajte Semantičko Razdvajanje',
        description: 'Podesite i prilagodite semantički podjeljivač za ovaj dokument. Pregledajte segmente u stvarnom vremenu kako biste finije prilagodili postavke.',
        name: 'Semantičko',
        form: {
          size: 'Veličina segmenta (riječi)',
          threshold: 'Prag relevantnosti',
          distance_function: 'Funkcija udaljenosti',
          delimiter: 'Razdjelnik segmenta',
          embed_model: 'Model ugrađivanja',
          embed_provider: 'Pružatelj ugrađivanja',
          skip_foward: 'Preskoči buduće segmente',
          skip_back: 'Preskoči prethodne segmente',
          actions: {
            preview: 'Pregled',
            save: 'Spremi',
          },
        },
      },
      sliding: {
        title: 'Konfigurirajte klizno razdvajanje',
        description: 'Konfigurirajte kliznu segmentaciju koja omogućava preciznu podjelu teksta s preklapanjem sekcija.',
        name: 'Klizno',
        form: {
          size: 'Veličina segmenta',
          overlap: 'Veličina preklapanja',
          actions: {
            preview: 'Pregled',
            save: 'Spremi',
          },
        },
      },
      snapping: {
        title: 'Konfigurirajte razdvajanje prema granicama',
        description: 'Konfigurirajte razdvajanje prema unaprijed definiranim granicama za strukturirane tekstove.',
        name: 'Prema granicama',
        form: {
          size: 'Veličina segmenta',
          overlap: 'Veličina preklapanja',
          delimiter: 'Razdjelnik segmenta',
          skip_foward: 'Preskoči buduće segmente',
          skip_back: 'Preskoči prethodne segmente',
          actions: {
            preview: 'Pregled',
            save: 'Spremi',
          },
        },
      },
    },

  },
  users: {
    title: 'Korisnici',
    description: 'Upravljajte članovima svog tima i postavite njihove razine pristupa.',
    invite_user: 'Dodaj korisnika',
    all_users: 'Svi korisnici',
    delete_user: {
      title: 'Izbriši Korisnika',
      description: 'Jeste li sigurni da želite izbrisati ovog korisnika? Ova radnja se ne može poništiti.',
      confirm: 'Izbriši',
      cancel: 'Odustani',
      notifications: {
        success_title: 'Korisnik Izbrisan',
        success_description: 'Korisnik je uspješno izbrisan.',
        error_title: 'Neuspješno Brisanje',
        error_description: 'Došlo je do pogreške. Korisnik nije mogao biti izbrisan.',
      },
    },
    edit_user: {
      title: 'Uredi Korisnika',
      description: 'Izmijenite detalje korisnika u nastavku.',
      confirm: 'Spremi Promjene',
      cancel: 'Odustani',
      notifications: {
        success_title: 'Promjene Spremljene',
        success_description: 'Podaci korisnika su uspješno ažurirani.',
        error_title: 'Neuspješno Ažuriranje',
        error_description: 'Došlo je do greške prilikom ažuriranja podataka korisnika. Molimo pokušajte ponovo.',
      },
    },
    activate_user: {
      title: 'Aktiviraj Korisnika',
      description: 'Aktivirajte odabranog korisnika kako bi mu omogućili pristup.',
      confirm: 'Aktiviraj',
      cancel: 'Odustani',
      notifications: {
        success_title: 'Korisnik Aktiviran',
        success_description: 'Korisnik je uspješno aktiviran.',
        error_title: 'Aktivacija Neuspješna',
        error_description: 'Došlo je do pogreške prilikom aktivacije korisnika. Molimo pokušajte ponovno.',
      },
    },
    deactivate_user: {
      title: 'Deaktiviraj Korisnika',
      description: 'Deaktivirajte odabranog korisnika kako biste mu ograničili pristup.',
      confirm: 'Deaktiviraj',
      cancel: 'Odustani',
      notifications: {
        success_title: 'Korisnik Deaktiviran',
        success_description: 'Korisnik je uspješno deaktiviran.',
        error_title: 'Deaktivacija Neuspješna',
        error_description: 'Došlo je do pogreške prilikom deaktivacije korisnika. Molimo pokušajte ponovno.',
      },
    },
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
      delete_user: 'Obriši korisnika',
      delete_user_title: 'Obriši',
      activate_user_title: 'Aktiviraj',
      deactivate_user_title: 'Deaktiviraj',
      edit_user_title: 'Uredi',
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
    description: 'Upravljajte LLMAO aplikacijom za administraciju.',
    service_widgets: {
      agents: {
        title: 'Agenti',
        description: 'aktivni agenti',
        view_more: 'Prikaži više',
      },
      users: {
        title: 'Korisnici',
        description: 'aktivni korisnici',
        view_more: 'Prikaži više',
      },
      documents: {
        title: 'Dokumenti',
        description: 'Ukupno dokumenata',
        view_more: 'Prikaži više',
      },
      collections: {
        title: 'Kolekcije',
        description: 'Ukupno kolekcija',
        view_more: 'Prikaži više',
      },
    },
    chat_usage_line_chart: {
      title: 'Upotreba razgovora',
      period: {
        week: 'Tjedan',
        month: 'Mjesec',
        year: 'Godina',
      },
    },
    chats: {
      most_recent: {
        title: 'Nedavni razgovori',
        description: 'Prikazuje vašu posljednju povijest razgovora',
      },
      all_chat_usage: {
        title: 'Upotreba svih razgovora',
        description: 'Najčešći razgovori prema korištenju svih agenata',
        series_name: 'Agent',
        pie_chart_subtext: 'Ukupno razgovora',
      },
      available_agents: {
        title: 'Dostupni agenti',
        description: 'Prikaz agenta dopstupnih za komunikaciju',
      },
    },
    agents: {
      total_widget: {
        active: 'Aktivan',
      },
      providers: {
        title: 'Pružatelji',
        description: 'Prikazuje pružatelje aktivnih agenata',
        series_name: 'Pružatelj',
      },
      most_used_agent: {
        title: 'Najkorišteniji agent',
        description: 'Najčešći agent prema upotrebi svih razgovora',
        chats: 'Razgovori',
      },
    },
    users: {
      total_widget: {
        total: 'Ukupno',
      },
      most_recent_users: {
        title: 'Najnoviji korisnici',
        description: 'Pronađite svoje najnovije korisnike',
      },
      user_roles: {
        admins: 'Administratori',
        users: 'Korisnici',
        active: 'Aktivan',
        inactive: 'Neaktivan',
      },
    },
  },
  agents: {
    title: 'Agenti',
    all_agents: 'Svi agenti',

    titles: {
      mainTitle: 'Agenti',
      details: 'Detalji agenta',
      configuration: 'Konfiguracija',
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
      unknown_instruction: 'Nepoznata uputa',
      unknown_date: 'Nepoznati datum',
      active_status: 'Aktivan',
      inactive_status: 'Neaktivan',
      created_at: 'Nepoznati datum',
      edit_agent: 'Uredi agenta',
      delete_agent: 'Obriši agenta',
      view_more: 'Pogledajte detalje agenta',
      empty_state_title: 'Agent nije pronađen',
      empty_state_desc: 'Agent kojeg tražite ne postoji ili trenutno nije dostupan. Molimo provjerite podatke o agentu ponovno ili kreirajte novog.',
      deactivate_agent: 'Deaktiviraj agenta',
      activate_agent: 'Aktiviraj agenta',
    },
    activate_agent: {
      title: 'Aktiviraj agenta',
      description: 'Aktivirajte odabranog agenta kako biste započeli razgovor s njime.',
      confirm: 'Aktiviraj',
      cancel: 'Otkaži',
      notifications: {
        success_title: 'Agent Aktiviran',
        success_description: 'Agent je uspješno aktiviran.',
        error_title: 'Aktivacija nije uspjela',
        error_description: 'Došlo je do pogreške prilikom aktivacije agenta. Molimo pokušajte ponovno.',
      },
    },
    deactivate_agent: {
      title: 'Deaktiviraj agenta',
      description: 'Deaktivirajte odabranog agenta.',
      confirm: 'Deaktiviraj',
      cancel: 'Otkaži',
      notifications: {
        success_title: 'Agent Deaktiviran',
        success_description: 'Agent je uspješno deaktiviran.',
        error_title: 'Deaktivacija nije uspjela',
        error_description: 'Došlo je do pogreške prilikom deaktivacije agenta. Molimo pokušajte ponovno.',
      },
    },
    labels: {
      id: 'ID Agenta',
      name: 'Ime Agenta',
      context: 'Kontekst',
      created_at: 'Kreirano',
      updated_at: 'Ažurirano',
      actions: 'Akcije',
      description: 'Opis',
      llmProvider: 'LLM Pružatelj',
      model: 'Model',
      language: 'Jezik',
      temperature: 'Temperatura',
      vectorProvider: 'Pružatelj Vektora',
      embeddingProvider: 'Pružatelj Embeddinga',
      embeddingModel: 'Embedding Model',
      active: 'Aktivan',
      status: 'Status Agenta',
      languageInstruction: 'Uputa za Jezik',
      summaryInstruction: 'Uputa za Sažetak',
      titleInstruction: 'Uputa za Naslov',
    },
    buttons: {
      create: 'Kreiraj Agenta',
      edit: 'Uredi',
      delete: 'Izbriši',
      cancel: 'Otkaži',
      save: 'Spremi',
      overview: 'Pregled Agenta',
      filter: 'Filtriraj',
    },
    placeholder: {
      llmProvider: 'Odaberite LLM Pružatelja',
      model: 'Odaberite Model',
      vecotrProvider: 'Odaberite Pružatelja Vektora',
      embeddingProvider: 'Odaberite Pružatelja Embeddinga',
      search: 'Pretraži Agente',
      agentName: 'Unesite Ime Agenta',
      context: 'Unesite Kontekst Agenta...',
      description: 'Unesite Opis Agenta',
      language: 'Unesite Jezik Agenta',
      languageInstruction: 'Unesite Uputu za Jezik Agenta',
      summaryInstruction: 'Unesite Uputu za Sažetak Agenta',
      titleInstruction: 'Unesite Uputu za Naslov Agenta',
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
    all_collections: 'Sve kolekcije',

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
      empty_collection: 'Nema dostupnih kolekcija',
    },
    collection_card: {
      unknown_id: 'Nepoznati ID kolekcije',
      unknown_collectin_name: 'Nepoznato ime kolekcije',
      unknown_provider: 'Nepoznati davatelj usluga',
      unknown_embedder: 'Nepoznati pružatelj ugrađivanja',
      unknown_model: 'Nepoznati model',
      unknown_date: 'Nepoznati datum',
      view_more: 'Pogledaj detalje kolekcije',
      empty_state_title: 'Kolekcija nije pronađena',
      empty_state_desc: 'Kolekcija kojeg tražite ne postoji ili trenutno nije dostupna. Molimo provjerite podatke o kolekciji ponovno ili pokušajte s drugačijim pretraživanjem.',
      delete_collection: 'Izbriši kolekciju',

    },

    labels: {
      id: 'ID kolekcije',
      name: 'Naziv kolekcije',
      created_at: 'Stvoreno',
      updated_at: 'Ažurirano',
      provider: 'Davatelj',
      model: 'Model',
      embedder: 'Ugraditelj',
      add_document: 'Dodaj Dokument',
    },

    deleteModal: {
      title: 'Izbriši kolekciju',
      text: 'Jeste li sigurni da želite izbrisati ovu kolekciju?',
    },
    rules: {
      name: {
        required_message: 'Unesite naziv kolekcije',
        length_message: 'Naziv bi trebao imati između {min} i {max} znakova',
        ascii_alphanumeric_underscored_message: 'Unesite ime koje počinje velikim slovom i sadrži samo slova, brojeve i donje crte za razmak ( _ ).',

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

    assign_collection: {
      agent_collections: 'Kolekcije Agenta',
      title: 'Dodijeli Kolekciju',
      rules: {
        collection_name: 'Molimo odaberite kolekciju',
        amount: 'Molimo unesite dubinu odgovora',
        instruction: 'Molimo unesite uputu',
      },
      placeholder: {
        select: 'Odaberite kolekciju',
        instruction: 'Unesite uputu',
        amount: 'Unesite dubinu odgovora',
      },
      labels: {
        name: 'Naziv kolekcije',
        instructions: 'Upute',
        amount: 'Dubina odgovora',
      },
      descriptions: {
        response_depth: {
          low_depth: {
            title: 'Niska dubina (1-2 Chunks)',
            description: 'Idealno za precizne i precizne odgovore. Korisno ako želite kratke odgovore ili kolekciju usmjerenu na temu.',
          },
          high_depth: {
            title: 'Visoka dubina (6+ Chunks)',
            description: 'Dohvaća prošireni kontekst za kompletne odgovore. Najbolje za velike ili komplicirane kolekcije gdje upite zahtijevaju dublje istraživanje materijala.',
          },
          moderate_depth: {
            title: 'Srednja dubina (3-5 Chunks)',
            description: 'Omogućuje više konteksta za usklađene ili detaljne upite. Preporučeno za kolekcije srednje veličine ili raznolikih tema.',
          },
          note: 'Napomena: Podešavanje ovog parametra utječe na detaljnost odgovora i brzinu obrade agenta. Odaberite dubinu koja ravnoteži vaše potrebe za detaljima s performansama agenta.',
        },

      },
      notification: {
        error_title: 'Greška',
        assign_error_title: 'Neuspješno dodjeljivanje kolekcije agentu!',
        assign_cuccess_title: 'Kolekcija je dodijeljena!',
        delete_collection: 'Nemate kolekciju za brisanje, molimo dodajte novu kolekciju!',
        update_error_collection: 'Ažuriranje kolekcije nije uspjelo.',
        update_collection: 'Kolekcija uspješno ažurirana!',
      },
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
