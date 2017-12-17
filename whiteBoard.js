(function(){
    // Namespace for elements
    var canvas = document.getElementById("board");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    var ctx = canvas.getContext("2d");
    
    var init = function(){
        ctx.beginPath();
        ctx.rect(0,0,window.innerWidth, window.innerHeight);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
    };
    
    init();
    
    var color = "#000000";
    var brushSize = 4;
    var pencil = true;
    
    var points = [[0, 0], [0, 0]];
    var pointA = 0;
    var pointB = 0;
    var fixedX = 0;
    var fixedY = 0;
    
    // Draw a line
    var drawLine = function(startX, startY, endX, endY){
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.lineWidth = brushSize;
        ctx.strokeStyle = color;
        ctx.stroke();
    };
    var drawCircle = function(x, y){
        ctx.beginPath();
        ctx.arc(x, y, brushSize/2, 0, 2*Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
    };

    var write = function(e){
        pointB = pointA+1 > 1 ? 0 : pointA+1;
        points[pointB][0] = e.shiftKey ? fixedX : (e.clientX + window.scrollX);
        points[pointB][1] = e.altKey ? fixedY : (e.clientY + window.scrollY);
        drawLine(points[pointA][0], points[pointA][1], points[pointB][0], points[pointB][1]);
        drawCircle(points[pointB][0], points[pointB][1]);
        pointA = pointB;
    };
    
    var finishWritting = function(){
        canvas.removeEventListener('mousemove', write);
        window.removeEventListener('mouseup', finishWritting);
    };
    canvas.onmousedown = function(e){
        if(e.button === 0){
            points[pointA][0] = e.clientX + window.scrollX;
            points[pointA][1] = e.clientY + window.scrollY;
            
            fixedX = e.clientX + window.scrollX;
            fixedY = e.clientY + window.scrollY;
            
            
            drawCircle(points[pointA][0], points[pointA][1]);

            canvas.addEventListener('mousemove', write, false);
            window.addEventListener('mouseup',finishWritting, false);
        }
    };
    
    window.onkeypress = function(e){
//        console.log(e.keyCode);
        switch(e.keyCode){
            // P for pencil
            case 112: //Small P
            case 80: //capital P
                pencil = true;
                break;
            
            // E for eraser
            case 101:  //Small E
            case 69: //capital E
                color = "#FFFFFF";
                break;
                
            // R for Red
            case 114: //Small R
            case 82: //capital R
                color = "#FF0000";
                break;
            
            // B for Black
            case 98: //Small B
            case 66: //capital B
                color = "#000000";
                break;
            
            // L for bLue
            case 108: //Small L
            case 76://capital L
                color = "#0000FF";
                break;
            
            // [ for smaller brush size
            case 91: 
                brushSize = brushSize-1 >= 1 ? brushSize-1 : 1;
                break;
                
            // ] for larger brush size
            case 93: 
                brushSize = brushSize + 1;
                break;
        }
    };
}());