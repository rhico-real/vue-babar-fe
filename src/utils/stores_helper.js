import { useDashboardStore } from '@/stores/dashboard';

export const initialAPICalls = async () => {
    const dashboardStore = useDashboardStore();
    
    await dashboardStore.fetchAppointments();
    await dashboardStore.fetchPatients();
    await dashboardStore.fetchPayments();
}