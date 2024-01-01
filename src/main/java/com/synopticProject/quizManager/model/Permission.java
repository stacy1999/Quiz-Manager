package com.synopticProject.quizManager.model;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name= "permissions")
@SuperBuilder
@SequenceGenerator(name = "default_gen", sequenceName = "permission_id", allocationSize = 1)
public class Permission implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "default_gen")
    private Long id;

    private String permission;

    public Permission(){}

    public Permission(String permission){
        this.permission = permission;
    }

    public Long getId(){
        return id;
    }

    public String getPermission(){
        return permission;
    }

    public void setPermission(String permission){
        this.permission = permission;
    }

    @Override
    public String getAuthority() {
        return permission;
    }
}
