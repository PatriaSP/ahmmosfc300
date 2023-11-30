/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package id.co.ahm.jxf.config;

import java.io.Serializable;

public class UserGenConfig implements Serializable {

    private static final long serialVersionUID = -7395874522702130196L;
    private String passFormat;
//	private String usernameFormat;

    public String getPassFormat() {
        return passFormat;
    }

    public void setPassFormat(String passFormat) {
        this.passFormat = passFormat;
    }
//	public String getUsernameFormat() {
//		return usernameFormat;
//	}
//
//	public void setUsernameFormat(String usernameFormat) {
//		this.usernameFormat = usernameFormat;
//	}
    
}
