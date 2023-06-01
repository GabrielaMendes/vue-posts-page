<script lang="ts" setup>
import { useModal } from "../composables/modal";
import { useUsers } from "../stores/users";
import SignupForm from "./SignupForm.vue";

const modal = useModal();
const usersStore = useUsers();
</script>

<template>
	<div class="navbar">
		<div class="navbar-end">
			<div v-if="usersStore.currentUserId" class="buttons">
				<RouterLink :to="{ name: 'new' }" class="button"> New Post </RouterLink>
				<button class="button" @click="">Log Out</button>
			</div>

			<div v-else class="buttons">
				<button class="button" @click="modal.showModal()">Sign Up</button>
				<button class="button" @click="modal.showModal()">Sign In</button>
			</div>
		</div>
	</div>

	<Teleport to="#modal">
		<SignupForm />
	</Teleport>
</template>
