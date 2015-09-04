    // Initialize Cordova plugins


    // The watch id references the current `watchAcceleration`
    var watchID = null;

    // Wait for Cordova to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    //
    function onDeviceReady() {
        // Call splashscreen API to hide the splash.
        //navigator.splashscreen.hide();
        document.addEventListener("pause", onPause, false);
        startWatch();
    }

    // Start watching the acceleration
    //
    function startWatch() {

        // Update acceleration every 1 ms
        var options = { frequency: 1 };
        watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    }

    // Stop watching the acceleration
    //
    function stopWatch() {
        if (watchID) {
            navigator.accelerometer.clearWatch(watchID);
            watchID = null;
        }
    }
        
    //Background event handler
    //
    function onPause() {
        startWatch();
    }

    //accelMagnitude: calculates de magnitude of the acceleration vector
    //
    function accelMagnitude(acceleration) {
        var x = acceleration.x;
        var y = acceleration.y;
        var z = acceleration.z;
        var magnitude = Math.sqrt(x*x + y*y + z*z);
        return magnitude;
    }
        
    // onSuccess: Get a snapshot of the current acceleration
    //
    function onSuccess(acceleration) {
        var magnitude = accelMagnitude(acceleration);
        /*var element = document.getElementById('accelerometer');
        element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br />' +
                            'Acceleration Y: ' + acceleration.y + '<br />' +
                            'Acceleration Z: ' + acceleration.z + '<br />' +
                            'Timestamp: '      + acceleration.timestamp + '<br />';*/

        //Alert device if the acceleration surpass some limit (40m/s) and vibrates for 5 ms
        if (magnitude >= 40) {
            navigator.notification.vibrate(500);
            alert("The device has been accelerated");
        }
    }


    // onError: Failed to get the acceleration
    //
    function onError() {
        alert('onError!');
    }
    