import { json } from '@sveltejs/kit';
import { addMovie, deleteMovie, updateMovie } from '$lib/server/queries';
import type { RequestHandler } from '../../../../../.svelte-kit/types/src/routes';

function sanitizeMovieData(data: any) {
    return {
        ...data,
        runtime: isNaN(Number(data.runtime)) ? 0 : Number(data.runtime),
        num_mflix_comments: isNaN(Number(data.num_mflix_comments)) ? 0 : Number(data.num_mflix_comments),
        released: isNaN(new Date(data.released).getTime()) ? new Date() : new Date(data.released), // Default to current date
        awards: {
            wins: isNaN(Number(data.awards?.wins)) ? 0 : Number(data.awards?.wins),
            nominations: isNaN(Number(data.awards?.nominations)) ? 0 : Number(data.awards?.nominations),
            text: data.awards?.text || "No awards information",
        },
        year: isNaN(Number(data.year)) ? 0 : Number(data.year),
        imdb: {
            rating: isNaN(Number(data.imdb?.rating)) ? 0 : Number(data.imdb?.rating),
            votes: isNaN(Number(data.imdb?.votes)) ? 0 : Number(data.imdb?.votes),
            id: isNaN(Number(data.imdb?.id)) ? 0 : Number(data.imdb?.id),
        },
        tomatoes: {
            viewer: {
                rating: isNaN(Number(data.tomatoes?.viewer?.rating)) ? 0 : Number(data.tomatoes?.viewer?.rating),
                numReviews: isNaN(Number(data.tomatoes?.viewer?.numReviews)) ? 0 : Number(data.tomatoes?.viewer?.numReviews),
                meter: isNaN(Number(data.tomatoes?.viewer?.meter)) ? 0 : Number(data.tomatoes?.viewer?.meter),
            },
            lastUpdated: isNaN(new Date(data.tomatoes?.lastUpdated).getTime()) ? new Date() : new Date(data.tomatoes?.lastUpdated), // Default to current date
        },
    };
}

// DELETE /api/movies/:id - Delete a movie by ID
export const DELETE: RequestHandler = async ({ params }) => {
    try {
        const { id } = params;
        await deleteMovie(id);
        return json({ success: true });
    } catch (error) {
        return json({ success: false, error: error.message }, { status: 500 });
    }
};

// PUT /api/movies/:id - Update a movie by ID
export const PUT: RequestHandler = async ({ params, request }) => {
    try {
        const { id } = params;
        const updatedData = await request.json();
        const sanitizedData = sanitizeMovieData(updatedData);
        await updateMovie(id, sanitizedData);
        return json({ success: true });
    } catch (error: unknown) {
        return json({ success: false, error: (error as Error).message }, { status: 500 });
    }
};