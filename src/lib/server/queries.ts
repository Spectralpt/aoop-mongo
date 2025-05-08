import { Movie, Theater } from "$lib/server/mongodb";

// Define types for movie and theater data
export interface MovieData {
  plot: string;
  genres: string[];
  runtime: number;
  cast: string[];
  num_mflix_comments?: number;
  poster: string;
  title: string;
  fullplot: string;
  languages: string[];
  released: Date;
  directors: string[];
  writers: string[];
  awards: {
    wins: number;
    nominations: number;
    text: string;
  };
  lastupdated: string;
  year: number;
  imdb: {
    rating: number;
    votes: number;
    id: number;
  };
  countries: string[];
  type: string;
  tomatoes: {
    viewer: {
      rating: number;
      numReviews: number;
      meter: number;
    };
    lastUpdated: Date;
  };
}

interface Address {
  street1: string;
  city: string;
  state: string;
  zipcode: string;
}

interface TheaterData {
  theaterId: number;
  location: {
    address: Address;
    geo: {
      type: "Point";
      coordinates: [number, number];
    };
  };
}

// Add a new movie
export async function addMovie(movieData: MovieData): Promise<typeof Movie> {
  const newMovie = new Movie(movieData);
  return await newMovie.save();
}

// Fetch all theaters
export async function getTheaters(): Promise<typeof Theater[]> {
  return await Theater.find();
}

// Update a movie by ID
export async function updateMovie(movieId: string, updatedData: Partial<MovieData>): Promise<void> {
  await Movie.updateOne(
      { _id: movieId }, // Filter by movie ID
      { $set: updatedData } // Update with the provided data
  );
}

// Update a theater's address
export async function updateTheater(
  theaterId: number,
  newAddress: Address
): Promise<void> {
  await Theater.updateOne(
    { theaterId },
    { $set: { "location.address": newAddress } }
  );
}

// Delete a movie by ID
export async function deleteMovie(movieId: string): Promise<void> {
  await Movie.deleteOne({ _id: movieId });
}

// Get movies grouped by genres
export async function getMoviesByGenres(): Promise<Record<string, MovieData[]>> {
  const results = await Movie.aggregate([
    { $unwind: "$genres" }, // Unwind the genres array to group by individual genres
    { $group: { _id: "$genres", movies: { $push: "$$ROOT" } } }, // Group by genre and collect movies
    { $project: { genre: "$_id", movies: { $slice: ["$movies", 10] }, _id: 0 } } // Limit to 10 movies per genre
  ]);

  // Convert the result into a more usable format (key-value pairs)
  const moviesByGenres: Record<string, MovieData[]> = {};
  results.forEach((group) => {
    moviesByGenres[group.genre] = group.movies;
  });

  return structuredClone(moviesByGenres);
}