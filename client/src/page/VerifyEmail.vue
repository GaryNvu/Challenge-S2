<template>
    <div>
      <h1>Email Verification</h1>
      <p v-if="verified">Your email has been successfully verified!</p>
      <p v-else>Verifying...</p>
    </div>
  </template>
  
  <script>
  import api from '../../api.js';
  
  export default {
    data() {
      return {
        verified: false
      };
    },
    created() {
      this.verifyEmail();
    },
    methods: {
      async verifyEmail() {
        try {
          const token = this.$route.query.token;
          await api.verifyEmail(token);
          this.verified = true;
        } catch (error) {
          console.error('Failed to verify email:', error);
        }
      }
    }
  };
  </script>