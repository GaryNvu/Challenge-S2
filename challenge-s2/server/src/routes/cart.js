const { Router } = require('express');
const { User, Product } = require('../models');

const router = Router();

// Exemple de route pour ajouter un produit au panier de l'utilisateur
router.post('/add-to-cart', async (req, res) => {
    const { userId, productId } = req.body;

    try {
        // Rechercher l'utilisateur par ID
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Ajouter le productId au panier de l'utilisateur
        user.cart.push(productId);
        await user.save(); // Sauvegarder les modifications

        res.json({ message: 'Product added to cart successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;