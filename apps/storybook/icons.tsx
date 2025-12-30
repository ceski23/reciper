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

export const ImageIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}
	>
		<rect
			width="18"
			height="18"
			x="3"
			y="3"
			rx="2"
			ry="2"
		/>
		<circle
			cx="9"
			cy="9"
			r="2"
		/>
		<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
	</svg>
)

export const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 40 40"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M13.334 30L20 24.917 26.667 30l-2.5-8.25L30.833 17h-8.166L20 8.333 17.334 17H9.167l6.667 4.75-2.5 8.25zM20 36.667c-2.305 0-4.472-.438-6.5-1.313-2.028-.875-3.791-2.062-5.291-3.562-1.5-1.5-2.688-3.264-3.563-5.292S3.333 22.306 3.333 20c0-2.305.438-4.472 1.313-6.5.875-2.028 2.063-3.792 3.563-5.292s3.263-2.687 5.291-3.562c2.028-.875 4.195-1.313 6.5-1.313 2.306 0 4.472.438 6.5 1.313 2.028.875 3.792 2.062 5.292 3.562s2.687 3.264 3.562 5.292 1.313 4.195 1.313 6.5c0 2.306-.438 4.472-1.313 6.5-.875 2.028-2.062 3.792-3.562 5.292s-3.264 2.687-5.292 3.562-4.194 1.313-6.5 1.313z"
			fill="currentColor"
		/>
	</svg>
)
