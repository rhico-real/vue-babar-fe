<script setup lang="ts">
import Navigation from '@/components/dashboard/Navigation.vue';
import DropdownMenu from '@/components/DropdownMenu.vue';
import type { DropdownModel } from '../../types/dropdown';
import samplepatient from '@/assets/img/profile.png';
import Button from '@/components/Button.vue';
import { ref } from 'vue';
import Dialog from 'primevue/dialog';

const monthOptions: DropdownModel[] = [
    {text: 'January', onClick: () => {}},
    {text: 'February', onClick: () => {}},
    {text: 'March', onClick: () => {}},
    {text: 'April', onClick: () => {}},
    {text: 'May', onClick: () => {}},
    {text: 'June', onClick: () => {}},
    {text: 'July', onClick: () => {}},
    {text: 'August', onClick: () => {}},
    {text: 'September', onClick: () => {}},
    {text: 'October', onClick: () => {}},
    {text: 'November', onClick: () => {}},
    {text: 'December', onClick: () => {}},
];

const patients = [
      {
        "id": 1,
        "name": "John Doe",
        "reason": "PCOS",
        "date": "March 14,2025 2:42PM",
        "queue": 1,
        "status": "done"
      },
      {
        "id": 2,
        "name": "John Doe",
        "reason": "PCOS",
        "date": "March 14,2025 2:42PM",
        "queue": 1,
        "status": "done"
      },
      {
        "id": 3,
        "name": "John Doe",
        "reason": "PCOS",
        "date": "March 14,2025 2:42PM",
        "queue": 1,
        "status": "done"
      },
      {
        "id": 4,
        "name": "John Doe",
        "reason": "PCOS",
        "date": "March 14,2025 2:42PM",
        "queue": 1,
        "status": "done"
      }
    ]

const addPatientDialog = ref(false);

</script>

<template>
    <Navigation>
        <div class="h-full bg-dashboard-background px-14 py-12">
            <!-- title -->
            <h1 class="text-3xl font-bold mb-10">Manage Patients</h1>
            
            <!-- add patient -->
            <div class="flex justify-end">
                <Button @click="addPatientDialog = !addPatientDialog" text="Add Patient" color="bg-dashboard-buttons-add" hoverColor="shadow-green-300"></Button>
            </div>
                    

            <!-- table -->
            <div class="flex flex-col mt-5 bg-white p-6 rounded-lg">
                <div class="flex">
                    <h1 class="flex-1 text-3xl font-bold mb-5">Patients</h1>
                    <!-- dropdown button -->
                    <DropdownMenu :options="monthOptions"/>           
                </div>

                <!-- table -->
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="bg-gray-200 text-xs text-gray-700 uppercase">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Patient
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Patient name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Reason
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Date and Time
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Queue
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white hover:bg-gray-50" v-for="patient in patients" :key="patient.id">
                                <td class="px-6 py-4 text-black">
                                    <img :src="samplepatient" alt="">
                                </td>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    John Doe
                                </th>
                                <td class="px-6 py-4 text-black">
                                    PCOS
                                </td>
                                <td class="px-6 py-4 text-black">
                                    March 14,2025 2:42PM
                                </td>
                                <td class="px-6 py-4 text-black">
                                    1
                                </td>
                                <td class="px-6 py-4">
                                    <div class="bg-dashboard-status-done text-center text-white rounded-lg py-1">
                                        Done
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-center">
                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
           
        </div>
    </Navigation>

    <div class="bg-red-200">
        <Dialog class="bg-red-200" v-model:visible="addPatientDialog" maximizable modal header="Header" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </Dialog>
    </div>
    
</template>

