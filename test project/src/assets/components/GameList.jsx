import axios from 'axios'

const baseUrl = 'http://localhost:3002'   // your server's port — check yours!

export async function getGames(){
    try {
        const res = await axios.get(baseUrl + '/games')
        return res.data
    } catch (error) {
        console.log(error)
    }
}
