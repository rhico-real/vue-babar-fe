<script setup>
import Button from '@/components/Button.vue'
import { useRouter, RouterLink } from 'vue-router';
import { reactive } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const toast = useToast();
const router = useRouter();

const form = reactive({
    full_name: '',
    email: '',
    phone_number: '',
    date: ''
});

const submit = async () => {
    const payload = {
        'full_name': form.full_name,
        'email': form.email,
        'phone_number': form.phone_number,
        'date': form.date
    };

    try{
        const response = await axios.post('http://127.0.0.1:5000/api/add_appointment/', payload);
        const referenceCode = response.data['appointment']['reference_code'];

        router.push(`/appointment/${referenceCode}`);
    }catch(e){
        console.error(e);
        toast.error('Error creating appointment');
    }
};

</script>

<template>
    <section>
        <div class="flex flex-col justify-center items-center h-screen">
           <!-- title -->
            <div class="text-center w-screen">
                <h2 class="text-xl font-semibold">Welcome to</h2>
                <h1 class="text-2xl font-bold">BABAR APPOINTMENT SYSTEM</h1>
            </div>
            <form @submit.prevent="submit" class="w-1/2 flex flex-col mt-10">
                <!-- Full Name -->
                <div class="flex flex-col mt-5 mb-2">
                    <label class="mb-2 text-md font-semibold">Full Name</label>
                    <input required v-model="form.full_name" class="border-2 px-2 py-1" type="text" name="fullname" placeholder="Enter Full Name">
                </div>
                <!-- Email -->
                <div class="flex flex-col mt-5 mb-2">
                    <label class="mb-2 text-md font-semibold">Email</label>
                    <input v-model="form.email" class="border-2 px-2 py-1" type="text" name="fullname" placeholder="Enter Email">
                </div>
                <!-- Phone Number -->
                <div class="flex flex-col mt-5 mb-2">
                    <label class="mb-2 text-md font-semibold">Phone Number</label>
                    <input required v-model="form.phone_number" class="border-2 px-2 py-1" type="text" name="fullname" placeholder="Enter Phone Number">
                </div>
                <!-- Date of Appointment -->
                <div class="flex flex-col mt-5 mb-2">
                    <label class="mb-2 text-md font-semibold">Date of Appointment</label>
                    <input required v-model="form.date" class="border-2 px-2 py-1" type="date" name="fullname" placeholder="Enter Date of Appointment">
                </div>
                <!-- Book Appointment button -->
                 <Button class="mt-16" text="Book Appointment"></Button>
            </form>
              <!-- Already booked appointment? --> 
               <p class="mt-20">Already booked an appointment? 
                    <RouterLink 
                        to="/appointment/find"
                        class="hover:underline text-blue-500">
                            Check your booking here.
                    </RouterLink>
                </p>
        </div>
    </section>
</template>