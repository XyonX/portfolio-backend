# Aiverse: A Unified AI Messaging Platform

Aiverse is a revolutionary chatbot messaging application designed to provide a seamless, multi-AI conversational experience. Unlike traditional single-chatbot apps, Aiverse functions as a messenger platform where users can interact with multiple AI bot contacts, such as Gemini, Qwen, Mistral, DeepSeek, Llama, Gemma, and more. Built with a modern MERN stack (MongoDB, Express.js, React, Node.js) and Next.js, Aiverse offers a fully dynamic, multi-user environment with personalized data storage, responsive design, and advanced AI conversation management.

**Live Demo**: [https://aiverseapp.site/](https://aiverseapp.site/)

![Aiverse Conversation Area](https://raw.githubusercontent.com/XyonX/portfolio-content/refs/heads/main/Portfolios/aiverse/images/aiverse-thumbnail.png)

Aiverse is a unified AI playground where users can engage in natural, context-aware, and personalized conversations with various large language models (LLMs), create custom persona-based chatbots, and explore a discovery page for new bots. The app emphasizes message streaming, smart context management, cross-bot interaction, and personalized responses based on user interests and profile descriptions, making it an innovative solution for AI enthusiasts and professionals alike.

---

## Features

### 1. Multi-AI Chat Interface
- Engage with multiple AI bot contacts (e.g., Gemini, Mistral, Llama) in a messenger-like interface.
- Each bot is treated as a unique contact, with separate conversation threads stored for each user.
- Supports multi-user functionality, ensuring personalized data storage and retrieval using MongoDB.

![Conversation Example](https://raw.githubusercontent.com/XyonX/portfolio-content/refs/heads/main/Portfolios/aiverse/images/conv-2.png)

### 2. Message Streaming for Natural Conversations
- Bots respond with real-time message streaming, mimicking natural human conversation rather than delivering a single large text block.
- Enhances user experience with dynamic, interactive responses.

### 3. Smart Context Management
- **Context-Based System**: Conversations are organized to optimize LLM context usage.
- **Session-Based Context**: Messages in the current session are stored in an active array for immediate use.
- **Historical Context Summarization**:
  - If a user sends many messages in one session, the conversation is summarized to create a compact context.
  - For conversations older than 6-8 hours with significant activity, Aiverse summarizes and stores historical context.
  - Summarized context is combined with current messages, respecting each LLM’s context capacity (e.g., 100k tokens).
- Ensures long-term memory for bots, allowing them to recall past interactions effectively.

### 4. Personalized Responses
- Bots generate responses tailored to user interests and descriptions provided in the user profile page.
- Leverages user preferences (e.g., tech, gaming) and profile details (e.g., displayName, bio) stored in the User model to customize conversation tone and content.
- Enhances engagement by aligning bot responses with user-specific contexts, making interactions more relevant and meaningful.

### 5. Cross-Bot Interaction
- Users can mention other bots (e.g., @GPT, @Gemini) in a conversation, and the current bot automatically fetches relevant past interactions.
- Simplifies referencing previous discussions with other bots, enhancing conversation continuity.

### 6. Custom Persona Chatbot Creation
- Users can create personalized chatbots with custom prompts (e.g., “Act as an English teacher with 10 years of experience”).
- Choose a name, avatar, and specific persona for each custom bot.
- Ideal for roleplay or specialized interactions, such as tutoring or professional advice.

![Bot Creation](https://raw.githubusercontent.com/XyonX/portfolio-content/refs/heads/main/Portfolios/aiverse/images/bot-create.png)

### 7. Discovery Page
- Explore a variety of LLMs and custom persona-based chatbots created by other users or the platform.
- Discover new bots with unique capabilities or personalities to enhance the user experience.

![Discovery Page](https://raw.githubusercontent.com/XyonX/portfolio-content/refs/heads/main/Portfolios/aiverse/images/discover-page.png)

### 8. Responsive Design and Data Sync
- Fully responsive layout optimized for both mobile and desktop devices.
- Data is stored in a MongoDB cluster, ensuring seamless synchronization across devices when logged in with the same account.
- Consistent user experience across platforms.

### 9. Firebase Authentication
- Secure user authentication and session management using Firebase.
- Supports registration, login, and logout with token-based verification for backend communication.

### 10. Local Storage for Settings and Contacts
- Persists user settings (e.g., theme, font size, notifications) and AI contacts in local storage for faster access.
- Ensures a smooth user experience even during network disruptions.

  
![Conversation Example](https://raw.githubusercontent.com/XyonX/portfolio-content/refs/heads/main/Portfolios/aiverse/images/conv-1.png)
![Conversation Example](https://raw.githubusercontent.com/XyonX/portfolio-content/refs/heads/main/Portfolios/aiverse/images/conv-dark.png)
---

## Tech Stack
- **Frontend**: React, Next.js, Firebase (for authentication), Axios (for API calls), Next-Themes (for theme management).
- **Backend**: Node.js, Express.js, MongoDB (for data storage), OpenAI API (for LLM integration).
- **Context Management**: Custom session and token management system with summarization using Tiktoken and OpenAI.
- **Deployment**: Frontend hosted on Vercel, backend on AWS, and database on MongoDB Atlas cluster.

---

## Architecture

### Frontend
- **Context Management**: Uses React Context API (`AppProvider`) to manage global state, including user data, AI contacts, recent chats, and settings.
- **State Persistence**: Stores AI contacts, recent chats, and settings in `localStorage` for offline access and quick loading.
- **Real-Time Updates**: Fetches bots and recent conversations from the backend on user login or state change.
- **Responsive Design**: Built with Tailwind CSS (via Next-Themes) for a modern, adaptable UI across devices.

### Backend
- **Database Models**:
  - **User**: Stores user information (e.g., displayName, username, preferences, bio for personalization).
  - **Bot**: Defines AI bot configurations (e.g., model, endpoint, context capacity).
  - **Conversation**: Tracks user-bot interactions with session and message references.
  - **Message**: Stores individual messages with metadata (e.g., sender, timestamp, sessionId).
  - **Session**: Manages active and historical conversation sessions with context summarization.
- **Message Controller**:
  - Handles message creation with streaming or regular responses.
  - Integrates with OpenAI (via OpenRouter) for LLM responses.
  - Manages session lifecycle, including creation, closure, and summarization.
  - Incorporates user preferences and profile data for personalized responses.
- **Context Optimization**:
  - Uses Tiktoken to calculate token counts for messages and context.
  - Allocates tokens dynamically for current session context, historical summaries, and new messages.
  - Summarizes long or old conversations to fit within LLM context limits.

### Context Management System
- **Active Session**: Stores current messages in a session array, updated in real-time.
- **Historical Context**: Summarizes past sessions (e.g., after 6-8 hours or high message volume) to maintain compact, relevant context.
- **Token Allocation**: Balances tokens between current session, historical context, and new messages based on bot specifications.
- **Cross-Bot Fetching**: Retrieves and integrates conversation data when users mention other bots.
- **Personalization**: Injects user preferences and profile details into the system message for tailored bot responses.


![Conversation Example](https://raw.githubusercontent.com/XyonX/portfolio-content/refs/heads/main/Portfolios/aiverse/images/what-is.png)
---

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud-based, e.g., MongoDB Atlas)
- Firebase project with Authentication enabled
- OpenRouter API key (for LLM integration)

### Steps
1. **Clone the Repositories**:
   ```bash
   # Frontend
   git clone https://github.com/XyonX/aiverseapp.git
   cd aiverseapp
   
   # Backend
   git clone https://github.com/XyonX/aiverse-backend.git
   cd aiverse-backend
   ```

2. **Install Dependencies**:
   ```bash
   # Frontend
   cd aiverseapp
   npm install
   
   # Backend
   cd ../aiverse-backend
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create `.env` files in both `aiverseapp` and `aiverse-backend` directories.
   - Frontend (`aiverseapp/.env`):
     ```env
     NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
     NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
     ```
   - Backend (`aiverse-backend/.env`):
     ```env
     PORT=3001
     MONGODB_URI=your_mongodb_connection_string
     OPENROUTER_API=your_openrouter_api_key
     ```

4. **Run the Application**:
   ```bash
   # Start MongoDB (if local)
   mongod
   
   # Start Backend
   cd aiverse-backend
   npm start
   
   # Start Frontend
   cd ../aiverseapp
   npm run dev
   ```

5. **Access the App**:
   - Open `http://localhost:3000` in your browser.
   - Register or log in to start interacting with AI bots.

---

## Usage
1. **Register/Login**: Create an account or log in using Firebase Authentication.
2. **Update Profile**: Add interests (e.g., tech, gaming) and a bio on the profile page to enable personalized bot responses.
3. **Select a Bot**: Choose an AI contact from the chat list or discovery page.
4. **Start Chatting**: Send messages, mention other bots with `@`, or upload files (e.g., images) for enhanced interactions.
5. **Create a Custom Bot**: Use the bot creation feature to design a persona-based chatbot with a custom prompt, name, and avatar.
6. **Explore Discovery**: Find new LLMs or roleplay bots on the discovery page.
7. **Switch Devices**: Log in on mobile or desktop to access synchronized chat data.

![Supported Models](https://raw.githubusercontent.com/XyonX/portfolio-content/refs/heads/main/Portfolios/aiverse/images/supported-models.png)

---

## Future Enhancements
- **Voice Mode**: Add voice-based interaction with bots for hands-free use.
- **Advanced Analytics**: Provide conversation insights (e.g., sentiment analysis, topic trends).
- **Group Chats**: Enable multi-bot conversations in a single thread.
- **Plugin Ecosystem**: Allow third-party developers to create bot extensions.

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository ([Frontend](https://github.com/XyonX/aiverseapp.git) or [Backend](https://github.com/XyonX/aiverse-backend.git)).
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact
For inquiries or feedback, reach out via [email@example.com](mailto:email@example.com) or open an issue on GitHub ([Frontend](https://github.com/XyonX/aiverseapp.git) or [Backend](https://github.com/XyonX/aiverse-backend.git)).
