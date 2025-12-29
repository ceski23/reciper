import { definePreview } from '@storybook/react-vite'
import { defaultDarkThemeClass, defaultLightThemeClass } from '@repo/ui/theme'
import addonA11y from '@storybook/addon-a11y'
import addonDocs from '@storybook/addon-docs'
import { useDarkMode } from '@vueless/storybook-dark-mode'
import { themes } from 'storybook/theming'
import { DocsContainer } from '@storybook/addon-docs/blocks'
import type { ComponentProps } from 'react'
import '@repo/ui/fonts'
import '../global.css'
import { Tooltip } from '@repo/ui/components/tooltip'

const ThemedDocsContainer = ({ children, ...props }: ComponentProps<typeof DocsContainer>) => {
	const isDarkMode = useDarkMode()

	return (
		<DocsContainer
			{...props}
			theme={isDarkMode ? themes.dark : themes.light}
		>
			{children}
		</DocsContainer>
	)
}

export default definePreview({
	addons: [addonA11y(), addonDocs()],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		darkMode: {
			darkClass: defaultDarkThemeClass,
			lightClass: defaultLightThemeClass,
			stylePreview: true,
		},
		docs: {
			container: ThemedDocsContainer,
		},
	},
	tags: ['autodocs'],
	decorators: [
		Story => (
			<Tooltip.Provider closeDelay={1500}>
				<Story />
			</Tooltip.Provider>
		),
	],
})
