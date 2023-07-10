export default function Default(props){
    return (
        <div className="report-container">
            {props.type === "chat" ? (
                <>
                    <p className="author-name">{props.author}:</p> 
                    <p className="chat-report">
                        {props.message}
                    </p>
                </>
            ) : (
                <p className="log-report">
                    {props.message}
                </p>
            )}
        </div>
    )
}