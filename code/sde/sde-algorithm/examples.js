$("#example1").click(function () {
  $("#cancer_treatment").css("display", "block");
  $("#reactions").load(" #reactions > *", function () {
    addSubstances(2);
    addReaction(1);
    document.getElementById("int_ends").value = "1";
    document.getElementById("n_inp").value = "100";
    document.getElementById("second_reaction_rate_0").value = "0.2";
    document.getElementById("reaction_input_0").value = "A+B->0";
    document.getElementById("A").value = "30";
    document.getElementById("B").value = "42";
  });
  disposeGraphData();
  reactions_id = ["reaction_0"];
});

$("#example2").click(function () {
  $("#covid19").css("display", "block");
  $("#reactions").load(" #reactions > *", function () {
    addSubstances(4);
    addReaction(3);
    document.getElementById("int_ends").value = "7";
    document.getElementById("n_inp").value = "700";
    document.getElementById("A").value = "5000";
    document.getElementById("B").value = "5";
    document.getElementById("C").value = "0";
    document.getElementById("D").value = "0";
    document.getElementById("reaction_input_0").value = "A->B";
    document.getElementById("reaction_rate_0").value = "0.02";
    document.getElementById("second_reaction_rate_0").value = "0";
    document.getElementById("reaction_input_1").value = "B->C";
    document.getElementById("reaction_rate_1").value = "0.015";
    document.getElementById("second_reaction_rate_1").value = "0";
    document.getElementById("reaction_input_2").value = "B->D";
    document.getElementById("reaction_rate_2").value = "0.004";
    document.getElementById("second_reaction_rate_2").value = "0";
    document.getElementById("int_ends").value = "21";
    document.getElementById("n_inp").value = "2100";
    document.getElementById("iterations").value = "14";
    document.getElementById("show-only-mean").checked = false;
    document.getElementById("probability-interval-begin").value = "20";
    document.getElementById("probability-interval-end").value = "140";
  });
  disposeGraphData();
  reactions_id = ["reaction_0"];
});
