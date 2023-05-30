<script lang="ts" setup>
import { DateTime } from "luxon";
import { TimelinePost } from "../posts";
import PostWriter from "../components/PostWriter.vue";

const post: TimelinePost = {
	id: "-1",
	title: "Title",
	created: DateTime.now(),
  markdown: "## Title"
};
</script>

<template>
	New Post
	<PostWriter :post="post" />
</template>
