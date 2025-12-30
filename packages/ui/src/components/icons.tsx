export const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 18 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M4.8 14.25L3.75 13.2 7.95 9l-4.2-4.2L4.8 3.75 9 7.95l4.2-4.2 1.05 1.05-4.2 4.2 4.2 4.2-1.05 1.05-4.2-4.2-4.2 4.2z"
			fill="currentColor"
		/>
	</svg>
)

export const SelectedIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 18 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M7.162 13.5L2.888 9.225l1.068-1.069 3.206 3.207 6.882-6.882 1.069 1.069-7.95 7.95z"
			fill="currentColor"
		/>
	</svg>
)
