<template>
    <div class="container">
      <h1>Registration</h1>
      <form @submit.prevent="handleSubmit">
        <div v-for="(participant, index) in participants" :key="index" class="participant">
          <input
            v-model="participant.name"
            type="text"
            placeholder="Participant Name"
            :class="{ error: nameErrors[index] }"
          />
          <button type="button" @click="removeParticipant(index)">Remove</button>
        </div>
        <button type="button" @click="addParticipant">Add Participant</button>
        <button type="submit">Submit</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref,computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAssignmentStore } from '@/stores/assignment';
  import api from '@/services/api';
  
  const participants = ref([{ name: '' }]);
  const nameErrors = ref([]);
  const errorMessage = ref('');
  const router = useRouter();
  const assignmentStore = useAssignmentStore();
  const {updateAddedUser,addedUsers} = assignmentStore;
  const addParticipant = () => {
    participants.value.push({ name: '' });
  };
  
  const removeParticipant = (index) => {
    participants.value.splice(index, 1);
  };
  
  const handleSubmit = async () => {
    nameErrors.value = [];
    const names = participants.value.map(p => p.name.trim());
    if (new Set(names).size !== names.length) {
      errorMessage.value = 'Names must be unique.';
      nameErrors.value = names.map((name, index) => names.indexOf(name) !== index);
      return;
    }
    errorMessage.value = '';
    let users = [] 
    try {
      for (const participant of participants.value) {
        if(participant.name !== ''){
          users.push(participant.name);
        }
        await api.addUser(participant.name, `${participant.name.toLowerCase().replace(/ /g, '.')}@example.com`);
      }
      updateAddedUser(users); 
      if(users.length < 2){
        errorMessage.value = 'Add atleast two participants';
        return;
      }
      router.push('/draw');
    } catch (error) {
      errorMessage.value = 'An error occurred while submitting the form.';
    }
  };

  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 50px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* margin: auto; */
  }
  .participant {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .participant input {
    flex: 1;
    padding: 5px;
  }
  .participant button {
    margin-left: 10px;
  }
  .error {
    color: red;
  }
  </style>
  