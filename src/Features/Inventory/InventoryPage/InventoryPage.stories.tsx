import type { Meta, StoryObj } from "@storybook/react"
import InventoryPage from "./InventoryPage"

const meta = {
    title: 'InventoryPage',
    component: InventoryPage,
    tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
} satisfies Meta<typeof InventoryPage>;

export default meta;

type Story = StoryObj<typeof InventoryPage>;

export const Default = {
    args: {
        // props
    },
} satisfies Story;
