/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var ahmmosfc302_url_root = "/imo05/ahmmosfc300-ahs/rest/mo/sfc302/";
var vflagtrx;
var ahmmosfc302_qtypartnum;
var ahmmosfc302_qtyidkereta;
var vkeretaid = "";
var vpartnum = [];
var vnqty = [];
var vpartdesc = [];
var ahmmosfc302_lastonlinestat = false;
var errorOffset = 0;
var ahmmosfc302_seqnumber;
var ahmmosfc302_seqdelcode;
var ahmmosfc302_genseqnum = true;
var ahmmosfc302_genseqdelcode = true;
var vres;
var vdata;
var vrmvprt;
var dategencode = moment().format("MMYY");
var vdate;
var vdelcode;
var vo = [];
var resp = 0;
var ahmmosfc302_currentSelectionWctfr = "";
var ahmmosfc302_mode = "part";
var ahmmosfc302_searchpartnumdata = [];
var ahmmosfc302_searchkrtiddata = [];
var ahmmosfc302_ScanValidator = [];
var ahmmosfc302_generatedDelcode = "0";
var ahmmosfc302_generatevid = "MOV0000000";
var ahmmosfc302_tobesubmittedData = [];

var ahmmosfc302p1_lengthQty = [];
var ahmmosfc302p2_nrp = document.getElementById("ahmmosfc302p01_idopr");

var ahmmosfc302_allowedChar = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Backspace", "ArrowRight", "ArrowLeft", "Delete"];
var ahmmosfc302_allowedAfter = ["Backspace", "ArrowRight", "ArrowLeft", "Delete"];

$(document).ready(function () {

    if (localStorage.getItem("pendingtrnx") == null) {
        localStorage.setItem("pendingtrnx", "");
    }

    if (localStorage.getItem("searchPartNum") == null) {
        localStorage.setItem("searchPartNum", "");
    }

    ahmmosfc302_triggerFocus(document.getElementById("ahmmosfc302p01_wctfrom"));

    //Set Layout Part Number by Default
    ahmmosfc302SwitchLayout('part');

    $('#ahmmosfc302_btnsubmitpartnum').attr("disabled", true);
    $('#ahmmosfc302_btnsubmitidkereta').attr("disabled", true);

    _fw_post(ahmmosfc302_url_root + 'get-delivery-seqnumber', vo, function (data) {
        if (data.status === "1") {
            var result = data.data;
            if (result.length > 0) {
                ahmmosfc302_seqnumber = result[0].rmvprt_vid;
            } else {
                ahmmosfc302_seqnumber = "MOV0000000";
            }
        }
        ahmmosfc302_generatevid = ahmmosfc302_seqnumber;
    });

    _fw_post(ahmmosfc302_url_root + 'get-delivery-seqdelcode', vo, function (data) {
        if (data.status === "1") {
            var result = data.data;
            if (result.length > 0) {
                ahmmosfc302_seqdelcode = result[0].vdelcode;
            } else {
                ahmmosfc302_seqdelcode = "SDP/xxxxxx/xxxxxx/" + dategencode + "/0000";

            }
            ahmmosfc302_generatedDelcode = ahmmosfc302_seqdelcode
        }
    });

    waitForElementToExist($('#ahmmosfc302_lovwctfr').next().find("table")).then(() => {
        $('#ahmmosfc302_lovwctfr').next().find("table").on('click-row.bs.table', function (e, row, $element) {
            ahmmosfc302_triggerFocus(document.getElementById("ahmmosfc302p01_wctto"));

            $("#ahmmosfc302p01_wctto").trigger('keyup');

            if (row['vwctid'] != ahmmosfc302_currentSelectionWctfr && ahmmosfc302_currentSelectionWctfr != "") {
                ahmmosfc302_ResetField('ahmmosfc302p01formarea', 'trigger');
                ahmmosfc302_ResetField('ahmmosfc302_scanbypartnumform');
                $('#ahmmosfc302_tblpartnum').bootstrapTable('removeAll');
                $('#ahmmosfc302_tblidkrt').bootstrapTable('removeAll');
                ahmmosfc302_lockUnlockparentfilter('unlock');
                ahmmosfc302_currentSelectionWctfr = row["vwctid"];
            } else {
                ahmmosfc302_currentSelectionWctfr = row["vwctid"];
            }

        });

        $('#ahmmosfc302_lovwctfr').next().find("table").on('post-body.bs.table', function (e) {
            var data = $(this).bootstrapTable('getData', 'useCurrentPage');
            if (data.length == 1) {
                ahmmosfc302_triggerFocus(document.getElementById("ahmmosfc302p01_wctto"));
                $("#ahmmosfc302p01_wctto").trigger('keyup');
                if (data[0].vwctid != ahmmosfc302_currentSelectionWctfr && ahmmosfc302_currentSelectionWctfr != "") {
                    ahmmosfc302_ResetField('ahmmosfc302p01formarea', 'trigger');
                    ahmmosfc302_ResetField('ahmmosfc302_scanbypartnumform');
                    $('#ahmmosfc302_tblpartnum').bootstrapTable('removeAll');
                    $('#ahmmosfc302_tblidkrt').bootstrapTable('removeAll');
                    ahmmosfc302_lockUnlockparentfilter('unlock');
                    ahmmosfc302_currentSelectionWctfr = data[0].vwctid;
                } else {
                    ahmmosfc302_currentSelectionWctfr = data[0].vwctid;
                }

            }

        });
    });

    waitForElementToExist($('#ahmmosfc302_lovwctto').next().find("table")).then(() => {

        $('#ahmmosfc302_lovwctto').next().find("table").on('click-row.bs.table', function (e, row, $element) {
            ahmmosfc302_triggerFocus(document.getElementById("ahmmosfc302p01_idopr"));
        });

        $('#ahmmosfc302_lovwctto').next().find("table").on('post-body.bs.table', function (e) {
            var data = $(this).bootstrapTable('getData', 'useCurrentPage');
            if (data.length == 1) {
                ahmmosfc302_triggerFocus(document.getElementById("ahmmosfc302p01_idopr"));
                $("#ahmmosfc302p01_wctto").val(data[0].vwctid);
                $("#ahmmosfc302p01_wcttodesc").val(data[0].vwctdesc);
                $("#ahmmosfc302p01_planttoid").val(data[0].mplantVplantid);
            }

        });
    });

    waitForElementToExist($('#ahmmosfc302_lovmodel').next().find("table")).then(() => {
        $('#ahmmosfc302_lovmodel').next().find("table").on('click-row.bs.table', function (e) {
            $("#ahmmosfc302p01_listtype").trigger('keyup');
        });
        $('#ahmmosfc302_lovmodel').next().find("table").on('post-body.bs.table', function (e) {
            var data = $(this).bootstrapTable('getData', 'useCurrentPage');
            if (data.length > 1) {
                $("#ahmmosfc302p01_listtype").val("");
            }
        });
    });

    waitForElementToExist($('#ahmmosfc302_lovtype').next().find("table")).then(() => {
        $('#ahmmosfc302_lovtype').next().find("table").on('click-row.bs.table', function (e) {
            $("#ahmmosfc302p01_listcolor").trigger('keyup');
        });

        $('#ahmmosfc302_lovtype').next().find("table").on('post-body.bs.table', function (e) {
            var data = $(this).bootstrapTable('getData', 'useCurrentPage');
            if (data.length == 1) {
                $("#ahmmosfc302p01_listtype").val(data[0].mctype);
            } else {
                $("#ahmmosfc302p01_listcolor").val("");
            }

            $("#ahmmosfc302p01_listcolor").trigger('keyup');

        });
    });

    waitForElementToExist($('#ahmmosfc302_lovcolor').next().find("table")).then(() => {
        $('#ahmmosfc302_lovcolor').next().find("table").on('post-body.bs.table', function (e) {
            var data = $(this).bootstrapTable('getData', 'useCurrentPage');
            if (data.length == 1 && ahmmosfc302_mode == "part") {
                $("#ahmmosfc302p01_listcolor").val(data[0].color);
            }

        });
    });

    $("#ahmmosfc302p01_wctfrom").on('keyup', function () {
        console.log($(this).val());
        if ($(this).val() == null || $(this).val() == "") {
            ahmmosfc302_ResetField('ahmmosfc302p01formarea', 'trigger');
            ahmmosfc302_ResetField('ahmmosfc302_scanbypartnumform');
            $('#ahmmosfc302_tblpartnum').bootstrapTable('removeAll');
            $('#ahmmosfc302_tblidkrt').bootstrapTable('removeAll');
            ahmmosfc302_lockUnlockparentfilter('unlock');
        }
    });

    waitForElementToExist($('#ahmmosfc302_idoprlov').next().find("table")).then(() => {
        $('#ahmmosfc302_idoprlov').next().find("table").on('post-body.bs.table', function (e) {
            var data = $(this).bootstrapTable('getData', 'useCurrentPage');
            if (data.length == 1) {
                $("#ahmmosfc302_btnsearchp01").trigger('click');
            }

        });
    });

//    $("#ahmmosfc302p01_wctfrom").on('paste', function () {
//        console.log(ahmmosfc302_currentSelectionWctfr);
//        if ($(this).val() != ahmmosfc302_currentSelectionWctfr && ahmmosfc302_currentSelectionWctfr != "") {
//            console.log("Different");
//            $("#ahmmosfc302p01_resettop_btn").trigger('click');
//        }
//    });

    $('form').on('focus', 'input[type=number]', function (e) {
        $(this).on('wheel.disableScroll', function (e) {
            e.preventDefault();
        });
    });
    $('form').on('blur', 'input[type=number]', function (e) {
        $(this).off('wheel.disableScroll');
    });

    $('input[type=number]').on('keyup', function (e) {
        console.log($(this).val());
        if ($(this).val() < 0) {
            $(this).val(0);
        }
    });

});

//creates a variable that saves the original text and its length
var ahmmosfc302_nrp = "";
var ahmmosfc302_strlen = 0;
$("#ahmmosfc302p01_idopr").on("input", function () {
    var nrpVal = document.getElementById('ahmmosfc302p01_idopr');
    ahmmosfc302_nrp = nrpVal.value;
});

function ahmmosfc_checknegative(obj) {
    console.log(obj.value);
}
// Using Mutation Observer to Catch LoV Generated
function waitForElementToExist(selector) {
    return new Promise(resolve => {
        if (selector) {
            return resolve(selector);
        }

        const observer = new MutationObserver(() => {
            if (selector) {
                resolve(selector);
                observer.disconnect();
            }
        });
        observer.observe(document.body, {
            subtree: true,
            childList: true
        });
    });
}

//Validator Scan Delivery Part
function ahmmosfc302_Scansvalidator_clear(obj) {
    ahmmosfc302_ScanValidator = [];
    var ofrm;
    if ($(obj).hasClass('subpage')) {
        ofrm = $(obj);
    } else {
        ofrm = $(obj).closest('.subpage');
    }
    _fw_setMessage(obj, -1, '');
    ofrm.find('.table').find('tr.has-error').removeClass('has-error');
}

function ahmmosfc302_Scansvalidator_add(obj, value) {
    var ofrm = $(obj).closest('.subpage').length > 0 ? $(obj).closest('.subpage') : $(obj).closest('.div-app');
    ahmmosfc302_ScanValidator[ahmmosfc302_ScanValidator.length] = {
        obj: ofrm,
        input: value.toString(),
        msg: ''
    };
}

function ahmmosfc302_Scansvalidator_validate(obj, table) {
    var pagesize = table.bootstrapTable('getOptions').pageSize;
    var IndexonError = [];
    var PageonError = [];
    for (var i = 0; i < ahmmosfc302_ScanValidator.length; i++) {
        console.log(ahmmosfc302_ScanValidator[i]);
        if ((ahmmosfc302_ScanValidator[i].msg == '') && (ahmmosfc302_ScanValidator[i].input == null || ahmmosfc302_ScanValidator[i].input.length <= 0)) {
            ahmmosfc302_ScanValidator[i].msg = 'Qty of Row ' + i + ' on page ' + (Math.ceil(i / pagesize) == 0 ? 1 : Math.ceil(i / pagesize)) + ' is required.';
            ahmmosfc302_searchpartnumdata[i].qty = 0;
            IndexonError.push(i);
        } else if ((ahmmosfc302_ScanValidator[i].msg == '') && (parseInt(ahmmosfc302_ScanValidator[i].input) <= 0)) {
            ahmmosfc302_ScanValidator[i].msg = 'Qty of Row ' + i + ' on page ' + (Math.ceil(i / pagesize) == 0 ? 1 : Math.ceil(i / pagesize)) + ' must be greater than zero.';
            ahmmosfc302_searchpartnumdata[i].qty = 0;
//            IndexonError.push(i);
        } else if ((ahmmosfc302_ScanValidator[i].msg == '') && (parseInt(ahmmosfc302_ScanValidator[i].input) > 9999)) {
            ahmmosfc302_ScanValidator[i].msg = 'Qty of Row ' + i + ' on page ' + (Math.ceil(i / pagesize) == 0 ? 1 : Math.ceil(i / pagesize)) + ' exceed max value of 9999.';
            IndexonError.push(i);
        } else {
            ahmmosfc302_tobesubmittedData.push(i);
        }
    }
    for (var i = 0; i < IndexonError.length; i++) {
        var page = Math.ceil((IndexonError[i] / pagesize) == 1 ? (IndexonError[i] / pagesize) + 1 : (IndexonError[i] / pagesize));
        if (PageonError.indexOf(page.toString()) == -1) {
            PageonError.push(page.toString());
        }
    }
    if (IndexonError.length > 0) {
        _fw_setMessage(obj, 0, "There is (some) data on Column does not have a value");
        table.bootstrapTable('load', ahmmosfc302_searchpartnumdata);

        table.bootstrapTable('selectPage', parseInt(PageonError[0]));

        //Scroll to Top
        window.scrollTo(0, 0);

        return false;
    }

    if (ahmmosfc302_tobesubmittedData.length == 0) {

        _fw_setMessage(obj, 0, "Have at least 1 Part Number with quantity > 0 to be submitted");
        table.bootstrapTable('load', ahmmosfc302_searchpartnumdata);
        //Scroll to Top
        window.scrollTo(0, 0);
        return false;
    }
    return true;
}

//Layout Switcher Between ID Kereta and Part Number
$('input[type=radio][name=ahmmosfc302switchlayout]').change(function () {
    ahmmosfc302_mode = this.value;
    ahmmosfc302SwitchLayout(this.value);
});

function ahmmosfc302SwitchLayout(layout) {
    if (layout == "part") {
        $("#ahmmosfc302_tblpartnumber").removeAttr("hidden");
        $("#ahmmosfc302_tblidkereta").attr("hidden", "true");
    } else {
        $("#ahmmosfc302_tblidkereta").removeAttr("hidden");
        $("#ahmmosfc302_tblpartnumber").attr("hidden", "true");
    }
}

//Set Filter Variable Before Get Scan Data By Part Number;
function ahmmosfc302_searchpart(obj) {
    _fw_validation_clear(obj);
    _fw_validation_add(obj, 'ahmmosfc302p01_wctfrom', 'required');
    _fw_validation_add(obj, 'ahmmosfc302p01_wctto', 'required');
    _fw_validation_add(obj, 'ahmmosfc302p01_idopr', 'required');

    if (_fw_validation_validate(obj)) {
        var load = ahmmosfc302_getScanDataByPartnum(obj);
        $("#ahmmosfc302_tblpartnum").bootstrapTable('load', load);
//        ahmmosfc302_lockUnlockparentfilter('lock');
    }
}


//Handle Get Data for Scan Data By Part Number
function ahmmosfc302_getScanDataByPartnum(obj) {
    ahmmosfc302p1_lengthQty = [];
    var vmwctfrid = $('#ahmmosfc302p01_wctfrom').val();
    var vmwcttoid = $('#ahmmosfc302p01_wctto').val();
    var vmodel = $('#ahmmosfc302p01_listmodel').val();
    var vtype = $('#ahmmosfc302p01_listtype').val();
    var vcolor = $('#ahmmosfc302p01_listcolor').val();
    var keyword = $("#ahmmosfc302p01_keyword").val();
    var getData;
    var model = new Object();
    model.limit = 10;
    model.offset = 0;
    model.sort = "sortdcrea";
    model.order = "desc";
    model.search = {
        wctfr: vmwctfrid != "" ? vmwctfrid : "",
        wctto: vmwcttoid != "" ? vmwcttoid : "",
        model: vmodel != "" ? vmodel : "",
        type: vtype != "" ? vtype : "",
        color: vcolor != "" ? vcolor : "",
        keyword: keyword != "" ? keyword : ""
    };

    _fw_post(ahmmosfc302_url_root + "get-search-partnumber", model, function (data) {
        if (data.status == "1") {
            if (data.data.length > 0) {
                $('#ahmmosfc302_btnsubmitpartnum').attr("disabled", false);
            }
            ahmmosfc302_searchpartnumdata = data.data;

            for (var x = 0; x < ahmmosfc302_searchpartnumdata.length; x++) {
                ahmmosfc302p1_lengthQty.push(0);
            }
            getData = ahmmosfc302_searchpartnumdata;
        }
    });
    return getData;
}

function ahmmosfc302_filterbyKey(value, parameter) {
    if (parameter == null || parameter == "") {
        return value
    } else {
        if (value == parameter) {
            return value
        } else {
            return null;
        }
    }
}

function ahmmosfc302_ResetField(id, trigger) {
    if (trigger == "click") {
        $("#" + id).find("input").not("#ahmmosfc302_switchdeliverybypart").not("#ahmmosfc302_switchdeliverybykereta").not("#ahmmosfc302p01_idopr").not("#ahmmosfc302p01_vnameopr").val("");
        $('#ahmmosfc302_btnsubmitidkereta').attr("disabled", true);
        $('#ahmmosfc302_btnsubmitpartnum').attr("disabled", true);
    } else {
        $("#" + id).find("input").not("#ahmmosfc302_switchdeliverybypart").not("#ahmmosfc302_switchdeliverybykereta").not($("#ahmmosfc302groupwctfr").find("input")).not("#ahmmosfc302p01_idopr").not("#ahmmosfc302p01_vnameopr").val("");
        $('#ahmmosfc302_btnsubmitidkereta').attr("disabled", true);
        $('#ahmmosfc302_btnsubmitpartnum').attr("disabled", true);
    }

}


// After Success Submit, Fire Modal
function ahmmosfc302_AfterSuccededDelivery(obj) {
    $("ahmmosfc302p01formarea").find("input").not("radio").val("");
    $('#ahmmosfc302_btnsubmitpartnum').attr("disabled", true);
    var wctfrom = $('#ahmmosfc302p01_wctfrom').val();
    var wctto = $('#ahmmosfc302p01_wctto').val();
    var plantfrom = $('#ahmmosfc302p01_plantfrid').val();
    var plantto = $('#ahmmosfc302p01_planttoid').val();


    $("#ahmmosfc302_printdelcode_modal").text(ahmmosfc302_generatedDelcode == "0" ? "-" : ahmmosfc302_generatedDelcode);
    $("#ahmmosfc302_printfrom_modal").text(wctfrom);
    $("#ahmmosfc302_printto_modal").text(wctto);
    $("#ahmmosfc302_printplantfrom_modal").text("Plant " + plantfrom);
    $("#ahmmosfc302_printplantto_modal").text("Plant " + plantto);
    $('#ahmmosfc302_modalconfsubmit').modal("show");

    if (ahmmosfc302_generatedDelcode == "0") {
        $("#ahmmosfc302p01_letter_print_btn").css("visibility", "hidden");
    } else {
        $("#ahmmosfc302p01_letter_print_btn").css("visibility", "initial");
    }
}

//Set Filter Variable Before Add KRT ID
function ahmmosfc302_addidkereta(obj) {

    _fw_validation_clear(obj);
    _fw_validation_add(obj, 'ahmmosfc302p01_wctfrom', 'required');
    _fw_validation_add(obj, 'ahmmosfc302p01_wctto', 'required');
    _fw_validation_add(obj, 'ahmmosfc302p01_idopr', 'required');
    _fw_validation_add(obj, 'ahmmosfc302p01_idkereta', 'required');
    _fw_validation_add(obj, 'ahmmosfc302p01_idvpartdesc', 'required');
    _fw_validation_add(obj, 'ahmmosfc302p01_idvpartnum', 'required');
    _fw_validation_add(obj, 'ahmmosfc302p01_idnqty', 'required');

    if (_fw_validation_validate(obj)) {

        vkeretaid = $('#ahmmosfc302p01_idkereta').val();
        //Return All to Null;
        $('#ahmmosfc302p01_idvpartnum').val("");
        $('#ahmmosfc302p01_idvpartdesc').val("");
        $('#ahmmosfc302p01_idnqty').val("");
        $('#ahmmosfc302p01_idkereta').val("");
        getScanDatabyKeretaID(obj, vkeretaid);
    }

}

// Get Scan Kereta ID;
function getScanDatabyKeretaID(obj, krtid) {
    var model = new Object();
    var vmwctfrid = $('#ahmmosfc302p01_wctfrom').val();

    model.limit = 10;
    model.offset = 0;
    model.sort = "sortdcrea";
    model.order = "desc";
    model.search = {
        mwctfrid: vmwctfrid,
        idkereta: krtid
    };

    _fw_post(ahmmosfc302_url_root + "get-data-idkereta", model, function (data) {
        if (data.status == "1") {
            if (data.data.length > 0) {
                var result = data.data[0];
                var newkereta = {
                    vkrtid: krtid,
                    vpartnum: result.vpartnum,
                    vpartdesc: result.vpartdesc,
                    nqty: result.nqty,
                    Epp: result.Epp
                };
                if (ahmmosfc302_searchkrtiddata.map(e => e.vkrtid).indexOf(krtid) == -1) {
                    ahmmosfc302_searchkrtiddata.push(newkereta);
                }

                $('#ahmmosfc302_btnsubmitidkereta').attr("disabled", false);
            }
            $("#ahmmosfc302_tblidkrt").bootstrapTable('load', ahmmosfc302_searchkrtiddata);
        }
    });
}
//Lov ID Kereta Lookup
function ahmmosfc302_idkeretalookup(params) {
    var vmwctfrid = $('#ahmmosfc302p01_wctfrom').val();
    var vidkereta = $('#ahmmosfc302p01_idkereta').val();

    params.search = {

        mwctfrid: vmwctfrid != "" ? vmwctfrid : "",
        idkereta: vidkereta != "" ? vidkereta : ""

    };
    if (params.sort === undefined) {
        return{
            limit: params.limit,
            offset: params.offset,
            sort: "sortdcrea",
            order: "desc",
            search: params.search
        };
    }

    return params;

}


function ahmmosfc302p02_tblerrnumber(event, row, index) {
    return index + 1 + errorOffset;

}

function ahmmosfc302p02_downloadtemplate(obj) {
    var exportUrl = ahmmosfc302_url_root + "download-template-deliverypart?JXID=" + encodeURIComponent(getJxid());
    window.open(exportUrl);
}

function ahmmosfc302p02_uploadsubmit(obj) {
    _fw_validation_clear(obj);
    $('#ahmmosfc302p02_tblerrupload').bootstrapTable('removeAll');
    _fw_validation_add(obj, 'ahmmosfc302p02_uploadfile', 'required');
    if (_fw_validation_validate(obj)) {
        let idnrp = ahmmosfc302_nrp;
        let file = $("#ahmmosfc302p02_uploadfile").val();
        let fileExt = ['xlsx', 'XLSX', 'xls', 'XLS'];
        if (fileExt.indexOf(file.split('.').pop()) < 0) {
            _fw_setMessage(obj, 0, 'File upload must be xls or xlsx.');
        } else {

            var filesize = ahmmosfc302_bytesToMegaBytes($('#ahmmosfc302p02_uploadfile')[0].files[0].size);

            if (parseFloat(filesize.toFixed(2)) <= 4) {
                data = new FormData();
                data.append("file", $('#ahmmosfc302p02_uploadfile')[0].files[0]);
                data.append("idnrp", idnrp);
                jQuery.ajax({
                    url: '/imo05/ahmmosfc300-ahs/rest/mo/sfc302/upload-deliverypart',
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: 'POST',
                    headers: {
                        'JXID': getJxid()
                    },
                    success: function (res, status, settings) {
                        if (res.status == "1" && (res.data === null || res.data.length === 0)) {
                            _fw_reset_subpage($("#ahmmosfc302p02"));
                            _fw_reset_subpage($("#ahmmosfc302p01"));
                            _fw_setMessage(obj, 1, res.message.m);

                            window.setTimeout(function () {
                                _fw_subpage(obj, 'ahmmosfc302p01');
                            }, 3000);



                        } else if (res.status == "1" && (res.data !== null || res.data.length != 0)) {
                            _fw_reset_subpage($("#ahmmosfc302p02"));
                            _fw_reset_subpage($("#ahmmosfc302p01"));

                            _fw_setMessage(obj, 1, res.message.m);
                            $.each(res.data, function (idx, value) {
                                $('#ahmmosfc302p02_tblerrupload').bootstrapTable('insertRow', {
                                    index: idx + 1,
                                    row: value
                                });
                            });


                        } else if (res.status == "0" && (res.data !== null || res.data.length != 0)) {
                            _fw_reset_subpage($("#ahmmosfc302p02"));
                            _fw_reset_subpage($("#ahmmosfc302p01"));


                            _fw_setMessage(obj, 0, res.message.m);
                            $.each(res.data, function (idx, value) {
                                $('#ahmmosfc302p02_tblerrupload').bootstrapTable('insertRow', {
                                    index: idx + 1,
                                    row: value
                                });
                            });
                        }

                    }
                });
            } else {
                _fw_setMessage(obj, 0, "File tidak boleh melebihi 4 MB !");
            }

        }

    }


}

function ahmmosfc302_back(obj) {
    _fw_validation_clear(obj);
    _fw_subpage(obj, 'ahmmosfc302p01');
}




// Submit ID Kereta
function ahmmosfc302_submitidkereta(obj) {
    ahmmosfc302_Scansvalidator_clear(obj);
    var alldata = $("#ahmmosfc302_tblidkrt").bootstrapTable('getData', false);

    for (let i = 0; i < alldata.length; i++) {
        ahmmosfc302_Scansvalidator_add(obj, alldata[i].nqty);
    }

    if (ahmmosfc302_Scansvalidator_validate(obj, $('#ahmmosfc302_tblidkrt'))) {

        var modelData = new Object();
        var modelDataDetail = [];

        var wctfrom = $('#ahmmosfc302p01_wctfrom').val();
        var wctto = $('#ahmmosfc302p01_wctto').val();
        var plantfrom = $('#ahmmosfc302p01_plantfrid').val();
        var plantto = $('#ahmmosfc302p01_planttoid').val();
        var nnrp = ahmmosfc302_nrp;
        var vid = ahmmosfc302_GenerateVID();
        var delcode;

        if (vid != "ThR") {
            delcode = ahmmosfc302_GenerateDeliveryCode(wctfrom, wctto, plantfrom, plantto);
            if (delcode != "ThR") {
                modelData.header = {
                    rmvprt_vid: vid,
                    vflagtrx: "1",
                    vdelcode: delcode,
                    vplantfrid: plantfrom,
                    vplanttoid: plantto,
                    vwctfrid: wctfrom,
                    vwcttoid: wctto,
                    nnrpdel: nnrp,
                    nnrprcv: delcode == '0' ? nnrp : "",
                    ddelivery: "",
                    dreceive: delcode == '0' ? "now" : "",
                    vdelstatus: delcode == '0' ? "2" : "1",
                    vmatdoc: "",
                    dposting: ""
                };

                for (let i = 0; i < alldata.length; i++) {
                    modelDataDetail.push({
                        rmvprt_vid: vid,
                        vkrtid: alldata[i].vkrtid,
                        vpartnum: alldata[i].vpartnum,
                        vrfid: "0",
                        nqty: alldata[i].nqty
                    });
                }
                modelData.detail = modelDataDetail;

                _fw_post(ahmmosfc302_url_root + "submit-delivery-callproc", modelData, function (data) {
                    if (data.status == "1") {
//                        _fw_setMessage(obj, 1, "Delivery berhasil dilakukan");
                        ahmmosfc302_AfterSuccededDelivery(obj);
                    } else {
                        if (data.message != "") {
                            _fw_setMessage(obj, 0, data.message);
                        } else {
                            _fw_setMessage(obj, 0, 'Delivery gagal dilakukan');
                        }
                    }
                });

            } else {
                _fw_setMessage(obj, 0, "Cannot generate Delivery Code, max sequence reached for this month");
            }
        } else {
            _fw_setMessage(obj, 0, "Cannot generate VID, max sequence reached");
        }
    }
}


//Submit PartNumber
function ahmmosfc302_submitpartnum(obj) {
    ahmmosfc302_tobesubmittedData = [];
    var now = new Date().getTime();
    ahmmosfc302_Scansvalidator_clear(obj);
    var alldata = $("#ahmmosfc302_tblpartnum").bootstrapTable('getData', false);
    for (let i = 0; i < alldata.length; i++) {
        ahmmosfc302_Scansvalidator_add(obj, alldata[i].qty);
    }

    if (ahmmosfc302_Scansvalidator_validate(obj, $('#ahmmosfc302_tblpartnum'))) {

        var modelData = new Object();
        var modelDataDetail = [];

        var wctfrom = $('#ahmmosfc302p01_wctfrom').val();
        var wctto = $('#ahmmosfc302p01_wctto').val();
        var plantfrom = $('#ahmmosfc302p01_plantfrid').val();
        var plantto = $('#ahmmosfc302p01_planttoid').val();
        var nnrp = ahmmosfc302_nrp;
        var vid = ahmmosfc302_GenerateVID();
        var delcode;
        if (vid != "ThR") {
            delcode = ahmmosfc302_GenerateDeliveryCode(wctfrom, wctto, plantfrom, plantto);
            if (delcode != "ThR") {
                modelData.header = {
                    rmvprt_vid: vid,
                    vflagtrx: "0",
                    vdelcode: delcode,
                    vplantfrid: plantfrom,
                    vplanttoid: plantto,
                    vwctfrid: wctfrom,
                    vwcttoid: wctto,
                    nnrpdel: nnrp,
                    nnrprcv: delcode == '0' ? nnrp : "",
                    ddelivery: "",
                    dreceive: delcode == '0' ? "now" : "",
                    vdelstatus: delcode == '0' ? "2" : "1",
                    vmatdoc: "",
                    dposting: ""
                };

                for (let i = 0; i < ahmmosfc302_tobesubmittedData.length; i++) {
                    modelDataDetail.push({
                        rmvprt_vid: vid,
                        vkrtid: "0",
                        vpartnum: alldata[ahmmosfc302_tobesubmittedData[i]].vpartnum,
                        vrfid: "0",
                        nqty: alldata[ahmmosfc302_tobesubmittedData[i]].qty
                    });
                }
                modelData.detail = modelDataDetail;

                _fw_post(ahmmosfc302_url_root + "submit-delivery-callproc", modelData, function (data) {
                    if (data.status == "1") {
//                        _fw_setMessage(obj, 1, "Delivery berhasil dilakukan");
                        ahmmosfc302_AfterSuccededDelivery(obj);
                    } else {
                        if (data.message != "") {
                            _fw_setMessage(obj, 0, data.message);
                        } else {
                            _fw_setMessage(obj, 0, 'Delivery gagal dilakukan');
                        }
                    }
                });


            } else {
                _fw_setMessage(obj, 0, "Cannot generate Delivery Code, max sequence reached for this month");
            }
        } else {
            _fw_setMessage(obj, 0, "Cannot generate VID, max sequence reached");
        }
    }
}


//Generating Delivery Code
function ahmmosfc302_GenerateDeliveryCode(wctfrom, wctto, plantfrom, plantto) {
    if (plantfrom != plantto) {
        var GeneratedDelcode;
        var nSequence = ahmmosfc302_generatedDelcode.split('/')[4];
        var dDateDelivery = ahmmosfc302_generatedDelcode.split('/')[3];
        var nSeqNumber = parseInt(nSequence) + 1;

        if (nSeqNumber > 9999) {
            return "ThR";
        } else {
            if (dDateDelivery !== dategencode) {
                GeneratedDelcode = "SDP/" + wctfrom + "/" + wctto + "/" + dategencode + "/0001";
            } else {
                GeneratedDelcode = "SDP/" + wctfrom + "/" + wctto + "/" + dategencode + "/" + nSeqNumber.toString().padStart(4, "0");
            }
            ahmmosfc302_generatedDelcode = GeneratedDelcode;
            return GeneratedDelcode;
        }
    } else {
        // if plant from equal plant to, doesnt need delivery code
        ahmmosfc302_generatedDelcode = '0';
        return '0';
    }
}

//Generating RMVPRT_VID
function ahmmosfc302_GenerateVID() {
    nSequence = ahmmosfc302_generatevid.slice(3, 10);
    nSeqNumber = parseInt(nSequence) + 1;
    if (nSeqNumber > 9999999) {
        return "ThR";
    } else {
        ahmmosfc302_generatevid = "MOV" + nSeqNumber.toString().padStart(7, "0");
        return "MOV" + nSeqNumber.toString().padStart(7, "0");
    }

}

//Formatter For KRT ID
function ahmmosfc302_idkeretaformatter(value, row, index) {
    return [
        '<label for="ahmmosfc302p01_qtypartnum">' + value + '</label>'
    ].join('');
}


//Formatter For KRT ID
function ahmmosfc302_printnumberformatter(value, row, index) {
    return [
        '<label for="ahmmosfc302p01_qtypartnum">' + (index + 1) + '</label>'
    ].join('');
}

// Formatter For Number And Error
function ahmmosfc302_qtyformatter(value, row, index) {
    if (value == null || value == 'e') {
        //    Case When There And Error
        return [
            '<label for="ahmmosfc302p01_qtypartnum' + index + '"><span style="display:none;">qty</span></labe>',
            '<input id="ahmmosfc302p01_qtypartnum' + index + '" class="form-control has-error" style="text-align:right;" type="number" max="999999" onkeydown="ahmmosfc302_changeValueQty(' + index + ',this,event)" onkeyup="ahmmosfc302_changeValueSetQty(' + index + ',this)" />'
        ].join('');
    } else if (value > 999999) {
        return [
            '<label for="ahmmosfc302p01_qtypartnum' + index + '"><span style="display:none;">qty</span></labe>',
            '<input id="ahmmosfc302p01_qtypartnum' + index + '" class="form-control has-error" style="text-align:right;" type="number" max="999999" onkeydown="ahmmosfc302_changeValueQty(' + index + ',this,event)" onkeyup="ahmmosfc302_changeValueSetQty(' + index + ',this)"/>'
        ].join('');
    } else {
        return [
            '<label for="ahmmosfc302p01_qtypartnum' + index + '"><span style="display:none;">qty</span></labe>',
            '<input id="ahmmosfc302p01_qtypartnum' + index + '" class="form-control" style="text-align:right;" type="number" max="999999" onkeydown="ahmmosfc302_changeValueQty(' + index + ',this,event)" onkeyup="ahmmosfc302_changeValueSetQty(' + index + ',this)" />'
        ].join('');
    }


}

function ahmmosfc302_changeValueSetQty(index, obj) {
    let value = $('#' + obj.id).val(); 
    console.log(value);
    ahmmosfc302_searchpartnumdata[index].qty = value;
}



//Change Value On Key Up On Each Row
function ahmmosfc302_changeValueQty(index, obj, e) {
    var maxDigits = 3;
    let value = $('#' + obj.id).val(); 
    var CurrentLength = value.toString().length;
    if (!ahmmosfc302_allowedChar.includes(e.key)) {
        e.preventDefault();
    } else {
        if (ahmmosfc302p1_lengthQty[index] >= maxDigits) {
            if (!ahmmosfc302_allowedAfter.includes(e.key)) {
                e.preventDefault();
            } else {
                ahmmosfc302p1_lengthQty[index] = CurrentLength;
            }
        } else {
            if (e.key == "Backspace" || e.key == "Delete") {
                if (ahmmosfc302p1_lengthQty[index] > 0) {
                    $('#' + obj.id).val(parseInt(value));
                    ahmmosfc302_searchpartnumdata[index].qty = value;

                    ahmmosfc302p1_lengthQty[index] = CurrentLength;
                }
            } else {
                if (value[0] != 0) {
                    ahmmosfc302p1_lengthQty[index] = CurrentLength;
                }
                $('#' + obj.id).val(parseInt(value));
            }
        }

    }
}


function ahmmosfc302_checkqty(obj) {
    var valdata = $('#' + obj.id).val();
    if (valdata === "0") {
        _fw_setMessage(obj, 0, "qty tidak boleh ada yang 0");

    }
}

function ahmmosfc302_idkeretaresponsehandler(resps) {
    if (resps.status !== '0') {
        return {
            rows: resps.data,
            total: resps.total
        };
    } else {
        return {
            rows: [],
            total: 0
        };
    }
}



function ahmmosfc302_partnumresponsehandler(resps) {
    if (resps.status !== '0') {
        resp = resps.total;
        return {
            rows: resps.data,
            total: resps.total
        };
    } else {
        return {
            rows: [],
            total: 0
        };
    }
}

function ahmmosfc302_tblidkrtdataparam(params) {
    var vmwctfrid = $('#ahmmosfc302p01_wctfrom').val();
    var vidkereta = vkeretaid;

    params.search = {

        mwctfrid: vmwctfrid != "" ? vmwctfrid : "",
        idkereta: vidkereta != "" ? vidkereta : ""

    };
    if (params.sort === undefined) {
        return{
            limit: params.limit,
            offset: params.offset,
            sort: "sortdcrea",
            order: "desc",
            search: params.search
        };
    }

    return params;


}

function ahmmosfc302_tblpartnumsearchparam(params) {
    var vmwctfrid = $('#ahmmosfc302p01_wctfrom').val();
    var vmodel = $('#ahmmosfc302p01_listmodel').val();
    var vtype = $('#ahmmosfc302p01_listtype').val();
    var vcolor = $('#ahmmosfc302p01_listcolor').val();

    params.search = {
        mwctfrid: vmwctfrid != "" ? vmwctfrid : "",
        model: vmodel != "" ? vmodel : "",
        type: vtype != "" ? vtype : "",
        color: vcolor != "" ? vcolor : ""
    };

    if (params.sort === undefined) {
        return{
            limit: resp,
            offset: params.offset,
            sort: "sortdcrea",
            order: "desc",
            search: params.search
        };
    }

    return params;
}

function ahmmosfc302_uploadpart(obj) {
    _fw_validation_clear(obj);
    $('#ahmmosfc302p02_tblerrupload').bootstrapTable('removeAll');
    _fw_validation_add(obj, 'ahmmosfc302p01_idopr', 'required');
    if (_fw_validation_validate(obj)) {
        _fw_subpage(obj, 'ahmmosfc302p02');
    }

}





function ahmmosfc302_oprlookup(params) {
    params.search = {
        SEARCH_PARAM: ahmmosfc302_nrp
    }

    if (params.sort == undefined) {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "sortdcrea",
            order: "desc",
            search: params.search
        };
    }

    if (params.sort == "vnama") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "sortdcrea",
            order: (params.order == "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    return params;
}

function ahmmosfc302_colorlookup(params) {
    params.search = {
        SEARCH_PARAM: $('#ahmmosfc302p01_listcolor').val(),
        type: $('#ahmmosfc302p01_listtype').val(),
        model: $('#ahmmosfc302p01_listmodel').val(),
        wctfr: $('#ahmmosfc302p01_wctfrom').val(),
        wctto: $('#ahmmosfc302p01_wctto').val()
    }

    if (params.sort == undefined) {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "sortdcrea",
            order: "desc",
            search: params.search
        };
    }

    if (params.sort == "color") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "sortdcrea",
            order: (params.order == "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    return params;

}

function ahmmosfc302_typelookup(params) {
    params.search = {
        SEARCH_PARAM: $('#ahmmosfc302p01_listtype').val(),
        model: $('#ahmmosfc302p01_listmodel').val(),
        wctfr: $('#ahmmosfc302p01_wctfrom').val(),
        wctto: $('#ahmmosfc302p01_wctto').val()
    }

    if (params.sort == undefined) {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "sortdcrea",
            order: "desc",
            search: params.search
        };
    }

    if (params.sort == "mctype") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "sortdcrea",
            order: (params.order == "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    return params;

}

function ahmmosfc302_modellookup(params) {
    params.search = {
        SEARCH_PARAM: $('#ahmmosfc302p01_listmodel').val(),
        wctfr: $('#ahmmosfc302p01_wctfrom').val(),
        wctto: $('#ahmmosfc302p01_wctto').val()
    }

    if (params.sort == undefined) {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "sortdcrea",
            order: "desc",
            search: params.search
        };
    }

    if (params.sort == "model") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "sortdcrea",
            order: (params.order == "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    return params;

}


function ahmmosfc302_mwctfromlookup(params) {
    params.search = {

        SEARCH_PARAM: $('#ahmmosfc302p01_wctfrom').val()

    }

    if (params.sort == undefined) {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "dtlc.mwct_vwctid_c",
            order: "asc",
            search: params.search
        };
    }

    if (params.sort == "vwctid") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "dtlc.mwct_vwctid_c",
            order: (params.order == "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    if (params.sort == "vwctdesc") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "MWCT.VWCTDESC",
            order: (params.order == "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    if (params.sort == "mplantVplantid") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "mwct.mplant_vplantid",
            order: (params.order == "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    return params;
}

function ahmmosfc302_mwcttolookup(params) {
    var wctfrid = $('#ahmmosfc302p01_wctfridhidden').val();
    params.search = {

        SEARCH_PARAM: $('#ahmmosfc302p01_wctto').val(),
        wctfrid: $('#ahmmosfc302p01_wctfrom').val()
    }

    if (params.sort == undefined) {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "dtlc.hcbom_mwct_vwctid_p",
            order: "asc",
            search: params.search
        };
    }

    if (params.sort == "vwctid") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "dtlc.hcbom_mwct_vwctid_p",
            order: (params.order == "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    if (params.sort == "vwctdesc") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "MWCT.VWCTDESC",
            order: (params.order == "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    if (params.sort == "mplantVplantid") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "mwct.mplant_vplantid",
            order: (params.order == "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    return params;
}



//Set Filter Print Surat Jalan
function ahmmosfc302_PrintSuratJalan() {

    var wctfrom = $('#ahmmosfc302p01_wctfrom').val();
    var wctto = $('#ahmmosfc302p01_wctto').val();
    var plantfrom = $('#ahmmosfc302p01_plantfrid').val();
    var plantto = $('#ahmmosfc302p01_planttoid').val();
    $("#ahmmosfc302_printdelcode").text(ahmmosfc302_generatedDelcode);
    $("#ahmmosfc302_printfrom").text(wctfrom);
    $("#ahmmosfc302_printplantfrom").text("Plant " + plantfrom);
    $("#ahmmosfc302_printto").text(wctto);
    $("#ahmmosfc302_printplantto").text("Plant " + plantto);
    JsBarcode("#ahmmosfc302_barcode", ahmmosfc302_generatedDelcode, {
        format: "CODE128",
        lineColor: "#000",
        width: 0.7,
        height: 15,
        displayValue: false
    });
    var selectedType = ahmmosfc302_mode;
    var data = selectedType == "part" ? $("#ahmmosfc302_tblpartnum").bootstrapTable('getData', false) : ahmmosfc302_searchkrtiddata;
    var dataLength = data.length;
    //Adding Extra Page As Needed And Insert Data
    for (i = 0; i < Math.ceil(dataLength / 10); i++) {
        var arrayofData;
        if (data.length > 10) {
            arrayofData = data.slice(0, 10);
            data.splice(0, 10);
            //If Data Is More than 10, make new Page for Leftover Data
            ahmmosfc302_Clone_To_Multiple_Page();
        } else {
            arrayofData = data;
        }

        $('#ahmmosfc302_qrcode_page_' + i).qrcode({width: 60, height: 60, text: ahmmosfc302_generatedDelcode});
        if (selectedType == "part") {
            $("#ahmmosfc302_letter_page_" + i + " #ahmmosfc302_sortbypartnum").toggleClass("ahmmosfc302_hiddenTable");
            $("#ahmmosfc302_letter_page_" + i + " #ahmmosfc302_tablepartnum_page_" + i).bootstrapTable({data: arrayofData});
        } else {
            $("#ahmmosfc302_letter_page_" + i + " #ahmmosfc302_sortbyidkreta").toggleClass("ahmmosfc302_hiddenTable");
            $("#ahmmosfc302_letter_page_" + i + " #ahmmosfc302_tableidkreta_page_" + i).bootstrapTable({data: arrayofData});
        }
    }


    setTimeout(function () {
        window.print();

//        Remove Excess Clonned Element AFter Print
        $('#ahmmosfc302p02_printablearea').children('div').not(':first').remove();

        // Re Trigger Hidden
        if (selectedType == "part") {
            $("#ahmmosfc302_tablepartnum").bootstrapTable('removeAll');
            $("#ahmmosfc302_sortbypartnum").toggleClass("ahmmosfc302_hiddenTable");
        } else {
            $("#ahmmosfc302_tableidkreta").bootstrapTable('removeAll');
            $("#ahmmosfc302_sortbyidkreta").toggleClass("ahmmosfc302_hiddenTable");
        }

        ahmmosfc302_searchpartnumdata = [];
        ahmmosfc302_searchkrtiddata = [];

        //Empty QR Code

        $('[id^="ahmmosfc302_qrcode_page_"]').text("");
        $('#ahmmosfc302_qrcode').text("");
        $('#ahmmosfc302qrcodearea span').text("");
    }, 1000);



}


//Clone Surat Jalan For More Than 10 data in page
function ahmmosfc302_Clone_To_Multiple_Page() {
    var component = $('div[id^="ahmmosfc302_letter_page_"]:last');
    var num = parseInt(component.prop("id").split('_')[3]) + 1;
    var clonnedLetter = component.clone().prop('id', 'ahmmosfc302_letter_page_' + num).prop('class', 'panel printMarginTop');

    clonnedLetter.find('table').each(function (i, e) {
        if ($(e).attr('id')) {
            var oldID = $(e).attr('id').split('_');
            $(e).attr('id', oldID[0] + '_' + oldID[1] + '_' + oldID[2] + '_' + num);
        }
    });

    clonnedLetter.find('[id^="ahmmosfc302_qrcode_page"]').each(function (i, e) {
        if ($(e).attr('id')) {
            var oldID = $(e).attr('id').split('_');
            if (oldID.includes("page")) {
                $(e).attr('id', oldID[0] + '_' + oldID[1] + '_' + oldID[2] + '_' + num);
            }

        }
    });

    component.after(clonnedLetter);

}

function ahmmosfc302_FilterTablePartnum() {
    console.log("testing");
    var partnumber = $("#ahmmosfc302p01_filterpartnum").val();
    var partdesc = $("#ahmmosfc302p01_filterpartdesc").val();

    return ahmmosfc302_searchpartnumdata.filter(x => ahmmosfc302_filterpartnumbers(x.vpartnum.toUpperCase(), partnumber.toUpperCase()) && ahmmosfc302_filterpartdesc(x.vpartdesc.toUpperCase(), partdesc.toUpperCase()));
}

function ahmmosfc302_filterpartnumbers(value, filter) {
    if (value.includes(filter)) {
        return true;
    } else {
        return false;
    }
}

function ahmmosfc302_filterpartdesc(value, filter) {
    if (value.includes(filter)) {
        return true;
    } else {
        return false;
    }
}

function ahmmosfc302_tabEnter(event, tableid) {
    if (event.keyCode === 13) {
//        $("#" + tableid).bootstrapTable('load',ahmmosfc302_FilterTablePartnum());
    }
}

function ahmmosfc302_lockUnlockparentfilter(type) {
    if (type == 'lock') {
        $("#ahmmosfc302p01formarea").find('input').attr("readonly", true);
        $("#ahmmosfc302p01formarea").find('button').not(".btn-primary").attr("disabled", true);
    } else {
        $("#ahmmosfc302p01formarea").find('input').not(".ahmmosfc302_readonlyField").removeAttr("readonly");
        $("#ahmmosfc302p01formarea").find('button').removeAttr("disabled");
    }
}

function ahmmosfc302_bytesToMegaBytes(bytes) {
    return bytes / (1024 * 1024);
}

function ahmmosfc302_triggerFocus(element) {
    let eventType = "onfocusin" in element ? "focusin" : "focus";
    let bubbles = "onfocusin" in element;
    let event;

    if ("createEvent" in document) {
        event = document.createEvent("Event");
        event.initEvent(eventType, bubbles, true);
    } else if ("Event" in window) {
        event = new Event(eventType, {bubbles: bubbles, cancelable: true});
    }

    element.focus();
    element.dispatchEvent(event);
}


function ahmmosfc302_triggerSearchbyEnter(event) {
    if (event.keyCode === 13) {
        $("#ahmmosfc302_btnsearchp01").trigger('click');
    }
}



