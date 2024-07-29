<template>
  <div class="container">
    <!-- <img src="@/assets/images/santa.webp" alt="Santa" class="santa-image"> -->
    <h1>Welcome to Secret Santa</h1>
    <router-link to="/register" class="button">Go to Registration</router-link>
  </div>
</template>

<style scoped>
.container {
  max-width: 80%;
  text-align: center;
  margin-top: 50px;
  padding: 50px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: auto;
}

.santa-image {
  width: 100px;
  height: auto;
  margin-bottom: 20px;
}

.button {
  display: inline-block;
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

/* Mobile responsiveness */
@media (max-width: 600px) {
  .container {
    padding: 20px;
  }

  .santa-image {
    width: 80px;
  }

  .button {
    padding: 8px 16px;
    margin-top: 15px;
  }
}
</style>
