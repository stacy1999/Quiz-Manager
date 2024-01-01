package com.synopticProject.quizManager.service;
import com.synopticProject.quizManager.model.Quiz;

import java.util.List;

public interface QuizService {
    Quiz getQuiz(Long id);

    List<Quiz> getAllQuizzes();

    Long createQuiz(String title);

    Quiz updateQuiz(Long id, String title);

    void deleteQuiz(Long id);
}
