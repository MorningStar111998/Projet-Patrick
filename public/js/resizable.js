$(document).ready(function () {
  $(".resizable").resizable({
    handles: "e", // Permet le redimensionnement uniquement à partir du bord droit
    minWidth: 100, // Taille minimal!e
    resize: function (event, ui) {
      var parentWidth = $(this).parent().width();
      var resizable2Width = parentWidth - ui.size.width;
      $(".resizable2").width(resizable2Width);
    },
  });
});
