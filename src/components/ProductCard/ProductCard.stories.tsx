import type { Meta, StoryObj } from "@storybook/react"
import PorductCard from "./ProductCard"

const meta = {
    title: 'PorductCard',
    component: PorductCard,
    tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
} satisfies Meta<typeof PorductCard>;

export default meta;

type Story = StoryObj<typeof PorductCard>;

export const Default = {
    args: {
        // props
    },
} satisfies Story;
