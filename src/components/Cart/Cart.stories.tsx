import type { Meta, StoryObj } from "@storybook/react"
import Cart from "./Cart"

const meta = {
    title: 'Cart',
    component: Cart,
    tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
} satisfies Meta<typeof Cart>;

export default meta;

type Story = StoryObj<typeof Cart>;

export const Default = {
    args: {
        // props
    },
} satisfies Story;
