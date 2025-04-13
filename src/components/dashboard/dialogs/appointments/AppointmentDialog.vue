<script setup lang="ts">
import CustomButton from '@/components/common/Button.vue';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { reactive, defineProps, ref, PropType } from 'vue';
import { httpPost, httpPatch, httpAddAppointment, httpUpdateAppointment} from '@/utils/http_config.js';
import { AppointmentModel } from '@/models/appointments/appointment_model';
import { mapFormToPayload } from '@/utils/map_helper';
import PhoneTextField  from '@/components/common/PhoneTextField.vue';
import { useToast } from 'vue-toastification';
import DropdownMenu from '@/components/dropdown/DropdownMenu.vue';
import { DropdownOption } from '@/components/dropdown/dropdownoptions';

const toast = useToast();

const props = defineProps({
  title: {
    type: String,
    default: "Add Appointment"
  },
  appointment: {
    type: Object as PropType<AppointmentModel>
  },
  isEdit: {
    type: Boolean,
    default: false
  }
});

// Initialize with empty form
const getEmptyForm = () => ({
    id: '',
    full_name: '',
    email: '',
    phone_number: '',
    date: '',
    reason: '',
    status: ''
});

const form = reactive(getEmptyForm());
const isDialogOpen = ref(false);

// Reset form when dialog opens
const resetForm = () => {
  const emptyForm = getEmptyForm();
  Object.keys(form).forEach(key => {
    form[key] = emptyForm[key];
  });
};

// Watch for dialog open/close
const handleDialogChange = (open) => {
  isDialogOpen.value = open;
  
  if (open) {
    // When dialog opens
    if (props.isEdit && props.appointment) {
      // Edit mode: populate with appointment data
      Object.assign(form, {...props.appointment});
    } else {
      // Add mode: reset to empty form
      resetForm();
    }
  }
};

const addAppointment = async () => {
    const payload = mapFormToPayload(form, ['status'])
    const data = await httpPost(httpAddAppointment, payload);

    if(data.status === 200 || data.status === 201){
        toast.success("Successfully created Appointment.");
    }else {
        toast.error(data['response']['data']['message'] ?? "Error creating Appointment.");
    }
};

const editAppointment = async () => {
    const payload = mapFormToPayload(form, []);
    const data = await httpPatch(httpUpdateAppointment, payload);

    console.log(data);
    if(data.status === 200){
        toast.success("Successfully updated Appointment.");
    }else {
        toast.error(data['response']['data']['message'] ?? "Error updating Appointment.");
    }
};

const emit = defineEmits(['submitted']);

const handleSubmit = async () => {
    if(props.isEdit){
       await editAppointment();
    } else {
       await addAppointment();
    }

    emit('submitted');
}
</script>

<template>
     <Dialog @update:open="handleDialogChange">
        <DialogTrigger as-child>
            <slot name="triggerbutton"></slot>            
        </DialogTrigger>
        <DialogContent 
            class="sm:min-w-[505px]"
            @interact-outside="event => {
                event.preventDefault();
            }">
            <DialogHeader>
                <DialogTitle>{{title}}</DialogTitle>
            </DialogHeader>

            <!-- contents -->
            <div class="grid gap-4 py-4">
                <div v-if="appointment"  class="grid grid-cols-4 items-center gap-4">
                    <Label for="photo" class="text-right">
                        Id
                    </Label>
                    <Input v-model="form.id" id="id" class="col-span-3" disabled/>
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="name" class="text-right">
                        Full Name
                    </Label>
                    <Input v-model="form.full_name" id="name"class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="reason" class="text-right">
                        Email
                    </Label>
                    <Input v-model="form.email" type="email" class="col-span-3" placeholder="juandelacruz@email.com" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="datetime" class="text-right">
                        Phone Number
                    </Label>
                    <PhoneTextField v-model="form.phone_number" class="col-span-3"></PhoneTextField>
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="datetime" class="text-right">
                        Date
                    </Label>
                    <Input v-model="form.date" id="date" type="date" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="datetime" class="text-right">
                        Reason
                    </Label>
                    <Textarea v-model="form.reason" id="reason" class="col-span-3" />
                </div>
                <div v-if="isEdit" class="grid grid-cols-4 items-center gap-4">
                    <Label for="datetime" class="text-right">
                        Status
                    </Label>
                    <DropdownMenu class="w-full" v-model="form.status" :title="form.status" :option="DropdownOption.STATUS"/>    
                </div>
            </div>
            <!-- end contents -->

            <DialogFooter>
                <DialogClose>
                    <CustomButton @click="handleSubmit" color="bg-dashboard-buttons-add" hoverColor="shadow-green-300" text="Submit"></CustomButton>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>