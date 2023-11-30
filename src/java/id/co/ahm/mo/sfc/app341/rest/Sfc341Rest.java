/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.co.ahm.mo.sfc.app341.rest;

import id.co.ahm.jxf.constant.CommonConstant;
import id.co.ahm.jxf.dto.DtoParamPaging;
import id.co.ahm.jxf.dto.DtoResponse;
import id.co.ahm.jxf.security.TokenPstUtil;
import id.co.ahm.mo.sfc.app341.rest.view.Sfc341ExportHistory;
import id.co.ahm.mo.sfc.app341.rest.view.Sfc341ExportMonitoring;
import id.co.ahm.mo.sfc.app341.service.Sfc341Service;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author patria
 */
@RestController
@RequestMapping("mo/sfc341")
public class Sfc341Rest {    
    @Autowired
    @Qualifier(value = "tokenPstUtil")
    private TokenPstUtil tokenPstUtil;

    @Autowired
    private Sfc341Service sfc341Service;
    
    @RequestMapping(value = "get-user", method = RequestMethod.POST,
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = MediaType.APPLICATION_JSON_VALUE)
    public DtoResponse getUser(@RequestHeader(value = CommonConstant.JXID, defaultValue = "") String token) {
        return sfc341Service.getUser(tokenPstUtil.getUserCred(token));
    }
    
    @RequestMapping(value = "get-role-setting", method = RequestMethod.POST,
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = MediaType.APPLICATION_JSON_VALUE)
    public DtoResponse getRoles(@RequestHeader(value = CommonConstant.JXID, defaultValue = "") String token,
            @RequestBody Map<String, Object> input) {
        return sfc341Service.getRoles(input,tokenPstUtil.getUserCred(token));
    }
    
    @RequestMapping(value = "get-volist-plant", method = RequestMethod.POST,
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = MediaType.APPLICATION_JSON_VALUE)
    public DtoResponse getPlantLov(@RequestHeader(value = CommonConstant.JXID,
            defaultValue = "") String token) {
        return sfc341Service.getPlant(tokenPstUtil.getUserCred(token));
    }
    
    @RequestMapping(value = "get-volist-status", method = RequestMethod.POST,
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = MediaType.APPLICATION_JSON_VALUE)
    public DtoResponse getStatusLov(@RequestHeader(value = CommonConstant.JXID,
            defaultValue = "") String token) {
        return sfc341Service.getStatus(tokenPstUtil.getUserCred(token));
    }
    
    @RequestMapping(value = "get-monitoring-data", method = RequestMethod.POST,
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = MediaType.APPLICATION_JSON_VALUE)
    public DtoResponse getMonitoring(@RequestHeader(value = CommonConstant.JXID,
            defaultValue = "") String token,
            @RequestBody DtoParamPaging input) {
        return sfc341Service.getMonitoringMkt(input, tokenPstUtil.getUserCred(token));
    }
    
    @RequestMapping(value = "get-monitoring-data-mkt", method = RequestMethod.POST,
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = MediaType.APPLICATION_JSON_VALUE)
    public DtoResponse getMonitoringMkt(@RequestHeader(value = CommonConstant.JXID,
            defaultValue = "") String token,
            @RequestBody DtoParamPaging input) {
        return sfc341Service.getMonitoringMkt(input, tokenPstUtil.getUserCred(token));
    }
    
    @RequestMapping(value = "get-monitoring-data-prod", method = RequestMethod.POST,
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = MediaType.APPLICATION_JSON_VALUE)
    public DtoResponse getMonitoringProd(@RequestHeader(value = CommonConstant.JXID,
            defaultValue = "") String token,
            @RequestBody DtoParamPaging input) {
        return sfc341Service.getMonitoringProd(input, tokenPstUtil.getUserCred(token));
    }
    
    @RequestMapping(value = "update-flag-charge", method = RequestMethod.POST,
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = MediaType.APPLICATION_JSON_VALUE)
    public DtoResponse updateFlag(@RequestHeader(value = CommonConstant.JXID,
            defaultValue = "") String token,
        @RequestBody Map<String, Object> input) {
        return sfc341Service.updateFlag(input, tokenPstUtil.getUserCred(token));
    }
    
    @RequestMapping(value = "export-excel", method = RequestMethod.GET)
    public ModelAndView exportToExcel(
            @RequestParam(name = "JXID", required = true) String token,
            @RequestParam(name = "SORT", required = true) String sort,
            @RequestParam(name = "ORDER", required = true) String order,
            @RequestParam Map<String, Object> input) {
        
        DtoParamPaging param = new DtoParamPaging();
        input.remove("JXID");
        input.remove("SORT");
        input.remove("ORDER");
        param.setSearch(input);
        if(!sort.isEmpty()){
            param.setSort(sort);
            param.setOrder(order);
        }
        Map<String, Object> src = new HashMap<>();
        if(input.get("ROLES").toString().equalsIgnoreCase("RO_MONITORING_BATT_OEM")){
            src.put("roles", input.get("ROLES"));
            input.remove("ROLES");
            src.put("tx", sfc341Service.getMonitoringProd(param, tokenPstUtil.getUserCred(token)));
        }else{
            src.put("roles", input.get("ROLES"));
            input.remove("ROLES");
            src.put("tx", sfc341Service.getMonitoringMkt(param, tokenPstUtil.getUserCred(token)));
        }
        src.put("input", param);

        return new ModelAndView(new Sfc341ExportMonitoring(), "param", src);
    }
    
    @RequestMapping(value = "download-log", method = RequestMethod.GET)
    public ModelAndView downloadLog(
            @RequestParam(name = "JXID", required = true) String token,
            @RequestParam Map<String, Object> input) {
        
        DtoParamPaging param = new DtoParamPaging();
        input.remove("JXID");
        param.setSearch(input);
        
        Map<String, Object> src = new HashMap<>();
        if(input.get("ROLES").toString().equalsIgnoreCase("RO_MONITORING_BATT_OEM")){
            src.put("roles", input.get("ROLES"));
            input.remove("ROLES");
            src.put("tx", sfc341Service.getLogProd(input, tokenPstUtil.getUserCred(token)));
        }else{
            src.put("roles", input.get("ROLES"));
            input.remove("ROLES");
            src.put("tx", sfc341Service.getLogMkt(input, tokenPstUtil.getUserCred(token)));
        }
        src.put("input", param);

        return new ModelAndView(new Sfc341ExportHistory(), "param", src);
    }
}
