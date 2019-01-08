
const pigpio = require('pigpio');
const Gpio = pigpio.Gpio
const timesync =  require ('timesync');
const led = new Gpio(17, {mode: Gpio.OUTPUT});
let dutyCycle = 0;
let increment = 0;
let pulsazione = 0;
var counter = 0;
var main;
var ts = timesync.create({
    server: 'http://battito.cuoredinapoli.net/timesync',
    interval: 3700
  });
  ts.on('change', function (offset) {
//    console.log('changed offset: ' + offset + ' ms');
  });

  setInterval(function () {
    var now = new Date(ts.now());
    if((now.getSeconds()%3==1) && (counter == 0)){
	counter = 1;
	increment = 0;
	dutyCycle = 0;
	pulsazione = 0;
	main = setInterval(pulsa, 24);
	} else{
      // console.log('non batto');
    }

 }, 1);

function pulsa() {
		led.pwmWrite(dutyCycle);
		dutyCycle += increment;
		//console.log(pulsazione);
		if (pulsazione == 0) {
		increment = 40;
		if (dutyCycle >=255){dutyCycle = 255; pulsazione =1;}
		}

		if (pulsazione == 1) {
		increment = -20;
		if (dutyCycle <=0) {dutyCycle = 0; pulsazione = 2;}
		}

		if (pulsazione == 2) {
		increment = 44;
		if (dutyCycle >=255) {dutyCycle = 255; pulsazione = 3;}
		}

		if (pulsazione == 3) {
		increment = -6;
		if (dutyCycle <=0) {dutyCycle = 0; pulsazione = 4;}
		}

 		if (pulsazione == 4) {
		stopPulsa();
		}
	};

function stopPulsa(){
//	pulsazione = 0;
	increment = 0;
	counter = 0;
	dutyCycle = 0;
	led.pwmWrite(0);
	clearInterval(main);
	main = 0;
	//console.log('ciao');
}
