type ButtonPropsType = {
	title: string
	onClick?:()=> void
	className?: string
}

export const Button = (props: ButtonPropsType) => {
	return (
		<button className={props.className} onClick={props.onClick}>
			{props.title}
		</button>
	)
}
