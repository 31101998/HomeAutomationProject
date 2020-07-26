    $.ajaxSetup({ timeout: 1000 });
	var curretId ;
	
	$(function () {
		$(".dial").knob({
			'min': 0,
			'max': 9.5,
			'step': .5,
			'rotation': 'clockwise',
			'bgColor': '#d1d9e6', //Bckground
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
					console.log(data);
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
			functionToWork = "/LED_BUILTIN_on"
		}
		else {
			val1 = 'ON';
			functionToWork = "/LED_BUILTIN_off"
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
            
            $('.dial')
				.val(9.5)
				.trigger('change');

		} else {
            
			$('.dial')
				.val(0)
				.trigger('change');
		}
	 }
	 function turnOnLedRoom2() {
		
		var ledstatus = document.getElementById("turnOnLedRoom2").checked;
		if (ledstatus) {
			val1 = 'OFF';
			functionToWork = "/LED_BUILTIN_on"
		}
		else {
			val1 = 'ON';
			functionToWork = "/LED_BUILTIN_off"
		}

		ArduinoVar = "http://" + context.ipAddress2 + functionToWork;

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

	const getvalue = ()=>{         
        var xhr = new XMLHttpRequest();
        var url = "http://"+context.ipAddress2 +"/Get_Data";
        xhr.open("POST", url, true);
        xhr.onreadystatechange = function() {
			if(this.status == 200 && this.readyState == 4)
          		document.getElementById("displayPotentioMeter").innerHTML = this.responseText;
        };
        
        xhr.send();
	}
	
    let interval = setInterval(getvalue, 500*1);
    const clearTime = ()=>{
		clearTimeout(interval);
		interval= null;
	}
	const RestartTime =()=>{
		if(interval){
			clearTime();
		}else{
			interval = setInterval(getvalue, 500*1);
		}
	}
