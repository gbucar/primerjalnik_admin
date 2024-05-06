<script lang="ts">
	import { enhance } from '$app/forms';
	import { PUBLIC_MAPBOX_API_KEY } from '$env/static/public';
	import { calculateColor, formatDate, formatIntakeNg, formatTime } from './utils';
	export let owner: string = '';
	export let record: any;
	export let no_alternative: boolean = false;
	let loading = false;
	let form: HTMLFormElement | null;
</script>

<div
	class="rounded-lg shadow-md g-stone-50 \
           overflow-hidden bg-stone-50 p-2 m-2 flex flex-col hover:shadow-2xl hover:p-3 hover:m-1 transition-all relative"
>
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
		<input type="hidden" name="id" value={record.id} />
		<div class="data">
			<div>
				<div>
					<h2>{owner}</h2>
					Zaseben posnetek:
					<input
						name="private"
						value="1"
						class="accent-amber-400"
						type="checkbox"
						disabled={loading}
						bind:checked={record.private}
						on:change={() => form?.requestSubmit()}
					/>
				</div>
				{#if !no_alternative}
					<div>
						<!-- We might want to change this to a checkbox -->
						Pot:
						<select
							name="alternative"
							bind:value={record.alternative}
							disabled={loading}
							on:change={() => form?.requestSubmit()}
						>
							<option value={false}>Originalna</option>
							<option value={true}>Alternativna</option>
						</select>
					</div>
				{/if}

				<p>
					{formatDate(record.start)}
					<b>
						{formatTime(record.start)} -
						{formatTime(record.end)}
					</b>
				</p>
			</div>
			<div class="my-auto flex flex-col">
				<div class="intake font-bold text-3xl">
					{formatIntakeNg(record.intake_pm1)}
				</div>
				<small class="text-center mx-auto w-full pt-0">µg / kg</small>
			</div>
		</div>
		{#if record.polyline}
			<a href="/records/{record.id}">
				<img
					src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/path({encodeURIComponent(
						record.polyline
					)})/auto/400x300?access_token={PUBLIC_MAPBOX_API_KEY}"
					alt="record map"
				/>
			</a>
		{/if}
	</form>
</div>

<style lang="postcss">
	.data {
		@apply flex flex-row justify-between;
	}
	input {
		@apply bg-stone-50 text-stone-900;
	}
	img {
		@apply rounded-lg m-0;
	}
	p {
		@apply text-sm;
	}
</style>
