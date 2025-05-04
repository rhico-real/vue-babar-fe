import { defineStore } from 'pinia';
import { httpGet, httpGetAllPaymentAppointments } from '@/utils/http_config.js';
import { mapToTableView as paymentMapToTableView } from '@/models/payments/payment_model';

export const usePaymentAppointmentStore = defineStore('paymentAppointment', {
    state: () => ({
        payment_list: null,
        loading: false,
        error: null
    }),
    getters:{
        payment: (state) => state.payment
    },
    actions: {
        async fetchPayment(){
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