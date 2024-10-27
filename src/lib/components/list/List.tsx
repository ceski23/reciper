import * as Ariakit from '@ariakit/react'
import { styled } from '@macaron-css/react'
import { useElementScrollRestoration } from '@tanstack/react-router'
import { type ComponentProps, forwardRef, type FunctionComponent } from 'react'
import { VList } from 'virtua'

const OptionalSelectionProvider: FunctionComponent<Pick<ComponentProps<typeof List>, 'selectionStore' | 'children'>> = ({
	selectionStore,
	children,
}) =>
	selectionStore
		? (
			<Ariakit.CheckboxProvider
				store={selectionStore}
				children={children}
			/>
		)
		: children

export const List = forwardRef<
	HTMLDivElement,
	ComponentProps<typeof NormalList> & {
		virtual?: Omit<ComponentProps<typeof VList>, 'children'> | true
		scrollRestorationId?: string
		selectionStore?: Ariakit.CheckboxStore<Array<string>>
	}
>(({
	children,
	virtual,
	scrollRestorationId,
	selectionStore,
	...props
}, ref) => {
	const scrollEntry = useElementScrollRestoration({ id: scrollRestorationId ?? '' })

	return (
		<OptionalSelectionProvider selectionStore={selectionStore}>
			<Ariakit.CompositeProvider>
				<Ariakit.Composite
					render={virtual
						? (
							<NormalStyledList
								{...props}
								ref={ref}
							>
								<VirtualList
									{...(virtual === true ? {} : virtual)}
									ref={handle => scrollEntry && handle?.scrollTo(scrollEntry.scrollY)}
									data-scroll-restoration-id={scrollRestorationId}
								>
									{children}
								</VirtualList>
							</NormalStyledList>
						)
						: (
							<NormalList
								{...props}
								ref={handle => {
									typeof ref === 'function' ? ref(handle) : ref && (ref.current = handle)
									scrollEntry && handle?.scrollTo({ top: scrollEntry.scrollY })
								}}
								data-scroll-restoration-id={scrollRestorationId}
							>
								{children}
							</NormalList>
						)}
				/>
			</Ariakit.CompositeProvider>
		</OptionalSelectionProvider>
	)
})

const NormalList = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
	},
})

const NormalStyledList = styled(NormalList, {
	base: {
		flex: 1,
	},
})

const VirtualList = styled(VList, {
	base: {
		height: '100%',
	},
})
