const { default: axios } = require("axios");
import buildURL from './../../node_modules/axios/lib/helpers/buildURL';

const axiosClient=axios.create({
     baseURL:'http://localhost:1337/api'
})

const getCategory=()=>axiosClient.get('/categories?populate=*');
export default{
     getCategory
}