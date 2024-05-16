<script lang="ts">
	import Record from './Record.svelte';
	import AddRecord from './AddRecord.svelte';
	import { slide } from 'svelte/transition';

	export let user: any;
	let addRecord = false;

	export let records: any[] = [];
	export let manual = false;
</script>

<div class="wrapper">
	{#if manual}
		<button on:click={() => (addRecord = !addRecord)}>+</button>
	{/if}

	{#if addRecord}
		<div class="add-record" transition:slide>
			<AddRecord bind:visible={addRecord} {user} />
		</div>
	{/if}

	{#each records as record}
		<Record bind:manual {record} no_alternative={user.no_alternative} />
	{/each}
</div>

<style lang="postcss">
	button {
		@apply self-center m-auto border-dashed border-2 border-gray-400 w-16 h-16 rounded-lg  hover:shadow-xl text-5xl font-bold transition-all;
	}
	.wrapper {
		@apply xl:grid-cols-4  sm:grid-cols-2 grid grid-cols-1 justify-items-center transition-all;
	}
	.add-record {
		@apply fixed bg-gray-400 bg-opacity-50 z-10 w-full h-full top-0 left-0 flex justify-center items-center;
	}
</style>
