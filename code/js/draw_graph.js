function draw(ctx){

    //Nupiešiami sąsiuvinio langeliai
    for(i=20; i<c.height; i+=20){
        ctx.moveTo(i,0);
        ctx.lineTo(i,c.width);     
        ctx.moveTo(0,i);
        ctx.lineTo(c.width,i);     
    }
    ctx.strokeStyle = "#CCE5FF";
    ctx.lineWidth = 0.5 ;
    ctx.stroke();

        
    //Nupiešiamos OX ir OY 
    //OX    
    ctx.beginPath();
    ctx.moveTo(0, c.height-20);
    ctx.lineTo(c.width, c.height-20);
    ctx.moveTo(c.width-5, c.height-25);
    ctx.lineTo(c.width, c.height-20);
    ctx.lineTo(c.width-5, c.height-15);
    //OY
    ctx.moveTo(20, 0);
    ctx.lineTo(20, c.height);
    ctx.moveTo(15, 5);
    ctx.lineTo(20, 0);
    ctx.lineTo(25, 5);
    ctx.strokeStyle = "#000000";
    ctx.stroke();

    //tekstas prie ašių
    ctx.font = "bold 12px sans-serif";
    ctx.fillText("t", c.width-10, c.height-5 )
    ctx.fillText("y", 7, 13 )

    //žymės ant ašių
    //ant OX
    for(i=40; i<c.width; i+=20){
        ctx.beginPath();
        ctx.moveTo(i,c.width-24);
        ctx.lineTo(i,c.width-16);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";
        ctx.stroke();
    }
    //ant OY
    for(i=20; i<c.height-20; i+=20){
        ctx.beginPath();
        ctx.moveTo(16,i);
        ctx.lineTo(24,i);  
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";
        ctx.stroke();  
    }

}

//Atsitiktinės spalvos generavimas
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;



    
}