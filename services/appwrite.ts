import { Client, Databases, ID, Query, Account } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const SAVED_MOVIES_COLLECTION_ID = "saved_movies";

const client = new Client()
  .setEndpoint("https://sgp.cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform("com.moviediscovery.app");

const database = new Databases(client);
const account = new Account(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        title: movie.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(100),
      Query.orderDesc("count"),
    ]);

    // Group by movie_id and sum counts to avoid duplicate movies
    const movieMap = new Map<number, TrendingMovie>();
    
    for (const doc of result.documents) {
      const movie = doc as unknown as TrendingMovie;
      const existingMovie = movieMap.get(movie.movie_id);
      
      if (existingMovie) {
        // Add count to existing movie
        existingMovie.count += movie.count;
      } else {
        // Add new movie
        movieMap.set(movie.movie_id, { ...movie });
      }
    }

    // Convert to array, sort by count, and take top 5
    const uniqueMovies = Array.from(movieMap.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return uniqueMovies;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

// Authentication functions
export const signup = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const user = await account.create(ID.unique(), email, password, name);
    // Auto login after signup
    await login(email, password);
    return user;
  } catch (error: any) {
    console.error("Signup error:", error);
    throw new Error(error.message || "Failed to create account");
  }
};

export const login = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    console.error("Login error:", error);
    throw new Error(error.message || "Invalid credentials");
  }
};

export const logout = async () => {
  try {
    await account.deleteSession("current");
  } catch (error: any) {
    console.error("Logout error:", error);
    throw new Error(error.message || "Failed to logout");
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    return null;
  }
};

// Saved Movies functions
export const saveMovie = async (userId: string, movie: any) => {
  try {
    // Check if movie is already saved
    const existing = await database.listDocuments(DATABASE_ID, SAVED_MOVIES_COLLECTION_ID, [
      Query.equal("user_id", userId),
      Query.equal("movie_id", movie.id.toString()),
    ]);

    if (existing.documents.length > 0) {
      return existing.documents[0];
    }

    const savedMovie = await database.createDocument(
      DATABASE_ID,
      SAVED_MOVIES_COLLECTION_ID,
      ID.unique(),
      {
        user_id: userId,
        movie_id: movie.id.toString(),
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date || "",
        vote_average: movie.vote_average || 0,
        saved_at: new Date().toISOString(),
      }
    );
    return savedMovie;
  } catch (error: any) {
    console.error("Error saving movie:", error);
    throw new Error(error.message || "Failed to save movie");
  }
};

export const unsaveMovie = async (userId: string, movieId: string) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, SAVED_MOVIES_COLLECTION_ID, [
      Query.equal("user_id", userId),
      Query.equal("movie_id", movieId),
    ]);

    if (result.documents.length > 0) {
      await database.deleteDocument(
        DATABASE_ID,
        SAVED_MOVIES_COLLECTION_ID,
        result.documents[0].$id
      );
    }
  } catch (error: any) {
    console.error("Error unsaving movie:", error);
    throw new Error(error.message || "Failed to unsave movie");
  }
};

export const getSavedMovies = async (userId: string) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, SAVED_MOVIES_COLLECTION_ID, [
      Query.equal("user_id", userId),
      Query.orderDesc("saved_at"),
    ]);
    return result.documents;
  } catch (error: any) {
    console.error("Error getting saved movies:", error);
    return [];
  }
};

export const isMovieSaved = async (userId: string, movieId: string) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, SAVED_MOVIES_COLLECTION_ID, [
      Query.equal("user_id", userId),
      Query.equal("movie_id", movieId),
    ]);
    return result.documents.length > 0;
  } catch (error) {
    return false;
  }
};
