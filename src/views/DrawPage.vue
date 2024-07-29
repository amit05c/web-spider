<template>
  <div class="container">
    <h1>Draw</h1>
    <button class="draw-btn" @click="handleDraw">Draw Names</button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAssignmentStore } from "@/stores/assignment";
// import api from "@/services/api";

const errorMessage = ref("");
const router = useRouter();
const { addAssignment, addedUsers } = useAssignmentStore();

const handleDraw = async () => {
  try {
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    function secretSanta(participants) {
      // Shuffle the participants array
      let shuffledParticipants = shuffle([...participants]);

      // Create the Secret Santa pairs
      let pairs = {};
      for (let i = 0; i < shuffledParticipants.length; i++) {
        let giver = shuffledParticipants[i];
        let receiver =
          shuffledParticipants[(i + 1) % shuffledParticipants.length];
        pairs[giver] = receiver;
      }

      return pairs;
    }

    let pairs = secretSanta([...addedUsers]);
    await addAssignment(pairs);
    router.push("/results");
  } catch (error) {
    errorMessage.value = "An error occurred during the draw.";
  }
};
</script>

<style scoped>
.container {
  width: 50vw;
  text-align: center;
  margin-top: 50px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 50px;
  margin: auto;
}
.error {
  color: red;
}

.draw-btn {
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

@media (max-width: 600px) {
  .container {
    width: 80vw;
    padding: 10px;
  }
}
</style>
