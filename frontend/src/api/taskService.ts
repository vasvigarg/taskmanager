import client from './client';
import type { Task, Priority, Status } from '../types';

export const taskService = {
    getTasks: async (params?: { status?: Status; priority?: Priority; sort_by?: string; order?: string }) => {
        const response = await client.get<Task[]>('/tasks', { params });
        return response.data;
    },

    getTask: async (id: number) => {
        const response = await client.get<Task>(`/tasks/${id}`);
        return response.data;
    },

    createTask: async (task: Omit<Task, 'id' | 'status' | 'created_at' | 'updated_at' | 'owner_id'>) => {
        const response = await client.post<Task>('/tasks', task);
        return response.data;
    },

    updateTask: async (id: number, task: Partial<Omit<Task, 'id' | 'owner_id' | 'created_at' | 'updated_at'>>) => {
        const response = await client.put<Task>(`/tasks/${id}`, task);
        return response.data;
    },

    updateStatus: async (id: number, status: Status) => {
        const response = await client.patch<Task>(`/tasks/${id}/status`, { status });
        return response.data;
    },

    deleteTask: async (id: number) => {
        const response = await client.delete(`/tasks/${id}`);
        return response.data;
    },
};
