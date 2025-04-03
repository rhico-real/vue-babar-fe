import type { DropdownModel } from '../../types/dropdown';

export enum DropdownOption {
    MONTH = 'month',
    STATUS = 'status'
}

export const monthOptions: DropdownModel[] = [
    {text: 'All', onClick: () => {}},
    {text: 'January', onClick: () => {}},
    {text: 'February', onClick: () => {}},
    {text: 'March', onClick: () => {}},
    {text: 'April', onClick: () => {}},
    {text: 'May', onClick: () => {}},
    {text: 'June', onClick: () => {}},
    {text: 'July', onClick: () => {}},
    {text: 'August', onClick: () => {}},
    {text: 'September', onClick: () => {}},
    {text: 'October', onClick: () => {}},
    {text: 'November', onClick: () => {}},
    {text: 'December', onClick: () => {}},
];

export const statusOptions: DropdownModel[] = [
    {text: 'Done', enum: 'D', onClick: () => {}, class: "bg-dashboard-status-done text-center text-white rounded-lg py-1", color:"bg-dashboard-status-done"},
    {text: 'Pending', enum: 'P',  onClick: () => {}, class: "bg-dashboard-status-pending text-center text-white rounded-lg py-1", color:"bg-dashboard-status-pending"},
    {text: 'No Show', enum: 'NS', onClick: () => {}, class: "bg-dashboard-status-noshow text-center text-white rounded-lg py-1", color:"bg-dashboard-status-noshow"}
];
