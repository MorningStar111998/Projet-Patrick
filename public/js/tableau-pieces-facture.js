$.ajax({
  url: "/tableau-fiche-a-facturer-data",
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

    var table = new Tabulator("#tableau-pieces-facture", {
      reactiveData: true,
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

        { title: "NumBL", field: "numBL", hozAlign: "left" },
        { title: "NumBC", field: "numBC", hozAlign: "left" },
        { title: "Matiere", field: "matiere", hozAlign: "left" },
        { title: "Designation", field: "designation", hozAlign: "left" },
        { title: "Traitement", field: "traitement", hozAlign: "left" },
        { title: "NbrPieces", field: "nbrPieces", hozAlign: "left" },
        { title: "PoidsKg", field: "poidsKg", hozAlign: "left" },
        { title: "P.U.H.T/Kg", field: "puht", hozAlign: "left" },
        { title: "P.T.H.T/Kg", field: "ptht", hozAlign: "left" },
      ],
    });
    $("#fiche-generer-rapport").on("click", function () {
      table.download("xlsx", "data.xlsx", {
        sheetName: "Liste des demandes",
      });
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
    document
      .getElementById("reactivity-add")
      .addEventListener("click", function () {
        tabledata.push({
          name: "IM A NEW ROW",
          progress: 100,
          gender: "male",
        });
      });

    //remove bottom row from table on button click
    document
      .getElementById("reactivity-delete")
      .addEventListener("click", function () {
        tabledata.pop();
      });

    //update name on first row in table on button click
    document
      .getElementById("reactivity-update")
      .addEventListener("click", function () {
        tabledata[0].name = "IVE BEEN UPDATED";
      });
  },
});
