package ru.nast.bootstrapSp.DTO;

import lombok.Data;

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
