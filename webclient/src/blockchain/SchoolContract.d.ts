declare module 'SchoolContract' {
    export interface Teacher {
        name: string;
        password: string;
    }

    export interface Student {
        name: string;
        password: string;
    }

    export interface Class {
        teachers: Teacher[];
        students: Student[];
    }

    export interface Election {
        name: string;
        keys: string[];
        electionResults: Record<string, number>;
    }

    export interface SchoolData {
        principal: string;
        class_names: string[];
        classes: Record<string, Class>;
        elections: Record<string, Election>;
    }

    export function createSchool(_name: string): void;
    export function logIn(
        username: string,
        password: string,
        _school_name: string
    ): [boolean, string];
    export function createClass(_name: string, _school_name: string): void;
    export function addTeacherToClass(
        _teacherName: string,
        _password: string,
        class_name: string,
        _school_name: string
    ): void;
    export function addStudentToClass(
        _studentName: string,
        _password: string,
        class_name: string,
        _school_name: string
    ): void;
    export function getClassDetails(
        class_name: string,
        _school_name: string
    ): [number, number];
    export function getAllClasses(_school_name: string): string[];
    export function createElection(
        _electionId: number,
        _name: string,
        _options: string[],
        _school_name: string
    ): void;
    export function getElectionName(
        electionID: number,
        _school_name: string
    ): string;
    export function vote(
        electionID: number,
        option: string,
        _school_name: string
    ): void;
    export function getWinner(
        electionID: number,
        _school_name: string
    ): [string, number];
}
