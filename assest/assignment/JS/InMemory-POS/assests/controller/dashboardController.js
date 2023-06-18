hideAll();

$('#Dashboard-Content').css('display','block');

$('#Item-button').click(function () {
    hideAll();
    $('#Item-Content').css('display','block');
});

$('#customer-button').click(function () {
    hideAll();
    $('#Customer-Content').css('display','block');
});

$('#report-button').click(function () {
    hideAll();
    $('#Order-Content').css('display','block');
    genarateOrderID();
    loadAllCus();
    loadAllIt();
});

$('#setting-button').click(function () {
    hideAll();
    $('#Report-Content').css('display','block');
});

function hideAll() {
    $("#Dashboard-Content,#Item-Content,#Customer-Content,#Order-Content,#Report-Content").css('display','none');
}