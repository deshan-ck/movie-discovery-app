# Movie Discovery App : CINEMA+

A modern React Native mobile application for discovering and exploring movies, built with Expo and TypeScript. This app provides real-time movie data, intelligent search functionality, and a popularity tracking system.

## Overview

This mobile application allows users to browse, search, and discover movies with an intuitive interface. The app features a popularity algorithm that tracks user searches to surface trending content and provides detailed movie information including ratings, release dates, and comprehensive overviews.

## Key Features

- **Real-time Movie Data**: Integration with TMDB API for up-to-date movie information
- **Smart Search**: Advanced search functionality with autocomplete and suggestions
- **Popularity Tracking**: Custom algorithm using Appwrite to track and display trending movies based on user searches
- **Movie Details**: Comprehensive information including cast, ratings, runtime, and plot summaries
- **Save Favorites**: Bookmark and save your favorite movies for quick access
- **Responsive Design**: Optimized UI for various screen sizes using NativeWind/Tailwind CSS
- **Cross-platform**: Runs on both iOS and Android devices

## Tech Stack

- **Frontend Framework**: React Native with Expo
- **Language**: TypeScript
- **Styling**: Tailwind CSS via NativeWind
- **Backend**: Appwrite (Database & Authentication)
- **API**: TMDB (The Movie Database)
- **Navigation**: Expo Router
- **State Management**: React Hooks

## Core Functionality

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

## Configuration Files

- **tailwind.config.js**: Tailwind CSS customization and theme
- **tsconfig.json**: TypeScript compiler options
- **app.json**: Expo configuration
- **babel.config.js**: Babel transpiler configuration


## Academic Project Note

This project was developed as part of my academic coursework to demonstrate:
- Mobile app development with React Native
- Integration with external APIs and backend services
- Implementation of custom algorithms (popularity tracking)
- Modern UI/UX design principles
- TypeScript and type-safe development practices


## Acknowledgments

- TMDB for providing the movie database API
- Appwrite for backend services
- Expo team for the amazing development framework

---

**Developed by**: deshan-ck  
**Academic Institution**: University of Moratuwa
**Course**: Information technology and management
**Year**: 2025
