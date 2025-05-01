<script setup lang="ts">
import Navigation from '@/components/dashboard/Navigation.vue';
import PaymentAppointmentDialog from '@/components/dashboard/dialogs/payment_appointments/PaymentAppointmentDialog.vue'
import CustomButton from '@/components/common/Button.vue';
import { httpGet, httpPost, httpDelete, httpGetAllPaymentAppointments, httpPostFindPayment } from '@/utils/http_config.js';
import { useToast } from 'vue-toastification';
import { ref, onMounted } from 'vue';
import { mapToTableView as paymentMapToTableView } from '@/models/payments/payment_model';
import TableView from '@/components/dashboard/TableView.vue';
import DeleteDialog from '@/components/dashboard/dialogs/DeleteDialog.vue';
import { DropdownOption } from '@/components/dropdown/dropdownoptions';

const toast = useToast();

const paymentsList = ref([]);

onMounted( async () => {
    await getPayments();
});


const getPayments = async () => {
    const data = await httpGet(httpGetAllPaymentAppointments);
    paymentsList.value = paymentMapToTableView(data);
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

