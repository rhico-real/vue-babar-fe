<script setup>
import { reactive } from 'vue';
import Button from '@/components/Button.vue';

const state = reactive({
    plans: [
        {
            title: 'Free Plan',
            details: [
                'Unlimited Bandwitch',
                'Encrypted Connection',
                'No Traffic Logs',
                'Works on All Devices'
            ],
            price: 'Free'
        },
        {
            title: 'Standard Plan',
            details: [
                'Unlimited Bandwitch',
                'Encrypted Connection',
                'No Traffic Logs',
                'Works on All Devices',
                'Connect Anyware'
            ],
            price: '$9 / mo'
        },
        {
            title: 'Premium  Plan',
            details: [
                'Unlimited Bandwitch',
                'Encrypted Connection',
                'No Traffic Logs',
                'Works on All Devices',
                'Connect Anyware',
                'Get New Features'
            ],
            price: '$12 / mo'
        }
    ]
});

</script>

<template>
    <section>
        <div class="mt-10 flex flex-col items-center">
            <h1 class="text-3xl font-semibold mb-2">Choose Your Plan</h1>
            <p class="text-sm text-center text-gray-500">Let's choose the package that is best for you and explore it happily and cheerfully.</p>
        </div>
       
        <div class="flex justify-center" >
            <div class="gap-8" v-for="plan in state.plans" :key="plan">
                <div class="flex flex-col items-center py-20 px-5 rounded-md border border-gray-200">
                    <img src="https://next-landing-vpn.vercel.app/_next/image?url=%2Fassets%2FFree.png&w=256&q=75" alt="">
                    <h2 class="py-12 font-bold">{{ plan.title}}</h2>
                    <div class="flex flex-row items-center pb-28">
                        <i class="pi pi-check-circle text-green-500 pr-3"></i>
                        <p class="text-sm text-gray-500">asd</p>
                    </div>
                    <h2 class=" font-normal pb-4">Free</h2>
                    <Button isCircular="true" text="Select" ></Button>
                </div>
            </div> 
        </div>
    </section>
</template>