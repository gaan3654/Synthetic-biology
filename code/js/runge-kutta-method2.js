//Runge–Kutta metodas
function dA(t,A, B, C){
    return A*B*(-0.1)+C*0.2;
}
function dB(t,A, B, C){
    return A*B*(-0.1)+C*0.2;
}
function dC(t,A, B, C){
    return A*B*(0.1)+C*(-0.2);
}

function kA1(t, A, B, C){
    return h * dA(t,A, B, C);
}
function kB1(t, A, B, C){
    return h * dB(t,A, B, C);
}
function kC1(t, A, B, C){
    return h * dA(t,A, B, C);
}

function kA2(t, A, B, C){
    return h * dA(t+h/2, A+kA1/2, B+kB1/2, C+kC1/2 )
};
function kB2(t, A, B, C){
    return h * dA(t+h/2, A+kA1/2, B+kB1/2, C+kC1/2 )
};
function kC2(t, A, B, C){
    return h * dA(t+h/2, A+kA1/2, B+kB1/2, C+kC1/2 )
};

function kA3(t, A, B, C){
    return h * dA(t+h/2, A+kA2/2, B+kB2/2, C+kC2/2 )
};
function kB3(t, A, B, C){
    return h * dA(t+h/2, A+kA2/2, B+kB2/2, C+kC2/2 )
};
function kC3(t, A, B, C){
    return h * dA(t+h/2, A+kA2/2, B+kB2/2, C+kC2/2 )
};

function kA4(t, A, B, C){
    return h * dA(t+h, A+kA3, B+kB3, C+kC3 )
};
function kA4(t, A, B, C){
    return h * dA(t+h, A+kA3, B+kB3, C+kC3 )
};
function kA4(t, A, B, C){
    return h * dA(t+h, A+kA3, B+kB3, C+kC3 )
};


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
            func = func.replace(/A|B|C|D/, `y[${j}][${y[j].length-1}]`);
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