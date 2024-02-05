$.ajax({
  url: "/tableau-four-data",
  type: "GET",
  success: function (data) {
    var optionIcon = function (cell, formatterParams, onRendered) {
      //plain text value
      return '<i class="fa-solid fa-ellipsis-vertical"></i>';
    };

    var table = new Tabulator("#tableau-four", {
      downloadRowRange: "active",
      printHeader: "<h1>Fours<h1>",
      printStyled: true,
      printConfig: {
        columnHeaders: true,
        columnGroups: false,
        rowGroups: false,
        columnCalcs: false,
        dataTree: false,
        formatCells: true,
      },
      downloadConfig: {
        rowHeight: 60,
        height: "100%",
        columnHeaders: true,
        columnGroups: true,
        rowGroups: true,
        columnCalcs: true,
        dataTree: true,
      },
      printAsHtml: true,
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
              console.log(element.value);
              if (element) {
                element.value = field[1];
              }
            });
          },
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
