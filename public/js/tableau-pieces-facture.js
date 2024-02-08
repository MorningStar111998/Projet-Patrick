$.ajax({
  url: "/tableau-fiche-a-facturer-data",
  type: "GET",
  success: function (data) {
    var barsIcon = function (cell, formatterParams, onRendered) {
      return '<i class="fa-solid fa-bars"></i>';
    };

    var table = new Tabulator("#tableau-pieces-facture", {
      addRowPos: "bottom",
      movableRows: true,
      height: 400,
      data: [[{}]],
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

        { title: "NumBL", field: "numBL",editor: "input", hozAlign: "left" },
        { title: "NumBC", field: "numBC",editor: "input", hozAlign: "left" },
        {
          title: "Matiere",
          field: "matiere",editor: "input",
          hozAlign: "left",
          
        },
        { title: "Designation", field: "designation",editor: "input", hozAlign: "left" },
        { title: "Traitement", field: "traitement",editor: "input", hozAlign: "left" },
        { title: "NbrPieces", field: "nbrPieces",editor: "input", hozAlign: "left" },
        { title: "PoidsKg", field: "poidsKg",editor: "input", hozAlign: "left" },
        { title: "P.U.H.T/Kg", field: "puht",editor: "input", hozAlign: "left" },
        { title: "P.T.H.T/Kg", field: "ptht",editor: "input", hozAlign: "left" },
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
