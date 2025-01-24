import type { Meta, StoryObj } from "@storybook/react"
import ProductPage from "./ProductPage"

const meta = {
    title: 'ProductPage',
    component: ProductPage,
    tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
} satisfies Meta<typeof ProductPage>;

export default meta;

type Story = StoryObj<typeof ProductPage>;

export const Default = {
    args: {
        // props
    },
} satisfies Story;
