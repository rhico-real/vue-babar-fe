import { useDashboardStore } from '@/stores/dashboard';
import { useSettingsStore } from '@/stores/settings';
import { useUserProfileStore } from '@/stores/userProfile';

export const initialAPICalls = async () => {
    const userProfileStore = useUserProfileStore();
    const dashboardStore = useDashboardStore();
    const settingsStore = useSettingsStore();
    
    await userProfileStore.fetchProfile();
    await dashboardStore.fetchAppointments();
    await dashboardStore.fetchPatients();
    await dashboardStore.fetchPayments();
    await settingsStore.fetchSettings();
}