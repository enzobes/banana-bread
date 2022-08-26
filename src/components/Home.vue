
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
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in fileList">

          <td scope="row">{{item.section}}</td>
          <td>{{item.date}}</td>
          <td>{{item.name}}</td>
          <td>{{item.team}}</td>

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
