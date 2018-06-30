<template>
  <div id="upload">
    <v-layout row wrap>
      <v-flex xs12 sm12 style="text-align: center; margin-bottom:25px">
          <v-progress-circular v-if="operation" indeterminate color="green">File Uploading...</v-progress-circular>
          <v-btn raised dark class="blue lighten-1" @click="onPickFile" :disabled="operation">Upload NFO</v-btn>
          <input type="file"
          style="display:none"
          ref="fileInput"
          accept=".nfo"
          @change="onFilePicked"
          />
        </v-flex>
      </v-layout>
  </div>
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
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
         var ref = firebase.database().ref("files");
         let files = event.target.files;
         let fileName = files[0].name;
         if (fileName.lastIndexOf(".") <= 0 || fileName.indexOf(".nfo") < 0) {
           return alert("Please add valid nfo file");
         }
         var valeur = false;
         ref.once("value", function(snapshot) {
           var b = snapshot.child("name").exists(); // true
           alert(b)
           if (b) {
             alert("Cet NFO existe déjà");
             valeur = true
           }

         });
        if (valeur == true){
          return -1;
        }else{

         this.testFile = files[0];
         this.uploadOnServer();
         }
         // console.log(files[0].split(".txt"));
       },



      uploadOnServer() {
      this.operation = true;
      const filename = this.testFile.name;
      const file = filename.split(".nfo")[0];
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
