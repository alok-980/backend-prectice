import axiosInstance from '../config/axiosInstance';

export const shortenUrl = async (url) => {
    try {
        const res = await axiosInstance.post('/api/urls', { url });
        return res.data;
    } catch (error) {
        console.error('Error while shortening URL:', error.message);
        throw error;
    }
};

export const getUrls = async () => {
    try {
        const res = await axiosInstance.get('/api/urls');
        return res.data;
    } catch (error) {
        console.error('Error while fetching URLs:', error.message);
        throw error;
    }
};

export const deleteUrl = async (shortCode) => {
    try {
        const res = await axiosInstance.delete(`/api/urls/${shortCode}`);
        return res.data;
    } catch (error) {
        console.error('Error while deleting URL:', error.message);
        throw error;
    }
};