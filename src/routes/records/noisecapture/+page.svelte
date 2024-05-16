<script lang="ts">
	import { formatDate, formatTime } from '$lib/utils.js';
	export let data: any;
</script>

{#each data.users.filter((a) => a.noise.length) as user}
	<table class="w-[1100px]">
		<h2 id={user.email} class="p-2 font-bold text-xl">{user.email}</h2>
		<tr>
			<th class="w-2">zap.št.</th>
			<th>datum</th>
			<th>začetek</th>
			<th>konec</th>
			<th>trajanje (s)</th>
			<th>naprava</th>
			<th>leq mean</th>
			<th>url</th>
			<th>atmotube meritve</th>
			<th>težava</th>
		</tr>
		{#each user.noise.filter(a => a.error_message != "too old / too short") as record, i}
			<tr class="text-center">
				<td>{i + 1}.</td>
				<td>{formatDate(new Date(record.start))}</td>
				<td>{formatTime(new Date(record.start))}</td>
				<td>{formatTime(new Date(record.end))}</td>
				<td>{record.duration_seconds || '/'}</td>
				<td>{record.device_manufacturer + ' (' + record.device_model + ')' || '/'}</td>
				<td>{record.leq_mean || '/'}</td>
				<td><a href={record.url}>prenesi</a></td>
				<td
					><a href={`/records/atmo?date=${record.start}&atmotube_id=${user.atmotube_id}`}>link</a
					></td>
				<td>{record.error_message || '/'}</td>
			</tr>{/each}
	</table>
{/each}

<small class="text-center w-screen block" />
