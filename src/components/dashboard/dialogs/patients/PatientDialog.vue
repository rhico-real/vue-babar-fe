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
import { reactive, defineProps, onMounted, watch, ref, PropType } from 'vue';
import { BASEURL, httpPost, httpPatch } from '@/utils/http_config.js';
import { AppointmentModel } from '@/models/appointments/appointment_model';
import { mapFormToPayload } from '@/utils/map_helper';
import PhoneTextField from '@/components/PhoneTextField.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const httpPatients = `${BASEURL}/api/patients/`;
const httpUploadPhotoPatient = `${BASEURL}/api/upload_patient_photo/`;

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

// Initialize with empty form
const getEmptyForm = () => ({
  id: '',
  first_name: '',
  middle_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  reason: ''
});

const form = reactive(getEmptyForm());
const photo = reactive({ file: null });
const isDialogOpen = ref(false);

// Reset form when dialog opens
const resetForm = () => {
  const emptyForm = getEmptyForm();
  Object.keys(form).forEach(key => {
    form[key] = emptyForm[key];
  });
  photo.file = null;
};

// Watch for dialog open/close
const handleDialogChange = (open) => {
  isDialogOpen.value = open;
  
  if (open) {
    // When dialog opens
    if (props.isEdit && props.patient) {
      // Edit mode: populate with patient data
      Object.assign(form, {...props.patient, full_name: undefined});
    } else {
      // Add mode: reset to empty form
      resetForm();
    }
  }
};

const addPatient = async () => {
    const payload = mapFormToPayload(form, ['id'])
    const data = await httpPost(httpPatients, payload);

    if(data.status === 200 || data.status === 201){
        if (photo.file) {
            const patientId = data.data?.id ?? form.id;
            toast.success("Successfully created Patient. Uploading Photo.");
            await uploadPhoto(patientId, photo.file);
        } else {
            toast.success("Successfully created Patient.");
        }
    }else {
        toast.error("Error creating Patient.");
    }
};

const editPatient = async () => {
    const payload = mapFormToPayload(form, []);
    const data = await httpPatch(httpPatients, payload);

    if(data.status === 200){
        if (photo.file) {
            const patientId = data.data?.id ?? form.id;
            toast.success("Successfully updated Patient. Updating Photo.");
            await uploadPhoto(patientId, photo.file);
        } else {
            toast.success("Successfully updated Patient.");
        }
    }else {
        toast.error("Error updating Patient.");
    }
};

const uploadPhoto = async (patientId, file) => {
    const formData = new FormData();
    formData.append("id", patientId);
    formData.append("photo", file);

    try {
        const response = await httpPost(httpUploadPhotoPatient, formData);
        
        if (response.status === 200) {
            toast.success("Photo uploaded successfully.");
            await setTimeout(() => {
                toast.info("Please wait for a couple of minutes for the photo to reflect.")
            }, 2000);
        } else {
            toast.error("Failed to upload photo.");
        }
    } catch (error) {
        toast.error(error.response?.data?.message || "Upload error.");
    }
};

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        photo.file = file;
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
                <div v-if="props.isEdit && props.patient" class="grid grid-cols-4 items-center gap-4">
                    <Label for="photo" class="text-right">
                        Id
                    </Label>
                    <Input v-model="form.id" id="id" class="col-span-3" disabled/>
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="name" class="text-right">
                        First Name
                    </Label>
                    <Input v-model="form.first_name" id="name" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="name" class="text-right">
                        Middle Name
                    </Label>
                    <Input v-model="form.middle_name" id="name" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="name" class="text-right">
                        Last Name
                    </Label>
                    <Input v-model="form.last_name" id="name" class="col-span-3" />
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
                    <Input id="photo" type="file" class="col-span-3" @change="handleFileUpload" /> 
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