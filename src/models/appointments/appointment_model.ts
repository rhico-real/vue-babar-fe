export interface AppointmentModel {
    full_name: string;
    email: string;
    phone_number: string;
    date: string; 
    queue_number: number;
    time_estimate: string;
    reference_code: string;
    status: string;
    reason?: string;
}

// Function to map API response to the model
export const mapToAppointmentModel = (data: any[]): AppointmentModel[] => {
    return data.map(item => ({
        id: item.id,
        full_name: item.full_name,
        email: item.email,
        phone_number: item.phone_number,
        date: item.date,
        queue_number: item.queue_number,
        time_estimate: item.time_estimate,
        reference_code: item.reference_code,
        status: item.status,
        reason: item.reason
    }));
};

export const mapToTableView = (data: any[]): Partial<AppointmentModel>[] => {
    return data.map(item => ({
        full_name: item.full_name,
        email: item.email,
        phone_number: item.phone_number,
        date: item.date,
        queue_number: item.queue_number,
        status: item.status,
        reason: item.reason
    }));
};