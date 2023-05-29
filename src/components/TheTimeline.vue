<script setup lang="ts">
import { ref } from 'vue';

const periods = ["Today", "This Week", "This Month"];

const selectedPeriod = ref("Today");

function selectPeriod (period: string) {
  selectedPeriod.value = period;
}
</script>

<template>
	<nav class="is-primary panel">
		<span class="panel-tabs">
			<a 
        v-for="period in periods"
        :key="period"
        @click="selectPeriod(period)"
      >
				{{ period }}
			</a>
		</span>
	</nav>
</template>
