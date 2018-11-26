var config = {
    apiKey: "AIzaSyC40aXl7SHchCvqeLj0erZp_RuTDlLzPzs",
    authDomain: "rock-paper-scissors-2ecce.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-2ecce.firebaseio.com",
    projectId: "rock-paper-scissors-2ecce",
    storageBucket: "rock-paper-scissors-2ecce.appspot.com",
    messagingSenderId: "309781883862"
};
firebase.initializeApp(config);
var firebase = firebase.database();

var choice = {
    playerOne: "",
    playerTwo: ""
};
firebase.ref().set(choice)

var firstPlayerPlayed = false;
var play = true;

$(".btn").on("click", function() {
        if (firstPlayerPlayed == false && play == true){
        choice.playerOne = $(this).attr("id");
        console.log("playerone: " + choice.playerOne);
        firstPlayerPlayed = true;
    } else {
        choice.playerTwo = $(this).attr("id");
        console.log("playertwo: " + choice.playerTwo);
    };
});

var choices = ["r", "p", "s"];

$(".btn").on("click", function() { 
if (choice.playerOne && choice.playerTwo != false) {
        var one = choices.indexOf(choice.playerOne);
        var two = choices.indexOf(choice.playerTwo);
        console.log(one);
        console.log(two);

        if (one == two) {
            alert("It's a tie!")
        }

        if (one == choices.length - 1 && two == 0) {
            alert("Player two wins!")
        }

        if (two == choices.length - 1 && one == 0) {
            alert("Player one wins!")
        }

        if (one < two) {
            alert("Player two wins!")
        }

        else {
            alert("Player one wins!")
        }
    };
});