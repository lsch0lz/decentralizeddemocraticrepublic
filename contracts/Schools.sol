pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

contract School {

    struct Teacher {
        string name;
        string password;
    }

    struct Student {
        string name;
        string password;
    }

    struct Class {
        Teacher[] teachers;
        Student[] students;
    }

    struct SchoolData {
        address principal;
        string[] class_names; // keys for classes
        mapping(string => Class) classes;
        mapping(uint256 => Election) elections;
    }

    struct Election {
        string name;
        string[] keys;
        mapping(string => uint256) electionResults;
    }

    mapping(string => SchoolData) private schools;  // Mapping to store school data (Principal is owner)


    function isElementInArray(string memory target, string[] memory array) private pure returns (bool) {
        for (uint256 i = 0; i < array.length; i++) {
            if (keccak256(abi.encodePacked(array[i])) == keccak256(abi.encodePacked(target))) {
                return true;
            }
        }
        return false;
    }


    // SCHOOL
    function createSchool(string memory _name) public {
        // Check if school already exists ==> Nein, implizit nur eine Schule pro Adresse (Principal) erlaubt!
        require(schools[_name].principal == address(0), "This address already has a school assigned to it");
        // Set the caller's address as the principal
        schools[_name].principal = msg.sender;
    }

    function logIn(string memory username, string memory password, string memory _school_name) public view returns (bool, string memory){
        SchoolData storage school = schools[_school_name];
        require(school.principal != address(0), "School does not exist");
        for(uint i = 0; i < school.class_names.length; i++){
            Class storage class = school.classes[school.class_names[i]];
            for (uint j = 0; j < class.students.length; j++){
                if (keccak256(bytes(class.students[j].name)) == keccak256(bytes(username))) {
                    if (keccak256(bytes(class.students[j].password)) == keccak256(bytes(password))) return (true, "student");
                }
            }
            for (uint j = 0; j < class.teachers.length; j++){
                if (keccak256(bytes(class.teachers[j].name)) == keccak256(bytes(username))) {
                    if (keccak256(bytes(class.teachers[j].password)) == keccak256(bytes(password))) return (true, "teacher");
                }
            }
        }
        return (false, "");
    }


    // CLASS
    function createClass(string memory _name, string memory _school_name) public {
        SchoolData storage school = schools[_school_name];
        require(school.principal != address(0), "School does not exist");
        require(school.principal == msg.sender); // Principal function

        require(!isElementInArray(_name, school.class_names), "Class already exists");

        school.class_names.push(_name);
        // Set the class name
    }

    function addTeacherToClass(string memory _teacherName, string memory _password, string memory class_name, string memory _school_name) public {
        SchoolData storage school = schools[_school_name];
        require(school.principal != address(0), "School does not exist");
        require(school.principal == msg.sender); // Principal function
        // Check if the school exists

        require(isElementInArray(class_name, school.class_names), "Class does not exist");
        // Check if class exists
        Class storage class = school.classes[class_name];
        class.teachers.push(Teacher(_teacherName, _password));
        // Add teacher to the class
    }

    function addStudentToClass(string memory _studentName, string memory _password, string memory class_name, string memory _school_name) public {
        SchoolData storage school = schools[_school_name];
        require(school.principal != address(0), "School does not exist");
        // Check if the school exists
        require(isElementInArray(class_name, school.class_names), "Class does not exist");
        // Check if class exists
        school.classes[class_name].students.push(Student(_studentName, _password));
        // Add student to the class
    }

    function getClassDetails(string memory class_name, string memory _school_name) public view returns (uint256, uint256) {
        SchoolData storage school = schools[_school_name];
        Class storage class = school.classes[class_name];
        require(school.principal != address(0), "School does not exist");
        // Check if the school exists
        require(isElementInArray(class_name, school.class_names), "Class does not exist");
        // Check if class exists
        return (class.teachers.length, class.students.length);
        // Get the class details (name, number of teachers, number of students)
    }

    function getAllClasses(string memory _school_name) public view returns (string[] memory){
        SchoolData storage school = schools[_school_name];
        require(school.principal != address(0), "School does not exist");
        return school.class_names;
    }


    // ELECTION
    function createElection(uint256 _electionId, string memory _name, string[] memory _options, string memory _school_name) public {
        SchoolData storage school = schools[_school_name];
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

    function getElectionName(uint256 electionID, string memory _school_name) public view returns (string memory){
        SchoolData storage school = schools[_school_name];
        require(school.principal != address(0), "School does not exist");
        Election storage election = school.elections[electionID];
        return election.name;
    }

    function vote(uint256 electionID, string memory option, string memory _school_name) public {
        SchoolData storage school = schools[_school_name];
        require(school.principal != address(0), "School does not exist");
        Election storage election = school.elections[electionID];
        // TODO check if election exists
        // TODO check if option exists
        election.electionResults[option] += 1;
    }

    function getWinner(uint256 electionID, string memory _school_name) public view returns (string memory, uint256) {
        SchoolData storage school = schools[_school_name];
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
