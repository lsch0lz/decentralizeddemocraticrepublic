pragma solidity ^0.5.16;

contract School {

    struct Teacher {
        string name;
        uint256 id;
        string role;  // New field for teacher role
    }

    struct Student {
        string name;
        string password;
        uint256 id;
        string role;  // New field for student role
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

    mapping(address => SchoolData) public schools;  // Mapping to store school data (Principal is owner)

    function createSchool(string memory _name) public {
        require(schools[msg.sender].principal == address(0), "School already exists");  // Check if school already exists
        schools[msg.sender].name = _name;  // Set the school's name
        schools[msg.sender].principal = msg.sender;  // Set the caller's address as the principal
    }

    function createClass(uint256 _classId, string memory _name) public {
        SchoolData storage school = schools[msg.sender];
        require(school.principal != address(0), "School does not exist");  // Check if the school exists
        require(school.classes[_classId].teachers.length == 0, "Class already exists");  // Check if class already exists
        school.classes[_classId].name = _name;  // Set the class name
    }

    function addTeacherToClass(uint256 _classId, string memory _teacherName, uint256 _teacherId) public {
        SchoolData storage school = schools[msg.sender];
        require(school.principal != address(0), "School does not exist");  // Check if the school exists
        require(school.classes[_classId].teachers.length > 0, "Class does not exist");  // Check if class exists
        school.classes[_classId].teachers.push(Teacher(_teacherName, _teacherId, "teacher"));  // Add teacher to the class with role "teacher"
    }

    function addStudentToClass(uint256 _classId, string memory _studentName, uint256 _studentId, string memory _password) public {
        SchoolData storage school = schools[msg.sender];
        require(school.principal != address(0), "School does not exist");  // Check if the school exists
        require(school.classes[_classId].teachers.length > 0, "Class does not exist");  // Check if class exists
        school.classes[_classId].students.push(Student(_studentName, _password, _studentId, "student"));  // Add student to the class with role "student"
    }

    function getSchoolName() public view returns (string memory) {
        return schools[msg.sender].name;  // Get the name of the school
    }

    function getClassDetails(uint256 _classId) public view returns (string memory, uint256, uint256) {
        SchoolData storage school = schools[msg.sender];
        Class storage class = school.classes[_classId];
        return (class.name, class.teachers.length, class.students.length);  // Get the class details (name, number of teachers, number of students)
    }

    function log_in(string memory _studentName, string memory _password) public view returns (bool) {
        SchoolData storage school = schools[msg.sender];
        uint256 classCount = 0;
        for (uint256 i = 0; i < 1000000; i++) { // Assuming the maximum number of classes is 1,000,000
            if (school.classes[i].teachers.length > 0) {
                classCount++;
            } else {
                break;
            }
        }

        for (uint256 i = 0; i < classCount; i++) {
            Student[] storage students = school.classes[i].students;
            for (uint256 j = 0; j < students.length; j++) {
                if (
                    keccak256(bytes(students[j].name)) == keccak256(bytes(_studentName)) &&
                    keccak256(bytes(students[j].password)) == keccak256(bytes(_password))
                ) {
                    return true;  // Found the student
                }
            }
        }

        return false;  // Student not found
    }
}
