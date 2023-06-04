import { mount } from "@vue/test-utils";
import { Pinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { createMemoryHistory, createRouter } from "vue-router";
import { Router } from "vue-router";
import { routes } from "../../router";
import UserForm from "../UserForm.vue";

describe("UserForm", () => {
	let pinia: Pinia;
	let router: Router;

	beforeEach(() => {
		const pinia = createTestingPinia({
			createSpy: vi.fn,
		});
		const router = createRouter({
			history: createMemoryHistory(),
			routes: routes,
		});
	});

	it("runs through the workflow", async () => {
		const wrapper = mount(UserForm, {
			globals: {
				plugins: [pinia, router],
			},
		});

		const btn = wrapper.find("button");
		expect(btn.element.disabled).toBe(true);

		expect(
			wrapper.find("[data-testid='username']").find(".is-danger").text()
		).toBe("This field is required");
		expect(
			wrapper.find("[data-testid='password']").find(".is-danger").text()
		).toBe("This field is required");

		await wrapper.find("#username").setValue("user");
		await wrapper.find("#password").setValue("pass");

		expect(
			wrapper.find("[data-testid='username']").find(".is-danger").text()
		).toBe("This field's length must be between 5 and 10");
		expect(
			wrapper.find("[data-testid='password']").find(".is-danger").text()
		).toBe("This field's length must be between 8 and 30");

		await wrapper.find("#username").setValue("username");
		await wrapper.find("#password").setValue("password123");

		expect(
			wrapper.find("[data-testid='username']").find(".is-danger").isVisible()
		).toBe(false);
		expect(
			wrapper.find("[data-testid='password']").find(".is-danger").isVisible()
		).toBe(false);

		expect(btn.element.disabled).toBe(false);

		wrapper.find("form").trigger("submit.prevent");
		expect((wrapper.emitted().submit[0] as any)[0].newUser).toEqual({
			username: "username",
			password: "password123",
		});
	});
});
