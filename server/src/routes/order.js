const { Router } = require('express');
const { Order, OrderItem, User, Product } = require('../models');

const router = Router();

router.get('/order', async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unable to fetch orders' });
    }
});

router.get('/order/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id, {
            include: [{
                model: OrderItem,
                include: [Product]
            }]
        });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unable to fetch order' });
    }
});

router.post('/order', async (req, res) => {
    const { userId, cartItems, address, total, paymentMethod, shippingFee, discountCode, taxAmount } = req.body;

    try {
        const newOrder = await Order.create({
            userId,
            address,
            total,
            paymentMethod,
            shippingFee,
            discountCode,
            taxAmount
        });

        for (const item of cartItems) {
            const product = await Product.findByPk(item.productId);
            await OrderItem.create({
                orderId: newOrder.id,
                productId: item.productId,
                quantity: item.quantity,
                price: product.price,
                total: product.price * item.quantity
            });
        }
        res.status(201).json(newOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unable to create order' });
    }
});

router.delete('/order/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        await order.destroy();
        res.json({ message: 'Order deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unable to delete order' });
    }
});

router.post('/order-items', async (req, res) => {
    const { orderId, productId, quantity, price } = req.body;
    try {
        const orderItem = await OrderItem.create({
            orderId,
            productId,
            quantity,
            price,
            total: price * quantity
        });
        res.status(201).json(orderItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unable to add order item' });
    }
});

router.delete('/order-items/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const orderItem = await OrderItem.findByPk(id);
        if (!orderItem) {
            return res.status(404).json({ message: 'Order item not found' });
        }
        await orderItem.destroy();
        res.json({ message: 'Order item deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unable to delete order item' });
    }
});

module.exports = router;