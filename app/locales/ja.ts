export default {
  details: '詳細',
  chatDock: 'チャットパネル',
  login: {
    title: 'ログイン',
    description: 'ログイン方法を選択してください',
    continueWith: '次で続行',
  },
  timePeriod: {
    today: '今日',
    yesterday: '昨日',
    last7days: '過去7日間',
    last30days: '過去30日間',
    lastYear: '昨年',
  },
  profileDropdown: {
    switchToAdmin: '管理者に切り替える',
    switchToUser: 'ユーザーに切り替える',
    profile: 'プロフィール',
    settings: '設定',
    agents: 'エージェント',
    support: 'サポート',
    signOut: 'ログアウト',
  },
  getHelp: {
    title: '助けを求める',
  },
  chat: {
    user: 'ユーザー',
    assistant: 'アシスタント',
    admin: {
      title: 'チャット',
      description: 'すべてのチャットを一箇所で管理',
      chat_card: {
        created_at: '作成日',
        updated_at: '更新日',
        view_details: '詳細を見る',
        edit_chat: 'チャットを編集',
        delete_chat: 'チャットを削除',
      },
      chat_details: {
        title: 'チャットの詳細',
        description: 'このチャットに関するすべての詳細を表示',
      },
    },
    editTitle: 'タイトルを編集',
    deleteChat: 'チャットを削除',
    chatInputPlaceholder: 'メッセージを送信',
    chatHistory: 'チャット履歴',
    newChat: {
      title: '新しいチャット',
      description: 'チャットを開始するエージェントを選択してください',
      choseFrom: 'エージェント:',
    },
  },
  documents: {
    title: 'ドキュメント',
    description: 'AIの学習を支援するすべてのドキュメントを管理および整理します。',
    name: '名前',
    extension: '形式',
    path: '場所',
    source: 'ソース',
    id: 'ドキュメントID',
    hash: 'ハッシュ',
  },

  agents: {
    title: 'エージェント',
    titles: {
      mainTitle: 'エージェント',
      details: 'エージェントの詳細',
      description: 'AIとのやり取りを担当するエージェントを管理します',
      edit: 'エージェントを編集',
      create: 'エージェントを作成',
      createDescription: 'エージェントの名前とコンテキストを入力して、新しいエージェントを作成しましょう！',
      deleteTitle: 'エージェントを削除しますか？',
      deleteDescription: '本当にエージェントを削除しますか？',
    },
    agent_card: {
      unknown_id: '不明なエージェントID',
      unknown_agentname: '不明なエージェント名',
      unknown_agentcontext: 'エージェントコンテキストが不足しています',
      unknown_description: 'エージェント説明が不足しています',
      unknown_llmProvider: '不明なllmProvider',
      unknown_model: '不明なモデル',
      unknown_language: '不明な言語',
      unknown_temperature: '不明な温度',
      unknown_vectorProvider: '不明なベクトルプロバイダー',
      unknown_embeddingProvider: '不明な埋め込みプロバイダー',
      unknown_embeddingModel: '不明な埋め込みモデル',
      unknown_date: '不明な日付',
      active_status: 'アクティブ',
      inactive_status: '非アクティブ',
      created_at: '不明な日付',
      edit_agent: 'エージェントを編集',
      delete_agent: 'エージェントを削除',
      view_more: 'エージェントの詳細を表示',
    },
    labels: {
      id: 'エージェントID',
      name: 'エージェント名',
      context: 'コンテキスト',
      created_at: '作成日',
      updated_at: '更新日',
      actions: 'アクション',
      description: '説明',
      llmProvider: 'LLMプロバイダー',
      model: 'モデル',
      language: '言語',
      temperature: '温度',
      vectorProvider: 'ベクタープロバイダー',
      embeddingProvider: '埋め込みプロバイダー',
      embeddingModel: '埋め込みモデル',
      active: 'アクティブ',
      status: 'エージェントステータス',
    },
    buttons: {
      create: 'エージェントを作成',
      edit: '編集',
      delete: '削除',
      cancel: 'キャンセル',
      save: '保存',
      overview: 'エージェントの概要',
      filter: 'フィルター',
    },

    placeholder: {
      llmProvider: 'LLMプロバイダーを選択',
      model: 'モデルを選択',
      vecotrProvider: 'ベクタープロバイダーを選択',
      embeddingProvider: '埋め込みプロバイダーを選択',
      search: 'エージェントを検索',
    },

    notifications: {
      delete_title: '成功',
      delete_message: 'エージェント {name} は削除されました！',
      update_title: '成功',
      update_message: 'エージェント {name} は更新されました！',
      create_title: '成功',
      create_message: 'エージェント {name} が作成されました！',
      form_title: 'フォームエラー',
      form_message: 'フォームのエラーを修正してください。',
      invalid_agent: 'エラーが発生しました。削除しようとしているエージェントが存在しないようです。',
    },
    rules: {
      name: {
        required_message: 'エージェント名を入力してください',
        length_message: '名前は {min} から {max} 文字で入力してください',
      },
      context: {
        required_message: 'エージェントコンテキストを入力してください',
        length_message: 'コンテキストは {min} から {max} 文字で入力してください',
      },
      description: {
        required_message: '説明を入力してください',
      },
      llmProvider: {
        required_message: '有効なLLMプロバイダーを選択してください',
      },
      model: {
        required_message: 'モデルを選択してください',
      },
      language: {
        required_message: '言語を指定してください',
      },
      temperature: {
        required_message: '0から1までの温度を設定してください',
      },
      vectorProvider: {
        required_message: '有効なベクタープロバイダーを選択してください',
      },
      embeddingProvider: {
        required_message: '埋め込みプロバイダーを選択してください',
      },
      embeddingModel: {
        required_message: '埋め込みモデルを提供してください',
      },
      active: {
        required_message: 'エージェントがアクティブかどうかを指定してください',
      },
    },
  },

  collections: {
    title: 'コレクション',
    titles: {
      title: 'コレクション',
      subTitle: 'AIの知識ベースを導くコンテンツコレクションを管理します。',
      deleteTitle: 'コレクションを削除しますか？',
      deleteDescription: 'コレクションを削除してもよろしいですか？',
      create: 'コレクションを作成',
      createDescription: 'あなたのニーズに合わせて新しいコレクションを作成してください！',
    },
    buttons: {
      create: 'コレクションを作成',
      delete: '削除',
      cancel: 'キャンセル',
      save: '保存',
      filter: 'フィルタ',
    },
    placeholders: {
      search: 'コレクションを検索',
      vectorPlaceholder: 'ベクタープロバイダーを選択',
      embeddingPlaceholder: '埋め込みプロバイダーを選択',
      modelPlaceholder: 'モデルを選択',
    },
    collection_card: {
      unknown_id: '不明なコレクションID',
      unknown_collectin_name: '不明なコレクション名',
      unknown_provider: '不明なプロバイダー',
      unknown_embedder: '不明な埋め込みプロバイダー',
      unknown_model: '不明なモデル',
      unknown_date: '不明な日付',
    },

    labels: {
      id: 'コレクションID',
      name: 'コレクション名',
      created_at: '作成日',
      updated_at: '更新日',
      provider: 'プロバイダー',
      model: 'モデル',
      embedder: '埋め込みツール',
    },

    deleteModal: {
      title: 'コレクションを削除',
      text: 'このコレクションを削除してもよろしいですか？',
    },
    rules: {
      name: {
        required_message: 'コレクション名を入力してください',
        length_message: '名前は{min}〜{max}文字である必要があります',
        ascii_alphanumeric_underscored_message_ja: '名前は文字で始まり、文字、数字、またはアンダースコア ( _ ) のみを含めてください。',
      },
      vectorProvider: 'ベクタープロバイダーを選択してください',
      embeddingProvider: '埋め込みプロバイダーを選択してください',
      model: 'モデルを選択してください',
    },
    notifications: {
      delete_title: '成功',
      delete_message: 'コレクション{name}は削除されました！',
      delete_error: 'コレクションが削除されませんでした',
      create_title: '成功',
      create_message: 'コレクション{name}は作成されました！',
      form_title: 'フォームエラー',
      form_message: 'フォームの強調表示されたエラーを修正してください。',
      invalid_collection: 'おっと！ 何かがうまくいかなかったようです。削除しようとしているコレクションは存在しないようです。',
    },
  },

  users: {
    title: 'ユーザー',
    description: 'チームメンバーを管理し、アクセスレベルを設定します。',
    invite_user: 'ユーザーを招待',
    notifications: {
      create_error_title: 'ユーザー追加エラー',
      create_error_description: '新しいユーザーの追加に失敗しました。',
      create_error_existing_user_description: 'ユーザーはすでに存在します。',
    },
    user_card: {
      role: '役割',
      status: '状態',
      active_status: 'アクティブ',
      inactive_status: '非アクティブ',
      created_at: '作成済み',
      view_more: 'ユーザーの詳細を見る',
      edit_user: 'ユーザーを編集',
      delete_user: 'ユーザーを削除',
      adminRole: '管理者',
      userRole: 'ユーザー',
      updated_at: '更新日',
      user_id: 'ユーザーID',
      first_name: '名',
      last_name: '姓',
      username: 'ユーザー名',
      email: 'メール',
    },

  },

  error_notifications: {
    default: '不明なエラーが発生しました。',
    status_400: '不正なリクエスト：再試行してください。',
    status_401: '未承認：アクセスするにはログインする必要があります。',
    status_403: '禁止：このリソースにアクセスする権限がありません。',
    status_404: '未発見：探しているリソースは存在しません。',
    status_422: '処理できないエンティティ：提供されたデータに問題がありました。',
    status_500: 'サーバーエラー：こちら側で何かがうまくいきませんでした。後でもう一度お試しください。',
    status_503: 'サービス利用不可：サーバーは現在リクエストを処理できません。',
  },

}
