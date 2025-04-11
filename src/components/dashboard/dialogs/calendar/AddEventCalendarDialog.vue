<script setup>
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
import { defineProps, reactive, ref, watch, computed } from 'vue';
import { Label } from '@/components/ui/label';

const props = defineProps({
    date: {
        type: String,
        default: "No Date"
    },
    existingEvent: {
        type: Object,
        default: null
    }
});

const form = reactive({
    title: '',
    details: '',
    date: '',
    status: ''
});

const getStatus = (val) => {
    switch(val){
        case "P":
            return "Pending";
        case "D":
            return "Done";
        case "NS":
            return "No Show";
    }
}

// Reset form data when dialog opens
const dialogOpen = ref(false);

// Initialize form with existing event data if available
const initFormWithExistingEvent = () => {
    if (props.existingEvent) {
        form.title = props.existingEvent.title || '';
        form.details = props.existingEvent.details || '';
        form.date = props.existingEvent.date || '';
        form.status = getStatus(props.existingEvent.status) || '';
    } else {
        form.title = '';
        form.details = '';
        form.date = '';
        form.status = '';
    }
};

// Watch for dialog open state changes
const onOpenChange = (open) => {
    dialogOpen.value = open;
    if (open) {
        initFormWithExistingEvent();
    }
};

// Watch for changes in existingEvent prop
watch(() => props.existingEvent, () => {
    if (dialogOpen.value) {
        initFormWithExistingEvent();
    }
}, { deep: true });

const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        weekday: 'long' 
    };
    
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate.replace(', ', ' (') + ')';
};

// Formatted date for display
const formattedEventDate = computed(() => {
    return formatDate(form.date);
});
</script>

<template>
    <Dialog @update:open="onOpenChange">
        <DialogTrigger as-child>
            <slot name="triggerbutton"></slot>            
        </DialogTrigger>
        <DialogContent 
            class="sm:min-w-[505px]"
            @interact-outside="event => {
                event.preventDefault();
            }">
            <DialogHeader>
                <DialogTitle>{{ 'View Event for ' + date }}</DialogTitle>
            </DialogHeader>

            <!-- contents -->
            <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="title" class="text-right">
                        Full Name
                    </Label>
                    <Input v-model="form.title" id="title" class="col-span-3 disabled:opacity-100 disabled:cursor-not-allowed" placeholder="Event title" disabled />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="details" class="text-right">
                        Details
                    </Label>
                    <Textarea v-model="form.details" id="details" class="col-span-3 disabled:opacity-100 disabled:cursor-not-allowed" placeholder="Event details" disabled />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="eventDate" class="text-right">
                        Date
                    </Label>
                    <Input v-model="formattedEventDate" id="eventDate" class="col-span-3 disabled:opacity-100 disabled:cursor-not-allowed" placeholder="Event date" disabled />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="details" class="text-right">
                        Status
                    </Label>
                    <Input v-model="form.status" id="details" class="col-span-3 disabled:opacity-100 disabled:cursor-not-allowed" placeholder="Event details" disabled />
                </div>
            </div>
            <!-- end contents -->

            <DialogFooter>
                <DialogClose>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
