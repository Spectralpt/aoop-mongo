<script lang="ts">
    let showForm = false; // Controls the visibility of the form
    let title = '';
    let year: number | null = null;
    let plot = '';
    let fullplot = '';
    let rating: number | null = null;
    let type = 'movie';
    let lastupdated = new Date().toISOString();
    let poster = '';
    let errorMessage = '';
    let successMessage = '';

    async function addMovie() {
        try {
            const response = await fetch('/api/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    year,
                    plot,
                    fullplot,
                    imdb: { rating },
                    type,
                    lastupdated,
                    poster,
                }),
            });

            if (response.ok) {
                successMessage = 'Movie added successfully!';
                errorMessage = '';
                title = '';
                year = null;
                plot = '';
                fullplot = '';
                rating = null;
                type = 'movie';
                lastupdated = new Date().toISOString();
                poster = '';
            } else {
                const error = await response.json();
                errorMessage = error.error || 'Failed to add movie.';
                successMessage = '';
            }
        } catch (error) {
            errorMessage = 'An error occurred while adding the movie.';
            successMessage = '';
        }
    }
</script>

<div class="bg-gray-800 w-screen p-4 text-white">
    <button
        on:click={() => (showForm = !showForm)}
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
    >
        {#if showForm} Close Add Movie Form {/if}
        {#if !showForm} Open Add Movie Form {/if}
    </button>

    {#if showForm}
        <div>
            <h1 class="text-4xl font-bold mb-4">Add a Movie</h1>
            <p class="text-green-500 mb-4">{successMessage}</p>
            <p class="text-red-500 mb-4">{errorMessage}</p>
            <form on:submit|preventDefault={addMovie} class="space-y-4">
                <div>
                    <label for="title" class="block text-sm font-medium">Title</label>
                    <input
                        id="title"
                        type="text"
                        bind:value={title}
                        class="w-full p-2 rounded bg-gray-700 text-white"
                        required
                    />
                </div>
                <div>
                    <label for="year" class="block text-sm font-medium">Year</label>
                    <input
                        id="year"
                        type="number"
                        bind:value={year}
                        class="w-full p-2 rounded bg-gray-700 text-white"
                        required
                    />
                </div>
                <div>
                    <label for="plot" class="block text-sm font-medium">Plot</label>
                    <textarea
                        id="plot"
                        bind:value={plot}
                        class="w-full p-2 rounded bg-gray-700 text-white"
                        rows="4"
                    ></textarea>
                </div>
                <div>
                    <label for="fullplot" class="block text-sm font-medium">Full Plot</label>
                    <textarea
                        id="fullplot"
                        bind:value={fullplot}
                        class="w-full p-2 rounded bg-gray-700 text-white"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <div>
                    <label for="rating" class="block text-sm font-medium">IMDB Rating</label>
                    <input
                        id="rating"
                        type="number"
                        step="0.1"
                        bind:value={rating}
                        class="w-full p-2 rounded bg-gray-700 text-white"
                    />
                </div>
                <div>
                    <label for="poster" class="block text-sm font-medium">Poster URL</label>
                    <input
                        id="poster"
                        type="url"
                        bind:value={poster}
                        class="w-full p-2 rounded bg-gray-700 text-white"
                        required
                    />
                </div>
                <button
                    type="submit"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Add Movie
                </button>
            </form>
        </div>
    {/if}
</div>