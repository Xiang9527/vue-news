let productDatas = {};

let prods = JSON.parse(window.localStorage.getItem('prods') || '{}');//LocalStorage獲得

productDatas.addOrUpate = function (p){
    if (prods[p.id]) {
        prods[p.id] += p.num;
    }else{
        prods[p.id] = p.num;
    }
    this.saveProd(prods);
}

productDatas.delete = function (id){
    delete prods[id];
    this.saveProd(prods);
}

productDatas.getProds = function (){
    return JSON.parse(window.localStorage.getItem('prods') || '{}');
}

productDatas.getTotalCount = function (){
    let sum = 0;
    for (let id in prods) {
        sum += prods[id];
    }
    return sum;
}

productDatas.saveProd = function (p){
    window.localStorage.setItem('prods',JSON.stringify(p));
}

export default productDatas;