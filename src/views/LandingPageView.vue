<script setup>
import Navbar from '@/components/landing/v1/Navbar.vue';
import Carousel from '@/components/common/Carousel.vue';
import AboutSection from '@/components/landing/v2/AboutSection.vue';
import ContactUsView from '@/components/landing/v2/ContactUsView.vue';
import WelcomeSectionView from '@/components/landing/v2/WelcomeSectionView.vue';

// Import carousel images directly
import image1 from '@/assets/img/landing/carousel/1.jpg';
import image2 from '@/assets/img/landing/carousel/2.jpg';
import image3 from '@/assets/img/landing/carousel/3.jpg';

// Define carousel slides with images and content
const carouselSlides = [
  {
    image: image1,
    title: "Temporibus autem quibusdam",
    description: "Beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
    buttonText: "Read More"
  },
  {
    image: image2,
    title: "Professional Medical Care",
    description: "Our team of experienced doctors provides the highest quality healthcare services using the latest medical technology.",
    buttonText: "Our Services"
  },
  {
    image: image3,
    title: "Schedule Your Appointment",
    description: "Easy booking process to schedule your next appointment with our specialists.",
    buttonText: "Book Now"
  }
];
</script>

<template>
    <Navbar/>

    <!-- Version 1 -->
    <!-- <div class="xl:mx-36 mx-6">
        <HeaderView />
        <InfoStatsView />
        <FeaturesView />
        <ChooseYourPlanView />
        <TestimoniesView />
        <SubscribeCard />
        <FooterView />
    </div> -->

    <!-- Version 2 -->
    <div class="bg-landing-background flex flex-col">
        <WelcomeSectionView />
        <!-- Carousel Section -->
        <div class="flex justify-center w-full">
            <div class="w-10/12">
                <Carousel
                    class="mt-10"
                    :slides="carouselSlides"
                    :autoplay="true"
                    :interval="2000"
                    height="600px"
                />
            </div>
        </div>
        
        <!-- About Section -->
        <AboutSection class="mt-10" />

        <!-- Contact us Section -->
        <ContactUsView class="mt-10" />
    </div>
</template>

<style scoped>
</style>
