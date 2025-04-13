<script setup>
import Navigation from '@/components/dashboard/Navigation.vue';
import landscape from '@/assets/img/profile/landscape.jpg';
import profile from '@/assets/img/profile/profile.jpg';
import CustomButton from '@/components/common/Button.vue';
import { reactive, computed, onMounted, ref } from 'vue';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUserProfileStore } from '@/stores/userProfile';

// Get the user profile store
const userProfileStore = useUserProfileStore();
const isLoading = ref(false);

// Convert store date to readable format
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

// Initialize form with default values
const getEmptyForm = () => ({
    id: '',
    full_name: '',
    email: '',
    phone_number: '',
    date: '',
    reason: '',
    status: ''
});

// Create a reactive form
const form = reactive(getEmptyForm());

// Update the form with profile data when available
const updateFormFromProfile = () => {
  if (userProfileStore.profile) {
    form.id = userProfileStore.userId || '';
    form.full_name = userProfileStore.userFullName || '';
    
    // Date joined or current date as fallback
    if (userProfileStore.dateJoined) {
      const date = new Date(userProfileStore.dateJoined);
      form.date = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD for input[type=date]
    }
    
    // Additional fields would be populated here if available in the profile
  }
};

// Computed properties for the profile
const userFullName = computed(() => userProfileStore.userFullName);
const userRole = computed(() => userProfileStore.userRole);
const userPhotoUrl = computed(() => userProfileStore.userPhoto || profile); // Fallback to local image

// Refresh profile data
const refreshProfile = async () => {
  isLoading.value = true;
  try {
    await userProfileStore.fetchProfile();
    updateFormFromProfile();
  } catch (error) {
    console.error('Error refreshing profile:', error);
  } finally {
    isLoading.value = false;
  }
};

// On component mount, fetch profile and update form
onMounted(async () => {
  if (!userProfileStore.isLoggedIn) {
    await refreshProfile();
  } else {
    updateFormFromProfile();
  }
});
</script>

<template>
    <Navigation>
        <div class="h-full px-14 py-12">
            <img class="h-1/5 w-full object-none" :src="landscape" alt="coverpage">
            <div class="flex mt-10 items-center">
                <img class="inline-block size-32 rounded-full ring-2 ring-white object-cover" :src="userPhotoUrl" alt="profile">
                <div class="flex flex-col ml-4">
                    <h1 class="text-2xl font-bold">{{ userFullName || 'Jane Doe' }}</h1>
                    <h1 class="">{{ userRole || 'Admin' }}</h1>
                </div>
                <CustomButton class="ml-auto" text="Edit" color="bg-main"></CustomButton>
            </div>
            <div class="grid grid-cols-2 gap-4 mt-10">
                <!-- Row 1 -->
                <div class="flex items-center gap-2 w-full">
                    <Label for="name" class="w-20 text-right">Full Name</Label>
                    <Input v-model="form.full_name" id="name" class="w-full" />
                </div>
                <div class="flex items-center gap-2 w-full">
                    <Label for="email" class="w-20 text-right">Email</Label>
                    <Input v-model="form.email" id="email" type="email" placeholder="juandelacruz@email.com" class="w-ull" />
                </div>

                <!-- Row 2 -->
                <div class="flex items-center gap-2 w-full">
                    <Label for="date" class="w-20 text-right">Date</Label>
                    <Input v-model="form.date" id="date" type="date" class="w-full" />
                </div>
            </div>
        </div>
    </Navigation>
</template>