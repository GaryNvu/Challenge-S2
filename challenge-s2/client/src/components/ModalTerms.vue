<template>
    <transition name="fade">
      <div v-if="isVisible" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <h3>Acceptez les Termes et Conditions</h3>
            </div>
            <div class="modal-body">
              <p>Vous devez accepter nos <a href="/terms">Termes et Conditions</a> pour continuer à utiliser notre site.</p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-danger" @click="refuse">Refuser</button>
              <button class="btn btn-success" @click="accept">Accepter</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isVisible: true
      };
    },
    methods: {
      accept() {
        this.isVisible = false;
        // Store the acceptance in localStorage or similar
        localStorage.setItem('termsAccepted', 'true');
      },
      refuse() {
        // Redirect the user or disable site functionality
        alert('Vous devez accepter les termes et conditions pour utiliser le site.');
        this.isVisible = true; // Keep the modal visible if they refuse
      }
    }
  }
  </script>
  
  <style scoped>
  .modal-mask, .modal-wrapper {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.5);
  }
  
  .modal-container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.4);
    width: 300px;
  }
  
  .modal-header h3, .modal-body p {
    margin: 0;
  }
  
  .modal-footer {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  
  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn-danger { background-color: #e3342f; color: white; }
  .btn-success { background-color: #38c172; color: white; }
  </style>