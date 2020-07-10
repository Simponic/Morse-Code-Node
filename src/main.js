/* TODO:
		- Fix bugs
			* When a new user connects the first letter is off
			* Other stuff
		- Implement rooms
		- Implement who is "typing"
		- Better UI?
		- Comment better
		- Valid username ( not taken )
		- Multiple people in rooms
*/
var username = prompt("What is your name?");
document.getElementById( "userDecodedText" ).innerHTML = username + ": ";
var userMorse = new Morse ( 250 , username );
var connectionMorse = new Morse ( 250 , "Other");
var ip = prompt("What is the server ip?");
var port = 8080;
var socket = io.connect('http://' + ip + ':' + port + '/'); // Connect to server

function stopSound( morseInstance , divID ) {
	morseInstance.stopSound();
	document.getElementById( divID ).innerHTML = morseInstance.decodedString; // Show decoded morse string
}

function startSound( morseInstance ) {
	morseInstance.startSound();
}

$( '#morse' ).mouseup( function() {
	socket.emit ( 'stop' , username ); // Send that we stopped pressing the pad
	stopSound ( userMorse , 'userDecodedText' );
});

$( '#morse' ).mousedown( function() {
	socket.emit ( 'start' , username ); // Send that we started pressing the pad
	startSound ( userMorse , 'userDecodedText' );
});


socket.on ( 'start' , (user) => {
	// Make sure we don't get stuck in an endless loop of sending
	// ourself the same message
	if ( user != username ) {
		startSound ( connectionMorse );
	}
});

socket.on ( 'stop' , (user) => {
	if ( user != username ) {
		stopSound ( connectionMorse , 'connectionDecodedText' );
	}
	if ( user != connectionMorse.username ) {
		connectionMorse = new Morse ( 250 , user );
	}
});
function clear() {
	connectionMorse.clear();
	userMorse.clear();
}
