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


// export const BASEURL = "https://radsoftph.com";
export const BASEURL = "http://127.0.0.1:8000";

export const httpGet = async (endpoint) => {
    try{
        const response = await axios.get(endpoint, headers());
        return response.data;
    }catch(error){
        if(error.status == 401){
            logout();
        } else {
            console.error('Error:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            });
            return {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            };
        }
    }
}

export const httpPost = async (endpoint, payload, hasHeaders = true) => {
    try {
        const config = hasHeaders ? headers() : undefined;
        const response = await axios.post(endpoint, payload, config);
        return response;
    } catch (error) {
        if (error.status === 401) {
            logout();
        } else {
            console.error('Error:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            });
            return {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            };
        }
    }
};

export const httpPatch = async (endpoint, payload) => {
    try{
        const response = await axios.patch(endpoint, payload, headers());
        return response;
    }catch(error){
        if(error.status == 401){
            logout();
        } else {
            console.error('Error:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            });
            return {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            };
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
            console.error('Error:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            });
            return {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            };
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
                if(getAccessToken()){
                    logoutFunction(error);
                    toast.warning("Logged out.");
                    console.log(error);
                }
            }
        });
}

/// Endpoints:
// Appointments
export const httpUpdateAppointment = `${BASEURL}/api/update_appointment/`;
export const httpAddAppointment = `${BASEURL}/api/add_appointment/`;
export const httpGetAppointments = `${BASEURL}/api/get_appointments/`;
export const httpPostFindAppointment = `${BASEURL}/api/filter_appointment/`;
export const httpDeleteAppointment = `${BASEURL}/api/delete_appointment/`;
export const httpFindAppointmentByReference = `${BASEURL}/api/find_appointment_by_reference/`;

// Payment Appointments
export const httpPayViaReferenceNumber = `${BASEURL}/api/pay_via_reference_number/`;
export const httpPayViaScreenshot= `${BASEURL}/api/pay_via_screenshot/`;
export const httpGetAllPaymentAppointments = `${BASEURL}/api/get_all_payment_appointments/`;
export const httpPostFindPayment = `${BASEURL}/api/filter_payment_appointment/`;


// Patients
export const httpPatients = `${BASEURL}/api/patients/`;
export const httpPostFindPatient = `${BASEURL}/api/filter_patient/`;
export const httpUploadPhotoPatient = `${BASEURL}/api/upload_patient_photo/`;

// Profile
export const httpGetProfile = `${BASEURL}/api/auth/get_profile/`;
export const httpUploadProfilePhoto = `${BASEURL}/api/auth/upload_profile_photo/`;
export const httpEditProfile = `${BASEURL}/api/auth/edit_profile/`;
