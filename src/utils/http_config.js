import axios from "axios";
import { useToast } from 'vue-toastification';
import  router from '@/router';

const getAccessToken = () => localStorage.getItem('access');
const toast = useToast();


export const headers = () => ({
    headers: {
        'Authorization': `Bearer ${getAccessToken()}`
    }
});


export const BASEURL = "http://127.0.0.1:8000";

export const httpGet = async (endpoint) => {
    try{
        const response = await axios.get(endpoint, headers());
        return response.data;
    }catch(error){
        if(error.status == 401){
            logout();
        } else {
            console.error(error);
            return error.data;
        }
    }
}

export const httpPost = async (endpoint, payload) => {
    try{
        const response = await axios.post(endpoint, payload ,headers());
        return response;
    }catch(error){
        if(error.status == 401){
            logout();
        } else {
            console.error(error);
            return error;
        }
    }
}

export const httpPatch = async (endpoint, payload) => {
    try{
        const response = await axios.patch(endpoint, payload, headers());
        return response;
    }catch(error){
        if(error.status == 401){
            logout();
        } else {
            console.error(error);
            return error.data;
        }
    }
}

export const httpDelete = async (endpoint, payload) => {
    console.log(headers());
    try{
        const response = await axios.delete(endpoint, {
            data: payload,
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        });
        return response;
    }catch(error){
        if(error.status == 401){
            logout();
        } else {
            console.error(error);
            return error.data;
        }
    }
}


export const logout = async () => {
    const httpLogout = `${BASEURL}/api/auth/logout/`;

    const refresh = localStorage.getItem('refresh');
    const payload = {"refresh": refresh};
    
    const logoutFunction = (value) => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        
        router.push('/');
    }

    await axios.post(httpLogout, payload, headers)
        .then(function (response) {
            logoutFunction(response);
        })
        .catch(function (error) {
            if(error.status == 401){
                logoutFunction(error);
                console.log(error.status);

                toast.warning("Successfully logged out.");
                console.log(value);
            } else {
                logoutFunction(error);
                toast.warning("Logged out.");
                console.log(error);
            }
        });
}
