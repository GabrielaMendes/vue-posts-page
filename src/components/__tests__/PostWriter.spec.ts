import { mount } from "@vue/test-utils";
import { Pinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { createMemoryHistory, createRouter } from "vue-router";
import { Router } from "vue-router";
import { routes } from "../../router";
import PostWriter from "../PostWriter.vue";
import { useUsers } from "../../stores/users";

describe("PostWriter", () => {
	let pinia: Pinia;
	let router: Router;

	beforeEach(() => {
		const pinia = createTestingPinia({
			createSpy: vi.fn,
		});

		const user = useUsers();
		user.currentUserId = "1";

		const router = createRouter({
			history: createMemoryHistory(),
			routes: routes,
		});
	});

	it("writes a post using markdown", async () => {
		return new Promise<void>(async (resolve) => {
			const wrapper = mount(PostWriter, {
				globals: {
					plugins: [pinia, router],
				},
				props: {
					post: {
						id: "1",
						title: "",
						authorId: "1",
						created: "",
						markdown: "",
						html: "",
					},
				},
			});

			wrapper.find<HTMLDivElement>("#contenteditable").element.innerText =
				"# Title";

			await wrapper.find("#contenteditable").trigger("input");

			setTimeout(async () => {
				await wrapper.find("#submit").trigger("click");
				console.log(wrapper.html());
        expect(wrapper.emitted().submit[0]).toMatchInlineSnapshot(`
          [
            {
              "authorId": "1",
              "created": "",
              "html": "<h1 id=\\"title\\">Title</h1>
          ",
              "id": "1",
              "markdown": "# Title",
              "title": "",
            },
          ]
        `);
				resolve();
			}, 300);
		});
	});
});
