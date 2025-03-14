<script setup lang="ts">
import Navigation from '@/components/dashboard/Navigation.vue';
import totalpatientsicon from '@/assets/img/totalpatients.png';
import DropdownMenu from '@/components/DropdownMenu.vue';
import type { DropdownModel } from '../../types/dropdown';

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
</script>

<template>
    <Navigation>
        <div class="h-full bg-dashboard-background px-14 py-12">
            <!-- title -->
            <h1 class="text-3xl font-bold mb-10">Dashboard</h1>
            
            <!-- total patients card -->
            <div class="flex flex-col bg-white rounded-lg p-6 w-fit shadow-sm">
                <div class="flex">
                    <div class="flex flex-col mr-12">
                        <p>Total Patients</p>
                        <h1 class="font-bold text-2xl">40,689</h1>
                    </div>
                    <img :src="totalpatientsicon" alt="">
                </div>
                <div class="flex items-center mt-5">
                    <i class="pi pi-chart-line text-green-500 mr-2"></i>
                    <p class="font-semibold text-green-500 mr-4">8.5%</p>
                    <p class="text-sm">Up from yesterday</p>
                </div>
            </div>

            <!-- table -->
            <div class="flex flex-col mt-20 bg-white p-6 rounded-lg">
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
                                <!-- <th scope="col" class="px-6 py-3">
                                    <span class="sr-only">Edit</span>
                                </th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white hover:bg-gray-50">
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
                                <!-- <td class="px-6 py-4 text-right">
                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td> -->
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
           
        </div>
    </Navigation>
</template>

