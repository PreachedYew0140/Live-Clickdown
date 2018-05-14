// Initialize Firebase
var config = {
    apiKey: "AIzaSyAGktW0TT4Y1YhMI9EsYAABE49egbIUBsI",
    authDomain: "live-clickdown-sp-p7.firebaseapp.com",
    databaseURL: "https://live-clickdown-sp-p7.firebaseio.com",
    projectId: "live-clickdown-sp-p7",
    storageBucket: "live-clickdown-sp-p7.appspot.com",
    messagingSenderId: "100620638377"
  };

  firebase.initializeApp(config);


  var database = firebase.database();


  var connectionsRef = database.ref("/connections");
  var connectedRef = database.ref("/info/connected");
  
  connectedRef.on("value", function(snap) {
      if (snap.val()) {
          var con = connectionsRef.push(true);
          con.onDisconnect().remove();
      }
  });
  connectedRef.on("value", function(snap) {
      $("#watchers").html(snap.numChildren());
  });

  var initialValue = 100;
  var clickCounter = initialValue;

  database.ref("/clicks").on("value", function(snapshot) {
      console.log(snapshot.val());
      clickCounter = snapshot.val().clickCount;
      console.log(clickCounter);
      $("#click-value").html(snapshot.val().clcickCount);
      $("#click-value").html(clickCounter);
  }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
  });



  $("#click-button").on("click", function() {
      clickCounter--;
      if (clickCounter === 0) {
          alert("Phew! You made it! You sure was a lot of clicking.");
          clickCounter = initialValue;
      }
      database.ref("/clicks").set({
          clickCount: clickCounter
      });
      console.log(clickCounter);
  });


$("#restart-button").on("click", function() {
    clickCounter = initialValue;
    database.ref("/clicks").set({
        clickCount: clickCounter
    });
    console.log(clickCounter);
    $("#click-value").html(clickCounter);
})