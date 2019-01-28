const pigpio = require('pigpio');
const Gpio = pigpio.Gpio
const timesync =  require ('timesync');
const led = new Gpio(17, {mode: Gpio.OUTPUT});
const sw = new Gpio(27, {mode: Gpio.OUTPUT});
let checkSwitch = new Date().getHours();
let dutyCycle = 0;
let increment = 0;
let pulsazione = 0;
var counter = 0;
var main;
var ts = timesync.create({
    server: 'http://battito.cuoredinapoli.net/timesync',
    interval: 3000
  });
  ts.on('change', function (offset) {
checkSwitch = new Date().getHours();
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
        check();
  /*******************
  Se l'ora attuale è tra le otto di mattina e le 20 di sera il led deve essere spento
  Altrimenti il led deve essere acceso
  potete cambiare i valori 8 e 20 nell'if sottostante per verificare la condizione
  *******************/
/*  if (checkSwitch >= 20 && checkSwitch <= 10) {
console.log("abbasso luminosità");
    sw.pwmWrite(0);
  } else {
    sw.pwmWrite(255);
console.log("alta luminosità");
  }
*/
	} else{
      // console.log('non batto');
    }

 }, 1);

function check() {
console.log(checkSwitch);

if (checkSwitch >= 8 && checkSwitch <= 20 ) {
console.log("Abbasso luminosità");
sw.pwmWrite(255);
} else {
console.log("Alzo luminosità");
sw.pwmWrite(0);
}


}


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
		if (dutyCycle <=5) {dutyCycle = 5; pulsazione = 4;}
		}

 		if (pulsazione == 4) {
		increment = -1;
		if (dutyCycle <=0) {dutyCycle = 0; pulsazione = 5;}
		}
		if (pulsazione == 5) {
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
