$.ajax({
  url: "/tableau-client-data",
  type: "GET",
  success: function (data) {
    var eyeIcon = function (cell, formatterParams, onRendered) {
      //plain text value
      return "<i class='fa-regular fa-eye'></i>";
    };
    var codeFormat = function (cell, formatterParams, onRendered) {
      //plain text value
      return "<div class='fa-regular fa-eye'></div>";
    };
    var optionIcon = function (cell, formatterParams, onRendered) {
      //plain text value
      return '<i class="fa-solid fa-ellipsis-vertical"></i>';
    };

    var table = new Tabulator("#tableau-client", {
      downloadRowRange: "active",
      printHeader: "<h1>Clients<h1>",
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
        },
        { title: "Raison Sociale", field: "raisonSociale", width: 450 },
        { title: "Ville", field: "ville" },
        { title: "Nom Contact", field: "nomContact", hozAlign: "left" },
        { title: "Téléphone", field: "Téléphone" },
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
  },
});
