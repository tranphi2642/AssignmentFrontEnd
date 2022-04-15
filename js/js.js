// khởi tạo angular và route
var app = angular.module("myapp", ["ngRoute"]);
//cấu hình fire base
const firebaseConfig = {
    apiKey: "AIzaSyD7TSSM7MuJQeandGGC24vjWSZmJH7Kvd8",
    authDomain: "asmweb-c281e.firebaseapp.com",
    databaseURL: "https://web207-c7964-default-rtdb.firebaseio.com/",
    projectId: "asmweb-c281e",
    storageBucket: "asmweb-c281e.appspot.com",
    messagingSenderId: "628011851931",
    appId: "1:628011851931:web:c6c71b6e103b43decaa63e",
    measurementId: "G-KCGLGJ5BD8"
};
firebase.initializeApp(firebaseConfig);
// khỏi tạo database
var database = firebase.database();

app.controller("myctrl", function($scope) {

    $scope.check = sessionStorage.getItem("check");
    console.log($scope.check)

    if (sessionStorage.getItem("username") != null) {
        $scope.user = sessionStorage.getItem("username");
        $scope.pass = sessionStorage.getItem("password");
        $scope.fullname = sessionStorage.getItem("fullname");
        $scope.email = sessionStorage.getItem("email");
        $scope.gender = sessionStorage.getItem("gender");
        $scope.birthday = sessionStorage.getItem("birthday");
        $scope.schoolfree = sessionStorage.getItem("schoolfree");
        $scope.mark = sessionStorage.getItem("mark");
        $scope.images = sessionStorage.getItem("img");
        $scope.keyID = sessionStorage.getItem("user");
    }

    $scope.checkLogin = function() {
        if (!$scope.check) {
            alert("Bạn cần phải đăng nhập");
            document.location = "index.html";
        }
    };

    $scope.logout = function() {
        alert("Bạn đã đăng xuất");
        sessionStorage.clear();
        document.location = "index.html";
    };

})

app.controller('signUp', function($scope) {
    $scope.list = [];
    var user = $scope.username;
    var listUsers = firebase.database().ref("User");

    listUsers.on("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
        });
        $scope.list = snapshot.val();
    })

    $scope.signUp = function() {
        for (var i = 0; i < Object.keys($scope.list).length; i++) {
            var key = Object.keys($scope.list)[i];
            if ($scope.list[key].username == user) {
                console.log($scope.list[key].username == user);
                alert("Tài khoản đã tồn tại");
                break;
            } else {
                var objUser = {
                    username: $scope.username,
                    password: $scope.password,
                    fullname: $scope.fullname,
                    email: $scope.email,
                    gender: $scope.gender,
                    birthday: $scope.birthday,
                    schoolfree: $scope.schoolfree,
                    mark: $scope.mark,
                    img: "img_avatar2.png"
                };
                var refUser = database.ref("User");
                refUser.push(objUser);
                alert("Đăng ký tài khoản thành công");
                document.location = "#!signin";
                break
            }
        }
    }
})

app.controller("login", function($scope) {
    $scope.list = [];
    var listUsers = firebase.database().ref("User");
    listUsers.on("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            // console.log(childKey, childData)
        });
        $scope.list = snapshot.val();
        // console.log($scope.list)
    })

    $scope.login = function() {
        var user = $scope.username;
        var pass = $scope.password;
        var check = false;
        for (var i = 0; i < Object.keys($scope.list).length; i++) {
            var key = Object.keys($scope.list)[i];
            if ($scope.list[key].username == user && $scope.list[key].password == pass) {
                $scope.keyID = key;
                check = true;
                break;
            }
        }
        if (check) {
            alert("Đăng nhập thành công");
            sessionStorage.setItem('user', $scope.keyID);
            sessionStorage.setItem("username", $scope.list[$scope.keyID].username);
            sessionStorage.setItem("password", $scope.list[$scope.keyID].password);
            sessionStorage.setItem("email", $scope.list[$scope.keyID].email);
            sessionStorage.setItem("fullname", $scope.list[$scope.keyID].fullname);
            sessionStorage.setItem("gender", $scope.list[$scope.keyID].gender);
            sessionStorage.setItem("birthday", $scope.list[$scope.keyID].birthday);
            sessionStorage.setItem("schoolfree", $scope.list[$scope.keyID].schoolfree);
            sessionStorage.setItem("mark", $scope.list[$scope.keyID].mark);
            sessionStorage.setItem("img", $scope.list[$scope.keyID].img);
            sessionStorage.setItem("check", check);
            document.location = "index.html";
        } else {
            alert("Tài khoản hoặc mật khẩu không đúng!");
            $scope.username = "";
            $scope.password = "";
        }
    }
});

app.controller('forgotPass', function($scope) {
    checkForgot = false;
    $scope.list = [];
    var listUsers = firebase.database().ref("User");

    listUsers.on("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
        });
        $scope.list = snapshot.val();
    })

    $scope.send = function() {
        for (var i = 0; i < Object.keys($scope.list).length; i++) {
            var key = Object.keys($scope.list)[i];
            if ($scope.list[key].username == $scope.username && $scope.list[key].email == $scope.email) {
                $scope.passForgot = $scope.list[key].password;
                checkForgot = true;
                break;
            }
        }

        if (checkForgot) {
            $scope.chuyentiep = function() {
                document.location = '#!signin';
            }
        } else {
            alert("Tên tài khoản và email không có trong dữ liệu!");
        }
    }
})

app.controller('changePass', function($scope) {
    checkChange = false;
    $scope.list = [];
    $scope.keyID = sessionStorage.getItem("user")
    var listUsers = firebase.database().ref("User");

    listUsers.on("value", (snapshot) => {
        $scope.list = snapshot.val();
    })

    $scope.changePass = function() {
        for (var i = 0; i < Object.keys($scope.list).length; i++) {
            if (Object.keys($scope.list)[i] == $scope.keyID) {
                console.log($scope.username, $scope.list[$scope.keyID].username)
                console.log($scope.password, $scope.list[$scope.keyID].password)
                if ($scope.username == $scope.list[$scope.keyID].username && $scope.password == $scope.list[$scope.keyID].password) {
                    if ($scope.newpass == $scope.confirmpass) {
                        var objUser = {
                            username: $scope.list[$scope.keyID].username,
                            password: $scope.newpass,
                            fullname: $scope.list[$scope.keyID].fullname,
                            email: $scope.list[$scope.keyID].email,
                            gender: $scope.list[$scope.keyID].gender,
                            birthday: $scope.list[$scope.keyID].birthday,
                            schoolfree: $scope.list[$scope.keyID].schoolfree,
                            mark: $scope.list[$scope.keyID].mark,
                            img: $scope.list[$scope.keyID].img
                        };
                        var refUser = database.ref("User/" + $scope.keyID);
                        refUser.update(objUser);
                        sessionStorage.setItem('password', $scope.newpass);
                        checkChange = true;
                        break;
                    } else {
                        alert("Mật khẩu mới nhập lại không trùng khớp!")
                        checkChange = false;
                        break;
                    }
                } else {
                    alert("Tên tài khoản và mật khẩu không trùng khớp!");
                    checkChange = false;
                    break;
                }
            }
        }

        if (checkChange) {
            alert("Đổi mật khẩu thành công");
            document.location = "#!profile";
        } else {
            alert("Đổi mật khẩu thất bại!");
        }
    }
})

app.controller('editProfile', function($scope) {
    $scope.username = sessionStorage.getItem("username");
    $scope.password = sessionStorage.getItem("password");
    schoolfree = sessionStorage.getItem("schoolfree");
    $scope.schoolfree = Number(schoolfree);
    mark = sessionStorage.getItem("mark");
    $scope.mark = Number(mark);

    checkEdit = false;
    $scope.list = [];
    $scope.keyID = sessionStorage.getItem("user")
    var listUsers = firebase.database().ref("User");

    listUsers.on("value", (snapshot) => {
        $scope.list = snapshot.val();
    })
    $scope.update = function() {
        for (var i = 0; i < Object.keys($scope.list).length; i++) {
            if (Object.keys($scope.list)[i] == $scope.keyID) {
                var objUser = {
                    username: $scope.list[$scope.keyID].username,
                    password: $scope.list[$scope.keyID].password,
                    fullname: $scope.fullname,
                    email: $scope.email,
                    gender: $scope.gender,
                    birthday: $scope.birthday,
                    schoolfree: $scope.list[$scope.keyID].schoolfree,
                    mark: $scope.list[$scope.keyID].mark,
                    img: $scope.list[$scope.keyID].img
                };
                var refUser = database.ref("User/" + $scope.keyID);
                refUser.update(objUser);
                sessionStorage.setItem('user', $scope.keyID);
                sessionStorage.setItem("username", $scope.list[$scope.keyID].username);
                sessionStorage.setItem("password", $scope.list[$scope.keyID].password);
                sessionStorage.setItem("email", $scope.list[$scope.keyID].email);
                sessionStorage.setItem("fullname", $scope.list[$scope.keyID].fullname);
                sessionStorage.setItem("gender", $scope.list[$scope.keyID].gender);
                sessionStorage.setItem("birthday", $scope.list[$scope.keyID].birthday);
                sessionStorage.setItem("schoolfree", $scope.list[$scope.keyID].schoolfree);
                sessionStorage.setItem("mark", $scope.list[$scope.keyID].mark);
                sessionStorage.setItem("img", $scope.list[$scope.keyID].img);
                checkEdit = true;
                break;
            }
        }
        if (checkEdit) {
            alert("Cập nhật tài khoản thành công");
            document.location = 'index.html';
        } else {
            alert("Cập nhật tài khoản thất bại");
        }
    }

    $scope.clear = function() {
        $scope.username = sessionStorage.getItem("username");
        $scope.pass = sessionStorage.getItem("password");
        $scope.images = sessionStorage.getItem("img");
        $scope.fullname = "";
        $scope.email = "";
        $scope.gender = "";
        $scope.birthday = "";
        $scope.schoolfree = "";
        $scope.mark = "";
    }

})

app.config(function($routeProvider) {
    $routeProvider
        .when('/signin', { templateUrl: 'signIn.html', controller: 'login' })
        .when('/signup', { templateUrl: 'signUp.html', controller: 'signUp' })
        .when('/forgotpassword', { templateUrl: 'forgotPassword.html', controller: 'forgotPass' })
        .when('/changepassword', { templateUrl: 'changePassword.html', controller: 'changePass' })
        .when('/profile', { templateUrl: 'profile.html' })
        .when('/editprofile', { templateUrl: 'editProfile.html', controller: 'editProfile' })
        .when('/introduce', { templateUrl: 'introduce.html' })
        .when('/contact', { templateUrl: 'contact.html' })
        .when('/rooms', { templateUrl: 'listRoomExam.html' })
        .when('/courses', { templateUrl: 'listCourses.html' })
        .when('/home', { templateUrl: 'home.html' })
        .when('/exam/:idMH/:tenMH/:timeMH', { templateUrl: 'exam.html', controller: 'tnctrl' })
        .otherwise({ templateUrl: 'home.html' })
});

app.controller('listCourse', function($scope, $http) {
    $scope.listCourse = [];
    $scope.start = 0;

    $http.get('js/List/Courses.js').then(function(d) {
        $scope.listCourse = d.data;
    })

    $scope.next = function() {
        if ($scope.start < $scope.listCourse.length - 3) $scope.start += 3;

    }

    $scope.pre = function() {
        if ($scope.start != 0) $scope.start -= 3;
    }

})

app.controller('listRoom', function($scope, $http) {
    $scope.listRoom = [];
    $scope.start = 0;

    $http.get('js/List/Subjects.js').then(function(d) {
        $scope.listRoom = d.data;
    })

    $scope.next = function() {
        if ($scope.start < $scope.listRoom.length - 3) $scope.start += 3;

    }

    $scope.pre = function() {
        if ($scope.start != 0) $scope.start -= 3;
    }
})



app.controller('tnctrl', function($scope, $http, $routeParams, $timeout) {
    $scope.listcauhoi = [];

    $scope.index = 1;
    $scope.start = 0;

    $scope.idMH = $routeParams.idMH;
    $scope.tenMH = $routeParams.tenMH;
    $scope.timeMH = $routeParams.timeMH;

    $http.get('js/database/' + $scope.idMH + ".js").then(
        function(d) {
            // $scope.listcauhoi = d.data;
            console.log(d.data);
            for (var i = 0; i < 10; i++) {
                $scope.listcauhoi.push(d.data[Math.floor(Math.random() * d.data.length)]);
            }
            console.log($scope.listcauhoi);
        },
        function(d) {
            alert('Error');
        }
    )

    $scope.listResult = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    $scope.$parent.testMark = 0;
    $scope.listResults = function(result) {
        $scope.listResult[$scope.start] = result;
    }

    $scope.finish = function() {
        for (var i = 0; i < 10; i++) {
            if ($scope.listcauhoi[i].Id = $scope.tenMH && $scope.listcauhoi[i].AnswerId == $scope.listResult[i]) {
                $scope.$parent.testMark += $scope.listcauhoi[$scope.index - 1].Marks;
                console.log($scope.$parent.testMark);
            } else {
                $scope.$parent.testMark += 0;
            }
        }

    }

    $scope.chuyentiep = function() {
        document.location = 'index.html';
    }

    $scope.next = function() {
        if ($scope.start < $scope.listcauhoi.length - 1) {
            $scope.index++;
            $scope.start += 1;
        }
    }

    $scope.pre = function() {
        if ($scope.start != 0) {
            $scope.index--;
            $scope.start -= 1;
        }
    }

    $scope.return = function() {
        alert('Bạn có chắc chắn muốn thoát khỏi phòng thi không!')
        document.location = '#!home'
    }

    var countDowner, countDown = $scope.timeMH;

    countDowner = function() {
        if (countDown < 0) {
            $("#warning").fadeOut(2000);
            countDown = 0;
            return; // quit
        } else {
            $scope.countDown_text = (countDown - countDown % 60) / 60;
            countDown--; // -1
            $timeout(countDowner, 1000); // loop it again
        }
    };

    $scope.countDown_text = (countDown - countDown % 60) / 60;
    countDowner()
})