const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Product = require('../models/Product');

// Endpoint pour obtenir toutes les catégories avec les produits associés
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Ajoutez d'autres points d'entrée CRUD selon vos besoins

module.exports = router;
