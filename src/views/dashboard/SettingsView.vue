<script setup lang="ts">
import Navigation from '@/components/dashboard/Navigation.vue';
import { Input } from '@/components/ui/input';
import { ref, reactive, watchEffect } from 'vue';
import CustomButton from '@/components/common/Button.vue';
import { useToast } from 'vue-toastification';
import logo from '@/assets/img/logo-1.png';
import { useSettingsStore } from '@/stores/settings';
import { updateSiteConfiguration } from '@/utils/dynamic_site_config';

const toast = useToast();
const settingsStore = useSettingsStore();

const settingsForm = reactive({
  id: null,
  name: '',
  photo: '',
  favicon: ''
});

watchEffect(() => {
  settingsForm.id = settingsStore.id;
  settingsForm.name = settingsStore.name;
  settingsForm.photo = settingsStore.photo;
  settingsForm.favicon = settingsStore.favicon;
});

const isEditing = ref(false);

const isHovered = ref(false);
const isLoadingPhoto = ref(false);
const isImageLoading = ref(false);
const fileInput = ref(null);

// favicon
const isHoveredFavicon = ref(false);
const isLoadingFavicon = ref(false);
const isImageLoadingFavicon = ref(false);
const fileInputFavicon  = ref(null);

const toggleEditMode = async () => {
  isEditing.value = !isEditing.value;

  if(!isEditing.value){
    const formData = new FormData();
    if(settingsForm.id) formData.append("id", settingsForm.id);
    formData.append("name", settingsForm.name);

    try {
      const response = await settingsStore.postSettings(formData);
      
      if (response.status === 200) {
        toast.success("Settings updated successfully.");
        // Update document title and favicon
        updateSiteConfiguration({
          name: settingsStore.name,
          favicon: settingsStore.favicon
        });
      } else {
        toast.error("Failed to update settings.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update error.");
    }
  }
}

// Function to trigger file input click
const showFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const showFileInputFavicon = () => {
  if (fileInputFavicon.value) {
    fileInputFavicon.value.click();
  }
};

// Handle file upload
const handleFileUpload = async (event) => {
  isLoadingPhoto.value = true;

  const file = event.target.files[0];
  if (!file) return;
  
  const formData = new FormData();
  if(settingsForm.id) formData.append("id", settingsForm.id);
  formData.append("photo", file);

  try {
    const response = await settingsStore.postSettings(formData);
    
    if (response.status === 200) {
      toast.success("Photo uploaded successfully.");
      // Update document title and favicon
      updateSiteConfiguration({
        name: settingsStore.name,
        favicon: settingsStore.favicon
      });
      setTimeout(() => {
        toast.info("Please wait for a couple of minutes for the photo to reflect.");
      }, 2000);
    } else {
      toast.error("Failed to upload photo.");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Upload error.");
  }

  isLoadingPhoto.value = false;
};

const handleFileUploadFavicon = async (event) => {
  isLoadingFavicon.value = true;

  const file = event.target.files[0];
  if (!file) return;
  
  const formData = new FormData();
  if(settingsForm.id) formData.append("id", settingsForm.id);
  formData.append("favicon", file);

  try {
    const response = await settingsStore.postSettings(formData);
    
    if (response.status === 200) {
      toast.success("Favicon uploaded successfully.");
      // Update document title and favicon
      updateSiteConfiguration({
        name: settingsStore.name,
        favicon: settingsStore.favicon
      });
      setTimeout(() => {
        toast.info("Please wait for a couple of minutes for the photo to reflect.");
      }, 2000);
    } else {
      toast.error("Failed to upload photo.");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Upload error.");
  }

  isLoadingFavicon.value = false;
};

</script>

<template>
  <Navigation>
    <div class="h-full bg-dashboard-background px-14 py-12">
      <!-- title -->
      <h1 class="text-3xl font-bold mb-10">Settings</h1>

      <!-- Settings Table -->
      <div class="bg-white w-full h-full rounded-lg p-10">
        <!-- Edit Button -->
        <div class="flex ml-auto mb-10 justify-end">
          <CustomButton 
            @click="toggleEditMode" 
            :text="isEditing ? 'Save Changes' : 'Edit'" 
            :color="isEditing ? '' : 'bg-main'"
            :class="isEditing ? 'border border-main' : ''"
            :textcolor="isEditing ? 'text-main' : 'text-white'"
          />
        </div>

        <!-- Name -->
        <div class="flex flex-col mb-10">
            <div class="grid grid-cols-12 gap-4">
              <h1 class="col-span-2 font-bold">Clinic Name:</h1>
              <Input v-model="settingsForm.name" class="col-span-10" :disabled="!isEditing"/>
            </div>
        </div>

        <!-- Photo -->
        <div class="flex flex-col mb-10">
            <div class="grid grid-cols-12 gap-4">
              <h1 class="col-span-2 font-bold">Clinic Photo:</h1>
              <div 
                class="relative inline-block w-[500px]"
                @mouseenter="isHovered = true"
                @mouseleave="isHovered = false"
                @click="showFileInput"
              >
                <div class="inline-block relative">
                  <!-- Image -->
                  <img 
                    class="inline-block max-h-[100px] rounded-lg ring-2 ring-white object-cover cursor-pointer transition-opacity duration-200 border-2 border-main" 
                    :class="{'opacity-60': isHovered}"
                    :src="settingsForm.photo || logo" 
                    alt="profile"
                    @load="isImageLoading = false"
                    @error="isImageLoading = false"
                  >
                  
                  
                  <!-- Loading Spinner (positioned on top of the image) -->
                  <div v-if="isLoadingPhoto || isImageLoading" 
                      class="absolute inset-0 flex items-center justify-center bg-main bg-opacity-70 rounded-lg">
                    <i class="pi pi-spinner pi-spin text-white text-2xl"></i>
                  </div>
                  
                  <!-- Hover overlay -->
                  <div 
                    v-if="isHovered && !isLoadingPhoto && !isImageLoading" 
                    class="absolute inset-0 flex flex-col items-center justify-center text-white cursor-pointer"
                  >
                    <i class="pi pi-camera text-2xl"></i>
                    <span class="text-xs mt-1">Upload photo</span>
                  </div>
                </div>
                
                <input 
                  type="file" 
                  ref="fileInput"
                  @change="handleFileUpload" 
                  accept="image/*" 
                  class="hidden"
                >
              </div>
            </div>
        </div>

        <!-- Favicon -->
        <div class="flex flex-col mb-10">
            <div class="grid grid-cols-12 gap-4">
              <h1 class="col-span-2 font-bold">Favicon:</h1>
              <div 
                class="relative inline-block w-[500px]"
                @mouseenter="isHoveredFavicon = true"
                @mouseleave="isHoveredFavicon = false"
                @click="showFileInputFavicon"
              >
                <div class="inline-block relative">
                  <!-- Image -->
                  <img 
                    class="inline-block max-h-[100px] w-auto rounded-lg ring-2 ring-white object-cover cursor-pointer transition-opacity duration-200 border-2 border-main" 
                    :class="{'opacity-60': isHoveredFavicon}"
                    :src="settingsForm.favicon || logo" 
                    alt="favicon"
                    @load="isImageLoadingFavicon = false"
                    @error="isImageLoadingFavicon = false"
                  >
                  
                  <!-- Loading Spinner (positioned on top of the image) -->
                  <div v-if="isLoadingFavicon || isImageLoadingFavicon" 
                      class="absolute inset-0 flex items-center justify-center bg-main bg-opacity-70 rounded-lg">
                    <i class="pi pi-spinner pi-spin text-white text-2xl"></i>
                  </div>
                  
                  <!-- Hover overlay -->
                  <div 
                    v-if="isHoveredFavicon && !isLoadingFavicon && !isImageLoadingFavicon" 
                    class="absolute inset-0 flex flex-col items-center justify-center text-white cursor-pointer"
                  >
                    <i class="pi pi-camera text-2xl"></i>
                    <span class="text-xs mt-1">Upload photo</span>
                  </div>
                </div>
                
                <input 
                  type="file" 
                  ref="fileInputFavicon"
                  @change="handleFileUploadFavicon" 
                  accept="image/*" 
                  class="hidden"
                >
              </div>
            </div>
        </div>
      </div>
    </div>
  </Navigation>
</template>