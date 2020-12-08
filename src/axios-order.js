import axios from 'axios'

const instanse = axios.create({
    baseURL:'https://burger-builder-app-87675-default-rtdb.firebaseio.com/'
}); 

export default instanse