import HourDefaultModel from "../../Utils/HourDefaultModel"

export default function Default({data}){

    const titleText = () => {
        if(data.type === "chat"){
            return `${data.author} escreveu isso ${HourDefaultModel(data.hour)}.`
        } else {
            return `${data.message} ${HourDefaultModel(data.hour)}`
        }
    }

    return (
        <div className="report-container" title={titleText()}>
            {data.type === "chat" ? (
                <>
                    <p className={`author-name ${data.isYou && "you"}`}>{data.author}:</p> 
                    <p className={`chat-report ${data.isYou && "you"}`}>
                        {data.message}
                    </p>
                </>
            ) : (
                <p className="log-report">
                    {data.message}
                </p>
            )}
        </div>
    )
}