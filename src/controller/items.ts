import { Item } from '../models/item';

// In-memory storage for items
let items: Item[] = []

let currentId = 1;

export const getItems = (): Item[] => {
    return items;
}

export const getItemById = (id: number): Item | undefined => {
    const item = items.find(item => item.id === id);
    return item;
}

export const addItem = (name: string, quantity: number, purchasedStatus: string): Item => {
    const newItem: Item = {
        id: currentId++,
        name,
        quantity,
        purchasedStatus
    }
    items.push(newItem);
    return newItem;
}