class Morse {
			constructor ( dotDuration , username ) {
				// Duration in milliseconds
				this.username = username;
				this.dotDuration = dotDuration;
				this.pressing = false;
				this.morseString = "";
				this.decodedString = "";
			}

			startSound() {
				// Play tone while pressing
				if ( !this.pressing ) {
					this.osc = new Tone.Oscillator ( 880 , "square" ).toMaster();
					this.osc.volume.value = -20;
					this.osc.start();

					this.pressing = true; // Is the pad being pressed right now?
					this.startTime = new Date(); // Time pad was pressed
					try {
						if ( this.startTime - this.timeStopped > 2 * this.dotDuration && this.startTime - this.timeStopped < 6 * this.dotDuration ) {
							this.morseString += " "; // New letter
						}
						else if ( this.startTime - this.timeStopped >= 6 * this.dotDuration ) {
							this.morseString += " _ "; // New word
						}
					}
					catch ( error ) {
						// timeStopped not defined - this is the first time the morse pad has
						// been pressed
						return;
					}
				}
			}

			stopSound() {
				// Stop tone after pressing
				if ( this.pressing ) {
					this.timePressed = new Date() - this.startTime; // Time the pad was pressed
					if ( this.timePressed <= this.dotDuration ) {
						this.morseString += "."; // Is a dot
					}
					else {
						this.morseString += "-"; // Is a dash
					}
					this.decodeMorseString();
					this.osc.stop();
					this.timeStopped = new Date(); // Time the pad has been released
					this.pressing = false;
				}
			}

			decodeMorseString() {
				// Decode morse string
				this._patternMap = { // Morse code definitions
						".-": "A",
						"-...": "B",
						"-.-.": "C",
						"-..": "D",
						".": "E",
						"..-.": "F",
						"--.": "G",
						"....": "H",
						"..": "I",
						".---": "J",
						"-.-": "K",
						".-..": "L",
						"--": "M",
						"-.": "N",
						"---": "O",
						".--.": "P",
						"--.-": "Q",
						".-.": "R",
						"...": "S",
						"-": "T",
						"..-": "U",
						"...-": "V",
						".--": "W",
						"-..-": "X",
						"-.--": "Y",
						"--..": "Z",
						"-----": "0",
						".----": "1",
						"..---": "2",
						"...--": "3",
						"....-": "4",
						".....": "5",
						"-....": "6",
						"--...": "7",
						"---..": "8",
						"----.": "9",
						"_": " "
				};

				this.decodedString = ""; // We don't want changes from the past
				this.decodedString += this.username + ": ";
				for ( var i = 0; i < this.morseString.split( " " ).length; i++ ) {
					if ( this.morseString.split( " " )[i] in this._patternMap ) { // Morse code pattern is in table
						this.decodedString += this._patternMap[this.morseString.split( " " )[i]];
					}
					else {
						this.decodedString += "?"; // Morse code pattern is not recognized
					}
				}
			}

			clear() {
				this.decodedString = "";
				this.morseString = "";
			}
}
