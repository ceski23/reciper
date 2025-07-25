import * as Ariakit from '@ariakit/react'
import { styled } from '@macaron-css/react'
import { useElementScrollRestoration } from '@tanstack/react-router'
import { type ComponentProps, type FunctionComponent, type Ref, useCallback, useRef } from 'react'
import { VList, type VListHandle } from 'virtua'

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

type ListProps = ComponentProps<typeof NormalList> & {
	virtual?: Omit<ComponentProps<typeof VList>, 'children'> | true
	scrollRestorationId?: string
	selectionStore?: Ariakit.CheckboxStore<Array<string>>
	onIsScrolledChange?: (isScrolled: boolean) => void
	ref?: Ref<HTMLDivElement>
}

export const List = ({
	children,
	virtual,
	scrollRestorationId,
	selectionStore,
	onIsScrolledChange,
	ref,
	...props
}: ListProps) => {
	const scrollEntry = useElementScrollRestoration({ id: scrollRestorationId ?? '' })
	const virtualListRefCallback = useCallback((handle: VListHandle | null) => scrollEntry && handle?.scrollTo(scrollEntry.scrollY), [scrollEntry])
	const isScrolled = useRef(false)

	const handleScrollOffset = useCallback((offset: number) => {
		const isScrolledNow = offset > 0

		if (isScrolled.current !== isScrolledNow) {
			isScrolled.current = isScrolledNow
			onIsScrolledChange?.(isScrolledNow)
		}
	}, [onIsScrolledChange])

	const listCallbackRef = useCallback((handle: HTMLDivElement | null) => {
		typeof ref === 'function' ? ref(handle) : ref && (ref.current = handle)
		scrollEntry && handle?.scrollTo({ top: scrollEntry.scrollY })
	}, [ref, scrollEntry])

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
									ref={virtualListRefCallback}
									data-scroll-restoration-id={scrollRestorationId}
									onScroll={handleScrollOffset}
								>
									{children}
								</VirtualList>
							</NormalStyledList>
						)
						: (
							<NormalList
								{...props}
								ref={listCallbackRef}
								data-scroll-restoration-id={scrollRestorationId}
								onScroll={event => handleScrollOffset(event.currentTarget.scrollTop)}
							>
								{children}
							</NormalList>
						)}
				/>
			</Ariakit.CompositeProvider>
		</OptionalSelectionProvider>
	)
}

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
