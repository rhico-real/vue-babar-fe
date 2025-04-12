<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import image1 from '@/assets/img/landing/carousel/1.jpg';

// State for video modal
const isVideoModalOpen = ref(false);

// YouTube video URL
const videoUrl = 'https://www.youtube.com/embed/d5gliPZ-ZNo?autoplay=1';

// Functions to handle modal
const openVideoModal = () => {
  isVideoModalOpen.value = true;
  document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
};

const closeVideoModal = () => {
  isVideoModalOpen.value = false;
  document.body.style.overflow = ''; // Restore scrolling
};

// Close modal when clicking outside of the video
const handleBackdropClick = (event) => {
  if (event.target.classList.contains('video-modal-backdrop')) {
    closeVideoModal();
  }
};

// Close modal with escape key
const handleKeydown = (event) => {
  if (event.key === 'Escape' && isVideoModalOpen.value) {
    closeVideoModal();
  }
};

// Add and remove event listener for escape key
onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = ''; // Ensure scrolling is restored if component is unmounted while modal is open
});
</script>

<template>
  <section class="about-section py-16">
    <div class="container mx-auto">
      <!-- Section Title -->
      <h2 class="text-center text-3xl font-bold text-gray-700 mb-4">About Us</h2>
      <div class="w-20 h-1 bg-teal-500 mx-auto mb-8"></div>
      
      <!-- Subtitle/Description -->
      <p class="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit
      </p>
      
      <!-- Content with image and text -->
      <div class="flex flex-col lg:flex-row items-center gap-10">
        <!-- Left side - Video/Image with play button -->
        <div class="lg:w-1/2 relative cursor-pointer" @click="openVideoModal">
          <img 
            :src="image1" 
            alt="Hospital Building" 
            class="rounded-lg shadow-lg w-full h-auto object-cover"
          />
          <div class="absolute inset-0 flex items-center justify-center">
            <button class="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center shadow-lg hover:bg-teal-600 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Right side - Text content -->
        <div class="lg:w-1/2">
          <h3 class="text-2xl font-semibold text-gray-700 mb-4 font-sans">
            Voluptatem dignissimos provident quasi corporis voluptates sit assumenda.
          </h3>
          
          <p class="text-gray-600 italic mb-6 font-sans">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          
          <!-- Checkmarks with text -->
          <ul class="space-y-4 mb-6 font-sans">
            <li class="flex">
              <span class="text-teal-500 mr-2">✓</span>
              <span>Ullamco laboris nisi ut aliquip ex ea commodo consequat.</span>
            </li>
            <li class="flex">
              <span class="text-teal-500 mr-2">✓</span>
              <span>Duis aute irure dolor in reprehenderit in voluptate velit.</span>
            </li>
            <li class="flex">
              <span class="text-teal-500 mr-2">✓</span>
              <span>Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</span>
            </li>
          </ul>
          
          <p class="text-gray-600 font-sans">
            Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident
          </p>
        </div>
      </div>
    </div>
    
    <!-- Video Modal -->
    <div 
      v-if="isVideoModalOpen" 
      class="video-modal-backdrop fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center" 
      @click="handleBackdropClick"
    >
      <div class="relative w-11/12 md:w-10/12 lg:w-3/4 xl:w-2/3 aspect-video">
        <!-- Close button -->
        <button 
          @click="closeVideoModal" 
          class="absolute -top-10 right-0 text-white hover:text-gray-300 transition duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <!-- YouTube iframe -->
        <iframe 
          :src="videoUrl" 
          class="w-full h-full" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </section>
</template>

<style scoped>
.video-modal-backdrop {
  backdrop-filter: blur(3px);
}
</style>
