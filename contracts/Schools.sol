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

    function log_in(string memory _name, string memory _password) public view returns (bool, string memory) {
        SchoolData storage school = schools[msg.sender];

        uint256[] memory classIds = getClassIds(school);
        for (uint256 i = 0; i < classIds.length; i++) {
            uint256 classId = classIds[i];
            Class storage class = school.classes[classId];

            for (uint256 j = 0; j < class.students.length; j++) {
                Student storage student = class.students[j];

                if (keccak256(abi.encodePacked(student.name)) == keccak256(abi.encodePacked(_name)) && keccak256(abi.encodePacked(student.password)) == keccak256(abi.encodePacked(_password))) {
                    return (true, student.role);
                }
            }
        }

        return (false, "");  // Entry does not exist
    }

    function getClassIds(SchoolData storage _school) internal view returns (uint256[] memory) {
        uint256[] memory classIds = new uint256[](256);
        uint256 count = 0;

        for (uint256 i = 0; i < 256; i++) {
            if (_school.classes[i].teachers.length > 0) {
                classIds[count] = i;
                count++;
            }
        }

        assembly {
            mstore(classIds, count)
        }

        return classIds;
    }
}
