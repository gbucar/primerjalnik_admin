<script lang="ts">
	export let form: any;
	export let data: { TOKEN: string };
</script>

<form method="POST">
	<h1 class="font-bold text-lg">Sprememba gesla:</h1>
	<input type="hidden" name="TOKEN" value={data.TOKEN} />
	<label for="password">
		<input
			name="password"
			style={form?.error ? 'border-color: red' : ''}
			type="password"
			placeholder="Novo geslo"
		/>
	</label>
	<label for="passwordConfirm">
		<input
			name="passwordConfirm"
			style={form?.error ? 'border-color: red' : ''}
			type="password"
			placeholder="Potrdi novo geslo"
		/>
	</label>
	<div>
		<button class="bg-amber-600 text-amber-50" type="submit"> Potrdi </button>
	</div>
</form>

<style lang="postcss">
	form {
		@apply flex flex-col gap-1 m-auto bg-stone-50 mt-10 p-5 rounded-lg shadow-lg w-min;
	}
	input {
		@apply !ml-0;
	}

	a {
		@apply m-1 py-1 px-2 rounded-md transition-all  hover:shadow-xl
        focus:outline-0  focus:shadow-lg focus:ring-amber-600 focus:ring-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none;
	}
</style>
