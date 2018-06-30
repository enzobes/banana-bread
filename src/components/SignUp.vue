<template>
  <div class="sign-up">
    <p>Let's create a new account ! </p>
    <input type="text" v-model="email" placeholder="Email">
    <input type="password" v-model="password" placeholder="Password">
    <v-btn raised dark class="blue lighten-1" @click="signUp">Sign up</v-btn>
    <span> or go back<router-link to="/login"> to login </router-link>.</span>
  </div>
</template>
<script>
import firebase from 'firebase'
export default {
  name: 'signUp',
  data() {
    return {
      email: "",
      password: ""
    };
  },

  methods: {
    signUp() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          alert("Your account has been created !")
          this.$router.replace('home')

        },
        (err) => {
          alert("Oops. "+ err.message)
        }
      );
    }
  }
}
</script>
<style scoped>

.login{
  margin-top: 40px;
}

input {
  margin: 10px 0;
  width: 20%;
  margin-left: 20px;
  padding:15px;
}

button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}

p {
  margin-top: 40px;
  font-size: 13px;
}

span {
  display: block;
  margin-top:20px;
  font-size: 11px;
}

p a {
  text-decoration: underline;
  cursor: pointer;
}
</style>
