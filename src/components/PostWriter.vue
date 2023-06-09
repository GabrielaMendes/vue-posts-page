<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { TimelinePost, Post } from "../posts";
import { marked } from "marked";
import highlightjs from "highlight.js";
import debounce from "lodash/debounce";
import { useUsers } from "../stores/users";

const props = defineProps<{
	post: TimelinePost | Post;
}>();

const emit = defineEmits<{
	(event: "submit", post: Post): void;
}>();

const title = ref(props.post.title);
const content = ref(props.post.markdown);
const contentEditable = ref<HTMLDivElement>();
const html = ref("");

const usersStore = useUsers();

function parseHtml(markdown: string) {
	marked.parse(
		markdown,
		{
			gfm: true,
			breaks: true,
			highlight: (code) => {
				return highlightjs.highlightAuto(code).value;
			},
		},
		(err, parseResult) => {
			html.value = parseResult;
		}
	);
}

watch(
	content,
	debounce((newContent) => {
		parseHtml(newContent);
	}, 200),
	{
		immediate: true,
	}
);

onMounted(() => {
	if (!contentEditable.value) {
		throw Error("ContentEditable DOM node was not found");
	}
	contentEditable.value.innerText = content.value;
});

function handleInput() {
	if (!contentEditable.value) {
		throw Error("ContentEditable DOM node was not found");
	}
	content.value = contentEditable.value.innerText;
}

function handeClick() {
	if (!usersStore.currentUserId) {
		throw Error("User was not found");
	}

	const newPost: Post = {
		...props.post,
		created:
			typeof props.post.created === "string"
				? props.post.created
				: props.post.created.toISO(),
		title: title.value,
		authorId: usersStore.currentUserId,
		markdown: content.value,
		html: html.value,
	};
	emit("submit", newPost);
}
</script>

<template>
	<div class="columns">
		<div class="column">
			<div class="field">
				<div class="label">Post title</div>
				<input type="text" class="input" v-model="title" />
			</div>
		</div>
	</div>

	<div class="columns">
		<div class="column">
			<div
				contenteditable
				id="contenteditable"
				ref="contentEditable"
				@input="handleInput"
			/>
		</div>
		<div class="column">
			<div v-html="html" />
		</div>
	</div>

	<div class="comumns">
		<div class="column">
			<button
				id="submit"
				class="button is-primary is-pulled-right"
				@click="handeClick"
			>
				Save Post
			</button>
		</div>
	</div>
</template>
