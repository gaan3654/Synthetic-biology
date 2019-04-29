//Runge–Kutta metodas
function f(t,y, func){
    return eval(func);
}

function k1(t, y, h, func){
    return h * f(t,y, func);
}

function k2(t, y, h, k1, func){
    return h * f(t+h/2,y+k1/2, func);
}

function k3(t, y, h, k2, func){
    return h * f(t+h/2,y+k2/2, func);
}

function k4(t, y, h, k3, func){
    return h * f(t+h,y+k3, func);
}

function solution(y0, a, b, N, func){
    var t=[];
    var y=[];
    y[0] = y0;
    t[0] = a;
    var h= (b-a)/N;
    for (var i=0; i < N; i++) {
        t[i+1] = t[i]+h;
        var kk1 = k1(t[i], y[i], h, func);
        var kk2 = k2(t[i], y[i], h, kk1, func);
        var kk3 = k3(t[i], y[i], h, kk2, func);
        var kk4 = k4(t[i], y[i], h, kk3, func);
        y[i+1] = y[i]+1/6*(kk1+2*kk2+2*kk3+kk4);
    } 
return [y,t];
}
//Gautų rezultatų normalizavimas
function normalization(yy,tt, a, b, height, width){
    var yp = [];
    var tp = [];
    var y_max=yy[0];
    var y_min=0;
    for(i=0; i<101; i++){
        //Jei y_min ir y_max sutampa tai if'ą
        if(y_max<yy[i]){
            y_max=yy[i]
        }
        //yy normalizacija
        var k = 1/(y_max-y_min);
        var l = -y_min/(y_max-y_min);
        //tt normalizacija
        var kt = 1/(b-a);
        var lt = -a/(b-a);
    }
    for(i=0; i<101; i++){
        yp[i] = (height-(k*yy[i]+l)*height)+20;
        tp[i] = ((kt*tt[i]+lt)*width)+20;
    }
    return [yp,tp];
}