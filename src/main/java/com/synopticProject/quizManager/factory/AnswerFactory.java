package com.synopticProject.quizManager.factory;
import com.synopticProject.quizManager.model.Answer;
import org.springframework.stereotype.Component;

@Component
public class AnswerFactory {
    public Answer getInstance(final String answerText, final Long questionId){
        return Answer.builder().answer(answerText).questionId(questionId).build();
    }

    public Answer getInstance(final Long answerId, final String answerText, final Long questionId ){
        return Answer.builder().id(answerId).answer(answerText).questionId(questionId).build();
    }
}
