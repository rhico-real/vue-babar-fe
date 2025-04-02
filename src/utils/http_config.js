import axios from "axios";
import { useToast } from 'vue-toastification';
import  router from '@/router';

const access = localStorage.getItem('access');
const toast = useToast();


export const headers = {
    headers: {
        'Authorization': `Bearer ${access}`
    }
}

export const BASEURL = "http://127.0.0.1:8000";

export const httpGet = async (endpoint) => {
    try{
        console.log(headers);

        const response = await axios.get(endpoint, headers);
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

export const logout = async () => {
    const httpLogout = `${BASEURL}/api/auth/logout/`;

    const refresh = localStorage.getItem('refresh');
    const payload = {"refresh": refresh};
    
    const logoutFunction = (value) => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        
        router.push('/');
        toast.success("Successfully logged out.");
        console.log(value);
    }

    await axios.post(httpLogout, payload, headers)
        .then(function (response) {
            logoutFunction(response);
        })
        .catch(function (error) {
            if(error.status == 401){
                logoutFunction(error);
                console.log(error.status);
            } else {
                toast.error("Error logging out. Please contact administrator.")
                console.log(error);
            }
        });
}
