import { createRouter, createWebHistory } from "vue-router";
import LandingPageView from '@/views/LandingPageView.vue';
import JobsView from '@/views/JobsView.vue';
import AddJobView from '@/views/AddJobView.vue';
import CreateAppointmentView from '@/views/appointments/CreateAppointmentView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'landing',
            component: LandingPageView
        },
        {
            path: '/jobs',
            name: 'jobs',
            component: JobsView
        },
        {
            path: '/jobs/add',
            name: 'addjob',
            component: AddJobView
        },
        {
            path: '/appointment/create',
            name: 'createappointment',
            component: CreateAppointmentView
        }
    ]
});

export default router;