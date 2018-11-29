const timesync =  require ('timesync');
var Sound = require('aplay');
var counter = 0;
var ts = timesync.create({
    server: 'http://battito.cuoredinapoli.net/timesync',
    interval: 10000
  });
  // get notified on changes in the offset
  ts.on('change', function (offset) {
//    console.log('changed offset: ' + offset + ' ms');
  });

  //get synchronized time
  setInterval(function () {
    var now = new Date(ts.now());
    
    if((now.getSeconds()%3==1 && counter==0) ){
counter=1;
	var music = new Sound();
music.play('./battito.wav');
music.on('complete', function(){
counter=0;
});	
	console.log("batto");
	
    }
    else{
	
       // console.log('non batto');
       //aggiungi qui funzione per stoppare tutto
	
    }
  }, 1);


