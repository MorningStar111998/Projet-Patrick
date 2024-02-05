$.ajax({
  url: "/tableau-fiche-a-charger-data",
  type: "GET",
  success: function (data) {
    var eyeIcon = function (cell, formatterParams, onRendered) {
      return "<i class='fa-regular fa-eye'></i>";
    };
    var codeFormat = function (cell, formatterParams, onRendered) {
      return "<div class='code-format'></div>";
    };
    var optionIcon = function (cell, formatterParams, onRendered) {
      return '<i class="fa-solid fa-ellipsis-vertical"></i>';
    };

    var table = new Tabulator("#tableau-fiche-traitement", {
      downloadRowRange: "active",
      printHeader: "<h1>Fiches à Charger<h1>",
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
      layout: "fitColumns",
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
          print: false,
        },
        {
          title: "Modifier Fiche",
          formatter: eyeIcon,
          download: false,
          hozAlign: "center",
          print: false,

          cellClick: function (e, row) {
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

        {
          title: "Numéro de Fiche",
          field: "numFiche",
          // formatter: function (row, formatterParams) {
          //   var statut = row.getData().statut;
          //   var value = row.getData().code;
          //   return (
          //     "<div class=' " + statut + " code-format'>" + value + "</div>"
          //   );
          // },
        },

        { title: "Matiere", field: "matiere", hozAlign: "left", minWidth: 120 },
        {
          title: "Designation",
          field: "designation",
          hozAlign: "left",
        },
        {
          title: "Traitement",
          field: "traitement",
          hozAlign: "left",
        },
        {
          title: "NbrPieces",
          field: "nbrPieces",
          hozAlign: "left",
        },
        {
          title: "PoidsKg",
          field: "poidsKg",
          hozAlign: "left",
          formatter: "money",
          formatterParams: {
            decimal: ",",
            thousand: ".",
            symbol: "Kg",
            symbolAfter: "p",
            negativeSign: true,
            precision: false,
          },
        },
      ],
    });
    $("#fiche-generer-rapport").on("click", function () {
      table.download("xlsx", "data.xlsx", { sheetName: "Liste des demandes" });
    });
    $("#fiche-pdf").on("click", function () {
      table.download("pdf", "data.pdf", {
        orientation: "landscape",
        title: "Liste des demandes",
      });
    });
    $("#fiche-imprimer").on("click", function () {
      table.print(false, true);
    });
  },
});
