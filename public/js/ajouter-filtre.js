let filtreCounter = 1;

// Function to add a new filtre structure
function addFiltre() {
  filtreCounter++;
  console.log(filtreCounter);

  // Clone the template structure and update IDs
  const newFiltre = $(".fiche-filtre:first").clone();
  newFiltre.attr("data-filtre-id", filtreCounter);

  // Update IDs and clear values
  newFiltre.find(".filtre-champ").attr("id", "filtre-champ-" + filtreCounter);

  newFiltre.find(".filtre-type").attr("id", "filtre-type-" + filtreCounter);

  newFiltre.find(".filtre-valeur").attr("id", "filtre-valeur-" + filtreCounter);

  newFiltre.find(".remove-filtre").attr("data-filtre-id", filtreCounter);


  // Append the new filtre
  newFiltre.appendTo(".fiche-filtres-champs");
}

// Function to remove a filtre structure
function removeFiltre(filtreId) {
    console.log("remove function triggered");
  $(`.fiche-filtre[data-filtre-id="${filtreId}"]`).remove();
  filtreCounter--;
}

// Event handler for the "Add Filtre" button
$("#ajouter-filtre").on("click", function () {
  addFiltre();
});

// Event handler for the "Remove Filtre" button

$(".fiche-filtres-champs").on("click", ".remove-filtre", function () {
  const filtreId = $(this).data("filtre-id");
  removeFiltre(filtreId);
  console.log("clicked");
});


//not working
// $(".remove-filtre").on("click", function () {
//     const filtreId = $(this).data("filtre-id");
//     console.log(filtreId);
//     removeFiltre(filtreId);
//     console.log("clicked");
// });


