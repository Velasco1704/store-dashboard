export interface Order {
  id: string;
  name: string;
  lastName: string;
  email: string;
  address: string;
  paypalOrderId: string;
  productId: string;
  amount: number;
  paid: boolean;
  sent: boolean;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    categoryId: string;
  };
}
