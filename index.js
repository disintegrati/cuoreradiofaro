var sys = require('sys')
var exec = require('child_process').exec;

const timesync =  require ('timesync');
var counter = 0;
var ts = timesync.create({
    server: 'http://battito.cuoredinapoli.net/timesync',
    interval: 3000
  });
  ts.on('change', function (offset) {
//    console.log('changed offset: ' + offset + ' ms');
  });

  //get synchronized time
  setInterval(function () {
    var now = new Date(ts.now());

    if((now.getSeconds()%3==1 && counter==0) ){
	counter=1;
	console.log("batto");
	go();
	}

    else{
      // console.log('non batto');
       //aggiungi qui funzione per stoppare tutto

    }

  }, 1);

	function go(){
		child = exec("python /home/pi/Desktop/cuoreradiofaro/pulsa.py", function (error, stdout, stderr) {
counter = 0;
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});
	}
