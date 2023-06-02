<script lang="ts" setup>
import { usePosts } from '../stores/posts';
import { useRoute, useRouter } from 'vue-router';
import { Post } from '../posts';
import PostWriter from "../components/PostWriter.vue";

const postsStore = usePosts();
const router = useRouter();
const route = useRoute();
const id = route.params.id as string;

const post = postsStore.all.get(id)

if (!post) {
  throw Error(`Post with id ${id} was not found`)
}

async function handleSubmit(editedPost: Post) {
  await postsStore.updatePost(editedPost)
	router.push({ name: "home" });
}
</script>

<template>
  Edit Post
	<PostWriter @submit="handleSubmit" :post="post" />
</template>