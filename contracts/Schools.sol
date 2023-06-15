pragma solidity ^0.5.16;
// pragma experimental ABIEncoderV2;

contract School {

    struct Teacher {
        string name;
        uint256 id;
    }

    struct Student {
        string name;
        string password;
        uint256 id;
    }

    struct Class {
        string name;
        Teacher[] teachers;
        Student[] students;
    }

    struct SchoolData {
        string name;
        address principal;
        mapping(uint256 => Class) classes;
    }

    struct Election {
        string name;
        uint voteCount;
    }

    Election[] public elections;
    //mapping(uint => Election) public elections;

    mapping(address => SchoolData) public schools;  // Mapping to store school data (Principal is owner)


    // CREATE
    function createSchool(string memory _name) public {
        // Check if school already exists ==> Nein, implizit nur eine Schule pro Adresse (Principal) erlaubt!
        require(schools[msg.sender].principal == address(0), "This address already has a school assigned to it");
        // Set the school's name
        schools[msg.sender].name = _name;  
        // Set the caller's address as the principal
        schools[msg.sender].principal = msg.sender;
    }

    function createClass(uint256 _classId, string memory _name) public {
        SchoolData storage school = schools[msg.sender];
        require(school.principal != address(0), "School does not exist");
        // Check if the school exists
        require(school.classes[_classId].teachers.length == 0, "Class already exists");
        // Check if class already exists
        school.classes[_classId].name = _name;
        // Set the class name
    }

    function addTeacherToClass(uint256 _classId, string memory _teacherName, uint256 _teacherId) public {
        SchoolData storage school = schools[msg.sender];
        require(school.principal != address(0), "School does not exist");
        // Check if the school exists
        require(school.classes[_classId].teachers.length > 0, "Class does not exist");
        // Check if class exists
        school.classes[_classId].teachers.push(Teacher(_teacherName, _teacherId));
        // Add teacher to the class
    }

    function addStudentToClass(uint256 _classId, string memory _studentName, uint256 _studentId, string memory _password) public {
        SchoolData storage school = schools[msg.sender];
        require(school.principal != address(0), "School does not exist");
        // Check if the school exists
        require(school.classes[_classId].teachers.length > 0, "Class does not exist");
        // Check if class exists
        school.classes[_classId].students.push(Student(_studentName, _password, _studentId));
        // Add student to the class
    }


    // READ
    function getSchoolName() public view returns (string memory) {
        return schools[msg.sender].name;
        // Get the name of the school
    }

    function getClassDetails(uint256 _classId) public view returns (string memory, uint256, uint256) {
        SchoolData storage school = schools[msg.sender];
        Class storage class = school.classes[_classId];
        return (class.name, class.teachers.length, class.students.length);
        // Get the class details (name, number of teachers, number of students)
    }

    function createElection(string calldata electionName) external {
        Election memory election = Election(electionName, 0);
        elections.push(election);
        // elections[1] = Election(electionName, electionOptions, 0);
    }

    function vote(uint electionID) public {
        Election storage election = elections[0];
        election.voteCount += 1;
    }


    function getVotes(uint electionID) public view returns (uint) {
        Election storage election = elections[1];
        return election.voteCount;
    }
}