<script lang="ts">
	export let loading: boolean;
</script>

<div style="visibility: {loading ? '' : 'hidden'};background-color: rgba(0, 0, 0, 0.5);" />

<style>
	div {
		width: 100vw;
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0px;
	}
</style>
