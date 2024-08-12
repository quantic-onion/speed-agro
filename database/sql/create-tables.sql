-- descargas
CREATE TABLE `speed_agro`.`descargas` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `DateAndTime` DATETIME NOT NULL ,
  `Millitm` INT NOT NULL ,
  `TagIndex` INT NOT NULL ,
  `Val` VARCHAR(255) NOT NULL ,
  `Status` VARCHAR(255) NOT NULL ,
  `Marker` VARCHAR(255) NOT NULL ,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- envasado
CREATE TABLE `speed_agro`.`envasado` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `DateAndTime` DATETIME NOT NULL ,
  `Millitm` INT NOT NULL ,
  `TagIndex` INT NOT NULL ,
  `Val` VARCHAR(255) NOT NULL ,
  `Status` VARCHAR(255) NOT NULL ,
  `Marker` VARCHAR(255) NOT NULL ,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- formulador
CREATE TABLE `speed_agro`.`formulador` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `DateAndTime` DATETIME NOT NULL ,
  `Millitm` INT NOT NULL ,
  `TagIndex` INT NOT NULL ,
  `Val` VARCHAR(255) NOT NULL ,
  `Status` VARCHAR(255) NOT NULL ,
  `Marker` VARCHAR(255) NOT NULL ,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- tags
CREATE TABLE `speed_agro`.`tags` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `TagName` VARCHAR(255) NOT NULL ,
  `TagIndex` INT NOT NULL ,
  `TagType` INT NOT NULL ,
  `TagDataType` INT NOT NULL ,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;