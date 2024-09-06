import { createError, defineEventHandler } from 'h3'

export const fakeChats = [
  {
    id: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
    userId: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
    agentId: 1,
    title: 'Understanding WebAssembly',
    createdAt: '2024-09-02T12:00:55.580Z',
    updatedAt: '2024-09-02T12:01:09.294Z',
    messages: [
      {
        id: '348838cd-5617-461c-9e73-ee634f548816',
        sender: '1',
        senderType: 'assistant',
        content: 'Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.531Z',
        updatedAt: '2024-09-02T12:01:08.531Z',
      },
      {
        id: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        sender: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
        senderType: 'user',
        content: 'What is WebAssembly?',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: null,
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.496Z',
        updatedAt: '2024-09-02T12:01:08.496Z',
      },
      {
        id: '348838cd-5617-461c-9e73-ee634f548816',
        sender: '1',
        senderType: 'assistant',
        content: 'Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.531Z',
        updatedAt: '2024-09-02T12:01:08.531Z',
      },

      {
        id: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        sender: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
        senderType: 'user',
        content: 'What is WebAssembly?',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: null,
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.496Z',
        updatedAt: '2024-09-02T12:01:08.496Z',
      },
      {
        id: '348838cd-5617-461c-9e73-ee634f548816',
        sender: '1',
        senderType: 'assistant',
        content: 'Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.531Z',
        updatedAt: '2024-09-02T12:01:08.531Z',
      },
      {
        id: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        sender: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
        senderType: 'user',
        content: 'What is WebAssembly?What is WebAssembly?What is WebAssembly?',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: null,
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.496Z',
        updatedAt: '2024-09-02T12:01:08.496Z',
      },
      {
        id: '348838cd-5617-461c-9e73-ee634f548816',
        sender: '1',
        senderType: 'assistant',
        content: 'Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.531Z',
        updatedAt: '2024-09-02T12:01:08.531Z',
      },
      {
        id: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        sender: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
        senderType: 'user',
        content: 'What is WebAssembly?What is WebAssembly?What is WebAssembly?',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: null,
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.496Z',
        updatedAt: '2024-09-02T12:01:08.496Z',
      },
      {
        id: '348838cd-5617-461c-9e73-ee634f548816',
        sender: '1',
        senderType: 'assistant',
        content: 'Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.531Z',
        updatedAt: '2024-09-02T12:01:08.531Z',
      },
      {
        id: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        sender: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
        senderType: 'user',
        content: 'What is WebAssembly?What is WebAssembly?What is WebAssembly?',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: null,
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.496Z',
        updatedAt: '2024-09-02T12:01:08.496Z',
      },
      {
        id: '348838cd-5617-461c-9e73-ee634f548816',
        sender: '1',
        senderType: 'assistant',
        content: 'Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.531Z',
        updatedAt: '2024-09-02T12:01:08.531Z',
      },
      {
        id: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        sender: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
        senderType: 'user',
        content: 'What is WebAssembly?What is WebAssembly?What is WebAssembly?',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: null,
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.496Z',
        updatedAt: '2024-09-02T12:01:08.496Z',
      },
      {
        id: '348838cd-5617-461c-9e73-ee634f548816',
        sender: '1',
        senderType: 'assistant',
        content: 'Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.531Z',
        updatedAt: '2024-09-02T12:01:08.531Z',
      },
      {
        id: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        sender: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
        senderType: 'user',
        content: 'What is WebAssembly?What is WebAssembly?What is WebAssembly?',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: null,
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.496Z',
        updatedAt: '2024-09-02T12:01:08.496Z',
      },
      {
        id: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        sender: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
        senderType: 'user',
        content: 'What is WebAssembly?',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: null,
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.496Z',
        updatedAt: '2024-09-02T12:01:08.496Z',
      },
      {
        id: '348838cd-5617-461c-9e73-ee634f548816',
        sender: '1',
        senderType: 'assistant',
        content: 'Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.531Z',
        updatedAt: '2024-09-02T12:01:08.531Z',
      },
      {
        id: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        sender: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
        senderType: 'user',
        content: 'What is WebAssembly?',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: null,
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.496Z',
        updatedAt: '2024-09-02T12:01:08.496Z',
      },
      {
        id: '348838cd-5617-461c-9e73-ee634f548816',
        sender: '1',
        senderType: 'assistant',
        content: 'Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.531Z',
        updatedAt: '2024-09-02T12:01:08.531Z',
      },
      {
        id: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        sender: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
        senderType: 'user',
        content: 'What is WebAssembly?',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: null,
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.496Z',
        updatedAt: '2024-09-02T12:01:08.496Z',
      },
      {
        id: '348838cd-5617-461c-9e73-ee634f548816',
        sender: '1',
        senderType: 'assistant',
        content: 'Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.531Z',
        updatedAt: '2024-09-02T12:01:08.531Z',
      },
      {
        id: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        sender: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
        senderType: 'user',
        content: 'What is WebAssembly?',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: null,
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.496Z',
        updatedAt: '2024-09-02T12:01:08.496Z',
      },
      {
        id: '348838cd-5617-461c-9e73-ee634f548816',
        sender: '1',
        senderType: 'assistant',
        content: 'Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.531Z',
        updatedAt: '2024-09-02T12:01:08.531Z',
      },
      {
        id: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        sender: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
        senderType: 'user',
        content: 'What is WebAssembly?',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: null,
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.496Z',
        updatedAt: '2024-09-02T12:01:08.496Z',
      },
      {
        id: '348838cd-5617-461c-9e73-ee634f548816',
        sender: '1',
        senderType: 'assistant',
        content: 'Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.531Z',
        updatedAt: '2024-09-02T12:01:08.531Z',
      },
      {
        id: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        sender: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
        senderType: 'user',
        content: 'What is WebAssembly?',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: null,
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.496Z',
        updatedAt: '2024-09-02T12:01:08.496Z',
      },
      {
        id: '348838cd-5617-461c-9e73-ee634f548816',
        sender: '1',
        senderType: 'assistant',
        content: 'Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.531Z',
        updatedAt: '2024-09-02T12:01:08.531Z',
      },
      {
        id: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        sender: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
        senderType: 'user',
        content: 'What is WebAssembly?',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: null,
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.496Z',
        updatedAt: '2024-09-02T12:01:08.496Z',
      },
      {
        id: '348838cd-5617-461c-9e73-ee634f548816',
        sender: '1',
        senderType: 'assistant',
        content: 'Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.531Z',
        updatedAt: '2024-09-02T12:01:08.531Z',
      },
      {
        id: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        sender: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
        senderType: 'user',
        content: 'What is WebAssembly?',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: null,
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.496Z',
        updatedAt: '2024-09-02T12:01:08.496Z',
      },
      {
        id: '348838cd-5617-461c-9e73-ee634f548816',
        sender: '1',
        senderType: 'assistant',
        content: 'Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.531Z',
        updatedAt: '2024-09-02T12:01:08.531Z',
      },
      {
        id: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        sender: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
        senderType: 'user',
        content: 'What is WebAssembly?',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: null,
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.496Z',
        updatedAt: '2024-09-02T12:01:08.496Z',
      },
      {
        id: '348838cd-5617-461c-9e73-ee634f548816',
        sender: '1',
        senderType: 'assistant',
        content: 'Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.531Z',
        updatedAt: '2024-09-02T12:01:08.531Z',
      },
      {
        id: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        sender: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
        senderType: 'user',
        content: 'What is WebAssembly?',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: null,
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.496Z',
        updatedAt: '2024-09-02T12:01:08.496Z',
      },
      {
        id: '348838cd-5617-461c-9e73-ee634f548816',
        sender: '1',
        senderType: 'assistant',
        content: 'Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.531Z',
        updatedAt: '2024-09-02T12:01:08.531Z',
      },
      {
        id: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        sender: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
        senderType: 'user',
        content: 'What is WebAssembly?',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: null,
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.496Z',
        updatedAt: '2024-09-02T12:01:08.496Z',
      },
      {
        id: '348838cd-5617-461c-9e73-ee634f548816',
        sender: '1',
        senderType: 'assistant',
        content: 'Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.531Z',
        updatedAt: '2024-09-02T12:01:08.531Z',
      },
      {
        id: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        sender: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
        senderType: 'user',
        content: 'What is WebAssembly?',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: null,
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.496Z',
        updatedAt: '2024-09-02T12:01:08.496Z',
      },
      {
        id: '348838cd-5617-461c-9e73-ee634f548816',
        sender: '1',
        senderType: 'assistant',
        content: 'Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.531Z',
        updatedAt: '2024-09-02T12:01:08.531Z',
      },
      {
        id: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        sender: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
        senderType: 'user',
        content: 'What is WebAssembly?',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: null,
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.496Z',
        updatedAt: '2024-09-02T12:01:08.496Z',
      },
      {
        id: '348838cd-5617-461c-9e73-ee634f548816',
        sender: '1',
        senderType: 'assistant',
        content: 'Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.531Z',
        updatedAt: '2024-09-02T12:01:08.531Z',
      },
      {
        id: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        sender: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
        senderType: 'user',
        content: 'What is WebAssembly?',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: null,
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.496Z',
        updatedAt: '2024-09-02T12:01:08.496Z',
      },
      {
        id: '348838cd-5617-461c-9e73-ee634f548816',
        sender: '1',
        senderType: 'assistant',
        content: 'Ah, WebAssembly, or wasm as we call it in the Chadlands. It\'s a binary instruction format...',
        chatId: '5a4ed1de-bf1b-466b-88c9-7fb552a696d0',
        responseTo: 'dcf65ffe-941f-4c5d-b8f1-5939b1f45d69',
        evaluation: null,
        createdAt: '2024-09-02T12:01:08.531Z',
        updatedAt: '2024-09-02T12:01:08.531Z',
      },
    ],
  },
  {
    id: '6b5ed2df-cf1c-477c-99d9-8ab661b797d1',
    userId: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
    agentId: 1,
    title: 'Exploring Rust Programming',
    createdAt: '2024-09-01T15:20:30.580Z',
    updatedAt: '2024-09-01T15:21:00.294Z',
    messages: [
      {
        id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        sender: '1',
        senderType: 'assistant',
        content: 'Rust is a systems programming language focused on safety and performance. It’s known for its strong memory safety guarantees.',
        chatId: '6b5ed2df-cf1c-477c-99d9-8ab661b797d1',
        responseTo: 'f1a2b3c4-d5e6-7890-abcdef123456',
        evaluation: null,
        createdAt: '2024-09-01T15:21:00.580Z',
        updatedAt: '2024-09-01T15:21:00.580Z',
      },
      {
        id: 'f1a2b3c4-d5e6-7890-abcdef123456',
        sender: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
        senderType: 'user',
        content: 'What is Rust used for?',
        chatId: '6b5ed2df-cf1c-477c-99d9-8ab661b797d1',
        responseTo: null,
        evaluation: null,
        createdAt: '2024-09-01T15:20:30.580Z',
        updatedAt: '2024-09-01T15:20:30.580Z',
      },
    ],
  },
  {
    id: '7c6fe3f0-df2d-488d-bade-9bc772c8a8e2',
    userId: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
    agentId: 1,
    title: 'Learning Python Data Science',
    createdAt: '2024-08-30T08:10:15.580Z',
    updatedAt: '2024-08-30T08:11:25.294Z',
    messages: [
      {
        id: 'b2c3d4e5-f678-90ab-cdef-1234567890ab',
        sender: '1',
        senderType: 'assistant',
        content: 'Python is a popular language for data science due to its extensive libraries like pandas, NumPy, and scikit-learn.',
        chatId: '7c6fe3f0-df2d-488d-bade-9bc772c8a8e2',
        responseTo: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        evaluation: null,
        createdAt: '2024-08-30T08:11:00.580Z',
        updatedAt: '2024-08-30T08:11:00.580Z',
      },
      {
        id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        sender: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
        senderType: 'user',
        content: 'What libraries are used in Python for data science?',
        chatId: '7c6fe3f0-df2d-488d-bade-9bc772c8a8e2',
        responseTo: null,
        evaluation: null,
        createdAt: '2024-08-30T08:10:15.580Z',
        updatedAt: '2024-08-30T08:10:15.580Z',
      },
    ],
  },
  {
    id: '8d7gf4h1-eg3f-499e-cbfe-acd883d9b9f3',
    userId: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
    agentId: 1,
    title: 'JavaScript Best Practices',
    createdAt: '2024-08-25T17:45:30.580Z',
    updatedAt: '2024-08-25T17:46:10.294Z',
    messages: [
      {
        id: 'c3d4e5f6-7890-abcd-ef12-34567890abcd',
        sender: '1',
        senderType: 'assistant',
        content: 'Some best practices in JavaScript include using `const` and `let` instead of `var`, and writing modular code with ES6 modules.',
        chatId: '8d7gf4h1-eg3f-499e-cbfe-acd883d9b9f3',
        responseTo: 'd4e5f678-90ab-cdef-1234-567890abcdef',
        evaluation: null,
        createdAt: '2024-08-25T17:46:00.580Z',
        updatedAt: '2024-08-25T17:46:00.580Z',
      },
      {
        id: 'd4e5f678-90ab-cdef-1234-567890abcdef',
        sender: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
        senderType: 'user',
        content: 'What are some JavaScript best practices?',
        chatId: '8d7gf4h1-eg3f-499e-cbfe-acd883d9b9f3',
        responseTo: null,
        evaluation: null,
        createdAt: '2024-08-25T17:45:30.580Z',
        updatedAt: '2024-08-25T17:45:30.580Z',
      },
    ],
  },
  {
    id: '9e8hg5i2-fh4g-511f-dcgh-bed994e9c0g4',
    userId: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
    agentId: 1,
    title: 'CSS Grid and Flexbox',
    createdAt: '2024-08-10T09:30:00.580Z',
    updatedAt: '2024-08-10T09:31:40.294Z',
    messages: [
      {
        id: 'e5f67890-abcd-ef12-3456-7890abcdef12',
        sender: '1',
        senderType: 'assistant',
        content: 'CSS Grid is a two-dimensional layout system for the web, while Flexbox is a one-dimensional layout system. They both help in creating responsive designs.',
        chatId: '9e8hg5i2-fh4g-511f-dcgh-bed994e9c0g4',
        responseTo: 'f67890ab-cdef-1234-5678-90abcdef1234',
        evaluation: null,
        createdAt: '2024-08-10T09:31:00.580Z',
        updatedAt: '2024-08-10T09:31:00.580Z',
      },
      {
        id: 'f67890ab-cdef-1234-5678-90abcdef1234',
        sender: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
        senderType: 'user',
        content: 'What is the difference between CSS Grid and Flexbox?',
        chatId: '9e8hg5i2-fh4g-511f-dcgh-bed994e9c0g4',
        responseTo: null,
        evaluation: null,
        createdAt: '2024-08-10T09:30:00.580Z',
        updatedAt: '2024-08-10T09:30:00.580Z',
      },
    ],
  },
  {
    id: 'af9ij6j3-gj5h-622g-edhi-cfeaaae0d1h5',
    userId: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
    agentId: 1,
    title: 'Kubernetes Essentials',
    createdAt: '2024-07-15T11:25:20.580Z',
    updatedAt: '2024-07-15T11:26:50.294Z',
    messages: [
      {
        id: 'f6g7h8i9-j0kl-mnop-qrst-uvwxyza12345',
        sender: '1',
        senderType: 'assistant',
        content: 'Kubernetes is a container orchestration platform that automates the deployment, scaling, and management of containerized applications.',
        chatId: 'af9ij6j3-gj5h-622g-edhi-cfeaaae0d1h5',
        responseTo: 'g7h8i9j0-klmn-opqr-stuv-wxyz12345678',
        evaluation: null,
        createdAt: '2024-07-15T11:26:00.580Z',
        updatedAt: '2024-07-15T11:26:00.580Z',
      },
      {
        id: 'g7h8i9j0-klmn-opqr-stuv-wxyz12345678',
        sender: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
        senderType: 'user',
        content: 'What is Kubernetes?',
        chatId: 'af9ij6j3-gj5h-622g-edhi-cfeaaae0d1h5',
        responseTo: null,
        evaluation: null,
        createdAt: '2024-07-15T11:25:20.580Z',
        updatedAt: '2024-07-15T11:25:20.580Z',
      },
    ],
  },
  {
    id: 'bk0jk7k4-hk6i-733h-feij-dghbbbf1e2i6',
    userId: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
    agentId: 1,
    title: 'Docker and Containerization',
    createdAt: '2024-06-05T14:00:00.580Z',
    updatedAt: '2024-06-05T14:01:30.294Z',
    messages: [
      {
        id: '9b2d3e8f-a2f3-4e67-b2d6-eadc4771c6d7',
        sender: '1',
        senderType: 'assistant',
        content: 'Docker is a platform for developers and sysadmins to develop, deploy, and run applications in containers, which are lightweight and portable.',
        chatId: 'bk0jk7k4-hk6i-733h-feij-dghbbbf1e2i6',
        responseTo: '6e5d3a9d-fb78-4e54-b4c6-1e4322d3b2e9',
        evaluation: null,
        createdAt: '2024-06-05T14:01:00.580Z',
        updatedAt: '2024-06-05T14:01:00.580Z',
      },
      {
        id: '6e5d3a9d-fb78-4e54-b4c6-1e4322d3b2e9',
        sender: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
        senderType: 'user',
        content: 'What is Docker?',
        chatId: 'bk0jk7k4-hk6i-733h-feij-dghbbbf1e2i6',
        responseTo: null,
        evaluation: null,
        createdAt: '2024-06-05T14:00:30.580Z',
        updatedAt: '2024-06-05T14:00:30.580Z',
      },
    ],
  },
  {
    id: 'cl1kl8l5-il7j-844i-gfji-eihcccj2f3j7',
    userId: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
    agentId: 1,
    title: 'DevOps Best Practices',
    createdAt: '2024-04-20T20:45:00.580Z',
    updatedAt: '2024-04-20T20:46:20.294Z',
    messages: [
      {
        id: 'd8e9f0g1-h2ij-klmn-opqr-stuvwx123456',
        sender: '1',
        senderType: 'assistant',
        content: 'DevOps best practices include continuous integration and continuous deployment (CI/CD), automated testing, and infrastructure as code.',
        chatId: 'cl1kl8l5-il7j-844i-gfji-eihcccj2f3j7',
        responseTo: 'e9f0g1h2-ijkl-mnop-qrst-uvwxy123456',
        evaluation: null,
        createdAt: '2024-04-20T20:46:00.580Z',
        updatedAt: '2024-04-20T20:46:00.580Z',
      },
      {
        id: 'e9f0g1h2-ijkl-mnop-qrst-uvwxy123456',
        sender: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
        senderType: 'user',
        content: 'What are some DevOps best practices?',
        chatId: 'cl1kl8l5-il7j-844i-gfji-eihcccj2f3j7',
        responseTo: null,
        evaluation: null,
        createdAt: '2024-04-20T20:45:00.580Z',
        updatedAt: '2024-04-20T20:45:00.580Z',
      },
    ],
  },
  {
    id: 'dm2lm9m6-jm8k-955j-hgkj-fjiaddk3g4k8',
    userId: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
    agentId: 1,
    title: 'Intro to Machine Learning',
    createdAt: '2024-01-10T18:30:00.580Z',
    updatedAt: '2024-01-10T18:31:45.294Z',
    messages: [
      {
        id: 'f0g1h2i3-j4kl-mnop-qrst-uvwxy123456',
        sender: '1',
        senderType: 'assistant',
        content: 'Machine learning involves training algorithms on data to make predictions or decisions without being explicitly programmed to perform the task.',
        chatId: 'dm2lm9m6-jm8k-955j-hgkj-fjiaddk3g4k8',
        responseTo: 'g1h2i3j4-klmn-opqr-stuv-wx1234567890',
        evaluation: null,
        createdAt: '2024-01-10T18:31:00.580Z',
        updatedAt: '2024-01-10T18:31:00.580Z',
      },
      {
        id: 'g1h2i3j4-klmn-opqr-stuv-wx1234567890',
        sender: 'ef2b6db8-e784-46bf-9ce1-3f43cd1d1beb',
        senderType: 'user',
        content: 'What is machine learning?',
        chatId: 'dm2lm9m6-jm8k-955j-hgkj-fjiaddk3g4k8',
        responseTo: null,
        evaluation: null,
        createdAt: '2024-01-10T18:30:00.580Z',
        updatedAt: '2024-01-10T18:30:00.580Z',
      },
    ],
  },
]

export default defineEventHandler((event) => {
  if (!event.context.params || !event.context.params.chatId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Chat ID is required',
    })
  }

  const chatId = event.context.params.chatId

  // Find the chat with the specified ID
  const chat = fakeChats.find(chat => chat.id === chatId)

  // If chat is not found, throw a 404 error
  if (!chat) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Chat not found',
    })
  }

  // Return the messages from the found chat
  return chat.messages
})
