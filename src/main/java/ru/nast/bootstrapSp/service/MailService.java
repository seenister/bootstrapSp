package ru.nast.bootstrapSp.service;

// File Name SendFileEmail.java

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import ru.nast.bootstrapSp.DTO.MessageDTO;
import ru.nast.bootstrapSp.model.User;

import java.util.*;
import javax.activation.*;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

@Service
public class MailService {

    @Autowired
    private JavaMailSender mailSender;


    @Value("${spring.mail.username}")
    private String username;


    public void sendMessageToUsers (List <User> users, String message) {
        for (User user : users) {
            sendMessageToUser(user, message);
        }
    }

    public void sendMessageToUser (User user, String message) {

            SimpleMailMessage mailMessage = new SimpleMailMessage();

            mailMessage.setFrom(username);
            mailMessage.setTo(user.getEmail());
            mailMessage.setSubject(message);
            mailMessage.setText(message);
            mailSender.send(mailMessage);
    }

}
