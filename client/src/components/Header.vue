<template>
    <header>
        <div class="left-side">
            <button class="menu-toggle" @click="$emit('toggle-menu')">
                <i class="bi bi-list"></i>
            </button>
            <img class="logo" src="/cardory-logo-white.png" alt="logo du site">
        </div>
        
        <div class="right-side">
            <router-link v-if="isAuthenticated" :to="`/cart/${getUser.id}`" class="icon-container">
                <i class="bi bi-cart3 h2"></i>
                <span class="cart-count" v-if="cartItemCount > 0">{{ cartItemCount }}</span>
            </router-link>
            <router-link v-else="isAuthenticated" :to="`/cart`" class="icon-container">
                <i class="bi bi-cart3 h2"></i>
            </router-link>
            <div v-if="isAuthenticated">
                <span>{{ getUser.firstname }} {{ getUser.lastname }}</span>
            </div>
            <div class="user-menu" @mouseover="showDropdown = true" @mouseleave="showDropdown = false">
                <i v-if="isAuthenticated" class="bi bi-person-check h3"></i>
                <i v-else class="bi bi-person h3"></i>
                <div v-if="showDropdown" class="dropdown-content">
                    <span v-if="isAuthenticated" @click="logout">Déconnexion</span>
                    <router-link v-else to="/authentification">Connexion</router-link>
                </div>
            </div>
            
        </div>
    </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: "Header",
    data() {
        return {
            showDropdown: false
        };
    },
    computed: {
        ...mapGetters(['isAuthenticated', 'getUser', 'cartItemCount']),
    },
    methods: {
        ...mapActions(['setUser', 'setToken', 'logout']),
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
        max-width: 150px;
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

    .user-menu {
        position: relative;
        display: inline-block;
    }

    .user-menu .bi {
        margin-left: 0.7rem;
    }

    .user-menu span {
        color: #006BE9;
    }

    .user-menu span:hover {
        cursor: pointer;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 2;
        right: 0;
        border-radius: 0.3rem;
    }

    .user-menu:hover .dropdown-content {
        display: block;
        text-align: center;
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
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        overflow-x: hidden;
    }
</style>