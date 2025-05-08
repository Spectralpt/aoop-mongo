<script lang="ts">
    let { data } = $props();

    console.log(data);
</script>

<div class="bg-gray-800 w-screen min-h-screen p-4">
    {#if data.theaters && data.theaters.length > 0}
        <h1 class="text-3xl font-bold text-white mb-6">Theaters</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {#each data.theaters as theater}
                <div class="bg-gray-900 text-white rounded-lg shadow-md p-4">
                    <h2 class="text-xl font-semibold">{theater.location.address.city || 'Unknown Name'}</h2>
                    <p class="text-sm text-gray-400">{theater.location.address.street1 || 'Location not available'}</p>
                </div>
            {/each}
        </div>
    {:else}
        <p class="text-white">No theaters found.</p>
    {/if}
</div>