$("#example1").click(function () {
  $("#water_production").css("display", "block");
  disposeGraph();
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
  disposeGraph();
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
  $("#cancer_treatment").css("display", "block");
  disposeGraph();
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
