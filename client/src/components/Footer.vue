<template>
  <footer class="footer bg-primary text-white text-center text-lg-start">
      <div class="container">
          <div class="footer-content">
              <div class="footer-section brand">
                  <img class="logo" src="/cardory-logo-white.png" alt="Cardory logo">
                  <p>Play Better.</p>
              </div>
              
              <div class="footer-section menu">
                  <h5>Menu</h5>
                  <router-link to="/">Home</router-link>
                  <router-link to="/products">Product</router-link>
                  <router-link to="/cart">Cart</router-link>
              </div>
              
              <div class="footer-section legal">
                  <h5>Termes et conditions</h5>
                  <router-link to="/legal-mentions">Mentions Légales</router-link>
                  <router-link to="/terms">CGU / CGV</router-link>
                  <router-link to="/confidentiality">Politique de confidentialité</router-link>
                  <router-link to="/shipping">Livraison</router-link>
                  <router-link to="/payment">Paiement</router-link>
              </div>
              
              <div class="footer-section contact">
                  <h5>Contact</h5>
                  <p><i class="fas fa-envelope"></i> cardory.support@gmail.com</p>
              </div>
          </div>
      </div>
  
      <div class="text-center p-4 border-top">
          © 2024 Copyright : Cardory
      </div>
  </footer>
  </template>
  
  <script>
  export default {
      name: "Footer",
  };
  </script>
  
  <style scoped>
  .footer {
      color: #FFFFFF;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0;
  }
  
  .footer .container {
      width: 80%;
      max-width: 1200px;
  }
  
  .footer-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 40px 0;
  }
  
  .footer-section {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
  }
  
  .logo {
      max-width: 150px;
      height: auto;
      margin-bottom: 20px;
  }
  
  a {
      color: white;
      text-decoration: none;
      margin-bottom: 10px;
  }
  
  @media (max-width: 768px) {
      .footer-content {
          flex-direction: column;
          align-items: center;
      }
  
      .footer-section {
          align-items: center;
          margin-bottom: 20px;
      }
  }
  </style>
  