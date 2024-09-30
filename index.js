const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

const cookieParser = require("cookie-parser");
const cors = require("cors");

// midleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());


const uri = "mongodb+srv://data:b9y3jdHr2Qm6sz1B@cluster0.sozmemk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
      serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
      }
});

async function run() {
      try {
            await client.connect();
            // const productCollection = client.db("productBD").collection("product");
            const electricproductCollection = client.db("myData").collection("product");
            await client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");

            app.get("/product", async (req, res) => {
                  const result = await electricproductCollection.find().toArray();
                  res.send(result);
            });


      } finally {

      }
}
run().catch(console.dir);


app.get("/", (req, res) => {
      res.send("My Server is Running...");
});

app.listen(port, () => {
      console.log(`My Server is Running on port ${port}`);
});
