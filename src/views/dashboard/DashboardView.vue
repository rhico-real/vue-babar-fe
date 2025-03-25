<script setup lang="ts">
import Navigation from '@/components/dashboard/Navigation.vue';
import totalpatientsicon from '@/assets/img/totalpatients.png';
import totalappointmentsicon from '@/assets/img/totalappointments.png';
import TableView from '@/components/dashboard/TableView.vue';
</script>

<template>
    <Navigation>
        <div class="h-full px-14 py-12">
            <!-- title -->
            <h1 class="text-3xl font-bold mb-10">Dashboard</h1>
            
            <div class="flex gap-4">
                <!-- total appointments card -->
                <div class="flex flex-col bg-white rounded-lg p-6 w-fit shadow-sm">
                    <div class="flex">
                        <div class="flex flex-col mr-12">
                            <p>Total Appointments</p>
                            <h1 class="font-bold text-2xl">40,689</h1>
                        </div>
                        <img :src="totalappointmentsicon" alt="" class="h-14">
                    </div>
                    <div class="flex items-center mt-5">
                        <i class="pi pi-chart-line text-green-500 mr-2"></i>
                        <p class="font-semibold text-green-500 mr-4">8.5%</p>
                        <p class="text-sm">Up from yesterday</p>
                    </div>
                </div>

                <!-- total patients card -->
                <div class="flex flex-col bg-white rounded-lg p-6 w-fit shadow-sm">
                    <div class="flex">
                        <div class="flex flex-col mr-12">
                            <p>Total Patients</p>
                            <h1 class="font-bold text-2xl">40,689</h1>
                        </div>
                        <img :src="totalpatientsicon" alt="" class="h-14">
                    </div>
                    <div class="flex items-center mt-5">
                        <i class="pi pi-chart-line text-green-500 mr-2"></i>
                        <p class="font-semibold text-green-500 mr-4">8.5%</p>
                        <p class="text-sm">Up from yesterday</p>
                    </div>
                </div>
            </div>
           
            <TableView class="mt-20" title="Appointments"></TableView>
            <TableView title="Patients"></TableView>
        </div>
    </Navigation>
</template>

