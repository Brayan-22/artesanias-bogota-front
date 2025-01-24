import type { Meta, StoryObj } from "@storybook/react"
import LoginPage from "./LoginPage"

const meta = {
    title: 'LoginPage',
    component: LoginPage,
    tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
} satisfies Meta<typeof LoginPage>;

export default meta;

type Story = StoryObj<typeof LoginPage>;

export const Default = {
    args: {
        // props
    },
} satisfies Story;
