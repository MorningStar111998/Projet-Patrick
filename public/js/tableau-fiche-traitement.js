$.ajax({
  url: "/tableau-fiche-data",
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
      printHeader: "<h1>Fiches à Facturer<h1>",
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
          print: false,
        },
        {
          title: "Preview",
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

            console.log(row.getData().statut);
            if ($(".fiche-body-right").css("display") === "none") {
              $(".fiche-body-right").css("display", "block");
              $(".fiche-body-left").css("width", "50%");
            }
            $("#fiche-button-fermer").on("click", function () {
              $(".fiche-body-right").css("display", "none");
              $(".fiche-body-left").css("width", "100%");
            });
          },
        },

        {
          title: "Code",
          field: "code",
          formatter: function (row, formatterParams) {
            var statut = row.getData().statut;
            var value = row.getData().code;
            return (
              "<div class=' " + statut + " code-format'>" + value + "</div>"
            );
          },
          width: 100,
        },
        { title: "Client", field: "client", width: 250 },
        { title: "Opérateur", field: "operateur", hozAlign: "left" },
        { title: "Matière", field: "matiere", hozAlign: "left" },
        { title: "Dureté", field: "durete", hozAlign: "left" },
        { title: "Désignation", field: "designation", hozAlign: "left" },
        { title: "QTE", field: "qte", hozAlign: "left" },
        {
          title: "Poids",
          field: "poids",
          hozAlign: "left",
          width: 90,
          formatter: "money",
          formatterParams: {
            decimal: ",",
            thousand: ".",
            symbol: "g",
            symbolAfter: "p",
            negativeSign: true,
            precision: false,
          },
        },
        { title: "Prof", field: "prof", hozAlign: "left" },
        { title: "DrtObt", field: "drtObt", hozAlign: "left" },
        { title: "Date", field: "date", hozAlign: "left", sorter: "date" },
        { title: "Statut", field: "statut", hozAlign: "left" },
        { title: "Livraison", field: "livraison", hozAlign: "left" },
        {
          title: "",
          field: "option",
          formatter: optionIcon,
          hozAlign: "center",
          width: 30,
          print: false,
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
