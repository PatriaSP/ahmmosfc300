/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var ahmmosfc303_selectionLayout = "part";
var ahmmosfc303_filteredparameter;
var ahmmosfc303_selectedvid;
var ahmmosfc303_url = "/imo05/ahmmosfc300-ahs/rest/mo/sfc303";
var ahmmosfc303_lastonlinestat = false;
var ahmmosfc303_numberofBody;
var ahmmosfc303_selectedDelcode = "";
$(document).ready(() => {
    ahmmosfc303_triggerFocus(document.getElementById("ahmmosfc303p01_delivertycode"));
    //Set Scan By Part as Default Value();
    ahmmosfcSwitchLayout('part');

    waitForElementToExist($('#ahmmosfc303_delLov').next().find("table")).then(() => {
        //Automatically Change Table from Selection on Delivery Code
        $("#ahmmosfc303_delLov").next().find("table").on('click-row.bs.table', function (e, row, $element) {

            if (row.txntype == '0') {
                $('#ahmmosfc303_switchreceivebypart').prop('checked', true).trigger('change');
            } else {
                $('#ahmmosfc303_switchreceivebykereta').prop('checked', true).trigger('change');
            }

            if (row.delcode != ahmmosfc303_selectedDelcode && ahmmosfc303_selectedDelcode != "") {
                ahmmosfc303_ResetField("ahmmosfc303p01formarea", "trigger");
                $('#ahmmosfc303_tablereceivebypart').bootstrapTable('removeAll');
                $('#ahmmosfc303_tablereceivebyidkreta').bootstrapTable('removeAll');
                ahmmosfc303_selectedDelcode = row.delcode;
            } else {
                ahmmosfc303_selectedDelcode = row.delcode;
            }
            ahmmosfc303_triggerFocus(document.getElementById("ahmmosfc303p01_oprid"));

        });

        $('#ahmmosfc303_delLov').next().find("table").on('post-body.bs.table', function (e) {
            var data = $(this).bootstrapTable('getData', 'useCurrentPage');
            if (data.length == 1) {
                if (data[0].delcode != ahmmosfc303_selectedDelcode && ahmmosfc303_selectedDelcode != "") {
                    ahmmosfc303_ResetField("ahmmosfc303p01formarea", "trigger");
                    $('#ahmmosfc303_tablereceivebypart').bootstrapTable('removeAll');
                    $('#ahmmosfc303_tablereceivebyidkreta').bootstrapTable('removeAll');
                    ahmmosfc303_selectedDelcode = data[0].delcode;
                } else {
                    ahmmosfc303_selectedDelcode = data[0].delcode;
                }
                ahmmosfc303_triggerFocus(document.getElementById("ahmmosfc303p01_oprid"));
            }
        });
    });


    $("#ahmmosfc303p01_delivertycode").on('keyup', function () {
        console.log($(this).val());
        if ($(this).val() == null || $(this).val() == "") {
            ahmmosfc303_ResetField("ahmmosfc303p01formarea", "trigger");
            $('#ahmmosfc303_tablereceivebypart').bootstrapTable('removeAll');
            $('#ahmmosfc303_tablereceivebyidkreta').bootstrapTable('removeAll');
        }
    });


});


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

//creates a variable that saves the original text and its length
var ahmmosfc303_nrp = "";
var ahmmosfc303_strlen = 0;
$("#ahmmosfc303p01_oprid").on("input", function () {
    var nrpVal = document.getElementById('ahmmosfc303p01_oprid');
    ahmmosfc303_nrp = nrpVal.value;
});

$('input[type=radio][name=ahmmosfc303switchlayout]').change(function () {
    //Disable Submit on Switch
    $("#ahmmosfc303p01_submit_btn").attr("disabled", "true");
    ahmmosfc303_selectionLayout = this.value;
    ahmmosfcSwitchLayout(this.value);
});

function ahmmosfcSwitchLayout(layout) {

    if (layout == "part") {
        //Remove All Data On Switch
        $('#ahmmosfc303_tablereceivebyidkreta').bootstrapTable('removeAll');
        $("#ahmmosfc303_tablereceiveareabypartnumber").removeAttr("hidden");
        $("#ahmmosfc303_tablereceiveareabyidkreta").attr("hidden", "true");
    } else {
        //Remove All Data On Switch
        $('#ahmmosfc303_tablereceivebypart').bootstrapTable('removeAll');
        $("#ahmmosfc303_tablereceiveareabyidkreta").removeAttr("hidden");
        $("#ahmmosfc303_tablereceiveareabypartnumber").attr("hidden", "true");
    }
}

function ahmmosfc303p01_lookupDelCode(params) {
    params.search = {
        SEARCH_PARAM: $("#ahmmosfc303p01_delivertycode").val()
    };
    if (params.sort === undefined) {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "number",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "delcode") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "VDELCODE",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "description") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "DESCRIPTION",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "vid") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "RMVPRT_VID",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    return params;
}

function ahmmosfc303p01_table_paramSearch(params) {
    params.search = {
        SEARCH_PARAM: $("#ahmmosfc303p01_delivertycodeid").val(),
    };
    if (params.sort === undefined) {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "number",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    if (params.sort === "partnum") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "DMOV.VPARTNUM",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "partdesc") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "MPART.VPARTDESC",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "qty") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "DMOV.NQTY",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "vkrtid") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "DMOV.VKRTID",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    return params;
}

function ahmmosfc303p01_table_param2Search(params) {
    params.search = {
        SEARCH_PARAM: $("#ahmmosfc303p01_delivertycodeid").val()

    };
    if (params.sort === undefined) {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "number",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    if (params.sort === "partnum") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "DMOV.VPARTNUM",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "partdesc") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "MPART.VPARTDESC",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "qty") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "DMOV.NQTY",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    if (params.sort === "vkrtid") {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "DMOV.VKRTID",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }

    return params;
}


function ahmmosfc303p01_lookupOperator(params) {
    params.search = {
        SEARCH_PARAM: ahmmosfc303_nrp
    };
    if (params.sort === undefined) {
        return {
            limit: params.limit,
            offset: params.offset,
            sort: "sortdcrea",
            order: (params.order === "desc") ? "asc" : "desc",
            search: params.search
        };
    }
    return params;
}
function ahmmosfc303_GetScanReceiveData(obj) {
    _fw_validation_clear(obj);
    _fw_validation_add(obj, 'ahmmosfc303p01_delivertycodeid', 'required');
    _fw_validation_add(obj, 'ahmmosfc303p01_oprid', 'required');

    if (_fw_validation_validate(obj)) {
        if (ahmmosfc303_selectionLayout == "part") {
            ahmmosfc303_RefreshTablebyPartnum();
        } else {
            ahmmosfc303_RefreshTablebyKeretaID();
        }

    }
}

function ahmmosfc303_ResponseHandler(resps) {

    if (resps.status != '0') {
        if (resps.data.length > 0) {
            $("#ahmmosfc303p01_submit_btn").removeAttr("disabled");
            ahmmosfc303_selectedvid = resps.data[0].vid;
            ahmmosfc303_numberofBody = resps.total;
        }

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

function ahmmosfc303_SubmitReceive(obj) {
    _fw_validation_clear(obj);
    _fw_validation_add(obj, 'ahmmosfc303p01_delivertycodeid', 'required');
    _fw_validation_add(obj, 'ahmmosfc303p01_oprid', 'required');


    if (_fw_validation_validate(obj) && ahmmosfc303_selectedvid != null) {
        var model = new Object();
        model.operator = ahmmosfc303_nrp;
        model.delcode = $('#ahmmosfc303p01_delivertycode').val();
        model.vid = ahmmosfc303_selectedvid;
        model.numberofBody = ahmmosfc303_numberofBody;
        ahmmosfc303_SendAjaxSubmitPost(model, obj);
    }
}

function ahmmosfc303_SendAjaxSubmitPost(model, obj) {
    _fw_post(ahmmosfc303_url + '/submit-receive', model, function (data) {
        if (data.status == "1") {
            //on Success Rest All Field to null and disable submit btn
            $("#ahmmosfc303p01_submit_btn").attr("disabled", "true");
            $('#ahmmosfc303_tablereceivebyidkreta').bootstrapTable('removeAll');
            $('#ahmmosfc303_tablereceivebypart').bootstrapTable('removeAll');
            ahmmosfc303_ResetField("ahmmosfc303p01formarea", "click");
            _fw_setMessage(obj, 1, "Delivery code [" + model.delcode + "] has been successfully received");
        } else {
            if (data.message != "") {
                _fw_setMessage(obj, 0, data.message);
            } else {
                _fw_setMessage(obj, 0, 'Receiving delivery failed');
            }
        }
    });
}

function ahmmosfc303_triggerSearchbyEnter(event, obj) {
    if (event.keyCode === 13) {
        ahmmosfc303_GetScanReceiveData(obj)
    }
}

function ahmmosfc303_RefreshTablebyPartnum() {
    $('#ahmmosfc303_tablereceivebypart').bootstrapTable('refresh');
    return this;
}
function ahmmosfc303_RefreshTablebyKeretaID() {
    $('#ahmmosfc303_tablereceivebyidkreta').bootstrapTable('refresh');
    return this;
}

function ahmmosfc303_ResetField(id, trigger) {
    if (trigger == 'click') {
        $("#" + id).find("input").val("");
    } else {
        $("#" + id).find("input").not($("#ahmmosfc303_groupdelcode").find('input')).val("");
    }

}

function ahmmosfc303_tabEnter(event, tableid) {
    if (event.keyCode === 13) {
        $("#" + tableid).bootstrapTable('refresh');
    }
}

function ahmmosfc303_triggerFocus(element) {
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

function ahmmosfc303_ResetField(id, trigger) {
    $("#" + id).find("input").not("#ahmmosfc303p01_oprid").not("#ahmmosfc303p01_nrpdesc").val("");
    $('#ahmmosfc303_tablereceivebypart').bootstrapTable('removeAll');
    $('#ahmmosfc303_tablereceivebyidkreta').bootstrapTable('removeAll');

}