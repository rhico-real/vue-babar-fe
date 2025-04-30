<script setup lang="ts">
import Navigation from '@/components/dashboard/Navigation.vue';
import totalpatientsicon from '@/assets/img/totalpatients.png';
import totalappointmentsicon from '@/assets/img/totalappointments.png';
import TableView from '@/components/dashboard/TableView.vue';
import { onMounted, ref } from 'vue';
import { BASEURL, httpGet, httpPost, httpGetAllPaymentAppointments } from '@/utils/http_config.js';
import { mapToTableView as appointmentMapToTableView } from '@/models/appointments/appointment_model';
import { mapToTableView as patientMapToTableView } from '@/models/patients/patient_model';
import { mapToTableView as paymentMapToTableView } from '@/models/payments/payment_model';
import { useToast } from 'vue-toastification';
import { useUserProfileStore } from '@/stores/userProfile';

const httpGetAppointments = `${BASEURL}/api/get_appointments/`;
const httpGetPatients = `${BASEURL}/api/patients/`;

const httpPostFindAppointment = `${BASEURL}/api/filter_appointment/`;
const httpPostFindPatient = `${BASEURL}/api/filter_patient/`;

const toast = useToast();

const appointmentsList = ref([]);
const patientsList = ref([]);
const totalPayments = ref(0);

const userProfileStore = useUserProfileStore();

onMounted( async () => {
    await getAppointments();
    await getPatients();
    await getPayments();
    await userProfileStore.fetchProfile();
});


const getAppointments = async () => {
    const data = await httpGet(httpGetAppointments);
    appointmentsList.value = appointmentMapToTableView(data);
}

const getPatients = async () => {
    const data = await httpGet(httpGetPatients);
    patientsList.value = patientMapToTableView(data);
}

const getPayments= async () => {
    const data = await httpGet(httpGetAllPaymentAppointments);
    totalPayments.value = paymentMapToTableView(data).length;
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

const searchPatients= async (value) => {
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
                            <h1 class="font-bold text-2xl">{{ appointmentsList.length }}</h1>
                        </div>
                        <img :src="totalappointmentsicon" alt="" class="h-14">
                    </div>
                    <!-- <div class="flex items-center mt-5">
                        <i class="pi pi-chart-line text-green-500 mr-2"></i>
                        <p class="font-semibold text-green-500 mr-4">8.5%</p>
                        <p class="text-sm">Up from yesterday</p>
                    </div> -->
                </div>

                <!-- total patients card -->
                <div class="flex flex-col bg-white rounded-lg p-6 w-fit shadow-sm">
                    <div class="flex">
                        <div class="flex flex-col mr-12">
                            <p>Total Patients</p>
                            <h1 class="font-bold text-2xl">{{ patientsList.length }}</h1>
                        </div>
                        <img :src="totalpatientsicon" alt="" class="h-14">
                    </div>
                    <!-- <div class="flex items-center mt-5">
                        <i class="pi pi-chart-line text-green-500 mr-2"></i>
                        <p class="font-semibold text-green-500 mr-4">8.5%</p>
                        <p class="text-sm">Up from yesterday</p>
                    </div> -->
                </div>

                 <!-- total payments card -->
                 <div class="flex flex-col bg-white rounded-lg p-6 w-fit shadow-sm">
                    <div class="flex">
                        <div class="flex flex-col mr-12">
                            <p>Total Payments</p>
                            <h1 class="font-bold text-2xl">{{ totalPayments }}</h1>
                        </div>
                        <img :src="totalappointmentsicon" alt="" class="h-14">
                    </div>
                    <!-- <div class="flex items-center mt-5">
                        <i class="pi pi-chart-line text-green-500 mr-2"></i>
                        <p class="font-semibold text-green-500 mr-4">8.5%</p>
                        <p class="text-sm">Up from yesterday</p>
                    </div> -->
                </div>
            </div>
           
            <TableView class="mt-20" title="Appointments" :items="appointmentsList" :searchbarFunction="searchAppointments" :parser="appointmentMapToTableView" :filterByDateFunction="filterByDateAppointments" :hasDateFilter="true" :hasStatusFilter="true" :filterByStatusFunction="filterByStatusAppointments"></TableView>
            <TableView title="Patients" :items="patientsList" :searchbarFunction="searchPatients" :parser="patientMapToTableView"></TableView>
        </div>
    </Navigation>
</template>

