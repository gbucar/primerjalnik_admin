<script lang="ts">
	import { formatIntakeNg, formatDate } from '$lib/utils';
	export let data: any;
	let originalRecords = 0;
	let alternativeRecords = 0;
	let originalIntake =
		data.records.reduce((previous: number, current: any) => {
			if (current.private) return previous;
			if (!current.alternative) return previous;
			originalRecords++;
			return previous + current.intake_pm1;
		}, 0) / originalRecords;
	let alternativeIntake =
		data.records.reduce((previous: number, current: any) => {
			if (current.private) return previous;
			if (current.alternative) return previous;
			alternativeRecords++;
			return previous + current.intake_pm1;
		}, 0) / alternativeRecords;
	let alternativeIntakePercent: number;
	let originalIntakePercent: number;
	if (alternativeIntake < originalIntake) {
		originalIntakePercent = 100;
		alternativeIntakePercent = 100 * (alternativeIntake / originalIntake);
	} else {
		alternativeIntakePercent = 100;
		originalIntakePercent = 100 * (originalIntake / alternativeIntake);
	}
	let maxIntake = Math.max.apply(
		Math,
		data.records.map((o: any) => o.intake_pm1)
	);
</script>

<div class="flex flex-col items-center p-3">
	<div class="bg-white mb-3 rounded-3xl shadow-xl p-3 sm:w-5/6 w-full transition-all">
		<h2 class="font-bold text-3xl">Vizualizacija s krogi</h2>
		<svg viewBox="0 0 100 50">
			<circle
				cx="25"
				cy="25"
				r={originalIntakePercent * 0.24 > 9.8 ? originalIntakePercent * 0.24 : 9.8}
				fill={'#f59e0b'}
			/>
			<text
				x="25"
				y="25"
				dominant-baseline="middle"
				text-anchor="middle"
				font-size={originalIntakePercent * 0.15 > 6 ? originalIntakePercent * 0.15 : 6}
				class="fill-white"
			>
				{formatIntakeNg(originalIntake)}
			</text>
			<text
				x="25"
				y={25 + originalIntakePercent * 0.1 > 28 ? 25 + originalIntakePercent * 0.1 : 28}
				font-size="0.15em"
				font-weight="bold"
				fill="white"
				dominant-baseline="middle"
				text-anchor="middle"
			>
				<tspan x="25">originalna pot</tspan>
				<tspan x="25" dy="1.2em">(µg / kg)</tspan>
			</text>

			<!-- fill={originalIntake > alternativeIntake ? '#8b5cf6' : '#f59e0b' } -->
			<circle
				cx="75"
				cy="25"
				r={alternativeIntakePercent * 0.24 > 9.8 ? alternativeIntakePercent * 0.24 : 9.8}
				fill={'#8b5cf6'}
			>
				<small class="text-white mx-auto mb-5">alternativa<br />(µg / kg)</small>
			</circle>
			<text
				x="75"
				y="25"
				dominant-baseline="middle"
				text-anchor="middle"
				font-weight="bold"
				font-size={alternativeIntakePercent * 0.15 > 6 ? alternativeIntakePercent * 0.15 : 6}
				class="fill-white"
			>
				{formatIntakeNg(alternativeIntake)}
			</text>
			<text
				x="75"
				y={25 + alternativeIntakePercent * 0.1 > 28 ? 25 + alternativeIntakePercent * 0.1 : 28}
				font-size="0.15em"
				fill="white"
				font-weight="bold"
				dominant-baseline="middle"
				text-anchor="middle"
			>
				<tspan x="75">alternativna pot</tspan>
				<tspan x="75" dy="1.2em">(µg / kg)</tspan>
			</text>
		</svg>
		<small class="text-center w-full block">
			Kroga prikazujeta povprečen vnos delcev (PM1) za originalno (levi krog) in alternativno (desni
			krog) pot v nanogramih (µg) delcev na kilogram (kg) telesne teže. Večji kot je krog, večji je
			povprečen vnos delcev. V kolikor menite, da je rezultat napačen preverite, če so posnetki v
			zavihku "Zgodovina" pravilno označeni. <br />
			Opozorilo: pri ekstremnih vrednostih razmerja niso točna.
		</small>
	</div>

	<div class="bg-white p-3 rounded-3xl shadow-xl sm:w-5/6 w-full transition-all">
		<h2 class="font-bold text-3xl">Graf</h2>
		<div class="py-2">
			<svg viewBox="0 0 110 40">
				<!-- <rect  -->
				<!--     x="4.8" -->
				<!--     width="0.1" height="35" -->
				<!--     /> -->
				<!-- <rect  -->
				<!--     x="4.5" y="35" -->
				<!--     width="0.8" height="0.1" -->
				<!--     /> -->
				<!-- <rect  -->
				<!--     x="4.5" y="0" -->
				<!--     width="0.8" height="0.1" -->
				<!--     /> -->

				{#each Array(9) as item, i}
					<text text-anchor="middle" x="3" y={35 - i * (35 / 10)} font-size="2"
						>{formatIntakeNg(i * (maxIntake / 9))}</text
					>
				{/each}
				<text text-anchor="middle" x="3" y={35 - 9 * (35 / 10)} font-size="2">{'µg/kg'}</text>

				{#each data.records.sort((a, b) => ('' + a.start).localeCompare(b.start)) as record, i}
					<!-- {#if i % 5 === 0} -->
					<text
						font-size="0.09em"
						transform="translate({99 * (i / data.records.length) + 6},36) rotate(30)"
						>{formatDate(record.start)}</text
					>
					<!-- {/if} -->
					<rect
						x={99 * (i / data.records.length) + 6}
						y={35 - (record.intake_pm1 / maxIntake) * 35}
						width={90 / data.records.length}
						height={(record.intake_pm1 / maxIntake) * 35}
						fill={!record.alternative ? '#f59e0b' : '#8b5cf6'}
					/>
				{/each}
			</svg>
		</div>
		<small class="text-center w-full block">
			Stolpci na grafu predstavljajo skupni vnos delcev na vsako pot. Alternativne poti so označene
			z vijolično, originalne pa z oranžno. Višji kot je stolpec, večji je vnos delcev.
		</small>
	</div>
</div>
