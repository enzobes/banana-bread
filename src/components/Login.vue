<template>
  <div id="login">
  <h2 class="title">Banana Breed</h2>
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
          <v-btn raised dark class="blue lighten-1" :disabled="!valid" @click="signIn">Submit</v-btn>
          <v-btn raised dark class="blue lighten-1" @click="clear">Clear</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</div>
</template>
<script>
import firebase from 'firebase'
export default {
  name: 'login',
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
  methods:{

    signIn: function() {

    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.go('home')

        },
        (err) => {
          alert("Oops. " + err.message)
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
.title{
  font-size: 42px !important;
  text-align: center;
  margin-top:15%;
  margin-bottom: 3%;
}
</style>
