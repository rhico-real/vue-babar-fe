<script setup lang="ts">
import { defineProps, Ref, ref, watch, computed, PropType } from 'vue';
import { Input } from '@/components/ui/input'
import { Search, X, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-vue-next'
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
    hasPaymentStatusFilter: {
        type: Boolean,
        default: false
    },
    filterByStatusFunction: Function,
    filterByDateFunction: Function,
    hasDateFilter: {
        type: Boolean,
        default: false
    },
    dropdownOption: {
        type: String,
        default: DropdownOption.STATUS
    }
})

const searchbar = ref('');
const filteredItems = ref([]);

// Sorting state
const sortColumn = ref('');
const sortDirection = ref('asc'); // 'asc' or 'desc'

// Function to sort table data
const sortTable = (column) => {
    // Don't sort photo or status columns
    if (column.toLowerCase() === 'photo' || column.toLowerCase() === 'status') {
        return;
    }

    // If clicking the same column, toggle direction
    if (sortColumn.value === column) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
        // New column, set to ascending by default
        sortColumn.value = column;
        sortDirection.value = 'asc';
    }

    // Sort the filtered items
    filteredItems.value = [...filteredItems.value].sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];

        // Check if we're dealing with dates
        if (isDate(valueA) && isDate(valueB)) {
            const dateA = new Date(valueA);
            const dateB = new Date(valueB);
            return sortDirection.value === 'asc' 
                ? dateA.getTime() - dateB.getTime()
                : dateB.getTime() - dateA.getTime();
        }

        // Handle null/undefined values - push them to the end regardless of sort order
        if (valueA === null || valueA === undefined) return 1;
        if (valueB === null || valueB === undefined) return -1;

        // Handle numeric values
        if (typeof valueA === 'number' && typeof valueB === 'number') {
            return sortDirection.value === 'asc' ? valueA - valueB : valueB - valueA;
        }

        // Default string comparison
        const strA = String(valueA).toLowerCase();
        const strB = String(valueB).toLowerCase();
        
        if (sortDirection.value === 'asc') {
            return strA.localeCompare(strB);
        } else {
            return strB.localeCompare(strA);
        }
    });
};

// Function to check if a value is a date
const isDate = (value) => {
    if (!value) return false;
    
    // Check if it matches a date format (YYYY-MM-DD or similar)
    if (typeof value === 'string') {
        // Common date patterns
        const datePatterns = [
            /^\d{4}-\d{2}-\d{2}/, // YYYY-MM-DD
            /^\d{2}\/\d{2}\/\d{4}/, // MM/DD/YYYY
            /^\d{2}-\d{2}-\d{4}/, // DD-MM-YYYY
        ];
        
        if (datePatterns.some(pattern => pattern.test(value))) {
            const timestamp = Date.parse(value);
            return !isNaN(timestamp);
        }
    }
    
    return false;
};

// Modal state
const isImageModalOpen = ref(false);
const selectedImage = ref('');

// Function to open the image modal
const openImageModal = (imageUrl) => {
    selectedImage.value = imageUrl;
    isImageModalOpen.value = true;
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
};

// Function to close the image modal
const closeImageModal = () => {
    isImageModalOpen.value = false;
    document.body.style.overflow = ''; // Restore scrolling
};

watch(
    () => props.items,
    (newItems) => {
        filteredItems.value = newItems;
        // Reset sorting when new items are loaded
        sortColumn.value = '';
        sortDirection.value = 'asc';
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
const tableHeaders = computed(() => {
    try {
        return filteredItems.value.length > 0 ? Object.keys(filteredItems.value[0]) : [];
    } catch (e) {
        // console.error("Error getting table headers:", e);
        return [];
    }
}); 

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
  }
})

const clearDateFilter = () => {
  filteredDate.value = null
}

const clearStatusFilter = () => {
  statusFilter.value = '';
}


</script>

<template>
     <div class="flex flex-col mt-10 bg-white p-6 rounded-lg h-3/5">
        <div class="flex">
            <!-- Searchbar -->
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
            <Button v-if="props.hasStatusFilter && statusFilter.length != 0" @click="clearStatusFilter" class="ml-2 text-red-500 border-red-500" variant="outline">
                Clear Status
            </Button>

            <!-- dropdown payment status button -->
            <DropdownMenu v-model="statusFilter" class="mr-3" v-if="props.hasPaymentStatusFilter" title="Choose Status" :option="DropdownOption.PAYMENT_STATUS"/>
            <Button v-if="props.hasPaymentStatusFilter && statusFilter.length != 0" @click="clearStatusFilter" class="ml-2 text-red-500 border-red-500" variant="outline">
                Clear Status
            </Button>

            <!-- dropdown month-only option -->
            <DropdownMenu v-if="props.hasMonthFilter" :option="DropdownOption.MONTH"/>
            
            <!-- popover for calendar -->
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
                <!-- headers -->
                <thead class="bg-gray-200 text-xs text-gray-700 uppercase">
                    <tr>
                        <th scope="col" class="px-6 py-3" 
                            v-for="(key, i) in tableHeaders" 
                            :key="i"
                            :class="[
                                key.toLowerCase() !== 'photo' && key.toLowerCase() !== 'status' ? 'hover:bg-blue-100' : '',
                                sortColumn === key ? 'bg-blue-200' : ''
                            ]"
                            @click="key.toLowerCase() !== 'photo' && key.toLowerCase() !== 'status' ? sortTable(key) : null"
                        >
                            <div class="flex items-center select-none" :class="{'cursor-pointer': key.toLowerCase() !== 'photo' && key.toLowerCase() !== 'status'}">
                                {{ formatHeader(key) }}
                                <span v-if="key.toLowerCase() !== 'photo' && key.toLowerCase() !== 'status'" class="ml-1">
                                    <ArrowUpDown v-if="sortColumn !== key" class="h-4 w-4 text-gray-400" />
                                    <ArrowUp v-else-if="sortDirection === 'asc'" class="h-4 w-4" />
                                    <ArrowDown v-else class="h-4 w-4" />
                                </span>
                            </div>
                        </th>
                        <slot name="customHeader"></slot>
                    </tr>
                </thead>

                <!-- values -->
                <tbody>
                    <tr class="bg-white hover:bg-gray-50" v-for="(item, itemIndex) in filteredItems" :key="itemIndex">
                        <td class="px-6 py-4 text-black items-start" v-for="(key, index) in tableHeaders" :key="index">
                            <span v-if="key.toLowerCase() === 'status'">
                                <DropdownMenu class="w-full" :title="item[key]" :option="dropdownOption" :isDisabled="true"/>    
                            </span>
                            <span v-else-if="key.toLowerCase() === 'photo' && item[key]">
                                <img class="bg-gray-300 h-10 w-10 cursor-pointer" :src="item[key]" alt="" @click="openImageModal(item[key])">
                            </span>
                            <slot v-else-if="$slots[`column:${key}`]" :name="`column:${key}`" :item="item" :value="item[key]" :key="key"></slot>
                            <span v-else>{{ item[key] ?? "N/A" }}</span>
                        </td>
                        <slot name="customrow" :item="item" :index="itemIndex"></slot>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Image Modal -->
        <div v-if="isImageModalOpen" class="fixed inset-0 z-50 flex items-center justify-center image-modal-backdrop" @click="closeImageModal">
            <button @click.stop="closeImageModal" class="absolute top-6 right-6 p-2 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-all z-60">
                <X class="h-6 w-6" />
            </button>
            <div class="relative max-w-4xl max-h-screen">
                <img :src="selectedImage" alt="Enlarged image" class="max-w-full max-h-[85vh] object-contain" @click.stop>
            </div>
        </div>
    </div>
</template>

<style scoped>
    /* Add ambient effect to the modal backdrop */
    .image-modal-backdrop {
        animation: fadeIn 0.1s ease-in-out;
        backdrop-filter: blur(5px);
        background-color: rgba(0, 0, 0, 0.85);
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    /* Sortable column styles */
    th div {
        user-select: none;
    }

    th div.cursor-pointer:hover {
        cursor: pointer;
    }
</style>