Create Database ims;
use ims;

CREATE TABLE userType (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userTypeName VARCHAR(50) NOT NULL,
  userTypeDescription text
);

CREATE TABLE user(
	id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    dob TIMESTAMP NOT NULL,
	userTypeId INTEGER,
    FOREIGN KEY (userTypeId) REFERENCES userType(Id) ON DELETE CASCADE
);

CREATE TABLE userCredentials(
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  email VARCHAR(50) NOT NULL,
  mobile BIGINT,
  password VARCHAR(255) NOT NULL,
  FOREIGN KEY (userId) REFERENCES user(Id) ON DELETE CASCADE
);

CREATE TABLE userAddresses(
	id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    addressLineOne VARCHAR(255) NOT NULL,
    addressLineTwo VARCHAR(255) NOT NULL,
    country VARCHAR (20) NOT NULL,
    state VARCHAR (20) NOT NULL,
    city VARCHAR (20) NOT NULL,
    postalCode VARCHAR (20) NOT NULL,
    FOREIGN KEY (userId) REFERENCES user(Id) ON DELETE CASCADE
);

CREATE TABLE userEducationDetails(
	id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    educationTitle VARCHAR (20) NOT NULL,
    description VARCHAR (255) NOT NULL,
    passingYear TEXT,
    FOREIGN KEY (userId) REFERENCES user(Id) ON DELETE CASCADE
);

CREATE TABLE roles(
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (20) NOT NULL,
    description VARCHAR (255) NOT NULL
);

CREATE TABLE userRoleMapper(
	id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    roleId INT,
    FOREIGN KEY (userId) REFERENCES user(Id) ON DELETE CASCADE,
    FOREIGN KEY (roleId) REFERENCES roles(Id) ON DELETE CASCADE
);

CREATE TABLE features (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR (20) NOT NULL,
    description VARCHAR (255) NOT NULL
);

CREATE TABLE featureRoleMapping(
	id INT AUTO_INCREMENT PRIMARY KEY,
    featureId INT,
    roleId INT,
	FOREIGN KEY (featureId) REFERENCES features(Id) ON DELETE CASCADE,
    FOREIGN KEY (roleId) REFERENCES roles(Id) ON DELETE CASCADE
);

CREATE TABLE activityTypes(
	id INT AUTO_INCREMENT PRIMARY KEY,
    typeName VARCHAR (50) NOT NULL
);

CREATE TABLE activityStatus(
	id INT AUTO_INCREMENT PRIMARY KEY,
    statusName VARCHAR (20) NOT NULL
);

CREATE TABLE activities(
	id INT AUTO_INCREMENT PRIMARY KEY,
	activityTypeId INT,
	activityStatusId INT,
	dueDate DATETIME,
	salesRepresentativeId INT,
	summary VARCHAR(255) NOT NULL,
	FOREIGN KEY ( activityTypeId ) REFERENCES activityTypes(Id) ON DELETE CASCADE,
	FOREIGN KEY ( activityStatusId ) REFERENCES activityStatus(Id) ON DELETE CASCADE,
	FOREIGN KEY ( salesRepresentativeId ) REFERENCES user(Id) ON DELETE CASCADE
);

CREATE TABLE pipeLinePhases (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    phaseName VARCHAR(100) NOT NULL
);

CREATE TABLE courseTypes(
	Id INT AUTO_INCREMENT PRIMARY KEY,
	typeName VARCHAR(30),
	description text
);
    
CREATE TABLE courses (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    courseName TEXT NOT NULL,
    description TEXT,
    courseFees DOUBLE,
    courseDuration INT, 
    courseTypeId VARCHAR(50)
);

CREATE TABLE enquiries (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT,
    email VARCHAR(50),
    mobileNo BIGINT,
    enquirySource TEXT,
    courseId INT,
    pipeLinePhaseId INT,
    salesPersonId INT,
    FOREIGN KEY (courseId) REFERENCES activityTypes(Id) ON DELETE CASCADE,
    FOREIGN KEY (pipeLinePhaseId) REFERENCES pipeLinePhases(Id) ON DELETE SET NULL,
    FOREIGN KEY (salesPersonId) REFERENCES user(Id) ON DELETE SET NULL
);

CREATE TABLE communicationLog (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    enquiryId INT,
    customerId INT,
    activityId INT,
    activityStatusId INT,
    salesRepresentativeId INT,
    communicationDate DATETIME,
    communicationDetails TEXT,
    
    FOREIGN KEY (CustomerId) REFERENCES user(Id) ON DELETE SET NULL,
    FOREIGN KEY (ActivityId) REFERENCES activities(Id) ON DELETE SET NULL,
    FOREIGN KEY (ActivityStatusId) REFERENCES activityStatus(Id) ON DELETE SET NULL,
    FOREIGN KEY (SalesRepresentativeId) REFERENCES user(Id) ON DELETE SET NULL
);

CREATE  TABLE subjects(
	Id INT AUTO_INCREMENT PRIMARY KEY,
    subjectName TEXT,
    description TEXT
);

CREATE TABLE courseSubjectMapping(
	Id INT AUTO_INCREMENT PRIMARY KEY,
    courseId INT,
    subjectId INT
);

CREATE TABLE syllabus(
	Id INT AUTO_INCREMENT PRIMARY KEY,
    subjectId INT,
    sectionName VARCHAR (20),
    topicName VARCHAR (20),
    courseTypeId INT
);
ALTER TABLE syllabus MODIFY topicName VARCHAR(100);

CREATE TABLE admissions (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    enquiryId INT NOT NULL,
    admissionDate DATE,
    description TEXT,
    status ENUM('completed', 'ongoing'),
    FOREIGN KEY (EnquiryId) REFERENCES enquiries(Id) ON DELETE CASCADE
);

CREATE TABLE feePayments(
	Id INT AUTO_INCREMENT PRIMARY KEY,
    admissionId INT NOT NULL,
    amountCredited DOUBLE NOT NULL,
    balanceAmount DOUBLE NOT NULL,
    paymentDate DATETIME NOT NULL,
    paymentMethod ENUM('online', 'cash', 'UPI', 'card') NOT NULL,
    nextDueDate DATETIME,
    FOREIGN KEY (AdmissionId) REFERENCES Admissions(Id) ON DELETE CASCADE
); 
