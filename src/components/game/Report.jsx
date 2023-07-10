export default function Default(props){
    return (
        <div className="report-area">
            {props.type === "chat" ? (
                <p className="chat-report">
                    <b>{props.author}:</b> <br />
                    {props.message}
                </p>
            ) : (
                <p className="game-report">
                    {props.message}
                </p>
            )}
        </div>
    )
}