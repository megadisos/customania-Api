// In src/index.js 
const express = require("express"); 
const mercadoPagoRouter= require("./v1/routes/mercadoPagoRoutes");
const cors = require("cors");

const app = express(); 
const PORT = process.env.PORT || 3001; 

app.use(cors()); 
app.use(express.json());

app.use("/api/v1/mercado-pago", mercadoPagoRouter);


app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
})