const memory = new Map();

export async function getItem(key) { return memory.get(key) ?? null; }
export async function setItem(key, value) { memory.set(key, value); }
export async function removeItem(key) { memory.delete(key); }
export async function clear() { memory.clear(); }
