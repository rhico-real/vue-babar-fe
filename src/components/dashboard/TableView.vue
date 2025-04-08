<script setup lang="ts">
import { defineProps, Ref, ref, watch, computed } from 'vue';
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-vue-next'
import DropdownMenu from '@/components/dropdown/DropdownMenu.vue';
import { DropdownOption } from '../dropdown/dropdownoptions';
import { Calendar } from '@/components/ui/calendar'
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { useToast } from 'vue-toastification';

const toast = useToast();
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
    hasMonthFilter: {
        type: Boolean,
        default: false
    },
    hasStatusFilter: {
        type: Boolean,
        default: false
    },
    filterByStatusFunction: Function,
    filterByDateFunction: Function,
    hasDateFilter: {
        type: Boolean,
        default: false
    },
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

// searchbar filter
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

// status filter
const statusFilter = ref('');
watch(statusFilter, async (val) => {
    if (!val) {
        filteredItems.value = props.items
        return
    }

    const data = await props.filterByStatusFunction(val)

    if (data) {
        filteredItems.value = props.parser(data)
    } else {
        filteredItems.value = props.items
        toast.error("No data found.");
    }
})

// date filter
const date = ref(today(getLocalTimeZone())) as Ref<DateValue>
const filteredDate = ref<string | null>(null)
const isPopoverOpen = ref(false);
watch(date, (val) => {
  const month = String(val.month).padStart(2, '0')
  const day = String(val.day).padStart(2, '0')
  filteredDate.value = `${val.year}-${month}-${day}`
  isPopoverOpen.value = false;
})
watch(filteredDate, async (val) => {
  if (!val) {
    filteredItems.value = props.items
    return
  }

  const data = await props.filterByDateFunction(val)

  if (data) {
    filteredItems.value = props.parser(data)
  } else {
    filteredItems.value = props.items
    toast.error("No data found for " + val + ".");
  }
})
const clearDateFilter = () => {
  filteredDate.value = null
}

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
            <DropdownMenu v-model="statusFilter" class="mr-3" v-if="props.hasStatusFilter" title="Choose Status" :option="DropdownOption.STATUS"/>    
            <DropdownMenu v-if="props.hasMonthFilter" :option="DropdownOption.MONTH"/>
            
            <Popover v-model:open="isPopoverOpen" v-if="props.hasDateFilter">
                <PopoverTrigger as-child>
                    <Button :class="[filteredDate ? 'text-blue-500' : '']" variant="outline">
                        {{ filteredDate ?? "Choose Date" }}
                    </Button>
                </PopoverTrigger>
                    <PopoverContent class="w-80">
                        <Calendar v-model="date" :weekday-format="'short'" class="rounded-md border" />
                    </PopoverContent>
            </Popover>
            <Button v-if="filteredDate" @click="clearDateFilter" class="ml-2 text-red-500 border-red-500" variant="outline">
                Clear Date
            </Button>            
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
                                <DropdownMenu class="w-full" :title="item[key]" :option="DropdownOption.STATUS" :isDisabled="true"/>    
                            </span>
                            <span v-else>{{ item[key] ?? "N/A" }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>