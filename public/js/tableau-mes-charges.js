$.ajax({
  url: "/tableau-mes-charges-data",
  type: "GET",
  success: function (data) {
    var optionIcon = function (cell, formatterParams, onRendered) {
      //plain text value
      return '<i class="fa-solid fa-ellipsis-vertical"></i>';
    };

    var table = new Tabulator("#tableau-mes-charges", {
      downloadRowRange: "active",
      printHeader: "<h1>Charges<h1>",
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
      layout: "fitDataColumns",
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
        { title: "Numéro de Charge", field: "numCharge", hozAlign: "left" },
        { title: "Date de Création", field: "dateCreation", hozAlign: "left" },
        {
          title: "Date/Heure Chargement Historique",
          field: "dateTimeChargementHistorique",
          hozAlign: "left",
        },
        {
          title: "Date/Heure Chargement Réel",
          field: "dateTimeChargementReel",
          hozAlign: "left",
        },
        {
          title: "Durée Traitement Théorique",
          field: "dureeTraitementTheorique",
          hozAlign: "left",
        },
        {
          title: "Durée Traitement Réel",
          field: "dureeTraitementReel",
          hozAlign: "left",
        },
        {
          title: "Date Fin Chargement",
          field: "dateFinChargement",
          hozAlign: "left",
        },
        { title: "Four", field: "four", hozAlign: "left" },
        { title: "Traitement", field: "traitement", hozAlign: "left" },
        {
          title: "Opérateur de Création",
          field: "operateurCreation",
          hozAlign: "left",
        },
        {
          title: "Opérateur de Chargement",
          field: "operateurChargement",
          hozAlign: "left",
        },
        {
          title: "Opérateur de Création",
          field: "operateurCreation",
          hozAlign: "left",
        },
      ],
    });

    table.on("rowClick", function (e, row) {
      alert("Row " + row.getData().id + " Clicked!!!!");
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
