# LLMAO Frontend Application

## Overview

The **LLMAO Frontend Application** is a web-based platform designed to interact with **Large Language Model (LLM) agents**. This application allows users to create, manage, and interact with agents powered by LLMs. It provides distinct interfaces and functionalities for two main user roles:

- **Admin Users**: These users have full administrative access to the platform, where they can manage users, configure agents, upload documents, and create collections that can be assigned to specific agents. They also have control over agent configurations, permissions, and content management, allowing for highly customizable agent experiences.

- **End Users**: Regular users who can interact with the LLM agents in a chat-based environment. They can communicate with the agents, receive answers, and explore information through conversations, where the agents are empowered with specific knowledge depending on their assigned document collections.

- **Authentication:** The application supports various authentication methods, including Google OAuth, allowing users to securely access the platform.

- **Multi-language Support**: The application supports multiple languages, allowing users to interact with agents in their preferred language.

- **Admin Panel**: Dashboard for managing AI agents, users, documents, and collections. Agent creation and management interface. User management system.

- **AI Agent Interaction**: Custom AI agents with configurable parameters. Chat interface for interacting with AI agents. Support for multiple embedding providers (Azure, OpenAI, Ollama).

- **Chat Functionality**: Real-time chat with AI agents. Chat history and conversation management.

- **Document Management**: Upload and process documents. Collection management for organizing documents.

- **Deployment**: The application is designed to be easily deployed with docker containerization allowing for quick setup and integration with various LLM providers.

### Key Features:

- **Create and Configure LLM Agents**: Admin users can create agents that leverage large language models to provide interactive experiences.

- **Document and Collection Management**: Admins can upload documents and create collections, which are then linked to specific agents. These collections act as a source of knowledge, allowing agents to deliver more contextually accurate responses based on the provided information.

- **User Invitations and Permissions**: Admin users have the ability to invite other users to the platform, assigning them specific roles and permissions to either manage agents or interact with them.

- **Agent Interaction for End Users**: End users can chat with agents that have been set up with specific knowledge from the collections, allowing them to retrieve valuable insights and answers from the agent's database.

The application serves as a comprehensive tool for both building intelligent agents with access to tailored content, as well as enabling real-time, personalized interactions between end users and these agents.

---

## Technology Stack

- **Framework**: [Nuxt 3](https://nuxt.com/)
- **Frontend**: [Vue 3](https://vuejs.org/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **UI Library**: [Element Plus](https://element-plus.org/)
- **Testing**: [Vitest](https://vitest.dev/)

![Framework - Nuxt 3](https://img.shields.io/badge/Framework-Nuxt%203-399918)
![Frontend - Vue 3](https://img.shields.io/badge/Frontend-Vue%203-508D4E)
![State Management - Pinia](https://img.shields.io/badge/State%20Management-Pinia-0C359E)
![Element Plus](https://img.shields.io/badge/UI%20Library-Element%20Plus-3F9EFF)
![Testing - Vitest](https://img.shields.io/badge/Testing-Vitest-F4CE14)

---

## Requirements

- **Node.js**: Ensure you have Node.js version 20 or later installed. You can download and install the latest version from the [Node.js website](https://nodejs.org/). To check your current version, run `node -v` in your terminal. If you need to install or upgrade Node.js, follow the instructions provided on the website.

  ```bash
  node -v
  ```

## Installation Steps

1. **Clone the Repository**

   Clone the boilerplate repository to your local machine using Git:

   ```bash
   git clone https://git.barrage.net/llmao/web-app
   ```

2. **Navigate to Project Directory**
   ```bash
   cd web-app
   ```
3. **Install Dependencies**
   ```bash
   npm install
   ```
   This command installs all the required packages listed in the package.json file.

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```

## ⚖️ License
