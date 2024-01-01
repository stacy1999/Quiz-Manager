INSERT INTO permissions (permission) VALUES
('Edit'),
('View'),
('Restricted');

INSERT INTO users (username, password, permission_id) VALUES
('User1', 'password', 1),
('User2', 'password2', 2),
('User3', 'password3', 3);

INSERT INTO quiz (title, created_datetime) VALUES
('Animals', NOW());

INSERT INTO questions (question_text, quiz_id) VALUES
('Which is the tallest animal in the world?', 1),
('Which Animal has the longest lifeline?', 1),
('How many legs does an octopus have?', 1);

INSERT INTO answers (answer_text, question_id) VALUES
('Lion', 1),
('Elephant', 1),
('Bear', 1),
('Giraffe', 1),
('The arctic whale', 2),
('Ostrich', 2),
('Dog', 2),
('Koala', 2),
('2', 3),
('8', 3),
('10', 3),
('6', 3);
