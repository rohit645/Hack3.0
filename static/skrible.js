let sketch = function(p){

    p.setup = function() {
        socket = io.connect('http://' + document.domain + ':' + location.port);
        p.createCanvas(640, 450);
        p.background(230);
        p.strokeWeight(2);
        $("#chat").bind("keypress", {}, chat);
        socket.on('click', function (JSON) {
            // console.log('working')
            p.stroke(255, 0, 0);
            p.fill(255, 0, 0);
            p.circle(JSON.posX, JSON.posY, 2);
        });
        socket.on('chatting', function (msg) {
            $("#chatBox").append('<li>'+ msg + '</li>');
            console.log(msg);
        });
    }

    p.draw = function() {
        if (p.mouseIsPressed) {
            p.stroke(255, 0, 0);
            p.fill(255, 0, 0);
            p.circle(p.mouseX, p.mouseY, 2);
            socket.emit('draw', {'posX': p.mouseX, 'posY': p.mouseY});
            // point(mouseX, mouseY);
        }
    }

}

function chat(e) {
    console.log(e);
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) {
        var v = $("#chat").val();
        console.log('chatting', v);
        socket.emit('msg', v);
        $("#chat").val('');
    }
}

$(function(){
    new p5(sketch, 'container');
});