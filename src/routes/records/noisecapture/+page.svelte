<script lang="ts">
	import { formatDate, formatTime } from "$lib/utils.js";
	import Records from '$lib/Records.svelte';

	export let data: any;
</script>

<table class="w-screen min-w-[700px]">
    <tr>

            <th>zap.št.</th>
            <th>datum</th>
            <th>začetek</th>
            <th>konec</th>
            <th>trajanje (s)</th>
            <th>naprava</th>
            <th>leq mean</th>
            <th>url</th>

    </tr>
    {#each data.noisecapture_records as record, i}
        <tr class="text-center">
            <td>{i+1}.</td>
            <td>{formatDate(new Date(record.start))}</td>
            <td>{formatTime(new Date(record.start))}</td>
            <td>{formatTime(new Date(record.end))}</td>
            <td>{record.duration_seconds || "/"}</td>
            <td>{record.device_manufacturer+" ("+record.device_model+")" || "/"}</td>
            <td>{record.leq_mean || "/"}</td>
            <td><a href={record.url}>prenesi</a><td>
        </tr>
    {/each}
</table>

<small class="text-center w-screen block">
</small>
