//Runge–Kutta metodas
function dA(t,A, B, C){
    return eval(A*B*(-3)+C*0.9);
}
function dB(t,A, B, C){
    return eval(A*B*(-3)+C*0.9);
}
function dC(t,A, B, C){
    return eval(A*B*(3)+C*(-0.9));
}

function kA1(t, A, B, C, h, dA){
    return h * dA(t,A, B, C);
}
function kB1(t, A, B, C, h, dB){
    return h * dB(t,A, B, C);
}
function kC1(t, A, B, C, h, dC){
    return h * dC(t,A, B, C);
}

function kA2(t, A, B, C, h, kA1, kB1, kC1, dA){    
    return h * dA(t+h/2, eval(A+kA1/2), eval(B+kB1/2), eval(C+kC1/2));
};
function kB2(t, A, B, C, h, kA1, kB1, kC1,  dB){
    return h * dB(t+h/2, eval(A+kA1/2), eval(B+kB1/2), eval(C+kC1/2))
};
function kC2(t, A, B, C, h, kA1, kB1, kC1,  dC){
    return h * dC(t+h/2,eval(A+kA1/2), eval(B+kB1/2), eval(C+kC1/2))
};

function kA3(t, A, B, C, h, kA2, kB2, kC2, dA){
    return h * dA(t+h/2, eval(A+kA2/2), eval(B+kB2/2), eval(C+kC2/2) )
};
function kB3(t, A, B, C, h, kA2, kB2, kC2, dB){
    return h * dB(t+h/2, eval(A+kA2/2), eval(B+kB2/2), eval(C+kC2/2) )
};
function kC3(t, A, B, C, h, kA2, kB2, kC2, dC){
    return h * dC(t+h/2, eval(A+kA2/2), eval(B+kB2/2), eval(C+kC2/2) )
};



function kA4(t, A, B, C, h, kA3, kB3, kC3, dA){
    return h * dA(t+h, eval(A+kA3), eval(B+kB3), eval(C+kC3) )
};
function kB4(t, A, B, C, h, kA3, kB3, kC3, dB){
    return h * dB(t+h, eval(A+kA3), eval(B+kB3), eval(C+kC3) )
};
function kC4(t, A, B, C, h, kA3, kB3, kC3, dC){
    return h * dC(t+h, eval(A+kA3), eval(B+kB3), eval(C+kC3) )
};




function solution(y0, a, b, N){
    var t=[];
    var y=[];
    for(var i = 0; i<y0.length; i++){
        y.push([y0[i]]);
    }
    console.log(y0);
    //daugiamatis masyvas inicializuojamas su pradinėm medžiagų konsentracijom
    // var A =[];
    // var B =[];
    // var C =[];
 
    // A.push([y0[0]]);
    // B.push([y0[1]]);
    // C.push([y0[2]]);

    t[0] = a;
    var h= (b-a)/N;
    for (var i=0; i < N; i++) {
   
        t[i+1] = t[i]+h;
        var kkA1 = kA1(t[i], y[0][i], y[1][i], y[2][i], h, dA);
        var kkB1 = kB1(t[i], y[0][i], y[1][i], y[2][i], h, dB);
        var kkC1 = kC1(t[i], y[0][i], y[1][i], y[2][i], h, dC);

        var kkA2 = kA2(t[i], y[0][i], y[1][i], y[2][i], h, kkA1, kkB1, kkC1, dA);
        var kkB2 = kB2(t[i], y[0][i], y[1][i], y[2][i], h, kkA1, kkB1, kkC1, dB);
        var kkC2 = kC2(t[i], y[0][i], y[1][i], y[2][i], h, kkA1, kkB1, kkC1, dC);

        var kkA3 = kA3(t[i], y[0][i], y[1][i], y[2][i], h, kkA2, kkB2, kkC2, dA);
        var kkB3 = kB3(t[i], y[0][i], y[1][i], y[2][i], h, kkA2, kkB2, kkC2, dB);
        var kkC3 = kC3(t[i], y[0][i], y[1][i], y[2][i], h, kkA2, kkB2, kkC2, dC);

        var kkA4 = kA4(t[i], y[0][i], y[1][i], y[2][i], h, kkA3, kkB3, kkC3, dA);
        var kkB4 = kB4(t[i], y[0][i], y[1][i], y[2][i], h, kkA3, kkB3, kkC3, dB);
        var kkC4 = kC4(t[i], y[0][i], y[1][i], y[2][i], h, kkA3, kkB3, kkC3, dC);

        y[0][i+1] = eval(y[0][i]+1/6*(kkA1+2*kkA2+2*kkA3+kkA4));
        y[1][i+1] = eval(y[1][i]+1/6*(kkB1+2*kkB2+2*kkB3+kkB4));
        y[2][i+1] = eval(y[2][i]+1/6*(kkC1+2*kkC2+2*kkC3+kkC4));

        
    } 
    console.log(y);
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