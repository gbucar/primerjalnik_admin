<script lang="ts">
	import type { SupabaseClient, User } from '@supabase/supabase-js';
	import { userStore } from './stores';
	import { supabase } from './db';
	import Loader from './Loader.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { slide } from 'svelte/transition';

	export let loading = false;
	let showNav = true;

	interface $$Slots {
		default: { user: User; supabase: SupabaseClient };
		signedOut: {};
	}
	const user = userStore(undefined);
	let lst = 0;
	const handleScroll = (e: any) => {
		const st = window.pageYOffset || document.documentElement.scrollTop;
		if (st > lst) {
			showNav = false;
		} else {
			showNav = true;
		}
		lst = st <= 0 ? 0 : st;
	};

	onMount(() => {
		if (browser) {
			document.addEventListener('scroll', handleScroll);
		}
	});

	onDestroy(() => {
		if (browser) {
			document.removeEventListener('scroll', handleScroll);
		}
	});
</script>

<Loader {loading} />
{#if $user}
	{#if showNav}
		<nav transition:slide|local>
			<button
				on:click={async () => {
					loading = true;
					await supabase.auth.signOut();
					loading = false;
				}}
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
					<path
						d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
					/>
				</svg>
			</button>
			<a href="/">Profil</a>
			<a href="/records">Zgodovina</a>
		</nav>
	{/if}
	<div class="pt-20">
		<slot user={$user} {supabase} />
	</div>
{:else}
	<slot name="signedOut" />
{/if}

<style lang="postcss">
	nav {
		@apply flex items-center gap-3 text-lg bg-stone-50 p-2 shadow-md fixed top-0 left-0 w-full z-10 transition-all;
	}
	a {
		@apply bg-stone-200 m-1 py-1 px-2 rounded-md transition-all  hover:shadow-xl;
	}
	button {
		@apply bg-red-600  fill-amber-50 w-10 h-10 m-1 py-1 px-2 rotate-180 rounded-md  hover:shadow-xl  hover:p-1 transition-all;
	}
</style>
