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

var content = {
    choice: {
        playerOne: "",
        playerTwo: ""
    }
};
firebase.ref().set(content)

var firstPlayerPlayed = false;
var play = true;

$(".btn").on("click", function () {
    if (firstPlayerPlayed == false && play == true) {
        content.choice.playerOne = $(this).attr("id");
        console.log("playerone: " + content.choice.playerOne);
        firebase.ref().child(content.choice.playerOne).set(content.choice.playerOne);
        firstPlayerPlayed = true;
    } else {
        content.choice.playerTwo = $(this).attr("id");
        console.log("playertwo: " + content.choice.playerTwo);
    };
});

var choices = ["r", "p", "s"];

$(".btn").on("click", function () {
    if (content.choice.playerOne && content.choice.playerTwo != false) {
        var one = choices.indexOf(content.choice.playerOne);
        var two = choices.indexOf(content.choice.playerTwo);
        console.log(one);
        console.log(two);

        if (one == two) {
            return alert("It's a tie!")
        }

        if (one == choices.length - 1 && two == 0) {
            return alert("Player two wins!")
        }

        if (two == choices.length - 1 && one == 0) {
            return alert("Player one wins!")
        }

        if (one < two) {
            return alert("Player two wins!")
        }

        else {
            return alert("Player one wins!")
        }
    };
});