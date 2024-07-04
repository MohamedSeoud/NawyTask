// Removing HTTPS code and using HTTP for now
import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/test', (req, res) => {
  res.status(200).json({ message: 'API is working' });
});

app.get('/apartments', async (req, res) => {
  try {
    const apartments = await prisma.apartment.findMany();
    res.status(200).json(apartments);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

app.get('/apartments/:id', async (req, res) => {
  try {
    const apartment = await prisma.apartment.findUnique({
      where: { id: Number(req.params.id) },
    });
    res.status(200).json(apartment);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

app.post('/apartments', async (req, res) => {
  try {
    const apartment = await prisma.apartment.create({
      data: { 
         name: req.body.name,
         description: req.body.description,
         price:req.body.price,
         bed:req.body.bed,
         bathroom:req.body.bathroom,
         image:req.body.image
         },
    });
    res.status(201).json(apartment);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

app.put('/apartments/:id', async (req, res) => {
  try {
    const apartment = await prisma.apartment.update({
      where: { id: Number(req.params.id) },
      data: {          
        name: req.body.name,
        description: req.body.description,
        price:req.body.price,
        bed:req.body.bed,
        bathroom:req.body.bathroom,
        image:req.body.image
      },
    });
    res.status(200).json(apartment);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

app.delete('/apartments/:id', async (req, res) => {
  try {
    const apartment = await prisma.apartment.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(200).json(apartment);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
