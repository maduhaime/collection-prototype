// sum.test.js
import { describe, expect, test } from 'vitest';

import { TicketCollection } from '@/demo/collections/Tickets';
import { Ticket } from '@/demo/models/Ticket';

describe('TicketCollection', () => {
  const items: Ticket[] = [
    { id: 1, name: 'Broken link', type: 'Incident', date: new Date('2023-01-01'), prioritary: true, department: 'Finance', company: 'Apple' },
    { id: 2, name: 'Unable to open document', type: 'Support', date: new Date('2023-01-01'), prioritary: true, department: null, company: 'Apple' },
    { id: 3, name: 'Create a PDF', type: 'Support', date: new Date('2024-12-24'), prioritary: false, department: null },
    { id: 4, name: 'Server not starting', type: 'Incident', date: new Date('2024-12-24'), prioritary: false, department: null },
  ];

  test('Returns all items from the collection', () => {
    const collection = new TicketCollection(items);

    expect(collection.all().items).toBe(items);
  });

  test('Returns prioritary items from the collection', () => {
    const collection = new TicketCollection(items);

    expect(collection.prioritary().count).toBe(2);
  });

  test('Returns items by type', () => {
    const collection = new TicketCollection(items);

    expect(collection.by_type('Incident').count).toBe(2);
  });

  test('Returns items by name', () => {
    const collection = new TicketCollection(items);

    expect(collection.by_name('Broken link').count).toBe(1);
  });

  test('Returns items that occurs between', () => {
    const yesterday: Date = new Date('2020-01-01');
    const tomorrow: Date = new Date('2025-01-01');

    const collection = new TicketCollection(items);

    expect(collection.occurs_between(yesterday, tomorrow).count).toBe(4);
  });

  test('Returns items without deparment', () => {
    const collection = new TicketCollection(items);

    expect(collection.without_department().count).toBe(3);
  });

  test('Returns items without company', () => {
    const collection = new TicketCollection(items);

    expect(collection.without_company().count).toBe(2);
  });
});
