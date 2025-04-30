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
import { Label } from '@/components/ui/label';
import { reactive, defineProps, ref, PropType } from 'vue';
import { httpPost, httpPatch, httpPatchUpdatePayment } from '@/utils/http_config.js';
import { AppointmentModel } from '@/models/appointments/appointment_model';
import { mapFormToPayload } from '@/utils/map_helper';
import PhoneTextField from '@/components/common/PhoneTextField.vue';
import { useToast } from 'vue-toastification';
import { PaymentModel } from '@/models/payments/payment_model';
import DropdownMenu from '@/components/dropdown/DropdownMenu.vue';
import { DropdownOption } from '@/components/dropdown/dropdownoptions';

const toast = useToast();

const props = defineProps({
  title: {
    type: String,
    default: "Add Payment"
  },
  payment: {
    type: Object as PropType<PaymentModel>
  },
  isEdit: {
    type: Boolean,
    default: false
  }
});

// Initialize with empty form
const getEmptyForm = () => ({
  reference_code: '',
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
    if (props.isEdit && props.payment) {
      // Edit mode: populate with patient data
      Object.assign(form, {...props.payment, full_name: undefined});
    } else {
      // Add mode: reset to empty form
      resetForm();
    }
  }
};

const editPayment = async () => {
    const payload = mapFormToPayload(form, []);
    const data = await httpPatch(httpPatchUpdatePayment, payload);

    if(data.status === 200){
        toast.success("Successfully updated Payment.");
    }else {
        toast.error("Error updating Payment.");
    }
};

const emit = defineEmits(['submitted']);

const handleSubmit = async () => {
    if(props.isEdit){
       await editPayment();
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
                <div v-if="props.isEdit && props.payment" class="grid grid-cols-4 items-center gap-4">
                    <Label for="reference_code" class="text-right">
                        Reference Code
                    </Label>
                    <Input v-model="form.reference_code" id="id" class="col-span-3" disabled/>
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="status" class="text-right">
                        Status
                    </Label>
                    <DropdownMenu class="w-full" v-model="form.status" :title="form.status" :option="DropdownOption.PAYMENT_STATUS"/>    
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