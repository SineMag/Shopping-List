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

export const updateItem = (id: number, name?: string, quantity?: number, purchasedStatus?: string): Item | undefined => {
    const itemIndex = items.findIndex(item => item.id === id);
    
    if (itemIndex === -1) {
        return undefined;
    }
    
    if (name !== undefined) {
        items[itemIndex].name = name;
    }
    if (quantity !== undefined) {
        items[itemIndex].quantity = quantity;
    }
    if (purchasedStatus !== undefined) {
        items[itemIndex].purchasedStatus = purchasedStatus;
    }
    
    return items[itemIndex];
}