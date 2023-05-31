<script lang="ts" setup>
import { Status } from '../validation';

defineProps<{
	name: string;
  type?: string;
	modelValue: string;
  status: Status;
}>();

const emit = defineEmits<{
	(event: "update:modelValue", value: string): void;
}>();

function handleInput(e: Event) {
	const value = (e.target as HTMLInputElement).value;
	emit("update:modelValue", value);
}
</script>

<template>
	<div class="field">
		<div :for="name" class="label">{{ name }}</div>
		<div class="control">
			<input
				:type="type ? type : 'text'"
				:id="name"
				class="input"
				:value="modelValue"
				@input="handleInput"
			/>
		</div>

    <p class="is-danger help" v-show="!status.valid">
      {{ status.message }}
    </p>
	</div>
</template>
