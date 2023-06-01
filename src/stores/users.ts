import { defineStore } from "pinia";
import { NewUser } from "../users";

interface UserState {
	currentUserId?: string;
}

export const useUsers = defineStore("users", {
	state: (): UserState => ({
		currentUserId: undefined,
	}),

	actions: {
		createUser(newUser: NewUser) {
			const body = JSON.stringify(newUser);

			return window.fetch("/api/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body,
			});
		},

		async authenticate() {
			const res = await window.fetch("/api/current-user", {
				headers: {
					"Content-Type": "application/json",
				},
			});
			const result = await res.json();
			this.currentUserId = result.id;
		},
	},
});
