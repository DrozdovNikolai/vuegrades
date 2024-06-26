
import { defineStore } from 'pinia'
import api from '@/stores/api'
export const useMainStore = defineStore('main', {
    state: () => {
        return {
            drawer: false,
            isLoading: false,
            activeRequests: 0,
            cancelled: false
        }
    },

    actions: {
        toggleDrawer() { this.drawer = !this.drawer },
        setIsLoading(value) {
            if (value) {
                this.activeRequests++;
                this.isLoading = true;
            } else {
                this.activeRequests--;
                if (this.activeRequests <= 0) {
                    this.activeRequests = 0;
                    this.isLoading = false;
                }
            }
        },
        cancelRequest() {
            api.cancelRequest();
            this.cancelled = true
        }

    },
})