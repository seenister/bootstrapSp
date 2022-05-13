package ru.nast.bootstrapSp.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;
import ru.nast.bootstrapSp.model.Role;
import java.util.Set;

@Data
public class CreateUserDTO {

    private String name;
    private String lastname;
    private int age;
    private String email;
    private String password;

    private String ADMIN;
    private String USER;

}
