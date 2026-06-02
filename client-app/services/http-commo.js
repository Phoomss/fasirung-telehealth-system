import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { BASE_URL } from '../constants/config';

const defaultOptions = {
    baseURL: BASE_URL, 
    headers: {
        "Content-Type": "application/json",
    },
};

let instance = axios.create(defaultOptions);

instance.interceptors.request.use(async function (config) {
    const token = await AsyncStorage.getItem("userToken");  
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;
