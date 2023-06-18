function ItemDTO(code,description,qty,price) {
    var __code=code;
    var __description=description;
    var __qty=qty;
    var __price=price;

    this.getItemCode=function () {
        return __code;
    }
    this.getDescription=function () {
        return __description;
    }
    this.getQty=function () {
        return __qty;
    }
    this.getPrice=function () {
        return __price;
    }

    this.setItemCode=function (newCode) {
        __code=newCode;
    }
    this.setDescription=function (newDescription) {
        __description=newDescription;
    }
    this.setQty=function (newQty) {
        __qty=newQty;
    }
    this.setPrice=function (newPrice) {
        __price=newPrice;
    }
}

