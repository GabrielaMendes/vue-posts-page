<script lang="ts" setup>
import { ref, computed } from "vue";
import { validate, lenth, required } from "../validation";
import { NewUser } from "../users";
import FormInput from "./FormInput.vue";

defineProps<{
	error?: string;
}>();

const emit = defineEmits<{
	(event: "submit", payload: {newUser: NewUser, reset: Function}): void;
}>();

const username = ref("");
const usernameStatus = computed(() => {
	return validate(username.value, [required, lenth({ min: 5, max: 10 })]);
});

const password = ref("");
const passwordStatus = computed(() => {
	return validate(password.value, [required, lenth({ min: 8, max: 30 })]);
});

const isInvalid = computed(() => {
	return !usernameStatus.value.valid || !passwordStatus.value.valid;
});

async function handleSubmit() {
	if (isInvalid.value) {
		return;
	}

	const newUser: NewUser = {
		username: username.value,
		password: password.value,
	};

	try {
		emit("submit", {newUser: newUser, reset: resetForm});
	} catch (e) {}
}

function resetForm() {
  username.value = ""
  password.value = ""
}
</script>

<template>
	<form class="form" @submit.prevent="handleSubmit">
		<FormInput
			name="username"
			type="text"
			v-model="username"
			:status="usernameStatus"
		/>
		<FormInput
			name="password"
			type="password"
			v-model="password"
			:status="passwordStatus"
		/>
    <div v-ir="error" class="is-danger help">
      {{ error }}
    </div>
		<button class="button" :disabled="isInvalid">Submit</button>
	</form>
</template>

<style scoped>
.form {
	background: white;
	padding: 30px;
	margin-top: 50px;
}
</style>
