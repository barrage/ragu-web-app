export default {
  details: '詳細',
  chatDock: 'チャットパネル',
  login: {
    title: 'ログイン',
    description: 'ログイン方法を選択してください',
    continueWith: '次で続行',
    notifications: {
      error_title: 'ログインに失敗しました',
      error_description: '認証できませんでした。もう一度お試しください。',
    },

  },
  logout: {
    error_title: 'ログアウトに失敗しました',
    error_description: 'ログアウトを試みる際にエラーが発生しました。もう一度お試しください。',
  },
  timePeriod: {
    today: '今日',
    yesterday: '昨日',
    last7days: '過去7日間',
    last30days: '過去30日間',
    lastYear: '昨年',
    unknown_date: '不明な日付',
  },
  sort: {
    title: '並べ替えオプション',
    description: '並べ替え',
    asc: '昇順',
    desc: '降順',
  },
  profileDropdown: {
    switchToAdmin: '管理者に切り替える',
    switchToUser: 'ユーザーに切り替える',
    profile: 'プロフィール',
    settings: '設定',
    agents: 'エージェント',
    support: 'サポート',
    signOut: 'ログアウト',
    browse_agents: 'サポートする準備ができているすべてのチャットエージェントを閲覧する',
    signout_text: 'サインアウトを進めてもよろしいですか？',
    profile_settings: 'プロフィール設定',
  },
  getHelp: {
    title: '助けを求める',
  },
  form_rules: {
    required: 'このフィールドは必須です',
    min_length: '必要な最小文字数は {min} です',
    max_length: '最大文字数は {max} です',
  },
  chat: {
    user: 'ユーザー',
    assistant: 'アシスタント',
    messages: 'メッセージ',
    inactive_agent: 'このエージェントはもうアクティブではありません。新しい会話を始めるには、アクティブなエージェントを選択してください。',
    copy_title: 'コピーしました',
    copy_message: 'クリップボードにコピーしました',
    all_chats: 'すべてのチャット',
    admin: {
      title: 'チャット',
      description: 'すべてのチャットを一箇所で管理',
      chat_card: {
        title: 'タイトル',
        unknown_title: '不明',
        created_at: '作成日',
        updated_at: '更新日',
        view_details: '詳細を見る',
        edit_chat: 'チャットを編集',
        delete_chat: 'チャットを削除',
      },
      chat_details: {
        title: 'チャットの詳細',
        description: 'このチャットに関するすべての詳細を表示',
        empty_messages: '現在、このチャットにはメッセージがありません。',
      },
    },
    edit_title: {
      title: 'タイトルを編集',
      title_label: 'タイトル',
      title_placeholder: '新しいタイトルを入力してください',
      notifications: {
        success_title: 'タイトルが正常に更新されました',
        success_description: 'チャットのタイトルが正常に更新されました。',
        error_title: 'エラー',
        error_description: '新しいチャットのタイトルの設定中にエラーが発生しました。',
      },
    },
    delete_chat: {
      title: 'チャットを削除',
      description: 'チャットを削除してもよろしいですか？',
      notifications: {
        success_title: '削除が成功しました',
        success_description: 'チャットが正常に削除されました。',
        error_title: 'エラー',
        error_description: 'チャットの削除中にエラーが発生しました。',
      },
    },
    chatInputPlaceholder: 'メッセージを送信',
    chatHistory: 'チャット履歴',
    newChat: {
      title: '新しいチャット',
      description: 'チャットを開始するエージェントを選択してください',
      choseFrom: 'エージェント:',
      empty: '現在、会話可能なエージェントは利用できません。チャットを開始するには、少なくとも1人のエージェントを追加または有効にする必要があります。システム管理者に連絡するか、エージェントの設定を確認してください。',
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
    formats: '形式',
    total: '合計',
    sync: '同期',
    upload: 'アップロード',
    most_recent: '最新',
    specific_formats: '特定の形式',
    series_name: '形式',
    sync_docs: 'ドキュメントを同期する',

    tooltip: {
      delete_document: 'ドキュメントを削除します',
      manage_document: 'ドキュメントを管理します',
      display_total: 'ドキュメントの総数を表示します',
      most_recent: '最近更新または作成された5つのドキュメントを表示します',
      document_formats: '円グラフで異なるドキュメント形式の分布を表示します',
    },

    uploads: {
      title: 'ファイルをアップロード',
      description: 'ここにファイルをドロップするか',
      description_link: 'クリックしてアップロード',
    },

    details: {
      empty: 'このドキュメントは利用できないか、もはや存在しません。',
    },
    delete_document: {
      title: 'ドキュメントの削除',
      description: 'このドキュメントを削除してもよろしいですか？ この操作は元に戻せません。',
      notifications: {
        success_title: 'ドキュメントが削除されました',
        success_description: 'ドキュメントは正常に削除されました。',
        error_title: '削除に失敗しました',
        error_description: 'ドキュメントの削除中にエラーが発生しました。後でもう一度お試しください。',
      },
    },
    notifications: {
      create: {
        success_title: '新しいドキュメント',
        success_description: '新しいドキュメントが正常に作成されました',
        error_title: '新しいドキュメント',
        error_description: '追加中にエラーが発生しました',
        error_existing_document_title: '既存のドキュメント',
        error_existing_document_description: 'このドキュメントはすでに存在します',
        error_file_size_title: 'ファイルサイズの問題',
        error_file_size_description: 'ファイルサイズは50 MBを超えてはいけません！',
        error_file_type_title: 'ファイル形式の問題',
        error_file_type_description: 'ファイルはPDF、TXT、JSON、またはDOCX形式である必要があります！',
      },
    },
    edit_configuration: '設定を編集',
    configuration: '設定',
    parser: {
      title: 'パーサー',
      description: 'パーサーは、ドキュメントからデータを分析および処理することを可能にします。',
      load_more: 'さらに読み込む',
      selected_document: '選択されたドキュメント',
      empty_configuration: '設定が未定義です。',
      parser_preview: 'パーサーのプレビュー',
      parser_preview_empty_state: 'パーサーにプレビューするデータがありません。',
      form: {
        start: '開始',
        end: '終了',
        range: '範囲',
        filters: 'フィルター',
        actions: {
          preview: 'プレビュー',
          save: '保存',
          save_description: '新しく作成したパーサー設定を保存します。',
          preview_description: '現在のパーサー設定でドキュメントをプレビューします。',
        },
      },
      validation: {
        start_0_with_range: '範囲を使用する場合、開始値を0にすることはできません。',
        start_greater_with_range: '範囲を使用する場合、開始値が終了値より大きくなることはできません。',
      },
    },
    chunker: {
      title: 'チャンク作成ツール',
      description: '選択したドキュメントを意味のあるチャンクに分割して、より良いセマンティック分析と処理を行います。',
      chunk_preview: 'チャンクプレビュー',
      chunk_preview_empty_state: '表示するチャンクがありません。設定を調整して結果をプレビューし、このドキュメントのチャンクを生成してください。',
      load_more: 'もっと読み込む',
      chunk: 'チャンク',
      selected_document: '選択されたドキュメント',
      total_chunk: '合計チャンク数',
      no_parser_state: 'まずパーサーの設定を行う必要があります',
      empty_configuration: '設定が空です',
      unknown_configuration: '不明な設定',
      selected_type: '選択されたタイプ',
      notifications: {
        preview: {
          success_title: 'プレビュー成功',
          success_description: 'プレビューが正常に生成されました。以下を確認してください。',
          error_title: 'プレビュー失敗',
          error_description: 'プレビューの生成中に問題が発生しました。後でもう一度お試しください。',
        },
        update: {
          success_title: '更新成功',
          success_description: 'データが正常に更新されました。',
          error_title: '更新失敗',
          error_description: '更新中に問題が発生しました。もう一度お試しください。',
        },
      },
      validation: {
        size_validation: 'サイズはオーバーラップより大きくなければなりません',
        threshold_validation: '閾値は負の値にできません',
      },
      semantic: {
        title: 'セマンティックチャンクの設定',
        description: 'このドキュメントのセマンティックチャンクを設定およびカスタマイズします。リアルタイムでチャンクをプレビューして設定を微調整します。',
        name: 'セマンティック',
        form: {
          size: 'チャンクサイズ（単語数）',
          threshold: '関連性のしきい値',
          distance_function: '距離関数',
          delimiter: 'チャンク区切り文字',
          embed_model: '埋め込みモデル',
          embed_provider: '埋め込みプロバイダー',
          skip_foward: '前方チャンクをスキップ',
          skip_back: '後方チャンクをスキップ',
          actions: {
            preview: 'プレビュー',
            save: '保存',
          },
        },
      },
      sliding: {
        title: 'スライディングチャンクの設定',
        description: '重複するセクションを含む正確なテキストセグメントを作成するためのスライディングウィンドウベースのチャンクを設定します。',
        name: 'スライディング',
        form: {
          size: 'チャンクサイズ',
          overlap: '重複サイズ',
          actions: {
            preview: 'プレビュー',
            save: '保存',
          },
        },
      },
      snapping: {
        title: 'スナッピングチャンクの設定',
        description: '構造化されたテキスト用に定義済みの区切り文字を使用してスナッピングベースのチャンクを設定します。',
        name: 'スナッピング',
        form: {
          size: 'チャンクサイズ',
          overlap: '重複サイズ',
          delimiter: 'チャンク区切り文字',
          skip_foward: '前方チャンクをスキップ',
          skip_back: '後方チャンクをスキップ',
          actions: {
            preview: 'プレビュー',
            save: '保存',
          },
        },
      },
    },

  },
  dashboard: {
    title: 'ダッシュボード',
    description: 'LLMAO管理アプリを管理します。',
    service_widgets: {
      agents: {
        title: '合計エージェント',
        description: 'アクティブなエージェント',
        view_more: 'もっと見る',
      },
      users: {
        title: '合計ユーザー',
        description: 'アクティブなユーザー',
        view_more: 'もっと見る',
      },
      documents: {
        title: 'ドキュメント',
        description: '合計ドキュメント',
        view_more: 'もっと見る',
      },
      collections: {
        title: 'コレクション',
        description: '合計コレクション',
        view_more: 'もっと見る',
      },
    },
    chat_usage_line_chart: {
      title: 'チャットの使用',
      period: {
        week: '週間',
        month: '月',
        year: '年',
      },
    },
    chats: {
      most_recent: {
        title: '最近のチャット',
        description: '最新のチャット履歴を表示します',
      },
      all_chat_usage: {
        title: 'すべてのチャットの使用',
        description: 'すべてのエージェントの使用による最も一般的なチャット',
        series_name: 'エージェント',
        pie_chart_subtext: '合計チャット',
      },
      available_agents: {
        title: '利用可能なエージェント',
        description: 'コミュニケーションに利用可能なエージェントの表示',
      },
    },
    agents: {
      total_widget: {
        active: 'アクティブ',
      },
      providers: {
        title: 'プロバイダー',
        description: 'アクティブなエージェントのプロバイダーを表示します',
        series_name: 'プロバイダー',
      },
      most_used_agent: {
        title: '最も使用されているエージェント',
        description: 'すべてのチャットの使用による最も一般的なエージェント',
        chats: 'チャット',
      },
    },
    users: {
      total_widget: {
        total: '合計',
      },
      most_recent_users: {
        title: '最新のユーザー',
        description: '最新のユーザーを見つけます',
      },
      user_roles: {
        admins: '管理者',
        users: 'ユーザー',
        active: 'アクティブ',
        inactive: '非アクティブ',
      },
    },
  },
  agents: {
    title: 'エージェント',
    all_agents: 'すべてのエージェント',

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
      unknown_instruction: '不明な指示',
      unknown_date: '不明な日付',
      active_status: 'アクティブ',
      inactive_status: '非アクティブ',
      created_at: '不明な日付',
      edit_agent: 'エージェントを編集',
      delete_agent: 'エージェントを削除',
      view_more: 'エージェントの詳細を表示',
      empty_state_title: 'エージェントが見つかりません',
      empty_state_desc: 'お探しのエージェントは存在しないか、現在利用できません。エージェント情報を再度確認するか、新しいエージェントを作成してください。',
    },
    labels: {
      id: 'エージェントID',
      name: 'エージェント名',
      context: 'コンテキスト',
      created_at: '作成日時',
      updated_at: '更新日時',
      actions: 'アクション',
      description: '説明',
      llmProvider: 'LLMプロバイダ',
      model: 'モデル',
      language: '言語',
      temperature: '温度',
      vectorProvider: 'ベクトルプロバイダ',
      embeddingProvider: '埋め込みプロバイダ',
      embeddingModel: '埋め込みモデル',
      active: 'アクティブ',
      status: 'エージェントステータス',
      languageInstruction: '言語の指示',
      summaryInstruction: '概要の指示',
      titleInstruction: 'タイトルの指示',
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
      llmProvider: 'LLMプロバイダを選択',
      model: 'モデルを選択',
      vecotrProvider: 'ベクトルプロバイダを選択',
      embeddingProvider: '埋め込みプロバイダを選択',
      search: 'エージェントを検索',
      agentName: 'エージェント名を入力',
      context: 'エージェントのコンテキストを入力...',
      description: 'エージェントの説明を入力',
      language: 'エージェントの言語を入力',
      languageInstruction: 'エージェントの言語指示を入力',
      summaryInstruction: 'エージェントの概要指示を入力',
      titleInstruction: 'エージェントのタイトル指示を入力',
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
    all_collections: 'すべてのコレクション',

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
      collectionName: 'コレクション名を入力してください',
      empty_collection: '利用可能なコレクションがありません',
    },
    collection_card: {
      unknown_id: '不明なコレクションID',
      unknown_collectin_name: '不明なコレクション名',
      unknown_provider: '不明なプロバイダー',
      unknown_embedder: '不明な埋め込みプロバイダー',
      unknown_model: '不明なモデル',
      unknown_date: '不明な日付',
      empty_state_title: 'コレクションが見つかりません',
      empty_state_desc: 'お探しのコレクションは存在しないか、現在利用できません。コレクション情報を再度確認するか、別の検索をお試しください。',
      view_more: 'コレクションの詳細を表示',
      delete_collection: 'コレクションを削除',
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
        ascii_alphanumeric_underscored_message: '名前は大文字で始まり、文字、数字、およびスペースとしてのアンダースコア（ _ ）のみを含むように入力してください。',
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

    assign_collection: {
      title: 'コレクションの割り当て',
      rules: {
        collection_name: 'コレクションを選択してください',
        amount: '数量を入力してください',
        instruction: '指示を入力してください',
      },
      placeholder: {
        select: 'コレクションを選択',
        instruction: '指示を入力',
        amount: '数量を入力',
      },
      labels: {
        name: 'コレクション名',
        instructions: '指示',
        amount: '数量',
      },
      notification: {
        error_title: 'エラー',
        assign_error_title: 'エージェントにコレクションの割り当てに失敗しました！',
        assign_cuccess_title: 'コレクションが割り当てられました！',
        delete_collection: '削除するコレクションがありません。新しいコレクションを割り当ててください！',
        update_error_collection: 'コレクションの更新に失敗しました。',
        update_collection: 'コレクションが正常に更新されました！',
      },
    },
  },

  users: {
    title: 'ユーザー',
    description: 'チームメンバーを管理し、アクセスレベルを設定します。',
    invite_user: 'ユーザーを招待',
    all_users: 'すべてのユーザー',
    delete_user: {
      title: 'ユーザーを削除',
      description: 'このユーザーを削除してもよろしいですか？この操作は取り消せません。',
      confirm: '削除',
      cancel: 'キャンセル',
      notifications: {
        success_title: 'ユーザーが削除されました',
        success_description: 'ユーザーは正常に削除されました。',
        error_title: '削除に失敗しました',
        error_description: 'エラーが発生しました。ユーザーを削除できませんでした。',
      },
    },
    edit_user: {
      title: 'ユーザーを編集',
      description: '以下でユーザーの詳細を変更してください。',
      confirm: '変更を保存',
      cancel: 'キャンセル',
      notifications: {
        success_title: '変更が保存されました',
        success_description: 'ユーザー情報が正常に更新されました。',
        error_title: '更新失敗',
        error_description: 'ユーザー情報の更新中にエラーが発生しました。再試行してください。',
      },
    },
    activate_user: {
      title: 'ユーザーを有効化',
      description: '選択したユーザーを有効にしてアクセスを許可します。',
      confirm: '有効化',
      cancel: 'キャンセル',
      notifications: {
        success_title: 'ユーザーが有効化されました',
        success_description: 'ユーザーが正常に有効化されました。',
        error_title: '有効化失敗',
        error_description: 'ユーザーを有効化中にエラーが発生しました。再試行してください。',
      },
    },
    deactivate_user: {
      title: 'ユーザーを無効化',
      description: '選択したユーザーを無効にしてアクセスを制限します。',
      confirm: '無効化',
      cancel: 'キャンセル',
      notifications: {
        success_title: 'ユーザーが無効化されました',
        success_description: 'ユーザーが正常に無効化されました。',
        error_title: '無効化失敗',
        error_description: 'ユーザーを無効化中にエラーが発生しました。再試行してください。',
      },
    },
    form: {
      first_name: '名前',
      first_name_placeholder: '名前を入力してください',
      last_name: '苗字',
      last_name_placeholder: '苗字を入力してください',
      email: 'メール',
      email_placeholder: 'メールアドレスを入力してください',
      role: '役割',
      role_placeholder: 'ユーザーの役割を選択してください',
      submit: '確認',
      cancel: 'キャンセル',
      rules: {
        required: 'このフィールドは必須です',
        invalid_email: '無効なメール形式です',
      },
    },

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
      delete_user_title: '削除',
      activate_user_title: '有効化',
      deactivate_user_title: '無効化',
      edit_user_title: '編集',
      activate_user: 'ユーザーを有効化する',
      deactivate_user: 'ユーザーを無効化する',
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
