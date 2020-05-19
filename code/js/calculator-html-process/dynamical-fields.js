//Prideda papildomų medžiagų input laukų
function add_additional_substance_input() {
  let d = document.getElementById("substance");
  let substance_count = subs_color_id.length + 1;
  for (let i = subs_color_id.length; i < substance_count; i++) {
    subs_names[i] = subs_html_name[i];
    subs_color_id[i] = "color" + subs_html_name[i];
    //Išnaudojus nustatytas spalvas, jos funkcijoms priskiriamos atsitiktinai
    if (subs_color[i] == null) {
      subs_color[i] = getRandomColor();
      //Tikrinama ar tokia spalva jau nėra priskirta
      for (let j = 0; j < subs_color.length - 1; j++) {
        if (subs_color[i] == subs_color[j]) {
          subs_color[i] = getRandomColor();
          j = 0;
        }
      }
    }
    //Pridedami įvesties laukai papildomoms medžiagoms
    let newElement = document.createElement("div");

    newElement.setAttribute("class", "input-group");
    newElement.setAttribute("id", `block-${subs_names[i]}`);

    newElement.innerHTML = `<span class="input-group-addon input-addon">[${subs_html_name[i]}']</span>
                            <div class="input_blocks">
                              <input id=${subs_names[i]} class="amount-input" type='text' value=0>
                              <input type="color" id=${subs_color_id[i]} class="s_colors" value=${subs_color[i]}>
                            </div>`;
    d.appendChild(newElement);
  }
}

//Prideda papildomų reakcijų input laukų
function add_additional_reaction_input() {
  document.getElementById("submit_reaction").value = "Vykdyti reakcijas";
  let d = document.getElementById("reactions");
  let i = reactions_id.length;
  reactions_id[i] = "reaction_" + [i];
  //Pridedami įvesties laukai papildomoms reakcijoms
  let newElement = document.createElement("div");

  newElement.setAttribute("class", "input-group");
  newElement.setAttribute("id", `reaction_info_${[i]}`);

  newElement.innerHTML = `<div class="input-group">
                            <span class="input-group-addon reaction-addon">${
                              i + 1
                            }. Įveskite reakciją:
                            </span>
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
                          </div>`;
  d.appendChild(newElement);
}

// Ištrinamas grafikas
function renew_button() {
  rection_submited = true;
}

function addGraph(numeration) {
  let d = document.getElementById("graph-container");
  d.innerHTML += `<div id="chartdiv${numeration}" class="graph"></div>`;
}

function disposeCharts() {
  $("#function_block").css("display", "none");
  if (chartList.length > 0) {
    for (let i = 0; i < chartList.length; i++) {
      chartList[i].dispose();
      if (i < graphList.length) {
        removeElement(graphList[i]);
      }
    }
    chartList = [];
    graphList = [];
  }
}

function refreshCalculator() {
  removePreviousText();
  disposeGraphData();
  sdeInitial();
  disposeCharts();
  refreshProbabilityResults();
}

function refreshProbabilityResults() {
  Array.from(document.getElementsByClassName("probability-result")).forEach(
    function (item) {
      removeElement(item.id);
    }
  );
  document.getElementById("probability-result-block").style = "display: none";
}
