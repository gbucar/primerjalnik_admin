<script lang="ts">
	import { supabase } from '$lib/db';
	import { onMount } from 'svelte';
	import type { User } from '@supabase/supabase-js';

	export let user: User | undefined;

	let profile: any = {};

	let atmotube_id = '';
	let noisecapture_id = '';
	let height = '';
	let weight = '';
	let age = '';
	let sex = '';

	const createProfile = async () => {
		const { data } = await supabase
			.from('urbanome_users')
			.select('atmotube_id')
			.eq('email', user?.email)
			.single();
		const { error } = await supabase.from('profiles').insert({ ...data, id: user?.id });
		if (data?.atmotube_id) ({ atmotube_id } = data);
		if (error) alert('Napaka pri ustvarjanju profila');
	};

	onMount(async () => {
		const { data, error } = await supabase.from('profiles').select('*').eq('id', user?.id);

		if (error || !data) return;
		if (data.length === 0) return createProfile();
		profile = data[0];

		if (profile) ({ atmotube_id, noisecapture_id, height, weight, age, sex } = profile);
	});

	const submitData = async (e: any) => {
		if (!confirm('Ali ste prepričani, da želite zamenjati podatke?'))
			return ({ atmotube_id, noisecapture_id, height, weight, age, sex } = profile);

		const { error } = await supabase
			.from('profiles')
			.update({
				// atmotube_id,
				noisecapture_id,
				height,
				weight,
				age,
				sex
			})
			.eq('id', user?.id);

		if (error) {
			alert('Napaka pri shranjevanju podatkov');
			return ({ atmotube_id, noisecapture_id, height, weight, age, sex } = profile);
		}
	};
</script>

<form on:submit={submitData} class="">
	<h1 class="text-2xl font-bold">Profil</h1>
	<h2>Podatki o napravi</h2>
	<label>
		<div class="">atmotube mac</div>
		<input disabled class="" type="text" bind:value={atmotube_id} placeholder="Atmotube id" />
	</label>
	<div>
		<label>
			<div class="">noise capture id</div>
			<input class="" type="text" bind:value={noisecapture_id} placeholder="Noisecapture id" />
		</label>
	</div>

	<h2>Tvoji Podatki</h2>
	<label>
		<div class="">Višina (cm)</div>
		<input class="" type="number" step="0.01" bind:value={height} placeholder="metr pa čevap" />
	</label>
	<label>
		<div class="">Teža (kg)</div>
		<input type="number" step="0.01" bind:value={weight} placeholder="tri palčke pa čevap" />
	</label>
	<label class="">
		<div class="">Starost</div>
		<input class="" type="number" bind:value={age} placeholder="let pa čevap" />
	</label>
	<label class="">
		<div class="">Spol</div>
		<select name="spol" bind:value={sex}>
			<option value="M">Moški</option>
			<option value="F">Ženska</option>
		</select>
	</label>

	<div class="flex">
		<button type="submit" class="bg-amber-400 ml-auto text-amber-950">Shrani</button>
	</div>
</form>

<style lang="postcss">
	form {
		@apply flex flex-col gap-4 max-w-md min-w-fit sm:m-auto sm:mt-5 m-5  p-4 rounded-lg text-stone-900 shadow-xl bg-stone-50;
	}

	h2 {
		@apply text-xl font-semibold;
	}

	label {
		@apply flex flex-row gap-2 justify-between items-center;
	}

	input {
		@apply w-full text-right;
	}
</style>
