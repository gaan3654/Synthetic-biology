//Runge–Kutta metodas
function f(t,y, func){
    let result;
    result = eval(func);
    return result;
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
        y_copy[i][y_copy[i].length-1] = eval(y_copy[i][y_copy[i].length-1] + k1[i] / 2);
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
        y_copy[i][y_copy[i].length-1] = eval(y_copy[i][y_copy[i].length-1] + k2[i] / 2);
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
        y_copy[i][y_copy[i].length-1] = eval(y_copy[i][y_copy[i].length-1] + k3[i]);
    }
    return h * f(t+h, y_copy, func);
}
//Atnaujinamos funkcijų reikšmės kiekvienam k
function renew_function(y, func_array){
    for(let m = 0; m < y.length; m++){
        func_array = func_array.replace(`y[${m}][${y[m].length-2}]`, `y[${m}][${y[m].length-1}]`);
    }
    return func_array;
}

function renew_init_f(original_f, substance_obj, m){
    if(original_f.match(/A|B|C|D|E|F|G|H|I|J|K|N|M|L|O|P|Q|R|S|T|U|V|W|X|Y|Z/)){
        let current_subs = (original_f.match(/A|B|C|D|E|F|G|H|I|J|K|N|M|L|O|P|Q|R|S|T|U|V|W|X|Y|Z/))[0];
        let new_subs = substance_obj[m][current_subs];
        original_f = original_f.replace(new RegExp(current_subs, 'g'), new_subs);
    }
    return original_f;
}

function remove_duplicates(arr) {
    var obj = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
        obj[arr[i]] = true;
    }
    for (var key in obj) {
        ret_arr.push(key);
    }
    return ret_arr;
}

function solution(substance_obj, a, b, N, func_array, get_reaction){
    var left_subs_count = get_reaction[0].split('');
    left_subs_count = remove_duplicates(left_subs_count);
    var func;
    let func1;
    var t=[];
    //daugiamatis masyvas inicializuojamas su pradinėm medžiagų konsentracijom
    var y = [];
    for(var i = 0; i<substance_obj.length; i++){
        y.push([substance_obj[i].initial_conc]);
    }
    t[0] = a;
    var h= (b-a)/N;
    for (var i = 0; i < N; i++) {
        t[i+1] = t[i]+h;
        var kk1 = [];
        var kk2 = [];
        var kk3 = [];
        var kk4 = [];
        //Esant B konstantai reikia abiejų pusių diff - ant lapelio surašytos funkcijos eiga
        //a+b+b->c kol kas galima palikti ramybėj
        //Sugeneruojamos tinkamos funkcijos kiekvieno k apskaičiavimui.
        for(var j = 0; j < y.length; j++){
            for(let m = 0; m < y.length; m++){
                substance_obj[j].function = renew_init_f(substance_obj[j].function, substance_obj, m);
                func = substance_obj[j].function;
            }
            kk1.push(k1(t[i], y, h, func, substance_obj[j]));
        }
        for(var j = 0; j < y.length; j++){
            substance_obj[j].function = renew_function(y, substance_obj[j].function);
            kk2.push(k2(t[i], y, h, kk1, substance_obj[j].function, func1, substance_obj[j]));
        }
        for(var j = 0; j < y.length; j++){
            substance_obj[j].function = renew_function(y, substance_obj[j].function);
            kk3.push(k3(t[i], y, h, kk2, substance_obj[j].function, func1, substance_obj[j]));
        }
        for(var j = 0; j < y.length; j++){
            substance_obj[j].function = renew_function(y, substance_obj[j].function);
            kk4.push(k4(t[i], y, h, kk3, substance_obj[j].function, func1, substance_obj[j]));
        }

        for(var j = 0; j < y.length; j++){
            y[j][i+1] = eval(y[j][i]+1/6*(kk1[j]+2*kk2[j]+2*kk3[j]+kk4[j]));
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
            yp_temp[j] = ((height-40)-(k*yy[i][j]+l)*(height-40))+20;
            //šitoj vietoj pakeičiau normalizavimą
            // buvo taip: yp_temp[j] = ((height-20)-(k*yy[i][j]+l)*(height-20));
            //čia tuos dvidešimt pridedu kad atlipintų grafiką nuo viršaus
            yy[i][j]=yp_temp[j];
            if(i==0){
                tp[j] = ((kt*tt[j]+lt)*(width-20))+20;
            }
        }
        yp.push(yp_temp);
        console.log(yp);
    }
    return [yp,tp];
}