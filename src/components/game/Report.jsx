export default function Default(props){

    const titleText = () => {
        if(props.type === "chat"){
            return `${props.author} escreveu isso às ${props.hour}.`
        } else {
            return `${props.message} às ${props.hour}`
        }
    }

    return (
        <div className="report-container" title={titleText()}>
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