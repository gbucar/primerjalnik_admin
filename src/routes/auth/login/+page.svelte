<script lang="ts">
	import { browser } from '$app/environment';
	import { slide } from 'svelte/transition';

	export let form: any;
	export let data: any;

	// TODO: make some sort of alert system
	if (data.passwordChangeSuccess && browser) alert('Uspešna sprememba gesla!');
	else if (data.passwordChangeSuccess == false && browser) alert('Sprememba gesla neuspešna!');

	$: if (browser && form?.error) alert(form.error);
</script>

<form action="?/signIn" method="POST">
	<h1 class="font-bold text-lg">Prijava</h1>
	{#if form?.notVerified}
		<div class="text-red-700" transition:slide|local>Potrdite svoj e-mail naslov</div>
	{/if}
	<label for="username">
		<input required name="username" type="text" placeholder="Uporabniško ime" />
	</label>

	<label for="password">
		<input required name="password" type="password" placeholder="Geslo" />
	</label>

	<div>
		<!-- <a class="bg-amber-200 text-amber-100" href="/auth/register"> Registracija </a> -->
		<button class="bg-amber-600 text-amber-50" type="submit"> Prijava </button>
	</div>
</form>

<style lang="postcss">
	form {
		@apply flex flex-col gap-1 m-auto bg-stone-50 mt-10 p-5 rounded-lg shadow-lg w-min;
	}
	input {
		@apply !ml-0;
	}
	a {
		@apply m-1 py-1 px-2 rounded-md transition-all  hover:shadow-xl
        focus:outline-0  focus:shadow-lg focus:ring-amber-600 focus:ring-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none
        font-normal;
	}
</style>
