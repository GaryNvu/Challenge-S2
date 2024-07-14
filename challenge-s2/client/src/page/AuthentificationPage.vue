<template lang="">
    <div>
        <LoginForm v-if="hasAnAccount" @Registration="hasAnAccount = false"/>
        <RegisterForm v-if="!hasAnAccount" @LogIn="hasAnAccount = true"/>
    </div>
</template>
<script>
import LoginForm from "../components/LoginForm.vue";
import RegisterForm from "../components/RegisterForm.vue";

export default {
    name: "AuthentificationPage",
    components: {
        LoginForm,
        RegisterForm,
    },
    data() {
        return {
            hasAnAccount: true,
        }
    },
    methods: {
        
    },
}
</script>
<style>
</style>