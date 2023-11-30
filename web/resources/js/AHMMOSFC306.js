/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const ahmmosfc306 = $("#AHMMOSFC306");
const ahmmosfc306_tabpanel = $("#tabpanel_AHMMOSFC306");
var ahmmosfc306p01_filterplant;
var ahmmosfc306p01_filterpart;
var ahmmosfc306p01_filterslocid;
var ahmmosfc306p01_filtermaterial;
var ahmmosfc306p02_filterplant;
var ahmmosfc306p02_filterpart;
var ahmmosfc306p02_filterslocid;
var ahmmosfc306p02_filtermaterial;
var ahmmosfc306p02_filterdfrom;
var ahmmosfc306p02_filterdto;
var ahmmosfc306_selectedOverview;
var ahmmosfc306_selectedPosting;
const ahmmosfc306_url = "/imo05/ahmmosfc300-ahs/rest/mo/sfc306";
$(document).ready(() => {

    $("#ahmmosfc306p01_material").val("ZPAM");
    $("#ahmmosfc306p02_material").val("ZPAM");
    setTimeout(function () {
        var mainAppOffset = parseInt($(".main-app", ahmmosfc306_tabpanel).offset().top);
        var pageFooterMarginTop = parseInt($(".page-footer", ahmmosfc306_tabpanel).css("margin-top"));
        var pageFooterMarginBot = parseInt($(".page-footer", ahmmosfc306_tabpanel).css("margin-bottom"));
        var pageFooterHeight = parseInt($(".page-footer", ahmmosfc306_tabpanel).innerHeight());
        var fullHeight = pageFooterMarginTop + pageFooterMarginBot + pageFooterHeight + mainAppOffset;
        $(".main-app", ahmmosfc306_tabpanel).css("min-height", "calc(100vh - " + fullHeight + "px)");
        $("body.ahm").addClass("collapsed");
        $(".ahmmosfc306_tab:first-child", ahmmosfc306).click();
    }, 100);

    var todayDate = new Date();
    $("#ahmmosfc306p02_datefrom", ahmmosfc306).datetimepicker({
        date: new Date(todayDate),
        format: 'DD-MMM-YYYY',
        locale: 'en',
        showClear: true,
        keepInvalid: false,
        useCurrent: false,
        widgetPositioning: {
            horizontal: 'right',
            vertical: 'bottom'
        }
    });
    $("#ahmmosfc306p02_dateto", ahmmosfc306).datetimepicker({
        date: new Date(todayDate),
        format: 'DD-MMM-YYYY',
        locale: 'en',
        showClear: true,
        keepInvalid: false,
        useCurrent: false,
        widgetPositioning: {
            horizontal: 'right',
            vertical: 'bottom'
        }
    });
    ahmmosfc306_getlastUpdate();
});
$(".subpageTrigger", ahmmosfc306).click(function () {
    var thisContent = $(this);
    if (typeof thisContent.attr("disabled") === typeof undefined && thisContent.attr("disabled") !== true) {
        $(".subpageTrigger", ahmmosfc306).removeClass("actived");
        $(this).addClass("actived");
        var thisPage = $(this).attr("subpage");
        _fw_subpage($(this), thisPage);
        if ($(".error-area .hidden", ahmmosfc306).length > 0) {
            $(".error-area", ahmmosfc306).addClass("hidden");
        }
    }
});
$(".ahmmosfc306_tab", ahmmosfc306).click(function () {
    var thisContent = $(this);
    if (typeof thisContent.attr("disabled") === typeof undefined && thisContent.attr("disabled") !== true) {
        var thisParent = thisContent.closest(".ahmmosfc306_tabs");
        if (!thisContent.hasClass("opened")) {
            $(".ahmmosfc306_tab", thisParent).removeClass("opened");
            thisContent.addClass("opened");
        }
    }
});

function ahmmosfc306_SwitchToDetail(obj) {
    var tables = $("#ahmmosfc306_maintable").bootstrapTable("getSelections");
    if (tables.length > 1) {
        _fw_setMessage(obj, 0, "Data tidak boleh lebih dari 1");
    } else if (tables.length < 1) {
        _fw_setMessage(obj, 0, "Harap pilih salah satu data");
    } else {
        ahmmosfc306_selectedOverview = tables[0];
        $("#ahmmosfc_overview_partnum").val(ahmmosfc306_selectedOverview.partnum);
        $("#ahmmosfc_overview_partdesc").val(ahmmosfc306_selectedOverview.partdesc);
        $("#ahmmosfc_overview_plantid").val(ahmmosfc306_selectedOverview.plantid);
        $("#ahmmosfc_overview_slocid").val(ahmmosfc306_selectedOverview.slocid);
        $("#ahmmosfc_overview_slocname").val(ahmmosfc306_selectedOverview.slocname);
        $("#ahmmosfc_overview_specstock").val(ahmmosfc306_selectedOverview.specstock);
        $("#ahmmosfc_overview_category").val(ahmmosfc306_selectedOverview.category);
        $("#ahmmosfc_overview_partareatype").val(ahmmosfc306_selectedOverview.partareatype);
        $("#ahmmosfc_overview_mtype").val(ahmmosfc306_selectedOverview.mtype);
        $("#ahmmosfc_overview_uom").val(ahmmosfc306_selectedOverview.uom);
        ahmmosfc306_RefreshTableOverviewDetail();
        _fw_subpage(obj, 'ahmmosfc306p04');
    }
}

function ahmmosfc306_SwitchToDetailPosting(obj) {
    var tables = $("#ahmmosfc306_postdatetable").bootstrapTable("getSelections");
    if (tables.length > 1) {
        _fw_setMessage(obj, 0, "Data tidak boleh lebih dari 1");
    } else if (tables.length < 1) {
        _fw_setMessage(obj, 0, "Harap pilih salah satu data");
    } else {
        ahmmosfc306_selectedPosting = tables[0];
        $("#ahmmosfc_posting_partnum").val(ahmmosfc306_selectedPosting.partnum);
        $("#ahmmosfc_posting_partdesc").val(ahmmosfc306_selectedPosting.partdesc);
        $("#ahmmosfc_posting_plantid").val(ahmmosfc306_selectedPosting.plantid);
        $("#ahmmosfc_posting_specstock").val(ahmmosfc306_selectedPosting.specstock);
        $("#ahmmosfc_posting_mtype").val(ahmmosfc306_selectedPosting.mtype);
        $("#ahmmosfc_posting_uom").val(ahmmosfc306_selectedPosting.uom);
        ahmmosfc306_RefreshTablePostingDetail();
        _fw_subpage(obj, 'ahmmosfc306p05');
    }
}


function ahmmosfc306p01_partLookup(params) {
    params.search = {
        SEARCH_PARAM: $("#ahmmosfc306p01_parts").val()
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

    if (params.sort === "partnum") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VPARTNUM",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    if (params.sort === "partdesc") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VPARTDESC",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    return params;
}

function ahmmosfc306p02_partLookup(params) {
    params.search = {
        SEARCH_PARAM: $("#ahmmosfc306p02_parts").val()
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

    if (params.sort === "partnum") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VPARTNUM",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    if (params.sort === "partdesc") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VPARTDESC",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    return params;
}

function ahmmosfc306p01_plantLookup(params) {
    params.search = {
        SEARCH_PARAM: $("#ahmmosfc306p01_plant").val()
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
            sort: "VPLANTID",
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

function ahmmosfc306p02_plantLookup(params) {
    params.search = {
        SEARCH_PARAM: $("#ahmmosfc306p02_plant").val()
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
            sort: "VPLANTID",
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

function ahmmosfc306p01_storlocLookup(params) {
    params.search = {
        plantid: $("#ahmmosfc306p01_plant").val(),
        SEARCH_PARAM: $("#ahmmosfc306p01_storloc").val()
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

    if (params.sort === "slocid") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VSLOCID",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    if (params.sort === "slocname") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VSLOCDESC",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    return params;
}

function ahmmosfc306p02_storlocLookup(params) {
    params.search = {
        plantid: $("#ahmmosfc306p02_plant").val(),
        SEARCH_PARAM: $("#ahmmosfc306p02_storloc").val()
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

    if (params.sort === "slocid") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VSLOCID",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    if (params.sort === "slocname") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VSLOCDESC",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    return params;
}

function ahmmosfc306p01_materialLookup(params) {
    params.search = {
        SEARCH_PARAM: $("#ahmmosfc306p01_material").val()
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

    if (params.sort === "itemcode") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VITEMCODE",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    return params;
}

function ahmmosfc306p02_materialLookup(params) {
    params.search = {
        SEARCH_PARAM: $("#ahmmosfc306p02_material").val()
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

    if (params.sort === "itemcode") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VITEMCODE",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    return params;
}
//Pre Func Lookup for Table on Overview Tab
function ahmmosfc306p01_table_paramSearch(params) {
    params.search = {
        plantid: ahmmosfc306p01_filterplant != null ? ahmmosfc306p01_filterplant : "",
        slocid: ahmmosfc306p01_filterslocid != null ? ahmmosfc306p01_filterslocid : "",
        part: ahmmosfc306p01_filterpart != null ? ahmmosfc306p01_filterpart : "",
        material: ahmmosfc306p01_filtermaterial != null ? ahmmosfc306p01_filtermaterial : "",
        filter_partnum: $("#ahmmosfc306filter_partnum").val(),
        filter_partdesc: $("#ahmmosfc306filter_partdesc").val(),
        filter_plantid: $("#ahmmosfc306filter_plantid").val(),
        filter_slocid: $("#ahmmosfc306filter_slocid").val(),
        filter_slocname: $("#ahmmosfc306filter_slocname").val(),
        filter_spacstock: $("#ahmmosfc306filter_specstock").val(),
        filter_category: $("#ahmmosfc306filter_category").val(),
        filter_partareatype: $("#ahmmosfc306filter_partareatype").val(),
        filter_mtype: $("#ahmmosfc306filter_mtype").val(),
        filter_uom: $("#ahmmosfc306filter_uom").val(),
        filter_unrestqty: $("#ahmmosfc306filter_unrestqty").val(),
        filter_qiqty: $("#ahmmosfc306filter_qiqty").val(),
        filter_blockqty: $("#ahmmosfc306filter_blockqty").val(),
        filter_restqty: $("#ahmmosfc306filter_restqty").val(),
        filter_intrfqty: $("#ahmmosfc306filter_intrfqty").val(),
        filter_grblockqty: $("#ahmmosfc306filter_grblockqty").val()
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

    if (params.sort === "sort_partnum") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "MPART_VPARTNUM",
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
    if (params.sort === "sort_partdesc") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VPARTDESC",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_plantid") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "MPLANT_VPLANTID",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_slocid") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VSLOCID",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_slocname") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VSLOCDESC",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_specstock") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VSPCSTOCK",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_category") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VCATEGORY",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_partareatype") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VAREA",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_mtype") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VMATTYPE",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_uom") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "MUOM_VUOMID",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_unrestqty") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "NQTYUNRES",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_qiqty") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "NQTYINQI",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_blockqty") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "NQTYBLOCK",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_restqty") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "NQTYRES",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_intrfqty") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "NQTYINTRFSL",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort_grblockqty") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "NQTYGRBLOCK",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    return params;
}

function ahmmosfc306p01_table_paramSearchbySloc(params) {
    params.search = {
        plantid: ahmmosfc306p01_filterplant != null ? ahmmosfc306p01_filterplant : "",
        slocid: ahmmosfc306p01_filterslocid != null ? ahmmosfc306p01_filterslocid : "",
        part: ahmmosfc306p01_filterpart != null ? ahmmosfc306p01_filterpart : "",
        material: ahmmosfc306p01_filtermaterial != null ? ahmmosfc306p01_filtermaterial : "",
        filter_partnum: $("#ahmmosfc306filter2_partnum").val(),
        filter_partdesc: $("#ahmmosfc306filter2_partdesc").val(),
        filter_plantid: $("#ahmmosfc306filter2_plantid").val(),
        filter_slocid: $("#ahmmosfc306filter2_slocid").val(),
        filter_slocname: $("#ahmmosfc306filter2_slocname").val(),
        filter_spacstock: $("#ahmmosfc306filter2_specstock").val(),
        filter_totalqty: $("#ahmmosfc306filter2_totalqty").val()
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

    if (params.sort === "sort2_partnum") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "MPART_VPARTNUM",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    if (params.sort === "sort2_partdesc") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VPARTDESC",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort2_plantid") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "MPLANT_VPLANTID",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort2_slocid") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VSLOCID",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort2_slocname") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VSLOCDESC",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort2_specstock") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VSPCSTOCK",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort2_totalqty") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "TOTQTY",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    return params;
}



function ahmmosfc306p01_table_paramSearchbyPlant(params) {
    params.search = {
        plantid: ahmmosfc306p01_filterplant != null ? ahmmosfc306p01_filterplant : "",
        slocid: ahmmosfc306p01_filterslocid != null ? ahmmosfc306p01_filterslocid : "",
        part: ahmmosfc306p01_filterpart != null ? ahmmosfc306p01_filterpart : "",
        material: ahmmosfc306p01_filtermaterial != null ? ahmmosfc306p01_filtermaterial : "",
        filter_partnum: $("#ahmmosfc306filter3_partnum").val(),
        filter_partdesc: $("#ahmmosfc306filter3_partdesc").val(),
        filter_plantid: $("#ahmmosfc306filter3_plantid").val(),
        filter_intrfqtysloc: $("#ahmmosfc306filter3_intrfqtysloc").val(),
        filter_intrfqty: $("#ahmmosfc306filter3_intrfqty").val()
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

    if (params.sort === "sort3_partnum") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "MPART_VPARTNUM",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    if (params.sort === "sort3_partdesc") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VPARTDESC",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort3_plantid") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "MPLANT_VPLANTID",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort3_intrfqtysloc") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "NQTYINTRFPL",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort3_intrfqty") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "NQTYINTRS",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    return params;
}
//Pre Func Lookup for Posted Date Tab
function ahmmosfc306p02_table_paramSearch(params) {
    params.search = {
        plantid: ahmmosfc306p02_filterplant != null ? ahmmosfc306p02_filterplant : "",
        slocid: ahmmosfc306p02_filterslocid != null ? ahmmosfc306p02_filterslocid : "",
        part: ahmmosfc306p02_filterpart != null ? ahmmosfc306p02_filterpart : "",
        material: ahmmosfc306p02_filtermaterial != null ? ahmmosfc306p02_filtermaterial : "",
        dfrom: ahmmosfc306p02_filterdfrom != null ? ahmmosfc306p02_filterdfrom : "",
        dto: ahmmosfc306p02_filterdto != null ? ahmmosfc306p02_filterdto : "",
        filter_partnum: $("#ahmmosfc306filter4_partnum").val(),
        filter_partdesc: $("#ahmmosfc306filter4_partdesc").val(),
        filter_plantid: $("#ahmmosfc306filter4_plantid").val(),
        filter_spacstock: $("#ahmmosfc306filter4_specstock").val(),
        filter_mtype: $("#ahmmosfc306filter4_mtype").val(),
        filter_uom: $("#ahmmosfc306filter4_uom").val(),
        filter_openqty: $("#ahmmosfc306filter4_openqty").val(),
        filter_recqty: $("#ahmmosfc306filter4_recqty").val(),
        filter_issqty: $("#ahmmosfc306filter4_issqty").val(),
        filter_closeqty: $("#ahmmosfc306filter4_closeqty").val()
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

    if (params.sort === "sort4_partnum") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "MPART_VPARTNUM",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    if (params.sort === "sort4_partdesc") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VPARTDESC",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort4_plantid") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "MPLANT_VPLANTID",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort4_specstock") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VSPCSTOCK",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort4_mtype") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VMATTYPE",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort4_uom") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "MUOM_VUOMID",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort4_openqty") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "NQTYOPEN",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort4_recqty") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "NQTYRECEIPT",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort4_issqty") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "NQTYISSUE",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort4_close") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "NQTYCLOSING",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    return params;
}


//Pre lookup table Error Log

function ahmmosfc306p03_table_paramSearch(params) {
    params.search = {
        SEARCH_PARAM: ""
    };
    if (params.sort === undefined) {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "sortdcrea",
            order: "desc",
            search: params.search
        };
    }

    if (params.sort === "plantid") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "sortdcrea",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    if (params.sort === "plantname") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "sortdesc",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    return params;
}
//Pre Lookup for Detail Overview
function ahmmosfc306p04_table_paramSearch(params) {
    params.search = {
        SEARCH_PARAM: "",
        specstock: ahmmosfc306_selectedOverview != null ? ahmmosfc306_selectedOverview.specstock : "",
        category: ahmmosfc306_selectedOverview != null ? ahmmosfc306_selectedOverview.category : "",
        part: ahmmosfc306_selectedOverview != null ? ahmmosfc306_selectedOverview.partnum : "",
        plantid: ahmmosfc306_selectedOverview != null ? ahmmosfc306_selectedOverview.plantid : "",
        slocid: ahmmosfc306_selectedOverview != null ? ahmmosfc306_selectedOverview.slocid : "",
        filter_subsloc: $("#ahmmosfc306filter5_subslocid").val(),
        filter_subslocname: $("#ahmmosfc306filter5_subslocname").val(),
        filter_lotsupid: $("#ahmmosfc306filter5_batchno").val(),
        filter_batchno: $("#ahmmosfc306filter5_lotsupid").val(),
        filter_unrestqty: $("#ahmmosfc306filter5_unrestqty").val(),
        filter_qiqty: $("#ahmmosfc306filter5_qiqty").val(),
        filter_blockqty: $("#ahmmosfc306filter5_blockqty").val(),
        filter_restqty: $("#ahmmosfc306filter5_restqty").val()
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

    if (params.sort === "sort5_subslocid") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VSUBSLOC",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    if (params.sort === "sort5_subslocname") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VSUBSLOCDESC",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort5_lotsupid") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VLOTSUPID",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    if (params.sort === "sort5_batchno") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VBATCHNO",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort5_unrestqty") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "NQTYUNRES",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    if (params.sort === "sort5_qiqty") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "NQTYINQI",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort5_blockqty") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "NQTYBLOCK",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    if (params.sort === "sort5_restqty") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "NQTYRES",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    return params;
}

function ahmmosfc306p05_table_paramSearch(params) {
    params.search = {
        plantid: ahmmosfc306_selectedPosting != null ? ahmmosfc306_selectedPosting.plantid : "",
        slocid: ahmmosfc306p02_filterslocid != null ? ahmmosfc306p02_filterslocid : "",
        part: ahmmosfc306_selectedPosting != null ? ahmmosfc306_selectedPosting.partnum : "",
        specstock: ahmmosfc306_selectedPosting != null ? ahmmosfc306_selectedPosting.specstock : "",
        dfrom: ahmmosfc306p02_filterdfrom != null ? ahmmosfc306p02_filterdfrom : "",
        dto: ahmmosfc306p02_filterdto != null ? ahmmosfc306p02_filterdto : "",
        filter_date: $("#ahmmosfc306filter6_date").val(),
        filter_slocid: $("#ahmmosfc306filter6_slocid").val(),
        filter_slocname: $("#ahmmosfc306filter6_slocname").val(),
        filter_movtype: $("#ahmmosfc306filter6_movtype").val(),
        filter_mdocs: $("#ahmmosfc306filter6_mdocs").val(),
        filter_totalqty: $("#ahmmosfc306filter6_totalqty").val()
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

    if (params.sort === "sort6_date") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "DPOSTING",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    if (params.sort === "sort6_slocid") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VSLOCID",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort6_slocname") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VSLOCDESC",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    if (params.sort === "sort6_movtype") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VMVTTYPE",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "sort6_mdocs") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VMATDOC",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    if (params.sort === "sort6_totalqty") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "NQTY",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    return params;
}



function ahmmosfc306_ResponseHandler(resps) {

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


function ahmmosfc306_ErrHandler(resps) {

    if (resps.status != '0') {
        if (resps.data.length > 0) {
            $("div[id^='ahmmosfc306_incompletedataerror_']").removeAttr("hidden");
        } else {
            $("div[id^='ahmmosfc306_incompletedataerror_']").attr("hidden", true);
        }

        return {
            rows: resps.data,
            total: resps.total
        };
    } else {
        $("div[id^='ahmmosfc306_incompletedataerror_']").attr("hidden", true);
        return {
            rows: [],
            total: 0
        };
    }

}

function ahmmosfc306p01_filtertableMainArea(obj) {

    _fw_validation_clear(obj);
    _fw_validation_add(obj, 'ahmmosfc306p01_plant', 'required');
    _fw_validation_add(obj, 'ahmmosfc306p01_material', 'required');

    if (_fw_validation_validate(obj)) {
        ahmmosfc306p01_filterplant = $("#ahmmosfc306p01_plant").val();
        ahmmosfc306p01_filterslocid = $("#ahmmosfc306p01_storloc").val();
        ahmmosfc306p01_filterpart = $("#ahmmosfc306p01_parts").val();
        ahmmosfc306p01_filtermaterial = $("#ahmmosfc306p01_material").val();
        ahmmosfc306_RefreshTable();
        ahmmosfc306_RefreshTableSummarySloc();
        ahmmosfc306_RefreshTableSummaryPlant();
    }

}

function ahmmosfc306p02_filtertablePostedDate(obj) {
    _fw_validation_clear(obj);
    _fw_validation_add(obj, 'ahmmosfc306p02_plant', 'required');
    _fw_validation_add(obj, 'ahmmosfc306p02_material', 'required');
    _fw_validation_add(obj, 'ahmmosfc306p02_datefrom', 'required');
    _fw_validation_add(obj, 'ahmmosfc306p02_dateto', 'required');
    if (_fw_validation_validate(obj)) {


        ahmmosfc306p02_filterplant = $("#ahmmosfc306p02_plant").val();
        ahmmosfc306p02_filterslocid = $("#ahmmosfc306p02_storloc").val();
        ahmmosfc306p02_filterpart = $("#ahmmosfc306p02_parts").val();
        ahmmosfc306p02_filtermaterial = $("#ahmmosfc306p02_material").val();
        ahmmosfc306p02_filterdfrom = $("#ahmmosfc306p02_datefrom").val();
        ahmmosfc306p02_filterdto = $("#ahmmosfc306p02_dateto").val();
        ahmmosfc306_RefreshTablePostedDate();
    }




}

function ahmmosfc306_RefreshTable() {
    $('#ahmmosfc306_maintable').bootstrapTable('refresh');
    return this;
}
function ahmmosfc306_RefreshTableSummarySloc() {
    $('#ahmmosfc306_tablebystorloc').bootstrapTable('refresh');
    return this;
}
function ahmmosfc306_RefreshTableSummaryPlant() {
    $('#ahmmosfc306_tablebyplantid').bootstrapTable('refresh');
    return this;
}
function ahmmosfc306_RefreshTablePostedDate() {
    $('#ahmmosfc306_postdatetable').bootstrapTable('refresh');
    return this;
}

function ahmmosfc306_RefreshErroTabs() {
    $('#ahmmosfc306p03_tablelogerr').bootstrapTable('refresh');
    $('#ahmmosfc306p03_tablejoinErr').bootstrapTable('refresh');
    return this;
}

function ahmmosfc306_RefreshTableOverviewDetail() {
    $('#ahmmosfc306_tbloverviewdetail').bootstrapTable('refresh');
    return this;
}

function ahmmosfc306_RefreshTablePostingDetail() {
    $('#ahmmosfc306_tbldetailpostingdate').bootstrapTable('refresh');
    return this;
}
function ahmmosfc306_ExportbyPlant(obj) {
    _fw_validation_clear(obj);
    _fw_validation_add(obj, 'ahmmosfc306p01_plant', 'required');
    _fw_validation_add(obj, 'ahmmosfc306p01_material', 'required');
    if (_fw_validation_validate(obj)) {
        params = {
            plantid: ahmmosfc306p01_filterplant != null ? ahmmosfc306p01_filterplant : $("#ahmmosfc306p01_plant").val(),
            slocid: ahmmosfc306p01_filterslocid != null ? ahmmosfc306p01_filterslocid : $("#ahmmosfc306p01_storloc").val(),
            part: ahmmosfc306p01_filterpart != null ? ahmmosfc306p01_filterpart : $("#ahmmosfc306p01_parts").val(),
            material: ahmmosfc306p01_filtermaterial != null ? ahmmosfc306p01_filtermaterial : ""
        };
        var exportUrl = ahmmosfc306_url + "/export-supply-by-plant?" + $.param(params) + "&JXID=" + encodeURIComponent(getJxid());
        window.open(exportUrl);
    } else {
        _fw_setMessage(obj, 0, 'Pilih pencarian terlebih dahulu!');
    }

}

function ahmmosfc306_ExportbySloc(obj) {
    _fw_validation_clear(obj);
    _fw_validation_add(obj, 'ahmmosfc306p01_plant', 'required');
    _fw_validation_add(obj, 'ahmmosfc306p01_material', 'required');
    if (_fw_validation_validate(obj)) {
        params = {
            plantid: ahmmosfc306p01_filterplant != null ? ahmmosfc306p01_filterplant : $("#ahmmosfc306p01_plant").val(),
            slocid: ahmmosfc306p01_filterslocid != null ? ahmmosfc306p01_filterslocid : $("#ahmmosfc306p01_storloc").val(),
            part: ahmmosfc306p01_filterpart != null ? ahmmosfc306p01_filterpart : $("#ahmmosfc306p01_parts").val(),
            material: ahmmosfc306p01_filtermaterial != null ? ahmmosfc306p01_filtermaterial : $("#ahmmosfc306p01_material").val()
        };
        var exportUrl = ahmmosfc306_url + "/export-supply-by-sloc?" + $.param(params) + "&JXID=" + encodeURIComponent(getJxid());
        window.open(exportUrl);
    } else {
        _fw_setMessage(obj, 0, 'Pilih pencarian terlebih dahulu!');
    }

}

function ahmmosfc306_ExportDetail(obj) {
    params = {
        specstock: ahmmosfc306_selectedOverview != null ? ahmmosfc306_selectedOverview.specstock : "",
        category: ahmmosfc306_selectedOverview != null ? ahmmosfc306_selectedOverview.category : "",
        part: ahmmosfc306_selectedOverview != null ? ahmmosfc306_selectedOverview.partnum : "",
        plantid: ahmmosfc306_selectedOverview != null ? ahmmosfc306_selectedOverview.plantid : "",
        slocid: ahmmosfc306_selectedOverview != null ? ahmmosfc306_selectedOverview.slocid : ""
    };
    var exportUrl = ahmmosfc306_url + "/export-overview-detail?" + $.param(params) + "&JXID=" + encodeURIComponent(getJxid());
    window.open(exportUrl);
}

function ahmmosfc306_ExportPostingDetail(obj) {
    params = {
        plantid: ahmmosfc306_selectedPosting != null ? ahmmosfc306_selectedPosting.plantid : "",
        slocid: ahmmosfc306p02_filterslocid != null ? ahmmosfc306p02_filterslocid : "",
        part: ahmmosfc306_selectedPosting != null ? ahmmosfc306_selectedPosting.partnum : "",
        specstock: ahmmosfc306_selectedPosting != null ? ahmmosfc306_selectedPosting.specstock : "",
        dfrom: ahmmosfc306p02_filterdfrom != null ? ahmmosfc306p02_filterdfrom : "",
        dto: ahmmosfc306p02_filterdto != null ? ahmmosfc306p02_filterdto : ""
    };
    var exportUrl = ahmmosfc306_url + "/export-posting-detail?" + $.param(params) + "&JXID=" + encodeURIComponent(getJxid());
    window.open(exportUrl);
}

function ahmmosfc306_ExportError(obj) {
    var exportUrl = ahmmosfc306_url + "/export-error-log?JXID=" + encodeURIComponent(getJxid());
    window.open(exportUrl);
}

function ahmmosfc306_ExportPostingDate(obj) {
    _fw_validation_clear(obj);
    _fw_validation_add(obj, 'ahmmosfc306p02_plant', 'required');
    _fw_validation_add(obj, 'ahmmosfc306p02_material', 'required');
    _fw_validation_add(obj, 'ahmmosfc306p02_datefrom', 'required');
    _fw_validation_add(obj, 'ahmmosfc306p02_dateto', 'required');
    if (_fw_validation_validate(obj)) {
        params = {
            plantid: ahmmosfc306p02_filterplant != null ? ahmmosfc306p02_filterplant : $("#ahmmosfc306p02_plant").val(),
            slocid: ahmmosfc306p02_filterslocid != null ? ahmmosfc306p02_filterslocid : $("#ahmmosfc306p02_storloc").val(),
            part: ahmmosfc306p02_filterpart != null ? ahmmosfc306p02_filterpart : $("#ahmmosfc306p02_parts").val(),
            material: ahmmosfc306p02_filtermaterial != null ? ahmmosfc306p02_filtermaterial : $("#ahmmosfc306p02_material").val(),
            dfrom: ahmmosfc306p02_filterdfrom != null ? ahmmosfc306p02_filterdfrom : $("#ahmmosfc306p02_datefrom").val(),
            dto: ahmmosfc306p02_filterdto != null ? ahmmosfc306p02_filterdto : $("#ahmmosfc306p02_dateto").val()
        };
        var exportUrl = ahmmosfc306_url + "/export-posted-date?" + $.param(params) + "&JXID=" + encodeURIComponent(getJxid());
        window.open(exportUrl);
    } else {
        _fw_setMessage(obj, 0, 'Pilih pencarian terlebih dahulu!');
    }

}

function ahmmosfc306_ExportOverview(obj) {
    _fw_validation_clear(obj);
    _fw_validation_add(obj, 'ahmmosfc306p01_plant', 'required');
    _fw_validation_add(obj, 'ahmmosfc306p01_material', 'required');
    if (_fw_validation_validate(obj)) {
        params = {
            plantid: ahmmosfc306p01_filterplant != null ? ahmmosfc306p01_filterplant : $("#ahmmosfc306p01_plant").val(),
            slocid: ahmmosfc306p01_filterslocid != null ? ahmmosfc306p01_filterslocid : $("#ahmmosfc306p01_storloc").val(),
            part: ahmmosfc306p01_filterpart != null ? ahmmosfc306p01_filterpart : $("#ahmmosfc306p01_parts").val(),
            material: ahmmosfc306p01_filtermaterial != null ? ahmmosfc306p01_filtermaterial : ""
        };
        var exportUrl = ahmmosfc306_url + "/export-overview?" + $.param(params) + "&JXID=" + encodeURIComponent(getJxid());
        window.open(exportUrl);
    } else {
        _fw_setMessage(obj, 0, 'Pilih pencarian terlebih dahulu!');
    }

}

function ahmmosfc306_getlastUpdate() {
    _fw_post('/imo05/ahmmosfc300-ahs/rest/mo/sfc306/get-last-update', null, function (data) {
        if (data.status == "1") {
            $("#ahmmosfc306_lastupdate").text(data.data[0]);
            $("#ahmmosfc306p01_status").val(data.message.status == "S" ? "Success" : "Error");

            if (data.message.status != "S") {
                $("#ahmmosfc306p01_errormsg").val(data.message.errorMessage);
            }

        }


    });
}

function ahmmosfc306_formatterQty(value, row, index) {


    if (value < 0) {
        return "<span>" + value.toLocaleString() + "</span>";
    } else {
        return "<span>" + value.toLocaleString() + "</span>";
    }

}

function ahmmosfc306_cellStyleFormatter(value, row, index) {
    if (value < 0) {
        return {
            classes: 'bg-danger'
        };
    }
    return {
        css: {
            color: 'black'
        }
    };


}

function ahmmosfc306_RunCalculation(obj) {
    _fw_post('/imo05/ahmmosfc300-ahs/rest/mo/sfc306/run-calculation', null, function (data) {
        if (data.status == "1") {
            _fw_setMessage(obj, 1, 'proses kalkulasi ulang berhasil.');
            ahmmosfc306_RefreshErroTabs();
        } else {
            _fw_setMessage(obj, 0, data.message.msg);
        }
    });
}

function ahmmosfc306_ResetField(id) {
    $("#" + id).find("input").val("");
}

function ahmmosfc306_SubmitRequestSAP(obj) {
    _fw_validation_clear(obj);
    _fw_validation_add(obj, 'ahmmosfc306p01_plant', 'required');
    if (_fw_validation_validate(obj) && ahmmosfc306p01_filterplant != null) {
        var model = new Object();
        model.plantid = ahmmosfc306p01_filterplant;
        _fw_post('/imo05/ahmmosfc300-ahs/rest/mo/sfc306/submit-request-sap', model, function (data) {
            if (data.status == "1") {
                _fw_setMessage(obj, 1, 'Request SAP berhasil di simpan');
            } else {
                _fw_setMessage(obj, 0, data.message.Error);
            }
        });
    } else {
        _fw_setMessage(obj, 0, 'Harap pilih pencarian terlebih dahulu');
    }
}

function ahmmosfc306_tabEnter(event, tableid) {
    if (event.keyCode === 13) {
        $("#" + tableid).bootstrapTable('refresh');
    }
}
