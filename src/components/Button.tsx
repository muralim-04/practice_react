

interface Props {
    handleClick: () => void;
    name: string;
}

export default function Button ({handleClick, name}: Props) {
    return (
        <>
            <button onClick={handleClick} className="btn-primary">
                {name}
            </button>
        </>
    )
}