pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2; // Enable string[]

contract School {
    struct Teacher {
        string name;
    }

    struct Student {
        string name;
        string password;
        uint256 id;
    }

    struct Class {
        mapping(uint256 => Teacher) teachers;
        uint256 teacherCount;
        mapping(uint256 => Student) students;
        uint256 studentsCount;
    }

    struct SchoolData {
        string name;
        address principal;
        mapping(bytes32 => Class) classes;
        bytes32[] classesKeys;
    }

    mapping(address => SchoolData) public schools;

    function createSchool(string memory _name) public {
        require(
            schools[msg.sender].principal == address(0),
            "This address already has a school assigned to it"
        );
        schools[msg.sender].name = _name;
        schools[msg.sender].principal = msg.sender;
    }

    function createClass(string memory _name) public {
        SchoolData storage school = schools[msg.sender];
        require(school.principal != address(0), "School does not exist");
        require(
            school.classes[keccak256(bytes(_name))].teacherCount == 0,
            "Class already exists"
        );
        Class memory emptyClass;
        school.classes[keccak256(bytes(_name))] = emptyClass;
        school.classesKeys.push(keccak256(bytes(_name)));
    }

    function addTeacherToClass(
        string memory _teacherName,
        string memory _class_name
    ) public {
        SchoolData storage school = schools[msg.sender];
        require(school.principal != address(0), "School does not exist");
        require(
            school.classes[keccak256(bytes(_class_name))].teacherCount == 0,
            "Class does not exist"
        );
        Class storage class = school.classes[keccak256(bytes(_class_name))];
        class.teachers[class.teacherCount] = Teacher(_teacherName);
        class.teacherCount++;
    }

    function addStudentToClass(
        string memory _class_name,
        string memory _studentName,
        uint256 _studentId,
        string memory _password
    ) public {
        SchoolData storage school = schools[msg.sender];
        require(school.principal != address(0), "School does not exist");
        require(
            school.classes[keccak256(bytes(_class_name))].teacherCount != 0,
            "Class does not exist"
        );
        Class storage class = school.classes[keccak256(bytes(_class_name))];
        class.students[class.studentsCount] = Student(
            _studentName,
            _password,
            _studentId
        );
        class.studentsCount++;
    }

    function getSchoolName() public view returns (string memory) {
        return schools[msg.sender].name;
    }

    function getClassDetails(string memory _class_name)
    public
    view
    returns (uint256, uint256)
    {
        SchoolData storage school = schools[msg.sender];
        Class storage class = school.classes[keccak256(bytes(_class_name))];
        return (class.teacherCount, class.studentsCount);
    }

    function getAllClasses() public view returns (string[] memory) {
        SchoolData storage school = schools[msg.sender];
        bytes32[] storage classKeys = school.classesKeys;
        string[] memory classNames = new string[](classKeys.length);

        for (uint256 i = 0; i < classKeys.length; i++) {
            classNames[i] = bytes32ToString(classKeys[i]);
        }

        return classNames;
    }

    function bytes32ToString(bytes32 _bytes32)
    private
    pure
    returns (string memory)
    {
        uint256 length = 0;
        while (length < 32 && _bytes32[length] != 0) {
            length++;
        }
        bytes memory bytesArray = new bytes(length);
        for (uint256 i = 0; i < length; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
    }
}


//
//pragma solidity ^0.5.16;
//pragma experimental ABIEncoderV2; // Enable string[]
//
//contract School {
//
//    struct Teacher {
//        string name;
//    }
//
//    struct Student {
//        string name;
//        string password;
//        uint256 id;
//    }
//
//    struct Class {
//        mapping(uint256 => Teacher) teachers;
//        uint256 teacherCount;
//        // Student[] students; does not work: UnimplementedFeatureError: Copying of type struct School.Student memory[] memory to storage not yet supported.
//        mapping(uint256 => Student) students;
//        uint256 studentsCount;
//    }
//
//    struct SchoolData {
//        string name;
//        address principal;
//
//
//        mapping(bytes32 => Class) classes;
//        // It is not trivial to retrieve the keys. Workaround: Store them for easy access
//        bytes32[] classesKeys;
//    }
//
//    mapping(address => SchoolData) public schools;  // Mapping to store school data (Principal is owner)
//
//
//    // CREATE
//    function createSchool(string memory _name) public {
//        require(schools[msg.sender].principal == address(0), "This address already has a school assigned to it");  // Check if school already exists ==> Nein, implizit nur eine Schule pro Adresse (Principal) erlaubt!
//        schools[msg.sender].name = _name;  // Set the school's name
//        schools[msg.sender].principal = msg.sender;  // Set the caller's address as the principal
//    }
//
//    function createClass(string memory _name) public {
//        SchoolData storage school = schools[msg.sender];
//        require(school.principal != address(0), "School does not exist");  // Check if the school exists
//        require(school.classes[keccak256(bytes(_name))].teacherCount == 0, "Class already exists");  // Check if class already exists
//
//        // Create empty class:
//        Class memory emptyClass;
//        school.classes[keccak256(bytes(_name))] = emptyClass;
//        school.classesKeys.push(keccak256(bytes(_name)));
//    }
//
//    function addTeacherToClass(string memory _teacherName, string memory _class_name) public {
//        SchoolData storage school = schools[msg.sender];
//        require(school.principal != address(0), "School does not exist");  // Check if the school exists
//        require(school.classes[keccak256(bytes(_class_name))].teacherCount == 0, "Class does not exist");  // Check if class exists
//
//        // TODO Test if name is unique
//        Class storage class = school.classes[keccak256(bytes(_class_name))];
//        class.teachers[class.teacherCount] = Teacher(_teacherName);
//        class.teacherCount++;
//    }
//
//    function addStudentToClass(string memory _class_name, string memory _studentName, uint256 _studentId, string memory _password) public {
//        SchoolData storage school = schools[msg.sender];
//        require(school.principal != address(0), "School does not exist");  // Check if the school exists
//        require(school.classes[keccak256(bytes(_class_name))].teacherCount == 0, "Class does not exist");  // Check if class exists
//
//        Class storage class = school.classes[keccak256(bytes(_class_name))];
//        class.students[class.studentsCount] = Student(_studentName, _password, _studentId);
//        class.studentsCount++;
//    }
//
//
//    // READ
//    function getSchoolName() public view returns (string memory) {
//        return schools[msg.sender].name;  // Get the name of the school
//    }
//
//    function getClassDetails(string memory _class_name) public view returns (uint256, uint256) {
//        SchoolData storage school = schools[msg.sender];
//        Class storage class = school.classes[keccak256(bytes(_class_name))];
//        return (class.teacherCount, class.studentsCount);  // Get the class details (number of teachers, number of students)
//    }
//
////    function getAllClasses() public view returns (string[] memory){
////        SchoolData storage school = schools[msg.sender];
////
////        return school.classesKeys;
////    }
//
//    function getAllClasses() public view returns (string[] memory) {
//        SchoolData storage school = schools[msg.sender];
//        bytes32[] storage classKeys = school.classesKeys;
//        string[] memory classNames = new string[](classKeys.length);
//
//        for (uint256 i = 0; i < classKeys.length; i++) {
//            classNames[i] = bytes32ToString(classKeys[i]);
//        }
//
//        return classNames;
//    }
//
//    function bytes32ToString(bytes32 _bytes32) private pure returns (string memory) {
//        uint256 length = 0;
//        while (length < 32 && _bytes32[length] != 0) {
//            length++;
//        }
//        bytes memory bytesArray = new bytes(length);
//        for (uint256 i = 0; i < length; i++) {
//            bytesArray[i] = _bytes32[i];
//        }
//        return string(bytesArray);
//    }
//
//
//    function log_in(string memory _studentName, string memory _password) public view returns (bool) {
//        SchoolData storage school = schools[msg.sender];
//        uint256 classCount = school.classesKeys.length;
//        // TODO!!!
//
////        for (uint256 i = 0; i < classCount; i++) {
////            Student[] storage students = school.classes[school.classesKeys[i]].students;
////            for (uint256 j = 0; j < students.length; j++) {
////                if (
////                    keccak256(bytes(students[j].name)) == keccak256(bytes(_studentName)) &&
////                    keccak256(bytes(students[j].password)) == keccak256(bytes(_password))
////                ) {
////                    return true;  // Found the student
////                }
////            }
////        }
//
//        return false;  // Student not found
//    }
//}
