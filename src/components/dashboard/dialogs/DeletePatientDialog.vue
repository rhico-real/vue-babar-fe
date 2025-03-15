<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { defineProps } from 'vue';

defineProps({
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

</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger>
        <p class="ml-2 text-red-500 hover:underline">Delete</p>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
        <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the patient
            and remove the data from the server.
            <br>
            <br>
            <strong class="text-yellow-500">Patient details:</strong>
            <ul>
                <li><strong>Name:</strong> {{ name }}</li>
                <li><strong>Reason:</strong> {{ reason }}</li>
                <li><strong>Date and Time:</strong> {{ dateAndTime }}</li>
            </ul>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction class="bg-red-500">Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>