/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.co.ahm.mo.sfc.app341.constant;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 *
 * @author patria
 */
public class Sfc341Constant {

    public static final Map<String, String> PARAM_VALUE_SEARCH = new LinkedHashMap<String, String>() {
        {
            //Filter panel 
            put("PLANT", "PARAM_PLANT");
            put("STATUS", "PARAM_STATUS");

            //Filter table
            put("SRN", "SRN");
            put("CATEGORY", "CATEGORY");
            put("SRCACC", "SRCACC");
            put("KUMAMOTO", "KUMAMOTO");
            put("PALLETNUM", "PALLETNUM");
            put("PRODDATE", "PRODDATE");
            put("EXACCDATE", "EXACCDATE");
            put("DURATION", "DURATION");
            put("PONO", "PONO");
            put("SUPPID", "SUPPID");
            put("VENDDESC", "VENDDESC");
            put("MATDOC", "MATDOC");
            put("LASTSTATUS", "LASTSTATUS");
            put("RECPLANT", "RECPLANT");
            put("RECSLOC", "RECSLOC");
            put("DELSLOC", "DELSLOC");
            put("INPUTIN", "INPUTIN");
            put("DELNUM", "DELNUM");
            put("DELPLANT", "DELPLANT");
            put("PARTNUM", "PARTNUM");
            put("PARTDESC", "PARTDESC");
            put("INPUTOUT", "INPUTOUT");
            put("SHPLISTNUM", "SHPLISTNUM");
            put("SLDATE", "SLDATE");
            put("ACCVOC", "ACCVOC");
            put("TXNID", "TXNID");
            put("TXNDATE", "TXNDATE");
            put("VCREA", "VCREA");
            put("TXSTATUS", "TXSTATUS");
            put("TRUCKNUM", "TRUCKNUM");
            put("EXPID", "EXPID");
            put("EXPDESC", "EXPDESC");
            put("MDCODE", "MDCODE");
            put("MDNAME", "MDNAME");
            put("FLGCHANGE", "FLGCHANGE");
            put("LASTCHARGEDATE", "LASTCHARGEDATE");

            put("RECMDDATE", "RECMDDATE");
            put("MDOUTDATE", "MDOUTDATE");
            put("DLRCODE3", "DLRCODE3");
            put("DLRDESCMDOUT", "DLRDESCMDOUT");
            put("RECDLRDATE", "RECDLRDATE");
            put("DLRCODE4", "DLRCODE4");
            put("DLRDESCREC", "DLRDESCREC");
            put("BAST", "BAST");
            put("BASTDATE", "BASTDATE");
            put("FRMNO", "FRMNO");
            put("ENGNO", "ENGNO");
            put("TYPECODE", "TYPECODE");
            put("COLOR", "COLOR");
            put("DLRCODEFIN", "DLRCODEFIN");
            put("DLRDESC", "DLRDESC");
            put("PHONE", "PHONE");
            put("NAME", "NAME");
            put("ASNNUM", "ASNNUM");
            put("BOXNUM", "BOXNUM");
            put("PACKNUM", "PACKNUM");
            put("CARTONNUM", "CARTONNUM");
            put("SLNUM", "SLNUM");
        }
    };

    public static final Map<String, String> PARAM_QUERY_SEARCH = new LinkedHashMap<String, String>() {
        {
            //Filter panel 
            put("PLANT", "AND vrecplant = :PARAM_PLANT ");
            put("STATUS", "AND s.vitemname like  '%'|| :PARAM_STATUS ||'%'");
            put("STATUSIN", "AND lower( s.vitemname ) like  '% in %'");

            //Filter table
            put("SRN", "AND LOWER(t.msdeveaccsn_vsrnumber) LIKE LOWER(('%'||:SRN||'%'))");
            put("CATEGORY", "AND LOWER(( select vitemname from ahmmoerp_dtlsettings where mst.DSET_RSET_VID_TYACC = rset_vid  and mst.DSET_VITEMCODE_TYACC = VITEMCODE )) LIKE LOWER(('%'||:CATEGORY||'%'))");
            put("SRCACC", "AND LOWER(mst.vsourceacc) LIKE LOWER(('%'||:SRCACC||'%'))");
            put("KUMAMOTO", "AND LOWER(mst.vkumamotosn) LIKE LOWER(('%'||:KUMAMOTO||'%'))");
            put("PALLETNUM", "AND LOWER(mst.vpalletnum) LIKE LOWER(('%'||:PALLETNUM||'%'))");
            put("PRODDATE", "AND TRUNC(mst.dprodacc) = :PRODDATE");
            put("EXACCDATE", "AND TRUNC(mst.dexwacc) = :EXACCDATE");
            put("DURATION", "AND LOWER(nvl (t.nduration, abs(Ceil((Sysdate - mst.DPRODACC)) -1))) LIKE LOWER(('%'||:DURATION||'%'))");
            put("PONO", "AND LOWER(t.vpono) LIKE LOWER(('%'||:PONO||'%'))");
            put("SUPPID", "AND LOWER(t.vsuppid) LIKE LOWER(('%'||:SUPPID||'%'))");
            put("VENDDESC", "AND LOWER(( select vvendordesc from ahmmomsc_mstvendors where  vvendorid = t.vsuppid )) LIKE LOWER(('%'||:VENDDESC||'%'))");
            put("MATDOC", "AND LOWER(t.vmatdoc) LIKE LOWER(('%'||:MATDOC||'%'))");
            put("LASTSTATUS", "AND LOWER(s.vitemname) LIKE LOWER(('%'||:LASTSTATUS||'%'))");
            put("RECPLANT", "AND LOWER(t.vrecplant) LIKE LOWER(('%'||:RECPLANT||'%'))");
            put("RECSLOC", "AND LOWER(t.vrecsloc) LIKE LOWER(('%'||:RECSLOC||'%'))");
            put("DELSLOC", "AND LOWER(t.VDELSLOC) LIKE LOWER(('%'||:DELSLOC||'%'))");
            put("INPUTIN", "AND TRUNC(( select dtxn from AHMMOSFC_HDRTXACCEVS h where (h.DSET_VITEMCODE = '0A' OR h.DSET_VITEMCODE = '0B' AND h.DSET_RSET_VID = 'EVSTATACC') and t.vtxnid = h.vtxnid  )) = :INPUTIN");
            put("DELNUM", "AND LOWER(t.vdelno) LIKE LOWER(('%'||:DELNUM||'%'))");
            put("DELPLANT", "AND LOWER(t.vdelplant) LIKE LOWER(('%'||:DELPLANT||'%'))");
            put("PARTNUM", "AND LOWER(mst.VPARTNUM) LIKE LOWER(('%'||:PARTNUM||'%'))");
            put("PARTDESC", "AND LOWER(( select vpartdesc from ahmmomsc_mstparts where mst.VPARTNUM = vpartnum  )) LIKE LOWER(('%'||:PARTDESC||'%'))");
            put("INPUTOUT", "AND TRUNC((select dtxn from AHMMOSFC_HDRTXACCEVS h where (h.DSET_VITEMCODE = '1A' OR h.DSET_VITEMCODE = '1C' AND h.DSET_RSET_VID = 'EVSTATACC' ) and t.vtxnid = h.vtxnid  )) = :INPUTOUT");
            put("SHPLISTNUM", "AND LOWER(h.VSHPLSNO) LIKE LOWER(('%'||:SHPLISTNUM||'%'))");
            put("SLDATE", "AND TRUNC(t.DSL) = :SLDATE");
            put("ACCVOC", "AND LOWER(t.vaccvoucher) LIKE LOWER(('%'||:ACCVOC||'%'))");
            put("TXNID", "AND LOWER(t.vtxnid) LIKE LOWER(('%'||:TXNID||'%'))");
            put("TXNDATE", "AND TRUNC(t.dtxn) = :TXNDATE");
            put("VCREA", "AND LOWER(t.vcrea) LIKE LOWER(('%'||:VCREA||'%'))");
            put("TXSTATUS", "AND LOWER(h.VTXSTS) LIKE LOWER(('%'||:TXSTATUS||'%'))");
            put("TRUCKNUM", "AND LOWER(h.VTRUCKNO) LIKE LOWER(('%'||:TRUCKNUM||'%'))");
            put("EXPID", "AND LOWER(t.VEXPID) LIKE LOWER(('%'||:EXPID||'%'))");
            put("EXPDESC", "AND LOWER(t.VEXPDESC) LIKE LOWER(('%'||:EXPDESC||'%'))");
            put("MDCODE", "AND LOWER(t.VMDCODE) LIKE LOWER(('%'||:MDCODE||'%'))");
            put("MDNAME", "AND LOWER((select vnd_name from fmppc_pp00_vendors where t.vmdcode = vnd_code )) LIKE LOWER(('%'||:MDNAME||'%'))");
            put("FLGCHANGE", "AND LOWER(mst.nflagcharge) LIKE LOWER(('%'||:FLGCHANGE||'%'))");
            put("LASTCHARGEDATE", "AND TRUNC(mst.dlastcharge) = :LASTCHARGEDATE");

            put("RECMDDATE", "AND TRUNC(t.DRECMD) = :RECMDDATE");
            put("MDOUTDATE", "AND TRUNC('') = :MDOUTDATE");
            put("DLRCODE3", "AND LOWER(t.VDLRCODE3) LIKE LOWER(('%'||:DLRCODE3||'%'))");
            put("DLRDESCMDOUT", "AND LOWER((select vnd_name from fmppc_pp00_vendors where t.VDLRCODE3 = vnd_code )) LIKE LOWER(('%'||:DLRDESCMDOUT||'%'))");
            put("RECDLRDATE", "AND TRUNC(t.DRECDLR) = :RECDLRDATE");
            put("DLRCODE4", "AND LOWER(t.VDLRCODE4) LIKE LOWER(('%'||:DLRCODE4||'%'))");
            put("DLRDESCREC", "AND LOWER((select vnd_name from fmppc_pp00_vendors where t.VDLRCODE4 = vnd_code )) LIKE LOWER(('%'||:DLRDESCREC||'%'))");
            put("BAST", "AND LOWER(t.VBAST) LIKE LOWER(('%'||:BAST||'%'))");
            put("BASTDATE", "AND TRUNC(t.DBAST) = :BASTDATE");
            put("FRMNO", "AND LOWER(t.VFRAMENO) LIKE LOWER(('%'||:FRMNO||'%'))");
            put("ENGNO", "AND LOWER(t.VENGINENO) LIKE LOWER(('%'||:ENGNO||'%'))");
            put("TYPECODE", "AND LOWER((select VTYPECODE from ahmpsssn_hisssMDs a where a.VFRAMENO = t.VFRAMENO)) LIKE LOWER(('%'||:TYPECODE||'%'))");
            put("COLOR", "AND LOWER((select VCOLORDESC from ahmmomsc_mstcolors where VCOLORID = (select vcolorcode from ahmpsssn_hisssMDs c where c.VFRAMENO = t.VFRAMENO))) LIKE LOWER(('%'||:COLOR||'%'))");
            put("DLRCODEFIN", "AND LOWER(t.VDLRCODEFIN) LIKE LOWER(('%'||:DLRCODEFIN||'%'))");
            put("DLRDESC", "AND LOWER((select vnd_name from fmppc_pp00_vendors where t.VDLRCODEFIN = vnd_code )) LIKE LOWER(('%'||:DLRDESC||'%'))");
            put("PHONE", "AND LOWER(t.VPHONE) LIKE LOWER(('%'||:PHONE||'%'))");
            put("NAME", "AND LOWER(t.VCUSTNAME) LIKE LOWER(('%'||:NAME||'%'))");
            put("ASNNUM", "AND LOWER(case mst.vsourceacc when 'REM' THEN t.VASN END) LIKE LOWER(('%'||:ASNNUM||'%'))");
            put("BOXNUM", "AND LOWER(case mst.vsourceacc when 'REM' THEN t.VBOXNO END) LIKE LOWER(('%'||:BOXNUM||'%'))");
            put("PACKNUM", "AND LOWER(case mst.vsourceacc when 'REM' THEN t.VPACKNO END) LIKE LOWER(('%'||:PACKNUM||'%'))");
            put("CARTONNUM", "AND LOWER(case mst.vsourceacc when 'REM' THEN t.VCARTONNO END) LIKE LOWER(('%'||:CARTONNUM||'%'))");
            put("SLNUM", "AND LOWER(case mst.vsourceacc when 'REM' THEN t.VSLAHM END) LIKE LOWER(('%'||:SLNUM||'%'))");
        }
    };

    public static final Map<String, String> COL_ORDER = new LinkedHashMap<String, String>() {
        {
            put("srnSort", "t.msdeveaccsn_vsrnumber");
            put("categorySort", "Category");
            put("srcaccSort", "mst.vsourceacc");
            put("kumamotoSort", "mst.vkumamotosn");
            put("palletSort", "mst.vpalletnum");
            put("proddateSort", "mst.dprodacc");
            put("exwdateSort", "mst.dexwacc");
            put("durationSort", "nduration");
            put("ponoSort", "t.vpono");
            put("suppidSort", "t.vsuppid");
            put("suppdescSort", "vendordesc");
            put("matdocSort", "t.vmatdoc");
            put("laststatusSort", "s.vitemname");
            put("plantSort", "t.vrecplant");
            put("slocidSort", "t.vrecsloc");
            put("delslocSort", "t.VDELSLOC");
            put("inputinSort", "INPUT_IN");
            put("delnoSort", "t.vdelno");
            put("delplantSort", "t.vdelplant");
            put("partnumSort", "mst.VPARTNUM");
            put("partdescSort", "PartDesc");
            put("inputoutSort", "INPUT_OUT");
            put("shplistSort", "h.VSHPLSNO");
            put("shplistdateSort", "t.DSL");
            put("vocaccsSort", "t.vaccvoucher");
            put("txnidSort", "t.vtxnid");
            put("txndateSort", "t.dtxn");
            put("vcreaSort", "t.vcrea");
            put("txstatusSort", "h.VTXSTS");
            put("trucknoSort", "h.VTRUCKNO");
            put("expidSort", "t.VEXPID");
            put("expdescSort", "t.VEXPDESC");
            put("mdcodeSort", "t.VMDCODE");
            put("mddescSort", "MD_NAME");
            put("flagSort", "mst.nflagcharge");
            put("chargedateSort", "mst.dlastcharge");

            put("recmddateSort", "t.DRECMD");
            put("mdoutdateSort", "MD_Out_Date");
            put("dlrcode3Sort", "t.VDLRCODE3");
            put("dlrdescmdoutSort", "Dealer_Desc_mdout");
            put("recdlrdateSort", "t.DRECDLR");
            put("dlrcode4Sort", "t.VDLRCODE4");
            put("dlrdescrecSort", "Dealer_Desc_receive");
            put("bastSort", "t.VBAST");
            put("bastdateSort", "t.DBAST");
            put("frmnoSort", "t.VFRAMENO");
            put("engnoSort", "t.VENGINENO");
            put("typecodeSort", "Kode_Tipe");
            put("colorSort", "Warna");
            put("dlrcodefinSort", "t.VDLRCODEFIN");
            put("dlrdescSort", "Dealer_Desc");
            put("phoneSort", "t.VPHONE");
            put("nameSort", "t.VCUSTNAME");
            put("asnSort", "NOASN");
            put("boxSort", "NOBOX");
            put("packSort", "NOPACK");
            put("cartonSort", "NOCARTON");
            put("slSort", "NOSL");
        }
    };

    public static final Map<String, Object> HEADER_EXPORT_PROD = new LinkedHashMap<String, Object>() {
        {
            put("No", "");
            put("Serial Number", "");
            put("Category", "");
            put("REM / OEM", "");
            put("Kumamoto Serial Number", "");
            put("Pallet Barcode Number", "");
            put("Production Date", "");
            put("EXW Date", "");
            put("Duration", "");
            put("PO No.", "");
            put("Supplier ID", "");
            put("Supplier Desc", "");
            put("Matdoc GR", "");
            put("Last Status", "");
            put("Plant", "");
            put("Sloc ID", "");
            put("Sloc ID Dest (if move)", "");
            put("Input IN", "");
            put("Delivery Note No.", "");
            put("Plant Supplier", "");
            put("Part Number", "");
            put("Part Desc", "");
            put("Input OUT", "");
            put("Shipping List", "");
            put("Shipping List Date", "");
            put("Voucher Accessories", "");
            put("Transaction ID", "");
            put("Transaction Date", "");
            put("Transaction By", "");
            put("Transaction Status", "");
            put("No ASN", "");
            put("Box No", "");
            put("Packing Sheet No", "");
            put("Karton No", "");
            put("No Shipping List", "");
            put("Truck No.", "");
            put("Expedition Code", "");
            put("Expedition Name", "");
            put("Main Dealer Code", "");
            put("Main Dealer Description", "");
            put("Flag Charge", "");
            put("Last Charge Date", "");
        }
    };

    public static final Map<String, Object> HEADER_EXPORT_MKT = new LinkedHashMap<String, Object>() {
        {
            put("No", "");
            put("Serial Number", "");
            put("Category", "");
            put("REM / OEM", "");
            put("Kumamoto Serial Number", "");
            put("Pallet Barcode Number", "");
            put("Production Date", "");
            put("EXW Date", "");
            put("Duration", "");
            put("Last Status", "");
            put("Plant", "");
            put("Sloc ID", "");
            put("Shipping List", "");
            put("Voucher Accessories", "");
            put("Transaction ID", "");
            put("Transaction Date", "");
            put("Transaction By", "");
            put("Transaction Status", "");
            put("No ASN", "");
            put("Box No", "");
            put("Packing Sheet No", "");
            put("Karton No", "");
            put("No Shipping List", "");
            put("Truck No", "");
            put("Expedition Code", "");
            put("Expedition Name", "");
            put("Main Dealer Code", "");
            put("Main Dealer Description", "");
            put("Shipping List Date", "");
            put("Flag Charge", "");
            put("Last Charge Date", "");
            put("MD Receive Date", "");
            put("MD Out Date", "");
            put("MD Out (Dealer Code)", "");
            put("Dealer Desc(MD Out)", "");
            put("Dealer Receive Date", "");
            put("Receave (Dealer Code)", "");
            put("Dealer Desc.", "");
            put("No. BASTK", "");
            put("BASTK Date (Unit)", "");
            put("No. Frame", "");
            put("No. Engine", "");
            put("Kode Tipe (3 digit)", "");
            put("Warna", "");
            put("Dealer Code", "");
            put("Dealer Desc", "");
            put("Nomor HP", "");
            put("Nama", "");
        }
    };

    public static final Map<String, Object> HEADER_LOG_PROD = new LinkedHashMap<String, Object>() {
        {
            put("No", "");
            put("Serial Number", "");
            put("Category", "");
            put("REM / OEM", "");
            put("Kumamoto Serial Number", "");
            put("Pallet Barcode Number", "");
            put("Production Date", "");
            put("EXW Date", "");
            put("Duration", "");
            put("Last Status", "");
            put("Plant", "");
            put("Sloc ID", "");
            put("Shipping List", "");
            put("Voucher Accessories", "");
            put("Transaction ID", "");
            put("Transaction Date", "");
            put("Transaction By", "");
            put("Transaction Status", "");
            put("No ASN", "");
            put("Box No", "");
            put("Packing Sheet No", "");
            put("Karton No", "");
            put("No Shipping List", "");
            put("Truck No", "");
            put("Expedition Code", "");
            put("Expedition Name", "");
            put("Main Dealer Code", "");
            put("Main Dealer Description", "");
            put("Shipping List Date", "");
            put("Flag Charge", "");
            put("Last Charge Date", "");
        }
    };

    public static final Map<String, Object> HEADER_LOG_MKT = new LinkedHashMap<String, Object>() {
        {
            put("No", "");
            put("Serial Number", "");
            put("Category", "");
            put("REM / OEM", "");
            put("Kumamoto Serial Number", "");
            put("Pallet Barcode Number", "");
            put("Production Date", "");
            put("EXW Date", "");
            put("Duration", "");
            put("Last Status", "");
            put("Plant", "");
            put("Sloc ID", "");
            put("Shipping List", "");
            put("Voucher Accessories", "");
            put("Transaction ID", "");
            put("Transaction Date", "");
            put("Transaction By", "");
            put("Transaction Status", "");
            put("No ASN", "");
            put("Box No", "");
            put("Packing Sheet No", "");
            put("Karton No", "");
            put("No Shipping List", "");
            put("Truck No", "");
            put("Expedition Code", "");
            put("Expedition Name", "");
            put("Main Dealer Code", "");
            put("Main Dealer Description", "");
            put("Shipping List Date", "");
            put("Flag Charge", "");
            put("Last Charge Date", "");
            put("MD Receive Date", "");
            put("MD Out Date", "");
            put("MD Out (Dealer Code)", "");
            put("Dealer Desc(MD Out)", "");
            put("Dealer Receive Date", "");
            put("Receave (Dealer Code)", "");
            put("Dealer Desc.", "");
            put("No. BASTK", "");
            put("BASTK Date (Unit)", "");
            put("No. Frame", "");
            put("No. Engine", "");
            put("Kode Tipe (3 digit)", "");
            put("Warna", "");
            put("Dealer Code", "");
            put("Dealer Desc", "");
            put("Nomor HP", "");
            put("Nama", "");
        }
    };

    public static final String SQL_LOV_PLANT = "SELECT VPLANTID\n"
            + "FROM AHMMOMSC_MSTPLANTS\n"
            + "WHERE SYSDATE BETWEEN DBEGINEFF AND DENDEFF\n"
            + "ORDER BY VPLANTID\n";

    public static final String SQL_LOV_STATUS = "SELECT DISTINCT VITEMNAME\n"
            + "FROM AHMMOERP_DTLSETTINGS\n"
            + "WHERE RSET_VID = 'EVSTATACC' \n"
            + "AND BVALID = 'T'";

    public static final String SQL_MONITORING_PROD = "select  \n"
            + "    t.msdeveaccsn_vsrnumber,\n"
            + "    ( select vitemname from ahmmoerp_dtlsettings\n"
            + "     where mst.DSET_RSET_VID_TYACC = rset_vid\n"
            + "     and mst.DSET_VITEMCODE_TYACC = VITEMCODE ) Category,\n"
            + "    mst.vsourceacc,\n"
            + "    mst.vkumamotosn,\n"
            + "    mst.vpalletnum,\n"
            + "    mst.dprodacc,\n"
            + "    mst.dexwacc,\n"
            + "    nvl (t.nduration, abs(Ceil((Sysdate - mst.DPRODACC)) -1)) nduration,\n"
            + "    t.vpono,\n"
            + "    t.vsuppid, \n"
            + "    ( select vvendordesc from ahmmomsc_mstvendors\n"
            + "        where  vvendorid = t.vsuppid ) vendordesc,\n"
            + "    t.vmatdoc,\n"
            + "    s.vitemname last_status, \n"
            + "    t.vrecplant,\n"
            + "    t.vrecsloc,\n"
            + "    t.VDELSLOC,\n"
            + "    ( select dtxn from AHMMOSFC_HDRTXACCEVS h\n"
            + "        where (h.DSET_VITEMCODE = '0A' OR h.DSET_VITEMCODE = '0B' AND h.DSET_RSET_VID = 'EVSTATACC') and t.vtxnid = h.vtxnid  ) INPUT_IN,\n"
            + "    t.vdelno,\n"
            + "    t.vdelplant,\n"
            + "    mst.VPARTNUM,\n"
            + "    ( select vpartdesc from ahmmomsc_mstparts\n"
            + "        where mst.VPARTNUM = vpartnum  ) PartDesc, \n"
            + "    (select dtxn from AHMMOSFC_HDRTXACCEVS h\n"
            + "    where (h.DSET_VITEMCODE = '1A' OR h.DSET_VITEMCODE = '1C' AND h.DSET_RSET_VID = 'EVSTATACC' ) and t.vtxnid = h.vtxnid  ) INPUT_OUT,\n"
            + "    h.VSHPLSNO,\n"
            + "    t.vaccvoucher,\n"
            + "    t.vtxnid,\n"
            + "    t.dtxn,\n"
            + "    t.vcrea,\n"
            + "    h.VTXSTS,\n"
            + "    h.VTRUCKNO,\n"
            + "    t.VEXPID,\n"
            + "    t.VEXPDESC,\n"
            + "    t.VMDCODE,\n"
            + "    (select vnd_name from fmppc_pp00_vendors\n"
            + "        where t.vmdcode = vnd_code ) MD_NAME,\n"
            + "    t.DSL,\n"
            + "    mst.nflagcharge,\n"
            + "    mst.dlastcharge, \n"
            + "    case mst.vsourceacc when 'REM' THEN t.VASN  END AS NOASN,\n"
            + "    case mst.vsourceacc when 'REM' THEN t.VBOXNO  END AS NOBOX,\n"
            + "    case mst.vsourceacc when 'REM' THEN t.VPACKNO  END AS NOPACK,\n"
            + "    case mst.vsourceacc when 'REM' THEN t.VCARTONNO  END AS NOCARTON,\n"
            + "    case mst.vsourceacc when 'REM' THEN t.VSLAHM  END AS NOSL\n"
            + "from     ahmsdeve_txnaccsns t\n"
            + "left join AHMMOSFC_HDRTXACCEVS h on h.vtxnid = t.vtxnid\n"
            + "left join AHMSDEVE_MSTACCSNS mst on mst.VSRNUMBER = t.MSDEVEACCSN_VSRNUMBER \n"
            + "inner join  ( select RSET_VID, vitemcode, vitemname from ahmmoerp_dtlsettings  ) s \n"
            + "    on t.DSET_RSET_VID_SNSTAT = s.RSET_VID and t.DSET_VITEMCODE_SNSTAT = s.vitemcode\n"
            + "WHERE 1=1\n";

    public static final String SQL_MONITORING_MKT = "select  \n"
            + "    t.msdeveaccsn_vsrnumber,\n"
            + "    ( select vitemname from ahmmoerp_dtlsettings\n"
            + "     where mst.DSET_RSET_VID_TYACC = rset_vid\n"
            + "     and mst.DSET_VITEMCODE_TYACC = VITEMCODE ) Category,\n"
            + "    mst.vsourceacc,\n"
            + "    mst.vkumamotosn,\n"
            + "    mst.vpalletnum,\n"
            + "    mst.dprodacc,\n"
            + "    mst.dexwacc,\n"
            + "    nvl (t.nduration, abs(Ceil((Sysdate - mst.DPRODACC)) -1)) nduration,\n"
            + "    t.vpono,\n"
            + "    t.vsuppid, \n"
            + "    ( select vvendordesc from ahmmomsc_mstvendors\n"
            + "        where  vvendorid = t.vsuppid ) vendordesc,\n"
            + "    t.vmatdoc,\n"
            + "    s.vitemname last_status, \n"
            + "    t.vrecplant,\n"
            + "    t.vrecsloc,\n"
            + "    t.VDELSLOC,\n"
            + "    ( select dtxn from AHMMOSFC_HDRTXACCEVS h\n"
            + "        where (h.DSET_VITEMCODE = '0A' OR h.DSET_VITEMCODE = '0B' AND h.DSET_RSET_VID = 'EVSTATACC') and t.vtxnid = h.vtxnid ) INPUT_IN,\n"
            + "    t.vdelno,\n"
            + "    t.vdelplant,\n"
            + "    mst.VPARTNUM,\n"
            + "    ( select vpartdesc from ahmmomsc_mstparts\n"
            + "        where mst.VPARTNUM = vpartnum  ) PartDesc, \n"
            + "    (select dtxn from AHMMOSFC_HDRTXACCEVS h\n"
            + "    where (h.DSET_VITEMCODE = '1A' OR h.DSET_VITEMCODE = '1C' AND h.DSET_RSET_VID = 'EVSTATACC' ) and t.vtxnid = h.vtxnid ) INPUT_OUT,    h.VSHPLSNO,\n"
            + "    t.vaccvoucher,\n"
            + "    t.vtxnid,\n"
            + "    t.dtxn,\n"
            + "    t.vcrea,\n"
            + "    h.VTXSTS,\n"
            + "    h.VTRUCKNO,\n"
            + "    t.VEXPID,\n"
            + "    t.VEXPDESC,\n"
            + "    t.VMDCODE,\n"
            + "    (select vnd_name from fmppc_pp00_vendors\n"
            + "        where t.vmdcode = vnd_code ) MD_NAME,\n"
            + "    t.DSL,\n"
            + "    mst.nflagcharge,\n"
            + "    mst.dlastcharge,\n"
            + "    t.DRECMD,\n"
            + "    '' MD_Out_Date,\n"
            + "    t.VDLRCODE3,\n"
            + "    (select vnd_name from fmppc_pp00_vendors\n"
            + "        where t.VDLRCODE3 = vnd_code ) Dealer_Desc_mdout,\n"
            + "    t.DRECDLR,\n"
            + "    t.VDLRCODE4,\n"
            + "    (select vnd_name from fmppc_pp00_vendors\n"
            + "        where t.VDLRCODE4 = vnd_code ) Dealer_Desc_receive,\n"
            + "    t.VBAST,\n"
            + "    t.DBAST,\n"
            + "    t.VFRAMENO,\n"
            + "    t.VENGINENO,\n"
            + "    (select VTYPECODE from ahmpsssn_hisssMDs a where a.VFRAMENO = t.VFRAMENO) Kode_Tipe,\n"
            + "    (select VCOLORDESC from ahmmomsc_mstcolors where VCOLORID = (select vcolorcode from ahmpsssn_hisssMDs c where c.VFRAMENO = t.VFRAMENO))Warna ,\n"
            + "    t.VDLRCODEFIN,\n"
            + "    (select vnd_name from fmppc_pp00_vendors\n"
            + "        where t.VDLRCODEFIN = vnd_code ) Dealer_Desc,\n"
            + "    t.VPHONE,\n"
            + "    t.VCUSTNAME,  \n"
            + "    case mst.vsourceacc when 'REM' THEN t.VASN  END AS NOASN,\n"
            + "    case mst.vsourceacc when 'REM' THEN t.VBOXNO  END AS NOBOX,\n"
            + "    case mst.vsourceacc when 'REM' THEN t.VPACKNO  END AS NOPACK,\n"
            + "    case mst.vsourceacc when 'REM' THEN t.VCARTONNO  END AS NOCARTON,\n"
            + "    case mst.vsourceacc when 'REM' THEN t.VSLAHM  END AS NOSL\n"
            + "from     ahmsdeve_txnaccsns t\n"
            + "left join AHMMOSFC_HDRTXACCEVS h on h.vtxnid = t.vtxnid\n"
            + "left join AHMSDEVE_MSTACCSNS mst on mst.VSRNUMBER = t.MSDEVEACCSN_VSRNUMBER \n"
            + "inner join  ( select RSET_VID, vitemcode, vitemname from ahmmoerp_dtlsettings  ) s \n"
            + "    on t.DSET_RSET_VID_SNSTAT = s.RSET_VID and t.DSET_VITEMCODE_SNSTAT = s.vitemcode\n"
            + "WHERE 1=1\n";

    public static final String SQL_GET_ROLES = "SELECT RLACS.MIROLE_VROLEID\n"
            + "                FROM AHMPS2005.AHMITSYS_MSTROLEACCS RLACS , AHMITSYS_MSTMENUS MN ,AHMITSYS_MSTUSERROLES USRRL  \n"
            + "                WHERE RLACS.DBEGINEFF <= SYSDATE AND RLACS.DENDEFF >= SYSDATE \n"
            + "                AND MN.DBEGINEFF <= SYSDATE AND MN.DENDEFF >= SYSDATE \n"
            + "                AND USRRL.DBEGINEFF <= SYSDATE AND USRRL.DENDEFF >= SYSDATE \n"
            + "                AND UPPER(MN.VMODULENAME) = UPPER(:MODUL) \n"
            + "                AND RLACS.MIMENU_VMENUID = MN.VMENUID \n"
            + "                AND USRRL.MIROLE_VROLEID = RLACS.MIROLE_VROLEID \n"
            + "                AND USRRL.VUSERID = :USERID\n"
            + "                ORDER BY RLACS.MIROLE_VROLEID DESC";

    public static final String SQL_GET_LOG_PROD = "select  \n"
            + "    t.msdeveaccsn_vsrnumber,\n"
            + "    ( select vitemname from ahmmoerp_dtlsettings\n"
            + "     where mst.DSET_RSET_VID_TYACC = rset_vid\n"
            + "     and mst.DSET_VITEMCODE_TYACC = VITEMCODE ) Category,\n"
            + "    mst.vsourceacc,\n"
            + "    mst.vkumamotosn,\n"
            + "    mst.vpalletnum,\n"
            + "    mst.dprodacc,\n"
            + "    mst.dexwacc,\n"
            + "    nvl (t.nduration, abs(Ceil((Sysdate - mst.DPRODACC)) -1)) nduration,\n"
            + "    l.vpono,\n"
            + "    t.vsuppid, \n"
            + "    ( select vvendordesc from ahmmomsc_mstvendors\n"
            + "        where  vvendorid = t.vsuppid ) vendordesc,\n"
            + "    l.vmatdoc,\n"
            + "    s.vitemname last_status, \n"
            + "    t.vrecplant,\n"
            + "    t.vrecsloc,\n"
            + "    t.VDELSLOC,\n"
            + "    ( select dtxn from AHMMOSFC_HDRTXACCEVS h\n"
            + "        where (h.DSET_VITEMCODE = '0A' OR h.DSET_VITEMCODE = '0B' AND h.DSET_RSET_VID = 'EVSTATACC') and t.vtxnid = h.vtxnid ) INPUT_IN,\n"
            + "    t.vdelno,\n"
            + "    t.vdelplant,\n"
            + "    l.mpart_vpartnum,\n"
            + "    ( select vpartdesc from ahmmomsc_mstparts\n"
            + "        where l.mpart_vpartnum = vpartnum  ) PartDesc, \n"
            + "    (select dtxn from AHMMOSFC_HDRTXACCEVS h\n"
            + "    where (h.DSET_VITEMCODE = '1A' OR h.DSET_VITEMCODE = '1C' AND h.DSET_RSET_VID = 'EVSTATACC' ) and t.vtxnid = h.vtxnid ) INPUT_OUT,\n"
            + "    l.VSHPLSNO,\n"
            + "    t.vaccvoucher,\n"
            + "    l.RMOSFCTXACC_VTXNID,\n"
            + "    l.dtxn,\n"
            + "    t.vcrea,\n"
            + "    h.VTXSTS,\n"
            + "    h.VTRUCKNO,\n"
            + "    t.VEXPID,\n"
            + "    t.VEXPDESC,\n"
            + "    t.VMDCODE,\n"
            + "    (select vnd_name from fmppc_pp00_vendors\n"
            + "        where t.vmdcode = vnd_code ) MD_NAME,\n"
            + "    t.DSL,\n"
            + "    mst.nflagcharge,\n"
            + "    mst.dlastcharge, \n"
            + "    case mst.vsourceacc when 'REM' THEN t.VASN  END AS NOASN,\n"
            + "    case mst.vsourceacc when 'REM' THEN t.VBOXNO  END AS NOBOX,\n"
            + "    case mst.vsourceacc when 'REM' THEN t.VPACKNO  END AS NOPACK,\n"
            + "    case mst.vsourceacc when 'REM' THEN t.VCARTONNO  END AS NOCARTON,\n"
            + "    case mst.vsourceacc when 'REM' THEN t.VSLAHM  END AS NOSL\n"
            + "from AHMMOSFC_LOGTXACCEVS l\n"
            + "left join ahmsdeve_txnaccsns t on l.MSDEVEACCSN_VSRNUMBER = t.MSDEVEACCSN_VSRNUMBER\n"
            + "left join AHMMOSFC_HDRTXACCEVS h on h.vtxnid = t.vtxnid\n"
            + "left join AHMSDEVE_MSTACCSNS mst on mst.VSRNUMBER = t.MSDEVEACCSN_VSRNUMBER \n"
            + "inner join  ( select RSET_VID, vitemcode, vitemname from ahmmoerp_dtlsettings  ) s \n"
            + "    on l.DSET_RSET_VID = s.RSET_VID and l.DSET_VITEMCODE = s.vitemcode\n"
            + "    \n"
            + "where 1=1\n";

    public static final String SQL_GET_LOG_MKT = "select  \n"
            + "    t.msdeveaccsn_vsrnumber,\n"
            + "    ( select vitemname from ahmmoerp_dtlsettings\n"
            + "     where mst.DSET_RSET_VID_TYACC = rset_vid\n"
            + "     and mst.DSET_VITEMCODE_TYACC = VITEMCODE ) Category,\n"
            + "    mst.vsourceacc,\n"
            + "    mst.vkumamotosn,\n"
            + "    mst.vpalletnum,\n"
            + "    mst.dprodacc,\n"
            + "    mst.dexwacc,\n"
            + "    nvl (t.nduration, abs(Ceil((Sysdate - mst.DPRODACC)) -1)) nduration,\n"
            + "    l.vpono,\n"
            + "    t.vsuppid, \n"
            + "    ( select vvendordesc from ahmmomsc_mstvendors\n"
            + "        where  vvendorid = t.vsuppid ) vendordesc,\n"
            + "    l.vmatdoc,\n"
            + "    s.vitemname last_status, \n"
            + "    t.vrecplant,\n"
            + "    t.vrecsloc,\n"
            + "    t.VDELSLOC,\n"
            + "    ( select dtxn from AHMMOSFC_HDRTXACCEVS h\n"
            + "        where (h.DSET_VITEMCODE = '0A' OR h.DSET_VITEMCODE = '0B' AND h.DSET_RSET_VID = 'EVSTATACC') and t.vtxnid = h.vtxnid ) INPUT_IN,\n"
            + "    t.vdelno,\n"
            + "    t.vdelplant,\n"
            + "    l.mpart_vpartnum,\n"
            + "    ( select vpartdesc from ahmmomsc_mstparts\n"
            + "        where l.mpart_vpartnum = vpartnum  ) PartDesc, \n"
            + "    (select dtxn from AHMMOSFC_HDRTXACCEVS h\n"
            + "    where (h.DSET_VITEMCODE = '1A' OR h.DSET_VITEMCODE = '1C' AND h.DSET_RSET_VID = 'EVSTATACC' ) and t.vtxnid = h.vtxnid ) INPUT_OUT,    \n"
            + "    l.VSHPLSNO,\n"
            + "    t.vaccvoucher,\n"
            + "    l.RMOSFCTXACC_VTXNID,\n"
            + "    l.dtxn,\n"
            + "    t.vcrea,\n"
            + "    h.VTXSTS,\n"
            + "    h.VTRUCKNO,\n"
            + "    t.VEXPID,\n"
            + "    t.VEXPDESC,\n"
            + "    t.VMDCODE,\n"
            + "    (select vnd_name from fmppc_pp00_vendors\n"
            + "        where t.vmdcode = vnd_code ) MD_NAME,\n"
            + "    t.DSL,\n"
            + "    mst.nflagcharge,\n"
            + "    mst.dlastcharge,\n"
            + "    t.DRECMD,\n"
            + "    '' MD_Out_Date,\n"
            + "    t.VDLRCODE3,\n"
            + "    (select vnd_name from fmppc_pp00_vendors\n"
            + "        where t.VDLRCODE3 = vnd_code ) Dealer_Desc_mdout,\n"
            + "    t.DRECDLR,\n"
            + "    t.VDLRCODE4,\n"
            + "    (select vnd_name from fmppc_pp00_vendors\n"
            + "        where t.VDLRCODE4 = vnd_code ) Dealer_Desc_receive,\n"
            + "    t.VBAST,\n"
            + "    t.DBAST,\n"
            + "    t.VFRAMENO,\n"
            + "    t.VENGINENO,\n"
            + "    (select VTYPECODE from ahmpsssn_hisssMDs a where a.VFRAMENO = t.VFRAMENO) Kode_Tipe,\n"
            + "    (select VCOLORDESC from ahmmomsc_mstcolors where VCOLORID = (select vcolorcode from ahmpsssn_hisssMDs c where c.VFRAMENO = t.VFRAMENO))Warna ,    t.VDLRCODEFIN,\n"
            + "    (select vnd_name from fmppc_pp00_vendors\n"
            + "        where t.VDLRCODEFIN = vnd_code ) Dealer_Desc,\n"
            + "    t.VPHONE,\n"
            + "    t.VCUSTNAME,  \n"
            + "    case mst.vsourceacc when 'REM' THEN t.VASN  END AS NOASN,\n"
            + "    case mst.vsourceacc when 'REM' THEN t.VBOXNO  END AS NOBOX,\n"
            + "    case mst.vsourceacc when 'REM' THEN t.VPACKNO  END AS NOPACK,\n"
            + "    case mst.vsourceacc when 'REM' THEN t.VCARTONNO  END AS NOCARTON,\n"
            + "    case mst.vsourceacc when 'REM' THEN t.VSLAHM  END AS NOSL\n"
            + "from AHMMOSFC_LOGTXACCEVS l\n"
            + "left join ahmsdeve_txnaccsns t on l.MSDEVEACCSN_VSRNUMBER = t.MSDEVEACCSN_VSRNUMBER\n"
            + "left join AHMMOSFC_HDRTXACCEVS h on h.vtxnid = t.vtxnid\n"
            + "left join AHMSDEVE_MSTACCSNS mst on mst.VSRNUMBER = t.MSDEVEACCSN_VSRNUMBER \n"
            + "inner join  ( select RSET_VID, vitemcode, vitemname from ahmmoerp_dtlsettings  ) s \n"
            + "    on l.DSET_RSET_VID = s.RSET_VID and l.DSET_VITEMCODE = s.vitemcode\n"
            + "    \n"
            + "where 1=1\n";

    public static final String SQL_CHECK_SRN = "select MSDEVEACCSN_VSRNUMBER from ahmsdeve_txnaccsns\n"
            + "where DSET_RSET_VID_SNSTAT = 'EVSTATACC'\n"
            + "and DSET_VITEMCODE_SNSTAT IN ('1A', '1C', '1')\n";

    public static final String SQL_ROLES_SETTINGS = "SELECT DISTINCT VITEMDESC\n"
            + "FROM AHMMOERP_DTLSETTINGS\n"
            + "WHERE RSET_VID = 'EVMONACC' \n"
            + "AND BVALID = 'T'\n"
            + "and Lower(vitemcode) = lower(:PARAM)";
}
