$("#submit_reaction").click(function () {
  $("#function").load(" #function", function () {
    document.getElementById("submit").disabled = false;
    var sde = document.getElementById("iterations") != null;
    if (sde) {
      let constraint = document.getElementById("iterations").value;
      if (constraint > 100) {
        document.getElementById("show-only-mean").checked = true;
      }
    }

    var d = document.getElementById("function");
    //Sugeneruojamos funkcijos abiem reakcijos pusėms
    var reaction_left = [];
    var reaction_right = [];
    var left_side = [];
    var right_side = [];

    let catalyzation = document.getElementById("reaction_cat");

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
      console.log("Left side", left_side);
      console.log(reaction);
    }
    // Sukuriami input laukai funkcijoms paleidus programą pirmą kartą
    for (let i = 0; i < left_side.length; i++) {
      for (var j = 0; j < left_side[i].length; j++) {
        d.innerHTML += `<div class="input_blocks generated-reaction-block">
          <span class="input-group-addon">
            ${i + 1}.${j + 1} ${left_side[i][j]}':
          </span>
          <input type="text"
            id="reaction_side${i}_${left_side[i][j]}_L" 
            value=${reaction_left[i]}>
        </div>`;
      }
      // style="width:10px"
      for (let n = 0; n < right_side[i].length; n++) {
        d.innerHTML += `<div class="input_blocks generated-reaction-block">
          <span class="input-group-addon">
            ${i + 1}.${j + n + 1} ${right_side[i][n]}':
          </span>
          <input type="text" 
            id="reaction_side${i}_${right_side[i][n]}_R" 
            value=${reaction_right[i]}>
        </div>`;
      }
    }
    $("#submit").css("display", "inline");
    // $("#submit").prop("enabled", true);
    $("#function").css("display", "block");
    if (rection_submited) {
      chart.dispose();
    }
    renew_button();
  });
});
