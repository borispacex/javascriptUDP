// Servidor UDP
const udp = require('dgram');

// variables del servidor
const puerto = 8000;

// iniciamos servidor
iniciarServidor();

// Funcion para inciar el Servidor
function iniciarServidor() {
    // creamdo el servidor UDP
    const server = udp.createSocket('udp4');

    // Emite cuando el socket está listo y escuchando mensajes de datagramas
    server.on('listening', () => {
        const address = server.address();
        const port = address.port;
        const ipaddr = address.address;
        console.log(" - SERVIDOR UDP INICIADO - ");
        console.log("   El servidor esta escuchando : " + ipaddr + ":" + port);
        console.log(" - Esperando peticion del Cliente - ");
    });

    // Emite en el nuevo datagrama msg
    server.on('message', (msg, info) => {
        console.log(`Mensaje recibido : ${msg.toString()} de ${info.address}:${info.port}`);
        const mensajeRecibido = msg.toString();
        const response = "Bienvenido al servidor -> " + mensajeRecibido;
        const data = Buffer.from(response);
        // Enviando mensaje
        server.send(data, info.port, info.address, (error, bytes) => {
            if(error){
                console.log("error", error);
                client.close();
            } else {
                console.log("Dato enviado al servidor!!!");
            }
        });
    });

    // Se emite cuando ocurre cualquier error
    server.on('error', (error) => {
        console.log("error", error);
        server.close();
    });

    // Se emite después de que se cierra el socket usando server.close ()
    server.on('close', () => {
        console.log("Socket esta cerrado !");
    });

    server.bind({ address: 'localhost', port: puerto });
}