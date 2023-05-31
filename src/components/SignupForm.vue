<script lang="ts" setup>
import { ref, computed } from "vue";
import { validate, lenth, required } from "../validation";
import { useModal } from "../composables/modal";
import { NewUser } from "../users";
import FormInput from "./FormInput.vue";

const username = ref("");
const usernameStatus = computed(() => {
	return validate(username.value, [required, lenth({ min: 5, max: 10 })]);
});

const password = ref("");
const passwordStatus = computed(() => {
	return validate(password.value, [required, lenth({ min: 8, max: 30 })]);
});

const isInvalid = computed(() => {
  return !usernameStatus.value.valid || !passwordStatus.value.valid
})

const modal = useModal();

function handleSubmit() {
  if (isInvalid.value) {
    return;
  }

	const newUser: NewUser = {
    username: username.value,
    password: password.value,
  }

  console.log(newUser)
  modal.hideModal()
}
</script>

<template>
	<form class="form" @submit.prevent="handleSubmit">
		<FormInput name="username" v-model="username" :status="usernameStatus" />
		<FormInput
			name="password"
			v-model="password"
			type="password"
			:status="passwordStatus"
		/>
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
