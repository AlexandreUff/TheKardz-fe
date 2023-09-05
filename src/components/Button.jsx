import Loading from "./game/Loading";

export default function Button(props){
    return (
        <>
            <button title={props.title} onClick={props.eventClick}>
                {props.loading ? <Loading /> : props.value}
            </button>
        </>
    )
}