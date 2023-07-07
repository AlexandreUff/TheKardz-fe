const SessionService = {
    save:(key, value) => {
        try{
            sessionStorage.setItem(key, JSON.stringify(value))
        } catch(e){
            console.log("Erro ao salvar dado.", e)
        }
    },
    get:(key) => {
        try {
            const data = sessionStorage.getItem(key)
            return JSON.parse(data)
        } catch(e){
            console.log("Erro ao ler dado.", e)
        }
    },
    remove: (key) => {
        try {
            sessionStorage.removeItem(key)
        } catch(e){
            console.log("Erro ao remover dado.", e)
        }
    }
}

export default SessionService