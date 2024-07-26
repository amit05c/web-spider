import { defineStore } from 'pinia';
import api from '@/services/api';

export const useAssignmentStore = defineStore('assignment', {
  state: () => ({
    assignments: {},
    addedUsers:[]
  }),
  actions: {
    async fetchAssignments() {
      try {
        const { data } = await api.getParticipants();
        // this.assignments = data.assignment || {};
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    },
    async addAssignment(assignments) {
      try {
       const data = await api.addAssignment(assignments);
        this.assignments = data.data.assignment;
      } catch (error) {
        console.error('Error adding assignment:', error);
      }
    },
    updateAddedUser(users) {
      this.addedUsers = users
    }
  }
});
