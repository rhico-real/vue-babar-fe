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
import { defineProps, reactive, defineEmits, ref, watch } from 'vue';
import { Label } from '@/components/ui/label';
import CustomButton from '@/components/Button.vue';

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

const emit = defineEmits(['add-event']);

const form = reactive({
    title: '',
    details: ''
});

const isEditing = ref(false);

// Reset form data when dialog opens
const dialogOpen = ref(false);

// Handle form submission (create or update)
const handleSubmit = () => {
    if (form.title.trim()) {
        // Get the date object from the date string
        const dateParts = props.date.split('/');
        let eventDate;
        
        if (dateParts.length === 3) {
            // Format MM/DD/YYYY
            const month = parseInt(dateParts[0]) - 1; // 0-based month
            const day = parseInt(dateParts[1]);
            const year = parseInt(dateParts[2]);
            eventDate = new Date(year, month, day);
        } else {
            // Fallback to current date
            eventDate = new Date();
        }
        
        // Create or update event object
        const eventData = {
            id: isEditing.value && props.existingEvent ? props.existingEvent.id : `event-${Date.now()}`,
            title: form.title.trim(),
            details: form.details.trim(),
            date: eventDate
        };
        
        // Emit the event to parent component
        emit('add-event', eventData);
        
        // Reset form
        form.title = '';
        form.details = '';
    }
};

// Initialize form with existing event data if available
const initFormWithExistingEvent = () => {
    if (props.existingEvent) {
        isEditing.value = true;
        form.title = props.existingEvent.title || '';
        form.details = props.existingEvent.details || '';
    } else {
        isEditing.value = false;
        form.title = '';
        form.details = '';
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
                <DialogTitle>{{ isEditing ? 'Edit Event' : 'Add Event for ' + date }}</DialogTitle>
            </DialogHeader>

            <!-- contents -->
            <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="title" class="text-right">
                        Event Title
                    </Label>
                    <Input v-model="form.title" id="title" class="col-span-3" placeholder="Event title" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="details" class="text-right">
                        Details
                    </Label>
                    <Input v-model="form.details" id="details" class="col-span-3" placeholder="Event details" />
                </div>
            </div>
            <!-- end contents -->

            <DialogFooter>
                <DialogClose>
                    <CustomButton 
                        @click="handleSubmit" 
                        color="bg-dashboard-buttons-add" 
                        hoverColor="shadow-green-300" 
                        :text="isEditing ? 'Update Event' : 'Add Event'"
                    ></CustomButton>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
