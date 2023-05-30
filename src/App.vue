<script setup lang="ts">
import TheTimeline from "./components/TheTimeline.vue";
</script>

<template>
	<div class="section">
		<div class="container">
			<Suspense>
        <template #default>
          <TheTimeline />
        </template>

        <template #fallback>
          <progress class="progress is-primary is-small" />
        </template>
      </Suspense>
		</div>
	</div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";
</style>
