
mainApp.factory('msgService', function(dbSrvc, sharedService) {

        var DEFAULT_TOPIC = "public";
        var messageService = {};

        var reconnectTimeout = 2000;
        var host = '54.250.120.152';   // readmine hostname or IP address
        // var host = '54.84.241.229';   //zukamazon hostname or IP address
        // var host = 'test.c5729kvnntur.us-east-1.rds.amazonaws.com';
        var port = 61614;
        var topic = DEFAULT_TOPIC;        // topic to subscribe to
        var nickname = 'guest'
        var useTLS = false;
        var username = null;
        var password = null;
        var cleansession = true;


  
        var mqtt = new Paho.MQTT.Client(
            host,
            port,
            "web_" + parseInt(Math.random() * 100,
                10));

        if(!mqtt.isConnected()){
            console.log("MQTT connecting");
            var options = {
                timeout: 3,
                useSSL: useTLS,
                cleanSession: cleansession,
                onSuccess: function () {
                    console.log('Connected to MQTT');
                },
                onFailure: function (message) {
                    console.log("Connection failed: " + message.errorMessage + "Retrying");
                    setTimeout(mqtt.connect(options), reconnectTimeout);
                }
            };
            mqtt.onMessageArrived = onMessageArrived;
            options.userName = '';
            options.password = '';
            mqtt.connect(options);
        }

    function onMessageArrived(message) {
        console.log("gggg");
    };

        messageService.sendDjMessage = function(cmd, media, duration) {//(cmd, media) {
            var duration = typeof duration !== 'undefined' ? duration : 0;
            var msgObj = {msgtype: 'ctrl', cmd: cmd,  duration: duration, media:media};
            var str = JSON.stringify(msgObj);
            mqtt.send(topic, str, 0, false);
        };

        messageService.sendRequestMessage = function() {
            var msgObj = {msgtype: 'rqst'};
            var str = JSON.stringify(msgObj);
            mqtt.send(topic, str, 0, false);
        };

        messageService.sendChatMessage = function(tournamentId, msg,handler) {
            // var userObj = cshellSharedService.getUser();
            // var msgObj = {msgtype:'text', username:userObj.nickname, message:msg};
            // var str = JSON.stringify(msgObj);
                  // console.log("gggg");
            mqtt.onMessageArrived=handler;

            var userObj = sharedService.getUser();
            
            console.log(userObj.name);
            var msgObj = {msgtype:'text', username:userObj.name, message:msg};
            var str = JSON.stringify(msgObj);

            mqtt.subscribe("/"+tournamentId);
            message = new Paho.MQTT.Message(str);
            message.destinationName = "/"+tournamentId;
            mqtt.send(message);
            // console.log("handler:"+mqtt.onMessageArrived);
        };
         messageService.sendPointMessage = function(tournamentId, point,handler) {
            // var userObj = cshellSharedService.getUser();
            // var msgObj = {msgtype:'text', username:userObj.nickname, message:msg};
            // var str = JSON.stringify(msgObj);
                  // console.log("gggg");
            mqtt.onMessageArrived=handler;

            var userObj = sharedService.getUser();
            
            var msgObj = {msgtype:'point', username:userObj.name, message:point};
            var str = JSON.stringify(msgObj);

            mqtt.subscribe("/"+tournamentId);
            message = new Paho.MQTT.Message(str);
            message.destinationName = "/"+tournamentId;
            mqtt.send(message);
            // console.log("handler:"+mqtt.onMessageArrived);
        };
         messageService.joinRoom1 = function(roomId) {
            
            var tpc = "channel_"+roomId;
            // mqtt.subscribe("/World");
            mqtt.subscribe(tpc, {qos: 0});
            // message = new Paho.MQTT.Message(msg);
            // message.destinationName = tpc;
            // mqtt.send(message);
            // console.log("handler:"+mqtt.onMessageArrived);
        };

        messageService.sendRecordMessage = function(id) {
            console.log("sendRecordMessage" + id);
            var msgObj = {msgtype: 'record', id: id};
            var str = JSON.stringify(msgObj);
            mqtt.send(topic, str, 0, false);
        };


        messageService.joinRoom = function (channelId, handler) {

            //console.log("connected!!!= " + mqtt.isConnected());

            mqtt.onMessageArrived = handler;

            var tpc = "channel_"+channelId;
            if (false) 
            if(tpc != topic) {
                //var userObj = cshellSharedService.getUser();
                //messageService.sendChatMessage("leaving(changing) channel:"+topic);
                mqtt.unsubscribe(topic, null);
                dbSrvc.post("data/log", {channel_id: topic.substring(8), control_action: "leave"}).then(function() {
                });
                topic = tpc;
                mqtt.subscribe(tpc, {qos: 0});

                //messageService.sendChatMessage("joining channel:"+tpc);
                messageService.sendRequestMessage();

                dbSrvc.post("data/log", {channel_id: channelId, control_action: "join"}).then(function() {
                });
            }
        };

        messageService.leaveRoom = function (channelId) {

            //var userObj = cshellSharedService.getUser();
            var tpc = "channel_"+channelId;
            if(tpc == topic){
                //messageService.sendChatMessage(userObj.nickname + "leaving channel:"+topic);
                mqtt.unsubscribe(tpc, null);
                topic = DEFAULT_TOPIC;
                dbSrvc.post("data/log", {channel_id: channelId, control_action: "leave"}).then(function() {
                });
            }
        };

      // function onMessageArrived(message) {
      //   console.log("gggg");
      //       $('#messagelist').prepend('<li>'+message.destinationName+ '->' +message.payloadString+'</li>');
      //       //var form = document.getElementById("example");
      //       //form.receiveMsg.value = message.payloadString;
      //   }

 return messageService;
});

