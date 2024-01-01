package com.synopticProject.quizManager.service;
import com.synopticProject.quizManager.factory.AnswerFactory;
import com.synopticProject.quizManager.model.Answer;
import com.synopticProject.quizManager.model.Question;
import com.synopticProject.quizManager.repository.AnswerRepository;
import com.synopticProject.quizManager.repository.QuestionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static java.lang.String.format;

@Service
@Slf4j
public class AnswerServiceImpl implements AnswerService {

    private final AnswerRepository answerRepository;
    private final AnswerFactory answerFactory;
    private final QuestionRepository questionRepository;

    public AnswerServiceImpl(AnswerRepository answerRepository,
                             AnswerFactory answerFactory,
                             QuestionRepository questionRepository) {
        this.answerRepository = answerRepository;
        this.answerFactory = answerFactory;
        this.questionRepository = questionRepository;
    }

    @Override
    public List<Answer> getAnswers(final Long questionId){
        final Optional<List<Answer>> answers = answerRepository.findByQuestionId(questionId);
        return answers.orElseThrow(() -> {
            throw new NullPointerException(format("No answers found for question with id %s", questionId));
        });
    }

    @Override
    public Long createAnswer(final String answerText, final Long questionId){
        if(!answerRepository.findByAnswer(answerText).isEmpty()){
            throw new IllegalStateException(format("Answer with the text %s already exists", answerText));
        }

        final Answer answerToBeSaved = answerFactory.getInstance(answerText, questionId);
        final Long newAnswerId = answerRepository.save(answerToBeSaved).getId();
        return newAnswerId;
    }

    @Override
    public Answer updateAnswer(final Long id, final String answerText, final Long questionId){
        final Optional<Answer> answerToUpdate = answerRepository.findById(id);

        if(answerToUpdate.isEmpty()){
            throw new NullPointerException(format("No answer found with id %s", id));
        }

        final Optional<Question> question = questionRepository.findById(questionId);
        if(question.isEmpty()){
            throw new NullPointerException(format("No question found with id %s", questionId));
        }

        final Answer answerTobeSaved = answerFactory.getInstance(id, answerText, questionId);

        return answerRepository.save(answerTobeSaved);
    }

    @Override
    public void deleteAnswer(final Long id){
        final Optional<Answer> answer = answerRepository.findById(id);

        if(answer.isEmpty()){
            throw new NullPointerException(format("No answer found with id %s", id));
        }

        answerRepository.deleteById(id);
    }
}
