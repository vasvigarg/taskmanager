import React from 'react';
import type { Task, Priority, Status } from '../types';
import { Trash2, CheckCircle, Circle, Clock } from 'lucide-react';

interface TaskListProps {
    tasks: Task[];
    onStatusChange: (id: number, status: Status) => void;
    onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onStatusChange, onDelete }) => {
    const getPriorityColor = (priority: Priority) => {
        switch (priority) {
            case 'high': return '#e11d48';
            case 'medium': return '#d97706';
            case 'low': return '#16a34a';
            default: return 'var(--foreground)';
        }
    };

    if (tasks.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted-foreground)' }}>
                No tasks found. Create one to get started!
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {tasks.map((task) => (
                <div key={task.id} className="bw-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                        <button
                            onClick={() => onStatusChange(task.id, task.status === 'completed' ? 'pending' : 'completed')}
                            style={{ background: 'none', border: 'none', padding: 0, marginTop: '0.25rem' }}
                        >
                            {task.status === 'completed' ? <CheckCircle size={20} /> : <Circle size={20} />}
                        </button>
                        <div>
                            <h3 style={{
                                fontSize: '1.125rem',
                                fontWeight: 600,
                                textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                                color: task.status === 'completed' ? 'var(--muted-foreground)' : 'var(--foreground)'
                            }}>
                                {task.title}
                            </h3>
                            {task.description && (
                                <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginTop: '0.25rem' }}>
                                    {task.description}
                                </p>
                            )}
                            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', alignItems: 'center' }}>
                                <span style={{
                                    fontSize: '0.75rem',
                                    padding: '0.125rem 0.375rem',
                                    borderRadius: '4px',
                                    border: `1px solid ${getPriorityColor(task.priority)}`,
                                    color: getPriorityColor(task.priority),
                                    textTransform: 'uppercase',
                                    fontWeight: 'bold'
                                }}>
                                    {task.priority}
                                </span>
                                {task.due_date && (
                                    <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                        <Clock size={12} />
                                        {new Date(task.due_date).toLocaleDateString()}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="bw-button bw-button-secondary"
                        style={{ padding: '0.5rem', border: 'none' }}
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
