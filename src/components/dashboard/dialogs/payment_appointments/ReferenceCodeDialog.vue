<script setup lang="ts">
import { ref } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useAppointmentStore } from '@/stores/appointment';

const appointmentStore = useAppointmentStore();

const props = defineProps({
  referenceCode: {
    type: String,
    required: true
  },
  paymentData: {
    type: Object,
    required: true
  }
})

const appointment = ref('');

const getAppointment = async () => {
  const payload = {
    reference_code: props.referenceCode
  }

  appointment.value = await appointmentStore.filterAnyAppointments(payload);
  console.log(appointment.value);
}

const open = ref(false)
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <button class="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer" @click="getAppointment">
        {{ referenceCode }}
      </button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[700px]">
      <DialogHeader>
        <DialogTitle>Reference Code Details</DialogTitle>
        <DialogDescription>
          Payment information for reference code: {{ referenceCode }}
        </DialogDescription>
      </DialogHeader>
      
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-left gap-4">
          <label class="text-left font-medium col-span-2">Reference Code:</label>
          <span class="col-span-2">{{ paymentData.reference_code }}</span>
        </div>
        
        <div class="grid grid-cols-4 items-center gap-4">
          <label class="text-right font-medium">Status:</label>
          <span class="col-span-3">
            <span 
              :class="{
                'text-green-600': paymentData.status === 'approved',
                'text-yellow-600': paymentData.status === 'pending',
                'text-red-600': paymentData.status === 'rejected'
              }"
              class="font-medium"
            >
              {{ paymentData.status }}
            </span>
          </span>
        </div>
        
        <div class="grid grid-cols-4 items-center gap-4">
          <label class="text-right font-medium">Created:</label>
          <span class="col-span-3">{{ new Date(paymentData.created_at).toLocaleString() }}</span>
        </div>
        
        <div class="grid grid-cols-4 items-center gap-4">
          <label class="text-right font-medium">Updated:</label>
          <span class="col-span-3">{{ new Date(paymentData.updated_at).toLocaleString() }}</span>
        </div>
      </div>
      
      <div class="flex justify-end">
        <Button @click="open = false">Close</Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
