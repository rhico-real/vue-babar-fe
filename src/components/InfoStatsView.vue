<script setup>
import { ref } from 'vue';

const stats = ref([
    {
        icon: 'pi-user',
        number: '390+',
        text: 'Users'
    },
    {
        icon: 'pi-map-marker',
        number: '20+',
        text: 'Locations'
    },
    {
        icon: 'pi-server',
        number: '50+',
        text: 'Server'
    },
]);

</script>
<template>
    <section class="shadow-sm mt-2 py-10 px-2 bg-white">
        <div class="flex sm:flex-col lg:flex-row lg:items-stretch sm:items-center lg:divide-x sm:divide-y lg:divide-y-0 gap-y-4">
            <div :class="`flex items-center lg:justify-center sm:justify-start sm:w-40 lg:w-full ${index != 0 ? 'lg:pl-10 lg:pr-10 sm:pt-5 sm:pb-2' : 'lg:pr-10'}`" v-for="(stat, index) in stats" :key="stat">
                <div class="bg-red-100 py-4 px-5 rounded-full">
                    <i :class="`pi ${stat.icon}`" style="color: red"></i>
                </div>
                <div class="flex-col ml-4">
                    <p class="font-bold text-xl">{{stat.number}}</p>
                    <p>{{stat.text}}</p>
                </div>
            </div>
        </div>
    </section>
   
</template>