// Cliente UDP
const udp = require('dgram');

// variables del servidor
const direccion = '127.0.0.1';
const puerto = 8000;

// Leemos por consola, y despues iniciamos el cliente
process.stdout.write('Cual es tu nombre : ');
process.stdin.on('data', (data) => {
    const respuesta = data.toString().trim();
    iniciarCliente(respuesta);
});

// Funcion para iniciar el Cliente
function iniciarCliente(datoEnviar) {
    // Creando un socket de cliente
    const client = udp.createSocket('udp4');

    // Emite cuando el socket está listo para el envio de datagramas
    client.on('listening', () => {
        const address = client.address();
        const port = address.port;
        const ipaddr = address.address;
        console.log(" - Cliente UDP INICIADO - ");
        console.log("   El cliente esta escuchando : " + ipaddr + ":" + port);
    });

    // Buffer msg
    const data = Buffer.from(datoEnviar);

    // Se emite cuando recibe el mensaje del servidor
    client.on('message', (msg, info) => {
        console.log('Datos recibidos del servidor : ' + msg.toString());
        console.log('Recibio %d bytes de %s:%d\n', msg.length, info.address, info.port);
    });

    // Enviando mensaje
    client.send(data, puerto, direccion, error => {
        if (error) {
            console.log("error", error);
            client.close();
        } else {
            console.log('Dato enviado al cliente!!!');
        }
    });

    setTimeout(() => {
        console.log('Conexión cerrada');
        client.close();
        process.exit();
    }, 100);
}