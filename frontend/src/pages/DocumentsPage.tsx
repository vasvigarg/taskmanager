import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listDocuments, downloadDocument } from '../api/documents';
import type { Document } from '../api/documents';
import FileUpload from '../components/FileUpload';
import { ArrowLeft } from 'lucide-react';

const DocumentsPage: React.FC = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchDocuments = async () => {
        setLoading(true);
        try {
            const data = await listDocuments();
            setDocuments(data);
            setError(null);
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to fetch documents');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    const handleDownload = async (documentId: number, filename: string) => {
        try {
            const blob = await downloadDocument(documentId);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Download failed', err);
            alert('Failed to download document. Please try again.');
        }
    };

    return (
        <div className="container">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={() => navigate('/')}
                        className="bw-button bw-button-secondary"
                        style={{ padding: '0.5rem' }}
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <h1>Documents</h1>
                </div>
            </header>

            <div className="documents-page">
                <FileUpload onUploadSuccess={fetchDocuments} />

                <div className="documents-list-container">
                    <h2>Your Documents</h2>
                    {loading && <p>Loading documents...</p>}
                    {error && <p className="error-message">{error}</p>}

                    {!loading && documents.length === 0 && (
                        <p>No documents uploaded yet.</p>
                    )}

                    <ul className="documents-list">
                        {documents.map((doc: Document) => (
                            <li key={doc.id} className="document-item">
                                <div className="document-info">
                                    <span className="document-name">{doc.filename}</span>
                                    <span className="document-date">{formatDate(doc.uploaded_at)}</span>
                                </div>
                                <button
                                    onClick={() => handleDownload(doc.id, doc.filename)}
                                    className="bw-button bw-button-outline download-link"
                                    style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
                                >
                                    Download
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DocumentsPage;
