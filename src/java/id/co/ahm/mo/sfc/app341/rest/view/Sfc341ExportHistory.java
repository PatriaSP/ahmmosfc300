/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.co.ahm.mo.sfc.app341.rest.view;

import id.co.ahm.jxf.dto.DtoResponse;
import id.co.ahm.mo.sfc.app341.constant.Sfc341Constant;
import id.co.ahm.mo.sfc.app341.vo.Sfc341VoMonitoring;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFRow;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;

/**
 *
 * @author patria
 */
public class Sfc341ExportHistory extends Sfc341BaseExcelExportView {

    @Override
    protected void buildExcelDocument(Map<String, Object> param, Workbook workbook, HttpServletRequest hsr, HttpServletResponse response) throws Exception {
        Map<String, Object> map = (Map<String, Object>) param.get("param");
        String roles = map.get("roles").toString();
        try {
            SXSSFSheet sheet = (SXSSFSheet) workbook.createSheet("Sheet");
            DtoResponse responsePosition = new DtoResponse();
            responsePosition.setData((List) map.get("tx"));
            List<Sfc341VoMonitoring> data = new ArrayList<>();
            int total = responsePosition.getData() == null ? 0 : responsePosition.getData().size();
            if (total > 0
                    && responsePosition.getData().get(0).getClass().equals(Sfc341VoMonitoring.class)) {
                data = responsePosition.getData();
            }

            //Style Header
            XSSFCellStyle styleHeader = (XSSFCellStyle) workbook.createCellStyle();
            XSSFFont fontHeader = (XSSFFont) workbook.createFont();
            fontHeader.setBoldweight(XSSFFont.BOLDWEIGHT_BOLD);
            fontHeader.setFontHeightInPoints((short) 11);
            styleHeader.setBorderBottom((short) 1);
            styleHeader.setBorderTop((short) 1);
            styleHeader.setBorderLeft((short) 1);
            styleHeader.setBorderRight((short) 1);
            styleHeader.setAlignment(HorizontalAlignment.CENTER);
            styleHeader.setFont(fontHeader);

            //Style data left
            XSSFCellStyle styleDataLeft = (XSSFCellStyle) workbook.createCellStyle();
            XSSFFont fontData = (XSSFFont) workbook.createFont();
            fontData.setFontHeightInPoints((short) 11);
            styleDataLeft.setBorderBottom((short) 1);
            styleDataLeft.setBorderTop((short) 1);
            styleDataLeft.setBorderLeft((short) 1);
            styleDataLeft.setBorderRight((short) 1);
            styleDataLeft.setVerticalAlignment(VerticalAlignment.CENTER);
            styleDataLeft.setWrapText(true);
            styleDataLeft.setAlignment(HorizontalAlignment.LEFT);
            styleDataLeft.setFont(fontData);
            
            //Style data right
            XSSFCellStyle styleDataRight = (XSSFCellStyle) workbook.createCellStyle();
            fontData.setFontHeightInPoints((short) 11);
            styleDataRight.setBorderBottom((short) 1);
            styleDataRight.setBorderTop((short) 1);
            styleDataRight.setBorderLeft((short) 1);
            styleDataRight.setBorderRight((short) 1);
            styleDataRight.setVerticalAlignment(VerticalAlignment.CENTER);
            styleDataRight.setWrapText(true);
            styleDataRight.setAlignment(HorizontalAlignment.RIGHT);
            styleDataRight.setFont(fontData);

            int rHeader = 0;
            SXSSFRow row;
            row = sheet.createRow(rHeader++);

            Object[] headers;
            if(roles.equalsIgnoreCase("RO_MONITORING_BATT_OEM")){
                headers = Sfc341Constant.HEADER_LOG_PROD.keySet().toArray();
            }else{
                headers = Sfc341Constant.HEADER_LOG_MKT.keySet().toArray();
            }
            
            for (int i = 0; i < headers.length; i++) {
                createCell(row, headers[i], i, styleHeader);
            }
            
            int index = 0;
            for (Sfc341VoMonitoring value : data) {
                //create cell
                row = sheet.createRow(rHeader++);
                index = 0;
                createCell(row, value.getROWNUM(), index++, styleDataRight);
                createCell(row, value.getSRNNUM()== null ? null : value.getSRNNUM(), index++, styleDataLeft);
                createCell(row, value.getCATEGORY()== null ? null : value.getCATEGORY(), index++, styleDataLeft);
                createCell(row, value.getSRCACC()== null ? null : value.getSRCACC(), index++, styleDataLeft);
                createCell(row, value.getKUMAMOTONUM()== null ? null : value.getKUMAMOTONUM(), index++, styleDataLeft);
                createCell(row, value.getPALLETNUM()== null ? null : value.getPALLETNUM(), index++, styleDataLeft);
                createCell(row, value.getPRDACCDATE()== null ? null : value.getPRDACCDATE(), index++, styleDataLeft);
                createCell(row, value.getEXACCDATE()== null ? null : value.getEXACCDATE(), index++, styleDataLeft);
                createCell(row, value.getDURATION()== null ? null : value.getDURATION(), index++, styleDataRight);
                createCell(row, value.getLASTSTTS()== null ? null : value.getLASTSTTS(), index++, styleDataLeft);
                createCell(row, value.getRECPLANT()== null ? null : value.getRECPLANT(), index++, styleDataRight);
                createCell(row, value.getRECSLOC()== null ? null : value.getRECSLOC(), index++, styleDataLeft);
                createCell(row, value.getSHPLISTNUM()== null ? null : value.getSHPLISTNUM(), index++, styleDataLeft);
                createCell(row, value.getACCVOC()== null ? null : value.getACCVOC(), index++, styleDataLeft);
                createCell(row, value.getTXNID()== null ? null : value.getTXNID(), index++, styleDataLeft);
                createCell(row, value.getTXNDATE()== null ? null : value.getTXNDATE(), index++, styleDataLeft);
                createCell(row, value.getVCREA()== null ? null : value.getVCREA(), index++, styleDataLeft);
                createCell(row, value.getTXSTATUS()== null ? null : value.getTXSTATUS(), index++, styleDataLeft);
                createCell(row, value.getASNNUM()== null ? null : value.getASNNUM(), index++, styleDataRight);
                createCell(row, value.getBOXNUM()== null ? null : value.getBOXNUM(), index++, styleDataLeft);
                createCell(row, value.getPACKNUM()== null ? null : value.getPACKNUM(), index++, styleDataLeft);
                createCell(row, value.getCARTONNUM()== null ? null : value.getCARTONNUM(), index++, styleDataLeft);
                createCell(row, value.getSLNUM()== null ? null : value.getSLNUM(), index++, styleDataLeft);
                createCell(row, value.getTRUCKNUM()== null ? null : value.getTRUCKNUM(), index++, styleDataLeft);
                createCell(row, value.getEXPID()== null ? null : value.getEXPID(), index++, styleDataLeft);
                createCell(row, value.getEXPDESC()== null ? null : value.getEXPDESC(), index++, styleDataLeft);
                createCell(row, value.getMDCODE()== null ? null : value.getMDCODE(), index++, styleDataLeft);
                createCell(row, value.getMDNAME() == null ? null : value.getMDNAME(), index++, styleDataLeft);
                createCell(row, value.getSLDATE()== null ? null : value.getSLDATE(), index++, styleDataLeft);
                createCell(row, value.getFLAGCHARGE()== null ? null : value.getFLAGCHARGE(), index++, styleDataRight);
                createCell(row, value.getLASTCHARGEDATE()== null ? null : value.getLASTCHARGEDATE(), index++, styleDataLeft);
                                
                if(roles.equalsIgnoreCase("RO_MONITORING_BATT_REM")){
                    createCell(row, value.getRECMDDATE()== null ? null : value.getRECMDDATE(), index++, styleDataLeft);
                    createCell(row, value.getMDOUTDATE()== null ? null : value.getMDOUTDATE(), index++, styleDataLeft);
                    createCell(row, value.getDLRCODE3()== null ? null : value.getDLRCODE3(), index++, styleDataLeft);
                    createCell(row, value.getDLRDESCMDOUT()== null ? null : value.getDLRDESCMDOUT(), index++, styleDataLeft);
                    createCell(row, value.getRECDLRDATE()== null ? null : value.getRECDLRDATE(), index++, styleDataLeft);
                    createCell(row, value.getDLRCODE4()== null ? null : value.getDLRCODE4(), index++, styleDataLeft);
                    createCell(row, value.getDLRDESCREC()== null ? null : value.getDLRDESCREC(), index++, styleDataLeft);
                    createCell(row, value.getBAST()== null ? null : value.getBAST(), index++, styleDataLeft);
                    createCell(row, value.getBASTDATE()== null ? null : value.getBASTDATE(), index++, styleDataLeft);
                    createCell(row, value.getFRMNO()== null ? null : value.getFRMNO(), index++, styleDataLeft);
                    createCell(row, value.getENGNO()== null ? null : value.getENGNO(), index++, styleDataLeft);
                    createCell(row, value.getTYPECODE()== null ? null : value.getTYPECODE(), index++, styleDataLeft);
                    createCell(row, value.getCOLOR()== null ? null : value.getCOLOR(), index++, styleDataLeft);
                    createCell(row, value.getDLRCODEFIN()== null ? null : value.getDLRCODEFIN(), index++, styleDataLeft);
                    createCell(row, value.getDLRDESC()== null ? null : value.getDLRDESC(), index++, styleDataLeft);
                    createCell(row, value.getPHONE()== null ? null : value.getPHONE(), index++, styleDataRight);
                    createCell(row, value.getNAME()== null ? null : value.getNAME(), index++, styleDataLeft);
                }
            }
            
            for(int i = 0;i < headers.length; i++){
                sheet.trackColumnForAutoSizing(i);
                sheet.autoSizeColumn(i);
            }
            row = sheet.createRow(rHeader++);
            for (int i = 0; i < headers.length; i++) {
                createCell(row, headers[i], i, styleHeader);
                sheet.trackColumnForAutoSizing(i);
                sheet.autoSizeColumn(i);
            }
            sheet.removeRow(row);

        } catch (Exception e) {
            throw new RuntimeException("Generate Excel Failed");
        }
        SimpleDateFormat sdf = new SimpleDateFormat("dd-MMM-yyyy HHmmss");
        String dt = sdf.format(new Date());
        String fileName = "TransactionalHistorySNAccsEV";
        response.setHeader("Content-Disposition", "attachment;filename=\"" + fileName +" "+ dt + ".xlsx\"");
    }

}
