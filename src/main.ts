import { TicketCollection } from './collections/Tickets';
import type { Ticket } from './models/Ticket';

const items: Ticket[] = [
  { id: 1, name: 'Broken link', type: 'Incident', date: new Date('2023-01-01') },
  { id: 2, name: 'Unable to open document', type: 'Support', date: new Date('2023-01-01') },
  { id: 3, name: 'Create a PDF', type: 'Support', date: new Date('2024-12-24') },
  { id: 4, name: 'Server not starting', type: 'Incident', date: new Date('2024-12-24') },
];

const collection = new TicketCollection(items);

// const yesterday: Date = new Date('2020-01-01');
// const tomorrow: Date = new Date('2025-01-01');

// collection.by_type('Support');
// console.log(collection.items);
// collection.reset();

// collection.by_name('Server not starting');
// console.log(collection.items);
// collection.reset();

// collection.between_dates(yesterday, tomorrow);
// console.log(collection.items);
// collection.reset();

// collection.field_equals('id', 2);
// console.log(collection.items);
// collection.reset();

// collection.field_equals('name', 'bob');
// console.log(collection.items);
// collection.reset();

collection.field_equals('date', new Date('2024-12-24'));
console.log(collection.items);
collection.reset();

// collection.scope('field_equals(type, Incident)');
// console.log(collection.items);
// collection.reset();

// // Not params produce an error
// collection.scope('by_type(Incident)|by_name(Broken link)');
// console.log(collection.items);
// collection.reset();

// collection.scope('by_type(Incident)');
// console.log(collection.items);
// collection.reset();
