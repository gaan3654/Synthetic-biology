$("#submit").click(function() {
  var int_begin = parseFloat(document.getElementById("int_begins").value);
  var int_end = parseFloat(document.getElementById("int_ends").value);
  var N = parseInt(document.getElementById("n_inp").value);

  //Į objektą talpinami duomenis apie medžiagas:
  // Vietą masyvę; Pradinę koncentraciją; Spalvą;
  // Pasikartojimų kiekį; Buvimą kairėje ar dešinėje reakcijos pusėse
  var substance_obj = [];
  let possition = 0;

  for (let i = 0; i < reactions_id.length; i++) {
    var get_reaction = document.getElementById(`reaction_input_${i}`).value;
    get_reaction = get_reaction.split(/<?->/);
    get_reaction[0] = get_reaction[0].replace(/\+/g, "");
    get_reaction[1] = get_reaction[1].replace(/\+/g, "");
    let reaction_left = get_reaction[0].split("");
    let reaction_right = get_reaction[1].split("");

    var func_array = [
      document.getElementById(`reaction_side${i}_${reaction_left[0]}_L`).value,
      document.getElementById(`reaction_side${i}_${reaction_right[0]}_R`).value
    ];
    //Padaryti, kad surastų medžiagų raides ir tik jas paimtų, o ne tiesiog visas raides
    var substance_array = [];

    let tmp = func_array[0];
    while (tmp.match(alphabet_pattern)) {
      substance_array.push(tmp.match(alphabet_pattern)[0]);
      tmp = tmp.replace(tmp.match(alphabet_pattern)[0], "");
    }

    var skip = "no";
    var subs_arr_left = substance_array;
    for (let i = 0; i < substance_array.length; i++) {
      //Nepridedamos dulikuotos medžiagų reikšmės
      var check_array = 0;
      for (let j = 0; j < substance_obj.length; j++) {
        if (subs_arr_left[i] in substance_obj[j]) {
          check_array = 1;
          substance_obj[j]["repetitions"]++;
          //Į objektą talpinami duomenys apie substratus, bei sugeneruojamos funkcijos
          //Jei medžiaga veikia kai katalizatorius
          if (
            get_reaction[0].match(new RegExp(subs_arr_left[i], "g")) &&
            get_reaction[1].match(new RegExp(subs_arr_left[i], "g"))
          ) {
            if (substance_obj[j]["occurrences"] == "left") {
              substance_obj[j][
                "function"
              ] = `${substance_obj[j]["function"]}+${func_array[1]}`;
            } else if (substance_obj[j]["occurrences"] == "right") {
              substance_obj[j][
                "function"
              ] = `${substance_obj[j]["function"]}+${func_array[0]}`;
            } else {
              if (skip == "no") {
                substance_obj[j][
                  "function"
                ] = `${substance_obj[j]["function"]}+${func_array[0]}+${func_array[1]}`;
                skip = "yes";
              }
            }
            substance_obj[j]["occurrences"] = "both";
            //Jeigu medžiaga veikia kaip substratas arba produktas
          } else if (get_reaction[0].match(new RegExp(subs_arr_left[i], "g"))) {
            substance_obj[j]["occurrences"] = "left";
            substance_obj[j][
              "function"
            ] = `${substance_obj[j]["function"]}+${func_array[0]}`;
          } else {
            substance_obj[j]["occurrences"] = "right";
            substance_obj[j][
              "function"
            ] = `${substance_obj[j]["function"]}+${func_array[1]}`;
          }
        }
      }
      //Sutikus medžiagą pirmą kartą, jos reikšmės inicializuojamos
      if (check_array == 0) {
        var obj = {};
        obj[subs_arr_left[i]] = `y[${possition++}][0]`;
        obj[`initial_conc`] = parseFloat(
          document.getElementById(`${subs_arr_left[i]}`).value
        );
        obj["color"] = document.getElementById(
          `color${subs_arr_left[i]}`
        ).value;
        obj["repetitions"] = 1;

        if (get_reaction[0].match(new RegExp(subs_arr_left[i], "g"))) {
          obj["occurrences"] = "left";
          obj["function"] = `${func_array[0]}`;
        } else {
          obj["occurrences"] = "right";
          obj["function"] = `${func_array[1]}`;
        }

        substance_obj.push(obj);
      }
    }
  }
  initializeValues(N, int_begin, int_end, substance_obj);
  let [yy, tt] = solution(substance_obj);
  createCharts(am4core);

  addToChart(yy, tt);
});
