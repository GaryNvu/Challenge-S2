const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Router } = require('express');

const router = Router();

router.post('/create-payment-intent', async (req, res) => {
    const { total } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'eur',
            payment_method_types: ['card'],
            description: "Paiement de test pour commande fictive"
        });
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;