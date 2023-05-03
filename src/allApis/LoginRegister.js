const { useQuery } = require("react-query")

const resisterUser=({body})=> {
    const { isLoading, error, data } = useQuery('resisterUser', () => {
       axios.post('/user', body)
    })
}