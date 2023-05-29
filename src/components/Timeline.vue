<script setup lang="ts">
const periods = ["Today", "This Week", "This Month"];
</script>

<template>
	<nav class="is-primary panel">
		<span class="panel-tabs">
			<a v-for="period in periods" :key="period" href="#">
        {{ period }}
      </a>
		</span>
	</nav>
</template>
