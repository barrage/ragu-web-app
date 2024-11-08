export default {
  details: 'Detalles',
  chatDock: 'Panel de chat',
  login: {
    title: 'Acceso',
    description: 'Elige un método de inicio de sesión',
    continueWith: 'Continuar con',
  },
  timePeriod: {
    today: 'Hoy',
    yesterday: 'Ayer',
    last7days: 'Últimos 7 días',
    last30days: 'Últimos 30 días',
    lastYear: 'El año pasado',
  },
  sort: {
    title: 'Opciones de ordenación',
    description: 'Ordenar por',
    asc: 'Ascendente',
    desc: 'Descendente',
  },
  profileDropdown: {
    switchToAdmin: 'Cambiar a Admin',
    switchToUser: 'Cambiar a Usuario',
    profile: 'Perfil',
    settings: 'Configuraciones',
    agents: 'Agentes',
    support: 'Soporte',
    signOut: 'Cerrar sesión',
  },
  getHelp: {
    title: 'Obtener ayuda',
  },
  chat: {
    user: 'Usuario',
    assistant: 'Asistente',
    admin: {
      title: 'Chats',
      description: 'Gestiona todos tus chats en un solo lugar',
      chat_card: {
        title: 'Título',
        created_at: 'Creado el',
        updated_at: 'Actualizado el',
        view_details: 'Ver detalles',
        edit_chat: 'Editar chat',
        delete_chat: 'Eliminar chat',
      },
      chat_details: {
        title: 'Detalles del chat',
        description: 'Ver todos los detalles relacionados con este chat',
      },
    },
    edit_title: {
      title: 'Editar título',
      title_label: 'Título',
      title_placeholder: 'Por favor, introduzca un nuevo título',
      notifications: {
        success_title: 'Título actualizado con éxito',
        success_description: 'El título del chat se ha actualizado correctamente.',
        error_title: 'Error',
        error_description: 'Ocurrió un error al establecer el nuevo título del chat.',
      },
    },
    delete_chat: {
      title: 'Eliminar chat',
      description: '¿Estás seguro de que deseas eliminar el chat?',
      notifications: {
        success_title: 'Eliminado con éxito',
        success_description: 'El chat se ha eliminado con éxito.',
        error_title: 'Error',
        error_description: 'Ocurrió un error al eliminar el chat.',
      },
    },
    chatInputPlaceholder: 'Enviar mensaje',
    chatHistory: 'Historial de chat',
    newChat: {
      title: 'Nuevo chat',
      description: 'Elige un agente para iniciar el chat',
      choseFrom: 'Agentes:',
    },
  },
  documents: {
    title: 'Documentos',
    description: 'Administra y organiza todos los documentos que ayudan a la IA a aprender.',
    name: 'Nombre',
    extension: 'Formato',
    path: 'Ubicación',
    source: 'Fuente',
    id: 'ID del Documento',
    hash: 'Hash',
    notifications: {
      create: {
        success_title: 'Nuevo Documento',
        success_description: 'Documento creado con éxito',
        error_title: 'Nuevo Documento',
        error_description: 'Error al añadir',
        error_existing_document_title: 'Documento Existente',
        error_existing_document_description: 'Este documento ya existe',
        error_file_size_title: 'Problema de Tamaño de Archivo',
        error_file_size_description: '¡El tamaño del archivo no puede superar los 50 MB!',
        error_file_type_title: 'Problema de Formato de Archivo',
        error_file_type_description: '¡El archivo debe estar en formato PDF, TXT, JSON o DOCX!',
      },
    },
  },

  agents: {
    title: 'Agentes',
    titles: {
      mainTitle: 'Agentes',
      details: 'Detalles del agente',
      description: 'Gestiona los agentes responsables de interactuar con la IA',
      edit: 'Editar agente',
      create: 'Crear agente',
      createDescription: '¡Crea tu nuevo agente proporcionando su nombre y contexto para comenzar!',
      deleteTitle: '¿Eliminar agente?',
      deleteDescription: '¿Estás seguro de que deseas eliminar el agente?',
    },
    agent_card: {
      unknown_id: 'ID de agente desconocido',
      unknown_agentname: 'Nombre de agente desconocido',
      unknown_agentcontext: 'Falta el contexto del agente',
      unknown_description: 'Falta la descripción del agente',
      unknown_llmProvider: 'llmProvider desconocido',
      unknown_model: 'Modelo desconocido',
      unknown_language: 'Idioma desconocido',
      unknown_temperature: 'Temperatura desconocida',
      unknown_vectorProvider: 'Proveedor de vectores desconocido',
      unknown_embeddingProvider: 'Proveedor de embeddings desconocido',
      unknown_embeddingModel: 'Modelo de embeddings desconocido',
      unknown_date: 'Fecha desconocida',
      active_status: 'Activo',
      inactive_status: 'Inactivo',
      created_at: 'Fecha desconocida',
      edit_agent: 'Editar agente',
      delete_agent: 'Eliminar agente',
      view_more: 'Ver detalles del agente',
    },
    labels: {
      id: 'Agente ID',
      name: 'Nombre del agente',
      context: 'Contexto',
      created_at: 'Creado en',
      updated_at: 'Actualizado en',
      actions: 'Acciones',
      description: 'Descripción',
      llmProvider: 'Proveedor LLM',
      model: 'Modelo',
      language: 'Idioma',
      temperature: 'Temperatura',
      vectorProvider: 'Proveedor de vectores',
      embeddingProvider: 'Proveedor de embeddings',
      embeddingModel: 'Modelo de embeddings',
      active: 'activo',
      status: 'Estado del agente',
    },
    buttons: {
      create: 'Crear agente',
      edit: 'Editar',
      delete: 'Eliminar',
      cancel: 'Cancelar',
      save: 'Guardar',
      overview: 'Resumen del agente',
      filter: 'Filtrar',
    },

    placeholder: {
      llmProvider: 'Seleccionar proveedor LLM',
      model: 'Seleccionar modelo',
      vecotrProvider: 'Seleccionar proveedor de vectores',
      embeddingProvider: 'Seleccionar proveedor de embeddings',
      search: 'Buscar agentes',
    },

    notifications: {
      delete_title: 'Éxito',
      delete_message: '¡El agente {name} ha sido eliminado!',
      update_title: 'Éxito',
      update_message: '¡El agente {name} ha sido actualizado!',
      create_title: 'Éxito',
      create_message: '¡El agente {name} ha sido creado!',
      form_title: 'Error en el formulario',
      form_message: 'Por favor, corrija los errores resaltados en el formulario.',
      invalid_agent: '¡Vaya! Algo salió mal. Parece que el agente que intentas eliminar no existe.',
    },
    rules: {
      name: {
        required_message: 'Por favor, ingresa el nombre del agente',
        length_message: 'El nombre debe tener entre {min} y {max} caracteres',
      },
      context: {
        required_message: 'Por favor, ingresa el contexto del agente',
        length_message: 'El contexto debe tener entre {min} y {max} caracteres',
      },
      description: {
        required_message: 'Por favor, proporciona una descripción',
      },
      llmProvider: {
        required_message: 'Por favor, selecciona un proveedor LLM válido',
      },
      model: {
        required_message: 'Por favor, selecciona un modelo',
      },
      language: {
        required_message: 'Por favor, selecciona un idioma',
      },
      temperature: {
        required_message: 'Por favor, establece una temperatura entre 0 y 1',
      },
      vectorProvider: {
        required_message: 'Por favor, selecciona un proveedor de vectores válido',
      },
      embeddingProvider: {
        required_message: 'Por favor, selecciona un proveedor de embeddings',
      },
      embeddingModel: {
        required_message: 'Por favor, proporciona un modelo de embeddings',
      },
      active: {
        required_message: 'Por favor, especifica si el agente está activo',
      },
    },
  },
  collections: {
    title: 'Colecciones',
    titles: {
      title: 'Colecciones',
      subTitle: 'Administra las colecciones de contenido que guían la base de conocimiento de la IA.',
      deleteTitle: '¿Eliminar colección?',
      deleteDescription: '¿Estás seguro de que deseas eliminar la colección?',
      create: 'Crear colección',
      createDescription: '¡Crea una nueva colección según tus necesidades!',
    },
    buttons: {
      create: 'Crear colección',
      delete: 'Eliminar',
      cancel: 'Cancelar',
      save: 'Guardar',
      filter: 'Filtrar',
    },
    placeholders: {
      search: 'Buscar colecciones',
      vectorPlaceholder: 'Selecciona proveedor de vectores',
      embeddingPlaceholder: 'Selecciona proveedor de embeddings',
      modelPlaceholder: 'Selecciona modelo',
      collectionName: 'Por favor, introduzca el nombre de la colección',
    },
    collection_card: {
      unknown_id: 'ID de colección desconocido',
      unknown_collectin_name: 'Nombre de colección desconocido',
      unknown_provider: 'Proveedor desconocido',
      unknown_embedder: 'Proveedor de incrustación desconocido',
      unknown_model: 'Modelo desconocido',
      unknown_date: 'Fecha desconocida',
    },

    labels: {
      id: 'ID de la colección',
      name: 'Nombre de la colección',
      created_at: 'Creado en',
      updated_at: 'Actualizado en',
      provider: 'Proveedor',
      model: 'Modelo',
      embedder: 'Incrustador',
    },

    deleteModal: {
      title: 'Eliminar colección',
      text: '¿Estás seguro de que deseas eliminar esta colección?',
    },
    rules: {
      name: {
        required_message: 'Por favor, introduce el nombre de la colección',
        length_message: 'El nombre debe tener entre {min} y {max} caracteres',
        ascii_alphanumeric_underscored_message: 'Por favor, introduzca un nombre que comience con una letra mayúscula y contenga solo letras, números o guiones bajos ( _ ).',
      },
      vectorProvider: 'Selecciona un proveedor de vectores',
      embeddingProvider: 'Selecciona un proveedor de embeddings',
      model: 'Selecciona un modelo',
    },
    notifications: {
      delete_title: 'Éxito',
      delete_message: 'La colección {name} ha sido eliminada!',
      delete_error: 'La colección no se ha eliminado',
      create_title: 'Éxito',
      create_message: 'La colección {name} ha sido creada!',
      form_title: 'Error en el formulario',
      form_message: 'Por favor, corrige los errores resaltados en el formulario.',
      invalid_collection: '¡Vaya! Algo salió mal. Parece que la colección que intentas eliminar no existe.',
    },

    assign_collection: {
      title: 'Asignar Colección',
      rules: {
        collection_name: 'Por favor seleccione una colección',
        amount: 'Por favor ingrese una cantidad',
        instruction: 'Por favor ingrese una instrucción',
      },
      placeholder: {
        select: 'Seleccione colección',
        instruction: 'Ingrese instrucción',
        amount: 'Ingrese cantidad',
      },
      labels: {
        name: 'Nombre de colección',
        instructions: 'Instrucciones',
        amount: 'Cantidad',
      },
      notification: {
        error_title: 'Error',
        assign_error_title: 'Error al asignar la colección al agente!',
        assign_cuccess_title: '¡Colección asignada!',
        delete_collection: 'No tienes colección para eliminar, ¡por favor asigna una nueva colección!',
      },
    },
  },

  users: {
    title: 'Usuarios',
    description: 'Administra los miembros de tu equipo y establece sus niveles de acceso.',
    invite_user: 'Invitar usuario',
    delete_user: {
      title: 'Eliminar Usuario',
      description: '¿Está seguro de que desea eliminar este usuario? Esta acción no se puede deshacer.',
      confirm: 'Eliminar',
      cancel: 'Cancelar',
      notifications: {
        success_title: 'Usuario Eliminado',
        success_description: 'El usuario se ha eliminado correctamente.',
        error_title: 'Error en la Eliminación',
        error_description: 'Ocurrió un error. No se pudo eliminar el usuario.',
      },
    },
    form: {
      first_name: 'Nombre',
      first_name_placeholder: 'Introduce el nombre',
      last_name: 'Apellido',
      last_name_placeholder: 'Introduce el apellido',
      email: 'Correo electrónico',
      email_placeholder: 'Introduce la dirección de correo',
      role: 'Rol',
      role_placeholder: 'Seleccione un rol para el usuario',
      submit: 'Confirmar',
      cancel: 'Cancelar',
      rules: {
        required: 'Este campo es obligatorio',
        invalid_email: 'Formato de correo no válido',
      },
    },
    notifications: {
      create_error_title: 'Error al agregar usuario',
      create_error_description: 'No se pudo agregar un nuevo usuario.',
      create_error_existing_user_description: 'El usuario ya existe.',
    },

    user_card: {
      role: 'Rol',
      status: 'Estado',
      active_status: 'Activo',
      inactive_status: 'Inactivo',
      created_at: 'Creado',
      view_more: 'Ver detalles del usuario',
      edit_user: 'Editar usuario',
      delete_user: 'Eliminar usuario',
      adminRole: 'Administrador',
      userRole: 'Usuario',
      updated_at: 'Actualizado el',
      user_id: 'ID de usuario',
      first_name: 'Nombre',
      last_name: 'Apellido',
      username: 'Nombre de usuario',
      email: 'Correo electrónico',
    },

  },

  error_notifications: {
    default: 'Ocurrió un error desconocido.',
    status_400: 'Solicitud incorrecta: Por favor, inténtalo de nuevo.',
    status_401: 'No autorizado: Necesitas estar conectado para acceder a esto.',
    status_403: 'Prohibido: No tienes permiso para acceder a este recurso.',
    status_404: 'No encontrado: El recurso que buscas no existe.',
    status_422: 'Entidad no procesable: Hubo un problema con los datos proporcionados.',
    status_500: 'Error del servidor: Algo salió mal de nuestra parte. Por favor, inténtalo de nuevo más tarde.',
    status_503: 'Servicio no disponible: El servidor no puede manejar la solicitud en este momento.',
  },

}
