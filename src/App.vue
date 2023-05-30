<script lang="ts" setup>
import TheNavbar from './components/TheNavbar.vue';
</script>

<template>
	<div class="section">
		<div class="container">
      <TheNavbar />
      <RouterView />
		</div>
	</div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";
</style>
