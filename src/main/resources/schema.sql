
CREATE TABLE IF NOT EXISTS permissions (
    id                  INT             AUTO_INCREMENT PRIMARY KEY,
    permission          text            NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id                  INT             AUTO_INCREMENT PRIMARY KEY,
    username            text            NOT NULL,
    password            text            NOT NULL,
    permission_id       INT             NOT NULL,

    CONSTRAINT fk_permission_id
        FOREIGN KEY (permission_id) REFERENCES permissions(id)
);

CREATE TABLE IF NOT EXISTS quiz (
    id                  INT             AUTO_INCREMENT PRIMARY KEY,
    title               text            NOT NULL,
    created_datetime    TIMESTAMP
);

CREATE TABLE IF NOT EXISTS questions (
    id                  INT             AUTO_INCREMENT PRIMARY KEY NOT NULL,
    question_text       text            NOT NULL,
    quiz_id             INT,

    CONSTRAINT fk_quiz_id
        FOREIGN KEY (quiz_id) REFERENCES quiz(id)
            ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS answers (
    id                  INT             AUTO_INCREMENT PRIMARY KEY NOT NULL,
    answer_text         text            NOT NULL,
    question_id         INT,

    CONSTRAINT fk_question_id
        FOREIGN KEY (question_id) REFERENCES questions(id)
            ON DELETE CASCADE ON UPDATE NO ACTION
);
