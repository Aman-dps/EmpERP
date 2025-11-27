CREATE DATABASE `emperp`;
USE `emperp`;

-- create table employee
CREATE TABLE `employee` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `employee_id` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `photograph_path` varchar(1024) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `department_id` bigint(20) NOT NULL
);

-- create sequence table for employee
CREATE TABLE `employee_seq` (
  `next_val` bigint(20) DEFAULT NULL
);

-- create table department
CREATE TABLE `department` (
  `department_id` bigint(20) NOT NULL,
  `capacity` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
);

-- create sequence table for department
CREATE TABLE `department_seq` (
  `next_val` bigint(20) DEFAULT NULL
);

-- create table employee_salary
CREATE TABLE `employee_salary` (
  `id` bigint(20) NOT NULL,
  `amount` double NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `payment_date` date NOT NULL,
  `employee_id` bigint(20) NOT NULL
);

-- create sequence table for employee_salary
CREATE TABLE `employee_salary_seq` (
  `next_val` bigint(20) DEFAULT NULL
);

-- create table user_account
CREATE TABLE `user_account` (
  `id` bigint(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL
);

-- create sequence table for user_account
CREATE TABLE `user_account_seq` (
  `next_val` bigint(20) DEFAULT NULL
);

-- set initial value of sequence
INSERT INTO `user_account_seq` (`next_val`) VALUES (1);
