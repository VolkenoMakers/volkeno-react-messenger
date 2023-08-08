export type User = {
    id: number,
    name: string,
    lastName: string,
    email: string,
    avatar: string,
}
export type Chat = {
    id: number;
    slug: string;
    content: string;
    read: boolean;
    is_read: boolean;
    media?: string;
    sender: User;
    recever: User;
    created_at: string;
};