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
};

export interface AuthResponseType {
    user?: Partial<UserType>;
    error?: string;
    loggedIn?: boolean;
}