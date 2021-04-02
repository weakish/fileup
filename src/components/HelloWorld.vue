<template>
  <v-container>
    <v-layout column>
      <v-flex>
        <p v-if="fileData != null">{{ fileName }}</p>
      </v-flex>
      <v-flex>
        <div>
          <v-btn @click="click1">upload a file</v-btn>
          <input
            type="file"
            ref="input1"
            style="display: none"
            @change="displayFileName"
          />
        </div>
        <p></p>
      </v-flex>
      <v-flex>
        <v-btn color="blue" @click="upload">upload</v-btn>
        <p></p>
      </v-flex>
      <v-flex v-if="fileUrl.length != 0">
        <pre><code>{{ fileUrl }}</code></pre>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import LC from "leancloud-storage";
export default {
  data() {
    return {
      fileData: null,
      fileUrl: "",
    };
  },
  methods: {
    click1() {
      this.$refs.input1.click();
    },
    displayFileName(event) {
      this.uploadValue = 0;
      this.fileData = event.target.files[0];
      this.fileName = this.fileData.name;
    },
    upload() {
      const file = new LC.File(this.fileName, this.fileData);
      file
        .save()
        .then((savedFile) => {
          console.log(savedFile)
          console.log(savedFile.id)
          console.log(savedFile.get('url'));
          this.fileUrl = savedFile.get('url');
          console.log(this.fileUrl);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
