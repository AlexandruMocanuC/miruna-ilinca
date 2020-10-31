<script>
	export let name;

	let password = "";
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap"
		rel="stylesheet" />
</svelte:head>

<template>
	<input type="text" bind:value={password} />

	{#if password == '2410'}
		<a
			href="edits.zip"
			target="_blank"
			download="Miruna Ilinca.zip">download</a>
	{:else}<b>parola incorecta</b>{/if}
</template>
