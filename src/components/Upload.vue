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
         var ref = firebase.database().ref("files/name");
         let files = event.target.files;
         let fileName = files[0].name;
         if (fileName.lastIndexOf(".") <= 0 || fileName.indexOf(".nfo") < 0) {
           return alert("Please add valid nfo file");
         }
         var valeur = false;
         ref.once("value", function(snapshot) {
           var a = snapshot.child("name").exists(); // true
           alert(a)
           if (a) {
             valeur = true
           }

         });
        if (valeur == true){
          alert("Cet NFO existe déjà");

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
      const file = filename.split(".nfo")[0]; //For.A.Few.Dollars.More.1965.MULTi.1080p.BluRay.x264-FHD
      const ext = filename.slice(filename.lastIndexOf(".")); //.nfo
      const team =  file.split("-")[1];//
      var moment = require('moment');
      const uploadDate = moment().format('DD/MM/YYYY h:mm:ss');
      const section = file.split('-')[0];
      const section2 = section.slice(section.lastIndexOf('.'));

      firebase
        .storage()
        .ref("files/" + file + "" + ext)
        .put(this.testFile)
        .then(fileData => {
          firebase
            .database()
            .ref("files")
            .push({
              name: fileData.metadata.name,
              team: team,
              date: uploadDate,
              section: section2
            })
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
