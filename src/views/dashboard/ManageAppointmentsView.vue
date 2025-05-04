<script setup lang="ts">
import Navigation from '@/components/dashboard/Navigation.vue';
import DeleteDialog from '@/components/dashboard/dialogs/DeleteDialog.vue';
import CustomButton from '@/components/common/Button.vue';
import TableView from '@/components/dashboard/TableView.vue';

import { ref, onMounted, watchEffect } from 'vue';
import { mapToTableView as appointmentMapToTableView } from '@/models/appointments/appointment_model';
import AppointmentDialog from '@/components/dashboard/dialogs/appointments/AppointmentDialog.vue';

import { useAppointmentStore } from '@/stores/appointment';

const appointmentStore = useAppointmentStore();

const appointmentsList = ref([]);

onMounted( async () => {
    await appointmentStore.fetchAppointments();
});

watchEffect(() => {
    appointmentsList.value = appointmentStore.appointment_list;
});


</script>

<template>
    <Navigation>
        <div class="h-full bg-dashboard-background px-14 py-12">
            <!-- title -->
            <h1 class="text-3xl font-bold mb-10">Manage Appointments</h1>
            
            <!-- add patient -->
            <div class="flex justify-end">
                <AppointmentDialog @submitted="appointmentStore.fetchAppointments">
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
            :searchbarFunction="appointmentStore.searchAppointments" 
            :parser="appointmentMapToTableView" 
            :filterByDateFunction="appointmentStore.filterByDateAppointments" 
            :hasDateFilter="true" 
            :hasStatusFilter="true" 
            :filterByStatusFunction="appointmentStore.filterByStatusAppointments">
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
                            @submitted="appointmentStore.fetchAppointments"
                        >
                            <template #triggerbutton>
                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </template>
                        </AppointmentDialog>
                        
                        <DeleteDialog :deleteHandler="() => appointmentStore.deleteAppointment(item.id)">
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

