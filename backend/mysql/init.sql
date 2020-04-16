USE foogle;

CREATE TABLE IF NOT EXISTS ingredients (
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

