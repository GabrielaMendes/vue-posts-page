import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import FormInput from "../FormInput.vue";
import { computed, defineComponent, ref } from "vue";

describe("FormInput", () => {
	it("tests validation", async () => {
		const Parent = defineComponent({
			components: { FormInput },
			template: `
      <FormInput
        name="foo"
        type="input"
        :status="status"
        v-model="formValue"
      />`,
			setup() {
				const formValue = ref("foo");
				const status = computed(() => {
					if (formValue.value.length > 5) {
						return {
							valid: true,
						};
					} else {
						return {
							valid: false,
							message: "error",
						};
					}
				});

        return { formValue, status }
			},
		});

    const wrapper = mount(Parent)

    expect(wrapper.find(".is-danger").text()).toBe('error');

    await wrapper.find('input').setValue('fooBar')

    expect(wrapper.find(".is-danger").isVisible()).toBe(false);
	});

	it("renders some error", () => {
		const wrapper = mount(FormInput, {
			props: {
				name: "foo",
				type: "input",
				modelValue: "bar",
				status: {
					valid: false,
					message: "error",
				},
			},
		});

		expect(wrapper.find(".is-danger").isVisible()).toBe(true);
	});

	it("renders no error", () => {
		const wrapper = mount(FormInput, {
			props: {
				name: "foo",
				type: "input",
				modelValue: "bar",
				status: {
					valid: true,
					message: "error",
				},
			},
		});

		expect(wrapper.find(".is-danger").isVisible()).toBe(false);
	});
});
