<template>
    <header>
        <div class="left-side">
            <button class="menu-toggle" @click="$emit('toggle-menu')">
                <i class="bi bi-list"></i>
            </button>
            <img class="logo" src="../assets/cardory-logo-white.png" alt="logo du site">
        </div>
        
        <div class="right-side">
            <router-link to="/cart" style="margin-right: 25px; color: white;">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
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
        ...mapGetters(['isAuthenticated', 'getUser']),
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