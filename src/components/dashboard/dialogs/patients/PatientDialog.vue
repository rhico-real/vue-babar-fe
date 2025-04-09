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
import { reactive, defineProps, onMounted } from 'vue';

const form = reactive({
    file: null,
    name: '',
    reason: '',
    dateAndTime: ''
});

const addPatient = () => {
    const payload = {
        'file': form.file,
        'name': form.name,
        'reason': form.reason,
        'date_and_time': form.dateAndTime
    };

    console.log(payload);
};

const uploadFile = (event) => {
  form.file = event.target.files[0];
};

const props = defineProps({
  title: {
    type: String,
    default: "Add Patient"
  },
  name: {
    type: String,
    default: ""
  },
  reason: {
    type: String,
    default: ""
  },
  dateAndTime: {
    type: String,
    default: ""
  }
});

onMounted(() => {
    form.name = props.name,
    form.reason = props.reason,
    form.dateAndTime = props.dateAndTime
})

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
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="photo" class="text-right">
                        Photo
                    </Label>
                    <Input @change="uploadFile" id="photo" type="file" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="name" class="text-right">
                        Name
                    </Label>
                    <Input v-model="form.name" id="name"class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="reason" class="text-right">
                        Reason
                    </Label>
                    <Textarea v-model="form.reason" class="col-span-3" placeholder="PCOS, Checkup, etc." />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="datetime" class="text-right">
                        Date and Time
                    </Label>
                    <Input v-model="form.dateAndTime" id="datetime" type="datetime-local" class="col-span-3" />
                </div>
            </div>
            <!-- end contents -->

            <DialogFooter>
                <DialogClose>
                    <CustomButton @click="addPatient" color="bg-dashboard-buttons-add" hoverColor="shadow-green-300" text="Submit">
                        Save changes
                    </CustomButton>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>