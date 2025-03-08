<script setup>
import Button from '@/components/Button.vue'
import { RouterLink } from 'vue-router';

const test = () => {
    alert('yey')
}

</script>

<template>
    <section>
        <div class="flex flex-col justify-center items-center h-screen">
           <!-- title -->
            <div class="text-center w-screen">
                <h2 class="text-xl font-semibold">Welcome to</h2>
                <h1 class="text-2xl font-bold">BABAR APPOINTMENT SYSTEM</h1>
            </div>
            <form @submit.prevent="test" class="w-1/2 flex flex-col mt-10">
                <!-- Full Name -->
                <div class="flex flex-col mt-5 mb-2">
                    <label class="mb-2 text-md font-semibold">Full Name</label>
                    <input class="border-2 px-2 py-1" type="text" name="fullname" placeholder="Enter Full Name">
                </div>
                <!-- Email -->
                <div class="flex flex-col mt-5 mb-2">
                    <label class="mb-2 text-md font-semibold">Email</label>
                    <input class="border-2 px-2 py-1" type="text" name="fullname" placeholder="Enter Email">
                </div>
                <!-- Phone Number -->
                <div class="flex flex-col mt-5 mb-2">
                    <label class="mb-2 text-md font-semibold">Phone Number</label>
                    <input class="border-2 px-2 py-1" type="text" name="fullname" placeholder="Enter Phone Number">
                </div>
                <!-- Date of Appointment -->
                <div class="flex flex-col mt-5 mb-2">
                    <label class="mb-2 text-md font-semibold">Date of Appointment</label>
                    <input class="border-2 px-2 py-1" type="text" name="fullname" placeholder="Enter Date of Appointment">
                </div>
                <!-- Book Appointment button -->
                 <Button class="mt-16" text="Book Appointment"></Button>
            </form>
              <!-- Already booked appointment? --> 
               <p class="mt-20">Already booked an appointment? <RouterLink class="hover:underline text-blue-500">Check your booking here.</RouterLink></p>
        </div>
    </section>
</template>