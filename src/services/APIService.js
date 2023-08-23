class APIService {
    static baseURL = "https://the-kardz-be.vercel.app:3001"

    static async get(endPoint){
        try {
            let response
            await fetch(`${this.baseURL}${endPoint}`, {
                method: 'GET'
              })
                .then(response => {
                  return response.json()
                })
                .then(data => {
                  response = data
                })
                
            return response

        } catch (error) {
            console.log("Erro ao buscar dado(s) do servidor.", error)
        }

    }

    static async post(endPoint, data){
        try {
            let response
            await fetch(`${this.baseURL}${endPoint}`, {
              method: 'POST',
              body: JSON.stringify(data),
              headers: {
                'Content-Type': 'application/json'
              }
            })
              .then(async response => {
                return response.json()
              }).then(data => {
                response = data
              })
              
            return response

        } catch (error) {
            console.log("Erro ao enviar dado(s) ao servidor.", error)
        }
    }

    static async put(endPoint, data){
      try {
        let response
            await fetch(`${this.baseURL}${endPoint}`, {
              method: 'PUT',
              body: JSON.stringify(data),
              headers: {
                'Content-Type': 'application/json'
              }
            })
              .then(async response => {
                return response.json()
              }).then(data => {
                response = data
              })
              
            return response
      } catch (error) {
        console.log("Erro ao atualizar dado(s) no servidor.", error)
      }
    }

    static async delete(endPoint, data){
      try {
        let response
            await fetch(`${this.baseURL}${endPoint}${data}`, {
                method: 'DELETE'
              })
                .then(response => {
                  return response.json()
                })
                .then(data => {
                  response = data
                })
                
            return response
      } catch (error) {
        console.log("Erro ao remover dado(s) do servidor.", error)
      }
    }

}

export default APIService