import { defineStore } from 'pinia';
import { httpGet, httpPost, httpDelete, httpPatients, httpPostFindPatient } from '@/utils/http_config.js';
import { mapToTableView as patientMapToTableView } from '@/models/patients/patient_model';
import { useToast } from 'vue-toastification';

export const usePatientStore = defineStore('patient', {
    state: () => ({
        patients_list: null,
        loading: false,
        error: null
    }),
    getters:{
        total_patients: (state) => state.patients_list ? state.patients_list.length : 0
    },
    actions: {
        async fetchPatients(){
            this.loading = true;
            this.error = null;

            const response = await httpGet(httpPatients);
            
            if(response.status === 200){
                this.patients_list = patientMapToTableView(response.data)
            } else {
                console.log(response);
                this.error = response.error['message'];
            }

            this.loading = false;
        },

        async searchPatient(value) {
            const payload = {
                "full_name": value
            }
        
            const data = await httpPost(httpPostFindPatient, payload);
            if(data.status === 200){
                return data.data;
            } else {
                useToast().error(data['data']['message'] ?? "Error. Please contact admin.");
            }
        },
        
        async deletePatient(value){
            const payload = {
                "id": value
            }
        
            const data = await httpDelete(httpPatients, payload);
            if(data.status === 200){
                useToast().success(data.data['message'] ?? "Patient successfully deleted.");
                await getPatients();
            } else {
                useToast().error(data['data']['message'] ?? "Error deleting Patient.");
            }
        }
    },
}

);