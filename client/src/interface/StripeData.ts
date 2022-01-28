export interface StripeData {
  success: {
    stripeAccount: {
      object: string;
      created: number;
      expires_at: number;
      url: string;
    };
  };
}
