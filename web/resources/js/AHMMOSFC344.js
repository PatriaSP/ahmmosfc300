const ahmmosfc344 = $("#AHMMOSFC344");
const tabpanel_ahmmosfc344 = $("#tabpanel_" + ahmmosfc344.attr("id") + "");

function ahmmosfc344_post(postUrl, postData, callback, isAsync = false) {
	$.ajax({
		type: "POST",
		url: postUrl,
		contentType: "application/json",
		dataType: 'json',
		async: isAsync,
		headers: {
			"JXID": getJxid()
		},
		data: JSON.stringify(postData),
		success: function (response) {
			if (response.status == '0' && (response.message.authentication == "Invalid Request")) {
				openLoginForm();
			} else if (response.stat != '401') {
				if (typeof (callback) == 'function') {
					callback(response);
				}
			}
		},
		error: function (xhr, textStatus, errorThrown) {
			var errorCallbackData = {
				"offline": true,
				"status": "0",
				"data": null,
				"message": {
					"message": textStatus.charAt(0).toUpperCase() + textStatus.slice(1) + " " + xhr.status + " " + xhr.statusText
				}
			};
			if (typeof (callback) == 'function') {
				callback(errorCallbackData);
			}
		}
	});
}

// P01
function ahmmosfc344p01_wct_id_params(params) {
	params.search = {
		"q": $("#ahmmosfc344p01_wct_id", ahmmosfc344).val()
	};
	if (params.sort === undefined) {
		return {
			limit: params.limit,
			offset: params.offset,
			search: params.search,
			sort: "wctId",
			order: "asc"
		}
	}
	return params;
}
function ahmmosfc344p01_part_number_params(params) {
	params.search = {
		"q": $("#ahmmosfc344p01_part_number", ahmmosfc344).val()
	};
	if (params.sort === undefined) {
		return {
			limit: params.limit,
			offset: params.offset,
			search: params.search,
			sort: "wctId",
			order: "asc"
		}
	}
	return params;
}
function ahmmosfc344p01_transaction_id_params(params) {
	params.search = {
		"q": $("#ahmmosfc344p01_transaction_id", ahmmosfc344).val()
	};
	if (params.sort === undefined) {
		return {
			limit: params.limit,
			offset: params.offset,
			search: params.search,
			sort: "txnId",
			order: "asc"
		}
	}
	return params;
}
function ahmmosfc344p01_table(params) {
	params.search = {
		dateFrom: $("#ahmmosfc344p01_date_from", ahmmosfc344).val(),
		dateTo: $("#ahmmosfc344p01_date_to", ahmmosfc344).val(),
		wctId: $("#ahmmosfc344p01_wct_id", ahmmosfc344).val(),
		partNumber: $("#ahmmosfc344p01_part_number", ahmmosfc344).val(),
		keretaId: $("#ahmmosfc344p01_id_kereta", ahmmosfc344).val(),
		mcNumber: $("#ahmmosfc344p01_mc_number", ahmmosfc344).val(),
		diesNumber: $("#ahmmosfc344p01_dies_number", ahmmosfc344).val(),
		transactionId: $("#ahmmosfc344p01_transaction_id", ahmmosfc344).val(),
		flagDelivery: $("#ahmmosfc344p01_flag_delivery", ahmmosfc344).val(),
		flagPairing: $("#ahmmosfc344p01_flag_id_pairing", ahmmosfc344).val(),
		flagProcessOt: $("#ahmmosfc344p01_flag_process_ot", ahmmosfc344).val()
	};
	if (params.sort === undefined) {
		return {
			limit: params.limit,
			offset: params.offset,
			search: params.search,
			sort: 'sort_date',
			order: 'desc'
		};
	} else {
		params.sort = "sort_" + params.sort;
	}
	return params;
}
function ahmmosfc344p01_table_handler(data) {
	if (data != null) {
		if (data.status == "1") {
			if (data.data[0]) {

			}
		}
	}
	if (data.status != '0') {
		return {
			rows: data.data,
			total: data.total
		};
	} else {
		return {
			rows: [],
			total: 0
		};
	}
}
function ahmmosfc344p01_table_action_formatter(value, row, index) {
	var jsonRow = JSON.stringify(row);

	var output = '';
	output += '<button class="btn btn-primary mr-5 ahmmosfc344p01_table_action_detail_btn" data-value="' + btoa(jsonRow) + '"><i class="glyphicon glyphicon-list fg-white mr-10"></i> EPP</button>';
	output += '<button class="btn btn-dark mr-5 ahmmosfc344p01_table_action_detail_rework_btn" data-value="' + btoa(jsonRow) + '"><i class="fa fa-list fg-white mr-10"></i> REPP</button>';
	output += '<button class="btn btn-warning ahmmosfc344p01_table_action_edit_btn" data-value="' + btoa(jsonRow) + '"><i class="glyphicon glyphicon-edit fg-white mr-10"></i> Edit</button>';
	return output;
}
function ahmmosfc344p01_date() {
	var date_from = $("#ahmmosfc344p01_date_from", ahmmosfc344);
	var date_to = $("#ahmmosfc344p01_date_to", ahmmosfc344);
	var date_single = $("#ahmmosfc344p01_table_filter_date", ahmmosfc344);

	if (date_from.val() == "") {
		date_to.val("").change();
		date_to.prop("disabled", true);
	} else {
		date_to.prop("disabled", false);
		var date_from_date = new Date(date_from.data("DateTimePicker").date());
		if (date_to.val() != "") {
			var date_to_date = new Date(date_to.data("DateTimePicker").date());
			if (date_to_date.getTime() < date_from_date.getTime()) {
				date_to.data("DateTimePicker").date(date_from_date);
			}
		}
		date_to.data("DateTimePicker").minDate(date_from_date);
	}

	if (date_single.data("DateTimePicker")) {
		date_from = $("#ahmmosfc344p01_date_from", ahmmosfc344);
		date_to = $("#ahmmosfc344p01_date_to", ahmmosfc344);

		if (date_from.val() == "") {
			date_single.data("DateTimePicker").minDate(new Date("01/01/1900"));
		} else {
			date_single.data("DateTimePicker").minDate(new Date(date_from.data("DateTimePicker").date()));
		}

		if (date_to.val() == "") {
			date_single.data("DateTimePicker").maxDate(new Date("01/01/9999"));
		} else {
			date_single.data("DateTimePicker").maxDate(new Date(date_to.data("DateTimePicker").date()));
		}
	}
}
function ahmmosfc344p01_posting_date() {
	var date_from = $("#ahmmosfc344p01_posting_date_from", ahmmosfc344);
	var date_to = $("#ahmmosfc344p01_posting_date_to", ahmmosfc344);
	var date_single = $("#ahmmosfc344p01_table_filter_postingDate", ahmmosfc344);

	if (date_from.val() == "") {
		date_to.val("").change();
		date_to.prop("disabled", true);
	} else {
		date_to.prop("disabled", false);
		var date_from_date = new Date(date_from.data("DateTimePicker").date());
		if (date_to.val() != "") {
			var date_to_date = new Date(date_to.data("DateTimePicker").date());
			if (date_to_date.getTime() < date_from_date.getTime()) {
				date_to.data("DateTimePicker").date(date_from_date);
			}
		}
		date_to.data("DateTimePicker").minDate(date_from_date);
	}

	if (date_single.data("DateTimePicker")) {
		date_from = $("#ahmmosfc344p01_posting_date_from", ahmmosfc344);
		date_to = $("#ahmmosfc344p01_posting_date_to", ahmmosfc344);

		if (date_from.val() == "") {
			date_single.data("DateTimePicker").minDate(new Date("01/01/1900"));
		} else {
			date_single.data("DateTimePicker").minDate(new Date(date_from.data("DateTimePicker").date()));
		}

		if (date_to.val() == "") {
			date_single.data("DateTimePicker").maxDate(new Date("01/01/9999"));
		} else {
			date_single.data("DateTimePicker").maxDate(new Date(date_to.data("DateTimePicker").date()));
		}
	}
}
function ahmmosfc344p01_check_ready_to_submit() {
	if (
		$("#ahmmosfc344p01_date_from", ahmmosfc344).val() == "" &&
		$("#ahmmosfc344p01_date_to", ahmmosfc344).val() == "" &&
		$("#ahmmosfc344p01_wct_id", ahmmosfc344).val() == "" &&
		$("#ahmmosfc344p01_part_number", ahmmosfc344).val() == "" &&
		$("#ahmmosfc344p01_id_kereta", ahmmosfc344).val() == "" &&
		$("#ahmmosfc344p01_mc_number", ahmmosfc344).val() == "" &&
		$("#ahmmosfc344p01_dies_number", ahmmosfc344).val() == "" &&
		$("#ahmmosfc344p01_transaction_id", ahmmosfc344).val() == "" &&
		$("#ahmmosfc344p01_flag_delivery", ahmmosfc344).val() == "" &&
		$("#ahmmosfc344p01_flag_id_pairing", ahmmosfc344).val() == "" &&
		$("#ahmmosfc344p01_flag_process_ot", ahmmosfc344).val() == ""
	) {
		$("#ahmmosfc344p01_reset_btn", ahmmosfc344).prop("disabled", true);
	} else {
		$("#ahmmosfc344p01_reset_btn", ahmmosfc344).prop("disabled", false);
	}

}
function ahmmosfc344p01_wct_id_after() {
	ahmmosfc344p01_check_ready_to_submit();
}
function ahmmosfc344p01_part_number_after() {
	ahmmosfc344p01_check_ready_to_submit();
}
function ahmmosfc344p01_transaction_id_after() {
	ahmmosfc344p01_check_ready_to_submit();
}
function ahmmosfc344p01_export() {
	$("#ahmmosfc344p01_export_btn", ahmmosfc344).html('<i class="fa fa-spin fa-spinner mr-10"></i>Exporting...').prop("disabled", true);
	setTimeout(function () {

		var sortVal = $("#ahmmosfc344p01_table th .sortable.desc", ahmmosfc344).closest("th").data("field");
		var sortType = 'desc';
		if ($("#ahmmosfc344p01_table th .sortable.desc", ahmmosfc344).length < 1) {
			var sortVal = $("#ahmmosfc344p01_table th .sortable.asc", ahmmosfc344).closest("th").data("field");
			var sortType = 'asc';
		}
		if (sortVal === undefined) {
			var sortVal = 'sort_createdDate';
			var sortType = 'desc';
		}

		var params = new Object();
		params.JXID = encodeURIComponent(getJxid());
		params.dateFrom = $("#ahmmosfc344p01_date_from", ahmmosfc344).val();
		params.dateTo = $("#ahmmosfc344p01_date_to", ahmmosfc344).val();
		params.wctId = $("#ahmmosfc344p01_wct_id", ahmmosfc344).val();
		params.partNumber = $("#ahmmosfc344p01_part_number", ahmmosfc344).val();
		params.keretaId = $("#ahmmosfc344p01_id_kereta", ahmmosfc344).val();
		params.mcNumber = $("#ahmmosfc344p01_mc_number", ahmmosfc344).val();
		params.diesNumber = $("#ahmmosfc344p01_dies_number", ahmmosfc344).val();
		params.transactionId = $("#ahmmosfc344p01_transaction_id", ahmmosfc344).val();
		params.flagDelivery = $("#ahmmosfc344p01_flag_delivery", ahmmosfc344).val();
		params.flagPairing = $("#ahmmosfc344p01_flag_id_pairing", ahmmosfc344).val();
		params.flagProcessOt = $("#ahmmosfc344p01_flag_process_ot", ahmmosfc344).val();
		params.sort = sortVal;
		params.order = sortType;


		var exportUrl = "/imo05/ahmmopqt000-ahs/rest/mo/sfc344/export-to-excel-monitoring-scan-produksi?";
		$.each(params, function (keypar, param) {
			exportUrl += '' + keypar + '=' + param + '&';
		});
		window.open(exportUrl, "_blank");
		$("#ahmmosfc344p01_export_btn", ahmmosfc344).html('<i class="fa fa-check fg-white mr-10"></i> Exported');
		setTimeout(function () {
			$("#ahmmosfc344p01_export_btn", ahmmosfc344).html('<i class="glyphicon glyphicon-export mr-10 fg-white"></i> Export To Excel <span></span>').prop("disabled", false);
		}, 100);
	}, 100);
}



function ahmmosfc344_deactivate_ipp_table(params) {
	params.search = {
		dateFrom: $("#ahmmosfc344_deactivate_ipp_date_from", ahmmosfc344).val(),
		dateTo: $("#ahmmosfc344_deactivate_ipp_date_to", ahmmosfc344).val(),
		wctId: $("#ahmmosfc344_deactivate_ipp_wct_id", ahmmosfc344).val(),
		partNumber: $("#ahmmosfc344_deactivate_ipp_part_number", ahmmosfc344).val(),
		keretaId: $("#ahmmosfc344_deactivate_ipp_id_kereta", ahmmosfc344).val(),
		mcNumber: $("#ahmmosfc344_deactivate_ipp_mc_number", ahmmosfc344).val(),
		diesNumber: $("#ahmmosfc344_deactivate_ipp_dies_number", ahmmosfc344).val(),
		transactionId: $("#ahmmosfc344_deactivate_ipp_transaction_id", ahmmosfc344).val(),
		flagDelivery: $("#ahmmosfc344_deactivate_ipp_flag_delivery", ahmmosfc344).val(),
		flagPairing: $("#ahmmosfc344_deactivate_ipp_flag_id_pairing", ahmmosfc344).val(),
		flagProcessOt: $("#ahmmosfc344_deactivate_ipp_flag_process_ot", ahmmosfc344).val()
	};
	if (params.sort === undefined) {
		return {
			limit: params.limit,
			offset: params.offset,
			search: params.search,
			sort: 'sort_date',
			order: 'desc'
		};
	} else {
		params.sort = "sort_" + params.sort;
	}
	return params;
}
function ahmmosfc344_deactivate_ipp_table_handler(data) {
	if (data != null) {
		if (data.status == "1") {
			if (data.data[0]) {

			}
		}
	}
	if (data.status != '0') {
		return {
			rows: data.data,
			total: data.total
		};
	} else {
		return {
			rows: [],
			total: 0
		};
	}
}




$(document).ready(function () {
	setTimeout(function () {
		var mainAppOffset = parseInt($(".main-app", tabpanel_ahmmosfc344).offset().top);
		var pageFooterMarginTop = parseInt($(".page-footer", tabpanel_ahmmosfc344).css("margin-top"));
		var pageFooterMarginBot = parseInt($(".page-footer", tabpanel_ahmmosfc344).css("margin-bottom"));
		var pageFooterHeight = parseInt($(".page-footer", tabpanel_ahmmosfc344).innerHeight());
		var fullHeight = pageFooterMarginTop + pageFooterMarginBot + pageFooterHeight + mainAppOffset;
		$(".main-app", tabpanel_ahmmosfc344).css("min-height", "calc(100vh - " + fullHeight + "px)");
		$("body.ahm").addClass("collapsed");
		$(".ahmmosfc344_tab:first-child", ahmmosfc344).click();
	}, 100);


	$(".ahmmosfc344_subpageTrigger", ahmmosfc344).click(function () {
		var thisContent = $(this);
		if (typeof thisContent.attr("disabled") === typeof undefined && thisContent.attr("disabled") !== true) {
			$(".ahmmosfc344_subpageTrigger", ahmmosfc344).removeClass("actived");
			$(this).addClass("actived");
			var thisPage = $(this).attr("subpage");
			_fw_subpage($(this), thisPage);
			if ($(".error-area .hidden", ahmmosfc344).length > 0) {
				$(".error-area", ahmmosfc344).addClass("hidden");
			}
		}
	});
	$(".ahmmosfc344_tab", ahmmosfc344).click(function () {
		var thisContent = $(this);
		if (typeof thisContent.attr("disabled") === typeof undefined && thisContent.attr("disabled") !== true) {
			var thisParent = thisContent.closest(".ahmmosfc344_tabs");

			if (!thisContent.hasClass("opened")) {
				$(".ahmmosfc344_tab", thisParent).removeClass("opened");
				thisContent.addClass("opened");
			}
		}
	});


	// P01
	ahmmosfc344p01_date();

	$("#ahmmosfc344p01_date_from", ahmmosfc344).datetimepicker({
		format: 'DD-MMM-YYYY',
		maxDate: new Date(),
		locale: 'en',
		showClear: true,
		keepInvalid: false,
		useCurrent: false,
		widgetPositioning: {
			horizontal: 'left',
			vertical: 'bottom'
		}
	});
	$("#ahmmosfc344p01_date_from", ahmmosfc344).on("dp.change", function (e) {
		ahmmosfc344p01_date();
		setTimeout(function () {
			var thisContent = $("#ahmmosfc344p01_date_from", ahmmosfc344);
			if (thisContent.val() != "") {
				$("#ahmmosfc344p01_date_to", ahmmosfc344).focus();
			}
		}, 100);
	});

	$("#ahmmosfc344p01_date_to", ahmmosfc344).datetimepicker({
		format: 'DD-MMM-YYYY',
		maxDate: new Date(),
		locale: 'en',
		showClear: true,
		keepInvalid: false,
		useCurrent: false,
		widgetPositioning: {
			horizontal: 'left',
			vertical: 'bottom'
		}
	});
	$("#ahmmosfc344p01_date_to", ahmmosfc344).on("dp.change", function (e) {
		ahmmosfc344p01_date();
		setTimeout(function () {
			var thisContent = $("#ahmmosfc344p01_date_to", ahmmosfc344);
			if (thisContent.val() != "") {
				$("#ahmmosfc344p01_posting_date_from", ahmmosfc344).focus();
			}
		}, 100);
	});

	$("#ahmmosfc344p01_posting_date_from", ahmmosfc344).datetimepicker({
		format: 'DD-MMM-YYYY',
		maxDate: new Date(),
		locale: 'en',
		showClear: true,
		keepInvalid: false,
		useCurrent: false,
		widgetPositioning: {
			horizontal: 'left',
			vertical: 'bottom'
		}
	});
	$("#ahmmosfc344p01_posting_date_from", ahmmosfc344).on("dp.change", function (e) {
		ahmmosfc344p01_posting_date();
		setTimeout(function () {
			var thisContent = $("#ahmmosfc344p01_posting_date_from", ahmmosfc344);
			if (thisContent.val() != "") {
				$("#ahmmosfc344p01_posting_date_to", ahmmosfc344).focus();
			}
		}, 100);
	});

	$("#ahmmosfc344p01_posting_date_to", ahmmosfc344).datetimepicker({
		format: 'DD-MMM-YYYY',
		maxDate: new Date(),
		locale: 'en',
		showClear: true,
		keepInvalid: false,
		useCurrent: false,
		widgetPositioning: {
			horizontal: 'left',
			vertical: 'bottom'
		}
	});
	$("#ahmmosfc344p01_posting_date_to", ahmmosfc344).on("dp.change", function (e) {
		ahmmosfc344p01_posting_date();
		setTimeout(function () {
			var thisContent = $("#ahmmosfc344p01_posting_date_to", ahmmosfc344);
			if (thisContent.val() != "") {
				$("#ahmmosfc344p01_wct_id", ahmmosfc344).focus();
			}
		}, 100);
	});


	$("#ahmmosfc344p01_table", ahmmosfc344).on('post-header.bs.table', function (e) {
		if (!$("#ahmmosfc344p01_table", ahmmosfc344).hasClass("header_scripted")) {
			$("#ahmmosfc344p01_table", ahmmosfc344).addClass("header_scripted");


			$("#ahmmosfc344p01_table .ahmmosfc344_table_filter", ahmmosfc344).keydown(function (e) {
				var key = e.charCode || e.keyCode || 0;
				if (key == 13) {
					$("#ahmmosfc344p01_table", ahmmosfc344).bootstrapTable('refresh');
				}
			});


			$("#ahmmosfc344p01_table_filter_date", ahmmosfc344).datetimepicker({
				format: 'DD-MMM-YYYY',
				locale: 'en',
				showClear: true,
				keepInvalid: false,
				useCurrent: false,
				widgetPositioning: {
					horizontal: 'left',
					vertical: 'bottom'
				}
			});
			$("#ahmmosfc344p01_table_filter_postingDate", ahmmosfc344).datetimepicker({
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
			ahmmosfc344p01_date()
			ahmmosfc344p01_posting_date()

			$(".ahmmosfc344_table_filter_date", ahmmosfc344).closest(".th-inner").css("overflow", "unset");
			var fixedTableContent = $(".ahmmosfc344_table_filter_date", ahmmosfc344).closest(".fixed-table-body");
			fixedTableContent.css("min-height", "320px");
		}

	});
	$("#ahmmosfc344p01_table", ahmmosfc344).on('post-body.bs.table', function (e) {
		var thisTable = $(this);
		$(".ahmmosfc344p01_table_action_edit_btn", thisTable).click(function () {
			var thisContent = $(this);
			var thisData = JSON.parse(atob(thisContent.attr("data-value")));
			$("#ahmmosfc344_edit", ahmmosfc344).modal("show");
			$("#ahmmosfc344_edit_date", ahmmosfc344).val(thisData['date']);
			$("#ahmmosfc344_edit_wct_id", ahmmosfc344).val(thisData['wctId']);
			$("#ahmmosfc344_edit_wct_desc", ahmmosfc344).val(thisData['wctDesc']);
			$("#ahmmosfc344_edit_shift_id", ahmmosfc344).val(thisData['shiftId']);
			$("#ahmmosfc344_edit_periode_id", ahmmosfc344).val(thisData['periodeId']);
			$("#ahmmosfc344_edit_part_number", ahmmosfc344).val(thisData['partNumber']);
			$("#ahmmosfc344_edit_part_description", ahmmosfc344).val(thisData['partDesc']);
			$("#ahmmosfc344_edit_identifier", ahmmosfc344).val(thisData['identifier']);
			$("#ahmmosfc344_edit_adjust_plan_prod_qty", ahmmosfc344).val(thisData['adjustPlanProdQty']);
			$("#ahmmosfc344_edit_ok_actual_qty", ahmmosfc344).val(thisData['okActualQty']);
			$("#ahmmosfc344_edit_nok_actual_qty", ahmmosfc344).val(thisData['nokActualQty']);
			$("#ahmmosfc344_edit_variant_qty", ahmmosfc344).val(thisData['variantQty']);
			$("#ahmmosfc344_edit_actual_note", ahmmosfc344).val(thisData['Actual Note']);
			$("#ahmmosfc344_edit_pic", ahmmosfc344).val(thisData['pic']);
			$("#ahmmosfc344_edit_transaction_id", ahmmosfc344).val(thisData['transactionId']);
			$("#ahmmosfc344_edit_sap_matdoc", ahmmosfc344).val(thisData['sapMatdoc']);
			$("#ahmmosfc344_edit_posting_date", ahmmosfc344).val(thisData['postingDate']);
		});
		$(".ahmmosfc344p01_table_action_detail_btn", thisTable).click(function () {
			var thisContent = $(this);
			var thisData = JSON.parse(atob(thisContent.attr("data-value")));
			$("#ahmmosfc344p02_edit_btn", ahmmosfc344).attr("data-value", thisContent.attr("data-value"));

			$("#ahmmosfc344p02_detail_date", ahmmosfc344).val(thisData['date']);
			$("#ahmmosfc344p02_detail_wct_id", ahmmosfc344).val(thisData['wctId']);
			$("#ahmmosfc344p02_detail_wct_desc", ahmmosfc344).val(thisData['wctDesc']);
			$("#ahmmosfc344p02_detail_shift_id", ahmmosfc344).val(thisData['shiftId']);
			$("#ahmmosfc344p02_detail_periode_id", ahmmosfc344).val(thisData['periodeId']);
			$("#ahmmosfc344p02_detail_part_number", ahmmosfc344).val(thisData['partNumber']);
			$("#ahmmosfc344p02_detail_part_description", ahmmosfc344).val(thisData['partDesc']);
			$("#ahmmosfc344p02_detail_identifier", ahmmosfc344).val(thisData['identifier']);
			$("#ahmmosfc344p02_detail_adjust_plan_prod_qty", ahmmosfc344).val(thisData['adjustPlanProdQty']);
			$("#ahmmosfc344p02_detail_ok_actual_qty", ahmmosfc344).val(thisData['okActualQty']);
			$("#ahmmosfc344p02_detail_nok_actual_qty", ahmmosfc344).val(thisData['nokActualQty']);
			$("#ahmmosfc344p02_detail_variant_qty", ahmmosfc344).val(thisData['variantQty']);
			$("#ahmmosfc344p02_detail_actual_note", ahmmosfc344).val(thisData['Actual Note']);
			$("#ahmmosfc344p02_detail_pic", ahmmosfc344).val(thisData['pic']);
			$("#ahmmosfc344p02_detail_transaction_id", ahmmosfc344).val(thisData['transactionId']);
			$("#ahmmosfc344p02_detail_sap_matdoc", ahmmosfc344).val(thisData['sapMatdoc']);
			$("#ahmmosfc344p02_detail_posting_date", ahmmosfc344).val(thisData['postingDate']);

			_fw_subpage(ahmmosfc344, "ahmmosfc344p02");
		});
		$(".ahmmosfc344p01_table_action_detail_rework_btn", thisTable).click(function () {
			var thisContent = $(this);
			var thisData = JSON.parse(atob(thisContent.attr("data-value")));
			$("#ahmmosfc344p02_edit_btn", ahmmosfc344).attr("data-value", thisContent.attr("data-value"));

			$("#ahmmosfc344p03_detail_date", ahmmosfc344).val(thisData['date']);
			$("#ahmmosfc344p03_detail_wct_id", ahmmosfc344).val(thisData['wctId']);
			$("#ahmmosfc344p03_detail_wct_desc", ahmmosfc344).val(thisData['wctDesc']);
			$("#ahmmosfc344p03_detail_shift_id", ahmmosfc344).val(thisData['shiftId']);
			$("#ahmmosfc344p03_detail_periode_id", ahmmosfc344).val(thisData['periodeId']);
			$("#ahmmosfc344p03_detail_part_number", ahmmosfc344).val(thisData['partNumber']);
			$("#ahmmosfc344p03_detail_part_description", ahmmosfc344).val(thisData['partDesc']);
			$("#ahmmosfc344p03_detail_identifier", ahmmosfc344).val(thisData['identifier']);
			$("#ahmmosfc344p03_detail_adjust_plan_prod_qty", ahmmosfc344).val(thisData['adjustPlanProdQty']);
			$("#ahmmosfc344p03_detail_ok_actual_qty", ahmmosfc344).val(thisData['okActualQty']);
			$("#ahmmosfc344p03_detail_nok_actual_qty", ahmmosfc344).val(thisData['nokActualQty']);
			$("#ahmmosfc344p03_detail_variant_qty", ahmmosfc344).val(thisData['variantQty']);
			$("#ahmmosfc344p03_detail_actual_note", ahmmosfc344).val(thisData['Actual Note']);
			$("#ahmmosfc344p03_detail_pic", ahmmosfc344).val(thisData['pic']);
			$("#ahmmosfc344p03_detail_transaction_id", ahmmosfc344).val(thisData['transactionId']);
			$("#ahmmosfc344p03_detail_sap_matdoc", ahmmosfc344).val(thisData['sapMatdoc']);
			$("#ahmmosfc344p03_detail_posting_date", ahmmosfc344).val(thisData['postingDate']);

			_fw_subpage(ahmmosfc344, "ahmmosfc344p03");
		});
	});
	$("#ahmmosfc344p02_edit_btn", ahmmosfc344).click(function () {
		var thisContent = $(this);
		var thisData = JSON.parse(atob(thisContent.attr("data-value")));
		$("#ahmmosfc344_edit", ahmmosfc344).modal("show");
		$("#ahmmosfc344_edit_date", ahmmosfc344).val(thisData['date']);
		$("#ahmmosfc344_edit_wct_id", ahmmosfc344).val(thisData['wctId']);
		$("#ahmmosfc344_edit_wct_desc", ahmmosfc344).val(thisData['wctDesc']);
		$("#ahmmosfc344_edit_shift_id", ahmmosfc344).val(thisData['shiftId']);
		$("#ahmmosfc344_edit_periode_id", ahmmosfc344).val(thisData['periodeId']);
		$("#ahmmosfc344_edit_part_number", ahmmosfc344).val(thisData['partNumber']);
		$("#ahmmosfc344_edit_part_description", ahmmosfc344).val(thisData['partDesc']);
		$("#ahmmosfc344_edit_identifier", ahmmosfc344).val(thisData['identifier']);
		$("#ahmmosfc344_edit_adjust_plan_prod_qty", ahmmosfc344).val(thisData['adjustPlanProdQty']);
		$("#ahmmosfc344_edit_ok_actual_qty", ahmmosfc344).val(thisData['okActualQty']);
		$("#ahmmosfc344_edit_nok_actual_qty", ahmmosfc344).val(thisData['nokActualQty']);
		$("#ahmmosfc344_edit_variant_qty", ahmmosfc344).val(thisData['variantQty']);
		$("#ahmmosfc344_edit_actual_note", ahmmosfc344).val(thisData['Actual Note']);
		$("#ahmmosfc344_edit_pic", ahmmosfc344).val(thisData['pic']);
		$("#ahmmosfc344_edit_transaction_id", ahmmosfc344).val(thisData['transactionId']);
		$("#ahmmosfc344_edit_sap_matdoc", ahmmosfc344).val(thisData['sapMatdoc']);
		$("#ahmmosfc344_edit_posting_date", ahmmosfc344).val(thisData['postingDate']);
	});



	$("#ahmmosfc344p01_date_from, #ahmmosfc344p01_date_to, #ahmmosfc344p01_posting_date_from, #ahmmosfc344p01_posting_date_to", ahmmosfc344).on("dp.change", function (e) {
		ahmmosfc344p01_check_ready_to_submit();
	});

	$("#ahmmosfc344p01_wct_id, #ahmmosfc344p01_part_number, #ahmmosfc344p01_id_kereta, #ahmmosfc344p01_mc_number, #ahmmosfc344p01_dies_number, #ahmmosfc344p01_transaction_id, #ahmmosfc344p01_flag_delivery, #ahmmosfc344p01_flag_id_pairing, #ahmmosfc344p01_flag_process_ot", ahmmosfc344).change(function () {
		ahmmosfc344p01_check_ready_to_submit();
	}).change();

	$("#ahmmosfc344p01_date_from, #ahmmosfc344p01_date_to, #ahmmosfc344p01_posting_date_from, #ahmmosfc344p01_posting_date_to, #ahmmosfc344p01_wct_id, #ahmmosfc344p01_part_number, #ahmmosfc344p01_id_kereta, #ahmmosfc344p01_mc_number, #ahmmosfc344p01_dies_number, #ahmmosfc344p01_transaction_id, #ahmmosfc344p01_flag_delivery, #ahmmosfc344p01_flag_id_pairing, #ahmmosfc344p01_flag_process_ot", ahmmosfc344).keyup(function () {
		$(this).change();
	});

	$("#ahmmosfc344p01_search_btn", ahmmosfc344).click(function () {
		$("#ahmmosfc344p01_table", ahmmosfc344).bootstrapTable("refresh");
	});

	$("#ahmmosfc344p01_reset_btn", ahmmosfc344).click(function () {
		$("#ahmmosfc344p01_date_from, #ahmmosfc344p01_date_to, #ahmmosfc344p01_wct_id, #ahmmosfc344p01_part_number, #ahmmosfc344p01_part_description, #ahmmosfc344p01_id_kereta, #ahmmosfc344p01_mc_number, #ahmmosfc344p01_dies_number, #ahmmosfc344p01_transaction_id, #ahmmosfc344p01_flag_delivery, #ahmmosfc344p01_delivery_date_from, #ahmmosfc344p01_delivery_date_to, #ahmmosfc344p01_flag_id_pairing, #ahmmosfc344p01_flag_process_ot", ahmmosfc344).val("").change();
		$("#ahmmosfc344p01_table", ahmmosfc344).bootstrapTable("refresh");
	});

	$("#ahmmosfc344p01_export_btn", ahmmosfc344).click(function () {
		ahmmosfc344p01_export();
	});
	$("#ahmmosfc344p01_deactivate_ipp_btn", ahmmosfc344).click(function () {

		$("#ahmmosfc344_deactivate_ipp", ahmmosfc344).modal("show");
	});


	$("#ahmmosfc344_deactivate_ipp_table_checked", ahmmosfc344).on('post-body.bs.table', function (e) {
		var thisTable = $(this);
		var totalRows = thisTable.bootstrapTable('getOptions').totalRows;
		if (totalRows > 0) {
			$("#ahmmosfc344_deactivate_ipp_btn", ahmmosfc344).prop("disabled", false);
			$("#ahmmosfc344_uncheck_all_btn", ahmmosfc344).show();
			$("#ahmmosfc344_deactivate_ipp_btn span", ahmmosfc344).html(" (" + totalRows + ")");
			$("#ahmmosfc344_uncheck_all_btn span", ahmmosfc344).html(" (" + totalRows + ")");
		} else {
			$("#ahmmosfc344_deactivate_ipp_btn", ahmmosfc344).prop("disabled", true);
			$("#ahmmosfc344_uncheck_all_btn", ahmmosfc344).hide();
			$("#ahmmosfc344_deactivate_ipp_btn span", ahmmosfc344).html("");
			$("#ahmmosfc344_uncheck_all_btn span", ahmmosfc344).html("");

		}
	});
	$("#ahmmosfc344_uncheck_all_btn", ahmmosfc344).click(function () {
		$("#ahmmosfc344_deactivate_ipp_table", ahmmosfc344).bootstrapTable('uncheckAll');
		$("#ahmmosfc344_deactivate_ipp_table_checked", ahmmosfc344).bootstrapTable("removeAll");
	});
}); 