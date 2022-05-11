package ru.nast.bootstrapSp.serialize;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import ru.nast.bootstrapSp.model.Role;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class UserDTODeserializer extends JsonDeserializer<Set<Role>> {


    @Override
    public Set<Role> deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
        Set<Role> roles = new HashSet<>();
        if (jsonParser.getValueAsString("ADMIN").equals("ADMIN")) {
            roles.add(new Role(1L, "ADMIN"));
        }
        if (jsonParser.getValueAsString("USER").equals("USER")) {
            roles.add(new Role(2L, "USER"));
        }
        return roles;
    }
}
