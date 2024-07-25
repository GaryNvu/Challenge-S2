const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

// Mocking Stripe module
jest.mock('stripe', () => {
    return jest.fn().mockImplementation(() => ({
      paymentIntents: {
        create: jest.fn().mockResolvedValue({
          clientSecret: 'some_random_secret' 
        })
      }
    }));
  });

const stripe = require('stripe')();
const stripeRoutes = require('../../routes/stripe'); 

const app = express();
app.use(bodyParser.json());
app.use(stripeRoutes);

describe('Stripe Payment Intent API', () => {
    it('should create a payment intent and return client secret', async () => {
      const mockAmount = 1000;
  
      const res = await request(app)
        .post('/create-payment-intent')
        .send({ total: mockAmount });
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ clientSecret: 'some_random_secret' });
      expect(stripe.paymentIntents.create).toHaveBeenCalledWith({
        amount: mockAmount,
        currency: 'eur',
        payment_method_types: ['card'],
        description: "Paiement de test pour commande fictive"
      });
    });
  });