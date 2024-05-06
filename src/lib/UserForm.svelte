<script lang="ts">
	export let atmotubes: any[];
	export let user: any;

	console.log(atmotubes);
</script>

<form>
	<label for="start">
		začetek:
		<input value={user.start.substring(0, 10)} name="start" type="date" />
	</label>
	<label for="end">
		konec:
		<input value={user.end.substring(0, 10)} name="end" type="date" />
	</label>

	<label for="atmotube">
		atmotube:
		<select class="h-5" name="atmotube" value={user.atmotube_id}>
			{#each atmotubes.sort((a, b) => a.number - b.number) as atmotube}
				<option value={atmotube.id}>{atmotube.number}</option>
			{/each}
		</select>
	</label>
</form>
