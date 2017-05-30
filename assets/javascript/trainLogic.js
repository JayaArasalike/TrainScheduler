// 1. Initialize Firebase
var config = {
  	apiKey: "AIzaSyDVkinmG8jpV1E_AXpt6E33AGU1ckJl9es",
    authDomain: "fir-project-b4d04.firebaseapp.com",
    databaseURL: "https://fir-project-b4d04.firebaseio.com",
    projectId: "fir-project-b4d04",
    storageBucket: "fir-project-b4d04.appspot.com",
    messagingSenderId: "420179176591"
};

firebase.initializeApp(config);

var database = firebase.database();

//button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
	  var trainName = $("#train-name-input").val().trim();
	  var destination = $("#destination-input").val().trim();
	  var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
	  //var firstTrain = $("#first-train-input").val().trim().format("hh:mm");
	  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
	  var newTrain = {
	    name: trainName,
	    destination: destination,
	    firstTrain: firstTrain,
	    frequency: frequency
	  };

  // Uploads employee data to the database
  	  database.ref().push(newTrain);

  // Logs everything to console
	  console.log(newTrain.name);
	  console.log(newTrain.destination);
	  console.log(newTrain.firstTrain);
	  console.log(newTrain.frequency);

  // Alert
  	  alert("Train successfully added");

  // Clears all of the text-boxes
	  $("#train-name-input").val("");
	  $("#destination-input").val("");
	  $("#firstTrain-input").val("");
	  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  		console.log(childSnapshot.val());

  // Store everything into a variable.
	  	var trainName = childSnapshot.val().name;
	  	var trainDestination = childSnapshot.val().destination;
	  	var firstTrainTime = childSnapshot.val().firstTrain;
	  	var trainFrequency = childSnapshot.val().frequency;

  // Train Info
	  	console.log("Train Name: ", trainName);
	  	console.log("Train Destination: ",trainDestination);
	  	console.log("First Train Time: ", firstTrainTime);
	  	console.log("Train Frequency: ",trainFrequency);

  // Prettify the train start
		var firstTrainTimePretty = moment.unix(firstTrainTime).format("HH:mm");
		console.log("This is prettified unix date: ", firstTrainTimePretty);

		//Get the train frequency from user input
		console.log("---------------------------------------------------------------")
		var tFrequency = trainFrequency;
		console.log("Train Frequency: ", tFrequency);

	    // Train Time from user input
	    var firstTime = firstTrainTime;
	    console.log("First Train Time: ", firstTime);

	    // First Time (pushed back 1 year to make sure it comes before current time)
	    var firstTimeConverted = moment(firstTrainTimePretty, "hh:mm").subtract(1, "years");
	    //var firstTimeConverted = moment(firstTrain).subtract(1, "years");
	    console.log("First Time Converted: ", firstTimeConverted);

	    // Current Time
	    var currentTime = moment();
	    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

	    // Difference between the times
	    console.log("JUST TIME Converted: ", moment(firstTime, "hh:mm"));
	    var diffTime = moment().diff(moment(firstTimeConverted, "hh:mm"), "minutes");
	    console.log("DIFFERENCE IN TIME: " + diffTime);

	    // Time apart (remainder)
	    var tRemainder = diffTime % tFrequency;
	    console.log(tRemainder);

	    // Minute Until Train
	    var tMinutesTillTrain = tFrequency - tRemainder;
	    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	    // Next Train
	    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	    var nextArrival = moment(nextTrain).format("hh:mm");
	    console.log("ARRIVAL TIME: " + nextArrival);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + nextArrival + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});
