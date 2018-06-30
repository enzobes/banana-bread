<template>
  <div class="sign-up">
    <p>Let's create a new account ! </p>
    <input type="text" v-model="email" placeholder="Email">
    <input type="password" v-model="password" placeholder="Password">
    <v-btn raised dark class="blue lighten-1" @click="signUp">Sign up</v-btn>
  </div>
</template>

<template>
  <div id="sign-up">
  <h2 class="title">Sign Up - Banana Breed</h2>
  <v-layout flex align-center justify-center>
    <v-flex xs6 sm2>
      <v-card>
        <v-card-text primary-title>
          <div>
              <v-form v-model="valid">
                <v-text-field
                  type ="text"
                  v-model="email"
                  :rules="emailRules"
                  label="Email"
                  ref="emailInput"
                  required
                ></v-text-field>
                <v-text-field
                  type="password"
                  v-model="password"
                  label="Password"
                  ref="passwordInput"
                  required
                ></v-text-field>
              </v-form>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn raised dark class="blue lighten-1" :disabled="!valid" @click="signUp">Sign up</v-btn>
          <v-btn raised dark class="blue lighten-1" @click="clear">Clear</v-btn>
        </v-card-actions>
        <span> or go back<router-link to="/login"> to login</router-link>.</span>

      </v-card>
    </v-flex>
  </v-layout>
</div>
</template>
<script>
import firebase from 'firebase'
export default {
  name: 'signUp',
  data() {
    return {
      email: "",
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      password: "",
      valid: true

    };
  },

  methods: {
    signUp() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          alert("Your account has been created !")
          this.$router.go('home')

        },
        (err) => {
          alert("Oops. "+ err.message)
        }
      );
    },
    clear: function () {
      this.$refs.passwordInput.value = null
      this.$refs.emailInput.value = null
    }
  }
}
</script>
<style scoped>


</style>
