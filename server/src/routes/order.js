const { Router } = require('express');
const { Order, OrderItem, User, Product } = require('../models');
const { Op } = require('sequelize');

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

router.get('/order/user/:userId', async (req, res) => {
    const { userId } = req.params;
    const { page = 1, limit = 5, status, date, total } = req.query;

    const queryOptions = {
        where: { userId: userId },
        include: [{
            model: OrderItem,
            include: [Product]
        }],
        limit: parseInt(limit),
        offset: (parseInt(page) - 1) * parseInt(limit),
        order: [['createdAt', 'DESC']]
    };

    // Apply filters
    if (status) {
        queryOptions.where.status = status;
    }
    if (date) {
        queryOptions.where.createdAt = { [Op.eq]: new Date(date) };
    }
    if (total) {
        queryOptions.where.total = { [Op.eq]: parseFloat(total) };
    }

    try {
        const orders = await Order.findAndCountAll(queryOptions);

        if (!orders || orders.rows.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }
        res.json({
            data: orders.rows,
            total: orders.count,
            totalPages: Math.ceil(orders.count / limit),
            currentPage: parseInt(page)
        });
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

router.patch('/order/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.json({ message: 'Order status updated successfully', order });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Unable to update order status' });
    }
});

router.delete('/order/:id/status', async (req, res) => {
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