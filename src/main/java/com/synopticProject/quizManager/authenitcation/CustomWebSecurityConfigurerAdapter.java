package com.synopticProject.quizManager.authenitcation;

import com.synopticProject.quizManager.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class CustomWebSecurityConfigurerAdapter extends WebSecurityConfigurerAdapter {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .inMemoryAuthentication()
                .withUser("user1").password(passwordEncoder().encode("password1")).roles("Edit")
                .and()
                .withUser("user2").password(passwordEncoder().encode("password2")).roles("View")
                .and()
                .withUser("user3").password(passwordEncoder().encode("password3")).roles("Restricted");
//                .roles("USER");
//                .userDetailsService(userDetailsService)
//                .passwordEncoder(passwordEncoder)
//                .configure();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic()
            .and().cors()
            .and().csrf().disable()
            .authorizeRequests().antMatchers(HttpMethod.POST).hasRole("Edit")
            .antMatchers(HttpMethod.PUT).hasRole("Edit")
            .antMatchers(HttpMethod.DELETE).hasRole("Edit")
            .antMatchers(HttpMethod.GET, "/answers/**").hasAnyRole("Edit", "View")
            .anyRequest().hasAnyRole("Edit", "View", "Restricted");
    }

}
