type ButtonPropsType = {
	title: string
	onClick?:()=> void
	className?: string
}

export const Button = (props: ButtonPropsType) => {
	console.log(props.title)
	return (
		<button className={props.className} onClick={props.onClick}>
			{props.title}
		</button>

	)
}
