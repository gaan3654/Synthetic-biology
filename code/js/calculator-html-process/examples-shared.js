function removePreviousText() {
  $("#photosynthesis").css("display", "none");
  $("#water_production").css("display", "none");
  $("#cancer_treatment").css("display", "none");
  $("#covid19").css("display", "none");
}

function disposeGraph() {
  $("#function_block").css("display", "none");
  $("#calculate-probability").css("display", "none");
  $(".tooltip").css("display", "none");
  $("#probability").css("display", "none");
  chart.dispose();
}

function addSubstances(totalAmount) {
  colorId = [];
  names = [];
  for (let i = 0; i <= subs_names.length; i++) {
    if (
      !(totalAmount < subs_names.length && i >= totalAmount) &&
      i < subs_names.length
    ) {
      names[i] = subs_names[i];
      colorId[i] = `color${subs_names[i]}`;
    }

    if (totalAmount > subs_names.length) {
      add_additional_substance_input();
    } else if (totalAmount < subs_names.length && i > totalAmount) {
      removeElement(subs_names[i - 1]);
    }
  }
  subs_color_id = colorId;
  subs_names = names;
}

function addReaction(totalAmount) {
  for (let i = 0; i < totalAmount - 1; i++) {
    add_additional_reaction_input();
  }
}

function removeElement(elementId) {
  var element = document.getElementById(`block-${elementId}`);
  element.parentNode.removeChild(element);
}
