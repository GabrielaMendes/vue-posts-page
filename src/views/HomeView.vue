<script setup lang="ts">
import TheTimeline from "../components/TheTimeline.vue";
</script>

<template>
	<Suspense>
		<template #default>
			<TheTimeline />
		</template>

		<template #fallback>
			<progress class="progress is-primary is-small" />
		</template>
	</Suspense>
</template>
