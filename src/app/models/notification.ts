export interface NotificationI{
    notification: NotI;
    to: string;
}

export interface NotI{
    title: string;
    body: string;
    icon: string;
}