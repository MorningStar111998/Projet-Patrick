$.ajax({
  url: "/tableau-fiche-data",
  type: "GET",
  success: function (data) {
    var eyeIcon = function (cell, formatterParams, onRendered) {
      //plain text value
      return "<i class='fa-regular fa-eye'></i>";
    };
    var codeFormat = function (cell, formatterParams, onRendered) {
      //plain text value
      return "<div class='code-format'></div>";
    };
    var optionIcon = function (cell, formatterParams, onRendered) {
      //plain text value
      return '<i class="fa-solid fa-ellipsis-vertical"></i>';
    };

    var table = new Tabulator("#tableau-fiche-traitement", {
      downloadRowRange: "active",
      printHeader: "<h1>Fiches à Facturer<h1>",
      printStyled: true,
      printConfig: {
        columnHeaders: true, //do not include column headers in printed table
        columnGroups: false, //do not include column groups in column headers for printed table
        rowGroups: false, //do not include row groups in printed table
        columnCalcs: false, //do not include column calcs in printed table
        dataTree: false, //do not include data tree in printed table
        formatCells: true, //show raw cell values without formatter
      },
      downloadConfig: {
        rowHeight: 60,
        height: "100%",
        columnHeaders: true, //do not include column headers in downloaded table
        columnGroups: true, //do not include column groups in column headers for downloaded table
        rowGroups: true, //do not include row groups in downloaded table
        columnCalcs: true, //do not include column calcs in downloaded table
        dataTree: true, //do not include data tree in downloaded table
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
        { title: "Client", field: "client", width: 250, headerFilter: "input" },
        { title: "Opérateur", field: "operateur", hozAlign: "left" , headerFilter: "input"},
        { title: "Matière", field: "matiere", hozAlign: "left" , headerFilter: "input"},
        { title: "Dureté", field: "durete", hozAlign: "left" , headerFilter: "input"},
        { title: "Désignation", field: "designation", hozAlign: "left" , headerFilter: "input"},
        { title: "QTE", field: "qte", hozAlign: "left" , headerFilter: "input"},
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
        orientation: "landscape", //set page orientation to portrait
        title: "Liste des demandes", //add title to report
      });
    });
    $("#fiche-imprimer").on("click", function () {
      table.print(false, true);
    });

  },
});
