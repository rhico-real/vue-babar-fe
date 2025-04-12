<script setup>
import Button from '@/components/Button.vue';

</script>

<template>
    <section class="pt-4">
        <div class="sm:flex md:grid md:grid-cols-2 items-center">
            <div class="sm:order-last md:pl-10 md:pt-10 md:flex">
                <img class=" h-[20rem] object-contain md:flex-auto" src="https://next-landing-vpn.vercel.app/_next/image?url=%2Fassets%2FIllustration1.png&w=1080&q=100" alt="">
            </div>
            <div class="md:my-8">
                <h1 class="mb-3 text-lg font-semibold text-3xl">Want anything to be easy with <strong class="font-bold">LaslesVPN</strong></h1>
                <p class="text-sm text-gray-500 py-2">Provide a network for all your needs with ease and fun using LaslesVPN discover interesting features from us.</p>
                <Button class="my-3" text="Get Started"></Button>
            </div>
        </div>
    </section>
</template>