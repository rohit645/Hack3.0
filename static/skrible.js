function setup() {
    socket = io.connect('http://' + document.domain + ':' + location.port);
    createCanvas(640, 480);
    background(230);
    strokeWeight(2);
    socket.on('click', function (JSON) {
        console.log('working')
        circle(JSON.posX, JSON.posY, 2);
    });
}

function draw() {
    if (mouseIsPressed) {
        stroke(255, 0, 0);
        fill(255, 0, 0);
        circle(mouseX, mouseY, 2);
        socket.emit('draw', {'posX': mouseX, 'posY': mouseY});
        // point(mouseX, mouseY);
    }
}