import { loadStripe } from '@stripe/stripe-js';

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
  }
  return stripePromise;
};

export default getStripe;