<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const props = defineProps({
  // Array of slide objects with image and content
  slides: {
    type: Array,
    required: true
  },
  // Autoplay interval in milliseconds
  interval: {
    type: Number,
    default: 5000
  },
  // Enable autoplay
  autoplay: {
    type: Boolean,
    default: true
  },
  // Show navigation arrows
  showArrows: {
    type: Boolean,
    default: true
  },
  // Show navigation dots
  showDots: {
    type: Boolean,
    default: true
  },
  // Height of the carousel
  height: {
    type: String,
    default: '500px'
  }
});

const currentIndex = ref(0);
const autoplayInterval = ref(null);

// Calculate total number of slides
const totalSlides = computed(() => props.slides.length);

// Start autoplay if enabled
const startAutoplay = () => {
  if (props.autoplay && !autoplayInterval.value) {
    autoplayInterval.value = setInterval(() => {
      next();
    }, props.interval);
  }
};

// Stop autoplay
const stopAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value);
    autoplayInterval.value = null;
  }
};

// Go to previous slide
const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + totalSlides.value) % totalSlides.value;
};

// Go to next slide
const next = () => {
  currentIndex.value = (currentIndex.value + 1) % totalSlides.value;
};

// Go to specific slide
const goToSlide = (index) => {
  currentIndex.value = index;
};

// Pause autoplay on hover if autoplay is enabled
const pauseAutoplay = () => {
  if (props.autoplay) {
    stopAutoplay();
  }
};

// Resume autoplay on hover leave if autoplay is enabled
const resumeAutoplay = () => {
  if (props.autoplay) {
    startAutoplay();
  }
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});
</script>

<template>
  <div 
    class="carousel-container"
    :style="{ height }"
    @mouseenter="pauseAutoplay" 
    @mouseleave="resumeAutoplay"
  >
    <div class="carousel-wrapper">
      <div 
        class="carousel-slides" 
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div 
          v-for="(slide, index) in slides" 
          :key="index" 
          class="carousel-slide"
        >
          <img :src="slide.image" alt="Carousel Image" class="carousel-image" />
          
          <!-- Card overlay -->
          <div class="carousel-card">
            <div class="carousel-card-content">
              <h2 v-if="slide.title" class="carousel-card-title">{{ slide.title }}</h2>
              <p v-if="slide.description" class="carousel-card-description">{{ slide.description }}</p>
              <a v-if="slide.buttonText" href="#" class="carousel-card-button">{{ slide.buttonText }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Arrows -->
    <div v-if="showArrows" class="carousel-navigation">
      <button @click="prev" class="carousel-arrow carousel-arrow-prev">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button @click="next" class="carousel-arrow carousel-arrow-next">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>

    <!-- Navigation Dots -->
    <div v-if="showDots" class="carousel-dots">
      <button 
        v-for="(_, index) in slides" 
        :key="index" 
        @click="goToSlide(index)" 
        class="carousel-dot" 
        :class="{ active: currentIndex === index }"
      />
    </div>
  </div>
</template>

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.carousel-slides {
  display: flex;
  height: 100%;
  transition: transform 0.5s ease;
}

.carousel-slide {
  min-width: 100%;
  height: 100%;
  position: relative;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-card {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 1200px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: 'Inter', sans-serif;
}

.carousel-card-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  font-family: 'Inter', sans-serif;
}

.carousel-card-description {
  font-size: 16px;
  color: #666;
  margin-bottom: 24px;
  line-height: 1.5;
  font-family: 'Inter', sans-serif;
}

.carousel-card-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #3749A6;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s ease;
  font-family: 'Inter', sans-serif;
}

.carousel-card-button:hover {
  background-color: #45a049;
}

.carousel-navigation {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.carousel-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  cursor: pointer;
  border: none;
  outline: none;
  transition: background-color 0.3s ease;
}

.carousel-arrow:hover {
  background-color: rgba(255, 255, 255, 0.9);
}

.carousel-arrow svg {
  width: 20px;
  height: 20px;
}

.carousel-dots {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.carousel-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.carousel-dot.active {
  background-color: white;
}
</style>
