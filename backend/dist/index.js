"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express = require("express");
const prisma = new client_1.PrismaClient();
const app = express();
// JSON middleware
app.use(express.json());
// CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
// Test API
app.get('/test', (req, res) => {
    try {
        res.status(200).json({ message: 'API is working' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Get all apartments
app.get('/apartments', async (req, res) => {
    try {
        const apartments = await prisma.apartment.findMany();
        res.status(200).json(apartments);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Get apartment by id
app.get('/apartments/:id', async (req, res) => {
    try {
        const apartment = await prisma.apartment.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });
        res.status(200).json(apartment);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Create apartment
app.post('/apartments', async (req, res) => {
    try {
        const apartment = await prisma.apartment.create({
            data: {
                name: req.body.name,
                description: req.body.description,
            },
        });
        res.status(201).json(apartment);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Update apartment
app.put('/apartments/:id', async (req, res) => {
    try {
        const apartment = await prisma.apartment.update({
            where: {
                id: Number(req.params.id),
            },
            data: {
                name: req.body.name,
                description: req.body.description,
            },
        });
        res.status(200).json(apartment);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Delete apartment
app.delete('/apartments/:id', async (req, res) => {
    try {
        const apartment = await prisma.apartment.delete({
            where: {
                id: Number(req.params.id),
            },
        });
        res.status(200).json(apartment);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=index.js.map