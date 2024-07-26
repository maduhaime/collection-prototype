import { TicketCollection } from './collections/Tickets';
import type { Ticket } from './models/Ticket';

const items: Ticket[] = [
  { id: 1, name: 'Broken link', type: 'Incident', date: new Date() },
  { id: 2, name: 'Unable to open document', type: 'Support', date: new Date() },
  { id: 3, name: 'Create a PDF', type: 'Support', date: new Date() },
  { id: 4, name: 'Server not starting', type: 'Incident', date: new Date() },
];

const collection = new TicketCollection(items);

const yesterday: Date = new Date('2024-01-01');
const tomorrow: Date = new Date('2025-01-01');

// let result = [];

collection.by_type('Support');
console.log(collection.items);
collection.reset();

collection.by_name('Server not starting');
console.log(collection.items);
collection.reset();

collection.between_dates(yesterday, tomorrow);
console.log(collection.items);
collection.reset();

collection.field_equals('id', 2);
console.log(collection.items);
collection.reset();

collection.field_equals('name', 'bob');
console.log(collection.items);
collection.reset();

collection.field_equals('date', new Date());
console.log(collection.items);
collection.reset();
