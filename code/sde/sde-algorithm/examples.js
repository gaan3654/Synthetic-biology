$("#example1").click(function () {
  $("#cancer_treatment").css("display", "block");
  $("#reactions").load(" #reactions > *", function () {
    addSubstances(3);
    addReaction(1);
    document.getElementById("int_ends").value = "1";
    document.getElementById("n_inp").value = "100";
    document.getElementById("second_reaction_rate_0").value = "0.2";
    document.getElementById("reaction_input_0").value = "A+B->C";
    document.getElementById("A").value = "30";
    document.getElementById("B").value = "12";
    document.getElementById("C").value = "0";
  });
  disposeGraph();
  reactions_id = ["reaction_0"];
});

$("#example2").click(function () {
  $("#covid19").css("display", "block");
  $("#reactions").load(" #reactions > *", function () {
    addSubstances(3);
    addReaction(2);
    document.getElementById("int_ends").value = "7";
    document.getElementById("n_inp").value = "700";
    document.getElementById("A").value = "200";
    document.getElementById("B").value = "15";
    document.getElementById("C").value = "0";
    document.getElementById("reaction_input_0").value = "A->B";
    document.getElementById("reaction_rate_0").value = "0.25";
    document.getElementById("second_reaction_rate_0").value = "0.6";
    document.getElementById("reaction_input_1").value = "B->C";
    document.getElementById("reaction_rate_1").value = "0.04";
    document.getElementById("second_reaction_rate_1").value = "0";
    document.getElementById("iterations").value = "14";
    document.getElementById("show-only-mean").checked = false;
    document.getElementById("probability-interval-begin").value = "20";
    document.getElementById("probability-interval-end").value = "140";
  });
  disposeGraph();
  reactions_id = ["reaction_0"];
});
