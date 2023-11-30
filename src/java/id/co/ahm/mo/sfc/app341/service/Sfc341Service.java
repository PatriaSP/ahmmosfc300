/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.co.ahm.mo.sfc.app341.service;

import id.co.ahm.jxf.dto.DtoParamPaging;
import id.co.ahm.jxf.dto.DtoResponse;
import id.co.ahm.jxf.vo.VoPstUserCred;
import id.co.ahm.mo.sfc.app341.vo.Sfc341VoMonitoring;
import java.util.List;
import java.util.Map;

/**
 *
 * @author patria
 */
public interface Sfc341Service {

    public DtoResponse getPlant( VoPstUserCred userCred);

    public DtoResponse getStatus(VoPstUserCred userCred);

    public DtoResponse getMonitoringMkt(DtoParamPaging input, VoPstUserCred userCred);

    public DtoResponse getMonitoringProd(DtoParamPaging input, VoPstUserCred userCred);

    public DtoResponse getUser(VoPstUserCred userCred);

    public DtoResponse updateFlag(Map<String, Object> input, VoPstUserCred userCred);

    public List<Sfc341VoMonitoring> getLogProd(Map<String, Object> input, VoPstUserCred userCred);

    public List<Sfc341VoMonitoring> getLogMkt(Map<String, Object> input, VoPstUserCred userCred);

    public DtoResponse getRoles(Map<String, Object> input, VoPstUserCred userCred);
    
}
