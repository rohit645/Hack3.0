function setup() {
    socket = io('http://localhost:5000');
    createCanvas(640, 480);
}

function draw() {
    socket.emit('msg', 'helloWorld');
    background(0);
}