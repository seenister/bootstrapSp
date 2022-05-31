/*
package ru.nast.bootstrapSp.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class ErrorURLInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        System.out.println("\n--------  ErrorURLInterceptor.preHandle --- ");
        System.out.println("Request URL: " + request.getRequestURL());
        System.out.println("Sorry! This URL is not used, Redirect to /index-page");

        response.sendRedirect(request.getContextPath() + "/index-page");
        return false;
    }
}*/
