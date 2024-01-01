package com.synopticProject.quizManager.factory;
import com.synopticProject.quizManager.model.Question;
import org.springframework.stereotype.Component;

@Component
public class QuestionFactory {
    public Question getInstance(final String question, final Long quizId){
        return Question.builder().questionTitle(question).quizId(quizId).build();
    }

    public Question getInstance(final Long questionId, final String question, final Long quizId){
        return Question.builder().id(questionId).questionTitle(question).quizId(quizId).build();
    }
}
