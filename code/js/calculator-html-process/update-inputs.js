function updateInputs() {
  $("#function").load(" #function", function () {
    var d = document.getElementById("function");
    //Sugeneruojamos funkcijos abiem reakcijos pusėms
    var reaction_left = [];
    var reaction_right = [];
    var left_side = [];
    var right_side = [];

    var catalyzation = document.getElementById("reaction_cat");
    for (var i = 0; i < reactions_id.length; i++) {
      var get_rate = document.getElementById(`reaction_rate_${i}`).value;
      var get_rate_2 = document.getElementById(`second_reaction_rate_${i}`)
        .value;
      var get_reaction = document.getElementById(`reaction_input_${i}`).value;
      var reaction = get_reaction.split(/<?->/);
      reaction[0] = reaction[0].replace(/\+/g, "*");
      reaction[1] = reaction[1].replace(/\+/g, "*");

      if (catalyzation) {
        reaction_left[i] =
          reaction[0] +
          `*(-${get_rate})` +
          `+` +
          reaction[1] +
          `*${get_rate_2}` +
          `+(` +
          reaction[0] +
          `+` +
          reaction[1] +
          `)` +
          `*${catalyzation.value}` +
          `*W`;
        reaction_right[i] =
          reaction[0] +
          `*${get_rate}` +
          `+` +
          reaction[1] +
          `*(-${get_rate_2})` +
          `+(` +
          reaction[0] +
          `+` +
          reaction[1] +
          `)` +
          `*${catalyzation.value}` +
          `*W`;
      } else {
        reaction_left[i] =
          reaction[0] +
          `*(-${get_rate})` +
          `+` +
          reaction[1] +
          `*${get_rate_2}`;
        reaction_right[i] =
          reaction[0] +
          `*${get_rate}` +
          `+` +
          reaction[1] +
          `*(-${get_rate_2})`;
      }
      left_side[i] = reaction[0].replace(/\d+\*|\*\d+/g, "").split("*");
      right_side[i] = reaction[1].replace(/\d+\*|\*\d+/g, "").split("*");
    }
    // Sukuriami input laukai funkcijoms paleidus programą pirmą kartą
    for (let i = 0; i < left_side.length; i++) {
      for (var j = 0; j < left_side[i].length; j++) {
        d.innerHTML += `<div class="input_blocks generated-reaction-block">
                          <div class="input-group "> 
                            <span class="input-group-addon">
                              ${i + 1}.${j + 1} ${left_side[i][j]}':
                            </span>
                            <input type="text"
                              id="reaction_side${i}_${left_side[i][j]}_L" 
                              value=${reaction_left[i]}>
                          </div>
                        </div>`;
      }
      for (let n = 0; n < right_side[i].length; n++) {
        d.innerHTML += `<div class="input_blocks generated-reaction-block">
                          <div class="input-group"> 
                            <span class="input-group-addon">
                              ${i + 1}.${j + n + 1} ${right_side[i][n]}':
                            </span>
                            <input type="text" 
                              id="reaction_side${i}_${right_side[i][n]}_R" 
                              value=${reaction_right[i]}>
                          </div>
                        </div>`;
      }
    }
    disposeGraphData();
    $("#submit").css("display", "inline");
    $("#function").css("display", "block");
    $("#function_block").css("display", "block");
    $("#probability-block").css("display", "none");
    let blockHeight =
      document.getElementById("function_block").offsetHeight + 30;
    console.log(blockHeight);
    document.getElementById("graph-title-1").style.marginTop =
      blockHeight + "px";
    // document.getElementById("chartdiv0").style.marginTop = blockHeight + "px";
    refreshProbabilityResults();
    renew_button();
  });
}
