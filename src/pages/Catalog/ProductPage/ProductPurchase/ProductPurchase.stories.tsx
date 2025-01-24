import type { Meta, StoryObj } from "@storybook/react"
import ProductPurshase from "./ProductPurchase"

const meta = {
    title: 'ProductPurshase',
    component: ProductPurshase,
    tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
} satisfies Meta<typeof ProductPurshase>;

export default meta;

type Story = StoryObj<typeof ProductPurshase>;

export const Default = {
    args: {
        // props
    },
} satisfies Story;
