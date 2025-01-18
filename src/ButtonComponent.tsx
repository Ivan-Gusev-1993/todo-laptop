import {Button} from "@mui/material";


type ButtonPropsType = {
	title?: string
	onClick?:()=> void
	className?: string
}

export const ButtonComponent = (props: ButtonPropsType) => {
	console.log(props.title)
	return (
		<button className={props.className} onClick={props.onClick}>
			{props.title}
		</button>

	)
}
