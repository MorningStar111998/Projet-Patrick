const express = require("express");
const ejs = require("ejs");
const tableData = require("./utils/table-data");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3310;

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

app.get("/factures", (req, res) => {
  res.render("factures", {
    activePage: "factures",
  });
});

app.get("/fiche_a_charger", (req, res) => {
  res.render("fiche_a_charger", {
    activePage: "fiche_a_charger",
  });
});

app.get("/mes_charges", (req, res) => {
  res.render("mes_charges", {
    activePage: "mes_charges",
  });
});

app.get("/mes_fours", (req, res) => {
  res.render("mes_fours", {
    activePage: "mes_fours",
  });
});


app.get("/tableau-client-data", (req, res) => {
  res.json(tableData.tabledataClient);
});
app.get("/tableau-fiche-a-charger-data", (req, res) => {
  res.json(tableData.tabledataFicheCharger);
});
app.get("/tableau-mes-charges-data", (req, res) => {
  res.json(tableData.tabledataMesCharges);
});
app.get("/tableau-fiche-a-facturer-data", (req, res) => {
  res.json(tableData.tabledataFicheFacturer);
});
app.get("/tableau-factures-data", (req, res) => {
  res.json(tableData.tabledataFactures);
});
app.get("/tableau-four-data", (req, res) => {
  res.json(tableData.tabledataFour);
});

//POST handlers
app.post("/fiche_a_facturer", (req, res) => {
  console.log("POST request received successfully!");
});

app.post("/fiche_a_charger", (req, res) => {
  console.log("POST request received successfully!");
});

app.listen(PORT, () => {
  console.log("Server up and running on Port " + PORT);
});
