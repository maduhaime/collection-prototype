import { TicketCollection } from './collections/Tickets';
import type { Ticket } from './models/Ticket';
// import { createTicketProxy } from './proxies/TicketProxy';

const items: Ticket[] = [
  { id: 1, name: 'Broken link', type: 'Incident', date: new Date('2023-01-01'), prioritary: true, department: 'Finance', company: 'Apple' },
  { id: 2, name: 'Unable to open document', type: 'Support', date: new Date('2023-01-01'), prioritary: true, department: null },
  { id: 3, name: 'Create a PDF', type: 'Support', date: new Date('2024-12-24'), prioritary: false, department: null },
  { id: 4, name: 'Server not starting', type: 'Incident', date: new Date('2024-12-24'), prioritary: false, department: null },
];

const collection = new TicketCollection(items);

const yesterday: Date = new Date('2020-01-01');
const tomorrow: Date = new Date('2025-01-01');

collection.by_type('Support');
console.log(collection.items);
collection.reset();

collection.by_name('Server not starting');
console.log(collection.items);
collection.reset();

collection.occurs_between(yesterday, tomorrow);
console.log(collection.items);
collection.reset();

collection.field_equals('id', 2);
console.log(collection.items);
collection.reset();

collection.field_equals('name', 'bob');
console.log(collection.items);
collection.reset();

collection.field_equals('date', new Date('2024-12-24'));
console.log(collection.items);
collection.reset();

collection.scope('field_equals(name, Broken link)');
console.log(collection.items);
collection.reset();

collection.scope('by_type(Incident)');
console.log(collection.items);
collection.reset();

// Not params produce an error
collection.scope('by_type(Incident)|by_name(Broken link)');
console.log(collection.items);
collection.reset();

const result = collection.by_type('Incident').prioritary().sort('name', 'asc', 'string').items;
console.log(result);

// const proxy = createTicketProxy(items);

// proxy.scope('field_equals(name, Broken link)');
// console.log(proxy.items);
// proxy.reset();

// proxy.scope('by_type(Incident)');
// console.log(proxy.items);
// proxy.reset();

// // Not params produce an error
// proxy.scope('by_type(Incident)|by_name(Broken link)');
// console.log(proxy.items);
// proxy.reset();
