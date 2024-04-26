<script lang="ts">
	import { clickOutside } from './utils';

	export let visible: boolean;

	let loading = false;
</script>

<form
	action="?/addManualRecord"
	method="post"
	use:clickOutside
	on:click_outside={() => (visible ? (visible = !visible) : '')}
>
	<label for="title">
		<input
			required
			class="font-bold text-xl"
			disabled={loading}
			name="name"
			type="text"
			placeholder="Naslov"
		/>
	</label>

	<label for="date">
		<p>Datum:</p>
		<input required disabled={loading} name="date" type="date" />
	</label>
	<label for="start">
		<p>Začetek:</p>
		<input required disabled={loading} name="start" type="time" />
	</label>
	<label for="end">
		<p>Konec:</p>
		<input required disabled={loading} name="end" type="time" />
	</label>
	<label for="tags">
		<p>Opombe:</p>
		<input disabled={loading} name="tags" type="text" placeholder="vetrovno... (ključne besede)" />
	</label>
	<button disabled={loading} type="submit">dodaj</button>
</form>

<style lang="postcss">
	form {
		@apply flex flex-col items-center min-w-fit bg-white rounded-lg shadow-lg p-4;
	}
	label {
		@apply flex flex-row justify-between w-full;
	}
	button {
		@apply bg-amber-400 text-white rounded-lg p-2;
	}
</style>
