class APIService {
    static baseURL = "http://localhost:3001"

    static async get(endPoint){
        try {
            const response = await fetch(`${this.baseURL}${endPoint}`, {
                method: 'GET'
              })
                /* .then(response => {
                  // Manipule a resposta
                })
                .catch(error => {
                  // Lide com erros
                });*/
              return response

        } catch (error) {
            console.log("Erro ao buscar dado(s) do servidor.", error)
        }

    }

    static async post(endPoint, data){
        try {
            const response = await fetch(`${this.baseURL}${endPoint}`, {
              method: 'POST',
              body: JSON.stringify(data), // Opcional: envie dados no corpo da solicitação
              headers: {
                'Content-Type': 'application/json' // Opcional: especifique o tipo de conteúdo do corpo da solicitação
              }
            })
              /* .then(response => {
                // Manipule a resposta
              })
              .catch(error => {
                // Lide com erros
              }); */
              return response

        } catch (error) {
            console.log("Erro ao enviar dado(s) ao servidor.", error)
        }
    }

}

export default APIService