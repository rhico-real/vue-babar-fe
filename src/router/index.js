import { createRouter, createWebHistory } from "vue-router";
import LandingPageView from '@/views/LandingPageView.vue';
import JobsView from '@/views/JobsView.vue';
import AddJobView from '@/views/AddJobView.vue';
import CreateAppointmentView from '@/views/appointments/CreateAppointmentView.vue';
import FindAppointmentView from '@/views/appointments/FindAppointmentView.vue';
import AppointmentView from '@/views/appointments/AppointmentView.vue';

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
        },
        {
            path: '/appointment/find',
            name: 'findappointment',
            component: FindAppointmentView
        },
        {
            path: '/appointment/:id',
            name: 'appointment',
            component: AppointmentView
        }
    ]
});

export default router;