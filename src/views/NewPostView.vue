<script lang="ts" setup>
import { DateTime } from "luxon";
import { TimelinePost, Post } from "../posts";
import { useUsers } from "../stores/users";
import { usePosts } from "../stores/posts";
import { useRouter } from "vue-router";
import PostWriter from "../components/PostWriter.vue";

const usersStore = useUsers();
const postsStore = usePosts();
const router = useRouter();

if (!usersStore.currentUserId) {
	throw Error("User was not found");
}

const post: TimelinePost = {
	id: "-1",
	title: "Title",
	authorId: usersStore.currentUserId,
	created: DateTime.now(),
	markdown: "## Title",
	html: "<h2>Title</h2>",
};

async function handleSubmit(newPost: Post) {
  await postsStore.createPost(newPost)
	router.push({ name: "home" });
}
</script>

<template>
	New Post
	<PostWriter @submit="handleSubmit" :post="post" />
</template>
