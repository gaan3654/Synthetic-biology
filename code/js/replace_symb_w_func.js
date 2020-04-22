//Įvedant funkcijas nereikia prirašynėti Math funkcijos
function replace_symbols(funct){
    //Naudojimas: acos(reišikinys)
    //Su kitomis trigonometrinėmis funkcijomis analogiškai
    if(new RegExp(/acos/g).test(funct)){
        funct = funct.replace(/acos/g, "Math.acos");
    }
    if(new RegExp(/asin/g).test(funct)){
        funct = funct.replace(/asin/g, "Math.asin");
    }//Ar tangentas iš viso mums reikalingas?
    /*if(new RegExp(/atan/ig).test(funct)){
        funct = funct.replace(/atan/ig, "Math.atan");
    }*/
    if(new RegExp(/cos/g).test(funct)){
        funct = funct.replace(/cos/g, "Math.cos");
    }
    if(new RegExp(/sin/g).test(funct)){
        funct = funct.replace(/sin/g, "Math.sin");
    }/*
    if(new RegExp(/tan/ig).test(funct)){
        funct = funct.replace(/tan/ig, "Math.tan");
    }*/
    //Kvadratinės šaknies traukimas 
    //sqrt(reiškinys)
    if(new RegExp(/sqrt/g).test(funct)){
        funct = funct.replace(/sqrt/g, "Math.sqrt");
    }
    //Kubinės šaknies traukimas
    //cbrt(reiškinys)
    if(new RegExp(/cbrt/g).test(funct)){
        funct = funct.replace(/cbrt/g, "Math.cbrt");
    }
    //Kėlimas laipsniu
    //pagrindas^laipsnis
    if(new RegExp(/\^/g).test(funct)){
        var p = JSON.stringify(funct.match(/(\d*\w*\^\w*\d*)/g));
        p = p.slice(2,-2);
        var pow_arr = p.split("^");
        funct = funct.replace(p, "Math.pow("+pow_arr[0]+","+pow_arr[1]+")");
    }
    //Natūrinis logaritmas
    //ln(t)
    if(new RegExp(/ln/ig).test(funct)){
        funct = funct.replace(/ln/ig, "Math.log");
        console.log(funct+" Funkcija ln");
    }
    //log(pagrindas,logaritmuojamas reiškinys)
    if(new RegExp(/log/ig).test(funct)){
        var l = JSON.stringify(funct.match(/(log\(.+\,.+\))/g));
        l = l.slice(6,-3);
        var log_arr = l.split(",");
        funct = funct.replace(`log(${l})`, `Math.log(${log_arr[1]}) / Math.log(${log_arr[0]})`);
    }
    //tiesiog parašius pi gaunama tiksli reikšmė
    if(new RegExp(/PI/ig).test(funct)){
        funct = funct.replace(/PI/ig, "Math.PI");
    }
    //Tas pats kaip ir su pi
    if(new RegExp(/E/ig).test(funct)){
        funct = funct.replace(/E/ig, "Math.E");
    }
    return funct;
}