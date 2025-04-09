<script setup lang="ts">
import CustomButton from '@/components/Button.vue';
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'
import { reactive, defineProps, onMounted, PropType } from 'vue';
import { BASEURL, httpPost, httpPatch } from '@/utils/http_config.js';
import { AppointmentModel } from '@/models/appointments/appointment_model';
import { mapFormToPayload } from '@/utils/map_helper';
import PhoneTextField  from '@/components/PhoneTextField.vue';
import { useToast } from 'vue-toastification';
import { stat } from 'fs';

const toast = useToast();

const httpUpdateAppointment = `${BASEURL}/api/update_appointment/`;
const httpAddAppointment = `${BASEURL}/api/add_appointment/`;

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

onMounted(() => {
    if(props.appointment){
        Object.assign(form, props.appointment);
    }
})

const form = reactive({
    id: '',
    full_name: '',
    email: '',
    phone_number: '',
    date: '',
    reason: '',
    status: ''
});

const addAppointment = async () => {
    const payload = mapFormToPayload(form, ['status'])
    const data = await httpPost(httpAddAppointment, payload);

    if(data.status === 200 || data.status === 201){
        toast.success("Successfully created Appointment.");
    }else {
        toast.error("Error creating Appointment.");
    }
};

const editAppointment = async () => {
    const payload = mapFormToPayload(form, ['status'])
    const data = await httpPatch(httpUpdateAppointment, payload);

    if(data.status === 200){
        toast.success("Successfully updated Appointment.");
    }else {
        toast.error("Error updating Appointment.");
    }
};

const handleSubmit = () => {
    if(props.isEdit){
        editAppointment();
    } else {
        addAppointment();
    }
}
</script>

<template>
     <Dialog>
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
                    <Input v-model="form.date" id="datetime" type="datetime-local" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="datetime" class="text-right">
                        Reason
                    </Label>
                    <Input v-model="form.reason" id="reason" class="col-span-3" />
                </div>
                <!-- <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="datetime" class="text-right">
                        Status
                    </Label>
                    <Input v-model="form.dateAndTime" id="datetime" type="datetime-local" class="col-span-3" />
                </div> -->
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