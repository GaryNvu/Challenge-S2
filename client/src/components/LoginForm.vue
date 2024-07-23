<template>
    <div class="offset-4 col-4 mt-5">
        <div class="card">
            <div class="card-header">
                <h5> Connexion </h5>
            </div>
            <div class="card-body">
                <div class="d-flex flex-column align-items-center">
                    <el-input class="mb-3" v-model="user.email" placeholder="enter email" />
                    <el-input class="mb-3" v-model="user.password" type="password" placeholder="enter password" />
                    <el-button class="mb-3 btn btn-primary" type="primary" @click="login()">Log in</el-button>
                    <p class="mb-0" >Don't have an account yet ? <span class="text-primary" style="cursor: pointer;" @click="$emit('Registration')">Create one here</span> </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import api from '../../api';
import { mapMutations } from 'vuex';

export default {
name: "LoginForm",
data() {
    return {
        user: {
            email: '',
            password: ''
        }
    }
},
methods: {
    ...mapMutations(['SET_USER', 'SET_TOKEN']),
    async login() {
      try {
        const response = await api.login(this.user);
        const { token, user } = response.data;
        this.SET_USER(user);
        this.SET_TOKEN({token});
        this.$router.push('/');
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
},
}
</script>
<style></style>