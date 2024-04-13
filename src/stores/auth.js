
import { defineStore } from 'pinia'
import api from '@/stores/api'
export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            session: true,
            user: "Студент"
        }
    },

    actions: {
        setSession(data) { this.session = data.sessionId },
        setUser(data) { this.user = data.user },

        async getSession() { setSession(await api.auth.getSession()) },
        async getUser() { setUser(await api.auth.getUser()) }


    },
})