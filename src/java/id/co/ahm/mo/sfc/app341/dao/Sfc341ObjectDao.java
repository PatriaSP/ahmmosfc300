/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.co.ahm.mo.sfc.app341.dao;

import id.co.ahm.jxf.dto.DtoParamPaging;
import id.co.ahm.jxf.vo.VoPstUserCred;
import id.co.ahm.mo.sfc.app341.vo.Sfc341VoMonitoring;
import java.util.List;
import java.util.Map;

/**
 *
 * @author patria
 */
public interface Sfc341ObjectDao {

    public int getCountPlant(VoPstUserCred userCred);

    public List<String> getPlant(VoPstUserCred userCred);

    public int getCountStatus(VoPstUserCred userCred);

    public List<String> getStatus(VoPstUserCred userCred);

    public int getCountMonitoringMkt(DtoParamPaging input, VoPstUserCred userCred);

    public List<Sfc341VoMonitoring> getMonitoringMkt(DtoParamPaging input, VoPstUserCred userCred);

    public int getCountMonitoringProd(DtoParamPaging input, VoPstUserCred userCred);

    public List<Sfc341VoMonitoring> getMonitoringProd(DtoParamPaging input, VoPstUserCred userCred);

    public List<String> getRoles(VoPstUserCred userCred);

    public List<Sfc341VoMonitoring> getLogProd(Map<String, Object> input, VoPstUserCred userCred);

    public List<Sfc341VoMonitoring> getLogMkt(Map<String, Object> input, VoPstUserCred userCred);

    public List<String> checkScannedSrn(String[] srn, VoPstUserCred userCred);

    public List<String> getRolesSettings(Map<String, Object> input, VoPstUserCred userCred);
    
}
