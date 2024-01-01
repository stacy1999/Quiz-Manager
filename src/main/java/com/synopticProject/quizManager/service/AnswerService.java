package com.synopticProject.quizManager.service;

import com.synopticProject.quizManager.model.Answer;

import java.util.List;

public interface AnswerService {
    List<Answer> getAnswers(Long questionId);

    Long createAnswer(String answerText, Long questionId);

    Answer updateAnswer(Long id, String answerText, Long questionId);

    void deleteAnswer(Long id);
}
