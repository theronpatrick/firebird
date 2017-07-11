<template>
  <div class="page">
    <div ref="googleMapEl" class="map" id="my-map"></div>
    <!--<div v-for="movie in movieList">{{movie.lat}} {{movie.lng}}</div>-->

  </div>
</template>

<script>

import firebase from "firebase"
import GoogleMapsLoader from "google-maps"
GoogleMapsLoader.KEY = 'AIzaSyBMHJCVv3LpP4iV3YdEx_WDQWFTyXinNrs';

export default {
  components: {

  },
  data: function() {
    return {
      userId: "",
      movieUrl: "",
      movieList: [],
      currentMovieIndex: 0,
      googleMap: {}
    }
  },
  mounted: function() {
    console.log("mounted");

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

      Object.keys(moviesObject).map(function (value, key) {
        let objectToAdd = moviesObject[value]
        objectToAdd.timestamp = parseInt(value);
        moviesArray.push(objectToAdd)
      });

      console.log("array " , moviesArray);

      let compareFunction = function compare(a, b) {

        if (a.timestamp < b.timestamp) {
          return -1;
        }
        if (a.timestamp > b.timestamp) {
          return 1;
        }
        // a must be equal to b
        return 0;
      }

      this.movieList = moviesArray.sort(compareFunction)

      this.initGoogleMaps();


    })


  },
  methods: {
    initGoogleMaps: function() {
      // key AIzaSyBMHJCVv3LpP4iV3YdEx_WDQWFTyXinNrs
      // TODO: Figure out why this shit aint working
      console.log("refs " , this.$refs.googleMapEl);
      GoogleMapsLoader.onLoad(function(google) {
          console.log('I just loaded google maps api');
      });



      GoogleMapsLoader.load((google) => {
          this.googleMap = new google.maps.Map(this.$refs.googleMapEl, {
            center: {lat: this.movieList[0].lat, lng: this.movieList[0].lng},
            zoom: 4
          });

          // Place markers
          for (let i = 0; i < this.movieList.length; i++) {

            let date = new Date(this.movieList[i].timestamp)
            let marker = new google.maps.Marker({
              position: {lat: this.movieList[i].lat, lng: this.movieList[i].lng},
              map: this.googleMap,
              title: `Taken at ${date}`
            });
          }

      });

    }
  }
}
</script>

<style scoped>
  .map {
    height: 100%;
  }

  .page {
    height: 100%;
    width: 100%;
    text-align: center;
  }

</style>
