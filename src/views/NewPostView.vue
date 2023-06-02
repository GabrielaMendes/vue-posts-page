<script lang="ts" setup>
import { DateTime } from "luxon";
import { TimelinePost } from "../posts";
import { useUsers } from "../stores/users";
import PostWriter from "../components/PostWriter.vue";

const usersStore = useUsers();

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
</script>

<template>
	New Post
	<PostWriter :post="post" />
</template>
