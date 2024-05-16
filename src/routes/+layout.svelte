<script lang="ts">
	import { enhance } from '$app/forms';
	import { clickOutside } from '$lib/utils';
	import '../app.css';
	import type user from 'pocketbase';
	export let data: { user: user };
	let showProfileDetails = false;
</script>

{#if data?.user}
	<nav class="flex flex-row justify-between transition:slide|local">
		<div class="flex flex-row">
			<a class="nav-link font-bold" href="/records">Participants</a>
			<a class="nav-link" href="/records/comparison">Results</a>
			<a class="nav-link" href="/records/atmo">AQ_raw</a>
			<a class="nav-link" href="/records/noisecapture">Noise_raw</a>
			<!-- <a class="nav-link" href="/records/fitbit">FitBit</a> -->
		</div>

		<button
			class="w-10 rounded-full p-0"
			on:click={(e) => {
				showProfileDetails = !showProfileDetails;
			}}
		>
			<img
				class="rounded-full transition-all"
				src="https://ui-avatars.com/api/?name={data.user.email.split(
					'@'
				)[0]}&bold=true&background=dc2626&color=ffffff"
				alt=""
			/>
		</button>
	</nav>
{/if}
{#if showProfileDetails}
	<div
		use:clickOutside
		on:clickOutside={(e) => {
			showProfileDetails = !showProfileDetails;
		}}
		class="flex flex-col fixed bg-white rounded-3xl shadow-xl top-20 right-5 w-72 h-80 z-10"
	>
		<div class="w-full flex flex-row-reverse mb-0">
			<button
				class="rounded-full mt-3 mr-3"
				on:click={() => (showProfileDetails = !showProfileDetails)}
			>
				<svg class="w-7 h-7 fill-gray-900" viewBox="0 -0.5 21 21">
					<g stroke="none" stroke-width="1">
						<g transform="translate(-419.000000, -240.000000)">
							<g transform="translate(56.000000, 160.000000)">
								<polygon
									points="375.0183 90 384 98.554 382.48065 100 373.5 91.446 364.5183 100 363 98.554 371.98065 90 363 81.446 364.5183 80 373.5 88.554 382.48065 80 384 81.446"
								/>
							</g>
						</g>
					</g>
				</svg>
			</button>
		</div>
		<a href="/" class="w-full flex flex-col">
			<img
				class="h-28 w-28 mt-0 m-auto rounded-full transition-all"
				src="https://ui-avatars.com/api/?name={data.user
					.email}&bold=true&background=eab308&color=ffffff&size=512"
				alt=""
			/>
			<p class="font-bold m-auto">{data.user.email}</p>
		</a>

		<form action="/auth/logout" method="POST" class="m-auto">
			<button class="m-auto flex flex-row gap-2" type="submit">
				<svg
					class="w-7 fill-black rotate-180"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
				>
					<path
						d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
					/>
				</svg>
				<p class="font-bold">Sign out</p>
			</button>
		</form>
	</div>
{/if}

<div class="pt-20 min-h-screen">
	<slot />
</div>

<footer class="flex flex-row w-full p-8 justify-center gap-8">
	<div class="bg-white p-3 rounded-xl">
		<img src="/IJS_logo.jpg" class="w-28" alt="ijs logo" />
		<img src="/urbanome_logo.png" class="w-28" alt="urbanome logo" />
		<img src="/European_Commission.png" class="w-28" alt="europen commission logo" />
	</div>

	<div class="bg-white p-3 rounded-xl">
		<small class="font-extrabold">Kontakt</small>
		<ul>
			<li>
				<small>
					Tehnične težave: <b>
						<a href="https://m.youtube.com/watch?v=dQw4w9WgXcQ">znađi se</a>
					</b>
				</small>
			</li>
		</ul>
	</div>
</footer>

<style lang="postcss">
	nav {
		@apply flex items-center gap-3 text-lg bg-stone-50 p-2 shadow-md fixed top-0 left-0 w-full z-10 transition-all overflow-x-scroll;
	}
	.nav-link {
		@apply bg-stone-200 m-1 py-1 px-2 rounded-md transition-all  hover:shadow-xl;
	}
	:global(body) {
		@apply bg-stone-100;
	}
</style>
