import type { Meta, StoryObj } from "@storybook/react"
import InventoryTable from "./InventoryTable"

const meta = {
    title: 'InventoryTable',
    component: InventoryTable,
    tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
} satisfies Meta<typeof InventoryTable>;

export default meta;

type Story = StoryObj<typeof InventoryTable>;

export const Default = {
    args: {
        // props
    },
} satisfies Story;
