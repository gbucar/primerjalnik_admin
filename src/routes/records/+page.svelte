<script lang="ts">
	import Records from '$lib/Records.svelte';
	export let data: any;
</script>

<Records user={data?.user} records={data?.records} />

<small class="text-center w-screen block">
    Tukaj so prikazani vsi posnetki iz NoiseCapture aplikacije ob naslednjih pogojih:
    <br /> 
    <ul class="list-disc hover:list-disc">
        <li>Posnetek je daljši od dveh minut</li>
        <li>V času posnetka so na voljo popolni podatki iz Atmotube-a (pm1, pm2.5, pm10)</li>
    </ul>
    <br /> 
    Če se vam zdi, da posnetek manjka, nas prosim obvestite: <a class="text-gray-500" href="mailto:nbmyghig@duck.com">nbmyghig@duck.com</a>
</small>
