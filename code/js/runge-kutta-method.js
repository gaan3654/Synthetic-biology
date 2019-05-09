//Runge–Kutta metodas
function f(t,y, func){
    return eval(func);
}

function k1(t, y, h, func){
    return h * f(t, y, func);
}

function k2(t, y, h, k1, func){
    //Nuklonuojamas y masyvas į y_copy
    var y_copy = [];
    for(var i = 0; i < y.length; i++){
        var y_temp = [];
        for(var j = 0; j < y[i].length; j++){
            y_temp[j] = y[i][j];
        }
        y_copy.push(y_temp);
    }
    //Prie konsentracijos reikšių pridedama k1/2
    for(var i = 0; i < y_copy.length; i++){
        y_copy[i][y_copy[i].length-1] = eval(y_copy[i][y_copy[i].length-1] + k1 / 2);
    }
    return h * f(t+h/2, y_copy, func);
}   

function k3(t, y, h, k2, func){
    //Nuklonuojamas y masyvas į y_copy
    var y_copy = [];
    for(var i = 0; i < y.length; i++){
        var y_temp = [];
        for(var j = 0; j < y[i].length; j++){
            y_temp[j] = y[i][j];
        }
        y_copy.push(y_temp);
    }
    //Prie konsentracijos reikšių pridedama k2/2
    for(var i = 0; i < y_copy.length; i++){
        y_copy[i][y_copy[i].length-1] = eval(y_copy[i][y_copy[i].length-1] + k2 / 2);
    }
    return h * f(t+h/2, y_copy, func);
}

function k4(t, y, h, k3, func){
    //Nuklonuojamas y masyvas į y_copy
    var y_copy = [];
    for(var i = 0; i < y.length; i++){
        var y_temp = [];
        for(var j = 0; j < y[i].length; j++){
            y_temp[j] = y[i][j];
        }
        y_copy.push(y_temp);
    }
    //Prie konsentracijos reikšių pridedama k1/2
    for(var i = 0; i < y_copy.length; i++){
        y_copy[i][y_copy[i].length-1] = eval(y_copy[i][y_copy[i].length-1] + k3);
    }
    return h * f(t+h, y_copy, func);
}

function solution(y0, a, b, N, func){
    var t=[];
    //daugiamatis masyvas su iniializuotom pradinėm medžiagų konsentracijom
    var y =[];
    for(var i = 0; i<y0.length; i++){
        y.push([y0[i]]);
    }
    //console.log(func);
    
    //console.log(y[0][y[0].length-1]);
    //y[0] = y0;
    t[0] = a;
    var h= (b-a)/N;
    for (var i=0; i < N; i++) {
        for(var j = 0; j < y.length; j++){
            func = func.replace(/A|B|C|D/, `y[${j}][${y[j].length-1}]`);
            //console.log(func);
        }
        t[i+1] = t[i]+h;
        //console.log(t[i]," t[i]---", y[0], " y[0]---", h," h---"    , func, " func");
        var kk1 = k1(t[i], y, h, func);
        //console.log(t[i]," t[i]---", y[0], " y[0]---", h," h---"    , func, " func---", kk1, " kk1");
        var kk2 = k2(t[i], y, h, kk1, func);
        //console.log(t[i]," t[i]---", y[0], " y[0]---", h," h---"    , func, " func---", kk2, " kk2");
        var kk3 = k3(t[i], y, h, kk2, func);
        //console.log(t[i]," t[i]---", y[0], " y[0]---", h," h---"    , func, " func---", kk3, " kk3");
        var kk4 = k4(t[i], y, h, kk3, func);
        //console.log(t[i]," t[i]---", y[0], " y[0]---", h," h---"    , func, " func---", kk4, " kk4");

        for(var j = 0; j < y.length; j++){
            y[j][i+1] = eval(y[j][i]+1/6*(kk1+2*kk2+2*kk3+kk4));
            console.log(y[j][i+1]);
        }
    } 
    return [y,t];
}
var y_min=0;
var y_max;
//Gautų rezultatų normalizavimas
function normalization(yy,tt, a, b, N, height, width){
    var yp = [];
    var tp = [];
    y_max=yy[0];
    //console.log(y_max);
    for(i=0; i<N; i++){
        //Jei y_min ir y_max sutampa tai if'ą
        if(y_max<yy[i]){
            y_max=yy[i]
        }
    }
    //yy normalizacija
    if(y_min != y_max){
        var k = 1/(y_max-y_min);
        var l = -y_min/(y_max-y_min);
    } else {

    }
    //tt normalizacija
    var kt = 1/(b-a);
    var lt = -a/(b-a);
    for(i=0; i<N; i++){
        yp[i] = (height-(k*yy[i]+l)*height)-20;
        tp[i] = ((kt*tt[i]+lt)*width)+20;
    }
    return [yp,tp,y_max];
}