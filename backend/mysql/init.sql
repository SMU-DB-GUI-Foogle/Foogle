CREATE TABLE IF NOT EXISTS `foogle`.`test_table` (
    `id` INT NOT NULL AUTO_INCREMENT, 
    `value` VARCHAR(45), 
    PRIMARY KEY (`id`), 
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);

INSERT INTO `foogle`.`test_table` (`value`) VALUES ('Sample Value');

CREATE IF NOT EXISTS USER 'user'@'%' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON foogle.* TO 'user'@'%';

ALTER USER 'user'@'%' IDENTIFIED WITH MYSQL_NATIVE_PASSWORD BY 'password';

FLUSH PRIVILEGES;