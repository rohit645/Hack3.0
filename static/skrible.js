let gameStarted = false;

let sketch = function(p){

    p.setup = function() {
        socket = io.connect('http://' + document.domain + ':' + location.port);
        p.createCanvas(640, 450);
        p.background(230);
        p.strokeWeight(2);
        socket.on('click', p.drawData);
        socket.on('onlineusers', p.refreshUsers);
    }

    p.drawData = function (JSON) {
        // console.log('working')
        p.stroke(255, 0, 0);
        p.fill(255, 0, 0);
        p.circle(JSON.posX, JSON.posY, 2);
    }

    p.draw = function() {
        if (p.mouseIsPressed && gameStarted) {
            p.stroke(255, 0, 0);
            p.fill(255, 0, 0);
            p.circle(p.mouseX, p.mouseY, 2);
            socket.emit('draw', {'posX': p.mouseX, 'posY': p.mouseY});
            // point(mouseX, mouseY);
        }
    }

    p.refreshUsers = function (users){
        var userbox = "<div class=\"box\"><h3>username</h3></div >";
        $("#chatbox").empty();
        users.forEach(element => {
            $("#chatbox").append(userbox.replace("username", element));
        });
    }

}

function chat(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) {
        var v = $("#chat").val();
        socket.emit('msg', v);
        $("#chat").val('');
    }
}

function enterUser(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) {
        var v = $("#username").val();
        socket.emit('newuser', v);
        $("#modal-background").hide();
        $("#modal-content").hide();
        gameStarted = true;
    }
}

$(function(){
    $("#modal-background").show();
    $("#modal-content").show();
    $("#username").bind("keypress", {}, enterUser);
    $("#chat").bind("keypress", {}, chat);
    new p5(sketch, 'container');
});