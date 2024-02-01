$.ajax({
  url: "/tableau-mes-charges-data",
  type: "GET",
  success: function (data) {
    var optionIcon = function (cell, formatterParams, onRendered) {
      //plain text value
      return '<i class="fa-solid fa-ellipsis-vertical"></i>';
    };

    var table = new Tabulator("#tableau-four", {
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
        },
        { title: "ID", field: "id", width: 450 },
        { title: "Nom Four", field: "nomFour" },
        { title: "Type", field: "type", hozAlign: "left" },
        { title: "Description", field: "description" },
        { title: "Etat Four", field: "etatFour" },
        { title: "ID Charge en cours", field: "idcharge" },
        {
          title: "",
          field: "option",
          formatter: optionIcon,
          hozAlign: "center",
          width: 30,
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
