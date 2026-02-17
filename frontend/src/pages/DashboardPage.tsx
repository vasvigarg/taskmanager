import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskService } from '../api/taskService';
import type { Task, Status, Priority } from '../types';
import TaskList from '../components/TaskList';
import { LogOut, Plus } from 'lucide-react';

const DashboardPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [newPriority, setNewPriority] = useState<Priority>('medium');
    const navigate = useNavigate();

    const fetchTasks = async () => {
        try {
            const data = await taskService.getTasks();
            setTasks(data);
        } catch (err) {
            console.error('Failed to fetch tasks', err);
            // If unauthorized, redirect to login
            if ((err as any).response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleStatusChange = async (id: number, status: Status) => {
        try {
            await taskService.updateStatus(id, status);
            fetchTasks();
        } catch (err) {
            console.error('Failed to update status', err);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await taskService.deleteTask(id);
                fetchTasks();
            } catch (err) {
                console.error('Failed to delete task', err);
            }
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await taskService.createTask({
                title: newTitle,
                description: newDesc,
                priority: newPriority,
            });
            setNewTitle('');
            setNewDesc('');
            setNewPriority('medium');
            setShowCreate(false);
            fetchTasks();
        } catch (err) {
            console.error('Failed to create task', err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="container">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Tasks</h1>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        onClick={() => setShowCreate(!showCreate)}
                        className="bw-button bw-button-primary"
                        style={{ gap: '0.25rem' }}
                    >
                        <Plus size={18} />
                        New Task
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bw-button bw-button-secondary"
                        style={{ gap: '0.25rem' }}
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </header>

            {showCreate && (
                <div className="bw-card" style={{ marginBottom: '2rem' }}>
                    <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input
                            type="text"
                            placeholder="Task Title"
                            className="bw-input"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            required
                        />
                        <textarea
                            placeholder="Description (optional)"
                            className="bw-input"
                            style={{ minHeight: '80px', resize: 'vertical' }}
                            value={newDesc}
                            onChange={(e) => setNewDesc(e.target.value)}
                        />
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <label>Priority:</label>
                            <select
                                className="bw-input"
                                style={{ width: 'auto' }}
                                value={newPriority}
                                onChange={(e) => setNewPriority(e.target.value as Priority)}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                            <button type="button" onClick={() => setShowCreate(false)} className="bw-button bw-button-secondary">Cancel</button>
                            <button type="submit" className="bw-button bw-button-primary">Create Task</button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>Loading tasks...</div>
            ) : (
                <TaskList tasks={tasks} onStatusChange={handleStatusChange} onDelete={handleDelete} />
            )}
        </div>
    );
};

export default DashboardPage;
