/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.co.ahm.mo.sfc.app000.model;

import id.co.ahm.jxf.model.DefaultEntityImpl;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

/**
 *
 * @author patria
 */
@Entity
@DynamicUpdate
@DynamicInsert
@Table(name = "MSTACCSNS")
public class AhmsdeveMstaccsns extends DefaultEntityImpl implements Serializable {

    @Id
    @Column(name = "VSRNUMBER")
    private String VSRNUMBER;

    @Column(name = "VPARTNUM")
    private String VPARTNUM;

    @Column(name = "DSET_RSET_VID_TYACC")
    private String DSET_RSET_VID_TYACC;

    @Column(name = "DSET_VITEMCODE_TYACC")
    private String DSET_VITEMCODE_TYACC;

    @Column(name = "VSOURCEACC")
    private String VSOURCEACC;

    @Column(name = "DPRODACC")
    private Date DPRODACC;

    @Column(name = "DEXWACC")
    private Date DEXWACC;

    @Column(name = "NFLAGCHARGE")
    private BigDecimal NFLAGCHARGE;

    @Column(name = "DLASTCHARGE")
    private Date DLASTCHARGE;

    @Column(name = "VKUMAMOTOSN")
    private String VKUMAMOTOSN;

    @Column(name = "VPALLETNUM")
    private String VPALLETNUM;
    
    public String getVSRNUMBER() {
        return VSRNUMBER;
    }

    public void setVSRNUMBER(String VSRNUMBER) {
        this.VSRNUMBER = VSRNUMBER;
    }

    public String getVPARTNUM() {
        return VPARTNUM;
    }

    public void setVPARTNUM(String VPARTNUM) {
        this.VPARTNUM = VPARTNUM;
    }

    public String getDSET_RSET_VID_TYACC() {
        return DSET_RSET_VID_TYACC;
    }

    public void setDSET_RSET_VID_TYACC(String DSET_RSET_VID_TYACC) {
        this.DSET_RSET_VID_TYACC = DSET_RSET_VID_TYACC;
    }

    public String getDSET_VITEMCODE_TYACC() {
        return DSET_VITEMCODE_TYACC;
    }

    public void setDSET_VITEMCODE_TYACC(String DSET_VITEMCODE_TYACC) {
        this.DSET_VITEMCODE_TYACC = DSET_VITEMCODE_TYACC;
    }

    public String getVSOURCEACC() {
        return VSOURCEACC;
    }

    public void setVSOURCEACC(String VSOURCEACC) {
        this.VSOURCEACC = VSOURCEACC;
    }

    public Date getDPRODACC() {
        return DPRODACC;
    }

    public void setDPRODACC(Date DPRODACC) {
        this.DPRODACC = DPRODACC;
    }

    public Date getDEXWACC() {
        return DEXWACC;
    }

    public void setDEXWACC(Date DEXWACC) {
        this.DEXWACC = DEXWACC;
    }

    public BigDecimal getNFLAGCHARGE() {
        return NFLAGCHARGE;
    }

    public void setNFLAGCHARGE(BigDecimal NFLAGCHARGE) {
        this.NFLAGCHARGE = NFLAGCHARGE;
    }

    public Date getDLASTCHARGE() {
        return DLASTCHARGE;
    }

    public void setDLASTCHARGE(Date DLASTCHARGE) {
        this.DLASTCHARGE = DLASTCHARGE;
    }

    public String getVKUMAMOTOSN() {
        return VKUMAMOTOSN;
    }

    public void setVKUMAMOTOSN(String VKUMAMOTOSN) {
        this.VKUMAMOTOSN = VKUMAMOTOSN;
    }

    public String getVPALLETNUM() {
        return VPALLETNUM;
    }

    public void setVPALLETNUM(String VPALLETNUM) {
        this.VPALLETNUM = VPALLETNUM;
    }

}
