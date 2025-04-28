import { createRouter, createWebHistory } from "vue-router";
import LandingPageView from '@/views/landing/LandingPageView.vue';
import CreateAppointmentView from '@/views/appointments/CreateAppointmentView.vue';
import FindAppointmentView from '@/views/appointments/FindAppointmentView.vue';
import AppointmentView from '@/views/appointments/AppointmentView.vue';
import DashboardView from '@/views/dashboard/DashboardView.vue';
import ManagePatientsView from '@/views/dashboard/ManagePatientsView.vue';
import SettingsView from '@/views/dashboard/SettingsView.vue';
import LoginView from '@/views/auth/LoginView.vue';
import RegisterView from '@/views/auth/RegisterView.vue';
import ManageAppointmentsView from '@/views/dashboard/ManageAppointmentsView.vue';
import CalendarView from '@/views/dashboard/CalendarView.vue';
import ProfilePageView from '@/views/profile/ProfilePageView.vue';
import PaymentOptionsView from '@/views/appointments/payment_option_customer/PaymentOptionsView.vue';
import PaymentProvidersView from '@/views/appointments/payment_option_customer/PaymentProvidersView.vue';
import SendProofOfPaymentView from '@/views/appointments/payment_option_customer/SendProofOfPaymentView.vue';
import SuccessOrErrorPaymentView from '@/views/appointments/payment_option_customer/SuccessOrErrorPaymentView.vue';
import ManagePaymentsView from '@/views/dashboard/ManagePaymentsView.vue';

import { useToast } from "vue-toastification";
import { logout } from '@/utils/http_config.js';

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
            {
                path: 'pay',
                name: 'payappointment',
                component: PaymentOptionsView
            },
            {
                path: 'pay/:id',
                name: 'paymentproviders',
                component: PaymentProvidersView
            },
            {
                path: 'pay/:id/proof-of-payment',
                name: 'proofofpayment',
                component: SendProofOfPaymentView
            },
            {
                path: 'pay/:id/proof-of-payment/:result',
                name: 'successorerrorpayment',
                component: SuccessOrErrorPaymentView
            },
        ]
    }
];

const dashboardRoutes = [
    {
        path: '/dashboard',
        children: [
            {
                path: '',
                name: 'dashboard',
                component: DashboardView,
                meta: { requiresAuth: true }
            },
            {
                path: 'manage-appointments',
                name: 'manageappointments',
                component: ManageAppointmentsView,
                meta: { requiresAuth: true }
            },
            {
                path: 'manage-patients',
                name: 'managepatients',
                component: ManagePatientsView,
                meta: { requiresAuth: true }
            },
            {
                path: 'calendar',
                name: 'calendar',
                component: CalendarView,
                meta: { requiresAuth: true }
            },
            {
                path: 'payments',
                name: 'payments',
                component: ManagePaymentsView,
                meta: { requiresAuth: true }
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

const profileRoutes = [
    {
        path: '/profile',
        children: [
            {
                path: '',
                name: 'profile',
                component: ProfilePageView,
                meta: { requiresAuth: true }
            },
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
        ...dashboardRoutes,
        ...profileRoutes
    ]
});

router.beforeEach((to, from) => {
    var token = localStorage.getItem('access');

    if(to.meta.requiresAuth && !token){
        toast.error('Oops. Unauthenticated.');

        logout();

        return {
            path: '/',
        }
    }
})

export default router;