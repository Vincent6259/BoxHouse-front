const express    = require('express');
const app        = express();
const http       = require('http');
const server     = http.createServer(app);
const io         = require("socket.io")(server ,{ allowEIO3 : true });
const fs         = require('fs') //require filesystem module
const Gpio       = require('onoff').Gpio

app.use(express.static('public'));

var LED1 = new Gpio(2, 'out');
var LED2 = new Gpio(3, 'out');
var LED3 = new Gpio(4, 'out');
//var LED4 = new Gpio(5, 'out');

server.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})

io.on('connection', function (socket) { // WebSocket Connection
  var lightvalue = 0; //static variable for current status
  var led = new Array();
  /*
  for (i=1; i<=3; i++)
  {
    led[i] ='button_'+i;
  }
*/
  socket.on('button_1', function(data) { //get light switch status from client
      lightvalue = data;
      if (lightvalue != LED1.readSync()) { //only change LED if status has changed
          LED1.writeSync(lightvalue); //turn LED on or off
      }
    });

    socket.on('button_2', function(data) { //get light switch status from client
      lightvalue = data;
      if (lightvalue != LED2.readSync()) { //only change LED if status has changed
          LED2.writeSync(lightvalue); //turn LED on or off
      }
    });

    socket.on('button_3', function(data) { //get light switch status from client
      lightvalue = data;
          LED3.writeSync(lightvalue); //turn LED on or off
      }
    });


process.on('SIGINT', function () { //on ctrl+c
  LED1.writeSync(0); // Turn LED off
  LED1.unexport(); // Unexport LED GPIO to free resources

  process.exit(); //exit completely
});
