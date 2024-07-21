<template>
    <header>
        <div class="left-side">
            <button class="menu-toggle" @click="$emit('toggle-menu')">
                <i class="bi bi-list"></i>
            </button>
            <img class="logo" src="../assets/cardory-logo-white.png" alt="logo du site">
        </div>
        
        <div class="right-side">
            <router-link v-if="isAuthenticated" :to="`/cart/${getUser.id}`" class="icon-container">
                <i class="bi bi-cart3 h2"></i>
                <span class="cart-count" v-if="cartItemCount > 0">{{ cartItemCount }}</span>
            </router-link>
            <router-link v-else="isAuthenticated" :to="`/cart`">
                <i class="bi bi-cart3 h2"></i>
            </router-link>
            <div v-if="isAuthenticated">
                <span>{{ getUser.firstname }}</span>
            </div>
            <router-link to="/authentification" style="margin-right: 25px; color: white;">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </router-link>
            
        </div>
    </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: "Header",
    computed: {
        ...mapGetters(['isAuthenticated', 'getUser', 'cartItemCount']),
    },
    methods: {
        ...mapActions(['setUser', 'setToken']),
            logout() {
            this.setUser(null);
            this.setToken(null);
            this.$router.push('/login');
        }
    }
};
</script>

<style scoped>
    header {
        background-color: #006BE9;
        color: #FFFFFF;
        display: flex;
        justify-content: space-between;
        height: 8vh;
        margin: 0;
        align-items: center;
    }

    .logo {
        max-width: 150px; /* Adjust the max-width as needed */
        height: auto;
        object-fit: contain;
    }

    .left-side {
        display: flex;
        justify-content: flex-start;
    }

    .right-side {
        display: flex;
        align-items: center;
        margin-right: 30px;
    }

    .icon-container {
        position: relative;
        margin-right: 25px;
        color: white;
    }

    .cart-count {
        position: absolute;
        top: -5px;
        right: -10px;
        background-color: red;
        color: white;
        min-width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.75rem;
        padding: 0 6px;
    }

    span {
        font-weight: bold;
        font-family: "Poppins";
    }

    .menu-toggle {
        padding: 0.5rem 1rem;
    }

    .menu-toggle i {
        font-size: 2rem;
    }

    button {
        background-color: #006BE9;
        text-decoration: none;
        border: none;
        color: white;
        cursor: pointer;
    }

    svg {
        width: 35px;
        height: 35px;
    }

    .sidebar {
        height: 100vh; /* Full height */
        position: fixed; /* Fixed Sidebar */
        top: 0;
        left: 0;
        z-index: 1000; /* Ensure it is above other elements */
        overflow-x: hidden; /* Disable horizontal scroll */
    }
</style>