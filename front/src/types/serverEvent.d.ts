
export interface ServerEvent extends Event {
    lastEventId: string;
    data: string;
    event: string;
}
