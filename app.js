// Backend - server.js (Node.js + Express + MongoDB)
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';



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
    image: String
});

const Microbe = mongoose.model('Microbe', MicrobeSchema);

app.get('/microbesfetch', async (req, res) => {
    const microbes = await Microbe.find();
    res.json(microbes);
});

app.post('/api/microbes', async (req, res) => {
    const { name, description, image } = req.body;
    const newMicrobe = new Microbe({ name, description, image });
    await newMicrobe.save();
    res.json(newMicrobe);
});

app.get("/api/microbes/search", async (req, res) => {
  try {
      const { query } = req.query;
      const microbes = await Microbe.find({ name: { $regex: query, $options: "i" } });
      res.json(microbes);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));