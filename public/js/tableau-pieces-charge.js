$.ajax({
  url: "/tableau-fiche-a-charger-data",
  type: "GET",
  success: function (data) {
    var barsIcon = function (cell, formatterParams, onRendered) {
      return '<i class="fa-solid fa-bars"></i>';
    };

    var table = new Tabulator("#tableau-pieces-charge", {
      addRowPos: "bottom",
      movableRows: true,
      height: 400,
      data: [{}],
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
          rowHandle: true,
          titleFormatter: barsIcon,
          formatter: barsIcon,
          headerSort: false,
          frozen: true,
        },

        {
          title: "Numéro de Fiche",
          field: "numFiche",editor: "input",
        },

        { title: "Matiere", field: "matiere",editor: "input", hozAlign: "left", minWidth: 120 },
        {
          title: "Designation",
          field: "designation",editor: "input",
          hozAlign: "left",
        },
        {
          title: "Traitement",
          field: "traitement",editor: "input",
          hozAlign: "left",
        },
        {
          title: "NbrPieces",
          field: "nbrPieces",editor: "input",
          hozAlign: "left",
        },
        {
          title: "PoidsKg",
          field: "poidsKg",editor: "input",
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

    $("#add-row").on("click", function () {
      table.addRow({});
    });
    $("#delete-row").on("click", function () {
      var selectedData = table.getSelectedData();
      console.log(selectedData);
    });
    $("#clear").on("click", function () {
      table.clearData();
    });
  },
});
