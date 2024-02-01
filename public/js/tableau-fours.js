$.ajax({
  url: "/tableau-four-data",
  type: "GET",
  success: function (data) {
    var optionIcon = function (cell, formatterParams, onRendered) {
      //plain text value
      return '<i class="fa-solid fa-ellipsis-vertical"></i>';
    };

    var table = new Tabulator("#tableau-four", {
      height: 400,
      data: data,
      layout: "fitDataTable",
      pagination: true,
      columns: [
        {
          formatter: "rowSelection",
          titleFormatter: "rowSelection",
          titleFormatterParams: {
            rowRange: "active",
          },
          headerSort: false,
          download: false,
          width: 40,
        },
        { title: "Nom Four", field: "nomFour" },
        { title: "Poids maximal de charge (kg)", field: "poidsMax" },
        { title: "Température Max", field: "tempMax", hozAlign: "left" },
        {
          title: "Etat de la Charge",
          field: "etatCharge",
          formatter: function (row, formatterParams) {
            var statut = row.getData().etatCharge;
            var value = row.getData().etatCharge;
            return (
              "<div class=' " + statut + " code-format'>" + value + "</div>"
            );
          },
        },
        { title: "ID Charge en cours", field: "idcharge" },
        { title: "Date Fin de Charge", field: "dateTimeFin" },
        { title: "Numéro Prochaine Charge", field: "numChargeProchain" },
        {
          title: "",
          field: "option",
          formatter: optionIcon,
          hozAlign: "center",
          width: 30,
          cellClick: function (e, row) {
            var modal = $("#modifier-four-modal");

            console.log("appear");
            modal.css("display", "block");

            var rowClicked = row.getData();

            Object.entries(rowClicked).forEach((field) => {
              var element = document.getElementById(field[0]);
              console.log(element);
              if (element) {
                element.value = field[1];
              }
            });
          },
        },
      ],
    });

    

    $("#four-generer-rapport").on("click", function () {
      table.download("xlsx", "data.xlsx", { sheetName: "Liste des demandes" });
    });
    $("#four-pdf").on("click", function () {
      table.download("pdf", "data.pdf", {
        orientation: "landscape",
        title: "Liste des demandes",
      });
    });
    $("#four-imprimer").on("click", function () {
      table.print(false, true);
    });
  },
});
