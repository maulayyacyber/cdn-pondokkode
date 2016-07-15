// deklarasi path url host
var url = window.location.origin+"/developers/dashboard/";

//fungsi goback
function goBack()
{
    window.history.back();
}

// Modal Aktivasi Project
$(".modal-aktivasi-project").click(function(){ // Click to only happen on announce links
     $("#id_project").val($(this).data('id'));
     $("#status_project").val($(this).data('status'));
     document.getElementById("judul_project").innerHTML = $(this).data('nama');
     $('#ModalAktivasiProject').modal('show');
});

// Modal Delete Project
$(".modal-delete-project").click(function(){ // Click to only happen on announce links
     $("#id_project").val($(this).data('id'));
     document.getElementById("project_judul").innerHTML = addslashes($(this).data('nama'));
     $('#ModalDeleteProject').modal('show');
});

// Aksi Aktivasi Project
function AktivasiProject(id_project, status)
{
    window.location.href = base_url+"dashboard/project/activated/"+id_project+"/"+status;
}

// Aksi Delete Project
function DeleteProject(id_project)
{
    window.location.href = base_url+"dashboard/project/delete/"+id_project;
}

function addslashes(string) {
    return string.replace(/\\/g, '\\\\').
        replace(/\u0008/g, '\\b').
        replace(/\t/g, '\\t').
        replace(/\n/g, '\\n').
        replace(/\f/g, '\\f').
        replace(/\r/g, '\\r').
        replace(/'/g, '\\\'').
        replace(/"/g, '\\"');
}

// Fungsi Popup Window
function popupWindow(win,trget){
    var winWidth, winHeight =400;
    newWindow = window.open(win,trget,'toolbar=no,location=no,scrollbars=no,resizable=yes,width='+winWidth+',height='+winHeight+',left=0,top=0');
    newWindow.focus();
}

/**
* chart visitor
* pondokkode - Web Project Development
*/
// Get data chart
function GetToday(tgl)
{
    var dataString = 'tgl='+ tgl;
    $.ajax({
    type: "POST",
    url: url+"home/get_chart_today",
    data: dataString,
    dataType: 'json',
    cache: false,
    success: function(data){
        var jam = data.jam;
        var total = data.total;
        show_chart('Pengunjung Hari Ini',jam, total);
    }
    });
}

function GetWeek(tgl1, tgl2)
{
    var dataString = 'tgl1='+ tgl1 + '&tgl2='+ tgl2;
    $.ajax({
    type: "POST",
    url: url+"home/get_chart_week",
    data: dataString,
    dataType: 'json',
    cache: false,
    success: function(data){
        var tgl = data.tgl;
        var total = data.total;
        show_chart('Pengunjung Minggu Ini',tgl, total);
    }
    });
}

function GetMonth(tgl)
{
    var dataString = 'tgl='+ tgl;
    $.ajax({
    type: "POST",
    url: url+"home/get_chart_month",
    data: dataString,
    dataType: 'json',
    cache: false,
    success: function(data){
        var tgl = data.tgl;
        var total = data.total;
        show_chart('Pengunjung Bulan Ini',tgl, total);
    }
    });
}

function GetAllTime()
{
    $.ajax({
    type: "POST",
    url: url+"home/get_chart_all",
    cache: false,
    dataType: 'json',
    success: function(data){
        var tgl = data.tgl;
        var total = data.total;
        show_chart('Pengunjung Setiap Tahun',tgl, total);
    }
    });
}

function show_chart(text, kat, total)
{
    $('#container').highcharts({

        title: {
            text: text,
            x: -20 //center
        },
        subtitle: {
            text: 'source : https://pondokkode.com',
            x: -20
        },
        xAxis: {
            categories: kat
        },
        yAxis: {
            title: {
                text: 'Total Pengunjung'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: ' Orang'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Pengunjung',
            data: total
        }]
    });
}

// Collapse all tree akses menu load
$('.tree-toggle', $('#tree_1 > li > ul')).addClass("closed");
$('.branch', $('#tree_1 > li > ul')).removeClass("in");

/**
* Toastr Function
* pondokkode - Web Project Development
*/
function PesanNotif(tipe, judul, pesan)
{
    var shortCutFunction = tipe;
    var msg = pesan;
    var title = judul || '';
    var showDuration = "1000";
    var hideDuration = "1000";
    var timeOut = "5000";
    var extendedTimeOut = "1000";
    var showEasing = "swing";
    var hideEasing = "linear";
    var showMethod = "slideDown";
    var hideMethod = "slideUp";

    toastr.options = {
        closeButton: false,
        debug: false,
        positionClass: 'toast-bottom-right' || 'toast-top-right',
        onclick: null
    };

    if (showDuration.length) {
        toastr.options.showDuration = showDuration;
    }

    if (hideDuration.length) {
        toastr.options.hideDuration = hideDuration;
    }

    if (timeOut.length) {
        toastr.options.timeOut = timeOut;
    }

    if (extendedTimeOut.length) {
        toastr.options.extendedTimeOut = extendedTimeOut;
    }

    if (showEasing.length) {
        toastr.options.showEasing = showEasing;
    }

    if (hideEasing.length) {
        toastr.options.hideEasing = hideEasing;
    }

    if (showMethod.length) {
        toastr.options.showMethod = showMethod;
    }

    if (hideMethod.length) {
        toastr.options.hideMethod = hideMethod;
    }

    if (!msg) {
        msg = getMessage();
    }

    $("#toastrOptions").text("Command: toastr[" + shortCutFunction + "](\"" + msg + (title ? "\", \"" + title : '') + "\")\n\ntoastr.options = " + JSON.stringify(toastr.options, null, 2));

    var $toast = toastr[shortCutFunction](msg, title); // Wire up an event handler to a button in the toast, if it exists
    $toastlast = $toast;
}

/**
* Toastr Function
* pondokkode - Web Project Development
*/
function loginGagal(tipe, judul, pesan)
{
    var shortCutFunction = tipe;
    var msg = pesan;
    var title = judul || '';
    var showDuration = "1000";
    var hideDuration = "1000";
    var timeOut = "5000";
    var extendedTimeOut = "1000";
    var showEasing = "swing";
    var hideEasing = "linear";
    var showMethod = "slideDown";
    var hideMethod = "slideUp";

    toastr.options = {
        closeButton: false,
        debug: false,
        positionClass: 'toast-top-right',
        onclick: null
    };

    if (showDuration.length) {
        toastr.options.showDuration = showDuration;
    }

    if (hideDuration.length) {
        toastr.options.hideDuration = hideDuration;
    }

    if (timeOut.length) {
        toastr.options.timeOut = timeOut;
    }

    if (extendedTimeOut.length) {
        toastr.options.extendedTimeOut = extendedTimeOut;
    }

    if (showEasing.length) {
        toastr.options.showEasing = showEasing;
    }

    if (hideEasing.length) {
        toastr.options.hideEasing = hideEasing;
    }

    if (showMethod.length) {
        toastr.options.showMethod = showMethod;
    }

    if (hideMethod.length) {
        toastr.options.hideMethod = hideMethod;
    }

    if (!msg) {
        msg = getMessage();
    }

    $("#toastrOptions").text("Command: toastr[" + shortCutFunction + "](\"" + msg + (title ? "\", \"" + title : '') + "\")\n\ntoastr.options = " + JSON.stringify(toastr.options, null, 2));

    var $toast = toastr[shortCutFunction](msg, title); // Wire up an event handler to a button in the toast, if it exists
    $toastlast = $toast;
}


/**
* Toastr Function
* pondokkode - Web Project Development
*/
function LoginSiswa(tipe, judul, pesan)
{
    var shortCutFunction = tipe;
    var msg = pesan;
    var title = judul || '';
    var showDuration = "1000";
    var hideDuration = "1000";
    var timeOut = "5000";
    var extendedTimeOut = "1000";
    var showEasing = "swing";
    var hideEasing = "linear";
    var showMethod = "slideDown";
    var hideMethod = "slideUp";

    toastr.options = {
        closeButton: false,
        debug: false,
        positionClass: 'toast-top-left',
        onclick: null
    };

    if (showDuration.length) {
        toastr.options.showDuration = showDuration;
    }

    if (hideDuration.length) {
        toastr.options.hideDuration = hideDuration;
    }

    if (timeOut.length) {
        toastr.options.timeOut = timeOut;
    }

    if (extendedTimeOut.length) {
        toastr.options.extendedTimeOut = extendedTimeOut;
    }

    if (showEasing.length) {
        toastr.options.showEasing = showEasing;
    }

    if (hideEasing.length) {
        toastr.options.hideEasing = hideEasing;
    }

    if (showMethod.length) {
        toastr.options.showMethod = showMethod;
    }

    if (hideMethod.length) {
        toastr.options.hideMethod = hideMethod;
    }

    if (!msg) {
        msg = getMessage();
    }

    $("#toastrOptions").text("Command: toastr[" + shortCutFunction + "](\"" + msg + (title ? "\", \"" + title : '') + "\")\n\ntoastr.options = " + JSON.stringify(toastr.options, null, 2));

    var $toast = toastr[shortCutFunction](msg, title); // Wire up an event handler to a button in the toast, if it exists
    $toastlast = $toast;
}
