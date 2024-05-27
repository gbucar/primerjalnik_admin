<script lang="ts">
	import Records from '$lib/Records.svelte';
	import UserForm from '$lib/UserForm.svelte';
	import Tick from './tick.svelte';
	import Cross from './cross.svelte';
	import { formatDate } from '$lib/utils';
	import { slide } from 'svelte/transition';
	// import { linear } from 'svelte/easing';
	export let data: any;
	let hideZero: boolean = true;
	let hideInactive: boolean = true;
	let filter = '';
	let start = '';

	let userShouldBeShown = (user: any, hideZero: boolean, hideInactive: boolean, filter: string) => {
		let now = new Date();
		let start = user.start ? new Date(user.start) : null;
		let end = user.end ? user.end : null;
		return (
			(user.records.length !== 0 || !hideZero) &&
			user.email.toLowerCase().indexOf(filter.toLowerCase()) != -1 &&
			((start && start < new Date() && (end ? end < new Date() : true)) || !hideInactive)
		);
	};
</script>

<div class="bg-white m-8 rounded-xl">
	{#if true}
		<button
			class="font-bold bg-red-50"
			on:click={() => {
				data.users = data.users.map((user) => {
					return { ...user, collapsed: true };
				});
			}}>collapse all</button
		>
	{/if}
	hide participants without records:
	<input bind:checked={hideZero} type="checkbox" />
	hide inactive:
	<input bind:checked={hideInactive} type="checkbox" />
	<label for="text">
		search:
		<input name="filter" type="text" bind:value={filter} />
	</label>
</div>

{#each data.users as user}
	{#if userShouldBeShown(user, hideZero, hideInactive, filter)}
		<div class="bg-white m-8 rounded-xl shadow-sm">
			<div class="flex flex-row items-center gap-2 justify-between">
				<button
					class="text-xl font-bold"
					on:click={() => (user = { ...user, collapsed: !user.collapsed })}
					>{user.email} ({user.records.length})</button
				>
				<a class="hover:bg-gray-100 rounded-full px-2" href="/records/noisecapture#{user.email}">
					noise
				</a>
				<!-- <a href="/records/atmo#{user.email}">atmo</a> -->
				<div class="flex flex-row gap-5">
					<div class="flex flex-row items-center">
						<p>Profile:</p>
						{#if user.height > 5 && user.sex && user.weight > 10 && user.age > 10}
							<Tick />
						{:else}
							<Cross />
						{/if}
					</div>
					<div class="flex flex-row items-center">
						<p>FitBit:</p>
						{#if user.fitbit_fully_connected}
							<Tick />
						{:else}
							<Cross />
						{/if}
					</div>
					<div class="flex flex-row items-center">
						<p>NoiseCaptureID:</p>
						{#if user.noisecapture_id}
							<Tick />
						{:else}
							<Cross />
						{/if}
					</div>
				</div>
			</div>
			{#if !user.collapsed}
				<UserForm {user} atmotubes={data.atmotubes} />
				<div transition:slide>
					<Records user={data.user} records={user.records} />
				</div>
			{/if}
		</div>
	{/if}
{/each}
