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
    items: {
        type: Array,
        default: []
    },
    searchbarFunction: Function,
    parser: {
        type: Function,
        default: () => (data) => data
    },
    hasMonth: {
        type: Boolean,
        default: true
    }
})

const searchbar = ref('');
const filteredItems = ref([]);

watch(
    () => props.items,
    (newItems) => {
        filteredItems.value = newItems;
    },
    {immediate: true}
)

const searchbarTableFunction = async (val) => {
    if(props.searchbarFunction) {
        const data = await props.searchbarFunction(val);
        if(data){
            filteredItems.value = props.parser(data);
        } else {
            filteredItems.value = props.items;
        }
    }
}

let searchbarDebounce;
watch(searchbar, (text) => {
    clearTimeout(searchbarDebounce);
    searchbarDebounce = setTimeout(() => {
        if(text){
            searchbarTableFunction(text);
        } else {
            filteredItems.value = props.items;
        }
    }, 200);
});

// Extract headers dynamically from the first object
const tableHeaders = computed(() =>
    filteredItems.value.length > 0 ? Object.keys(filteredItems.value[0]) : []
);  

// Function to format headers (e.g., convert "patient_name" to "Patient Name")
const formatHeader = (key) => {
    return key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

</script>

<template>
     <div class="flex flex-col mt-10 bg-white p-6 rounded-lg h-3/5">
        <div class="flex">
            <div class="flex flex-1 ">
                <h1 class="text-3xl font-bold mb-5 mr-5">{{title}}</h1>
                <div class="relative w-5/12 items-center">
                    <Input v-model="searchbar" id="search" type="text" placeholder="Search..." class="pl-8" />
                    <span class="h-9 absolute start-0 inset-y-0 flex items-center justify-center px-2">
                        <Search class="size-4 text-muted-foreground text-gray-500" />
                    </span>
                </div>
            </div>
            
            <!-- dropdown button -->
            <DropdownMenu v-if="props.hasMonth" :option="DropdownOption.MONTH"/>           
        </div>

        <!-- table -->
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg h-full">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="bg-gray-200 text-xs text-gray-700 uppercase">
                    <tr>
                        <th scope="col" class="px-6 py-3" v-for="(key,i) in tableHeaders" :key="i">
                            {{ formatHeader(key) }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white hover:bg-gray-50" v-for="(item, itemIndex) in filteredItems" :key="itemIndex">
                        <td class="px-6 py-4 text-black" v-for="(key, index) in tableHeaders" :key="index">
                            <span v-if="key.toLowerCase() === 'status'">
                                <DropdownMenu class="w-full" :title="item[key]" :option="DropdownOption.STATUS"/>    
                            </span>
                            <span v-else>{{ item[key] ?? "N/A" }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>