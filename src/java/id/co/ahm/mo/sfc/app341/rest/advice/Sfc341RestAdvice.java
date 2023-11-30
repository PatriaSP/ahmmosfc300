/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.co.ahm.mo.sfc.app341.rest.advice;

import id.co.ahm.jxf.constant.StatusMsgEnum;
import id.co.ahm.jxf.dto.DtoResponse;
import id.co.ahm.jxf.util.DtoHelper;
import id.co.ahm.mo.sfc.app341.exception.Sfc341Exception;
import id.co.ahm.mo.sfc.app341.rest.Sfc341Rest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author patria
 */
@ControllerAdvice(basePackageClasses = Sfc341Rest.class)
public class Sfc341RestAdvice {

    private static final String ERROR = "error";
    private static final String SERVER_PROCESSING_ERROR = "Server Processing Error";

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public DtoResponse handleException(Exception e, HttpServletResponse response) {
        e.printStackTrace();
        Map<String, Object> mapMsg = new HashMap<>();
        mapMsg.put(ERROR, SERVER_PROCESSING_ERROR);
        return DtoHelper.constructResponse(StatusMsgEnum.GAGAL, mapMsg, null);
    }

    @ExceptionHandler(Sfc341Exception.class)
    @ResponseBody
    public DtoResponse handleException(Sfc341Exception e, HttpServletResponse response) {
        List<String> msgError = null;
        Map<String, Object> mapMsg = new HashMap<>();
        if (e.getErrorList().isEmpty()) {
            mapMsg.put(ERROR, e.getErrorList());
            return DtoHelper.constructResponse(StatusMsgEnum.GAGAL, mapMsg, msgError);
        } else {
            return DtoHelper.constructResponse(StatusMsgEnum.GAGAL, null, e.getErrorList());
        }
    }
}
