import { useState } from "react"
import type { Data } from "../../types/DefaultData"
import Button from "../../components/Button";

interface HomePageProps {
    data: Data
}

export default function HomePage ({ data }: HomePageProps) {
    const [age, setAge] = useState(data.age);
    
    function handlePlus () {
        setAge(age + 1);
    }

    function handleMinus () {
        setAge(age - 1);
    }

    return (
    <>
        <h1>{data.name}, is {age} years old</h1>
        <Button handleClick={handleMinus} name="Minus"/>
        <Button handleClick={handlePlus} name="Plus"/>
    </>
    )
}