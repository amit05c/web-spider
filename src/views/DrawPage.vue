<template>
    <div class="container">
      <h1>Draw</h1>
      <button class="draw-btn" @click="handleDraw">Draw Names</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref,computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAssignmentStore } from '@/stores/assignment';
  import api from '@/services/api';
  
  const errorMessage = ref('');
  const router = useRouter();
  const {addAssignment,addedUsers} = useAssignmentStore();
  
  const handleDraw = async () => {
    try {
    //   const participants = Object.keys(await api.getParticipants());
    //   const assignments = {};
    //   let shuffled = [...participants];
    //   for (let name of participants) {
    //     let available = shuffled.filter(n => n !== name);
    //     if (available.length === 0) {
    //       errorMessage.value = 'Draw failed, please try again.';
    //       return;
    //     }
    //     let assigned = available[Math.floor(Math.random() * available.length)];
    //     assignments[name] = assigned;
    //     shuffled = shuffled.filter(n => n !== assigned);
    //   }
    //   await addAssignment(assignments);
    //   router.push('/results');


    const { data } = await api.getAssignments();
        const names = data.data.map(p => p.first_name);
        const assignments = {};
        let shuffled = [...addedUsers,...names];

        for (let name of names) {
          // let available = shuffled.filter(n => n !== name);
          let available = shuffled.filter(n => n);

          if (available.length === 0) {
            commit('setErrorMessage', 'Draw failed, please try again.');
            return;
          }
          let assigned = available[Math.floor(Math.random() * available.length)];
          assignments[name] = assigned;
          shuffled = shuffled.filter(n => n !== assigned);
        }

        // await api.addAssignment(assignments);
        await addAssignment(assignments)
        router.push('/results');
    } catch (error) {
      errorMessage.value = 'An error occurred during the draw.';
    }
  };
  </script>
  
  <style>
  .container {
    width: 50vw;
    text-align: center;
    margin-top: 50px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 50px;
    margin: auto;
  }
  .error {
    color: red;
  }

  .draw-btn{
    display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  }
  </style>
  