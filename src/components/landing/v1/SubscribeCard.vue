<script setup>
import Button from '@/components/common/Button.vue';
</script>

<template>
    <section>
        <div class="flex sm:flex-col lg:flex-row items-stretch sm:items-center sm:justify-center rounded-lg bg-white shadow-lg my-20 xl:mx-40 py-8 xl:px-20 sm:px-5">
            <div class="flex flex-col items-start">
                <h1 class="text-2xl/[30px] font-semibold w-72 mb-2 sm:text-center md:text-left">Subscribe Now for Get Special Features!</h1>
                <p class="text-sm text-gray-500 text-center sm:mb-10 md:mb-0">Let's subscribe with us and find the fun</p>
            </div>
            <div class="flex grow justify-end items-center">
                <Button text="Get Started"></Button>
            </div>
        </div>
    </section>
</template>