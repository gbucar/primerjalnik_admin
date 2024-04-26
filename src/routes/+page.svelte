<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import Notification from '$lib/Notification.svelte';

	export let data: { user: any; passwordChangeSent: any };
	let { atmotube_id, noisecapture_id, height, weight, age, sex, no_alternative } = data?.user;
	let notification: { title: string; body: string } | undefined;
	let fitbitConnected = !!data.user.fitbit_fully_connected;

	// if (data.passwordChangeSent && browser) alert('Poslano je bilo sporočilo za spremembo gesla');
</script>

<form
	method="POST"
	action="?/updateProfile"
	use:enhance={({ formElement, formData, action, cancel, submitter }) => {
		return async ({ result }) => {
			({ noisecapture_id, height, weight, age, sex, no_alternative } = result.data);
			if (result.data.error) return alert(result.data.error);
			notification = { title: 'Shranjeno', body: 'Podatki so bili uspešno shranjeni' };
			setTimeout(() => (notification = undefined), 1000);
		};
	}}
>
	{#if notification}
		<Notification title={notification.title} body={notification.body} />
	{/if}
	<h1 class="text-2xl font-bold">Profil</h1>
	<h2>Podatki o napravi</h2>
	<label>
		<div class="">atmotube mac</div>
		<input
			name="atmtoube_id"
			disabled
			class=""
			type="text"
			bind:value={atmotube_id}
			placeholder="Atmotube id"
		/>
	</label>
	<div>
		<label>
			<div class="">noise capture id</div>
			<input
				name="noisecapture_id"
				class=""
				type="text"
				bind:value={noisecapture_id}
				placeholder="Noisecapture id"
			/>
		</label>
	</div>
	<div>
		<div class="flex flex-row gap-2 justify-between items-center">
			<div class="">Povezava Fitbit aplikacije</div>
			<a href="/connect-fitbit">
				<svg
					class="w-15 h-10"
					version="1.1"
					id="Layer_1"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					x="0px"
					y="0px"
					viewBox="0 0 113.3 29.5"
					style="enable-background:new 0 0 113.3 29.5;"
					xml:space="preserve"
				>
					{#if fitbitConnected}
						<style type="text/css">
							.st0 {
								fill: #00b0b9;
							}
							.st1 {
								fill: #002a3a;
							}
						</style>
					{:else}
						<style type="text/css">
							.st0 {
								fill: #a8a8a8;
							}
							.st1 {
								fill: #3b3b3b;
							}
						</style>
					{/if}
					<g
						><g
							><g
								><path
									class="st0"
									d="M16.4,2.2c0,1.2-1,2.2-2.2,2.2S12,3.4,12,2.2S13,0,14.2,0S16.4,1,16.4,2.2z M14.2,6.2c-1.3,0-2.3,1-2.3,2.3     s1,2.3,2.3,2.3s2.3-1,2.3-2.3S15.5,6.2,14.2,6.2z M14.2,12.4c-1.3,0-2.4,1.1-2.4,2.4s1.1,2.4,2.4,2.4s2.4-1.1,2.4-2.4     S15.5,12.4,14.2,12.4z M14.2,18.7c-1.3,0-2.3,1-2.3,2.3c0,1.3,1,2.3,2.3,2.3s2.3-1,2.3-2.3C16.5,19.8,15.5,18.7,14.2,18.7z      M14.2,25.1c-1.2,0-2.2,1-2.2,2.2c0,1.2,1,2.2,2.2,2.2s2.2-1,2.2-2.2C16.4,26.1,15.4,25.1,14.2,25.1z M20.3,5.9     c-1.4,0-2.6,1.2-2.6,2.6s1.2,2.6,2.6,2.6s2.6-1.2,2.6-2.6S21.7,5.9,20.3,5.9z M20.3,12.1c-1.5,0-2.7,1.2-2.7,2.7     c0,1.5,1.2,2.7,2.7,2.7s2.7-1.2,2.7-2.7C23,13.3,21.8,12.1,20.3,12.1z M20.3,18.4c-1.4,0-2.6,1.2-2.6,2.6c0,1.4,1.2,2.6,2.6,2.6     s2.6-1.2,2.6-2.6C22.9,19.6,21.7,18.4,20.3,18.4z M26.6,11.8c-1.6,0-3,1.3-3,3c0,1.6,1.3,3,3,3s3-1.3,3-3     C29.5,13.1,28.2,11.8,26.6,11.8z M8,6.5c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S9.1,6.5,8,6.5z M8,12.7c-1.2,0-2.1,0.9-2.1,2.1     c0,1.2,0.9,2.1,2.1,2.1s2.1-0.9,2.1-2.1C10.1,13.6,9.2,12.7,8,12.7z M8,19c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2s2-0.9,2-2     C10,19.9,9.1,19,8,19z M1.8,13c-1,0-1.8,0.8-1.8,1.8s0.8,1.8,1.8,1.8s1.8-0.8,1.8-1.8S2.8,13,1.8,13z"
								/></g
							></g
						><g
							><g
								><path
									class="st1"
									d="M52.2,10.9c-0.2,0-0.4,0.2-0.4,0.4v15.7c0,0.2,0.2,0.4,0.4,0.4h1.9c0.2,0,0.4-0.2,0.4-0.4V11.3     c0-0.2-0.2-0.4-0.4-0.4H52.2z"
								/><g
									><g
										><path
											class="st1"
											d="M53.2,4.3c-1,0-1.8,0.8-1.8,1.8c0,1,0.8,1.8,1.8,1.8c1,0,1.8-0.8,1.8-1.8C55,5.1,54.2,4.3,53.2,4.3z"
										/></g
									></g
								><path
									class="st1"
									d="M92.5,10.9c-0.2,0-0.4,0.2-0.4,0.4v15.7c0,0.2,0.2,0.4,0.4,0.4h1.9c0.2,0,0.4-0.2,0.4-0.4V11.3     c0-0.2-0.2-0.4-0.4-0.4H92.5z"
								/><g
									><g
										><path
											class="st1"
											d="M93.4,4.3c-1,0-1.8,0.8-1.8,1.8c0,1,0.8,1.8,1.8,1.8c1,0,1.8-0.8,1.8-1.8C95.2,5.1,94.4,4.3,93.4,4.3z"
										/></g
									></g
								><path
									class="st1"
									d="M112.4,25.9c0.1-0.1,0.1-0.2,0.1-0.3v0c0-0.1,0-0.1,0-0.1c0,0,0-0.1-0.1-0.1c0,0-0.1-0.1-0.2-0.1     c-0.1,0-0.1,0-0.2,0h-0.5v1.4h0.2v-0.5h0.3h0l0.4,0.5h0.2l-0.5-0.6C112.3,26.1,112.4,26,112.4,25.9z M111.7,26v-0.5h0.4     c0.1,0,0.2,0,0.3,0.1c0.1,0,0.1,0.1,0.1,0.2v0c0,0.1,0,0.2-0.1,0.2c-0.1,0-0.2,0.1-0.3,0.1H111.7z"
								/><path
									class="st1"
									d="M112,24.7c-0.7,0-1.3,0.6-1.3,1.3c0,0.7,0.6,1.3,1.3,1.3s1.3-0.6,1.3-1.3C113.3,25.3,112.7,24.7,112,24.7z      M112,27.2c-0.7,0-1.2-0.5-1.2-1.2c0-0.7,0.5-1.2,1.2-1.2c0.7,0,1.2,0.5,1.2,1.2C113.2,26.7,112.6,27.2,112,27.2z"
								/><path
									class="st1"
									d="M67.8,13.5c0.2,0,0.4-0.2,0.4-0.4v-1.9c0-0.2-0.2-0.4-0.4-0.4h-4v-6c0-0.2-0.2-0.4-0.4-0.4h-1.9     c-0.2,0-0.4,0.2-0.4,0.4v6h-2c-0.2,0-0.4,0.2-0.4,0.4v1.9c0,0.2,0.2,0.4,0.4,0.4h2v9.1c0,2.8,1.9,4.6,4.6,4.6h2     c0.2,0,0.4-0.2,0.4-0.4v-1.9c0-0.2-0.2-0.4-0.4-0.4H66c-1.3,0-2.2-0.9-2.2-2.3v-8.8H67.8z"
								/><path
									class="st1"
									d="M107.6,13.5c0.2,0,0.4-0.2,0.4-0.4v-1.9c0-0.2-0.2-0.4-0.4-0.4h-4v-6c0-0.2-0.2-0.4-0.4-0.4h-1.9     c-0.2,0-0.4,0.2-0.4,0.4v6h-2c-0.2,0-0.4,0.2-0.4,0.4v1.9c0,0.2,0.2,0.4,0.4,0.4h2v9.1c0,2.8,1.9,4.6,4.6,4.6h2     c0.2,0,0.4-0.2,0.4-0.4v-1.9c0-0.2-0.2-0.4-0.4-0.4h-1.8c-1.3,0-2.2-0.9-2.2-2.3v-8.8H107.6z"
								/><path
									class="st1"
									d="M40.3,13.5v13.4c0,0.2,0.2,0.4,0.4,0.4h1.9c0.2,0,0.4-0.2,0.4-0.4V13.5h4.4c0.2,0,0.4-0.2,0.4-0.4v-1.9     c0-0.2-0.2-0.4-0.4-0.4H43V7.3c0-1.4,1-2.4,2.2-2.4h2.2c0.2,0,0.4-0.2,0.4-0.4V2.6c0-0.2-0.2-0.4-0.4-0.4h-2.1c-2.8,0-5,2.3-5,5     v3.6h-2c-0.2,0-0.4,0.2-0.4,0.4v1.9c0,0.2,0.2,0.4,0.4,0.4H40.3z"
								/></g
							><path
								class="st1"
								d="M86.1,12.8c-1.5-1.6-3.6-2.5-5.8-2.5c-2.1,0-4.2,0.9-5.5,2.2v-10c0-0.2-0.2-0.4-0.4-0.4h-1.9    c-0.2,0-0.4,0.2-0.4,0.4v16.5c0,6.1,4.1,8.8,8.1,8.8s8.1-2.7,8.1-8.8C88.4,16.6,87.6,14.4,86.1,12.8z M80.3,25.3    c-4,0-5.5-3.2-5.5-6.2c0-3.7,2.2-6.1,5.5-6.1s5.5,2.5,5.5,6.1C85.7,22.1,84.3,25.3,80.3,25.3z"
							/></g
						></g
					></svg
				>
			</a>
		</div>
	</div>

	<h2>Tvoji Podatki</h2>
	<label>
		<div class="">Višina (cm)</div>
		<input
			name="height"
			class=""
			type="number"
			step="0.01"
			min="50"
			max="400"
			bind:value={height}
			placeholder="metr pa čevap"
		/>
	</label>
	<label>
		<div class="">Teža (kg)</div>
		<input
			name="weight"
			type="number"
			step="0.01"
			min="5"
			max="300"
			bind:value={weight}
			placeholder="tri palčke pa čevap"
		/>
	</label>
	<label class="">
		<div class="">Starost</div>
		<input
			name="age"
			class=""
			type="number"
			step="1"
			min="0"
			max="120"
			bind:value={age}
			placeholder="let pa čevap"
		/>
	</label>
	<label class="">
		<div class="">Spol</div>
		<select name="sex" bind:value={sex}>
			<option value="M">Moški</option>
			<option value="F">Ženska</option>
		</select>
	</label>
	<h1 class="text-xl font-bold">Nastavitve</h1>
	<label>
		<div class="">Brez alternative</div>
		<input name="no_alternative" type="checkbox" bind:checked={no_alternative} />
	</label>

	<div class="flex">
		<button type="submit" class="bg-amber-400 ml-auto text-amber-950">Shrani</button>
	</div>
</form>

<!-- <form -->
<!-- 	action="?/uploadNoisecaptureFile" -->
<!-- 	method="post" -->
<!-- 	enctype="multipart/form-data" -->
<!-- 	use:enhance={() => { -->
<!-- 		return async (data) => { -->
<!-- 			if (data.result.type == 'success') { -->
<!-- 				files = undefined; -->
<!-- 				notification = { title: 'Shranjeno', body: 'Datoteka je bila uspešno naložena' }; -->
<!-- 				setTimeout(() => (notification = undefined), 1000); -->
<!-- 			} else { -->
<!-- 				alert('prišlo je do napake pri nalaganju datoteke'); -->
<!-- 			} -->
<!-- 		}; -->
<!-- 	}} -->
<!-- > -->
<!-- 	<input type="hidden" name="noisecapture_id" value={data.user.noisecapture_id} /> -->
<!-- 	<label -->
<!-- 		for="dropzone-file" -->
<!-- 		class="flex flex-col items-center justify-center w-full border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100" -->
<!-- 	> -->
<!-- 		<div class="flex flex-col items-center justify-center pt-5 pb-6 m-auto"> -->
<!-- 			{#if !files} -->
<!-- 				<svg -->
<!-- 					class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" -->
<!-- 					aria-hidden="true" -->
<!-- 					xmlns="http://www.w3.org/2000/svg" -->
<!-- 					fill="none" -->
<!-- 					viewBox="0 0 20 16" -->
<!-- 				> -->
<!-- 					<path -->
<!-- 						stroke="currentColor" -->
<!-- 						stroke-linecap="round" -->
<!-- 						stroke-linejoin="round" -->
<!-- 						stroke-width="2" -->
<!-- 						d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" -->
<!-- 					/> -->
<!-- 				</svg> -->
<!-- 				<p class="mb-2 text-sm text-gray-500 dark:text-gray-400"> -->
<!-- 					<span class="font-semibold">Klikni</span> ali povleci in spusti noisecapture posnetek, -->
<!-- 				</p> -->
<!-- 				<p class="text-xs text-gray-500 dark:text-gray-400"> -->
<!-- 					izvožen iz noisecapture aplikacije (.ZIP) -->
<!-- 				</p> -->
<!-- 			{:else} -->
<!-- 				{#each files as file} -->
<!-- 					<div>{file.name}</div> -->
<!-- 				{/each} -->
<!-- 			{/if} -->
<!-- 		</div> -->
<!-- 		<input bind:files id="dropzone-file" type="file" class="hidden" name="file" /> -->
<!-- 	</label> -->
<!---->
<!-- 	<button type="submit" class="bg-amber-400 ml-auto text-amber-950">Naloži</button> -->
<!-- </form> -->

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
		@apply w-full text-right invalid:border-red-600;
	}
</style>
