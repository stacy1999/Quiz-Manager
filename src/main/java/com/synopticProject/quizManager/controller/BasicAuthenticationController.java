package com.synopticProject.quizManager.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BasicAuthenticationController {

    @GetMapping("/basicAuth")
    public String login(){
        return "Welcome to the Quiz Manager!";
    }
}
