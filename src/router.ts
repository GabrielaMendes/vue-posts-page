import { createRouter, createWebHistory } from "vue-router";
import { useUsers } from "./stores/users";
import HomeView from "./views/HomeView.vue";
import NewPostView from "./views/NewPostView.vue";
import ShowPostView from "./views/ShowPostView.vue";

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
			beforeEnter: (to, from, next) => {
				const usersStore = useUsers();
				if (!usersStore.currentUserId) {
          console.log(usersStore.currentUserId)
          console.log("not authorized")
					next({ name: "home" });
				}

				next();
			},
		},
		{
			path: "/posts/:id",
			name: "post",
			component: ShowPostView,
		},
	],
});
