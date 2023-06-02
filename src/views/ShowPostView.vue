<script lang="ts" setup>
import { computed } from "vue";
import { usePosts } from "../stores/posts";
import { useUsers } from "../stores/users";
import { useRoute } from "vue-router";

const postStore = usePosts();
const usersStore = useUsers();
const route = useRoute();
const id = route.params.id as string;

const post = postStore.all.get(id);

if (!post) {
	throw Error(`Post with id ${id} was not found`);
}

const canEdit = computed(() => {
  if(!usersStore.currentUserId) {
    return false
  }

  return post.authorId === usersStore.currentUserId
})
</script>

<template>
	<div class="columns">
		<div class="column"></div>
		<div class="column is-two-thirds">
			<RouterLink
        v-if="canEdit"
				:to="{ name: 'edit', params: { id: id } }"
				class="is-link button is-rounded"
			>
        Edit Post
      </RouterLink>
			<h1>{{ post.title }}</h1>
			<div v-html="post.html"></div>
		</div>
		<div class="column"></div>
	</div>
</template>
