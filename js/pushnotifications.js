document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady(){
  var push = PushNotification.init({ "android": {"senderID": "866223284827"},
         "ios": {"alert": "true", "badge": "true", "sound": "true"}, "windows": {} } );

    push.on('registration', function(data) {
        // data.registrationId
        $("#test-output").html("registered: "+data.registrationId);
    });

    push.on('notification', function(data) {
        // data.message,
        // data.title,
        // data.count,
        // data.sound,
        // data.image,
        // data.additionalData
        $("#test-output").html(data.message);
    });

    push.on('error', function(e) {
        // e.message
    });
}
