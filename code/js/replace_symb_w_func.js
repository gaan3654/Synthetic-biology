//Įvedant funkcijas nereikia prirašynėti Math funkcijos
function replace_symbols(funct){
    if(new RegExp(/acos/ig).test(funct)){
        funct = funct.replace(/acos/ig, "Math.acos");
    }
    if(new RegExp(/asin/ig).test(funct)){
        funct = funct.replace(/asin/ig, "Math.asin");
    }//Ar tangentas iš viso mums reikalingas?
    /*if(new RegExp(/atan/ig).test(funct)){
        funct = funct.replace(/atan/ig, "Math.atan");
    }*/
    if(new RegExp(/cos/ig).test(funct)){
        funct = funct.replace(/cos/ig, "Math.cos");
    }
    if(new RegExp(/sin/ig).test(funct)){
        funct = funct.replace(/sin/ig, "Math.sin");
    }/*
    if(new RegExp(/tan/ig).test(funct)){
        funct = funct.replace(/tan/ig, "Math.tan");
    }*/
    if(new RegExp(/sqrt/ig).test(funct)){
        funct = funct.replace(/sqrt/ig, "Math.sqrt");
    }
    if(new RegExp(/cbrt/ig).test(funct)){
        funct = funct.replace(/cbrt/ig, "Math.cbrt");
    }
    if(new RegExp(/\^/g).test(funct)){
        var p = JSON.stringify(funct.match(/(\d*\w*\^\w*\d*)/g));
        p = p.slice(2,-2);
        var pow_arr = p.split("^");
        funct = funct.replace(p, "Math.pow("+pow_arr[0]+","+pow_arr[1]+")");
    }//log(pagrindas,logaritmuojamas reiškinys)
    //Natūrinis logaritmas = log(t)
    //Bet dar reikia patestuoti funkcionalumą
    if(new RegExp(/log/ig).test(funct)){
        funct = funct.replace(/log/ig, "Math.log");
    }
    if(new RegExp(/PI/ig).test(funct)){
        funct = funct.replace(/PI/ig, "Math.PI");
    }
    if(new RegExp(/E/ig).test(funct)){
        funct = funct.replace(/E/ig, "Math.E");
    }
    return funct;
}
