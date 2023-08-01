export default function ShowScoreboard(props){

    const userName = props.username
    const status = props.status

    return (
        <>
            <div className="scoreboard">
                {/* <div className="title-container"> */}
                    <h1>{userName.toUpperCase()}</h1>
                    <h2>{status.toUpperCase()}</h2>
                {/* </div> */}
            </div>
        </>
    )
}