package com.project.EatIt.service;

import com.project.EatIt.model.User;

public interface UserService {
    public User findUserByJWT(String jwt) throws Exception;

    public User findUserByEmail(String email) throws Exception;
}
