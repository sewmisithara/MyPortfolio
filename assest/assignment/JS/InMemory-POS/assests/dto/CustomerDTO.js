function CustomerDTO(id,name,address,age,salary) {
    var __id=id;
    var __name=name;
    var __address=address;
    var __age=age;
    var __salary=salary;

    this.getCustomerID = function () {
        return __id;
    }

    this.getCustomerName = function () {
        return __name;
    }

    this.getCustomerAddress = function () {
        return __address;
    }

    this.getCustomerAge = function () {
        return __age;
    }

    this.getCustomerSalary = function () {
        return __salary;
    }

    this.setCustomerID=function (newID) {
        __id=newID;
    }

    this.setCustomerName=function (newName) {
        __name=newName;
    }

    this.setCustomerAddress=function (newAddress) {
        __address=newAddress;
    }

    this.setCustomerAge=function (newAge) {
        __age=newAge;
    }

    this.setCustomerSalary=function (newSalary) {
        __salary=newSalary;
    }

}