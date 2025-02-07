import Stripe from 'stripe';


if (!process.env.STRIPE_SECRET_KEY){
    throw new Error('strip key is not available')
} 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15', 
});

export default stripe;