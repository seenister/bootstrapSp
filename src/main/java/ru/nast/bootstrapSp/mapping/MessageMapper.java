package ru.nast.bootstrapSp.mapping;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.nast.bootstrapSp.DTO.MessageDTO;
import ru.nast.bootstrapSp.DTO.UserDTO;
import ru.nast.bootstrapSp.model.User;
import ru.nast.bootstrapSp.service.UserService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;


@Component
public class MessageMapper {

    @Autowired
    UserService userService;

    public List<User> parsingRecipients(MessageDTO MessageDTO) {
        String[] allRecipients = MessageDTO.getRecipients().replaceAll("\\s+","").split(",");
        List <User> userlist = new ArrayList<>();
        for (String ID : allRecipients) {
            userlist.add(userService.getById(Long.parseLong(ID)));
        }
        return userlist;
    }


}
