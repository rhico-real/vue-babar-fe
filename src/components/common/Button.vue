<script setup>
import { defineProps } from 'vue';

defineProps({
    text: {
        type: String,
        default: "No title"
    },
    isCircular: false,
    color: {
        type: String,
        default: "bg-main"
    },
    textcolor: {
        type: String,
        default: "text-white"
    },
    hoverColor: {
        type: String,
        default: "shadow-gray-100"
    },
    isAdd: false
})
</script>

<template>
    <button type="submit" :class="isCircular ? 
    ['font-bold', 'text-red-500', 'hover:bg-main', 'hover:text-white', 'hover:shadow-xl' ,'hover:shadow-red-300',  'text-sm' ,'py-1', 'w-full', 'rounded-full', 'border', 'border-red-500'] : 
    ['px-11 py-3' , color ,'hover:shadow-xl' ,'hover:'+hoverColor, 'rounded-md', 'font-bold', textcolor,'text-sm']">
        <i v-if="isAdd" class="pi pi-plus mr-2"></i>
        {{ text }}
    </button>
</template>