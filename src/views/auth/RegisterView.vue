<script setup>
import background from '@/assets/auth/background.png';
import canvas from '@/assets/auth/canvas.png';
import rocket from '@/assets/auth/rocket.png';
import logo from '@/assets/img/logo-1.png';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-vue-next'
import { ref } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { Label } from '@/components/ui/label'

const toast = useToast();

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const loadingButton = ref(false);

const state = ({
    identifier: '',
    full_name: '',
    password: '',
    confirm_password: ''
});

const register = async () => {
    loadingButton.value = true;

    if(state.password === state.confirm_password){
        const payload = {
        'identifier': state.identifier,
        'full_name': state.full_name,
        'password': state.password
    };

    console.log(payload);

    await axios.post('http://127.0.0.1:8000/api/auth/register/', payload)
        .then(function (response) {
            loadingButton.value = false;
            toast.success('Register Success.');
            console.log(response);
        })
        .catch(function (error) {
            loadingButton.value = false;
            toast.error('Error registering. Please contact administrator.');
            console.log(error);
        });
    } else {
        loadingButton.value = false;
        toast.error('Passwords do not match.');
    }
};
   

</script>

<template>
    <section :style="{backgroundImage: `url(${canvas})`}" class="bg-cover bg-center min-h-screen flex items-center justify-center">
        <!-- card -->
        <div class="flex w-3/4 bg-white rounded-lg shadow-lg overflow-hidden h-[800px]">
            <div :style="{backgroundImage: `url(${background})`}" class="hidden bg-cover bg-center flex-1 lg:flex items-center justify-center w-full h-full">
                <img :src="rocket" alt="Background" class="h-64 floating">
            </div>
            <div class="flex flex-1 items-center justify-center flex-col h-full">
                <img :src="logo" alt="Logo" class="h-16">
                <br>
                <h1 class="font-semibold lg:text-2xl sm:text-xl">Register Account</h1>
                <p class="text-gray-500 text-sm">Start your business.</p>
                <!-- textfields -->
                <div class="mt-5 w-full px-10">
                    <!-- email -->
                    <div class="mb-3">
                        <Label for="identifier" class="text-gray-500 text-sm">Email or Phone Number</Label>
                        <Input id="identifier" v-model="state.identifier" placeholder="mail@abc.com or +639xxxxxxxxx" />
                    </div>
                    <!-- fullname -->
                    <div class="mb-3">
                        <Label for="fullname" class="text-gray-500 text-sm">Full Name</Label>
                        <Input id="fullname" v-model="state.full_name" placeholder="Juan Dela Cruz" />
                    </div>
                    <!-- password -->
                    <div class="relative mb-3">
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
                    <!-- confirm password -->
                    <div class="relative">
                        <Label for="confirmpassword" class="text-gray-500 text-sm">Confirm Password</Label>
                        <Input id="confirmpassword" v-model="state.confirm_password" :type="showConfirmPassword ? 'text' : 'password'" class="w-full pr-12" />
                        <button 
                            type="button" 
                            @click="showConfirmPassword = !showConfirmPassword"
                            class="absolute inset-y-0 right-3 top-[29px] flex items-center text-gray-400 hover:text-gray-600"
                        >
                            <i :class="showConfirmPassword ? 'pi pi-eye-slash' : 'pi pi-eye'" class="w-5 h-5"></i>
                        </button>
                    </div>
                    <!-- login button -->
                    <div>
                        <Button v-if="loadingButton" disabled class="mt-5 w-full bg-sidebar">
                            <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                            Please wait
                        </Button>
                        <Button v-if="!loadingButton" @click="register" class="mt-5 w-full bg-sidebar">Create Account</Button>
                    </div>
                    <div class="text-sm mt-16 text-center">
                        <p>Already Registered? <span class="hover:underline text-sidebar cursor-pointer">
                            <RouterLink to="/auth/login">Login</RouterLink>
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