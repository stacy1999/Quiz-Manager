package com.synopticProject.quizManager.service;
import com.synopticProject.quizManager.factory.QuizFactory;
import com.synopticProject.quizManager.model.Quiz;
import com.synopticProject.quizManager.repository.QuizRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static java.lang.String.format;

@Service
@Slf4j
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;
    private final QuizFactory quizFactory;

    public QuizServiceImpl(QuizRepository quizRepository, QuizFactory quizFactory) {
        this.quizRepository = quizRepository;
        this.quizFactory = quizFactory;
    }

    @Override
    public Quiz getQuiz(final Long id) throws NullPointerException{
        final Optional<Quiz> quiz = quizRepository.findById(id);
        return quiz.orElseThrow(() -> {
            throw new NullPointerException(format("No quiz found with id %s", id));
        });
    }

    @Override
    public List<Quiz> getAllQuizzes() throws NullPointerException{
        final List<Quiz> quizList = quizRepository.findAll(Sort.by("id"));
        if (quizList.isEmpty()){
            throw new NullPointerException("No quizzes found");
        }
        return quizList;
    }

    @Override
    public Long createQuiz(final String title) throws IllegalStateException{
       if(!quizRepository.findByTitle(title).isEmpty()){
           throw new IllegalStateException(format("Quiz with the name %s already exists", title));
       }

       final Quiz quizToBeSaved = quizFactory.getInstance(title);
       final Long newQuizId = quizRepository.save(quizToBeSaved).getId();
       return newQuizId;
    }

    @Override
    public Quiz updateQuiz(final Long id, final String title) throws IllegalStateException{
        final Optional<Quiz> quiz = quizRepository.findById(id);
        if(quiz.isEmpty()){
            throw new NullPointerException(format("No quiz found with id %s", id));
        }

        final Quiz quizToUpdate = quiz.get();

        if(!quizRepository.findByTitle(title).isEmpty()){
            throw new IllegalStateException(format("Quiz with the name %s already exists", title));
        }

        final Quiz quizToBeSaved = quizFactory.getInstance(title, quizToUpdate.getCreatedDatetime(), quizToUpdate.getId());

        return quizRepository.save(quizToBeSaved);
    }

    @Override
    public void deleteQuiz(final Long id){
        final Optional<Quiz> quiz = quizRepository.findById(id);

        if(quiz.isEmpty()){
            throw new NullPointerException(format("No quiz found with id %s", id));
        }

        quizRepository.deleteById(id);
    }
}
