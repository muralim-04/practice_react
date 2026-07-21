import Button from "../../components/Button";
import { useDefaultStore } from "../../stores/defaultStore";


export default function HomePage () {
    const {age, name, increment, decrement} = useDefaultStore((state) => state)
    
    function handlePlus () {
        increment();
    }

    function handleMinus () {
        decrement();
    }

    return (
    <>
        <h1>{name}, is {age} years old</h1>
        <Button handleClick={handleMinus} name="Minus"/>
        <Button handleClick={handlePlus} name="Plus"/>
    </>
    )
}