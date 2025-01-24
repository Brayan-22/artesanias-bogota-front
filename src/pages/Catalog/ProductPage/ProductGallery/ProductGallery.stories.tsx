import type { Meta, StoryObj } from "@storybook/react"
import ProductGallery from "./ProductGallery"

const meta = {
    title: 'ProductGallery',
    component: ProductGallery,
    tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
} satisfies Meta<typeof ProductGallery>;

export default meta;

type Story = StoryObj<typeof ProductGallery>;

export const Default = {
    args: {
        // props
    },
} satisfies Story;
