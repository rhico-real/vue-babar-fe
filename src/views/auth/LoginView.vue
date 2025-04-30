<script setup>
import background from '@/assets/auth/background.png';
import canvas from '@/assets/auth/canvas.png';
import rocket from '@/assets/auth/rocket.png';
import logo from '@/assets/img/logo-1.png';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-vue-next'
import { ref,reactive } from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { Label } from '@/components/ui/label'
import { useRouter } from 'vue-router';
import womanlogin from '@/assets/img/landing/woman-login.jpg'
import Navbar from '@/components/landing/v1/Navbar.vue';
import { httpPost, httpLogin } from '@/utils/http_config.js';

const toast = useToast();
const router = useRouter();

const showPassword = ref(false);
const loadingButton = ref(false);

const state = ({
    identifier: '',
    password: ''
});

const login = async () => {
    loadingButton.value = true;

    const payload = {
        'identifier': state.identifier,
        'password': state.password
    };

    console.log(payload);

    const response = await httpPost(httpLogin, payload, false);
    
    if(response.status === 200){
        console.log(response);

        localStorage.setItem('access', response.data['user']['tokens']['access']);
        localStorage.setItem('refresh', response.data['user']['tokens']['refresh']);
        
        loadingButton.value = false;
        toast.success('Login Success.');
        
        router.push('/dashboard');
    } else {
        loadingButton.value = false;
        toast.error('Error logging in.');
        console.log(error);
    }
};
</script>

<template>
    <Navbar/>
    <section :style="{backgroundImage: `url(${canvas})`}" class="bg-cover bg-center min-h-screen flex items-center justify-center">
        <!-- card -->
        <div class="flex w-3/4 bg-white rounded-lg shadow-lg overflow-hidden h-[600px]">
            <div :style="{backgroundImage: `url(${womanlogin})`}" class="hidden bg-cover bg-center flex-1 lg:flex items-center justify-center w-full h-full">
                <!-- <img :src="rocket" alt="Background" class="h-64 floating"> -->
            </div>
            <div class="flex flex-1 items-center justify-center flex-col h-full">
                <img :src="logo" alt="Logo" class="h-16">
                <br>
                <h1 class="font-semibold lg:text-2xl sm:text-xl">Login to your Account</h1>
                <p class="text-gray-500 text-sm">See what is going on with your business.</p>
                <!-- textfields -->
                <div class="mt-5 w-full px-10">
                    <!-- email -->
                    <div class="mb-3">
                        <Label for="identifier" class="text-gray-500 text-sm">Email or Phone Number</Label>
                        <Input id="identifier" v-model="state.identifier" placeholder="mail@abc.com or +639xxxxxxxxx" />
                    </div>
                    
                    <!-- password -->
                    <div class="relative">
                        <Label for="password" class="text-gray-500 text-sm">Password</Label>
                        <Input id="password" v-model="state.password" :type="showPassword ? 'text' : 'password'" class="w-full pr-12" />
                        <button 
                            type="button" 
                            @click="showPassword = !showPassword"
                            class="absolute inset-y-0 right-3 top-[29px] flex items-center text-gray-400 hover:text-gray-600"
                        >
                            <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'" class="w-5 h-5"></i>
                        </button>
                    </div>
                    <!-- login button -->
                    <div>
                        <Button v-if="loadingButton" disabled class="mt-5 w-full bg-main">
                            <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                            Please wait
                        </Button>
                        <Button v-if="!loadingButton" @click="login" class="mt-5 w-full bg-main">Login</Button>
                    </div>
                    <div class="text-sm mt-16 text-center">
                        <p>Not registered yet? <span class="hover:underline text-sidebar cursor-pointer">
                            <RouterLink to="/auth/register">Create an Account</RouterLink>
                        </span></p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
</template>

<style scoped>
    @keyframes floating {
        0% { transform: translateY(0); }
        50% { transform: translateY(-15px); }
        100% { transform: translateY(0); }
    }

    .floating {
    animation: floating 2s ease-in-out infinite;
    }
</style>