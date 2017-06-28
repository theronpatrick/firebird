<template>
  <div class="page">
    <video :src="movieUrl" autoplay="true" v-on:ended="movieEnded"></video>
  </div>
</template>

<script>

import firebase from "firebase"

export default {
  components: {

  },
  data: function() {
    return {
      userId: "",
      movieUrl: "",
      movieList: [],
      currentMovieIndex: 0
    }
  },
  mounted: function() {
    console.log("hey");

    const firebaseConfig = {
        apiKey: "AIzaSyAvOfaegGuwsjZNzzhPrDOutRizggH0Hsw",
        authDomain: "pontiac-970fe.firebaseapp.com",
        databaseURL: "https://pontiac-970fe.firebaseio.com",
        projectId: "pontiac-970fe",
        storageBucket: "pontiac-970fe.appspot.com",
        messagingSenderId: "952642331912"
      };

    const firebaseApp = firebase.initializeApp(firebaseConfig);

    // TODO: Get from auth
    // Note: firebase doesn't let u save string with "." so replace with word "dot".
    this.userId = "therondevelopment@gmaildotcom"

    // TODO: Make sure UI isn't allowed to perform operations before this completes
    // TODO: Build in auth
    let email = 'therondevelopment@gmail.com'
    let password = 'default'

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log("error " , errorMessage);


    });

    firebase.database().ref('therondevelopment@gmaildotcom-movies').once('value', (data) => {
      console.log("data " , data.val());

      // Sort object to be ascending
      let moviesObject = data.val();
      let moviesArray = []

      Object.keys(moviesObject).map(function (key) {
        moviesArray.push(parseInt(key))
      });

      let compareFunction = function compare(a, b) {

        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        // a must be equal to b
        return 0;
      }

      this.movieList = moviesArray.sort(compareFunction)

      var storage = firebase.storage();
      var pathReference = storage.ref(`${this.userId}/${this.movieList[0]}.mov`);

      console.log("path " , pathReference);

      pathReference.getDownloadURL().then((url) => {
        console.log("movie url " , url);
        this.movieUrl = url
      })
    })


  },
  methods: {
    movieEnded: function() {
      console.log("ended");
      this.currentMovieIndex = this.currentMovieIndex + 1;

      if (this.currentMovieIndex === this.movieList.length) {
        console.log("all done!");
        return;
      }

      var storage = firebase.storage();
      var pathReference = storage.ref(`${this.userId}/${this.movieList[this.currentMovieIndex]}.mov`);

      console.log("path " , pathReference);

      pathReference.getDownloadURL().then((url) => {
        console.log("movie url " , url);
        this.movieUrl = url
      })

      this.movieUrl = this.movieList[this.currentMovieIndex]
    }
  }
}
</script>

<style scoped>
  video {
    height: 100%;
  }

  .page {
    height: 100%;
    width: 100%;
    text-align: center;
  }

</style>
