import { defineStore } from 'pinia';
import { httpGet, httpGetAppointments, httpPost, httpDelete, httpPostFindAppointment, httpDeleteAppointment } from '@/utils/http_config.js';
import { mapToTableView as appointmentMapToTableView } from '@/models/appointments/appointment_model';
import { useToast } from 'vue-toastification';

export const useAppointmentStore = defineStore('appointment', {
    state: () => ({
        appointment_list: null,
        loading: false,
        error: null
    }),
    getters:{
        total_appointments: (state) => state.appointment_list ? state.appointment_list.length : 0
    },
    actions: {
        async fetchAppointments(){
            this.loading = true;
            this.error = null;

            const response = await httpGet(httpGetAppointments);
            
            if(response.status === 200){
                this.appointment_list = appointmentMapToTableView(response.data)
            } else {
                console.log(response);
                this.error = response.error['message'];
            }

            this.loading = false;
        },

        async searchAppointments(value) {
            const payload = {
                "full_name": value
            }
        
            const data = await httpPost(httpPostFindAppointment, payload);
            if(data.status === 200){
                return data.data;
            } else {
                useToast().error(data['data']['message'] ?? "Error. Please contact admin.");
            }
        },
        
        async filterByDateAppointments(value) {
            const payload = {
                "date": value
            }
        
            const data = await httpPost(httpPostFindAppointment, payload);
            if(data.status === 200){
                return data.data;
            } else {
                useToast().error(data['data']['message'] ?? "Error. Please contact admin.");
            }
        },
        
        async filterByStatusAppointments(value){
            const payload = {
                "status": value
            }
        
            const data = await httpPost(httpPostFindAppointment, payload);
            if(data.status === 200){
                return data.data;
            } else {
                useToast().error(data['data']['message'] ?? "Error. Please contact admin.");
            }
        },

        async filterAnyAppointments(payload){
            const data = await httpPost(httpPostFindAppointment, payload);
            if(data.status === 200){
                return appointmentMapToTableView(data.data);
            } else {
                useToast().error(data['data']['message'] ?? "Error. Please contact admin.");
            }
        },
        
        async deleteAppointment(value) {
            const payload = {
                "id": value
            }
        
            const data = await httpDelete(httpDeleteAppointment, payload);
            if(data.status === 200){
                useToast().success(data.data['message'] ?? "Appointment successfully deleted.");
                await getAppointments();
            } else {
                useToast().error(data['response']['data']['message'] ??  "Error deleting Appointment.");
            }
        }
    },
}
);