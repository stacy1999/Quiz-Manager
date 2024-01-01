package com.synopticProject.quizManager.factory;
import com.synopticProject.quizManager.model.Quiz;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class QuizFactory {
    public Quiz getInstance(final String title){
        return Quiz.builder().title(title).build();
    }

    public Quiz getInstance(final String title, final LocalDateTime createdDateTime, final Long id){
        return Quiz.builder().title(title).id(id).createdDatetime(createdDateTime).build();
    }
}
