package ru.nast.bootstrapSp.DTO;

import lombok.Data;

@Data
public class UserDTO {
    private long id;
    private String name;
    private String lastname;
    private int age;
    private String email;
    private String password;
    private String admin;
    private String user;



}
