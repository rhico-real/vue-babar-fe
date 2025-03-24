import { createRouter, createWebHistory } from "vue-router";
import LandingPageView from '@/views/LandingPageView.vue';
import CreateAppointmentView from '@/views/appointments/CreateAppointmentView.vue';
import FindAppointmentView from '@/views/appointments/FindAppointmentView.vue';
import AppointmentView from '@/views/appointments/AppointmentView.vue';
import DashboardView from '@/views/dashboard/DashboardView.vue';
import ManagePatientsView from '@/views/dashboard/ManagePatientsView.vue';
import SettingsView from '@/views/dashboard/SettingsView.vue';
import LoginView from '@/views/auth/LoginView.vue';
import RegisterView from '@/views/auth/RegisterView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'landing',
            component: LandingPageView
        },
        {
            path: '/auth/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/auth/register',
            name: 'register',
            component: RegisterView
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
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashboardView
        },
        {
            path: '/dashboard/manage-patients',
            name: 'managepatients',
            component: ManagePatientsView
        },
        {
            path: '/dashboard/settings',
            name: 'settings',
            component: SettingsView
        }
    ]
});

export default router;