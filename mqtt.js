//let client;
const sendForm = document.getElementById("sendForm");
const msgArea = document.getElementById("msgArea");
const switchBtn = document.getElementById("switch");
const retained = document.getElementById("retained");
const qos0 = document.getElementById("qos0");
const qos1 = document.getElementById("qos1");
const qos2 = document.getElementById("qos2");
let on;

switchBtn.addEventListener("click", () => {
    /*if(message.payloadString == 1 && on == true) {
        switchBtn.style.color = "white";
    } else {
        switchBtn.style.color = "000"
    }*/
    let msg = message.payloadString;
    console.log(msg);
})

function mqttConnect() {
    
    const host = document.getElementById("host").value;
    const port = document.getElementById("port").value;
    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;
		const clientId = document.getElementById("clientID").value;
    
    //console.log(host, port, user, password);
//}

    // Create a client instance
    //let client = new Paho.MQTT.Client(location.hostname, Number(location.port), "clientId");
    client = new Paho.MQTT.Client(host, Number(port), clientId);

    // set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // connect the client
    client.connect({
        onSuccess: onConnect,
        useSSL: true,
        userName: user,
        password: password
    });
}

// called when the client connects
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado com servidor.");
    client.subscribe("Home");
    message = new Paho.MQTT.Message("Hello");
    message.destinationName = "Home";
    client.send(message);
}

// desconectar mqtt
function mqttDisconnect() {
    client.disconnect();
    console.log("Desconectado do servidor.");
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost: " + responseObject.errorMessage);
    }
}

// called when a message arrives
function onMessageArrived(message) {
    console.log("onMessageArrived: " + message.payloadString);
    msgArea.innerHTML += `${message.destinationName} / ${message.payloadString} <br>`;

    if(message.payloadString == 1 && message.destinationName == "test") {
        switchBtn.style.backgroundColor = "white";
        //on = true;
        console.log("On");
    } else if(message.payloadString == 0 && message.destinationName == "test") {
        switchBtn.style.backgroundColor = "rgb(36, 36, 36)";
        //on = false;
        console.log("Off");
    }
}

// enviar mensagem
function sendMessage() {
    const topic = document.getElementById("topic").value;
    const msg = document.getElementById("msg").value;
    client.subscribe(topic);
    message = new Paho.MQTT.Message(msg);
    message.destinationName = topic;
    client.send(message);
    sendForm.reset();
    //console.log(topic, message.payloadString);
}