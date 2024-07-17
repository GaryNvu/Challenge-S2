<template>
    <div class="d-flex justify-content-center align-items-center min-vh-100">
      <div class="card shadow-lg">
        <div class="card-header bg-primary text-white">
          <h5 class="mb-0">Inscription</h5>
        </div>
        <div class="card-body p-4">
          <div class="d-flex flex-column align-items-center">
            <el-input
              class="mb-3 w-100"
              v-model="user.firstname"
              placeholder="Enter Firstname"
            />
            <el-input
              class="mb-3 w-100"
              v-model="user.lastname"
              placeholder="Enter Lastname"
            />
            <el-input
              class="mb-3 w-100"
              v-model="user.email"
              placeholder="Enter Email"
            />
            <el-input
              class="mb-3 w-100"
              v-model="user.password"
              type="password"
              placeholder="Enter Password"
            />
            <el-input
              class="mb-3 w-100"
              v-model="passwordValidation.confirmPassword"
              type="password"
              placeholder="Confirm Password"
            />
  
            <p v-if="!isConfirmed" class="align-self-start text-danger">
              Passwords aren't matching
            </p>
  
            <p class="align-self-start">Your password needs to have:</p>
            <div class="row w-100">
              <p :class="passwordValidation.hasMaj ? 'text-success col-4' : 'text-secondary col-4'">
                One UpperCase
              </p>
              <p :class="passwordValidation.hasMin ? 'text-success col-4' : 'text-secondary col-4'">
                One LowerCase
              </p>
              <p :class="passwordValidation.hasDigit ? 'text-success col-4' : 'text-secondary col-4'">
                One Digit
              </p>
              <p :class="passwordValidation.hasSpecialChar ? 'text-success col-6' : 'text-secondary col-6'">
                One Special Character
              </p>
              <p :class="passwordValidation.isLongEnough ? 'text-success col-6' : 'text-secondary col-6'">
                At least 12 characters long
              </p>
            </div>
  
            <el-button class="mb-3 w-100" type="primary" @click="register()">Register</el-button>
            <p class="mb-0">
              Already have an account?
              <span
                class="text-primary"
                style="cursor: pointer"
                @click="$emit('LogIn')"
                >Log in here</span
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from '../../api.js';
  export default {
    name: "RegisterForm",
    watch: {
      "user.password": function (val) {
        this.validatePassword(val, this.passwordValidation.confirmPassword);
      },
      "passwordValidation.confirmPassword": function (val) {
        this.validatePassword(this.user.password, val);
      },
    },
    data() {
      return {
        user: {
          firstname: "",
          lastname: "",
          email: "",
          password: "",
        },
        passwordValidation: {
          confirmPassword: "",
          isLongEnough: false,
          hasMaj: false,
          hasMin: false,
          hasDigit: false,
          hasSpecialChar: false,
        },
        isConfirmed: true,
      };
    },
    methods: {
      validatePassword(password, confirmPassword) {
        const majRegex = /[A-Z]/;
        const minRegex = /[a-z]/;
        const specialCharRegex = /[!@#$%^&*.?,;:]/;
        const digitRegex = /[0-9]/;
  
        this.passwordValidation.isLongEnough = password.length >= 12;
        this.passwordValidation.hasMaj = majRegex.test(password);
        this.passwordValidation.hasMin = minRegex.test(password);
        this.passwordValidation.hasSpecialChar = specialCharRegex.test(password);
        this.passwordValidation.hasDigit = digitRegex.test(password);
        this.isConfirmed = password === confirmPassword;
      },
      async register() {
      try {
        const response = await api.register(this.user);
        console.log(response.data);
      } catch (error) {
        console.error('Registration failed:', error);
      }
    }
    },
  };
  </script>
  
  <style>
  body {
    background-color: #f8f9fa;
  }
  .card {
    width: 100%;
    max-width: 400px;
  }
  </style>