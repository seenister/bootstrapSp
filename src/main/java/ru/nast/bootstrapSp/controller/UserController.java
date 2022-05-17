package ru.nast.bootstrapSp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {

    @GetMapping("/login-page")
    public String showSignUpForm() {
        return "login.html";
    }

    @GetMapping("/index-page")
    public String showIndexPage() {
        return "index.html";
    }

    @GetMapping("/sdvsd")
    public String errorURL() {
        return "error.html";
    }

}
