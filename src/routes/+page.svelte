<script lang="ts">
    let {data} = $props();

    console.log(data)

</script>

<div class="bg-gray-800 w-screen min-h-screen p-4">
    {#if data.moviesByGenres && Object.keys(data.moviesByGenres).length > 0}
        {#each Object.entries(data.moviesByGenres) as [genre, movies]}
            <h2 class="text-2xl font-bold text-white mt-8 mb-4">{genre}</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {#each movies as movie}
                    <div class="bg-gray-900 text-white rounded-lg shadow-md p-4">
                        <img
                                src={movie.poster || 'https://via.placeholder.com/150'}
                                alt={movie.title}
                                class="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h3 class="text-lg font-semibold">{movie.title}</h3>
                        <p class="text-sm text-gray-400">{movie.plot || 'No description available.'}</p>
                        <p class="text-sm mt-2"><strong>Year:</strong> {movie.year}</p>
                        <p class="text-sm"><strong>Rating:</strong> {movie.imdb?.rating || 'N/A'}</p>
                    </div>
                {/each}
            </div>
        {/each}
    {:else}
        <p class="text-white">No movies found.</p>
    {/if}
</div>