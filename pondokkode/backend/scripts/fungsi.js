// deklarasi path url host
var url = window.location.origin+"/authorize/authorize/";

//fungsi goback
function goBack()
{
    window.history.back();
}

// Fungsi Popup Window
function popupWindow(win,trget){
    var winWidth, winHeight =400;
    newWindow = window.open(win,trget,'toolbar=no,location=no,scrollbars=no,resizable=yes,width='+winWidth+',height='+winHeight+',left=0,top=0');
    newWindow.focus();
}

/**
* Modal Function
* pondokkode - Web Project Development
*/

/** modal delete */
// Modal Delete User
$(".modal-delete-user").click(function(){ // Click to only happen on announce links
     $("#id_user_modal").val($(this).data('id'));
     document.getElementById("nama_user").innerHTML = addslashes($(this).data('nama'));
     $('#ModalDeleteUser').modal('show');
});

// Modal Delete Blog
$(".modal-delete-blog").click(function(){ // Click to only happen on announce links
     $("#id_blog").val($(this).data('id'));
     document.getElementById("blog_judul").innerHTML = addslashes($(this).data('nama'));
     $('#ModalDeleteBlog').modal('show');
});

// Modal Delete Tutorial
$(".modal-delete-tutorial").click(function(){ // Click to only happen on announce links
     $("#id_tutorial").val($(this).data('id'));
     document.getElementById("tutorial_judul").innerHTML = addslashes($(this).data('nama'));
     $('#ModalDeleteTutorial').modal('show');
});

// Modal Delete Meme
$(".modal-delete-meme").click(function(){ // Click to only happen on announce links
     $("#id_meme").val($(this).data('id'));
     document.getElementById("meme_judul").innerHTML = addslashes($(this).data('nama'));
     $('#ModalDeleteMeme').modal('show');
});

// Modal Delete Quotes
$(".modal-delete-quotes").click(function(){ // Click to only happen on announce links
     $("#id_quotes").val($(this).data('id'));
     document.getElementById("quotes_judul").innerHTML = addslashes($(this).data('nama'));
     $('#ModalDeleteQuotes').modal('show');
});

// Modal Delete Project
$(".modal-delete-project").click(function(){ // Click to only happen on announce links
     $("#id_project").val($(this).data('id'));
     document.getElementById("project_judul").innerHTML = addslashes($(this).data('nama'));
     $('#ModalDeleteProject').modal('show');
});

// Modal Delete Subscribe
$(".modal-delete-subscribe").click(function(){ // Click to only happen on announce links
     $("#id_subscribe").val($(this).data('id'));
     document.getElementById("subscribe_judul").innerHTML = addslashes($(this).data('nama'));
     $('#ModalDeleteSubscribe').modal('show');
});

// Modal Delete Testimoni
$(".modal-delete-feedback").click(function(){ // Click to only happen on announce links
     $("#id_feedback").val($(this).data('id'));
     document.getElementById("nama_feedback").innerHTML = addslashes($(this).data('nama'));
     $('#ModalDeleteFeedback').modal('show');
});

// Modal Delete Developers
$(".modal-delete-developers").click(function(){ // Click to only happen on announce links
     $("#id_developers").val($(this).data('id'));
     document.getElementById("nama_developers").innerHTML = addslashes($(this).data('nama'));
     $('#ModalDeleteDevelopers').modal('show');
});

// Modal Delete Bug
$(".modal-delete-bug").click(function(){ // Click to only happen on announce links
     $("#id_bug").val($(this).data('id'));
     document.getElementById("nama").innerHTML = addslashes($(this).data('nama'));
     $('#ModalDeleteBug').modal('show');
});

/** modal aktivasi **/
// Modal Aktivasi User
$(".modal-aktivasi-user").click(function(){ // Click to only happen on announce links
     $("#id_user_modal").val($(this).data('id'));
     $("#status_user_modal").val($(this).data('status'));
     document.getElementById("user_nama").innerHTML = $(this).data('nama');
     $('#ModalAktivasiUser').modal('show');
});

// Modal Aktivasi Blog
$(".modal-aktivasi-blog").click(function(){ // Click to only happen on announce links
     $("#id_blog").val($(this).data('id'));
     $("#status_blog").val($(this).data('status'));
     document.getElementById("judul_blog").innerHTML = $(this).data('nama');
     $('#ModalAktivasiBlog').modal('show');
});

// Modal Aktivasi Tutorial
$(".modal-aktivasi-tutorial").click(function(){ // Click to only happen on announce links
     $("#id_tutorial").val($(this).data('id'));
     $("#status_tutorial").val($(this).data('status'));
     document.getElementById("judul_tutorial").innerHTML = $(this).data('nama');
     $('#ModalAktivasiTutorial').modal('show');
});

// Modal Aktivasi Meme
$(".modal-aktivasi-meme").click(function(){ // Click to only happen on announce links
     $("#id_meme").val($(this).data('id'));
     $("#status_meme").val($(this).data('status'));
     document.getElementById("judul_meme").innerHTML = $(this).data('nama');
     $('#ModalAktivasiMeme').modal('show');
});

// Modal Aktivasi Quotes
$(".modal-aktivasi-quotes").click(function(){ // Click to only happen on announce links
     $("#id_quotes").val($(this).data('id'));
     $("#status_quotes").val($(this).data('status'));
     document.getElementById("judul_quotes").innerHTML = $(this).data('nama');
     $('#ModalAktivasiQuotes').modal('show');
});

// Modal Aktivasi Subscribe
$(".modal-aktivasi-subscribe").click(function(){ // Click to only happen on announce links
     $("#id_subscribe").val($(this).data('id'));
     $("#status_subscribe").val($(this).data('status'));
     document.getElementById("judul_subscribe").innerHTML = $(this).data('nama');
     $('#ModalAktivasiSubscribe').modal('show');
});

// Modal Aktivasi Project
$(".modal-aktivasi-project").click(function(){ // Click to only happen on announce links
     $("#id_project").val($(this).data('id'));
     $("#status_project").val($(this).data('status'));
     document.getElementById("judul_project").innerHTML = $(this).data('nama');
     $('#ModalAktivasiProject').modal('show');
});

// Aksi Aktivasi User
function AktivasiUser(id_user, status)
{
    window.location.href = base_url+"authorize/master/user/activated/"+id_user+"/"+status;
}

// Aksi Aktivasi Blog
function AktivasiBlog(id_blog, status)
{
    window.location.href = base_url+"authorize/posts/blog/activated/"+id_blog+"/"+status;
}

// Aksi Aktivasi Tutorial
function AktivasiTutorial(id_tutorial, status)
{
    window.location.href = base_url+"authorize/posts/tutorial/activated/"+id_tutorial+"/"+status;
}

// Aksi Aktivasi Quotes
function AktivasiMeme(id_meme, status)
{
    window.location.href = base_url+"authorize/fun/meme/activated/"+id_meme+"/"+status;
}

// Aksi Aktivasi Quotes
function AktivasiQuotes(id_quotes, status)
{
    window.location.href = base_url+"authorize/fun/quotes/activated/"+id_quotes+"/"+status;
}

// Aksi Aktivasi Subscribe
function AktivasiSubscribe(id_subscribe, status)
{
    window.location.href = base_url+"authorize/subscribe/activated/"+id_subscribe+"/"+status;
}

// Aksi Aktivasi Project
function AktivasiProject(id_project, status)
{
    window.location.href = base_url+"authorize/project/activated/"+id_project+"/"+status;
}

/**
* Aksi Modal Function
* pondokkode - Web Project Development
*/
// Aksi Delete User
function DeleteUser(id_user)
{
    window.location.href = base_url+"authorize/master/user/delete/"+id_user;
}

// Aksi Delete Blog
function DeleteBlog(id_blog)
{
    window.location.href = base_url+"authorize/posts/blog/delete/"+id_blog;
}

// Aksi Delete Tutorial
function DeleteTutorial(id_tutorial)
{
    window.location.href = base_url+"authorize/posts/tutorial/delete/"+id_tutorial;
}

// Aksi Delete Meme
function DeleteMeme(id_meme)
{
    window.location.href = base_url+"authorize/fun/meme/delete/"+id_meme;
}

// Aksi Delete Quotes
function DeleteQuotes(id_quotes)
{
    window.location.href = base_url+"authorize/fun/quotes/delete/"+id_quotes;
}

// Aksi Delete Subscribe
function DeleteSubscribe(id_subscribe)
{
    window.location.href = base_url+"authorize/subscribe/delete/"+id_subscribe;
}

// Aksi Delete Project
function DeleteProject(id_project)
{
    window.location.href = base_url+"authorize/project/delete/"+id_project;
}

// Aksi Delete FeedBack
function DeleteFeedback(id_feedback)
{
    window.location.href = base_url+"authorize/feedback/delete/"+id_feedback;
}

// Aksi Delete Developers
function DeleteDevelopers(id_developers)
{
    window.location.href = base_url+"authorize/master/developers/delete/"+id_developers;
}

// Aksi Delete Bug
function DeleteBug(id_bug)
{
    window.location.href = base_url+"authorize/bug/delete/"+id_bug;
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
    url: url+"dashboard/get_chart_today",
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
    url: url+"dashboard/get_chart_week",
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
    url: url+"dashboard/get_chart_month",
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
    url: url+"dashboard/get_chart_all",
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
