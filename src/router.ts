import {
	createRouter,
	createWebHistory,
	RouteLocationNormalized,
	NavigationGuardNext,
} from "vue-router";
import { useUsers } from "./stores/users";
import HomeView from "./views/HomeView.vue";
import NewPostView from "./views/NewPostView.vue";
import ShowPostView from "./views/ShowPostView.vue";
import EditPostView from "./views/EditPostView.vue";

export const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	{
		path: "/posts/new",
		name: "new",
		component: NewPostView,
		beforeEnter: (
			to: RouteLocationNormalized,
			from: RouteLocationNormalized,
			next: NavigationGuardNext
		) => {
			const usersStore = useUsers();
			if (!usersStore.currentUserId) {
				next({ name: "home" });
				return;
			}

			next();
		},
	},
	{
		path: "/posts/:id/edit",
		name: "edit",
		component: EditPostView,
	},
	{
		path: "/posts/:id",
		name: "post",
		component: ShowPostView,
	},
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
