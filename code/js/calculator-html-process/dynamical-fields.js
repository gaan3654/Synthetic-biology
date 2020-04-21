//Prideda papildomų medžiagų input laukų
function add_additional_substance_input() {
  var d = document.getElementById("substance");
  var substance_count = subs_color_id.length + 1;
  for (var i = subs_color_id.length; i < substance_count; i++) {
    subs_names[i] = subs_html_name[i];
    subs_color_id[i] = "color" + subs_html_name[i];
    //Išnaudojus nustatytas spalvas, jos funkcijoms priskiriamos atsitiktinai
    if (subs_color[i] == null) {
      subs_color[i] = getRandomColor();
      //Tikrinama ar tokia spalva jau nėra priskirta
      for (var j = 0; j < subs_color.length - 1; j++) {
        if (subs_color[i] == subs_color[j]) {
          subs_color[i] = getRandomColor();
          j = 0;
        }
      }
    }
    //Pridedami įvesties laukai papildomoms medžiagoms
    d.innerHTML += `<div class=input_blocks>
                      <form>
                        <div class="input-group">
                          <span class="input-group-addon">[${subs_html_name[i]}']</span>
                          <input id=${subs_names[i]} type='text' value=0>
                          <input type="color" id=${subs_color_id[i]} class="s_colors" value=${subs_color[i]}>
                        </div>
                      </form>
                    </div>`;
  }
}

{
  /* <div class="input_blocks">
<form>
  <div class="input-group">
    <span class="input-group-addon">[C']</span>
    <input type="number" id="C" value="1" />
    <input
      type="color"
      id="colorC"
      class="s_colors"
      value="#00ff00"
    />
  </div>
</form>
</div> */
}

//Prideda papildomų reakcijų input laukų
function add_additional_reaction_input() {
  document.getElementById("submit_reaction").value = "Vykdyti reakcijas";
  var d = document.getElementById("reactions");
  var i = reactions_id.length;
  reactions_id[i] = "reaction_" + [i];
  //Pridedami įvesties laukai papildomoms reakcijoms
  d.innerHTML += `<div id = reaction_info_${[i]}>
                    <form>
                    <div class="input-group">
                      <span class="input-group-addon reaction-addon">${
                        i + 1
                      }. Įveskite norimą reakciją:</span>
                      <div id=reaction_${[i]} class="input_blocks">
                          <input type="text" id="reaction_input_${[
                            i,
                          ]}" value="A->C">
                      </div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-addon reaction-addon">
                        Reakcijos greitis k<sub>1</sub>
                      </span>
                      <div id=k1_${[i]} class="input_blocks">
                          <input type="number" id="reaction_rate_${[
                            i,
                          ]}" value="0.9">
                      </div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-addon reaction-addon">
                        Reakcijos greitis k<sub>2</sub>
                      </span>
                      <div id=k2_${[i]} class="input_blocks">
                          <input type="number" id="second_reaction_rate_${[
                            i,
                          ]}" value="0.1">
                      </div>
                    </div>
                  </div>`;
}

// Pakeičiamas mygtuko pavadinimas
function renew_button() {
  document.getElementById("submit_reaction").value = "Atnaujinti reakciją(as)";
  rection_submited = true;
}

let previousBtn = "btn-list";
function focusItem(id) {
  document.getElementById(previousBtn).classList.remove("active");
  document.getElementById(id).classList.add("active");
  previousBtn = id;
}
