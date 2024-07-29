<template>
  <div class="rcontainer">
    <h1>Registration</h1>
    <form @submit.prevent="handleSubmit">
      <div v-for="(participant, index) in participants" :key="index" class="participant">
        <input
          v-model="participant.name"
          type="text"
          placeholder="Participant Name"
          :class="{ error: nameErrors[index] }"
        />
        <button type="button" @click="removeParticipant(index)" class="remove-button">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
      <div style="display: flex; gap: 10px;">
        <button type="button" @click="addParticipant" class="add-button">
          <i class="fas fa-plus"></i> Add Participant
        </button>
        <button  type="submit"  class="submit-button">Submit</button>
      </div>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAssignmentStore } from '@/stores/assignment';
import api from '@/services/api';

const participants = ref([{ name: '' }]);
const nameErrors = ref([]);
const errorMessage = ref('');
const router = useRouter();
const assignmentStore = useAssignmentStore();
const { updateAddedUser } = assignmentStore;

const addParticipant = () => {
  const names = participants.value.map(p => p.name.trim());
  const uniqueNames = new Set(names);

  if (names.length !== uniqueNames.size) {
    errorMessage.value = 'Names must be unique.';
    return;
  }

  participants.value.push({ name: '' });
  errorMessage.value = '';
  nameErrors.value = [];
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
  let users = [];
  try {
    for (const participant of participants.value) {
      if (participant.name !== '') {
        users.push(participant.name);
      }
      await api.addUser(participant.name, `${participant.name.toLowerCase().replace(/ /g, '.')}@example.com`);
    }
    updateAddedUser(users);
    if (users.length < 2) {
      errorMessage.value = 'Add at least two participants';
      return;
    }
    router.push('/draw');
  } catch (error) {
    errorMessage.value = 'An error occurred while submitting the form.';
  }
};
</script>

<style scoped>
.rcontainer {
  width: 50vw;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 5px solid rgb(116, 101, 101);
  max-height: 50vh;
  overflow-y: auto;
}

.participant {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.participant input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.participant button {
  margin-left: 10px;
  background-color: #e74c3c;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
}

.add-button {
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-button i {
  margin-right: 5px;
}

.submit-button {
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error {
  color: red;
  margin-top: 20px;
}

/* Mobile responsiveness */
@media (max-width: 600px) {
  .rcontainer {
    width: 80vw;
    padding: 10px;

  }

  .participant {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .participant button {
    margin-left: 10px;
    margin-top: 0;
    width: auto;
  }

  .add-button, .submit-button {
    width: 100%;
    justify-content: center;
  }
}
</style>
