/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.co.ahm.mo.sfc.app341.service.impl;

import id.co.ahm.jxf.constant.StatusMsgEnum;
import id.co.ahm.jxf.dto.DtoParamPaging;
import id.co.ahm.jxf.dto.DtoResponse;
import id.co.ahm.jxf.util.DtoHelper;
import id.co.ahm.jxf.vo.VoPstUserCred;
import id.co.ahm.mo.sfc.app000.model.AhmsdeveMstaccsns;
import id.co.ahm.mo.sfc.app341.dao.Sfc341AhmsdeveMstaccsnsDao;
import id.co.ahm.mo.sfc.app341.dao.Sfc341ObjectDao;
import id.co.ahm.mo.sfc.app341.service.Sfc341Service;
import id.co.ahm.mo.sfc.app341.vo.Sfc341VoMonitoring;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author patria
 */
@Service
@Transactional
public class Sfc341ServiceImpl implements Sfc341Service {

    @Autowired
    @Qualifier("sfc341ObjectDao")
    private Sfc341ObjectDao sfc341ObjectDao;

    @Autowired
    @Qualifier("sfc341AhmsdeveMstaccsnsDao")
    private Sfc341AhmsdeveMstaccsnsDao sfc341AhmsdeveMstaccsnsDao;

    @Override
    public DtoResponse getPlant(VoPstUserCred userCred) {
        int count = sfc341ObjectDao.getCountPlant(userCred);
        if (count != 0) {
            List<String> data = sfc341ObjectDao.getPlant(userCred);
            return DtoHelper.constructResponsePaging(StatusMsgEnum.SUKSES, null, data, count);
        } else {
            Map<String, Object> msg = new HashMap<>();
            msg.put("message", "Data kosong");
            return DtoHelper.constructResponsePaging(StatusMsgEnum.SUKSES, msg, null, count);
        }
    }

    @Override
    public DtoResponse getStatus(VoPstUserCred userCred) {
        int count = sfc341ObjectDao.getCountStatus(userCred);
        if (count != 0) {
            List<String> data = sfc341ObjectDao.getStatus(userCred);
            return DtoHelper.constructResponsePaging(StatusMsgEnum.SUKSES, null, data, count);
        } else {
            Map<String, Object> msg = new HashMap<>();
            msg.put("message", "Data kosong");
            return DtoHelper.constructResponsePaging(StatusMsgEnum.GAGAL, msg, null, count);
        }
    }

    @Override
    public DtoResponse getMonitoringMkt(DtoParamPaging input, VoPstUserCred userCred) {
        int count = sfc341ObjectDao.getCountMonitoringMkt(input, userCred);
        if (count != 0) {
            List<Sfc341VoMonitoring> data = sfc341ObjectDao.getMonitoringMkt(input, userCred);
            return DtoHelper.constructResponsePaging(StatusMsgEnum.SUKSES, null, data, count);
        } else {
            Map<String, Object> msg = new HashMap<>();
            msg.put("message", "Data kosong");
            return DtoHelper.constructResponsePaging(StatusMsgEnum.GAGAL, msg, null, count);
        }
    }

    @Override
    public DtoResponse getMonitoringProd(DtoParamPaging input, VoPstUserCred userCred) {
        int count = sfc341ObjectDao.getCountMonitoringProd(input, userCred);
        if (count != 0) {
            List<Sfc341VoMonitoring> data = sfc341ObjectDao.getMonitoringProd(input, userCred);
            return DtoHelper.constructResponsePaging(StatusMsgEnum.SUKSES, null, data, count);
        } else {
            Map<String, Object> msg = new HashMap<>();
            msg.put("message", "Data kosong");
            return DtoHelper.constructResponsePaging(StatusMsgEnum.GAGAL, msg, null, count);
        }
    }

    @Override
    public DtoResponse getUser(VoPstUserCred userCred) {

        List<String> data = sfc341ObjectDao.getRoles(userCred);

        return DtoHelper.constructResponse(StatusMsgEnum.SUKSES, null, data);
    }

    @Override
    public DtoResponse updateFlag(Map<String, Object> input, VoPstUserCred userCred) {
        Map<String, Object> msg = new HashMap<>();
        ArrayList<Object> listInput = (ArrayList<Object>) input.get("DATASELECTION");
        String srn = "";
        for (Object val : listInput) {
            Map<String, Object> dataInput = (Map<String, Object>) val;
            srn += dataInput.get("srnnum").toString() + ",";
        }
        List<String> checkSrn = sfc341ObjectDao.checkScannedSrn(srn.split(","), userCred);
        if (checkSrn == null) {
            for (Object val : listInput) {
                Map<String, Object> dataInput = (Map<String, Object>) val;
                AhmsdeveMstaccsns data = new AhmsdeveMstaccsns();
                data = sfc341AhmsdeveMstaccsnsDao.findOne(dataInput.get("srnnum").toString());
                if (data != null) {
                    BigDecimal flgCharge = data.getNFLAGCHARGE() == null ? new BigDecimal(0) : data.getNFLAGCHARGE();
                    data.setNFLAGCHARGE(flgCharge.add(new BigDecimal(1)));
                    data.setDLASTCHARGE(new Date());
                    sfc341AhmsdeveMstaccsnsDao.update(data,userCred.getUserid());
                    sfc341AhmsdeveMstaccsnsDao.flush();
                } else {
                    msg.put("message", "Gagal melakukan Update Flag Charge");
                    return DtoHelper.constructResponse(StatusMsgEnum.GAGAL, msg, null);
                }
            }
            msg.put("message", "Update Flag Charge berhasil dilakukan");
            return DtoHelper.constructResponse(StatusMsgEnum.SUKSES, msg, null);
        } else {
            msg.put("message", "Gagal melakukan Update Flag Charge, untuk Serial Number " + checkSrn + " karena status terakhir adalah Scan Out");
            return DtoHelper.constructResponse(StatusMsgEnum.GAGAL, msg, null);
        }

    }

    @Override
    public List<Sfc341VoMonitoring> getLogProd(Map<String, Object> input, VoPstUserCred userCred) {
        List<Sfc341VoMonitoring> data = sfc341ObjectDao.getLogProd(input, userCred);
        return data;
    }

    @Override
    public List<Sfc341VoMonitoring> getLogMkt(Map<String, Object> input, VoPstUserCred userCred) {
        List<Sfc341VoMonitoring> data = sfc341ObjectDao.getLogMkt(input, userCred);
        return data;
    }

    @Override
    public DtoResponse getRoles(Map<String, Object> input, VoPstUserCred userCred) {

        List<String> data = sfc341ObjectDao.getRolesSettings(input,userCred);

        return DtoHelper.constructResponse(StatusMsgEnum.SUKSES, null, data);

    }

}
