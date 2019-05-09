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

function axle_numbers(N, y_max, int_end) {
    //skaičiai ant ašies OY
    var l=40;
    //čia mano logika intervalų skaičiukų nustatymui. 
    //jei turime [y_norm[1], y_norm[100]], t.y N=100
    //ir turime 20 langelių, tačiau piešiame kas antram, tai gaunas kad reikia tik 10 reikšmių
    //tai čia paimu y_norm[10]; y_norm[20]; y_norm[30], ..., y_norm[100]
    //reikia man pagalvoti kaip bus su skirtingais N...
    for(p=N/10; p<N; p+=N/10){ 
        var oy_number=(y_max);  
        oy_number = oy_number.toFixed(0);  //suapvalinu iki skaičių be kablelio
         //console.log(oy_number); 
        ctx.font = "9px sans-serif";
        ctx.fillText(oy_number, 0 ,0+l);
        l+=40; 
    }       
    

    //skaičiai ant ašies OX
    for(i=40; i<c.width; i+=40){
        var ox_number = int_end/20; //intervalo ilgį dalinu iš 20 nes yra 20 langelių
        ox_number = ox_number.toFixed(2); //suapvalinu iki dviejų skaičių po kablelio
        ctx.font = " 10px sans-serif";
        ctx.fillText(ox_number*i/20, (i+20)-5,c.width-4 ); //i+20 kad pradėtų piešti nuo 60 langelio
        //ox_number*i, kad didėtų reikšmės tolygiai ties kiekvienu langeliu
        
    }
    
}

function normalize_and_draw(yy, tt, int_begin, int_end, height, width){
    var [y_norm,t_norm] = normalization(yy, tt, int_begin, int_end, height, width);
    console.log(y_norm);
    //Piešiamia kreivė
    for(var i=0; i<y_norm.length; i++){
        ctx.beginPath();
        ctx.moveTo(t_norm[0],y_norm[i][0]);    
        for(var j=1; j<=y_norm[i].length; j++){
            ctx.lineTo(t_norm[j],y_norm[i][j]);
        }
        ctx.strokeStyle = "#ff0000";//s_color;
        ctx.stroke();
    }
    console.log(y_norm[0]);
}