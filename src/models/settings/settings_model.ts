export interface SettingsModel {
    id: number;
    name: string;
    photo: string;
    favicon: string;
    created_at: string;
    updated_at: string;
}

// Function to map API response to the model
export const mapToTableView = (data: any[]): Partial<SettingsModel>[] => {
    return data.map(item => ({
        id: item.id,
        name: item.name,
        photo: item.photo,
        favicon: item.favicon,
        created_at: item.created_at,
        updated_at: item.updated_at
    }));
};

export const mapToOneSettingsModel = (item: any): SettingsModel => {
    return {
        id: item.id,
        name: item.name,
        photo: item.photo,
        favicon: item.favicon,
        created_at: item.created_at,
        updated_at: item.updated_at
    };
};