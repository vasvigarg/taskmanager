import client from './client';

export interface Document {
    id: number;
    filename: string;
    file_path: string;
    uploaded_at: string;
    owner_id: number;
}

export const uploadDocument = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await client.post<Document>('/documents/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const listDocuments = async () => {
    const response = await client.get<Document[]>('/documents/');
    return response.data;
};

export const downloadDocument = async (documentId: number) => {
    const response = await client.get(`/documents/${documentId}/download`, {
        responseType: 'blob',
    });
    return response.data;
};

export const getDownloadUrl = (documentId: number) => {
    return `${client.defaults.baseURL}/documents/${documentId}/download`;
};
