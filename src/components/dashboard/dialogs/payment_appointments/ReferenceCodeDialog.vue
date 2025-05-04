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
import { useRouter } from 'vue-router';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { AppointmentModel } from '@/models/appointments/appointment_model';

const appointmentStore = useAppointmentStore();
const router = useRouter();

const props = defineProps({
  referenceCode: {
    type: String,
    required: true
  }
})

const appointment = ref<Partial<AppointmentModel>>({});
const loading = ref(false);

const getAppointment = async () => {
  loading.value = true;
  try {
    const payload = {
      reference_code: props.referenceCode
    }
    const result = await appointmentStore.findAppointmentByReference(payload);
    appointment.value = result;
  } catch (error) {
    console.error('Error fetching appointment:', error);
  } finally {
    loading.value = false;
  }
}

const open = ref(false)

// Format key names to readable labels
const formatLabel = (key) => {
  return key
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Check if a field is a date field
const isDateField = (key) => {
  return ['created_at', 'updated_at', 'date', 'appointment_date'].includes(key.toLowerCase());
}

</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <button class="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer" @click="getAppointment">
        {{ referenceCode }}
      </button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Appointment Details</DialogTitle>
        <DialogDescription>
          Information for reference code: {{ referenceCode }}
        </DialogDescription>
      </DialogHeader>
      
      <!-- Loading state -->
      <div v-if="loading" class="text-center py-8">
        Loading appointment details...
      </div>
      
      <!-- Content when appointment data is loaded -->
      <div v-else-if="appointment" class="grid gap-4 py-4">
        <div v-for="(value, key) in appointment" :key="key" class="grid grid-cols-4 items-center justify-center gap-4">
          <Label :for="key" class="text-left">
              {{ key }}
          </Label>
          <Input v-model="appointment[key]" :id="key" :class="`${key != 'id' ? 'disabled:opacity-100 disabled:cursor-not-allowed': ''} col-span-3`" disabled/>
        </div>
      </div>
      
      <!-- No data state -->
      <div v-else class="text-center py-8">
        No appointment data available.
      </div>
      
      <div class="flex justify-end gap-2">
        <Button variant="outline" @click="open = false">Close</Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
