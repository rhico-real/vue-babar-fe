<script setup>
    import doctor from '@/assets/img/landing/doctor.png';
    import canvas from '@/assets/auth/canvas.png';
</script>

<template>
    <div class="w-full flex justify-center">
        <div :style="{backgroundImage: `url(${canvas})`}" class="bg-cover bg-center w-10/12 bg-blue-100 flex">
            <div class="w-full mt-20 flex justify-center items-center">
                <div class="w-8/12 ">
                    <h1 class="text-3xl font-bold text-white">Welcome to</h1>
                    <h1 class="text-3xl font-bold text-white">BABAR APPOINTMENTS</h1>
                    <p class="mt-5 text-gray-200">Nemo enim ipsam voluptatem quia voluptas sit aut aspernatur aut fugit sed quia consequuntur magni dolores ratione voluptatem nesciunt.</p>
                </div>
            </div>
            <img class="w-4/12" :src="doctor" alt="doctor">
        </div>
    </div>
</template>