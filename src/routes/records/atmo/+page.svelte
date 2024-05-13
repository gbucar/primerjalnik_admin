<script lang="ts">
	import { formatDate, formatTime } from '$lib/utils.js';

	export let data;
</script>

<form method="get" class="mx-6">
	<input name="date" type="date" />
	<input name="atmotube_id" type="text" placeholder="atmotube id" />
	<button>potrdi</button>
</form>
<table class="w-screen min-w-[700px]">
	<tr>
		<th>datum</th>
		<th>čas</th>
		<th>pritisk</th>
		<th>pm 1 (μg)</th>
		<th>pm 2.5 (μg)</th>
		<th>pm 10 (μg)</th>
		<th>temperatura (°C)</th>
		<th>vlaga (%)</th>
		<th>VOC</th>
	</tr>
	{#each data.atmotubeData.sort((a, b) => new Date(a.time) - new Date(b.time)) as point, i}
		<tr class="text-center">
			<td>{formatDate(new Date(point.time))}</td>
			<td>{formatTime(new Date(point.time))}</td>
			<td>{point.p || '/'}</td>
			<td>{point.pm1 || '/'}</td>
			<td>{point.pm25 || '/'}</td>
			<td>{point.pm10 || '/'}</td>
			<td>{point.t || '/'}</td>
			<td>{point.h || '/'}</td>
			<td>{point.voc || '/'}</td>
		</tr>
	{/each}
</table>

<small class="text-center w-screen block">
	Prikazani so podatki neposredno iz Atmotube-a. <br />
	Če se nek posnetek ne pokaže pod zgodovino, je to verjetno zato, ker podatki iz Atmotube-a še niso
	dostopni. <br />
	Označite datum posnetka in poglejte, če so na voljo podatki za vsako minuto tega posnetka. <br />
	Primer: posnetek traja od 6:59 do 7:03, kar pomeni, da morajo biti tukaj podatki za 6:59, 7:00, 7:01,
	7:02 in 7:03.<br />
	Če kakšen od teh podatkov ni na voljo, se je verjetno zgodila napaka na Atmotube aplikaciji. Osveževanje
	podatkov lahko traja nekaj ur ali pa nekaj dni.<br />
	Pri snemanju mora biti vklopljen tako Atmotube (ni pa nujno, da je ves čas povezan z aplikacijo) kot
	tudi Noise Capture.<br />
</small>
