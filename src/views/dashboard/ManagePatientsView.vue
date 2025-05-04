<script setup lang="ts">
import Navigation from '@/components/dashboard/Navigation.vue';
import PatientDialog from '@/components/dashboard/dialogs/patients/PatientDialog.vue';
import CustomButton from '@/components/common/Button.vue';

import { ref, onMounted, watchEffect } from 'vue';
import TableView from '@/components/dashboard/TableView.vue';
import DeleteDialog from '@/components/dashboard/dialogs/DeleteDialog.vue';
import { usePatientStore } from '@/stores/patient';
import { mapToTableView as patientMapToTableView } from '@/models/patients/patient_model';

const patientsList = ref([]);
const patientStore = usePatientStore();

onMounted( async () => {
    await patientStore.fetchPatients();
});


watchEffect(() => {
    patientsList.value = patientStore.patients_list;
});

</script>

<template>
    <Navigation>
        <div class="h-full bg-dashboard-background px-14 py-12">
            <!-- title -->
            <h1 class="text-3xl font-bold mb-10">Manage Patients</h1>
            
            <!-- add patient -->
            <div class="flex justify-end">
                <PatientDialog @submitted="patientStore.fetchPatients">
                    <template #triggerbutton>
                        <CustomButton isAdd="true" text="Add Patient" color="bg-dashboard-buttons-add" hoverColor="shadow-green-300"></CustomButton>
                    </template>
                </PatientDialog>
            </div>
                    
            <!-- table -->
            <TableView 
            class="mt-20 h-full" 
            title="Patients" 
            :items="patientsList" 
            :searchbarFunction="patientStore.searchPatient" 
            :parser="patientMapToTableView" 
            :hasDateFilter="false" 
            :hasStatusFilter="false" 
            >
                <template #customHeader>
                    <th scope="col" class="px-6 py-3">
                        Actions
                    </th>
                </template>
                <template #customrow="{ item }">
                    <td class="px-6 py-4">
                        <PatientDialog 
                            title="Edit Patient"
                            :patient="item"
                            :isEdit="true",
                            @submitted="patientStore.fetchPatients"
                        >
                            <template #triggerbutton>
                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </template>
                        </PatientDialog>
                        
                        <DeleteDialog :deleteHandler="() => patientStore.deletePatient(item.id)">
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

