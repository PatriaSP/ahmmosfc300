/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.co.ahm.mo.sfc.app341.dao.impl;

import id.co.ahm.jxf.dao.DefaultHibernateDao;
import id.co.ahm.jxf.dto.DtoParamPaging;
import id.co.ahm.jxf.vo.VoPstUserCred;
import id.co.ahm.mo.sfc.app341.constant.Sfc341Constant;
import id.co.ahm.mo.sfc.app341.dao.Sfc341ObjectDao;
import id.co.ahm.mo.sfc.app341.util.Sfc341QueryUtil;
import id.co.ahm.mo.sfc.app341.vo.Sfc341VoMonitoring;
import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.ScrollMode;
import org.hibernate.ScrollableResults;
import org.springframework.stereotype.Repository;

/**
 *
 * @author patria
 */
@Repository("sfc341ObjectDao")
public class Sfc341ObjectDaoImpl  extends DefaultHibernateDao<Object, Serializable> implements Sfc341ObjectDao {

    @Override
    public int getCountPlant(VoPstUserCred userCred) {
        String sql = Sfc341Constant.SQL_LOV_PLANT;

        Query query = getCurrentSession().createSQLQuery(Sfc341QueryUtil.countQuery(sql));

        Number number = (Number) query.uniqueResult();
        int count = number.intValue();

        return count;
    }

    @Override
    public List<String> getPlant(VoPstUserCred userCred) {
        String sql = Sfc341Constant.SQL_LOV_PLANT;

        SQLQuery q = getCurrentSession().createSQLQuery(sql);

        List<Object> list = q.list();

        if (q.list().isEmpty()) {
            return null;
        } else {
            List<String> result = list.stream().map((val) -> String.valueOf(val)).collect(Collectors.toList());
            Collections.sort(result);
            return result;
        }
    }

    @Override
    public int getCountStatus(VoPstUserCred userCred) {
        String sql = Sfc341Constant.SQL_LOV_STATUS;

        Query query = getCurrentSession().createSQLQuery(Sfc341QueryUtil.countQuery(sql));

        Number number = (Number) query.uniqueResult();
        int count = number.intValue();

        return count;
    }

    @Override
    public List<String> getStatus(VoPstUserCred userCred) {
        String sql = Sfc341Constant.SQL_LOV_STATUS;

        SQLQuery q = getCurrentSession().createSQLQuery(sql);

        List<Object> list = q.list();

        if (q.list().isEmpty()) {
            return null;
        } else {
            List<String> result = list.stream().map((val) -> String.valueOf(val)).collect(Collectors.toList());
            result.add("IN AHM");
            Collections.sort(result);
            return result;
        }
    }

    @Override
    public int getCountMonitoringProd(DtoParamPaging input, VoPstUserCred userCred) {
        String sql = Sfc341QueryUtil.setParamQuery(Sfc341Constant.SQL_MONITORING_PROD, input.getSearch(), Sfc341Constant.PARAM_QUERY_SEARCH);

        Query query = getCurrentSession().createSQLQuery(Sfc341QueryUtil.countQuery(sql));

        query = (SQLQuery) Sfc341QueryUtil.setParamValue(query, input.getSearch(), Sfc341Constant.PARAM_VALUE_SEARCH);

        Number number = (Number) query.uniqueResult();
        int count = number.intValue();

        return count;
    }

    @Override
    public List<Sfc341VoMonitoring> getMonitoringProd(DtoParamPaging input, VoPstUserCred userCred) {
        String sql = Sfc341QueryUtil.setParamQuery(Sfc341Constant.SQL_MONITORING_PROD, input.getSearch(), Sfc341Constant.PARAM_QUERY_SEARCH);

        sql = Sfc341QueryUtil.orderClause(input, sql, "t.MSDEVEACCSN_VSRNUMBER asc", Sfc341Constant.COL_ORDER);

        Query query = getCurrentSession().createSQLQuery(sql);

        query = (SQLQuery) Sfc341QueryUtil.setParamValue(query, input.getSearch(), Sfc341Constant.PARAM_VALUE_SEARCH);

        query.setMaxResults(input.getLimit());
        query.setFirstResult(input.getOffset());

        List<Sfc341VoMonitoring> listResult = new ArrayList<>();
        int rownum = input.getOffset();
        Sfc341VoMonitoring vo;
        Object[] result;
        int index;
        ScrollableResults list = query.scroll(ScrollMode.FORWARD_ONLY);
        while (list.next()) {
            result = (Object[]) list.get();
            index = 0;
            vo = new Sfc341VoMonitoring();
            rownum++;
            vo.setROWNUM(rownum);
            vo.setSRNNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setCATEGORY((result[index] == null) ? null : (String) result[index]);index++;
            vo.setSRCACC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setKUMAMOTONUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setPALLETNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setPRDACCDATE((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setEXACCDATE((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setDURATION((result[index] == null) ? null : (BigDecimal) result[index]);index++;
            vo.setPONUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setSUPPID((result[index] == null) ? null : (String) result[index]);index++;
            vo.setVENDDESC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setMATDOC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setLASTSTTS((result[index] == null) ? null : (String) result[index]);index++;
            vo.setRECPLANT((result[index] == null) ? null : (String) result[index]);index++;
            vo.setRECSLOC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setDELSLOC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setINPUTIN((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setDELNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setDELPLANT((result[index] == null) ? null : (String) result[index]);index++;
            vo.setPARTNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setPARTDESC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setINPUTOUT((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setSHPLISTNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setACCVOC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setTXNID((result[index] == null) ? null : (String) result[index]);index++;
            vo.setTXNDATE((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setVCREA((result[index] == null) ? null : (String) result[index]);index++;
            vo.setTXSTATUS((result[index] == null) ? null : (String) result[index]);index++;
            vo.setTRUCKNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setEXPID((result[index] == null) ? null : (String) result[index]);index++;
            vo.setEXPDESC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setMDCODE((result[index] == null) ? null : (String) result[index]);index++;
            vo.setMDNAME((result[index] == null) ? null : (String) result[index]);index++;
            vo.setSLDATE((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setFLAGCHARGE((result[index] == null) ? null : (BigDecimal) result[index]);index++;
            vo.setLASTCHARGEDATE((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setASNNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setBOXNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setPACKNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setCARTONNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setSLNUM((result[index] == null) ? null : (String) result[index]);
            listResult.add(vo);
        }
        return listResult;
    }
    
    
    @Override
    public int getCountMonitoringMkt(DtoParamPaging input, VoPstUserCred userCred) {
        String sql = Sfc341QueryUtil.setParamQuery(Sfc341Constant.SQL_MONITORING_MKT, input.getSearch(), Sfc341Constant.PARAM_QUERY_SEARCH);

        Query query = getCurrentSession().createSQLQuery(Sfc341QueryUtil.countQuery(sql));

        query = (SQLQuery) Sfc341QueryUtil.setParamValue(query, input.getSearch(), Sfc341Constant.PARAM_VALUE_SEARCH);

        Number number = (Number) query.uniqueResult();
        int count = number.intValue();

        return count;
    }

    @Override
    public List<Sfc341VoMonitoring> getMonitoringMkt(DtoParamPaging input, VoPstUserCred userCred) {
        String sql = Sfc341QueryUtil.setParamQuery(Sfc341Constant.SQL_MONITORING_MKT, input.getSearch(), Sfc341Constant.PARAM_QUERY_SEARCH);

        sql = Sfc341QueryUtil.orderClause(input, sql, "t.MSDEVEACCSN_VSRNUMBER asc", Sfc341Constant.COL_ORDER);

        Query query = getCurrentSession().createSQLQuery(sql);

        query = (SQLQuery) Sfc341QueryUtil.setParamValue(query, input.getSearch(), Sfc341Constant.PARAM_VALUE_SEARCH);

        query.setMaxResults(input.getLimit());
        query.setFirstResult(input.getOffset());

        List<Sfc341VoMonitoring> listResult = new ArrayList<>();
        int rownum = input.getOffset();
        Sfc341VoMonitoring vo;
        Object[] result;
        int index;
        ScrollableResults list = query.scroll(ScrollMode.FORWARD_ONLY);
        while (list.next()) {
            result = (Object[]) list.get();
            index = 0;
            vo = new Sfc341VoMonitoring();
            rownum++;
            vo.setROWNUM(rownum);
            vo.setSRNNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setCATEGORY((result[index] == null) ? null : (String) result[index]);index++;
            vo.setSRCACC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setKUMAMOTONUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setPALLETNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setPRDACCDATE((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setEXACCDATE((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setDURATION((result[index] == null) ? null : (BigDecimal) result[index]);index++;
            vo.setPONUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setSUPPID((result[index] == null) ? null : (String) result[index]);index++;
            vo.setVENDDESC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setMATDOC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setLASTSTTS((result[index] == null) ? null : (String) result[index]);index++;
            vo.setRECPLANT((result[index] == null) ? null : (String) result[index]);index++;
            vo.setRECSLOC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setDELSLOC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setINPUTIN((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setDELNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setDELPLANT((result[index] == null) ? null : (String) result[index]);index++;
            vo.setPARTNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setPARTDESC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setINPUTOUT((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setSHPLISTNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setACCVOC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setTXNID((result[index] == null) ? null : (String) result[index]);index++;
            vo.setTXNDATE((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setVCREA((result[index] == null) ? null : (String) result[index]);index++;
            vo.setTXSTATUS((result[index] == null) ? null : (String) result[index]);index++;
            vo.setTRUCKNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setEXPID((result[index] == null) ? null : (String) result[index]);index++;
            vo.setEXPDESC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setMDCODE((result[index] == null) ? null : (String) result[index]);index++;
            vo.setMDNAME((result[index] == null) ? null : (String) result[index]);index++;
            vo.setSLDATE((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setFLAGCHARGE((result[index] == null) ? null : (BigDecimal) result[index]);index++;
            vo.setLASTCHARGEDATE((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setRECMDDATE((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setMDOUTDATE((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setDLRCODE3((result[index] == null) ? null : (String) result[index]);index++;
            vo.setDLRDESCMDOUT((result[index] == null) ? null : (String) result[index]);index++;
            vo.setRECDLRDATE((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setDLRCODE4((result[index] == null) ? null : (String) result[index]);index++;
            vo.setDLRDESCREC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setBAST((result[index] == null) ? null : (String) result[index]);index++;
            vo.setBASTDATE((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setFRMNO((result[index] == null) ? null : (String) result[index]);index++;
            vo.setENGNO((result[index] == null) ? null : (String) result[index]);index++;
            vo.setTYPECODE((result[index] == null) ? null : (String) result[index]);index++;
            vo.setCOLOR((result[index] == null) ? null : (String) result[index]);index++;
            vo.setDLRCODEFIN((result[index] == null) ? null : (String) result[index]);index++;
            vo.setDLRDESC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setPHONE((result[index] == null) ? null : (String) result[index]);index++;
            vo.setNAME((result[index] == null) ? null : (String) result[index]);index++;
            vo.setASNNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setBOXNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setPACKNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setCARTONNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setSLNUM((result[index] == null) ? null : (String) result[index]);
            listResult.add(vo);
        }
        return listResult;
    }

    @Override
    public List<String> getRoles(VoPstUserCred userCred) {
        String sql = Sfc341Constant.SQL_GET_ROLES;

        SQLQuery q = getCurrentSession().createSQLQuery(sql);
        q.setParameter("USERID",userCred.getUserid());
        q.setParameter("MODUL","ahmmosfc341");
        
        List<Object> list = q.list();

        if (q.list().isEmpty()) {
            return null;
        } else {
            List<String> data = list.stream().map((val) -> String.valueOf(val)).collect(Collectors.toList());
            List<String> result = new ArrayList<String>();
            for(int i = 0;i < data.size(); i++){
                if(data.get(i).trim().equalsIgnoreCase("RO_MONITORING_BATT_OEM")){
                    result.add("RO_MONITORING_BATT_OEM");
                    break;
                }else if(data.get(i).trim().equalsIgnoreCase("RO_MONITORING_BATT_REM")){
                    result.add("RO_MONITORING_BATT_REM");
                    break;
                }else if(data.get(i).trim().equalsIgnoreCase("RO_ALL")){
                    result.add("RO_ALL");
                    break;
                }else{
                    
                }
            }
            return result;
        }
    }

    @Override
    public List<Sfc341VoMonitoring> getLogProd(Map<String, Object> input, VoPstUserCred userCred) {
        
        String sql = Sfc341Constant.SQL_GET_LOG_PROD;
        
        String[] listSrn = input.get("SRN").toString().split(",");
        sql += "AND l.msdeveaccsn_vsrnumber IN (:SRN0";
        for(int i = 1; i < listSrn.length; i++){
            sql += ",:SRN"+i;
        }
        sql += ")";
        
        Query query = getCurrentSession().createSQLQuery(sql);
        for(int i = 0; i < listSrn.length; i++){
           query.setParameter("SRN"+i,listSrn[i]);
        }
       
        List<Sfc341VoMonitoring> listResult = new ArrayList<>();
        int rownum = 0;
        Sfc341VoMonitoring vo;
        Object[] result;
        int index;
        ScrollableResults list = query.scroll(ScrollMode.FORWARD_ONLY);
        SimpleDateFormat sdf1 = new SimpleDateFormat("dd-MMM-yy");
        SimpleDateFormat sdf2 = new SimpleDateFormat("dd-MM-yyyy");
        while (list.next()) {
            result = (Object[]) list.get();
            index = 0;
            vo = new Sfc341VoMonitoring();
            rownum++;
            vo.setROWNUM(rownum);
            vo.setSRNNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setCATEGORY((result[index] == null) ? null : (String) result[index]);index++;
            vo.setSRCACC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setKUMAMOTONUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setPALLETNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setPRDACCDATE((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setEXACCDATE((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setDURATION((result[index] == null) ? null : (BigDecimal) result[index]);index++;
            vo.setPONUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setSUPPID((result[index] == null) ? null : (String) result[index]);index++;
            vo.setVENDDESC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setMATDOC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setLASTSTTS((result[index] == null) ? null : (String) result[index]);index++;
            vo.setRECPLANT((result[index] == null) ? null : (String) result[index]);index++;
            vo.setRECSLOC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setDELSLOC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setINPUTIN((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setDELNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setDELPLANT((result[index] == null) ? null : (String) result[index]);index++;
            vo.setPARTNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setPARTDESC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setINPUTOUT((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setSHPLISTNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setACCVOC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setTXNID((result[index] == null) ? null : (String) result[index]);index++;
            try {
                vo.setTXNDATE((result[index] == null) ? null : new java.sql.Timestamp(sdf1.parse((String) result[index]).getTime()));
            } catch (ParseException ex) {
                try {
                    vo.setTXNDATE((result[index] == null) ? null : new java.sql.Timestamp(sdf2.parse((String) result[index]).getTime()));
                } catch (ParseException ex1) {
                    Logger.getLogger(Sfc341ObjectDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
                    Logger.getLogger(Sfc341ObjectDaoImpl.class.getName()).log(Level.SEVERE, null, ex1);
                }
            }
            index++;
            vo.setVCREA((result[index] == null) ? null : (String) result[index]);index++;
            vo.setTXSTATUS((result[index] == null) ? null : (String) result[index]);index++;
            vo.setTRUCKNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setEXPID((result[index] == null) ? null : (String) result[index]);index++;
            vo.setEXPDESC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setMDCODE((result[index] == null) ? null : (String) result[index]);index++;
            vo.setMDNAME((result[index] == null) ? null : (String) result[index]);index++;
            vo.setSLDATE((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setFLAGCHARGE((result[index] == null) ? null : (BigDecimal) result[index]);index++;
            vo.setLASTCHARGEDATE((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setASNNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setBOXNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setPACKNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setCARTONNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setSLNUM((result[index] == null) ? null : (String) result[index]);
            listResult.add(vo);
        }
        return listResult;
    }

    @Override
    public List<Sfc341VoMonitoring> getLogMkt(Map<String, Object> input, VoPstUserCred userCred) {
        
        String sql = Sfc341Constant.SQL_GET_LOG_MKT;
        
        String[] listSrn = input.get("SRN").toString().split(",");
        sql += "AND l.msdeveaccsn_vsrnumber IN (:SRN0";
        for(int i = 1; i < listSrn.length; i++){
            sql += ",:SRN"+i;
        }
        sql += ")";
        
        Query query = getCurrentSession().createSQLQuery(sql);
        for(int i = 0; i < listSrn.length; i++){
           query.setParameter("SRN"+i,listSrn[i]);
        }

        List<Sfc341VoMonitoring> listResult = new ArrayList<>();
        int rownum = 0;
        Sfc341VoMonitoring vo;
        Object[] result;
        int index;
        ScrollableResults list = query.scroll(ScrollMode.FORWARD_ONLY);
        SimpleDateFormat sdf1 = new SimpleDateFormat("dd-MMM-yy");
        SimpleDateFormat sdf2 = new SimpleDateFormat("dd-MM-yyyy");
        while (list.next()) {
            result = (Object[]) list.get();
            index = 0;
            vo = new Sfc341VoMonitoring();
            rownum++;
            vo.setROWNUM(rownum);
            vo.setSRNNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setCATEGORY((result[index] == null) ? null : (String) result[index]);index++;
            vo.setSRCACC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setKUMAMOTONUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setPALLETNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setPRDACCDATE((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setEXACCDATE((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setDURATION((result[index] == null) ? null : (BigDecimal) result[index]);index++;
            vo.setPONUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setSUPPID((result[index] == null) ? null : (String) result[index]);index++;
            vo.setVENDDESC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setMATDOC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setLASTSTTS((result[index] == null) ? null : (String) result[index]);index++;
            vo.setRECPLANT((result[index] == null) ? null : (String) result[index]);index++;
            vo.setRECSLOC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setDELSLOC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setINPUTIN((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setDELNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setDELPLANT((result[index] == null) ? null : (String) result[index]);index++;
            vo.setPARTNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setPARTDESC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setINPUTOUT((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setSHPLISTNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setACCVOC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setTXNID((result[index] == null) ? null : (String) result[index]);index++;
            try {
                vo.setTXNDATE((result[index] == null) ? null : new java.sql.Timestamp(sdf1.parse((String) result[index]).getTime()));
            } catch (ParseException ex) {
                try {
                    vo.setTXNDATE((result[index] == null) ? null : new java.sql.Timestamp(sdf2.parse((String) result[index]).getTime()));
                } catch (ParseException ex1) {
                    Logger.getLogger(Sfc341ObjectDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
                    Logger.getLogger(Sfc341ObjectDaoImpl.class.getName()).log(Level.SEVERE, null, ex1);
                }
            }
            index++;
            vo.setVCREA((result[index] == null) ? null : (String) result[index]);index++;
            vo.setTXSTATUS((result[index] == null) ? null : (String) result[index]);index++;
            vo.setTRUCKNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setEXPID((result[index] == null) ? null : (String) result[index]);index++;
            vo.setEXPDESC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setMDCODE((result[index] == null) ? null : (String) result[index]);index++;
            vo.setMDNAME((result[index] == null) ? null : (String) result[index]);index++;
            vo.setSLDATE((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setFLAGCHARGE((result[index] == null) ? null : (BigDecimal) result[index]);index++;
            vo.setLASTCHARGEDATE((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setRECMDDATE((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setMDOUTDATE((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setDLRCODE3((result[index] == null) ? null : (String) result[index]);index++;
            vo.setDLRDESCMDOUT((result[index] == null) ? null : (String) result[index]);index++;
            vo.setRECDLRDATE((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setDLRCODE4((result[index] == null) ? null : (String) result[index]);index++;
            vo.setDLRDESCREC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setBAST((result[index] == null) ? null : (String) result[index]);index++;
            vo.setBASTDATE((result[index] == null) ? null : (Timestamp) result[index]);index++;
            vo.setFRMNO((result[index] == null) ? null : (String) result[index]);index++;
            vo.setENGNO((result[index] == null) ? null : (String) result[index]);index++;
            vo.setTYPECODE((result[index] == null) ? null : (String) result[index]);index++;
            vo.setCOLOR((result[index] == null) ? null : (String) result[index]);index++;
            vo.setDLRCODEFIN((result[index] == null) ? null : (String) result[index]);index++;
            vo.setDLRDESC((result[index] == null) ? null : (String) result[index]);index++;
            vo.setPHONE((result[index] == null) ? null : (String) result[index]);index++;
            vo.setNAME((result[index] == null) ? null : (String) result[index]);index++;
            vo.setASNNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setBOXNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setPACKNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setCARTONNUM((result[index] == null) ? null : (String) result[index]);index++;
            vo.setSLNUM((result[index] == null) ? null : (String) result[index]);
            listResult.add(vo);
        }
        return listResult;
    }

    @Override
    public List<String> checkScannedSrn(String[] srn, VoPstUserCred userCred) {
        String sql = Sfc341Constant.SQL_CHECK_SRN;
        
        sql += "and msdeveaccsn_vsrnumber IN (:SRN0";
        for(int i = 1; i < srn.length; i++){
            sql += ",:SRN"+i;
        }
        sql += ")";
        
        Query query = getCurrentSession().createSQLQuery(sql);
        for(int i = 0; i < srn.length; i++){
           query.setParameter("SRN"+i,srn[i]);
        }

        List<Object> list = query.list();

        if (query.list().isEmpty()) {
            return null;
        } else {
            List<String> result = list.stream().map((val) -> String.valueOf(val)).collect(Collectors.toList());
            Collections.sort(result);
            return result;
        }
    }

    @Override
    public List<String> getRolesSettings(Map<String, Object> input, VoPstUserCred userCred) {
        String sql = Sfc341Constant.SQL_ROLES_SETTINGS;

        SQLQuery q = getCurrentSession().createSQLQuery(sql);
        q.setParameter("PARAM",input.get("ROLES"));
        
        List<Object> list = q.list();

        if (q.list().isEmpty()) {
            return null;
        } else {
            List<String> result = list.stream().map((val) -> String.valueOf(val)).collect(Collectors.toList());
            Collections.sort(result);
            return result;
        }
    }
}
