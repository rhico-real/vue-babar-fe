<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue';
import type { PropType } from 'vue';
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
    }
});

const currentTitle = ref(props.title);
const isOpenDropdown = ref(false);

const handleClick = (option: DropdownModel) => {
    // close dropdown
    isOpenDropdown.value = false;

    // change the text of the dropdown
    currentTitle.value = option.text;

    // perform whatever function
    option.onClick?.();
};

</script>

<template>
    <div class=" relative inline-block text-left dropdown">
        <div v-if="option === DropdownOption.MONTH">
            <span @click="isOpenDropdown = !isOpenDropdown" class="rounded-md shadow-sm">
                <button class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800" 
                    type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
                    <span>{{currentTitle}}</span>
                    <svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </span>
        </div>

        <div v-if="option === DropdownOption.STATUS" class="w-full bg-red-200">
            <span @click="isOpenDropdown = !isOpenDropdown" class="rounded-md shadow-sm">
                <button class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800" 
                    type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
                    <span >{{currentTitle}}</span>
                    <svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </span>
        </div>
      
        <div v-if="isOpenDropdown" class="dropdown-menu">
            <div class="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-[9999]" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
                <!-- Sample UI -->
                <!-- <div class="py-1">
                    <a href="javascript:void(0)" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"  role="menuitem" >Account settings</a>
                    <a href="javascript:void(0)" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"  role="menuitem" >Support</a>
                    <span role="menuitem" tabindex="-1" class="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 cursor-not-allowed opacity-50" aria-disabled="true">New feature (soon)</span>
                    <a href="javascript:void(0)" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem" >License</a></div>
                <div class="py-1">
                    <a href="javascript:void(0)" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"  role="menuitem" >Sign out</a>
                </div> -->
                
                <!-- Month Dropdown -->
                <div v-if="props.option === DropdownOption.MONTH">
                    <div v-for="option in monthOptions" :key="option.text">
                        <a href="javascript:void(0)" @click="handleClick(option)" class="hover:bg-gray-200 text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem">{{option.text}}</a>
                    </div>
                </div>

                <!-- Status Dropdown -->
                <div v-if="props.option === DropdownOption.STATUS">
                    <div v-for="option in statusOptions" :key="option.text">
                        <a href="javascript:void(0)" @click="handleClick(option)" :class="option.class + 'hover:bg-gray-200 px-2 py-1 mx-2 my-4 flex text-center'" role="menuitem">{{option.text}}</a>
                    </div>
                </div>

            </div>
        </div>
    </div> 
</template>

<!-- <style scoped>
    .dropdown:focus-within .dropdown-menu {
        display:block;
    }
</style> -->
