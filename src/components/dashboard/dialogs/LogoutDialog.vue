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
import { defineProps } from 'vue';
import { logout } from '@/utils/http_config.js';

const router = useRouter();
const toast = useToast();

defineProps({
  sidebarCollapsed:{
    type: Boolean,
    default: false
  }
})

const logoutFunction = async () => {
    const response = await logout();
    console.log(response);
    // if(response.status === 200 || response.status === 401){
    //   localStorage.removeItem('access');
    //   localStorage.removeItem('refresh');
      
    //   router.push('/');
    //   toast.success("Successfully logged out.");
    //   console.log(response);
    // }
}

</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger>
        <div class="flex hover:bg-red-500/100">
            <div :class="['flex', 'items-center', 'justify-center',  '', 'py-4', 'px-4', 'rounded-lg', 'cursor-pointer']">
                <i class="pi pi-reply text-red-500 pr-4"></i>
                <p v-if="!sidebarCollapsed" class="text-white text-sm">Logout</p>
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
        <AlertDialogAction @click="logoutFunction" class="bg-red-500">Log Out</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>