import { defineStore } from 'pinia';
import { httpGet, httpPost, httpAppSettings } from '@/utils/http_config.js';
import { mapToOneSettingsModel } from '@/models/settings/settings_model';

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        settings: null,
        loading: false,
        error: null
    }),
    getters:{
        id: (state) => state.settings?.id || '',
        name: (state) => state.settings?.name || '',
        photo: (state) => state.settings?.photo || '',
        favicon: (state) => state.settings?.favicon || '',
    },
    actions: {
        async fetchSettings(){
            this.loading = true;
            this.error = null;

            const response = await httpGet(httpAppSettings);
            
            if(response.status === 200){
                this.settings = mapToOneSettingsModel(response.data)
            } else {
                console.log(response);
                this.error = response.error['message'];
            }

            this.loading = false;
        },

        async postSettings(formData){
            this.loading = true;
            this.error = null;

            const response = await httpPost(httpAppSettings, formData);
            
            if(response.status === 200){
                await this.fetchSettings();
                return response;
            } else {
                console.error(response);
                this.error = response.error['message'];
            }

            this.loading = false;
        }
    },
}

);