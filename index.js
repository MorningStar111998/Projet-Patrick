const express = require("express");
const ejs = require("ejs");
const db = require("./utils/database");
const tableData = require("./utils/table-data");

const PORT = 3309;

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("accueil", { activePage: "accueil" });
});

app.get("/clients", (req, res) => {
  res.render("clients", { activePage: "clients" });
});

app.get("/fiche_a_facturer", (req, res) => {
  res.render("fiche_a_facturer", {
    activePage: "fiche_a_facturer",
  
  });
});


app.get("/mes_factures", (req, res) => {
    res.render("mes_factures", {
      activePage: "mes_factures",
    });
});

app.get("/tableau-fiche-data", (req, res) => {
  res.json(tableData.tabledataFiche);
});
app.get("/tableau-client-data", (req, res) => {
  res.json(tableData.tabledataClient);
});



//POST handlers
app.post("/fiche_a_facturer", (req, res) => {
  
  console.log("POST request received successfully!");
  
});

app.listen(PORT, () => {
  console.log("Server up and running on Port " + PORT);
});
