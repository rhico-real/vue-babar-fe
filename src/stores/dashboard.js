import { defineStore } from 'pinia';
import { httpGet, httpGetAppointments, httpPatients, httpGetAllPaymentAppointments } from '@/utils/http_config.js';
import { mapToTableView as appointmentMapToTableView } from '@/models/appointments/appointment_model';
import { mapToTableView as patientMapToTableView } from '@/models/patients/patient_model';
import { mapToTableView as paymentMapToTableView } from '@/models/payments/payment_model';

export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
        appointment_list: null,
        patients_list: null,
        payment_list: null,
        loading: false,
        error: null
    }),
    getters:{
        total_appointments: (state) => state.appointment_list ? state.appointment_list.length : 0,
        total_patients: (state) => state.patients_list ? state.patients_list.length : 0,
        total_payments: (state) => state.payment_list ? state.payment_list.length : 0
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

        async fetchPayments(){
            this.loading = true;
            this.error = null;

            const response = await httpGet(httpGetAllPaymentAppointments);
            
            if(response.status === 200){
                this.payment_list = paymentMapToTableView(response.data)
            } else {
                console.log(response);
                this.error = response.error['message'];
            }

            this.loading = false;
        }
    },
}
);