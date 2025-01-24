import type { Meta, StoryObj } from "@storybook/react"
import ProductDetails from "./ProductDetails"

const meta = {
    title: 'ProductDetails',
    component: ProductDetails,
    tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
} satisfies Meta<typeof ProductDetails>;

export default meta;

type Story = StoryObj<typeof ProductDetails>;

export const Default = {
    args: {
        // props
    },
} satisfies Story;
