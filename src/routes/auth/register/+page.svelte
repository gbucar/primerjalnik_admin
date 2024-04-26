<script lang="ts">
	export let form: any;
</script>

<form method="POST">
	<h1 class="font-bold text-lg">Registracija</h1>
	<label for="email">
		<input
			required
			name="email"
			style={form?.error ? 'border-color: red' : ''}
			type="email"
			placeholder="Email"
		/>
	</label>

	<label for="password">
		<input
			required
			name="password"
			style={form?.error ? 'border-color: red' : ''}
			type="password"
			placeholder="Geslo"
		/>
	</label>

	<label for="passwordConfirm">
		<input
			required
			name="passwordConfirm"
			style={form?.error ? 'border-color: red' : ''}
			type="password"
			placeholder="Potrdi geslo"
		/>
	</label>

	<div>
		<button class="bg-amber-600 text-amber-50" type="submit"> Registracija </button>
		<a class="bg-amber-200 text-amber-100" href="/auth/login"> Prijava </a>
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
