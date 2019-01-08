const pigpio = require('pigpio');
const Gpio = pigpio.Gpio
const led = new Gpio(17, {mode: Gpio.OUTPUT});
let dutyCycle = 0;
let increment = 0;
let pulsazione = 0;
var main = setInterval(pulsa, 20);


function stopPulsa() {
	led.pwmWrite(0);
	clearInterval(main);
}

function pulsa() {
		led.pwmWrite(dutyCycle);
		dutyCycle += increment
console.log(pulsazione);
		if (pulsazione == 0) {
		increment =7;
		if (dutyCycle >=255){dutyCycle = 255; pulsazione =1;}
		}
		
		if (pulsazione == 1) {
		increment = -8;
		if (dutyCycle <=0) {dutyCycle = 0; pulsazione = 2;}
		}
		
		if (pulsazione == 2) {
		increment = 7;
		if (dutyCycle >=255) {dutyCycle = 255; pulsazione = 3;}
		}
		
		if (pulsazione == 3) {
		increment = -3;
		if (dutyCycle <=0) {dutyCycle = 0; pulsazione = 4;}
		}
		
		if (pulsazione == 4) {stopPulsa();}
	};


