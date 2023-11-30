/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//Variable for Filter Table Monitoring
var ahmmosfc304_filter_wctfr;
var ahmmosfc304_filter_wctto;
var ahmmosfc304_filter_plantfr;
var ahmmosfc304_filter_plantto;
var ahmmosfc304_filter_ddelivery;
var ahmmosfc304_filter_dreceive;
var ahmmosfc304_filter_partnum;
var ahmmosfc304_filter_delcode;
var ahmmosfc304_filter_krtid;
var ahmmosfc304_prebootstrapTable;
var ahmmosfc304_loadeddata = [];
var ahmmosfc304_FilteredLoadData = [];
var ahmmosfc304_url = "/imo05/ahmmosfc300-ahs/rest/mo/sfc304";
var ahmmosfc304_FreezeWidthofTh = [];
//For Handling How Many Success and Error on Multi Cancel Transaction
const ahmmosfc304 = $("#AHMMOSFC304");
$(document).ready(function () {


    var todayDate = new Date();
    $("[id^='ahmmosfc304p01_datedeliv']", ahmmosfc304).datetimepicker({
        date: new Date(todayDate),
        format: 'DD-MMM-YYYY HH:mm:ss',
        locale: 'en',
        showClear: true,
        keepInvalid: false,
        useCurrent: false,
        widgetPositioning: {
            horizontal: 'left',
            vertical: 'bottom'
        }
    });
    $("[id^='ahmmosfc304p01_datereceive']", ahmmosfc304).datetimepicker({
//        date: new Date(todayDate),
        format: 'DD-MMM-YYYY HH:mm:ss',
        locale: 'en',
        showClear: true,
        keepInvalid: false,
        useCurrent: false,
        widgetPositioning: {
            horizontal: 'left',
            vertical: 'bottom'
        }
    });
    $("#ahmmosfc304p01_tablemonitoringdelivery").on("check.bs.table", function (row, $element) {
        var table = $("#ahmmosfc304p01_tablemonitoringdelivery").bootstrapTable('getSelections');
        var selectedRow = table;
        if (selectedRow.length > 0) {
            $("#ahmmosfc304p01_canceldel_btn").removeAttr("disabled");
        }

        $('td', $("#ahmmosfc304p01_tablemonitoringdelivery tr:first-child")).each(function (i, val) {
            var w_th = $('td:nth(' + i + ')', $('#ahmmosfc304p01_tablemonitoringdelivery tbody tr:first')).outerWidth() >
                    $(this).outerWidth() ? $('td:nth(' + i + ')', $('#ahmmosfc304p01_tablemonitoringdelivery tbody tr:first')).outerWidth()
                    : $(this).outerWidth();

        });
    });
    $("#ahmmosfc304p01_tablemonitoringdelivery").on("uncheck.bs.table", function (row, $element) {

        var table = $("#ahmmosfc304p01_tablemonitoringdelivery").bootstrapTable('getSelections');
        var selectedRow = table;
        if (selectedRow.length == 0) {
            $("#ahmmosfc304p01_canceldel_btn").attr("disabled", true);
        }
    });
    $("#ahmmosfc304p01_tablemonitoringdelivery").on("sort.bs.table", function (name, order) {
        var orders = $("#ahmmosfc304p01_tablemonitoringdelivery").bootstrapTable('getOptions').sortOrder;
        var sort = $("#ahmmosfc304p01_tablemonitoringdelivery").bootstrapTable('getOptions').sortName.split("_")[1];
        if (ahmmosfc304_FilteredLoadData.length > 0) {
            $("#ahmmosfc304p01_tablemonitoringdelivery").bootstrapTable('load', ahmmosfc304_FilteredLoadData.sort(ahmmosfc304_dynamicSort(sort, orders)));
        } else {
            $("#ahmmosfc304p01_tablemonitoringdelivery").bootstrapTable('load', ahmmosfc304_loadeddata.sort(ahmmosfc304_dynamicSort(sort, orders)));
        }
//       $("#ahmmosfc304p01_tablemonitoringdelivery").bootstrapTable('sortBy', {field: sort, sortOrder: orders});

    });
    waitForElementToExist($('#ahmmosfc304_wctfrselection').next().find("table")).then(() => {

        $('#ahmmosfc304_wctfrselection').next().find("table").on('click-row.bs.table', function () {
            $("#ahmmosfc304p01_plantfrid").trigger('keyup');
        });
        $('#ahmmosfc304_wctfrselection').next().find("table").on('post-body.bs.table', function (e) {
            var data = $(this).bootstrapTable('getData', 'useCurrentPage');
            if (data.length == 1) {
                $("#ahmmosfc304p01_plantfrid").trigger('keyup');
            }

        });
    });
    waitForElementToExist($('#ahmmosfc304_wcttoselection').next().find("table")).then(() => {

        $('#ahmmosfc304_wcttoselection').next().find("table").on('click-row.bs.table', function () {
            $("#ahmmosfc304p01_planttoid").trigger('keyup');
        });
        $('#ahmmosfc304_wcttoselection').next().find("table").on('post-body.bs.table', function (e) {
            var data = $(this).bootstrapTable('getData', 'useCurrentPage');
            if (data.length == 1) {
                $("#ahmmosfc304p01_planttoid").trigger('keyup');
            }

        });
    });


    $('#ahmmosfc304p01_tablemonitoringdelivery').on('post-body.bs.table', function (e) {
        var data = $(this).bootstrapTable('getData', 'useCurrentPage');
        if (data.length > 1) {
            _ahmmosfc304_FreezeTable("ahmmosfc304p01_tablemonitoringdelivery", 4, 0, 22);
        }

    });


});


//Custom FreezeTable

function _ahmmosfc304_FreezeTable(tblid, left, right, maxColumn) {

    var tbl = $('table#' + tblid);
    var vmarginleft = 0;
    var vmarginright = 0;
    //Setting Width on Td
    $('tr', tbl).each(function (ix, ox) {
        var len = $('td', this).length;
        var h_trh = $(this).outerHeight();
        var vleft = 0;
        var vright = 0;
        $('td', this).each(function (i, val) {
            if (i < left) {
                var w_th = $('td:nth(' + i + ')', $('#' + tblid + ' tbody tr:first')).outerWidth() >
                        $(this).outerWidth() ? $('td:nth(' + i + ')', $('#' + tblid + ' tbody tr:first')).outerWidth()
                        : $(this).outerWidth();


                if (ahmmosfc304_FreezeWidthofTh[i] != null) {
                    $(this).css({height: h_trh, width: ahmmosfc304_FreezeWidthofTh[i], left: vleft});
                    vleft = vleft + ahmmosfc304_FreezeWidthofTh[i];
                } else {
                    if (w_th < 30) {
                        $(this).css({height: h_trh, width: 30, left: vleft});
                        vleft = vleft + 30;
                    } else {
                        $(this).css({height: h_trh, width: w_th, left: vleft});
                        vleft = vleft + w_th;
                    }
                }
                vmarginleft = vleft;
            } else if (i >= (len - right)) {
                var w_th = $('td:nth(' + i + ')', $('#' + tblid + ' tbody tr:first')).outerWidth() >
                        $(this).outerWidth() ? $('td:nth(' + i + ')', $('#' + tblid + ' tbody tr:first')).outerWidth()
                        : $(this).outerWidth();
                $(this).css({height: h_trh, width: w_th, right: vright});
                vright = vright + w_th;
                vmarginright = vright;
            }
        });
    });

//Setting Width on TH
    $('tr', tbl).each(function (ix, ox) {
        var len = $('th', this).length;
        var skipped = maxColumn - len;
        var h_trh = $(this).outerHeight();
        var vleft = 0;
        var vright = 0;
        $('th', this).each(function (i, val) {
            if ((i + skipped) < left) {
                var w_th = $('th:nth(' + (i + skipped) + ')', $('#' + tblid + ' thead tr:nth(2)')).outerWidth() >
                        $(this).outerWidth() ? $('th:nth(' + (i + skipped) + ')', $('#' + tblid + ' thead tr:nth(2)')).outerWidth()
                        : $(this).outerWidth();


                if (ahmmosfc304_FreezeWidthofTh[i] != null) {
                    $(this).css({height: h_trh, width: ahmmosfc304_FreezeWidthofTh[i], left: vleft});
                    vleft = vleft + ahmmosfc304_FreezeWidthofTh[i];
                } else {
                    if (w_th < 30) {
                        ahmmosfc304_FreezeWidthofTh.push(30);
                        $(this).css({height: h_trh, width: 30, left: vleft});
                        vleft = vleft + 30;
                    } else {
                        ahmmosfc304_FreezeWidthofTh.push(w_th);
                        $(this).css({height: h_trh, width: w_th, left: vleft});
                        vleft = vleft + w_th;
                    }
                }

                vmarginleft = vleft;
            } else if (i >= (len - right)) {
                var w_th = $('th:nth(' + i + ')', $('#' + tblid + ' thead tr:nth(2)')).outerWidth() >
                        $(this).outerWidth() ? $('th:nth(' + i + ')', $('#' + tblid + ' thead tr:nth(2)')).outerWidth()
                        : $(this).outerWidth();
                $(this).css({height: h_trh, width: w_th, right: vright});
                vright = vright + w_th;
                vmarginright = vright;
            }
        });
    });

    $('tr', tbl).each(function (ix, ox) {
        var len = $('td,th', this).length;
        var skipped = maxColumn - len;
        $('td,th', this).each(function (i, val) {
            if ((i + skipped) < left) {
                $(this).addClass('fixedLCol');
            } else if (i >= (len - right)) {
                $(this).addClass('fixedRCol');
            }
        });
    });

    $('#' + tblid).parent().css({marginLeft: vmarginleft, marginRight: vmarginright});
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



//Catch Change From WCT to Automatically Fill Plant 
$("#ahmmosfc304p01_wctfrid").on('propertyChange', function () {
    $("#ahmmosfc304p01_plantfr").trigger('change');
}
);

//Set Filter Value on Search
function ahmmosfc304_SetFilterValue(obj) {
    ahmmosfc304_filter_wctfr = $("#ahmmosfc304p01_wctfrid").val();
    ahmmosfc304_filter_wctto = $("#ahmmosfc304p01_wcttoid").val();
    ahmmosfc304_filter_plantfr = $("#ahmmosfc304p01_plantfrid").val();
    ahmmosfc304_filter_plantto = $("#ahmmosfc304p01_planttoid").val();
    ahmmosfc304_filter_ddeliveryfr = $("#ahmmosfc304p01_datedelivfr").val();
    ahmmosfc304_filter_dreceivefr = $("#ahmmosfc304p01_datereceivefr").val();
    ahmmosfc304_filter_ddeliveryto = $("#ahmmosfc304p01_datedelivto").val();
    ahmmosfc304_filter_dreceiveto = $("#ahmmosfc304p01_datereceiveto").val();
    ahmmosfc304_filter_partnum = $("#ahmmosfc304p01_partnum").val();
    ahmmosfc304_filter_delcode = $("#ahmmosfc304p01_delcode").val();
    ahmmosfc304_filter_krtid = $("#ahmmosfc304p01_idkreta").val();
    getSearchData();
}

//Refresh Table Function
function ahmmosfc304_refreshTable(table) {
    $("#" + table).bootstrapTable('refresh');
}

function ahmmosfc304_printJasperSuratJalan(obj) {

    _fw_validation_clear(obj);
    var tables = $("#ahmmosfc304p01_tablemonitoringdelivery").bootstrapTable("getSelections");
    if (tables.length > 0 && tables.length < 2) {
        var selection = tables[0];
        if (selection.delcode != "0") {
            var param = {
                wctfr: ahmmosfc304_filter_wctfr,
                wctto: ahmmosfc304_filter_wctto,
                plantfr: ahmmosfc304_filter_plantfr,
                plantto: ahmmosfc304_filter_plantto,
                dreceivefr: ahmmosfc304_filter_dreceivefr,
                ddeliveryfr: ahmmosfc304_filter_ddeliveryfr,
                dreceiveto: ahmmosfc304_filter_dreceiveto,
                ddeliveryto: ahmmosfc304_filter_ddeliveryto,
                partnum: ahmmosfc304_filter_partnum,
                delcode: ahmmosfc304_filter_delcode,
                krtid: ahmmosfc304_filter_krtid,
                Mov: selection.vid
            };


            _fw_post("/imo05/ahmmosfc300-ahs/rest/mo/sfc304/print-letter", param, function (data) {
                if (data.status === '1') {
                    window.open(data.data);
                } else if (data.status === '0') {
                    _fw_setMessage(obj, 0, data.message.error);
                    return;
                }
            });
        } else {
            _fw_setMessage(obj, 0, "One of the data you selected doesn’t have delivery code.");
        }

    } else {
        _fw_setMessage(obj, 0, "Harap pilih salah satu data.");
    }





}

//Look Up Pre Function
//Lookup for WCT From LOV
function ahmmosfc304p01_WCT_From_Lookup(params) {
    params.search = {
        SEARCH_PARAM: $("#ahmmosfc304p01_wctfrid").val(),
        type: "fr"
    };
    if (params.sort === undefined) {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "a.mwct_vwctid_c",
            order: "asc",
            search: params.search
        };
    }

    if (params.sort === "wctid") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "a.mwct_vwctid_c",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    if (params.sort === "wctdesc") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "mwct.vwctdesc",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "plantid") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "mwct.mplant_vplantid",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    return params;
}

//Lookup for Plant From LOV
function ahmmosfc304p01_Plant_From_Lookup(params) {
    params.search = {
        SEARCH_PARAM: $("#ahmmosfc304p01_plantfrid").val()
    };
    if (params.sort === undefined) {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "number",
            order: "desc",
            search: params.search
        };
    }

    if (params.sort === "plantid") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "MPLANT_VPLANTID",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    if (params.sort === "plantname") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VPLANTDESC",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    return params;
}

//Lookup for WCT To LOV
function ahmmosfc304p01_WCT_To_Lookup(params) {
    params.search = {
        SEARCH_PARAM: $("#ahmmosfc304p01_wcttoid").val(),
        wctfr: $("#ahmmosfc304p01_wctfrid").val(),
        type: "to"
    };
    if (params.sort === undefined) {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "a.hcbom_mwct_vwctid_p",
            order: "asc",
            search: params.search
        };
    }

    if (params.sort === "wctid") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "a.hcbom_mwct_vwctid_p",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    if (params.sort === "wctdesc") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "mwct.vwctdesc",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "plantid") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "mwct.mplant_vplantid",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    return params;
}

//Lookup for Plant From LOV
function ahmmosfc304p01_Plant_To_Lookup(params) {
    params.search = {
        SEARCH_PARAM: $("#ahmmosfc304p01_planttoid").val()
    };
    if (params.sort === undefined) {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "number",
            order: "desc",
            search: params.search
        };
    }

    if (params.sort === "plantid") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "MPLANT_VPLANTID",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    if (params.sort === "plantname") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VPLANTDESC",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    return params;
}

//PreFunction for Table Monitoring
function ahmmosfc304p01_MonitoringDelivery(params) {
    params.search = {
        wctfr: ahmmosfc304_filter_wctfr,
        wctto: ahmmosfc304_filter_wctto,
        plantfr: ahmmosfc304_filter_plantfr,
        plantto: ahmmosfc304_filter_plantto,
        dreceive: ahmmosfc304_filter_dreceive,
        ddelivery: ahmmosfc304_filter_ddelivery,
        partnum: ahmmosfc304_filter_partnum,
        delcode: ahmmosfc304_filter_delcode,
        krtid: ahmmosfc304_filter_krtid
    };
    if (params.sort === undefined) {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "number",
            order: "desc",
            search: params.search
        };
    }

    if (params.sort === "sort_ddelivery") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "TRUNC(DDELIVERY)",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    if (params.sort === "sort_dreceive") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "TRUNC(DRECEIVE)",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_dcanceldelivery") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "DCANCELDEL",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_dcancelreceive") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "DCANCELREC",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_wctfr") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VWCTFRID",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_wctto") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VWCTTOID",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_plantfr") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VPLANTFRID",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_plantto") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VPLANTTOID",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_krtid") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VKRTID",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_rfid") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VRFID",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_partnum") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VPARTNUM",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_partdesc") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VPARTDESC",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_nqty") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "NQTY",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_nqtyintr") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "NQTYTRANSIT",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_delcode") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VDELCODE",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_headerdoc") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VDOCHDR",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_nntrnid") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "NNTRNID",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_matdoc") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VMATDOC",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_postDate") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "DPOSTING",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    return params;
}

//Response Handle for BootstrapTable
function ahmmosfc304_ResponseHandler(resps) {

    if (resps.status != '0') {
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

function ahmmosfc304_sdpformatter(value, row, index) {
    if (value == "0") {
        return null;
    } else {
        return value;
    }
}

function ahmmosfc304_Transitformatter(value, row, index) {
    if (row.plantfr == row.plantto) {
        return "0";
    } else {
        return value;
    }
}

//Reset Field Function 
function ahmmosfc304_ResetField(id) {
    $("#" + id).find("input").val("");
}

//Set Filter Print Surat Jalan
function ahmmosfc304_PrintSuratJalan(obj) {
    _fw_validation_clear(obj);
    var tables = $("#ahmmosfc304p01_tablemonitoringdelivery").bootstrapTable("getSelections");
    if (tables.length > 0 && tables.length < 2) {
        var selection = tables[0];
        if (selection.delcode != "0") {
            $("#ahmmosfc304_printdelcode").text(selection.delcode);
            $("#ahmmosfc304_printfrom").text(selection.wctfr);
            $("#ahmmosfc304_printplantfrom").text("Plant " + selection.plantfr);
            $("#ahmmosfc304_printto").text(selection.wctto);
            $("#ahmmosfc304_printplantto").text("Plant " + selection.plantto);
            JsBarcode("#ahmmosfc304_barcode", selection.delcode, {
                format: "CODE128",
                lineColor: "#000",
                width: 0.7,
                height: 15,
                displayValue: false
            });
            var result = ahmmosfc304_getsuratjalandata(selection.vid);
            var data = result.data;
            var dataLength = data.length;
            //Adding Extra Page As Needed And Insert Data
            for (i = 0; i < Math.ceil(dataLength / 10); i++) {
                var arrayofData;
                if (data.length > 10) {
                    arrayofData = data.slice(0, 10);
                    data.splice(0, 10);
                    //If Data Is More than 10, make new Page for Leftover Data
                    ahmmosfc304_Clone_To_Multiple_Page();
                } else {
                    arrayofData = data;
                }

                $('#ahmmosfc304_qrcode_page_' + i).qrcode({width: 60, height: 60, text: selection.delcode});
                if (selection.krtid == '0') {
                    $("#ahmmosfc304_letter_page_" + i + " #ahmmosfc304_sortbypartnum").toggleClass("ahmmosfc304_hiddenTable");
                    $("#ahmmosfc304_letter_page_" + i + " #ahmmosfc304_tablepartnum_page_" + i).bootstrapTable({data: arrayofData});
                } else {
                    $("#ahmmosfc304_letter_page_" + i + " #ahmmosfc304_sortbyidkreta").toggleClass("ahmmosfc304_hiddenTable");
                    $("#ahmmosfc304_letter_page_" + i + " #ahmmosfc304_tableidkreta_page_" + i).bootstrapTable({data: arrayofData});
                }
            }


            setTimeout(function () {
                window.print();
                //Remove Excess Clonned Element After Print
                $('#ahmmosfc302p02_printablearea').children('div').not(':first').remove();
                // Re Trigger Hidden   $('#ahmmosfc302p02_printablearea').children('div').not(':first').remove();
                if (selection.krtid == '0') {
                    $("#ahmmosfc304_tablepartnum").bootstrapTable('removeAll');
                    $("#ahmmosfc304_sortbypartnum").toggleClass("ahmmosfc304_hiddenTable");
                } else {
                    $("#ahmmosfc304_tableidkreta").bootstrapTable('removeAll');
                    $("#ahmmosfc304_sortbyidkreta").toggleClass("ahmmosfc304_hiddenTable");
                }


//Empty QR Code
                $('[id^="ahmmosfc304_qrcode_page_"]').text("");
                $('#ahmmosfc304_barcode').text("");
            }, 1000);
        } else {
            _fw_setMessage(obj, 0, "One of the data you selected doesn’t have delivery code.");
        }

    } else {
        _fw_setMessage(obj, 0, "Harap pilih salah satu data.");
    }

}
//GET PRINT SURAT JALAN DATA
function ahmmosfc304_getsuratjalandata(param) {
    var result;
    var model = new Object();
    model.limit = 10;
    model.offset = 0;
    model.sort = "sortdcrea";
    model.order = "desc";
    model.search = {vid: param};
    _fw_post("/imo05/ahmmosfc300-ahs/rest/mo/sfc304/get-SearchDataPrint", model, function (data) {
        if (data.status == "1") {
            result = data;
        }
    });
    return result;
}


function ahmmosfc304_Clone_To_Multiple_Page() {
    var component = $('div[id^="ahmmosfc304_letter_page_"]:last');
    var num = parseInt(component.prop("id").split('_')[3]) + 1;
    var clonnedLetter = component.clone().prop('id', 'ahmmosfc304_letter_page_' + num).prop('class', 'panel printMarginTop');
    clonnedLetter.find('table').each(function (i, e) {
        if ($(e).attr('id')) {
            var oldID = $(e).attr('id').split('_');
            $(e).attr('id', oldID[0] + '_' + oldID[1] + '_' + oldID[2] + '_' + num);
        }
    });
    clonnedLetter.find('[id^="ahmmosfc304_qrcode_page"]').each(function (i, e) {
        if ($(e).attr('id')) {
            var oldID = $(e).attr('id').split('_');
            if (oldID.includes("page")) {
                $(e).attr('id', oldID[0] + '_' + oldID[1] + '_' + oldID[2] + '_' + num);
            }

        }
    });
    component.after(clonnedLetter);
}

function getSearchData() {
    var model = new Object();
    var vmwctfrid = $('#ahmmosfc302p01_wctfrom').val();
    model.limit = 10;
    model.offset = 0;
    model.sort = "number";
    model.order = "desc";
    model.search = {
        wctfr: ahmmosfc304_filter_wctfr,
        wctto: ahmmosfc304_filter_wctto,
        plantfr: ahmmosfc304_filter_plantfr,
        plantto: ahmmosfc304_filter_plantto,
        dreceivefr: ahmmosfc304_filter_dreceivefr,
        ddeliveryfr: ahmmosfc304_filter_ddeliveryfr,
        dreceiveto: ahmmosfc304_filter_dreceiveto,
        ddeliveryto: ahmmosfc304_filter_ddeliveryto,
        partnum: ahmmosfc304_filter_partnum,
        delcode: ahmmosfc304_filter_delcode,
        krtid: ahmmosfc304_filter_krtid
    };
    _fw_post("/imo05/ahmmosfc300-ahs/rest/mo/sfc304/get-SearchData", model, function (data) {
        if (data.status == "1") {
            ahmmosfc304_loadeddata = data.data;
            $("#ahmmosfc304p01_tablemonitoringdelivery").bootstrapTable("load", data.data);

        }
    });
}

function ahmmosfc304_SendAjaxSubmitPost(model, obj, path) {
    var result = false;
    _fw_post(ahmmosfc304_url + path, model, function (data) {
        if (data.status == "1") {
            result = true;
        }
    });
    return result;
}

function ahmmosfc304_CancelTxn(obj) {
//    Reset Count 
    var txnsuccess = 0;
    var txnerror = 0;
    var table = $("#ahmmosfc304p01_tablemonitoringdelivery").bootstrapTable('getSelections');
    var alldata = $("#ahmmosfc304p01_tablemonitoringdelivery").bootstrapTable('getData', false);
    var selectedTransaction = [];
    var selectedDelcode = [];
    var y = 0;
    for (var x = 0; x < table.length; x++) {
        if (selectedDelcode.indexOf(table[x].vid) == -1) {
            selectedDelcode.push(table[x].vid);
            selectedTransaction.push(table[x]);
        }
    }
    while (y < selectedTransaction.length) {
        if (selectedTransaction[y].dreceive != null && selectedTransaction[y].dcancelreceive == null) {
            $.when(ahmmosfc304_CancelReceive(obj, selectedTransaction[y])).done(function (result) {
                if (result == true) {
                    txnsuccess++;
                } else {
                    txnerror++;
                }
                y++;
            });
        } else {
            $.when(ahmmosfc304_CancelDelivery(obj, selectedTransaction[y])).done(function (result) {
                if (result == true) {
                    txnsuccess++;
                } else {
                    txnerror++;
                }
                y++;
            });
        }
    }


    if (txnsuccess > 0) {
        $("#ahmmosfc304p01_canceldel_btn").attr("disabled", true);
        $('#ahmmosfc304p01_tablemonitoringdelivery').bootstrapTable('removeAll');
        ahmmosfc304_ResetField("ahmmosfc304p01formarea");
        _fw_setMessage(obj, 1, txnsuccess + " of " + selectedTransaction.length + " Transaksi berhasil dibatalkan");
    } else {
        window.scrollTo(0, 0);
        _fw_setMessage(obj, 0, txnerror + " Transaksi gagal dibatalkan");
    }
}

function ahmmosfc304_CancelDelivery(obj, selectedRow) {
    var alldata = $("#ahmmosfc304p01_tablemonitoringdelivery").bootstrapTable('getData', false);
    if ((selectedRow.dcancelreceive == null && selectedRow.dreceive != null) || selectedRow.dcanceldelivery != null) {
        return false;
    } else {
        var numberofBodys = alldata.filter((x) => x.vid == selectedRow.vid).length;
        var model = new Object();
        model.operator = "";
        model.delcode = selectedRow.delcode;
        model.vid = selectedRow.vid;
        model.numberofBody = numberofBodys;
        return ahmmosfc304_SendAjaxSubmitPost(model, obj, '/submit-cancel-delivery');
    }
}

function ahmmosfc304_CancelReceive(obj, selectedRow) {
    var alldata = $("#ahmmosfc304p01_tablemonitoringdelivery").bootstrapTable('getData', false);
    if (selectedRow.dcancelreceive == null) {
        var numberofBodys = alldata.filter((x) => x.vid == selectedRow.vid).length;
        var model = new Object();
        model.operator = "";
        model.delcode = selectedRow.delcode;
        model.vid = selectedRow.vid;
        model.numberofBody = numberofBodys;
        return ahmmosfc304_SendAjaxSubmitPost(model, obj, '/submit-cancel-receive');
    } else {
        return false;
    }

}

function ahmmosfc304_stateFormatter(value, row, index) {
    if (row.dcanceldelivery != null) {
        return {
            disabled: true
        }
    }

}

function ahmmosfc304_dynamicSort(property, order) {
    var sortOrder = 1;
    if (order === "desc") {
        sortOrder = -1;
//        property = property.substr(1);
    }
    return function (a, b) {

// nulls sort after anything else
        if (a[property] === null) {
            return -1 * sortOrder;
        }
        if (b[property] === null) {
            return 1 * sortOrder;
        }
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}


function ahmmosfc304_tabEnter(event, tableid) {
    if (event.keyCode === 13) {
        var filtereddata = ahmmosfc304_filtertableMonitor();
        if (filtereddata.length == ahmmosfc304_loadeddata.length) {
            $("#" + tableid).bootstrapTable('load', ahmmosfc304_loadeddata);
        } else {
            $("#" + tableid).bootstrapTable('load', filtereddata);
        }

        ahmmosfc304_filtertableMonitor();
    }
}


function ahmmosfc304_filtertableMonitor() {
    var ddeliv = $("#ahmmosfc304_FilterDdelivery").val();
    var dreceive = $("#ahmmosfc304_FilterDreceive").val();
    var dcanceldel = $("#ahmmosfc304_FilterDcanceldelivery").val();
    var dcancelRec = $("#ahmmosfc304_FilterDcancelreceive").val();
    var wctfr = $("#ahmmosfc304_Filterwctfr").val();
    var plantfr = $("#ahmmosfc304_Filterplantfr").val();
    var wctto = $("#ahmmosfc304_Filterwctto").val();
    var plantto = $("#ahmmosfc304_Filterplantto").val();
    var krtid = $("#ahmmosfc304_Filteridkreta").val();
    var rfid = $("#ahmmosfc304_Filterrfid").val();
    var partnum = $("#ahmmosfc304_Filterpartnum").val();
    var partdesc = $("#ahmmosfc304_Filterpartdesc").val();
    var nqty = $("#ahmmosfc304_Filterqty").val();
    var nqtyintr = $("#ahmmosfc304_Filterqtyintrs").val();
    var delcode = $("#ahmmosfc304_Filterdelcode").val();
    var trnxstat = $("#ahmmosfc304_Filtertrnxstat").val();
    var headerdoc = $("#ahmmosfc304_Filterdocheader").val();
    var nntrnid = $("#ahmmosfc304_Filterntrnid").val();
    var matdoc = $("#ahmmosfc304_Filtermatdoc").val();
    var potDate = $("#ahmmosfc304_Filterpostdate").val();
    ahmmosfc304_FilteredLoadData = ahmmosfc304_loadeddata.filter(x => ahmmosfc304_filterproperty(x.ddelivery, ddeliv)
                && ahmmosfc304_filterproperty(x.dreceive, dreceive)
                && ahmmosfc304_filterproperty(x.dcanceldelivery, dcanceldel)
                && ahmmosfc304_filterproperty(x.dcancelreceive, dcancelRec)
                && ahmmosfc304_filterproperty(x.wctfr, wctfr)
                && ahmmosfc304_filterproperty(x.plantfr, plantfr)
                && ahmmosfc304_filterproperty(x.wctto, wctto)
                && ahmmosfc304_filterproperty(x.plantto, plantto)
                && ahmmosfc304_filterproperty(x.krtid, krtid)
                && ahmmosfc304_filterproperty(x.rfid, rfid)
                && ahmmosfc304_filterproperty(x.partnum, partnum)
                && ahmmosfc304_filterproperty(x.partdesc, partdesc)
                && ahmmosfc304_filterproperty(x.nqty, nqty)
                && ahmmosfc304_filterproperty(x.nqtyintr, nqtyintr)
                && ahmmosfc304_filterproperty(x.delcode, delcode)
                && ahmmosfc304_filterproperty(x.trnxstat, trnxstat)
                && ahmmosfc304_filterproperty(x.headerdoc, headerdoc)
                && ahmmosfc304_filterproperty(x.nntrnid, nntrnid)
                && ahmmosfc304_filterproperty(x.matdoc, matdoc)
                && ahmmosfc304_filterproperty(x.potDate, potDate));
    return ahmmosfc304_FilteredLoadData;
}




function ahmmosfc304_filterproperty(value, filter) {
    if (typeof value == 'string') {
        if (value.includes(filter)) {
            return true;
        } else {
            return false;
        }
    } else {
        if (filter == "") {
            return true
        } else {
            if (value == filter) {
                return true;
            } else {
                return false;
            }
        }

    }
}

function ahmmosfc304_Export(obj) {
    var data = $("#ahmmosfc304p01_tablemonitoringdelivery").bootstrapTable('getData', 'useCurrentPage');
    if (data.length > 0) {
        params = {
            wctfr: $("#ahmmosfc304p01_wctfrid").val(),
            wctto: $("#ahmmosfc304p01_wcttoid").val(),
            plantfr: $("#ahmmosfc304p01_plantfrid").val(),
            plantto: $("#ahmmosfc304p01_planttoid").val(),
            ddeliveryfr: $("#ahmmosfc304p01_datedelivfr").val(),
            dreceivefr: $("#ahmmosfc304p01_datereceivefr").val(),
            ddeliveryto: $("#ahmmosfc304p01_datedelivto").val(),
            dreceiveto: $("#ahmmosfc304p01_datereceiveto").val(),
            partnum: $("#ahmmosfc304p01_partnum").val(),
            delcode: $("#ahmmosfc304p01_delcode").val(),
            krtid: $("#ahmmosfc304p01_idkreta").val()
        };
        var exportUrl = ahmmosfc304_url + "/export-monitoring?" + $.param(params) + "&JXID=" + encodeURIComponent(getJxid());
        window.open(exportUrl);
    } else {
        _fw_setMessage(obj, 0, 'Pilih pencarian delivery terlebih dahulu!');
    }

}
