<script lang="ts">
	import '../app.css';

    let { children } = $props();

</script>

<div>
    <div class="bg-gray-900 text-white px-4 py-2 flex items-center justify-between">
        <!-- Navigation Links -->
        <div class="flex items-center space-x-4">
            <a href="/" class="text-lg font-semibold hover:text-gray-300">Home</a>
            <a href="/theaters" class="text-lg font-semibold hover:text-gray-300">Theaters</a>
        </div>
    </div>
    {@render children()}
</div>
