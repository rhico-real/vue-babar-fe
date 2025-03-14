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
        default: "bg-red-500"
    },
    hoverColor: {
        type: String,
        default: "shadow-red-300"
    }
})

</script>

<template>
    <button type="submit" :class="isCircular ? 
    ['font-bold', 'text-red-500', 'hover:bg-red-500', 'hover:text-white', 'hover:shadow-xl' ,'hover:shadow-red-300',  'text-sm' ,'py-1', 'w-full', 'rounded-full', 'border', 'border-red-500'] : 
    ['px-11 py-3' , color ,'hover:shadow-xl' ,'hover:'+hoverColor, 'rounded-md', 'font-bold', 'text-white','text-sm']">
        <i class="pi pi-plus mr-2"></i>
        {{ text }}
    </button>
</template>