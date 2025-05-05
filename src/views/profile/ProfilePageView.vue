<script setup>
import Navigation from '@/components/dashboard/Navigation.vue';
import landscape from '@/assets/img/profile/landscape.jpg';
import profile from '@/assets/img/profile/profile.jpg';
import CustomButton from '@/components/common/Button.vue';
import { reactive, computed, onMounted, ref } from 'vue';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUserProfileStore } from '@/stores/userProfile';
import { httpPost, httpPatch, httpUploadProfilePhoto, httpEditProfile } from '@/utils/http_config.js';
import { useToast } from 'vue-toastification';

// Initialize services and state
const toast = useToast();
const userProfileStore = useUserProfileStore();
const isLoading = ref(false);
const isLoadingProfilePhoto = ref(false);
const fileInput = ref(null);
const isHovered = ref(false);
const isEditing = ref(false);
const isImageLoading = ref(true);

// Computed properties for the profile
const userId = computed(() => userProfileStore.userId);
const userIdentifier = computed(() => userProfileStore.userIdentifier);
const userFullName = computed(() => userProfileStore.userFullName);
const userRole = computed(() => userProfileStore.userRole);
const userDateJoined = computed(() => userProfileStore.dateJoined);
const userPhotoUrl = computed(() => userProfileStore.userPhoto || profile);

// Function to trigger file input click
const showFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

// Handle file upload
const handleFileUpload = async (event) => {
  isLoadingProfilePhoto.value = true;

  const file = event.target.files[0];
  if (!file) return;
  
  const formData = new FormData();
  formData.append("id", userId.value);
  formData.append("photo", file);

  try {
    const response = await httpPost(httpUploadProfilePhoto, formData);
    
    if (response.status === 200) {
      toast.success("Photo uploaded successfully.");
      setTimeout(() => {
        toast.info("Please wait for a couple of minutes for the photo to reflect.");
      }, 2000);
    } else {
      toast.error("Failed to upload photo.");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Upload error.");
  }

  isLoadingProfilePhoto.value = false;
};

// Toggle edit mode
const toggleEditMode = () => {
  isEditing.value = !isEditing.value;
  
  // If canceling edit, refresh the profile data to revert changes
  if (!isEditing.value) {
    refreshProfile();
  }
};

// Save changes
const saveChanges = async () => {
  isLoading.value = true;
  try {
    const payload = {
      id: userId.value,
      full_name: form.full_name
    };

    const response = await httpPatch(httpEditProfile, payload);
    if (response.status === 200) {
      await userProfileStore.fetchProfile();
      await refreshProfile();

      toast.success("Profile updated successfully.");
    } else {
        toast.error("Error uploading profile.");
    }

    isEditing.value = false;
  } catch (error) {
    console.error('Failed to save profile:', error);
    toast.error("Failed to update profile");
  } finally {
    isLoading.value = false;
  }
};

// Convert store date to readable format
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    // Try to create a valid date object
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.log('Invalid date format:', dateString);
      return '';
    }
    
    // Return in YYYY-MM-DD format for date input
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

// Initialize form with default values
const getEmptyForm = () => ({
  identifier: '',
  full_name: '',
  date_joined: ''
});

// Create a reactive form
const form = reactive(getEmptyForm());

// Update the form with profile data when available
const updateFormFromProfile = () => {
  form.identifier = userIdentifier.value || '';
  form.full_name = userFullName.value || '';
  
  // Format the date safely
  form.date_joined = formatDate(userDateJoined.value);
};

// Refresh profile data
const refreshProfile = async () => {
  isLoading.value = true;
  try {
    updateFormFromProfile();
  } catch (error) {
    console.error('Error refreshing profile:', error);
  } finally {
    isLoading.value = false;
  }
};

// On component mount, fetch profile and update form
onMounted(async () => {
  try {
    // Ensure we have the latest profile data first
    await userProfileStore.fetchProfile();
    
    // Then refresh our local form with that data
    await refreshProfile();
  } catch (error) {
    console.error('Failed to load profile on mount:', error);
  }
});
</script>

<template>
  <Navigation>
    <div class="h-full px-14 py-12">
      <img class="h-1/5 w-full object-none" :src="landscape" alt="coverpage">
      <div class="flex mt-10 items-center">
        <div 
          class="relative inline-block"
          @mouseenter="isHovered = true"
          @mouseleave="isHovered = false"
          @click="showFileInput"
        >
          <!-- Loading Spinner -->
          <div v-if="isLoadingProfilePhoto || isImageLoading" 
               class="absolute inset-0 flex items-center justify-center bg-main bg-opacity-70 rounded-full z-10">
            <i class="pi pi-spinner pi-spin text-white text-2xl"></i>
          </div>
          
          <img 
            class="inline-block size-32 rounded-full ring-2 ring-white object-cover cursor-pointer transition-opacity duration-200" 
            :class="{'opacity-60': isHovered}"
            :src="userPhotoUrl" 
            alt="profile"
            @load="isImageLoading = false"
            @error="isImageLoading = false"
          >
          
          <div 
            v-if="isHovered && !isLoadingProfilePhoto && !isImageLoading" 
            class="absolute inset-0 flex flex-col items-center justify-center text-white cursor-pointer"
          >
            <i class="pi pi-camera text-2xl"></i>
            <span class="text-xs mt-1">Upload photo</span>
          </div>
          
          <input 
            type="file" 
            ref="fileInput"
            @change="handleFileUpload" 
            accept="image/*" 
            class="hidden"
          >
        </div>
        <div class="flex flex-col ml-4">
          <h1 class="text-2xl font-bold">{{ userFullName || 'Jane Doe' }}</h1>
          <h1 class="">{{ userRole || 'Admin' }}</h1>
        </div>
        <div class="ml-auto flex gap-2">
          <!-- Edit button: solid when not editing, outline when editing -->
          <CustomButton 
            @click="toggleEditMode" 
            :text="isEditing ? 'Cancel' : 'Edit'" 
            :color="isEditing ? '' : 'bg-main'"
            :class="isEditing ? 'border border-main' : ''"
            :textcolor="isEditing ? 'text-main' : 'text-white'"
          />
          
          <!-- Save button - only shown when editing -->
          <CustomButton 
            v-if="isEditing" 
            @click="saveChanges" 
            text="Save" 
            color="bg-green-600"
            :class="isLoading ? 'opacity-50 cursor-not-allowed' : ''"
            :disabled="isLoading"
          />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-10">
        <!-- Row 1 -->
        <div class="flex items-center gap-2 w-full">
          <Label for="name" class="w-20 text-right">Full Name</Label>
          <Input 
            v-model="form.full_name" 
            id="name" 
            class="w-full" 
            :readonly="!isEditing"
            :class="!isEditing ? 'bg-gray-100' : ''"
          />
        </div>
        <div class="flex items-center gap-2 w-full">
          <Label for="email" class="w-20 text-right">Identifier</Label>
          <Input 
            v-model="form.identifier" 
            id="identifier" 
            readonly
            class="w-full bg-gray-100 text-gray-500"
          />
        </div>

        <!-- Row 2 -->
        <div class="flex items-center gap-2 w-full">
          <Label for="date" class="w-20 text-right">Date Joined</Label>
          <Input 
            v-model="form.date_joined" 
            id="date" 
            type="date" 
            class="w-full bg-gray-100 text-gray-500"
            readonly
          />
        </div>
      </div>
    </div>
  </Navigation>
</template>

<style scoped>
/* Styling for profile overlay when needed */
</style>