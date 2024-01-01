package com.synopticProject.quizManager.service;
import com.synopticProject.quizManager.model.Question;

import java.util.List;
import java.util.Optional;

public interface QuestionService {
    Optional<Question> getQuestionById(final Long id);

    List<Question> getQuestionByQuizId(Long id);

    List<Question> getAllQuestions();

    Long createQuestion(String question, Long quizId);

    Question updateQuestion(Long id, String question, Long quizId);

    void deleteQuestion(Long id);
}
