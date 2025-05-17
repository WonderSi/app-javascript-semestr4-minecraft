class ItemModel {
    constructor() {
        this.apiURL = 'https://minecraft-api.vercel.app/api';
        this.items = [];
    }

    async fetchAllItems() {
        const response = await fetch(`${this.apiURL}/items`)
        this.items = await response.json();
        return this.items;
    }

    getItemId(id) {
        return this.items.find(item => item.namespasedId === id)
    }

}

export default ItemModel;