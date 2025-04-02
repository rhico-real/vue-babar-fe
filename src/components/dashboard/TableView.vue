<script setup lang="ts">
import { defineProps, ref, watch, computed } from 'vue';
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-vue-next'
import DropdownMenu from '@/components/dropdown/DropdownMenu.vue';
import { DropdownOption } from '../dropdown/dropdownoptions';

const props = defineProps({
    title: {
        type: String,
        default: "No Name"
    },
})

const searchbar = ref('');
const searchbarFunction = () => {
    console.log(searchbar.value);
}

let searchbarDebounce;
watch(searchbar, (text) => {
    clearTimeout(searchbarDebounce);
    searchbarDebounce = setTimeout(() => {
        searchbarFunction();
    }, 800);
});

const dummyData = {
    name: "John Doe",
    reason: "PCOS",
    date: "March 14,2025 2:42PM",
    referenceNumber: "123qwe",
    queue: 1,
    status: "Done"
};

</script>

<template>
     <div class="flex flex-col mt-10 bg-white p-6 rounded-lg">
        <div class="flex">
            <div class="flex flex-1">
                <h1 class="text-3xl font-bold mb-5 mr-5">{{title}}</h1>
                <div class="relative max-w-sm items-center">
                    <Input v-model="searchbar" id="search" type="text" placeholder="Search..." class="pl-8" />
                    <span class="h-9 absolute start-0 inset-y-0 flex items-center justify-center px-2">
                        <Search class="size-4 text-muted-foreground text-gray-500" />
                    </span>
                </div>
            </div>
            
            <!-- dropdown button -->
            <DropdownMenu :options="DropdownOption.MONTH"/>           
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
                            Reference Number
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
                    <tr class="bg-white hover:bg-gray-50" v-for="n in 5">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{dummyData.name}}
                        </th>
                        <td class="px-6 py-4 text-black">
                            {{dummyData.reason}}
                        </td>
                        <td class="px-6 py-4 text-black">
                            {{dummyData.date}}
                        </td>
                        <td class="px-6 py-4 text-black">
                            {{dummyData.referenceNumber}}
                        </td>
                        <td class="px-6 py-4 text-black">
                            {{dummyData.queue}}
                        </td>
                        <td class="px-6 py-4">
                            <DropdownMenu class="w-full" :title="dummyData.status" :option="DropdownOption.STATUS"/>    
                            <!-- <div class="bg-dashboard-status-done text-center text-white rounded-lg py-1">
                                {{dummyData.status}}
                            </div> -->
                        </td>
                        <!-- <td class="px-6 py-4 text-right">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td> -->
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>