import axios from 'axios'

export default axios.create({
    baseURL: 'https://reactquzi-default-rtdb.firebaseio.com/'
})