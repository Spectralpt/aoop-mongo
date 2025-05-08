import mongoose from "mongoose";
import {MongoDB_uri} from "$env/static/private";

mongoose.connect(MongoDB_uri)
    .then(() => console.log('Connected to Mongo Cluster'))
    .catch(err => console.error('Failed to connect to mongo cluster'))

const movieSchema = new mongoose.Schema({
  plot: { type: String, required: true },
  genres: { type: [String], required: true },
  runtime: { type: Number, required: true },
  cast: { type: [String], required: true },
  num_mflix_comments: { type: Number, default: 0 },
  poster: { type: String, required: true },
  title: { type: String, required: true },
  fullplot: { type: String, required: true },
  languages: { type: [String], required: true },
  released: { type: Date, required: true },
  directors: { type: [String], required: true },
  writers: { type: [String], required: true },
  awards: {
    wins: { type: Number, default: 0 },
    nominations: { type: Number, default: 0 },
    text: { type: String, required: true },
  },
  lastupdated: { type: String, required: true },
  year: { type: Number, required: true },
  imdb: {
    rating: { type: Number, required: true },
    votes: { type: Number, required: true },
    id: { type: Number, required: true },
  },
  countries: { type: [String], required: true },
  type: { type: String, required: true },
  tomatoes: {
    viewer: {
      rating: { type: Number, required: true },
      numReviews: { type: Number, required: true },
      meter: { type: Number, required: true },
    },
    lastUpdated: { type: Date, required: true },
  },
});

const Movie = mongoose.model("Movie", movieSchema, 'movies')

const theaterSchema = new mongoose.Schema({
  theaterId: { type: Number, required: true },
  location: {
    address: {
      street1: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipcode: { type: String, required: true },
    },
    geo: {
      type: { type: String, enum: ["Point"], required: true },
      coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },
  },
});

const Theater = mongoose.model("Theater", theaterSchema);

export { Movie, Theater};
