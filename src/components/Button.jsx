export default function Button(props){
    return (
        <>
            <button title={props.title} onClick={props.eventClick}>
                {props.loading ? "XXXX" : props.value}
            </button>
        </>
    )
}