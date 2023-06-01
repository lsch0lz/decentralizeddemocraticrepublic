pragma solidity ^0.5.16;

contract School {
    
    struct Teacher {
        string name;
        uint256 id;
    }
    
    struct Student {
        string name;
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
    
    mapping(address => SchoolData) public schools;
    
    function createSchool(string memory _name) public {
        require(schools[msg.sender].principal == address(0), "School already exists");
        schools[msg.sender].name = _name;
        schools[msg.sender].principal = msg.sender;
    }
    
    function createClass(uint256 _classId, string memory _name) public {
        SchoolData storage school = schools[msg.sender];
        require(school.principal != address(0), "School does not exist");
        require(school.classes[_classId].teachers.length == 0, "Class already exists");
        school.classes[_classId].name = _name;
    }
    
    function addTeacherToClass(uint256 _classId, string memory _teacherName, uint256 _teacherId) public {
        SchoolData storage school = schools[msg.sender];
        require(school.principal != address(0), "School does not exist");
        require(school.classes[_classId].teachers.length > 0, "Class does not exist");
        school.classes[_classId].teachers.push(Teacher(_teacherName, _teacherId));
    }
    
    function addStudentToClass(uint256 _classId, string memory _studentName, uint256 _studentId) public {
        SchoolData storage school = schools[msg.sender];
        require(school.principal != address(0), "School does not exist");
        require(school.classes[_classId].teachers.length > 0, "Class does not exist");
        school.classes[_classId].students.push(Student(_studentName, _studentId));
    }
    
    function getSchoolName() public view returns (string memory) {
        return schools[msg.sender].name;
    }
    
    function getClassDetails(uint256 _classId) public view returns (string memory, uint256, uint256) {
        SchoolData storage school = schools[msg.sender];
        Class storage class = school.classes[_classId];
        return (class.name, class.teachers.length, class.students.length);
    }
}
