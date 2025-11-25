export default class StoreModel{
    constructor(){
        this.product = [
            {id: 1, name: 'iphone XR', price: 1200, quantity: 7},
            {id: 2, name: 'Headset Redragon Zeus PRO', price: 299, quantity: 15},
            {id: 3, name: 'Monitor AOC 27POL, 144h', price:959, quantity: 12},
            {id: 4, name: 'Processador AMD Ryzen 5 5600X', price: 1349, quantity: 10}
        ]
    }
    getProduct(){
        return this.products;
    }

    getProductById(id){
        return this.products.find(product => product.id === id);
    }
}