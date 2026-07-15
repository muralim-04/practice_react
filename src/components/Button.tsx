interface Props {
    handleClick: () => void;
    name: string;
}

export default function Button ({handleClick, name}: Props) {
    return (
        <>
            <button     
                onClick={handleClick} 
                style={{
                padding: '8px 16px',
                backgroundColor: '#0070f3',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
                }}>
            {name}
            </button>
        </>
    )
}