pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

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
        // Election[] public elections;
        mapping(uint256 => Election) elections; //TODO evaluate if this is indeed the right data structure
    }

    struct Election {
        string name;
        string[] keys;
        mapping(string => uint256) electionResults;
    }



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
//
//    function getAllClassNames() public view returns (bytes32[] memory) {
//        SchoolData storage school = schools[msg.sender];
//        uint256 classCount = 0;
//        for (uint256 i = 0; i < 1000000; i++) { // Assuming the maximum number of classes is 1,000,000
//            if (school.classes[i].teachers.length > 0) {
//                classCount++;
//            } else {
//                break;
//            }
//        }
//
//        bytes32[] memory classNames = new bytes32[](classCount);
//        for (uint256 i = 0; i < classCount; i++) {
//            classNames[i] = stringToBytes32(school.classes[i].name);
//        }
//
//        return classNames;
//    }
//
//    function stringToBytes32(string memory source) public pure returns (bytes32 result) {
//        bytes memory tempEmptyStringTest = bytes(source);
//        if (tempEmptyStringTest.length == 0) {
//            return 0x0;
//        }
//
//        assembly {
//            result := mload(add(source, 32))
//        }
//    }


    function createElection(uint256 _electionId, string memory _name, string[] memory _options) public {
        SchoolData storage school = schools[msg.sender];
        require(school.principal != address(0), "School does not exist");
        // Check if the school exists
        Election storage election = school.elections[_electionId];
        // TODO check if election exists
        election.name = _name;
        election.keys = _options;
        // add options to election
        for (uint i=0; i< _options.length; i++){
            election.electionResults[_options[i]] = 0;
        }
    }

    function getElectionName(uint256 electionID) public view returns (string memory){
        SchoolData storage school = schools[msg.sender];
        require(school.principal != address(0), "School does not exist");
        Election storage election = school.elections[electionID];
        return election.name;
    }

    function vote(uint256 electionID, string memory option) public {
        SchoolData storage school = schools[msg.sender];
        require(school.principal != address(0), "School does not exist");
        Election storage election = school.elections[electionID];
        // TODO check if election exists
        // TODO check if option exists
        election.electionResults[option] += 1;
    }


    function getWinner(uint256 electionID) public view returns (string memory, uint256) {
        SchoolData storage school = schools[msg.sender];
        Election storage election = school.elections[electionID];
        uint256 maxResult = 0;
        string memory maxKey;

        // Iterate over the mapping
        for (uint256 i_key = 0; i_key < election.keys.length; i_key++) {
            string memory key = election.keys[i_key];
            uint256 value = election.electionResults[key];

            if (value > maxResult) {
                maxResult = value;
                maxKey = key;
            }
        }

        require(maxResult > 0, "All values are zero");

        return (maxKey, maxResult);
    }

}
