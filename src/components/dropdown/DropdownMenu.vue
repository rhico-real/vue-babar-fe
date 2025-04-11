<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';
import type { DropdownModel } from '../../types/dropdown';
import { DropdownOption, monthOptions, statusOptions } from './dropdownoptions';

const props = defineProps({
    title: {
        type: String,
        default: "Month"
    },
    option: {
        type: String,
        default: DropdownOption.MONTH
    },
    optionClick: Function,
    modelValue: {
        type: String,
        required: false
    },
    isDisabled: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const currentTitle = ref(props.title);

watch(() => props.modelValue, (newVal) => {
    if(!newVal || newVal === ''){
        currentTitle.value = props.title;
    } else {
        currentTitle.value = newVal;
    }
})

watch(() => props.title, (newVal) => {
    currentTitle.value = newVal;
});

const isOpenDropdown = ref(false);

const handleClickOption = (option: DropdownModel) => {
    const selectedOption = option.enum ?? option.text;
    emit('update:modelValue', selectedOption);

    // close dropdown
    isOpenDropdown.value = false;

    // change the text of the dropdown
    currentTitle.value = selectedOption;
};

</script>

<template>
    <div class=" relative inline-block text-left dropdown">
        <!-- If Dropdown is MONTH -->
        <div v-if="option === DropdownOption.MONTH">
            <span @click="!props.isDisabled ? isOpenDropdown = !isOpenDropdown : ''" class="rounded-md shadow-sm">
                <button class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800" 
                    type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
                    <span>{{ currentTitle }}</span>
                    <svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </span>
        </div>

        <!-- If Dropdown is STATUS -->
        <div v-if="option === DropdownOption.STATUS" class="w-full">
            <span @click="!props.isDisabled ? isOpenDropdown = !isOpenDropdown : ''" class="rounded-md shadow-sm">
                <button :class="(statusOptions.find(option => option.enum.toLowerCase() === currentTitle.toLowerCase())?.color) + 
                ' inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800'"
                    type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
                    <span :class="(statusOptions.find(option => option.enum.toLowerCase() === currentTitle.toLowerCase())?.color) ? 'text-white' : 'text-black'">{{ currentTitle }}</span>
                    <svg v-if="!props.isDisabled" :class="((statusOptions.find(option => option.enum.toLowerCase() === currentTitle.toLowerCase())?.color) ? 'text-white ' : 'text-black ') + 'w-5 h-5 ml-2 -mr-1'" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </span>
        </div>
        
        <!-- OPEN DROPDOWN -->
        <div v-if="isOpenDropdown" class="dropdown-menu">
            <div class="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-[9999]" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
                <!-- Month Dropdown -->
                <div v-if="props.option === DropdownOption.MONTH">
                    <div v-for="option in monthOptions" :key="option.text">
                        <a href="javascript:void(0)" @click="handleClickOption(option)" class="hover:bg-gray-200 text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem">{{option.text}}</a>
                    </div>
                </div>

                <!-- Status Dropdown -->
                <div v-if="props.option === DropdownOption.STATUS">
                    <div v-for="option in statusOptions" :key="option.text">
                        <a href="javascript:void(0)" @click="handleClickOption(option)" :class="option.class + 'hover:bg-gray-200 px-2 py-1 mx-2 my-4 flex text-center'" role="menuitem">{{option.text}}</a>
                    </div>
                </div>

            </div>
        </div>
    </div> 
</template>