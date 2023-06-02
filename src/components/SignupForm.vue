<script lang="ts" setup>
import { NewUser } from "../users";
import { useUsers } from "../stores/users";
import { useModal } from "../composables/modal";
import UserForm from "./UserForm.vue";

const usersStore = useUsers();
const modal = useModal();

async function handleSignup(payload: { newUser: NewUser, reset: Function }) {
  await usersStore.createUser(payload.newUser);
  modal.hideModal();
  payload.reset();
}
</script>

<template>
  <UserForm @submit="handleSignup" />
</template>