var push = PushNotification.init({ "android": {"senderID": "866223284827"},
         "ios": {"alert": "true", "badge": "true", "sound": "true"}, "windows": {} } );

    push.on('registration', function(data) {
        // data.registrationId
        alert("registered: "+data.registrationId);
    });

    push.on('notification', function(data) {
        // data.message,
        // data.title,
        // data.count,
        // data.sound,
        // data.image,
        // data.additionalData
    });

    push.on('error', function(e) {
        // e.message
    });
