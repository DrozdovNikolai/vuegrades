
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
    state: () => {
        return {
            drawer: false,
            isLoading: true
        }
    },

    actions: {
        toggleDrawer() { this.drawer = !this.drawer },
        setIsLoading(flag) { this.isLoading = flag }
    },
})