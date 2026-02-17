import client from './client';
import type { AuthResponse } from '../types';

export const authService = {
    register: async (email: string, password: string) => {
        const response = await client.post('/auth/register', { email, password });
        return response.data;
    },

    login: async (email: string, password: string) => {
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);

        const response = await client.post<AuthResponse>('/auth/login', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    },
};
