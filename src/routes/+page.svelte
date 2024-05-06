<script lang="ts">
	export let data: { user: any; passwordChangeSent: any };
</script>

<div class="box">
	<h2>Primerjalnik admin</h2>
	<div>
		<a href="/records">Vse meritve</a>
		<p>Pregled vseh meritev vseh uporabnikov</p>
	</div>
	<div>
		<a href="/records/comparison">Rezultati</a>
		<p>Prikaz rezultatov (povprečji) meritev vseh uporabnikov</p>
	</div>
	<div>
		<a href="/records/atmo">Atmotube</a>
		<p>Prikaz surovih podatkov iz atmotub-a za vse uporabnike</p>
	</div>
	<div>
		<a href="/records/noisecapture">Noisecapture</a>
		<p>Prikaz surovih podatkov iz noisecapture aplikacije za vse uporabnike</p>
	</div>
</div>

<style lang="postcss">
	.box {
		@apply flex flex-col gap-4 max-w-md min-w-fit sm:m-auto sm:mt-5 m-5  p-4 rounded-lg text-stone-900 shadow-xl bg-stone-50;
	}

	h2 {
		@apply text-2xl font-bold;
	}

	a {
		@apply text-xl font-semibold;
	}

	label {
		@apply flex flex-row gap-2 justify-between items-center;
	}

	input {
		@apply w-full text-right invalid:border-red-600;
	}
</style>
