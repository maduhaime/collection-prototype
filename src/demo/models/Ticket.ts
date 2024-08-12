// Constraints the allowed type of Ticket
export type TicketType = 'Incident' | 'Support';

export type Ticket = {
  id: number;
  name: string;
  type: TicketType;
  date: Date;
  prioritary: Boolean;
  department: string | null;
  company?: string;
};
