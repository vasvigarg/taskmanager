export type Priority = 'low' | 'medium' | 'high';
export type Status = 'pending' | 'in-progress' | 'completed';

export interface User {
    id: number;
    email: string;
    is_active: boolean;
}

export interface Task {
    id: number;
    title: string;
    description?: string;
    priority: Priority;
    status: Status;
    due_date?: string;
    created_at: string;
    updated_at?: string;
    owner_id: number;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
}
