import { createRouter, createWebHistory } from "vue-router"
import HomeView from "./views/HomeView.vue"
import NewPostView from "./views/NewPostView.vue"

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/posts/new",
      name: "new",
      component: NewPostView,
    },
  ]
})