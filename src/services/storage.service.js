function store(key, data) {
    localStorage.setItem(key, JSON.stringify({ data, modifiedAt: Date.now() }));
}

function load(key) {
    return JSON.parse(localStorage.getItem(key))
}

export const storageService = {
    store,
    load
}