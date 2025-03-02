<template>
    <section>
        <div class="flex flex-col items-center justify-center mt-20">
            <h1 class="text-3xl font-semibold mb-2 text-center">Trusted by Thousands of Happy Customer</h1>
            <p class="text-gray-500 text-sm text-center">These are the stories of our customers who have joined us with great pleasure when using this crazy feature.</p>
        </div>

        <div class="lg:flex">   
            <div :class="`flex flex-col rounded-md border border-gray-200 hover:border-red-500 ${n != 0 ? 'lg:ml-6' : ''} px-8 pt-10 pb-6 mt-5 xl:mt-8`" v-for="n in 3">
                <div class="flex mb-5">
                    <div class="flex items-center">
                        <img src="https://next-landing-vpn.vercel.app/_next/image?url=%2Fassets%2Fpeople-3.png&w=64&q=75" alt="">
                        <div class="flex flex-col ml-3">
                            <p class="text-md font-semibold">Iezh Robert</p>
                            <p class="text-xs">Warsaw, Poland</p>
                        </div>
                    </div>
                    <div class="grow justify-end flex items-center">
                        <p class="text-sm pr-2">4.5</p>
                        <i class="text-sm pi pi-star-fill text-yellow-400"></i>
                    </div>
                </div>
                <div>
                    <p class="text-sm text-gray-500">Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best</p>
                </div>
            </div>
        </div>
        
    </section>
</template>