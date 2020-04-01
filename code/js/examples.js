$("#example1").click(function() {
  $("#reactions").load(" #reactions > *", function() {
    document.getElementById("int_ends").value = "1";
    document.getElementById("n_inp").value = "100";
    document.getElementById("reaction_input_0").value = "A+B->C+B";
    document.getElementById("A").value = "3";
    document.getElementById("B").value = "2";
    document.getElementById("C").value = "1";
  });
  reactions_id = ["reaction_0"];
  last_added_reaction_id = -1;
  exp3_clicked = "no";
});

$("#example2").click(function() {
  $("#reactions").load(" #reactions > *", function() {
    document.getElementById("int_ends").value = "5";
    document.getElementById("n_inp").value = "100";
    add_additional_reaction_input();
    document.getElementById("reaction_input_0").value = "A->B";
    document.getElementById("reaction_input_1").value = "C->0";
    document.getElementById("A").value = "3";
    document.getElementById("B").value = "2";
    document.getElementById("C").value = "1";
  });
  reactions_id = ["reaction_0"];
  last_added_reaction_id = -1;
  exp3_clicked = "no";
});

var exp3_clicked = "no";

$("#example3").click(function() {
  $("#reactions").load(" #reactions > *", function() {
    if (exp3_clicked == "no") {
      for (let i = 0; i < 3; i++) {
        add_additional_reaction_input();
      }
      add_additional_substance_input();
      exp3_clicked = "yes";
    }
    document.getElementById("int_ends").value = "10";
    document.getElementById("n_inp").value = "1000";
    document.getElementById("reaction_input_0").value = "A->B";
    document.getElementById("reaction_input_1").value = "B->C";
    document.getElementById("reaction_input_2").value = "C->D";
    document.getElementById("reaction_input_3").value = "D->A";
  });
  reactions_id = ["reaction_0"];
  last_added_reaction_id = -1;
});