<script setup>
import { defineProps } from 'vue';

defineProps({
    text: {
        type: String,
        default: "No title"
    },
    isCircular: false
})

</script>

<template>
    <button type="submit" :class="isCircular ? ['font-bold', 'text-red-500', 'hover:bg-red-500', 'hover:text-white', 'hover:shadow-xl' ,'hover:shadow-red-300',  'text-sm' ,'py-1', 'w-full', 'rounded-full', 'border', 'border-red-500'] : ['px-11 py-3' ,'bg-red-500' ,'hover:shadow-xl' ,'hover:shadow-red-300', 'rounded-md', 'font-bold', 'text-white','text-sm']">
        {{ text }}
    </button>
</template>