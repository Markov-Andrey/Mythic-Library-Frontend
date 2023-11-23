// api/index.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export const getAllCharacters = async () => {
  try {
    const response = await api.get(`/main-page/characters`);
    return response.data;
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
};

export const getAllCampaigns = async () => {
  try {
    const response = await api.get(`/main-page/campaigns`);
    return response.data;
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
};

export const getCharacter = async (id) => {
  try {
    const response = await api.get(`/character/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
};

export const getCampaign = async (id) => {
  try {
    const response = await api.get(`/campaigns/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
};

// Campaign Notes
export const createCampaignNote = async (data) => {
  try {
    const response = await api.post('/campaign-notes', data);
    return response.data;
  } catch (error) {
    console.error('Error creating campaign note:', error);
    throw error;
  }
};

export const updateCampaignNote = async (id, data) => {
  try {
    const response = await api.put(`/campaign-notes/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating campaign note:', error);
    throw error;
  }
};

export const deleteCampaignNote = async (id) => {
  try {
    const response = await api.delete(`/campaign-notes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting campaign note:', error);
    throw error;
  }
};
