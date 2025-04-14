export interface UserType {
  _id?: string;
  name: string;
  username: string;
  role: string;
  email: string;
  password?: string;
  website?: string;
  about?: string;
  createdAt?: string;
}

export interface AuthResponseType {
  user?: Partial<UserType>;
  error?: string;
  loggedIn?: boolean;
}

export interface BlogType {
  _id?: string;
  user?: Partial<UserType>;
  title: string;
  content: string;
  category: string;
  excerpt?: string;
  imageUrl?: string;
  published?: boolean;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}
