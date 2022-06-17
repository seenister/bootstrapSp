package ru.nast.bootstrapSp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.nast.bootstrapSp.DTO.MessageDTO;
import ru.nast.bootstrapSp.mapping.MessageMapper;
import ru.nast.bootstrapSp.service.MailService;

@RestController
public class MessageController {

    @Autowired
    private MessageMapper messageMapper;

    @Autowired
    private MailService mailService;

    @PostMapping("/messages/send")
    public ResponseEntity<HttpStatus> sendMessage(@RequestBody MessageDTO messageDTO) {
        mailService.sendMessageToUsers(messageMapper.parsingRecipients(messageDTO), messageDTO.getMessage());
        return ResponseEntity.ok().build();
    }
}

