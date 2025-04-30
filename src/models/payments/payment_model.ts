export interface PaymentModel {
    reference_code: string;
    payment_reference_number: string;
    status: string;
    photo: string;
    created_at: string;
    updated_at: string;
}

// Function to map API response to the model
export const mapToTableView = (data: any[]): Partial<PaymentModel>[] => {
    return data.map(item => ({
        reference_code: item.reference_code,
        payment_reference_number: item.payment_reference_number,
        status: item.status,
        photo: item.photo,
        created_at: item.created_at,
        updated_at: item.updated_at
    }));
};