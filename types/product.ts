export interface Publisher {
  name: string;
  email: string;
  role: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string; // optional
  publisher: Publisher;
  createdAt?: string; // optional, if you want to store creation date
}

