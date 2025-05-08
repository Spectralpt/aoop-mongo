import { getMoviesByGenres } from "$lib/server/queries";

export const load = async () => {
    const moviesByGenres = await getMoviesByGenres();
    return{
        moviesByGenres
    }
};