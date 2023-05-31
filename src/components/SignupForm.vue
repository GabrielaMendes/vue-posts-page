<script lang="ts" setup>
import { ref, computed } from "vue";
import { validate, lenth, required } from "../validation";
import FormInput from "./FormInput.vue";

const username = ref("");
const usernameStatus = computed(() => {
	return validate(username.value, [required, lenth({ min: 5, max: 10 })]);
});
</script>

<template>
	<FormInput name="username" v-model="username" :status="usernameStatus" />
</template>
