$.ajax({
  url: "/tableau-factures-data",
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

    var table = new Tabulator("#tableau-factures", {
      downloadRowRange: "active",
      printHeader: "<h1>Factures<h1>",
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

        { title: "Raison Sociale", field: "raisonSociale", hozAlign: "left" },
        { title: "Ice", field: "ice", hozAlign: "left" },
        { title: "Nom Contact", field: "nomContact", hozAlign: "left" },
        { title: "Tel", field: "tel", hozAlign: "left" },
        { title: "Email", field: "email", hozAlign: "left" },
        {
          title: "Adresse Facturation",
          field: "adresseFacturation",
          hozAlign: "left",
        },
        {
          title: "Adresse Livraison",
          field: "adresseLivraison",
          hozAlign: "left",
        },
        { title: "Date Facture", field: "dateFacture", hozAlign: "left" },
        { title: "Date Livraison", field: "dateLivraison", hozAlign: "left" },
        { title: "Total Ht", field: "totalHt", hozAlign: "left" },
        { title: "Taux Tva", field: "tauxTva", hozAlign: "left" },
        { title: "Total Ttc", field: "totalTtc", hozAlign: "left" },
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
