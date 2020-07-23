    $.ajaxSetup({ timeout: 1000 });
    var database = firebase.database();
    var rootRef  = database.ref('fanData');
    var curretId ;
	$(function () {
		$(".dial").knob({
			'min': 0,
			'max': 9.5,
			'step': .5,
			'rotation': 'clockwise',
			'bgColor': '#d1d9e6',
			'data-displayInput': false,
			'data-linecap': 'round',
			'fgColor': 'rgb(135, 206, 235)',
			'angleArc': '300',
			'release': function (speed) {
				var functionToWork = "/ChangeSpeed"
				
				var speedsent = (10 - speed) == 10 ? 10 - 0.5 : (10 - speed);
				ArduinoVar = "http://" + context.ipAddress + functionToWork + "?speed=" + speedsent;
				if (speed > 0) {
					document.getElementById("turnOnFan").checked = true;
				} else {
					document.getElementById("turnOnFan").checked = false;
				}
				$.get(ArduinoVar, (data) => {
					console.log("Success");
				});
				{ Connection: close };
			}
		});
	});
	var buttonLed = document.getElementById("turnOnLed");
	buttonLed.addEventListener('onchange', turnOnLed);
	function turnOnLed() {
		
		var ledstatus = document.getElementById("turnOnLed").checked;
		if (ledstatus) {
			val1 = 'OFF';
			functionToWork = "/LED_BUILTIN_on?speed=1"
		}
		else {
			val1 = 'ON';
			functionToWork = "/LED_BUILTIN_off?speed=2"
		}

		ArduinoVar = "http://" + context.ipAddress + functionToWork;

		$.get(ArduinoVar, () => {
			console.log("Success");
		});
		{ Connection: close };
	}
	function turnOnFan() { 
        var fanStatus = document.getElementById('turnOnFan').checked;
        
        
		if (fanStatus) {
            const autoId =  rootRef.push().key;
            curretId = autoId;
            rootRef.child(autoId).set({
                startTime : new Date() + "",
                //endTime : new Date() + ""
              });
            $('.dial')
				.val(9.5)
				.trigger('change');

		} else {
            rootRef.child(curretId).update({
                endTime : new Date() + '',
            })
			$('.dial')
				.val(0)
				.trigger('change');
		}
	 }
	 function turnOnLedRoom2() {
		
		var ledstatus = document.getElementById("turnOnLedRoom2").checked;
		if (ledstatus) {
			val1 = 'OFF';
			functionToWork = "/LED_BUILTIN_on?speed=1"
		}
		else {
			val1 = 'ON';
			functionToWork = "/LED_BUILTIN_off?speed=1"
		}

		ArduinoVar = "http://" + context.ipAddress2 + functionToWork;

		$.get(ArduinoVar, () => {
			console.log("Success");
		});
		{ Connection: close };
	}
	function fanController() {
		var val1 = 'OFF';
		var functionToWork = "";
		var divSpeed = document.getElementById("Speed");
		if (turnFanOn.value === 'Turn OFF Fan') {
			turnFanOn.value = 'Turn ON Fan';
			val1 = 'OFF';
			divSpeed.style.display = "none";
			functionToWork = "/LED_BUILTIN_off"
		}
		else {
			divSpeed.style.display = "block";
			turnFanOn.value = 'Turn OFF Fan';
			val1 = 'ON';
			functionToWork = "/LED_BUILTIN_on"
		}

		ArduinoVar = "http://" + context.ipAddress + functionToWork;
		
		$.get(ArduinoVar, () => {
			console.log("Success");
		});
		{ Connection: close };
	}
	function ledController() {
		var val1 = 'OFF';
		var functionToWork = "";

		if (turnLedOn.value === 'Turn On Led 1') {
			turnLedOn.value = 'Turn Off Led 1';
			val1 = 'OFF';

			functionToWork = "/LED_on"
		}
		else {

			turnLedOn.value = 'Turn On Led 1';
			val1 = 'ON';
			functionToWork = "/LED_off"
		}

		ArduinoVar = "http://" + context.ipAddress + functionToWork;

		$.get(ArduinoVar, () => {
			console.log("Success");
		});
		{ Connection: close };
	}
