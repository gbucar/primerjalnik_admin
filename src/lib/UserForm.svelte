<script lang="ts">
	import { enhance } from '$app/forms';

	export let atmotubes: any[];
	export let user: any;
</script>

<form class="p-5" method="post" action="?/updateUser" use:enhance>
	<input name="id" type="hidden" value={user.id} />
	<input name="num_records" type="hidden" value={user.records.length} />
	<label for="start">
		začetek:
		<input value={user.start.substring(0, 10)} name="start" type="date" />
	</label>
	<label for="end">
		konec:
		<input value={user.end.substring(0, 10)} name="end" type="date" />
	</label>

	<label for="atmotube_id">
		atmotube:
		<select
			disabled={user.records.length > 0}
			class="h-5"
			name="atmotube_id"
			value={user.atmotube_id}
		>
			{#each atmotubes.sort((a, b) => a.number - b.number) as atmotube}
				<option value={atmotube.id}>{atmotube.number}</option>
			{/each}
		</select>
	</label>
	<button type="submit">shrani</button>
	<div>
		Aktiven <b>{Math.floor((new Date() - new Date(user.start)) / (60 * 60 * 24 * 1000))} dni</b>
	</div>
</form>
