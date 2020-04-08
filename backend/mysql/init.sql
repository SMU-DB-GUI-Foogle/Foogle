CREATE TABLE IF NOT EXISTS `foogle`.`test_table` (
    `id` INT NOT NULL AUTO_INCREMENT, 
    `value` VARCHAR(45), 
    PRIMARY KEY (`id`), 
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);

INSERT INTO `foogle`.`test_table` (`value`) VALUES ('Sample Value');

CREATE IF NOT EXISTS USER 'user'@'%' IDENTIFIED BY 'password';

ALTER USER 'user'@'%' IDENTIFIED WITH MYSQL_NATIVE_PASSWORD BY 'password';


-- CREATE DATABASE IF NOT EXISTS Foogle_DB;
-- USE Foogle_DB;

USE foogle;

CREATE TABLE ingredients (
ingredientId int,
numberOfServings int,
recipeId int
);

CREATE TABLE IF NOT EXISTS foods (
foodId int PRIMARY KEY AUTO_INCREMENT,
foodName varchar(50),
foodGroupId int,
totalCalories int,
totalCaloriesFromFat int,
totalFat int,
transFat int,
saturatedFat int,
cholesterol int,
sodium int,
totalCarbohydrate int,
dietaryFat int,
sugars int,
protein int
);

CREATE TABLE IF NOT EXISTS foodGroups (
id int PRIMARY KEY AUTO_INCREMENT,
foodGroup varchar(50)
);

CREATE TABLE IF NOT EXISTS recipes (
recipeId int PRIMARY KEY AUTO_INCREMENT,
userId int
);

CREATE TABLE IF NOT EXISTS savedFoods (
userId int,
foodId int
);

CREATE TABLE IF NOT EXISTS users (
userId int PRIMARY KEY AUTO_INCREMENT,
firstName varchar(50),
lastName varchar(50),
emailAddress varchar(50),
username varchar(50),
password varchar(50),
isAdmin boolean
);

-- add code to initalize data


GRANT ALL PRIVILEGES ON foogle.* TO 'user'@'%';

FLUSH PRIVILEGES;