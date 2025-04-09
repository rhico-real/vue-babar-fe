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
import { reactive, defineProps, onMounted, PropType } from 'vue';
import { BASEURL, httpPost, httpPatch } from '@/utils/http_config.js';
import { AppointmentModel } from '@/models/appointments/appointment_model';
import { mapFormToPayload } from '@/utils/map_helper';
import PhoneTextField  from '@/components/PhoneTextField.vue';
import { useToast } from 'vue-toastification';
import DropdownMenu from '@/components/dropdown/DropdownMenu.vue';
import { DropdownOption } from '@/components/dropdown/dropdownoptions';

const toast = useToast();

const httpPatients = `${BASEURL}/api/patients/`;

const props = defineProps({
  title: {
    type: String,
    default: "Add Patient"
  },
  patient: {
    type: Object as PropType<AppointmentModel>
  },
  isEdit: {
    type: Boolean,
    default: false
  }
});

onMounted(() => {
    if(props.patient){
        console.log(props.patient);

        const fullName = props.patient.full_name || '';
        const nameParts = fullName.trim().split(' ');

        form.first_name = nameParts[0] || '';
        form.middle_name = nameParts.length === 3 ? nameParts[1] : '';
        form.last_name = nameParts.length >= 2 ? nameParts[nameParts.length - 1] : '';

        Object.assign(form, {...props.patient, full_name: undefined});
    }
})

const form = reactive({
    id: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    date: '',
    reason: '',
    photo: ''
});

const addPatient = async () => {
    const payload = mapFormToPayload(form, ['id'])
    const data = await httpPost(httpPatients, payload);

    if(data.status === 200 || data.status === 201){
        toast.success("Successfully created Patient.");
    }else {
        toast.error("Error creating Patient.");
    }
};

const editPatient = async () => {
    const payload = mapFormToPayload(form, []);
    const data = await httpPatch(httpPatients, payload);

    if(data.status === 200){
        toast.success("Successfully updated Patient.");
    }else {
        toast.error("Error updating Patient.");
    }
};

const emit = defineEmits(['submitted']);

const handleSubmit = async () => {
    if(props.isEdit){
       await editPatient();
    } else {
       await addPatient();
    }

    emit('submitted');
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
                <div v-if="patient"  class="grid grid-cols-4 items-center gap-4">
                    <Label for="photo" class="text-right">
                        Id
                    </Label>
                    <Input v-model="form.id" id="id" class="col-span-3" disabled/>
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="name" class="text-right">
                        First Name
                    </Label>
                    <Input v-model="form.first_name" id="name"class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="name" class="text-right">
                        Middle Name
                    </Label>
                    <Input v-model="form.middle_name" id="name"class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="name" class="text-right">
                        Last Name
                    </Label>
                    <Input v-model="form.last_name" id="name"class="col-span-3" />
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
                        Reason
                    </Label>
                    <Input v-model="form.reason" id="reason" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="datetime" class="text-right">
                        Photo
                    </Label>
                    <Input v-model="form.photo" id="photo" type="file" class="col-span-3" /> 
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