<script lang="ts" setup>
import { usePosts } from '../stores/posts';
import { useRoute } from 'vue-router';
import PostWriter from "../components/PostWriter.vue";

const postStore = usePosts()
const route = useRoute();
const id = route.params.id as string;

const post = postStore.all.get(id)

if (!post) {
  throw Error(`Post with id ${id} was not found`)
}

</script>

<template>
  Edit Post
	<PostWriter :post="post" />
</template>