// Four
$(document).ready(function () {
    var modal = $("#ajouter-four-modal");
    var btn = $("#bouton-ajouter-nouveau-four");
    var form = $("#ajouter-four-formulaire");

    var closeBtn = $(".ajouter-four-close"); 

    btn.click(function () {
        console.log("appear");
        modal.css("display","block");
    })
    closeBtn.click(function () {
        console.log("disappear");
        modal.css("display", "none");
    })

})

$(document).ready(function () {
    var modal = $("#modifier-four-modal");
    var form = $("#modifier-four-formulaire");
    
    var closeBtn = $(".modifier-four-close"); 

    
    closeBtn.click(function () {
        console.log("disappear");
        modal.css("display", "none");
    })

})



// Factures
$(document).ready(function () {
    var modal = $("#ajouter-facture-body-modal");
    var btn = $("#facture-ajouter-nouveau");

    var closeBtn = $("#ajouter-facture-close-button"); 

    btn.click(function () {
        console.log("appear");
        modal.css("display","block");
    })
    closeBtn.click(function () {
        console.log("disappear");
        modal.css("display", "none");
    })

})
