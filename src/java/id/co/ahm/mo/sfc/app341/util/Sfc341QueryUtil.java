/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.co.ahm.mo.sfc.app341.util;

import id.co.ahm.jxf.constant.CommonConstant;
import id.co.ahm.jxf.dto.DtoParamPaging;
import id.co.ahm.jxf.util.AhmStringUtil;
import java.util.Map;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.Query;

/**
 *
 * @author patria
 */
public class Sfc341QueryUtil {
    
    public static String countQuery(String sqlQuery) {
        return "SELECT COUNT(*) FROM (" + sqlQuery + " )";
    }
    
    public static String orderClause(DtoParamPaging input, String query, String defaultClause, Map<String, String> COL_ORDER) {
        StringBuilder sql = new StringBuilder(query);
        if (input.getSort() != null && !StringUtils.isEmpty(input.getSort())) {
            if (COL_ORDER.containsKey(input.getSort())) {
                sql.append(" ORDER BY ");
                sql.append(COL_ORDER.get(input.getSort()));
                if (input.getOrder().equalsIgnoreCase(CommonConstant.DESC)) {
                    sql.append(" DESC");
                } else {
                    sql.append(" ASC");
                }
            }
        } else {
            if (AhmStringUtil.hasValue(defaultClause)) {
                sql.append(" ORDER BY ").append(defaultClause);
            }
        }
        return sql.toString();
    }
    
    public static String setParamQuery(String query, Map<String, Object> param, Map<String, String> value){
        for(Map.Entry<String,Object> params : param.entrySet()){
            if(!params.getValue().toString().isEmpty()){
                query += "  "+value.get(params.getKey())+"    ";
            }
        }
        return query;
    }
    
    public static Query setParamValue(Query query, Map<String, Object> param, Map<String, String> value){
        for(Map.Entry<String,Object> params : param.entrySet()){
            if(!params.getValue().toString().isEmpty()){
                if(value.get(params.getKey()) != null){
                    query.setParameter(value.get(params.getKey()),params.getValue());
                }
            }
        }
        return query;
    }
    
}
