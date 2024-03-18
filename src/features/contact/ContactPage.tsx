//import { CounterState, decrement, increment } from "./maintainanceReducer"
import { Typography, ButtonGroup, Button } from "@mui/material";
import { useAppSelector } from "../../app/store/configureStore";
import { useDispatch } from "react-redux";
import { decreament, increament } from "./maintainSlice";

export default function ContactPage() {
  const dispatch = useDispatch()
    const {data, title} = useAppSelector(state => state.counter)
    
    return (
        <>
            <Typography gutterBottom variant='h3'>{title}</Typography>
            <Typography gutterBottom variant='h4'>Our system is still maintaining</Typography>
            <Typography variant='h5'>data from state: {data}</Typography>
            <ButtonGroup>
                <Button onClick={() => dispatch(decreament(1))} variant='contained' color='primary'>Payload -1</Button>
                <Button onClick={() => dispatch(increament(1))} variant='contained' color='secondary'>Payload +1</Button>
                <Button onClick={() => dispatch(increament(10))} variant='contained' color='error'>+10</Button>
            </ButtonGroup>
        </>

    )
}
