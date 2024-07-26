<template>
    <div class="container">
      <h1>Welcome to Secret Santa!</h1>
      <router-link to="/register" class="button">Go to Registration</router-link>
    </div>
  </template>
  
  <style scoped>
  .container {
    max-width: 800px;
    text-align: center;
    margin-top: 50px;
    padding: 50px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: auto;
  }
  .button {
    display: inline-block;
    padding: 10px 20px;
    margin-top: 20px;
    background-color: #3498db;
    color: white;
    text-decoration: none;
  }
  </style>
  