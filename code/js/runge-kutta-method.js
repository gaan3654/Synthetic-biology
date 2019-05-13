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
    //console.log(y);
    //console.log(y_copy);
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
    //Prie konsentracijos reikšių pridedama k3
    for(var i = 0; i < y_copy.length; i++){
        y_copy[i][y_copy[i].length-1] = eval(y_copy[i][y_copy[i].length-1] + k3);
    }
    return h * f(t+h, y_copy, func);
}

function solution(y0, a, b, N, func){
    var t=[];
    //daugiamatis masyvas inicializuojamas su pradinėm medžiagų konsentracijom
    var y =[];
    for(var i = 0; i<y0.length; i++){
        y.push([y0[i]]);
    }
    t[0] = a;
    var h= (b-a)/N;
    for (var i=0; i < N; i++) {
        for(var j = 0; j < y.length; j++){
            func = func.replace(/A|B|C|D|F|G|H|I|J|K|N|M|L|O|P|Q|R|S|T|U|V|W|X|Y|Z/, `y[${j}][${y[j].length-1}]`);
            func = func.replace(`y[${j}][${y[j].length-2}]`, `y[${j}][${y[j].length-1}]`);
        }
        t[i+1] = t[i]+h;
        
        var kk1 = k1(t[i], y, h, func);
        var kk2 = k2(t[i], y, h, kk1, func);
        var kk3 = k3(t[i], y, h, kk2, func);
        var kk4 = k4(t[i], y, h, kk3, func);

        for(var j = 0; j < y.length; j++){
            y[j][i+1] = eval(y[j][i]+1/6*(kk1+2*kk2+2*kk3+kk4));
        }

    } 
    // console.log(y[0]);
    // console.log(y[1]);
    return [y,t];
}
var y_min=0;
var y_max;
//Gautų rezultatų normalizavimas
function normalization(yy,tt, a, b, height, width){
    var yp = [];
    var tp = [];
    y_max=yy[0][0];
    for(var i=0; i<yy.length; i++){
        for(var j=0; j<yy[i].length; j++){
            //Jei y_min ir y_max sutampa tai if'ą
            if(y_max<yy[i][j]){
                y_max=yy[i][j];
            }
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
    var lt = (-a)/(b-a);
    
    for(var i=0; i<yy.length; i++){
        var yp_temp = [];
        for(var j=0; j<yy[i].length; j++){
            // yp_temp[j] = ((height-20)-(k*yy[i][j]+l)*(height-20));
            yp_temp[j] = ((height-20)-((yy[i][j]-y_min)/y_max-y_min)*(height-20));
            yy[i][j]=yp_temp[j];
            //console.log(yy[i][j]);
            if(i==0){
                tp[j] = ((kt*tt[j]+lt)*(width-20))+20;
                // tp[j] = ((tt[i]-a)/(b-a)*(width-20))+20;
                // console.log(tp[j]);
            }
        }
        yp.push(yp_temp);
        
    }
    return [yp,tp];
}