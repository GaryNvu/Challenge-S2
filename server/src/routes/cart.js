const { Router } = require('express');
const { Cart, Product, User } = require('../models');

const router = Router();

router.get('/cart/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const cartItems = await Cart.findAll({
            where: { user_id: userId },
            include: [Product] 
        });

        res.json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/cart', async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const cartItem = await Cart.create({
            user_id: userId,
            product_id: productId,
            quantity: quantity
        });

        res.json({ message: 'Product added to cart successfully', cartItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/cart/:cartId', async (req, res) => {
    const { quantity } = req.body;

    try {
        const cartItem = await Cart.findByPk(req.params.cartId);
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        res.json({ message: 'Cart updated successfully', cartItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/cart/:cartId', async (req, res) => {
    try {
        const cartItem = await Cart.findByPk(req.params.cartId);
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        await cartItem.destroy();
        res.json({ message: 'Product removed from cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;