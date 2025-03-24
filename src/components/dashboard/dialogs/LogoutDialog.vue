<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();

const logout = async () => {
    const access = localStorage.getItem('access');
    const headers = {
        headers: {
            'Authorization': `Bearer ${access}`
        }
    }

    const refresh = localStorage.getItem('refresh');
    const payload = {"refresh": refresh};
    
    await axios.post('http://127.0.0.1:8000/api/auth/logout/', payload, headers)
        .then(function (response) {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            
            router.push('/');
            toast.success("Successfully logged out.");
            console.log(response);
        })
        .catch(function (error) {
            toast.error("Error logging out. Please contact administrator.")
            console.log(error);
        });
}

</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger>
        <div class="flex">
            <div :class="['flex', 'items-center', 'justify-center',  '', 'py-4', 'px-8', 'rounded-lg', 'cursor-pointer']">
                <i class="pi pi-clock text-white pr-4"></i>
                <p class="text-white text-sm">Logout</p>
            </div>
        </div>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
        <AlertDialogDescription>
            You will be redirected to home page and required to relogin again.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction @click="logout" class="bg-red-500">Log Out</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>