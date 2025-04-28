import type { DropdownModel } from '../../types/dropdown';

export enum DropdownOption {
    MONTH = 'month',
    STATUS = 'status',
    PAYMENT_STATUS = 'payment_status'
}

export const monthOptions: DropdownModel[] = [
    {text: 'All'},
    {text: 'January'},
    {text: 'February'},
    {text: 'March'},
    {text: 'April'},
    {text: 'May'},
    {text: 'June'},
    {text: 'July'},
    {text: 'August'},
    {text: 'September'},
    {text: 'October'},
    {text: 'November'},
    {text: 'December'},
];

export const statusOptions: DropdownModel[] = [
    {text: 'Done', enum: 'D', class: "bg-dashboard-status-done text-center text-white rounded-lg py-1", color:"bg-dashboard-status-done"},
    {text: 'Pending', enum: 'P', class: "bg-dashboard-status-pending text-center text-white rounded-lg py-1", color:"bg-dashboard-status-pending"},
    {text: 'No Show', enum: 'NS', class: "bg-dashboard-status-noshow text-center text-white rounded-lg py-1", color:"bg-dashboard-status-noshow"}
];

export const paymentStatusOptions: DropdownModel[] = [
    {text: 'PAID', enum: 'PAID', class: "bg-dashboard-status-done text-center text-white rounded-lg py-1", color:"bg-dashboard-status-done"},
    {text: 'Pending', enum: 'PENDING', class: "bg-dashboard-status-pending text-center text-white rounded-lg py-1", color:"bg-dashboard-status-pending"},
    {text: 'UNPAID', enum: 'UNPAID', class: "bg-dashboard-status-noshow text-center text-white rounded-lg py-1", color:"bg-dashboard-status-noshow"}
];

export const roleOptions: DropdownModel[] = [
    {text: 'Admin', enum: 'ADMIN'},
    {text: 'Staff', enum: 'STAFF'},
    {text: 'Guest', enum: 'GUEST'}
];
