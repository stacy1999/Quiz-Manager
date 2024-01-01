package com.synopticProject.quizManager.service;
import com.synopticProject.quizManager.factory.QuestionFactory;
import com.synopticProject.quizManager.model.Question;
import com.synopticProject.quizManager.model.Quiz;
import com.synopticProject.quizManager.repository.QuestionRepository;
import com.synopticProject.quizManager.repository.QuizRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static java.lang.String.format;

@Service
@Slf4j
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;
    private final QuizRepository quizRepository;
    private final QuestionFactory questionFactory;

    public QuestionServiceImpl(QuestionRepository questionRepository,
                               QuizRepository quizRepository,
                               QuestionFactory questionFactory) {
        this.questionRepository = questionRepository;
        this.quizRepository = quizRepository;
        this.questionFactory = questionFactory;
    }

    @Override
    public Optional<Question> getQuestionById(final Long id){
        final Optional<Question> question = questionRepository.findById(id);
        if(question.isEmpty()){
            throw new NullPointerException(format("No question found with id %s", id));
        }
        return question;
    }

    @Override
    public List<Question> getQuestionByQuizId(final Long id){
        final Optional<List<Question>> question = questionRepository.findByQuizId(id);
        return question.orElseThrow(() -> {
            throw new NullPointerException(format("No questions found for quiz id %s", id));
        });
    }

    @Override
    public List<Question> getAllQuestions(){
        final List<Question> questions = questionRepository.findAll(Sort.by("id"));
        if(questions.isEmpty()){
            throw new NullPointerException("No questions found");
        }
        return questions;
    }

    @Override
    public Long createQuestion(final String question, final Long quizId){
        if(!questionRepository.findByQuestionTitle(question).isEmpty()){
            throw new IllegalStateException(format("Question with the title %s already exists", question));
        }

        final Question questionToBeSaved = questionFactory.getInstance(question, quizId);
        final Long newQuestionId = questionRepository.save(questionToBeSaved).getId();
        return newQuestionId;
    }

    @Override
    public Question updateQuestion(final Long id, final String question, final Long quizId){
        final Optional<Question> questionToUpdate = questionRepository.findById(id);

        if(questionToUpdate.isEmpty()){
            throw new NullPointerException(format("No question found with id %s", id));
        }

        final Optional<Quiz> quiz = quizRepository.findById(quizId);
        if(quiz.isEmpty()){
            throw new NullPointerException(format("No quiz found with id %s", quizId));
        }

//        if(!questionRepository.findByTitleAndQuizId(question, quizId).isEmpty()){
//            throw new IllegalStateException(format("Question with the name %s already exists for this quiz", question));
//        }

        final Question questionToBeSaved = questionFactory.getInstance(id, question, quizId);

        return questionRepository.save(questionToBeSaved);
    }

    @Override
    public void deleteQuestion(final Long id){
        final Optional<Question> question = questionRepository.findById(id);

        if(question.isEmpty()){
            throw new NullPointerException(format("No question found with id %s", id));
        }

        questionRepository.deleteById(id);
    }
}
