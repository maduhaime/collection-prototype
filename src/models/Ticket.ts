export type TicketType = 'Incident' | 'Support';

export type Ticket = {
  id: number;
  name: string;
  type: TicketType;
  date: Date;
};
