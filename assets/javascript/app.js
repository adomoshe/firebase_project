var config = {
    apiKey: "AIzaSyABpCBcYUownzYMKOG2-5u7WGKG-vLepXc",
    authDomain: "train-scheduler-4d268.firebaseapp.com",
    databaseURL: "https://train-scheduler-4d268.firebaseio.com",
    projectId: "train-scheduler-4d268",
    storageBucket: "train-scheduler-4d268.appspot.com",
    messagingSenderId: "296005992479"
};
firebase.initializeApp(config);

var firebase = firebase.database();

// When submit button is clicked prevent page refresh and call collectData function
$("#submit").on("click", function(submit) {
    submit.preventDefault();
    collectData();
    
});

// Binds train object with train info pulled from values filled by the user on the form
function collectData() {
    var train = {
        name: $("#train").val().trim(),
        destination: $("#destination").val().trim(),
        first: $("#first").val().trim(),
        frequency: ($("#frequency").val().trim())
    };
    
    // Pushes object to firebase everytime it is collected and later clears form value fields
    firebase.ref().push(train);

    console.log(train.name);
    console.log(train.destination);
    console.log(train.first);
    console.log(train.frequency);
    $("#train, #destination, #first, #frequency").val("");
};

// Whenever a child is added value of the snapshot returned is bound to variable train
firebase.ref().on("child_added", function(childSnap) {
    console.log(childSnap.val());
    var train = childSnap.val();
   
    // User input of the first train is converted to moment format (24hr)
    // Moment for this time yesterday is bound to nowYesterday variable
    // Difference in minutes between the first train and nowYesterday is bound to calculatedTrainFirst variable
    // minsAway is calculated from the modulo of calculatedTrainFirst and the frequency of the trains arriving
    var formattedTrainFirst = moment(train.first, "HH:mm")
    console.log(formattedTrainFirst)
    var nowYesterday = moment().subtract(1, "days")
    console.log(nowYesterday);
    var calculatedTrainFirst = formattedTrainFirst.diff(nowYesterday, "minutes")
    console.log(calculatedTrainFirst)
    var minsAway = calculatedTrainFirst % train.frequency

    // Info is organized into td inside a tr to be displayed to the user
    var newRow = $("<tr>").append(
        $("<td>").text(train.name),
        $("<td>").text(train.destination),
        $("<td>").text(train.frequency),
        $("<td>").text(moment().add(minsAway, "minutes").format("HH:mm")),
        $("<td>").text(minsAway)
    );

    $("#table-insert").append(newRow);

});