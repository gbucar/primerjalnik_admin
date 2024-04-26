<script lang="ts">
	import { slide } from 'svelte/transition';

	export let title = '...';
	export let body = '...';
</script>

<div
	class="fixed top-5 right-5 max-w-80 z-50 rounded-xl px-3 py-2 shadow-xl bg-green-600 sm:m-0 mx-2 text-white"
	transition:slide
>
	<h3 class="font-bold">{title}</h3>
	<p>{body}</p>
</div>
