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
function renew_function(j, y, left_subs_count, func_array, func){
    for(let m = 0; m < y.length; m++){
        if(j == 0){
            func_array[0] = func_array[0].replace(`y[${m}][${y[m].length-2}]`, `y[${m}][${y[m].length-1}]`);
            func = func_array[0];
        }
        if(j > left_subs_count.length-1){
            func_array[1] = func_array[1].replace(`y[${m}][${y[m].length-2}]`, `y[${m}][${y[m].length-1}]`);
            func = func_array[1];
        }
    }
    return func;
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
        //Esant B knstantai reikia abiejų pusių diff - ant lapelio surašytos funkcijos eiga
        //a+b+b->ckol kas galima palikti ramybėj
        //Sugeneruojamos tinkamos funkcijos kiekvieno k apskaičiavimui.
        for(var j = 0; j < y.length; j++){
            for(let m = 0; m < y.length; m++){
                if(j == 0){
                    if(func_array[0].match(/A|B|C|D|F|G|H|I|J|K|N|L|O|P|Q|R|S|T|U|V|W|X|Y|Z/)){
                        let current_subs = (func_array[0].match(/A|B|C|D|F|G|H|I|J|K|N|L|O|P|Q|R|S|T|U|V|W|X|Y|Z/))[0];
                        let new_subs = substance_obj[m][current_subs];
                        func_array[0] = func_array[0].replace(new RegExp(current_subs, 'g'), new_subs);
                        func = func_array[0];
                    }
                }
                if(j > left_subs_count.length-1){
                    if(func_array[1].match(/A|B|C|D|F|G|H|I|J|K|N|L|O|P|Q|R|S|T|U|V|W|X|Y|Z/)){
                        let current_subs = (func_array[1].match(/A|B|C|D|F|G|H|I|J|K|N|L|O|P|Q|R|S|T|U|V|W|X|Y|Z/))[0];
                        let new_subs = substance_obj[m][current_subs];
                        func_array[1] = func_array[1].replace(new RegExp(current_subs, 'g'), new_subs);
                        func = func_array[1];
                    }
                }
            }
            kk1.push(k1(t[i], y, h, func));
        }
        for(var j = 0; j < y.length; j++){
            func = renew_function(j, y, left_subs_count, func_array, func);
            kk2.push(k2(t[i], y, h, kk1, func));
        }
        for(var j = 0; j < y.length; j++){
            func = renew_function(j, y, left_subs_count, func_array, func);
            kk3.push(k3(t[i], y, h, kk2, func));
        }
        for(var j = 0; j < y.length; j++){
            func = renew_function(j, y, left_subs_count, func_array, func);
            kk4.push(k4(t[i], y, h, kk3, func));
        }

        for(var j = 0; j < y.length; j++){
            y[j][i+1] = eval(y[j][i]+1/6*(kk1[j]+2*kk2[j]+2*kk3[j]+kk4[j]));
        }
    }
    // console.log(y);
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
            yp_temp[j] = ((height-20)-(k*yy[i][j]+l)*(height-20));
            yy[i][j]=yp_temp[j];
            if(i==0){
                tp[j] = ((kt*tt[j]+lt)*(width-20))+20;
            }
        }
        yp.push(yp_temp);
        
    }
    return [yp,tp];
}