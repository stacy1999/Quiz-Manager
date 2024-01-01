package com.synopticProject.quizManager.repository;

import com.synopticProject.quizManager.model.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    Optional<List<Answer>> findByQuestionId(final Long questionId);

    Optional<Answer> findByAnswer(final String answer);
}
