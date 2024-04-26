<script lang="ts">
	import { Map, Marker, controls } from '@beyonk/svelte-mapbox';
	import { calculateColor, formatDate, formatIntakeNg, formatTime } from '$lib/utils';
	import { PUBLIC_MAPBOX_API_KEY } from '$env/static/public';
	import Chart from '$lib/Chart.svelte';
	import { enhance } from '$app/forms';
	export let data: { record: any; record_id: string; data_points: any[] };
	let loading = false;
	let form: any = undefined;
	let center = [
		data.data_points[Math.floor(data.data_points.length / 2)].lon,
		data.data_points[Math.floor(data.data_points.length / 2)].lat
	];
	let zoom = 12;
</script>

<div class="bg-white p-2 m-2 rounded shadow-lg">
	<a href="/records">Nazaj</a>
	<form
		bind:this={form}
		method="POST"
		action="?/updateRecord"
		use:enhance={() => {
			loading = true;
			return async ({ update, result }) => {
				await update();
				loading = false;
			};
		}}
	>
		<input type="hidden" name="id" value={data.record.id} />
		<div class="data flex flex-row space-around">
			<div>
				<div>
					Zaseben posnetek:
					<input
						name="private"
						value="1"
						class="accent-amber-400"
						type="checkbox"
						disabled={loading}
						bind:checked={data.record.private}
						on:change={() => form?.requestSubmit()}
					/>
				</div>
				<div>
					<!-- We might want to change this to a checkbox -->
					Pot:
					<select
						name="alternative"
						bind:value={data.record.alternative}
						disabled={loading}
						on:change={() => form?.requestSubmit()}
					>
						<option value={false}>Originalna</option>
						<option value={true}>Alternativna</option>
					</select>
				</div>

				<p>
					{formatDate(data.record.start)}
					<b>
						{formatTime(data.record.start)} -
						{formatTime(data.record.end)}
					</b>
				</p>
			</div>
			<div class="intake text-3xl my-auto mr-0 ml-auto">
				<div class="font-bold text-3xl text-center">
					{formatIntakeNg(data.record.intake_pm1)}
				</div>
				<small class="text-center mx-auto w-full pt-0">µg / kg</small>
			</div>
		</div>
	</form>
	<div class="w-full h-96">
		<Map accessToken={PUBLIC_MAPBOX_API_KEY} bind:center bind:zoom>
			{#each data.data_points as point}
				<Marker lat={point.lat} lng={point.lon}>
					<div class="font-bold bg-white rounded-full w-5 h-5 text-center">
						{point.pm1}
					</div>

					<div slot="popup">
						<p>pm 1: <b>{point.pm1}</b> µg/m3</p>
						<p>pm 2.5: <b>{point.pm25}</b> µg/m3</p>
						<p>pm 10: <b>{point.pm10}</b> µg/m3</p>
						{#if point.humidity}
							<p>vlažnost: <b>{point.humidity}</b> %</p>
						{/if}
						<p>hrup: <b>{Math.round(point.leq)}</b> db(A)</p>
					</div>
				</Marker>
			{/each}
		</Map>
	</div>

	<div class="overflow-x-scroll w-full">
		<div class="min-w-[1000px]">
			<Chart data={data.data_points} />
		</div>
	</div>
</div>
