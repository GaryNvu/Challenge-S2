<!--<template>
    <footer>
        <div class="brand">
            <h2>Cardex</h2>
            <p>Play Better</p>
        </div>
        <div class="menu">
            <router-link to="/" style="margin-right: 25px; color: white;">Home</router-link>
            <router-link to="/products" style="margin-right: 25px; color: white;">Product</router-link>
            <router-link to="/cart" style="margin-right: 25px; color: white;">Cart</router-link>
        </div>
        <div class="legal">
            <router-link to="/terms" style="margin-right: 25px; color: white;">Termes & conditions</router-link>
        </div>
        <div class="socials"></div>
    </footer>
</template>
-->
<template>
<footer class="text-center text-lg-start bg-primary">
    <!-- Section: Links  -->
    <section class="">
      <div class="container text-center text-md-start mt-5">
        <!-- Grid row -->
        <div class="row mt-3">
          <!-- Grid column -->
          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <!-- Content -->
            <h6 class="text-uppercase fw-bold mb-4">
                <img class="logo" src="../assets/logo_white_align.png" alt="logo du site">
            </h6>
            <p>
              Play Better.
            </p>
          </div>
          <!-- Grid column -->
  
          <!-- Grid column -->
          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <!-- Links -->
            <h6 class="text-uppercase fw-bold mb-4">
              Menu
            </h6>
            <p><router-link class="text-reset" to="/" style="margin-right: 25px; color: white;">Home</router-link></p>
            <p><router-link class="text-reset" to="/products" style="margin-right: 25px; color: white;">Product</router-link></p>
            <p><router-link class="text-reset" to="/cart" style="margin-right: 25px; color: white;">Cart</router-link></p>
          </div>
          <!-- Grid column -->
  
          <!-- Grid column -->
          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <!-- Links -->
            <h6 class="text-uppercase fw-bold mb-4">
              Termes et conditions
            </h6>
            <p><router-link class="text-reset" to="/terms" style="margin-right: 25px; color: white;">Conditions générales</router-link></p>
            <p><router-link class="text-reset" to="/confidentiality" style="margin-right: 25px; color: white;">Politique de confidentialité</router-link></p>
          </div>
          <!-- Grid column -->
  
          <!-- Grid column -->
          <div class="col-md-2 col-lg-3 mx-auto mb-md-0 mb-4">
            <!-- Links -->
            <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
            <p>
              <i class="fas fa-envelope me-3"></i>
              cardex.support@gmail.com
            </p>
          </div>
          <!-- Grid column -->
        </div>
        <!-- Grid row -->
      </div>
    </section>
    <!-- Section: Links  -->
  
    <!-- Copyright -->
    <div class="text-center p-4 border-top">
      © 2021 Copyright:
      <a class="text-reset fw-bold" href="https://mdbootstrap.com/">MDBootstrap.com</a>
    </div>
    <!-- Copyright -->
  </footer>
  <!-- Footer -->
</template>

<script>
    export default {
        name: "Footer",
    };
</script>

<style scoped>
    footer {
        color: #FFFFFF;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0;
        align-items: center;
    }

    a {
        color: white;
        text-decoration: none;
    }

    .logo {
        max-width: 150px; /* Adjust the max-width as needed */
        height: auto;
        object-fit: contain;
    }

</style>