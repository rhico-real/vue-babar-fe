<script setup>
import Navbar from '@/components/landing/v1/Navbar.vue';
import bg1 from '@/assets/landing/bg-1.png';
import gcashlogo from '@/assets/landing/gcash.png';
import mayalogo from '@/assets/landing/maya.png';
import qrphlogo from '@/assets/landing/qrph.png';
import { ref } from 'vue';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import router from '@/router';
import { useToast } from 'vue-toastification';
import { httpPost, httpFindAppointmentByReference } from '@/utils/http_config.js';
import { Loader2 } from 'lucide-vue-next';

const toast = useToast();

const referenceCode = ref('');
const loadingButton = ref(false);
const defaultValue = ref('');

const paynow = async () => {
    loadingButton.value = true;
    if(await doesAppointmentExist() == 200){
        router.push('pay/' + referenceCode.value);
    } else {
        toast.error('Appointment does not exist.');
        loadingButton.value = false;
    }
}

const doesAppointmentExist = async () => {
    const payload = {
        reference_code: referenceCode.value
    };

    const data = await httpPost(httpFindAppointmentByReference, payload, false);
    return data.status;
}
const showReferenceCode = ref(false);

</script>

<template>
    <Navbar/>
    <section class="overflow-y-auto">
        <div class="flex flex-col-reverse md:flex-row min-h-screen">
            <!-- Payment Options -->
            <div class="w-full md:w-6/12 min-h-screen px-6 sm:px-10 md:px-20 py-10">
                <h1 class="text-2xl md:text-3xl font-bold text-center">Pay for your Appointment</h1>
                <div class="flex flex-col sm:flex-row items-center justify-center mt-5 space-y-3 sm:space-y-0">
                    <p class="text-lg md:text-xl font-bold">We Accept:</p>
                    <div class="flex items-center justify-center bg-gray-100 px-4 sm:px-8 md:px-12 py-3 md:py-5 rounded-lg ml-0 sm:ml-3">
                        <img class="h-5 md:h-7" :src="gcashlogo" alt="gcashlogo">
                        <img class="h-5 md:h-7 mx-4 sm:mx-6 md:mx-10" :src="mayalogo" alt="mayalogo">
                        <img class="h-5 md:h-7" :src="qrphlogo" alt="qrphlogo">
                    </div>
                </div>
                <div class="mt-10 md:mt-20">
                    <Label for="refcode" class="text-right text-lg md:text-xl font-bold">
                        Enter Reference Code of your Appointment:
                    </Label>
                    <Input v-model="referenceCode" id="refcode" class="col-span-3 mt-3 text-base md:text-xl h-10"/>
                    <div class="w-full sm:w-40">
                        <Button v-if="loadingButton" disabled class="mt-5 w-full bg-main">
                            <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                            Please wait
                        </Button>
                        <Button v-if="!loadingButton" @click="paynow" class="mt-5 w-full bg-main">Pay Now</Button>
                    </div>
                </div>
                
                <div class="mt-16 md:mt-24 lg:mt-32">
                    <Accordion type="single" class="w-full" collapsible :default-value="defaultValue">
                        <AccordionItem value="item-1">
                            <AccordionTrigger class="text-base md:text-xl">Forgot Reference Code?</AccordionTrigger>
                            <AccordionContent class="bg-gray-50 p-5 md:p-10">
                                <div>
                                    <Label for="refcode" class="text-right text-md">
                                        Enter your Full Name:
                                    </Label>
                                    <Input v-model="referenceCode" id="refcode" class="col-span-3 mt-3 h-10"/>
                                </div>

                                <div class="mt-5">
                                    <Label for="refcode" class="text-right text-md">
                                        Enter date of Appointment:
                                    </Label>
                                    <Input v-model="referenceCode" id="refcode" class="col-span-3 mt-3 h-10" type="date"/>
                                </div>

                                <div class="w-full sm:w-40">
                                    <Button v-if="loadingButton" disabled class="mt-5 w-full bg-main">
                                        <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                                        Please wait
                                    </Button>
                                    <Button v-if="!loadingButton" @click="paynow" class="mt-5 w-full bg-white border-2 border-main text-main hover:text-white">Get Reference Code</Button>
                                </div>

                                <div v-if="showReferenceCode" class="mt-10">
                                    <p class="text-center text-md text-red-500">Reference Code:</p>
                                    <div class="flex items-center justify-center">
                                        <p class="text-center text-xl text-red-500 font-bold">ABC123</p>
                                        <i class="pi pi-clone ml-3 text-xl font-bold text-blue-500 cursor-pointer hover:text-blue-800"></i>
                                    </div>

                                    <div class="mt-10">
                                        <p class="font-bold">Instructions:</p>
                                        <ol>
                                            <li>1. Copy the Reference Code above.</li>
                                            <li>2. Paste it on the "Enter booking code" above.</li>
                                            <li>3. You may go ahead and proceed with "Pay Now"</li>
                                        </ol>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>

            <!-- Color sidebar -->
            <div class="w-full md:w-6/12 h-64 md:h-screen bg-landing-paymentblue">
                <img class="h-full object-cover w-full" :src="bg1" alt="background 1">
            </div>
        </div>
    </section>
</template>