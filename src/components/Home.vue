<template>
  <v-container fluid>
    <v-layout flex align-center justify-center>
      <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col" align="left">Section</th>
          <th scope="col" align="left">Upload Date</th>
          <th scope="col" align="left">Name</th>
          <th scope="col" align="left">Team</th>
          <th scope="col" align="left">Show</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in fileList">
          <template>
            <div >
              <v-dialog
                v-model="dialog"
                width="500"
              >

          <td scope="row">{{item.section}}</td>
          <td>{{item.date}}</td>
          <td>{{item.name}}</td>
          <td>{{item.team}}</td>
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >
            Privacy Policy
          </v-card-title>

          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              @click="dialog = false"
            >
              I accept
            </v-btn>
          </v-card-actions>
        </v-card>


            </v-dialog>
          </div>


</template>


        </tr>
      </tbody>
    </table>
  </v-layout>
</v-container>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      testFile: "",
      operation: false,
      fileList: "",
      dialog:false

    };
  },
  mounted() {
    firebase
      .database()
      .ref("files")
      .on("value", snapshot => {
        this.fileList = [];
        let dblist = snapshot.val();
        for (let key in dblist) {
          this.fileList.push(dblist[key]);
        }
      });
  },
  methods: {

      uploadOnServer() {
      this.operation = true;
      const filename = this.testFile.name;
      const file = filename.split(".txt")[0];
      const ext = filename.slice(filename.lastIndexOf("."));
      firebase
        .storage()
        .ref("files/" + file + "" + ext)
        .put(this.testFile)
        .then(fileData => {
          firebase
            .database()
            .ref("files")
            .push({ name: fileData.metadata.name })
            .then(res => {
              this.operation = false;
            })
            .catch(error => {
              console.log(error);
              this.operation = false;
            });
        })
        .catch(error => {
          this.operation = false;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
