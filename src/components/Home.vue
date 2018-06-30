<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap>
          <v-flex>
            <v-layout row wrap align-center>
              <v-flex xs12 v-for="item in fileList" :key="item.name" style="margin: 0px 15% 15px 15%">
                <v-card>
                  <v-card-title primary-title>{{item.name}}
                   </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      testFile: "",
      operation: false,
      fileList: ""
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
