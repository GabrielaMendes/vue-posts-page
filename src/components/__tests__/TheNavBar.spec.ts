import { mount, RouterLinkStub } from "@vue/test-utils";
import { Pinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { createMemoryHistory, createRouter } from "vue-router";
import { Router } from "vue-router";
import { routes } from "../../router";
import { useUsers } from "../../stores/users";
import TheNavbar from "../TheNavbar.vue";

vi.stubGlobal(
	"fetch",
	vi.fn(() => {})
);

describe("TheNavbar", () => {
	let pinia: Pinia;
	let router: Router;

	beforeEach(() => {
		const el = document.createElement("div");
		el.id = "modal";
		document.body.appendChild(el);

		const pinia = createTestingPinia({
			createSpy: vi.fn,
		});
		const router = createRouter({
			history: createMemoryHistory(),
			routes: routes,
		});
	});

	it("renders signin and signup buttons when not authenticaded", () => {
		const wrapper = mount(TheNavbar, {
			globals: {
				plugins: [pinia, router],
				stubs: {
					RouterLink: RouterLinkStub,
				},
			},
		});

		expect(wrapper.find("[data-testid='sign-up'").exists()).toBe(true);
		expect(wrapper.find("[data-testid='sign-in'").exists()).toBe(true);
	});

	it("renders new post and logout buttons when authenticaded", async () => {
		const users = useUsers();
		users.currentUserId = "1";

		const wrapper = mount(TheNavbar, {
			globals: {
				plugins: [pinia, router],
				stubs: {
					RouterLink: RouterLinkStub,
				},
			},
		});
		console.log(wrapper.html());

		expect(wrapper.find("button").text()).toBe("Log Out");
		expect(wrapper.find("routerlink").text()).toBe("New Post");

		await wrapper.find("[data-testid='logout'").trigger("click");

		expect(wrapper.find("[data-testid='sign-up'").exists()).toBe(true);
		expect(wrapper.find("[data-testid='sign-in'").exists()).toBe(true);

		await wrapper.find("[data-testid='sign-in'").trigger("click");

		expect(document.body.querySelector("#signin-form")).toBeTruthy();
	});
});
