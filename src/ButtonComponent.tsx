import {Button} from "@mui/material";


type ButtonPropsType = {
	title?: string
	onClick?:()=> void
	className?: string
	variant?: 'contained'
}

export const ButtonComponent = (props: ButtonPropsType) => {

	return (
		<Button variant={props.variant} className={props.className} onClick={props.onClick}>
			{props.title}
		</Button>

	)
}
