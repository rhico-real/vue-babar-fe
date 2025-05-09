<script setup lang="ts">
import Navigation from '@/components/dashboard/Navigation.vue';
import PaymentAppointmentDialog from '@/components/dashboard/dialogs/payment_appointments/PaymentAppointmentDialog.vue'
import ReferenceCodeDialog from '@/components/dashboard/dialogs/payment_appointments/ReferenceCodeDialog.vue'
import { httpGet, httpPost, httpGetAllPaymentAppointments, httpPostFindPayment } from '@/utils/http_config.js';
import { useToast } from 'vue-toastification';
import { ref, onMounted } from 'vue';
import { mapToTableView as paymentMapToTableView } from '@/models/payments/payment_model';
import TableView from '@/components/dashboard/TableView.vue';
import { DropdownOption } from '@/components/dropdown/dropdownoptions';
import { usePaymentAppointmentStore } from '@/stores/payment_appointment';

const toast = useToast();
const paymentAppointmentStore = usePaymentAppointmentStore();

const paymentsList = ref([]);

onMounted( async () => {
    // await getPayments();
    await paymentAppointmentStore.fetchPayment();
    paymentsList.value = paymentAppointmentStore.payment_list;
});


const getPayments = async () => {
    const data = await httpGet(httpGetAllPaymentAppointments);
    paymentsList.value = paymentMapToTableView(data.data);
}

const searchPayment = async (value) => {
    const payload = {
        "reference_code": value
    }

    const data = await httpPost(httpPostFindPayment, payload);
    if(data.status === 200){
        return data.data;
    } else {
        toast.error(data['data']['message'] ?? "Error. Please contact admin.");
    }
}

const filterByStatusPaymentAppointment = async (value) => {
    const payload = {
        "status": value
    }

    const data = await httpPost(httpPostFindPayment, payload);
    if(data.status === 200){
        return data.data;
    } else {
        toast.error(data['data']['message'] ?? "Error. Please contact admin.");
    }
}

const filterByDateAppointments = async (value) => {
    const payload = {
        "updated_at": value
    }

    const data = await httpPost(httpPostFindPayment, payload);
    if(data.status === 200){
        return data.data;
    } else {
        toast.error(data['data']['message'] ?? "Error. Please contact admin.");
    }
}

</script>

<template>
    <Navigation>
        <div class="h-full bg-dashboard-background px-14 py-12">
            <!-- title -->
            <h1 class="text-3xl font-bold mb-10">Payments</h1>
                    
            <!-- table -->
            <TableView 
            class="mt-20 h-full" 
            title="Payments" 
            :items="paymentsList" 
            :searchbarFunction="searchPayment" 
            :parser="paymentMapToTableView" 
            :hasDateFilter="true" 
            :hasPaymentStatusFilter="true"
            :dropdownOption="DropdownOption.PAYMENT_STATUS"
            :filterByStatusFunction="filterByStatusPaymentAppointment"
            :filterByDateFunction="filterByDateAppointments"
            >
                <!-- Custom reference code column -->
                <template #column:reference_code="{ item, value }">
                    <ReferenceCodeDialog 
                        :referenceCode="value" 
                        :paymentData="item"
                    />
                </template>
                
                <!-- Actions: Edit -->
                <template #customHeader>
                    <th scope="col" class="px-6 py-3">
                        Actions
                    </th>
                </template>
                <template #customrow="{ item }">
                    <td class="px-6 py-4">
                        <PaymentAppointmentDialog 
                            title="Edit Payment"
                            :payment="item"
                            :isEdit="true",
                            @submitted="getPayments"
                        >
                            <template #triggerbutton>
                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </template>
                        </PaymentAppointmentDialog>
                    </td>
                </template>
            </TableView>

           
        </div>
    </Navigation>
    
</template>
