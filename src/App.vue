<script lang="ts" setup>
import { computed } from "vue";
import TheNavbar from "./components/TheNavbar.vue";
import { useModal } from "./composables/modal";

const modal = useModal();
const modalVisibility = computed(() => {
	return {
		display: modal.show.value ? "block" : "none",
	};
});
</script>

<template>
	<div class="modal" style="color: white" :style="modalVisibility">
		<div class="modal-background">
			<div class="modal-content">
				<div id="modal"></div>
			</div>
			<button
				class="modal-close is-large"
				aria-label="close"
				@click="modal.hideModal()"
			></button>
		</div>
	</div>

	<div class="section">
		<div class="container">
			<TheNavbar />
			<RouterView />
		</div>
	</div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";
@import "highlight.js/styles/atom-one-dark.css";

ul {
	list-style: revert !important;
	list-style-position: inside !important;
}

h1,
h2,
h3,
h4,
h5,
h6 {
	font-size: revert !important;
	margin: 10px 0 !important;
}

pre {
	margin: 10px 0 !important;
}

p {
	margin: 10px 0 !important;
}

div[contenteditable] {
	white-space: pre;
}
</style>
