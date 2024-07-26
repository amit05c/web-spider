import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://reqres.in/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  addUser(name, email) {
    return apiClient.post('/users', {
      name,
      email,
      createdAt: new Date().toISOString()
    });
  },
  addAssignment(assignment) {
    return apiClient.post('/users', { assignment });
  },
  async getParticipants() {
    const response = await apiClient.get('/users');
    return response.data;
  },
  getAssignments() {
    return apiClient.get('/users');
  }
};
