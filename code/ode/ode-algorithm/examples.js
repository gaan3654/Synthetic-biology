$("#example1").click(function () {
  $("#water_production").css("display", "block");
  $("#reactions").load(" #reactions > *", function () {
    addSubstances(3);
    addReaction(1);
    document.getElementById("int_ends").value = "1";
    document.getElementById("n_inp").value = "100";
    document.getElementById("second_reaction_rate_0").value = "0";
    document.getElementById("reaction_input_0").value = "2*A+B->2*C";
    document.getElementById("A").value = "3";
    document.getElementById("B").value = "2";
    document.getElementById("C").value = "0";
  });
  reactions_id = ["reaction_0"];
});

$("#example2").click(function () {
  $("#photosynthesis").css("display", "block");
  $("#reactions").load(" #reactions > *", function () {
    addSubstances(4);
    addReaction(1);
    document.getElementById("int_ends").value = "1";
    document.getElementById("n_inp").value = "1000";
    document.getElementById("reaction_rate_0").value = "0.5";
    document.getElementById("second_reaction_rate_0").value = "0";
    document.getElementById("reaction_input_0").value = "6*A+6*B->C+6*D";
    document.getElementById("A").value = "8";
    document.getElementById("B").value = "5";
    document.getElementById("C").value = "0";
    document.getElementById("D").value = "0";
  });
  reactions_id = ["reaction_0"];
});

$("#example3").click(function () {
  $("#reactions").load(" #reactions > *", function () {
    addSubstances(4);
    addReaction(4);
    document.getElementById("int_ends").value = "10";
    document.getElementById("n_inp").value = "1000";
    document.getElementById("reaction_input_0").value = "A->B";
    document.getElementById("reaction_input_1").value = "B->C";
    document.getElementById("reaction_input_2").value = "C->D";
    document.getElementById("reaction_input_3").value = "D->A";
  });
  reactions_id = ["reaction_0"];
});

function removePreviousText() {
  $("#photosynthesis").css("display", "none");
  $("#water_production").css("display", "none");
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
