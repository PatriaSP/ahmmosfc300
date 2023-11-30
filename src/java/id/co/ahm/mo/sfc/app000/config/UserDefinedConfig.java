/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.co.ahm.mo.sfc.app000.config;

import id.co.ahm.it.sys.app000.dao.AhmmoerpTxnrunnumsDao;
import id.co.ahm.it.sys.app000.dao.impl.AhmmoerpTxnrunnumsDaoImpl;
import id.co.ahm.it.sys.app000.service.AhmmoerpTxnrunnumsService;
import id.co.ahm.it.sys.app000.service.impl.AhmmoerpTxnrunnumsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 *
 * @author shasabilla
 */
@Configuration
@ComponentScan("id.co.ahm.it.sys.app000")
public class UserDefinedConfig {

    /// Untuk mendefinisikan bean secara manual
    @Bean
    public AhmmoerpTxnrunnumsService ahmmoerpTxnrunnumsService() {
        return new AhmmoerpTxnrunnumsServiceImpl();
    }

    @Bean
    public AhmmoerpTxnrunnumsDao ahmmoerpTxnrunnumsDao() {
        return new AhmmoerpTxnrunnumsDaoImpl();
    }
}
