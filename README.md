# Movie Discovery App

A modern React Native mobile application for discovering and exploring movies, built with Expo and TypeScript. This app provides real-time movie data, intelligent search functionality, and a popularity tracking system.

## 📱 Overview

This mobile application allows users to browse, search, and discover movies with an intuitive interface. The app features a popularity algorithm that tracks user searches to surface trending content and provides detailed movie information including ratings, release dates, and comprehensive overviews.

## ✨ Key Features

- **Real-time Movie Data**: Integration with TMDB API for up-to-date movie information
- **Smart Search**: Advanced search functionality with autocomplete and suggestions
- **Popularity Tracking**: Custom algorithm using Appwrite to track and display trending movies based on user searches
- **Movie Details**: Comprehensive information including cast, ratings, runtime, and plot summaries
- **Save Favorites**: Bookmark and save your favorite movies for quick access
- **Responsive Design**: Optimized UI for various screen sizes using NativeWind/Tailwind CSS
- **Cross-platform**: Runs on both iOS and Android devices

## 🛠️ Tech Stack

- **Frontend Framework**: React Native with Expo
- **Language**: TypeScript
- **Styling**: Tailwind CSS via NativeWind
- **Backend**: Appwrite (Database & Authentication)
- **API**: TMDB (The Movie Database)
- **Navigation**: Expo Router
- **State Management**: React Hooks

## 📋 Prerequisites

Before running this project, make sure you have:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- [Expo Go](https://expo.dev/client) app on your mobile device (for testing)

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd movie-discovery-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   
   Create a `.env` file in the root directory:
   ```env
   EXPO_PUBLIC_MOVIE_API_KEY=your_tmdb_api_key
   EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
   EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_appwrite_database_id
   EXPO_PUBLIC_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
   ```

4. **Get API Credentials**
   - **TMDB API**: Sign up at [themoviedb.org](https://www.themoviedb.org/) and generate an API key
   - **Appwrite**: Create a project at [appwrite.io](https://appwrite.io/) and set up a database with the following collection structure:
     - Collection Name: `movie_searches`
     - Attributes:
       - `searchTerm` (String)
       - `movie_id` (Integer)
       - `title` (String)
       - `count` (Integer)
       - `poster_url` (String)

5. **Run the application**
   ```bash
   npx expo start
   ```
   
   Then scan the QR code with Expo Go (Android) or Camera app (iOS)

## 📂 Project Structure

```
├── app/                    # Main application screens
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Home screen
│   │   ├── search.tsx     # Search screen
│   │   ├── save.tsx       # Saved movies screen
│   │   └── profile.tsx    # User profile screen
│   ├── movie/             # Movie details screen
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
├── services/              # API and backend services
├── constants/             # Static data and configurations
├── interfaces/            # TypeScript type definitions
└── assets/                # Images, fonts, and icons
```

## 🎯 Core Functionality

### Home Screen
- Displays featured movies
- Shows trending movies based on search popularity
- Quick access to movie categories

### Search Feature
- Real-time search with debouncing
- Results display with movie posters and ratings
- Search history tracking for popularity algorithm

### Movie Details
- Comprehensive movie information
- Cast and crew details
- User ratings and reviews
- Related movies suggestions

### Popularity Algorithm
- Tracks search queries in Appwrite database
- Increments counter for each search
- Displays top 5 most searched movies on home screen

## 🔧 Configuration Files

- **tailwind.config.js**: Tailwind CSS customization and theme
- **tsconfig.json**: TypeScript compiler options
- **app.json**: Expo configuration
- **babel.config.js**: Babel transpiler configuration

## 🎨 Customization

The app uses a custom color scheme defined in `tailwind.config.js`:
- Primary background: `#030014`
- Secondary background: `#151312`
- Accent colors: `#AB8BFF`, `#A8B5DB`

You can modify these colors to match your preferred theme.

## 📱 Screenshots

[Add your app screenshots here]

## 🐛 Troubleshooting

- **Metro bundler issues**: Try clearing cache with `npx expo start -c`
- **Environment variables not loading**: Restart the Expo development server
- **Appwrite connection issues**: Verify your project ID and endpoint URL
- **TMDB API errors**: Check your API key and request limits

## 📝 Academic Project Note

This project was developed as part of my academic coursework to demonstrate:
- Mobile app development with React Native
- Integration with external APIs and backend services
- Implementation of custom algorithms (popularity tracking)
- Modern UI/UX design principles
- TypeScript and type-safe development practices

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- TMDB for providing the movie database API
- Appwrite for backend services
- Expo team for the amazing development framework

---

**Developed by**: deshan-ck  
**Academic Institution**: University of Moratuwa
**Course**: Information technology and management
**Year**: 2025
