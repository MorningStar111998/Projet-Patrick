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

app.get("/fiche_a_charger", (req, res) => {
  res.render("fiche_a_charger", {
    activePage: "fiche_a_charger",
  
  });
});


app.get("/mes_factures", (req, res) => {
    res.render("mes_factures", {
      activePage: "mes_factures",
    });
});

app.get("/mes_fours", (req, res) => {
  res.render("mes_fours", {
    activePage: "mes_fours",
  });
});

app.get("/tableau-fiche-data", (req, res) => {
  res.json(tableData.tabledataFiche);
});
app.get("/tableau-client-data", (req, res) => {
  res.json(tableData.tabledataClient);
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
