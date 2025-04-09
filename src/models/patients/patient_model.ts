export interface PatientModel {
    full_name: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    reason?: string;
    photo?: string;
}

// Function to map API response to the model
export const mapToPatientModel = (data: any[]): PatientModel[] => {
    return data.map(item => ({
        id: item.id,
        full_name: item.full_name,
        first_name: item.first_name,
        middle_name: item.middle_name,
        last_name: item.last_name,
        email:item.email,
        phone_number: item.phone_number,
        reason: item.reason,
        photo: item.photo
    }));
};

export const mapToTableView = (data: any[]): Partial<PatientModel>[] => {
    return data.map(item => ({
        id: item.id,
        full_name: item.full_name,
        email:item.email,
        phone_number: item.phone_number,
        reason: item.reason,
        photo: item.photo
    }));
};