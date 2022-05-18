/*
package ru.nast.bootstrapSp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import ru.nast.bootstrapSp.interceptor.ErrorURLInterceptor;


@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {

    //
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new ErrorURLInterceptor())
                .addPathPatterns("/*")
                .addPathPatterns("/index-page/*")
                .excludePathPatterns("/index-page/getCurrentUser")
                .excludePathPatterns("/index-page/getAllUsers")
                .excludePathPatterns("/index-page/adduser")
                .excludePathPatterns("/index-page/edit/{id}")
                .excludePathPatterns("/index-page/deleteUser/{id}")
                .excludePathPatterns("/index-page")
                .excludePathPatterns("/login-page")
                .excludePathPatterns("/")
          ;

    }
}
*/
