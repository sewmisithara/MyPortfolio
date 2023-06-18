//Events................................................................................................................
$('#btnSaveItem').click(function () {

    $('#tblItem>tr').off('click');
    $('#tblItem>tr').off('dblclick');

    let itemCode = $("#txtItemCode").val();
    let description = $("#txtDescription").val();
    let qty = $("#txtQty").val();
    let price = $("#txtPrice").val();

    let res = saveItem(itemCode,description,qty,price);
    if(res)clearTextItems();

    $('#tblItem>tr').click(function () {
        let code = $(this).children('td:eq(0)').text();
        let des = $(this).children('td:eq(1)').text();
        let qtyH = $(this).children('td:eq(2)').text();
        let unitPrice = $(this).children('td:eq(3)').text();

        $("#txtItemCode").val(code);
        $("#txtDescription").val(des);
        $("#txtQty").val(qtyH);
        $("#txtPrice").val(unitPrice);

    });


    $("#tblItem>tr").on('dblclick',function (){
        $(this).remove();
    });

});

$('#btnDeleteItem').click(function () {


    let code=$('#txtItemCode').val();
    let check=confirm('Do you want to Delete This Item?');
    if (check){
        let res=deleteItem(code);
        if (res){
            alert('Item Deleted..');
        }else {
            alert('Delete Failed..!')
        }
    }

    loadAllItems();
    clearTextItems();



});

$('#btnUpdateItem').click(function () {

    $('#tblItem>tr').off('click');
    $('#tblItem>tr').off('dblclick');

    let code=$('#txtItemCode').val();
    let des=$('#txtDescription').val();
    let qty=$('#txtQty').val();
    let price=$('#txtPrice').val();

    let option=confirm('Do you Want to Update This Item?');
    if(option){
        let res=updateItem(code,des,qty,price);
        if (res){
            alert("Item Updated..!")
        }else {
            alert("Update Failed:(");
        }
    }

    loadAllItems();
    clearText();

    $('#tblItem>tr').click(function () {
        let code = $(this).children('td:eq(0)').text();
        let des = $(this).children('td:eq(1)').text();
        let qtyH = $(this).children('td:eq(2)').text();
        let unitPrice = $(this).children('td:eq(3)').text();

        $("#txtItemCode").val(code);
        $("#txtDescription").val(des);
        $("#txtQty").val(qtyH);
        $("#txtPrice").val(unitPrice);

    });


    $("#tblItem>tr").on('dblclick',function (){
        $(this).remove();
    });
});

$('#btnClearAllItem').click(function () {
    clearTextItems();
});

$('#txtItemCode').on('keyup',function (eObj) {
    if(eObj.key=="Enter"){
        let item=searchItem($(this).val());
        if (item !=null){
            $('#txtItemCode').val(item.getItemCode());
            $('#txtDescription').val(item.getDescription());
            $('#txtQty').val(item.getQty());
            $('#txtPrice').val(item.getPrice());

        }else {
            alert("Item Not Found:(");
            clearText();
        }
    }
});

//Crud Operation........................................................................................................

/*Save Item*/
function saveItem(code,description,qty,price) {
    let item  = new ItemDTO(code,description,qty,price);
    itemTable.push(item);

    loadAllItems();
    return true;
}

/*getAllItems*/
function getAllItems() {
    return itemTable;
}

/*LoadTable*/
function loadAllItems() {
    let allItems=getAllItems();
    $('#tblItem').empty();
    for(var i in allItems){
        let itemCode=allItems[i].getItemCode();
        let description=allItems[i].getDescription();
        let qty=allItems[i].getQty();
        let price=allItems[i].getPrice();

        var row = `<tr><td>${itemCode}</td><td>${description}</td><td>${qty}</td><td>${price}</td></tr>`;
        $('#tblItem').append(row);
    }


}

/*Search Item*/
function searchItem(code) {
    for (var i in itemTable){
        if (itemTable[i].getItemCode()==code) return itemTable[i];
    }
    return null;
}

/*Delete Item*/
function deleteItem(code) {
    let item=searchItem(code);
    if (item!=null){
        let indexNum=itemTable.indexOf(item);
        itemTable.splice(indexNum,1);
        return true;
    }else{
        return false;
    }
}

/*Update Item*/
function updateItem(code,description,qty,price) {
    let item=searchItem(code);
    if(item != null){
        item.setDescription(description)
        item.setQty(qty)
        item.setPrice(price);
        return true;
    }else{
        return false;
    }
}

//Other Functions.......................................................................................................

/*ClearFields*/
function clearTextItems(){
    $("#txtItemCode").val("");
    $("#txtDescription").val("");
    $("#txtQty").val("");
    $("#txtPrice").val("");

}

// Validation...........................................................................................................

/*Prevent Default*/
$('#txtItemCode,#txtDescription,#txtQty,#txtPrice').on('keydown',function (event) {
    if(event.key=='Tab'){
        event.preventDefault();
    }
});

/*Customer Form Validate*/
$("#txtItemCode").on('keyup',function (event){
    let ItemRegEx=/^(I00)[0-9]{1,3}$/;
    if (event.key=="Enter"){
        $('#txtDescription').focus();
    }

    let inputID=$("#txtItemCode").val();
    if (ItemRegEx.test(inputID)){
        $("#txtItemCode").css('border','2px solid green');
        $("#lblCode").text('');
    }else{
        $("#txtItemCode").css('border','2px solid red');
        $("#lblCode").text('Your Input Data Format is Wrong (I001)');
    }
});

$("#txtDescription").on('keydown',function (event){
    let RegEx=/^[a-zA-Z ]*$/;

    if (event.key=="Enter"){
        $('#txtQty').focus();
    }

    let name=$('#txtDescription').val();
    if (RegEx.test(name)){
        $('#txtDescription').css('border','2px solid green');
        $("#lblDes").text('');
    }else{
        $('#txtDescription').css('border','2px solid red');
        $("#lblDes").text('Please Input Item name');
    }
});

$("#txtQty").on('keydown',function (event){
    let RegEx=/^[0-9]{1,4}$/;
    if (event.key=="Enter"){
        $('#txtPrice').focus();
    }
    let name=$('#txtQty').val();
    if (RegEx.test(name)){
        $('#txtQty').css('border','2px solid green');
        $("#lblQty").text('');
    }else{
        $('#txtQty').css('border','2px solid red');
        $("#lblQty").text('Please Enter Qty');
    }
});

$("#txtPrice").on('keydown',function (event){
    let RegEx=/^[0-9]{1,5}$/;
    if (event.key=="Enter"){
        saveItem();
    }

    let name=$('#txtPrice').val();
    if (RegEx.test(name)){
        $('#txtPrice').css('border','2px solid green');
        $("#lblPrice").text('');
    }else{
        $('#txtPrice').css('border','2px solid red');
        $("#lblPrice").text('Please Input Unit Price');
    }
});