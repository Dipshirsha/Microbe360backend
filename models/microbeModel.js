const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://dipshirshadatta:07032004D.d@cluster0.a6v6uom.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database");
     mongoose.set('strictQuery', false);
    // You can now define your Mongoose models and interact with the database
  })
  .catch(err => {
    console.error("Error connecting to the database:", err);
  });

const MicrobeSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String
});

const Microbe = mongoose.model('Microbe', MicrobeSchema);

app.get('/microbes', async (req, res) => {
    const microbes = await Microbe.find();
    res.json(microbes);
});

app.post('/microbes', async (req, res) => {
    const { name, description, imageUrl } = req.body;
    const newMicrobe = new Microbe({ name, description, imageUrl });
    await newMicrobe.save();
    res.json(newMicrobe);
});

app.listen(5000, () => console.log('Server running on port 5000'));