<script setup lang="ts">
import Navigation from '@/components/dashboard/Navigation.vue';
import PatientDialog from '@/components/dashboard/dialogs/patients/PatientDialog.vue';
import CustomButton from '@/components/Button.vue';
import { httpGet, httpPost, httpDelete, httpPatients, httpPostFindPatient } from '@/utils/http_config.js';
import { useToast } from 'vue-toastification';
import { ref, onMounted } from 'vue';
import { mapToTableView as patientMapToTableView } from '@/models/patients/patient_model';
import TableView from '@/components/dashboard/TableView.vue';
import DeleteDialog from '@/components/dashboard/dialogs/DeleteDialog.vue';

const toast = useToast();

const patientsList = ref([]);

onMounted( async () => {
    await getPatients();
});


const getPatients = async () => {
    const data = await httpGet(httpPatients);
    patientsList.value = patientMapToTableView(data);
}

const searchPatient = async (value) => {
    const payload = {
        "full_name": value
    }

    const data = await httpPost(httpPostFindPatient, payload);
    if(data.status === 200){
        return data.data;
    } else {
        toast.error(data['response']['data']['message'] ?? "Error. Please contact admin.");
    }
}

const deletePatient = async (value) => {
    const payload = {
        "id": value
    }

    const data = await httpDelete(httpPatients, payload);
    if(data.status === 200){
        toast.success(data.data['message'] ?? "Patient successfully deleted.");
        await getPatients();
    } else {
        toast.error(data['response']['data']['message'] ?? "Error deleting Patient.");
    }
}

</script>

<template>
    <Navigation>
        <div class="h-full bg-dashboard-background px-14 py-12">
            <!-- title -->
            <h1 class="text-3xl font-bold mb-10">Manage Patients</h1>
            
            <!-- add patient -->
            <div class="flex justify-end">
                <PatientDialog @submitted="getPatients">
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
            :searchbarFunction="searchPatient" 
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
                            @submitted="getPatients"
                        >
                            <template #triggerbutton>
                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </template>
                        </PatientDialog>
                        
                        <DeleteDialog :deleteHandler="() => deletePatient(item.id)">
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

