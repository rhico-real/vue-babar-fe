<script setup lang="ts">
import Navigation from '@/components/dashboard/Navigation.vue';
import DeleteDialog from '@/components/dashboard/dialogs/DeleteDialog.vue';
import CustomButton from '@/components/common/Button.vue';
import TableView from '@/components/dashboard/TableView.vue';

import { httpGet, httpPost, httpDelete, httpGetAppointments, httpPostFindAppointment, httpDeleteAppointment } from '@/utils/http_config.js';
import { ref, onMounted } from 'vue';
import { mapToTableView as appointmentMapToTableView } from '@/models/appointments/appointment_model';
import AppointmentDialog from '@/components/dashboard/dialogs/appointments/AppointmentDialog.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const appointmentsList = ref([]);

onMounted( async () => {
    await getAppointments();
});


const getAppointments = async () => {
    const data = await httpGet(httpGetAppointments);
    appointmentsList.value = appointmentMapToTableView(data);
}

const searchAppointments = async (value) => {
    const payload = {
        "full_name": value
    }

    const data = await httpPost(httpPostFindAppointment, payload);
    if(data.status === 200){
        return data.data;
    } else {
        toast.error(data['response']['data']['message'] ?? "Error. Please contact admin.");
    }
}

const filterByDateAppointments = async (value) => {
    const payload = {
        "date": value
    }

    const data = await httpPost(httpPostFindAppointment, payload);
    if(data.status === 200){
        return data.data;
    } else {
        toast.error(data['response']['data']['message'] ?? "Error. Please contact admin.");
    }
}

const filterByStatusAppointments = async (value) => {
    const payload = {
        "status": value
    }

    const data = await httpPost(httpPostFindAppointment, payload);
    if(data.status === 200){
        return data.data;
    } else {
        toast.error(data['response']['data']['message'] ?? "Error. Please contact admin.");
    }
}

const deleteAppointment = async (value) => {
    const payload = {
        "id": value
    }

    const data = await httpDelete(httpDeleteAppointment, payload);
    if(data.status === 200){
        toast.success(data.data['message'] ?? "Appointment successfully deleted.");
        await getAppointments();
    } else {
        toast.error(data['response']['data']['message'] ??  "Error deleting Appointment.");
    }
}

</script>

<template>
    <Navigation>
        <div class="h-full bg-dashboard-background px-14 py-12">
            <!-- title -->
            <h1 class="text-3xl font-bold mb-10">Manage Appointments</h1>
            
            <!-- add patient -->
            <div class="flex justify-end">
                <AppointmentDialog @submitted="getAppointments">
                    <template #triggerbutton>
                        <CustomButton isAdd="true" text="Add Appointment" color="bg-dashboard-buttons-add" hoverColor="shadow-green-300"></CustomButton>
                    </template>
                </AppointmentDialog>
            </div>
                    

            <!-- table -->
            <TableView 
            class="mt-20 h-full" 
            title="Appointments" 
            :items="appointmentsList" 
            :searchbarFunction="searchAppointments" 
            :parser="appointmentMapToTableView" 
            :filterByDateFunction="filterByDateAppointments" 
            :hasDateFilter="true" 
            :hasStatusFilter="true" 
            :filterByStatusFunction="filterByStatusAppointments">
                <template #customHeader>
                    <th scope="col" class="px-6 py-3">
                        Actions
                    </th>
                </template>
                <template #customrow="{ item }">
                    <td class="px-6 py-4">
                        <AppointmentDialog 
                            title="Edit Appointment"
                            :appointment="item"
                            :isEdit="true",
                            @submitted="getAppointments"
                        >
                            <template #triggerbutton>
                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </template>
                        </AppointmentDialog>
                        
                        <DeleteDialog :deleteHandler="() => deleteAppointment(item.id)">
                            <template #message>
                                <strong class="text-red-500">Appointment details:</strong>
                                <ul>
                                    <li><strong>Name:</strong> {{ item.full_name }}</li>
                                    <li><strong>Reason:</strong> {{ item.reason }}</li>
                                    <li><strong>Date and Time:</strong> {{ item.date }}</li>
                                </ul>
                            </template>
                        </DeleteDialog>
                    </td>
                </template>
            </TableView>
        </div>
    </Navigation>
    
</template>

