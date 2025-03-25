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
import { useToast } from "vue-toastification";

const toast = useToast();

const authRoutes = [
    {
        path: '/auth',
        children: [
            {
                path: 'login',
                component: LoginView,
                name: 'login'
            },
            {
                path: 'register',
                component: RegisterView,
                name: 'register'
            }
        ]
    }
];

const appointmentRoutes = [
    {
        path: '/appointment',
        children: [
            {
                path: 'create',
                name: 'createappointment',
                component: CreateAppointmentView,
            },
            {
                path: 'find',
                name: 'findappointment',
                component: FindAppointmentView
            },
            {
                path: ':id',
                name: 'appointment',
                component: AppointmentView
            },
        ]
    }
];

const dashboardRoutes = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardView,
        meta: { requiresAuth: true },
        children: [
            {
                path: 'manage-patients',
                name: 'managepatients',
                component: ManagePatientsView,
                meta: { requiresAuth: false }
            },
            {
                path: 'settings',
                name: 'settings',
                component: SettingsView,
                meta: { requiresAuth: true },
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'landing',
            component: LandingPageView
        },
        ...authRoutes,
        ...appointmentRoutes,
        ...dashboardRoutes
    ]
});

router.beforeEach((to, from) => {
    var token = localStorage.getItem('access');

    if(to.meta.requiresAuth && !token){
        toast.error('Oops. Unauthenticated.');

        return {
            path: '/',
        }
    }
})

export default router;