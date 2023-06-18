//Events................................................................................................................
$('#btnSave').click(function () {
    if( $('#txtCID').val()=="" ||
        $('#txtCustomerName').val()=="" ||
        $('#txtAddress').val()=="" ||
        $('#txtAge').val()=="" ||
        $('#txtSalary').val()==""
    ){
        alert('Please Fill the Fields..:(')
    }else{
        $('#tblCustomer>tr').off('click');
        $('#tblCustomer>tr').off('dblclick');

        let cusID = $("#txtCID").val();
        let cusName = $("#txtCustomerName").val();
        let cusAddress = $("#txtAddress").val();
        let cusAge = $("#txtAge").val();
        let cusSalary = $("#txtSalary").val();

        let res = saveCustomer(cusID, cusName, cusAddress, cusAge,cusSalary);
        if(res)clearText();

        $('#tblCustomer>tr').click(function () {
            console.log('table row clicked');
            let id = $(this).children('td:eq(0)').text();
            let name = $(this).children('td:eq(1)').text();
            let address = $(this).children('td:eq(2)').text();
            let age= $(this).children('td:eq(3)').text();
            let salary= $(this).children('td:eq(4)').text();

            $("#txtCID").val(id);
            $("#txtCustomerName").val(name);
            $("#txtAddress").val(address);
            $("#txtAge").val(age);
            $("#txtSalary").val(salary);

        });


        $("#tblCustomer>tr").on('dblclick',function (){
            $(this).remove();
        });
    }



});

$('#btnDelete').click(function () {
    let cusID=$('#txtCID').val();
    let check=confirm('Do you want to Delete This Customer?');
    if (check){
        let res=deleteCustomer(cusID);
        if (res){
            alert('Customer Deleted..');
        }else {
            alert('Delete Failed..!')
        }
    }

    loadAllCustomer();
    clearText();

});

$('#btnClearAll').click(function () {
    clearText();
});

$('#btnUpdate').click(function () {



    let cusID=$('#txtCID').val();
    let Name=$('#txtCustomerName').val();
    let Address=$('#txtAddress').val();
    let Age=$('#txtAge').val();
    let Salary=$('#txtSalary').val();

    let option=confirm('Do you Want to Update This Customer?');
    if(option){
        let res=updateCustomer(cusID,Name,Address,Age,Salary);
        if (res){
            alert("Customer Updated..!")
        }else {
            alert("Update Failed:(");
        }
    }

    loadAllCustomer();
    clearText();



});

$('#txtCID').on('keyup',function (eObj) {
    if(eObj.key=="Enter"){
        let customer=searchCustomer($(this).val());
        if (customer !=null){
            $('#txtCID').val(customer.getCustomerID());
            $('#txtCustomerName').val(customer.getCustomerName());
            $('#txtAddress').val(customer.getCustomerAddress());
            $('#txtAge').val(customer.getCustomerAge());
            $('#txtSalary').val(customer.getCustomerSalary());

        }else {
            clearText();
            alert('Customer Not Found..:(');
        }
    }
});

//Crud Operation........................................................................................................

/*Save Customer*/
function saveCustomer(id,name,address,age,salary) {
    let customer  = new CustomerDTO(id,name,address,age,salary);
    customerTable.push(customer);

    loadAllCustomer();

    return true;
}

/*Search Customer*/
function searchCustomer(id) {
    for (var i in customerTable){
        if(customerTable[i].getCustomerID()===id)return customerTable[i];
    }
    return null;
}

/*Delete Customer*/
function deleteCustomer(id) {
    let customer = searchCustomer(id);
    if(customer!=null){
        let indexNumber =customerTable.indexOf(customer);
        customerTable.splice(indexNumber,1);
        return true;
    }else{
        return false;
    }
}

/*Update Customer*/
function updateCustomer(id,name,address,age,salary) {
    let customer=searchCustomer(id);
    if (customer != null){
        customer.setCustomerName(name)
        customer.setCustomerAddress(address)
        customer.setCustomerAge(age);
        customer.setCustomerSalary(salary);
        return true;
    }else {
        return false;
    }
}

/*getAllCustomer*/
function getAllCustomers() {
    return customerTable;
}

/*Load Table*/
function loadAllCustomer() {
    let allCustomers = getAllCustomers();
    $('#tblCustomer').empty();
    for (var i in allCustomers) {
        let id = allCustomers[i].getCustomerID();
        let name = allCustomers[i].getCustomerName();
        let address = allCustomers[i].getCustomerAddress();
        let age = allCustomers[i].getCustomerAge();
        let salary = allCustomers[i].getCustomerSalary();

        var row = `<tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${age}</td><td>${salary}</td></tr>`;
        $('#tblCustomer').append(row);
    }
}

// Other Function.......................................................................................................

/*Clear Fields*/
function clearText() {
    $("#txtCID").val("");
    $("#txtCustomerName").val("");
    $("#txtAddress").val("");
    $("#txtAge").val("");
    $("#txtSalary").val("");
}

// Validation...........................................................................................................

/*Prevent Default*/
$('#txtCID,#txtCustomerName,#txtAddress,#txtAge,#txtSalary').on('keydown',function (event) {
    if(event.key=='Tab'){
        event.preventDefault();
    }
});


/*Customer Form Validate*/
$("#txtCID").on('keyup',function (event){
    let cusRegEx=/^(C00)[1-9]{1,3}$/;
    if (event.key=="Enter"){
        $('#txtCustomerName').focus();
    }

    let inputID=$("#txtCID").val();
    if (cusRegEx.test(inputID)){
        $("#txtCID").css('border','2px solid green');
        $("#lblCusID").text("");
    }else{
        $("#txtCID").css('border','2px solid red');
        $("#lblCusID").text('Your Input Data Format is Wrong (C001)');
    }
});

$("#txtCustomerName").on('keydown',function (event){
    let RegEx=/^[a-zA-Z ]*$/;

    if (event.key=="Enter"){
        $('#txtAddress').focus();
    }

    let name=$('#txtCustomerName').val();
    if (RegEx.test(name)){
        $('#txtCustomerName').css('border','2px solid green');
        $("#lblCusName").text('');
    }else{
        $('#txtCustomerName').css('border','2px solid red');
        $("#lblCusName").text('Enter Your Name using letters a-Z');
    }
});

$("#txtAddress").on('keydown',function (event){
    let RegEx=/^[a-zA-Z0-9', ]*$/;
    if (event.key=="Enter"){
        $('#txtAge').focus();
    }
    let name=$('#txtAddress').val();
    if (RegEx.test(name)){
        $('#txtAddress').css('border','2px solid green');
        $("#lblAddress").text("");
    }else{
        $('#txtAddress').css('border','2px solid red');
        $("#lblAddress").text('Please Input Correct Format');
    }
});

$("#txtAge").on('keydown',function (event){
    let RegEx=/^[0-9]{1,2}$/;
    if (event.key=="Enter"){
        $('#txtSalary').focus();
    }

    let name=$('#txtAge').val();
    if (RegEx.test(name)){
        $('#txtAge').css('border','2px solid green');
        $("#lblAge").text('');
    }else{
        $('#txtAge').css('border','2px solid red');
        $("#lblAge").text('Please Input Your Age');
    }
});

$('#txtSalary').on('keydown',function (event) {
    let RegEx=/^[0-9]{1,4}$/;
    if (event.key=="Enter"){
        /*saveCustomer();*/
    }

    let salary=$('#txtSalary').val();
    if (RegEx.test(salary)){
        $('#txtSalary').css('border','2px solid green');
        $("#lblSalary").text('');
    }else{
        $('#txtSalary').css('border','2px solid red');
        $("#lblSalary").text('Please Input Your Monthly Salary');
    }
});

