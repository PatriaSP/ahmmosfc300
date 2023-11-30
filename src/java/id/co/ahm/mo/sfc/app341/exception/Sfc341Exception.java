/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.co.ahm.mo.sfc.app341.exception;

import java.util.List;

/**
 *
 * @author patria
 */
public class Sfc341Exception extends RuntimeException {

    private List<String> errorList = null;
 
    public Sfc341Exception(String message, List<String> errorList) {
        super(message);
        this.errorList = errorList;
    }
 
    public Sfc341Exception(String message) {
        super(message);
    }
 
    public List<String> getErrorList() {
        return errorList;
    }
 
    public void setErrorList(List<String> errorList) {
        this.errorList = errorList;
    }
}
