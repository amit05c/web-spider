   <template>
    <div class="container">
      <h1>Results</h1>
      <ul>
        <li v-for="(assignee, participant) in assignments" :key="participant">
          <span class="participant">{{ participant }}</span>
          <span class="assignee">{{ assignee }}</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { useAssignmentStore } from '@/stores/assignment';
  
  const assignmentStore = useAssignmentStore();
  const { assignments, fetchAssignments } = assignmentStore;
  
  onMounted(async () => {
    await fetchAssignments();
  });
  </script>
  
  <style scoped>
  /* Basic container styling */
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  /* Header styling */
  h1 {
    text-align: center;
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 20px;
  }
  
  /* List styling */
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  /* List item styling */
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
  }
  
  /* Participant and Assignee styling */
  .participant {
    font-weight: bold;
    color: #333;
  }
  
  .assignee {
    color: #555;
  }
  
  /* Responsive design */
  @media (max-width: 600px) {
    .container {
      width: 100%;
      padding: 10px;
    }
    
    h1 {
      font-size: 1.25rem;
    }
  
    li {
      flex-direction: column;
      align-items: flex-start;
    }
  
    .participant,
    .assignee {
      margin-bottom: 5px;
    }
  }
  </style>
  