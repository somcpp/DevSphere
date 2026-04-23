# DevSphere

A modern networking platform built with React that connects developers, enables skill-sharing, and facilitates meaningful professional relationships within tech communities.

## 🎯 Overview

DevSphere is a full-featured networking platform designed for developers to discover peers, build professional connections, and collaborate on opportunities. Users can create comprehensive profiles, manage connection requests, browse a feed, and connect with like-minded students.

## ✨ Key Features

### 🔐 Authentication
- User signup and login
- Secure authentication system
- Session management

### 👤 User Profiles
- Comprehensive profile creation with:
  - Personal information (name, email, phone)
  - Academic details (institution, major)
  - Professional experience
  - Skills and expertise
  - Social links (LinkedIn, GitHub, Twitter)
  - Profile photo
  - Bio and about section
  - Interests

### 🤝 Connection Management
- **Incoming Requests**: View and manage incoming connection requests from other users
- **Outgoing Requests**: Track and manage requests you've sent
- **My Connections**: View all established connections
- Accept or reject connection requests with one click
- View detailed profiles before responding to requests

### 📱 Feed
- Browse activity feed from your network
- Discover relevant updates and information

### 🚀 Onboarding
- 4-step guided onboarding process:
  - **Step 1**: Add your skills
  - **Step 2**: Write your bio and about section
  - **Step 3**: Add professional experience
  - **Step 4**: Add contact information

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router** - Navigation and routing
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Tools & Dev Tools
- **ESLint** - Code linting
- **Node.js** - JavaScript runtime

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nexus
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```
   VITE_API_URL=<your-api-endpoint>
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## 🚀 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint to check code quality

## 📁 Project Structure

```
src/
├── Api/                           # API endpoints and services
│   ├── Api.js                     # Base API configuration
│   ├── authApi.js                 # Authentication endpoints
│   ├── connectionsApi.js          # Connection management endpoints
│   ├── profileApi.js              # Profile endpoints
│   └── userApi.js                 # User data endpoints
├── app/
│   └── store.js                   # Redux store configuration
├── components/
│   ├── Header.jsx                 # Top navigation header
│   ├── Sidebar.jsx                # Side navigation menu
│   └── AuthSidebar.jsx            # Authentication sidebar
├── features/
│   ├── auth/                      # Authentication feature
│   │   ├── AuthPage.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── authSlice.js
│   ├── connections/               # Connection management feature
│   │   ├── ConnectionsPage.jsx
│   │   ├── connectionsSlice.js
│   │   ├── components/
│   │   │   ├── ItemsCard.jsx
│   │   │   └── ItemsList.jsx
│   │   └── pages/
│   │       ├── MyConnectionsPage.jsx
│   │       ├── IncomingRequestPage.jsx
│   │       ├── OutgoingRequestPage.jsx
│   │       └── ViewDetailsPage.jsx
│   ├── feed/                      # Feed feature
│   │   ├── FeedPage.jsx
│   │   └── FeedCard.jsx
│   ├── header/
│   │   └── headerSlice.js
│   ├── onboarding/                # User onboarding flow
│   │   ├── OnBoardingContainer.jsx
│   │   ├── Step1_Skills.jsx
│   │   ├── Step2_Bio.jsx
│   │   ├── Step3_Experience.jsx
│   │   ├── Step4_Contact.jsx
│   │   └── onboardingSlice.js
│   ├── profile/                   # User profile features
│   │   ├── MyProfilePage.jsx
│   │   ├── EditProfileModal.jsx
│   │   └── profileSlice.js
│   └── viewProfile/               # View other users' profiles
│       └── ViewProfilePage.jsx
├── data/
│   └── skills.json                # Predefined skills list
├── App.jsx                        # Main app component
├── App.css                        # Global styles
├── main.jsx                       # React entry point
└── index.css                      # Global styles
```

## 🔄 User Data Model

DevSphere uses a comprehensive user schema that includes:

- **Authentication**: Email, password
- **Profile**: Name, photo, bio, gender
- **Academic**: Institution, major
- **Professional**: Experience, skills, position
- **Social**: LinkedIn, GitHub, Twitter
- **Contact**: Location, phone number
- **Interests**: Areas of interest and expertise
- **Metadata**: Profile completion status and timestamps

For detailed schema information, see [USER_MODEL.md](USER_MODEL.md)

## 🔗 Connection Management

The connection system supports:

- **Incoming Requests**: Requests from other users
- **Outgoing Requests**: Requests you've sent to other users
- **Established Connections**: Users you're already connected with

For detailed implementation, see [CONNECTIONS_IMPLEMENTATION.md](CONNECTIONS_IMPLEMENTATION.md)

## 🎨 Styling

The application uses **Tailwind CSS v4** for styling with:
- Responsive design
- Color-coded UI components (blue for primary, green for success, red for danger)
- Smooth transitions and hover effects
- Mobile-first approach

## 🔐 Security

- Passwords are hashed on the backend
- Authentication tokens for session management
- Secure API endpoints with authentication headers
- Protected routes that require user authentication

## 🚦 Getting Started

1. **Sign up** with your email and create an account
2. **Complete onboarding** - Add your skills, bio, experience, and contact info
3. **Explore profiles** - Browse and discover other students
4. **Send connections** - Connect with people you'd like to network with
5. **Manage requests** - Accept or reject incoming connection requests
6. **Stay updated** - Check your feed for network updates

## 📱 Responsive Design

DevSphere is fully responsive and works seamlessly across:
- Desktop browsers
- Tablets
- Mobile devices

## 🤝 Contributing

1. Create a new branch for your feature
2. Commit your changes with descriptive messages
3. Push to the branch
4. Submit a pull request

## 📄 License

This project is part of the DevSphere initiative.

## 🆘 Support

For issues, questions, or suggestions, please create an issue in the repository.

---

**Built with ❤️ to connect developer communities**
