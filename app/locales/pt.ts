export default {
  details: 'Detalhes',
  chatDock: 'Painel de chat',
  login: {
    title: 'Login',
    description: 'Escolha um método de login',
    continueWith: 'Continuar com',
  },
  timePeriod: {
    today: 'Hoje',
    yesterday: 'Ontem',
    last7days: 'Últimos 7 dias',
    last30days: 'Últimos 30 dias',
    lastYear: 'Ano passado',
  },
  profileDropdown: {
    switchToAdmin: 'Mudar para Admin',
    switchToUser: 'Mudar para Usuário',
    profile: 'Perfil',
    settings: 'Configurações',
    agents: 'Agentes',
    support: 'Suporte',
    signOut: 'Sair',
  },
  getHelp: {
    title: 'Obter ajuda',
  },
  chat: {
    user: 'Usuário',
    assistant: 'Assistente',
    admin: {
      title: 'Conversas',
      description: 'Gerencie todas as suas conversas em um só lugar',
      chat_card: {
        created_at: 'Criado em',
        updated_at: 'Atualizado em',
        view_details: 'Ver detalhes',
        edit_chat: 'Editar conversa',
        delete_chat: 'Excluir conversa',
      },
      chat_details: {
        title: 'Detalhes da conversa',
        description: 'Veja todos os detalhes relacionados a esta conversa',
      },
    },
    editTitle: 'Editar título',
    deleteChat: 'Excluir chat',
    chatInputPlaceholder: 'Enviar uma mensagem',
    chatHistory: 'Histórico de chat',
    newChat: {
      title: 'Novo chat',
      description: 'Escolha um agente para iniciar o chat',
      choseFrom: 'Agentes:',
    },
  },

  documents: {
    title: 'Documentos',
    description: 'Gerencie e organize todos os documentos que ajudam a IA a aprender.',
    name: 'Nome',
    extension: 'Formato',
    path: 'Localização',
    source: 'Fonte',
    id: 'ID do Documento',
    hash: 'Hash',
  },

  agents: {
    title: 'Agentes',
    titles: {
      mainTitle: 'Agentes',
      details: 'Detalhes do agente',
      description: 'Gerencie os agentes responsáveis por interagir com a IA',
      edit: 'Editar agente',
      create: 'Criar agente',
      createDescription: 'Crie seu novo agente fornecendo o nome e o contexto para começar!',
      deleteTitle: 'Excluir agente?',
      deleteDescription: 'Tem certeza de que deseja excluir o agente?',
    },
    agent_card: {
      unknown_id: 'ID do agente desconhecido',
      unknown_agentname: 'Nome do agente desconhecido',
      unknown_agentcontext: 'Contexto do agente ausente',
      unknown_description: 'Descrição do agente ausente',
      unknown_llmProvider: 'llmProvider desconhecido',
      unknown_model: 'Modelo desconhecido',
      unknown_language: 'Idioma desconhecido',
      unknown_temperature: 'Temperatura desconhecida',
      unknown_vectorProvider: 'Provedor de vetores desconhecido',
      unknown_embeddingProvider: 'Provedor de embeddings desconhecido',
      unknown_embeddingModel: 'Modelo de embeddings desconhecido',
      unknown_date: 'Data desconhecida',
      active_status: 'Ativo',
      inactive_status: 'Inativo',
      created_at: 'Data desconhecida',
      edit_agent: 'Editar agente',
      delete_agent: 'Excluir agente',
      view_more: 'Ver detalhes do agente',
    },
    labels: {
      id: 'Agente ID',
      name: 'Nome do agente',
      context: 'Contexto',
      created_at: 'Criado em',
      updated_at: 'Atualizado em',
      actions: 'Ações',
      description: 'Descrição',
      llmProvider: 'Provedor de LLM',
      model: 'Modelo',
      language: 'Idioma',
      temperature: 'Temperatura',
      vectorProvider: 'Provedor de vetores',
      embeddingProvider: 'Provedor de embeddings',
      embeddingModel: 'Modelo de embeddings',
      active: 'ativo',
      status: 'Status do agente',
    },
    buttons: {
      create: 'Criar agente',
      edit: 'Editar',
      delete: 'Excluir',
      cancel: 'Cancelar',
      save: 'Salvar',
      overview: 'Visão geral do agente',
      filter: 'Filtrar',
    },

    placeholder: {
      llmProvider: 'Selecione o provedor de LLM',
      model: 'Selecione o modelo',
      vecotrProvider: 'Selecione o provedor de vetores',
      embeddingProvider: 'Selecione o provedor de embeddings',
      search: 'Pesquisar agentes',
    },

    notifications: {
      delete_title: 'Sucesso',
      delete_message: 'Agente {name} foi excluído!',
      update_title: 'Sucesso',
      update_message: 'Agente {name} foi atualizado!',
      create_title: 'Sucesso',
      create_message: 'Agente {name} foi criado!',
      form_title: 'Erro no formulário',
      form_message: 'Corrija os erros destacados no formulário.',
      invalid_agent: 'Ops! Algo deu errado. O agente que você está tentando excluir parece não existir.',
    },
    rules: {
      name: {
        required_message: 'Insira o nome do agente',
        length_message: 'O nome deve ter entre {min} e {max} caracteres',
      },
      context: {
        required_message: 'Insira o contexto do agente',
        length_message: 'O contexto deve ter entre {min} e {max} caracteres',
      },
      description: {
        required_message: 'Forneça uma descrição',
      },
      llmProvider: {
        required_message: 'Selecione um provedor de LLM válido',
      },
      model: {
        required_message: 'Selecione um modelo',
      },
      language: {
        required_message: 'Especifique um idioma',
      },
      temperature: {
        required_message: 'Defina uma temperatura entre 0 e 1',
      },
      vectorProvider: {
        required_message: 'Selecione um provedor de vetores válido',
      },
      embeddingProvider: {
        required_message: 'Selecione um provedor de embeddings',
      },
      embeddingModel: {
        required_message: 'Forneça um modelo de embeddings',
      },
      active: {
        required_message: 'Especifique se o agente está ativo',
      },
    },
  },
  collections: {
    title: 'Coleções',
    titles: {
      title: 'Coleções',
      subTitle: 'Gerencie as coleções de conteúdo que guiam a base de conhecimento da IA.',
      deleteTitle: 'Excluir coleção?',
      deleteDescription: 'Tem certeza de que deseja excluir a coleção?',
      create: 'Criar coleção',
      createDescription: 'Crie uma nova coleção de acordo com suas necessidades!',
    },
    buttons: {
      create: 'Criar coleção',
      delete: 'Excluir',
      cancel: 'Cancelar',
      save: 'Salvar',
      filter: 'Filtrar',
    },
    placeholders: {
      search: 'Pesquisar coleções',
      vectorPlaceholder: 'Selecione o fornecedor de vetores',
      embeddingPlaceholder: 'Selecione o fornecedor de embeddings',
      modelPlaceholder: 'Selecione o modelo',
      collectionName: 'Por favor, insira o nome da coleção'
    },
    collection_card: {
      unknown_id: 'ID de coleção desconhecido',
      unknown_collectin_name: 'Nome da coleção desconhecido',
      unknown_provider: 'Fornecedor desconhecido',
      unknown_embedder: 'Provedor de incorporação desconhecido',
      unknown_model: 'Modelo desconhecido',
      unknown_date: 'Data desconhecida',
    },

    labels: {
      id: 'ID da Coleção',
      name: 'Nome da Coleção',
      created_at: 'Criado em',
      updated_at: 'Atualizado em',
      provider: 'Fornecedor',
      model: 'Modelo',
      embedder: 'Incorporador',
    },

    deleteModal: {
      title: 'Excluir coleção',
      text: 'Tem certeza de que deseja excluir esta coleção?',
    },
    rules: {
      name: {
        required_message: 'Por favor, insira o nome da coleção',
        length_message: 'O nome deve ter entre {min} e {max} caracteres',
        ascii_alphanumeric_underscored_message: 'Por favor, insira um nome que comece com uma letra maiúscula e contenha apenas letras, números ou sublinhados ( _ ).',
      },
      vectorProvider: 'Selecione um fornecedor de vetores',
      embeddingProvider: 'Selecione um fornecedor de embeddings',
      model: 'Selecione um modelo',
    },
    notifications: {
      delete_title: 'Sucesso',
      delete_message: 'A coleção {name} foi excluída!',
      delete_error: 'A coleção não foi excluída',
      create_title: 'Sucesso',
      create_message: 'A coleção {name} foi criada!',
      form_title: 'Erro no formulário',
      form_message: 'Corrija os erros destacados no formulário.',
      invalid_collection: 'Ops! Algo deu errado. A coleção que você está tentando excluir parece não existir.',
    },
  },

  users: {
    title: 'Usuários',
    description: 'Gerencie os membros da sua equipe e defina seus níveis de acesso.',
    invite_user: 'Convidar usuário',
    notifications: {
      create_error_title: 'Erro ao adicionar usuário',
      create_error_description: 'Não foi possível adicionar um novo usuário.',
      create_error_existing_user_description: 'O usuário já existe.',
    },
    user_card: {
      role: 'Função',
      status: 'Status',
      active_status: 'Ativo',
      inactive_status: 'Inativo',
      created_at: 'Criado',
      view_more: 'Ver detalhes do usuário',
      edit_user: 'Editar usuário',
      delete_user: 'Excluir usuário',
      adminRole: 'Administrador',
      userRole: 'Usuário',
      updated_at: 'Atualizado em',
      user_id: 'ID do Usuário',
      first_name: 'Nome',
      last_name: 'Sobrenome',
      username: 'Nome de usuário',
      email: 'Email',
    },

  },

  error_notifications: {
    default: 'Ocorreu um erro desconhecido.',
    status_400: 'Requisição inválida: Por favor, tente novamente.',
    status_401: 'Não autorizado: Você precisa estar logado para acessar isso.',
    status_403: 'Proibido: Você não tem permissão para acessar este recurso.',
    status_404: 'Não encontrado: O recurso que você está procurando não existe.',
    status_422: 'Entidade não processável: Houve um problema com os dados fornecidos.',
    status_500: 'Erro do servidor: Algo deu errado do nosso lado. Por favor, tente novamente mais tarde.',
    status_503: 'Serviço indisponível: O servidor não pode lidar com a solicitação no momento.',
  },

}
