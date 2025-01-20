import type { Meta, StoryObj } from "@storybook/react"
import ProductSearchCriteria from "./ProductSearchCriteria"

const meta = {
    title: 'ProductSearchCriteria',
    component: ProductSearchCriteria,
    tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
} satisfies Meta<typeof ProductSearchCriteria>;

export default meta;

type Story = StoryObj<typeof ProductSearchCriteria>;

export const Default = {
    args: {
        // props
    },
} satisfies Story;
