<script lang="ts" setup>
import { usePosts } from '../stores/posts';
import { useRoute } from 'vue-router';

const postStore = usePosts()
const route = useRoute();
const id = route.params.id as string;

const post = postStore.all.get(id)

if (!post) {
  throw Error(`Post with id ${id} was not found`)
}
</script>

<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column is-two-thirds">
      <h1>{{ post.title }}</h1>
      <div v-html="post.html"></div>
    </div>
    <div class="column"></div>
  </div>
</template>