function removePreviousText() {
  $("#photosynthesis").css("display", "none");
  $("#water_production").css("display", "none");
  $("#cancer_treatment").css("display", "none");
  $("#covid19").css("display", "none");
}

function disposeGraphData() {
  $("#function_block").css("display", "none");
  $("#calculate-probability").css("display", "none");
  $("#tooltip-probability").css("display", "none");
  $("#probability").css("display", "none");
  $("#graph-title-1").css("display", "none");
  $("#graph-title-2").css("display", "none");
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
      removeElement("block-" + subs_names[i - 1]);
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
  var element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
}

function sdeInitial() {
  $("#reactions").load(" #reactions > *", function () {});
  $("#substance").load(" #substance > *", function () {});
  $("#settings").load(" #settings > *", function () {});
}
