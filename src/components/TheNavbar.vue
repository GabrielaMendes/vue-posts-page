<script lang="ts" setup>
import { useModal } from "../composables/modal";
import SignupForm from "./SignupForm.vue";

const modal = useModal()
</script>

<template>
	<div class="navbar">
		<div class="navbar-end">
			<div class="buttons">
        <button class="button" @click="modal.showModal()">Sigh Up</button>
				<RouterLink :to="{name: 'new'}" class="button">
          New Post
        </RouterLink>
			</div>
		</div>
	</div>

  <Teleport to="#modal">
    <SignupForm />
  </Teleport>
</template>
