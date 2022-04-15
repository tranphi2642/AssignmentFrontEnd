- Trong trang signIn.html gồm:
    + Gồm 2 trường dữ liệu : username, password và nút đăng nhập
    + Có 2 đường dẫn: đăng ký và quên mật khẩu

- Trong trang signUn.html gồm:
    + Gồm 8 trường dữ liệu : username, password, fullname, email, radio gender, birthday, schoolfree, marks và nút đăng ký
    + Có 2 đường dẫn: đăng nhập và quên mật khẩu
    + Bắt lỗi khi nhập trùng username đã có trong database

- Trong trang forgotPassword.html gồm:
    + Gồm 3 trường dữ liệu : username, email và nút gửi mã
    + Có 2 đường dẫn: đăng nhập và đăng ký
    + Bắt lỗi khi nhập sai username và email

- Trong trang home.html gồm:
    + Bài viết mở đầu và tìm kiếm các khóa học
    + Cu hướng các framework cũng như các ngôn ngữ lập trình mới
    + Các chủ đề và giải thích các chủ đề đó
    + Những câu hỏi dành cho người mới bắt đầu
    + Website Thầy Long WEB 
    + Giải mã lập trình và các khóa học trên website khác
    + Phòng thi online
    + Các bài báo được đăng lên của website

- Trong trang introduce.html gồm:
    + Banner phòng thi online 2022
    + Giới thiệu về phòng thi online 2022
    + Các phòng/cuộc thi giành cho lập trình viên

- Trong trang listCourses.html gồm:
    + Phân loại các khóa học
    + Khóa học front-end
    + Khóa học back-end
    + Khóa học data và các khóa học khác

- Trong trang listRoomExam.html gồm:
    + Phòng thi front-end
    + Phòng thi back-end
    + Phòng thi data và các khóa học khác
    =>> Ấn vào chi tiết thì sẽ hiển thị mô tả phòng thi online 2022
    =>> Ấn vào thi khi đăng nhập rồi thì sẽ hiển thị 10 câu hỏi là thời gian làm bài
    + Bắt lỗi khi ấn vào thi nếu chưa đăng nhập thì sẽ bắt người dùng đăng nhập

- Trong trang contact.html gồm:
    + 3 form: Liên lạc, gửi thông tin liên hệ về gmail, bản đồ

- Trong trang exam.html gồm:
    + 10 câu hỏi ramdom từ database
    + Các nút chuyển câu hỏi, rời phòng và nộp bài
    + Có đồng hồ tính giờ làm bài
    + Tên môn thi

- Trong trang profile.html gồm:
    + Tất cả thông tin người dùng

- Trong trang changePassword.html gồm:
    + Gồm 4 trường dữ liệu: username,password, newpassword, comfirmpassword và nút cập nhật
    + Có bắt lỗi các trường hợp: không nhập đúng userame và password, nhập newpassword và confirmpassword không trùng khớp

- Trong trang editProfile.html gồm:
    + Gồm 8 trường dữ liệu: username, password, fullname, email, radio gender, birthday, schoolfree, marks 
    + 3 nút: cập nhật, làm mới , hủy bỏ
    + Có 2 trường bị vô hiệu hóa: username và password

+ Bật visual studio code lên
+ Chạy file index.html sau đó giao diện người dùng sẽ tự động include vào
+ Sau khi chạy file thì hiển thị trang home.html

+ Nếu người dùng chưa có tài khoản thì ấn vào Đăng ký và đăng ký tài khoản
+ Nếu người dùng đã có tài khoản mà quên mật khẩu thì ấn vào quên mật khẩu sau đó lấy lại mật khẩu
+ Nếu người dùng đã có tài khoản thì tiến hành đăng nhập 

+ Khi đăng nhập thì tên của người đang sử dụng sẽ hiển thị lên thanh navbar
+ Sau khi đăng nhập thì chúng ta có thể vào thi 
+ Ấn vào phòng thi và ấn vào thi =>> sẽ hiện ra 10 câu hỏi là thời gian làm bài 
+ Sau khi làm xong ấn nộp bài và sẽ hiển thị điểm lên màn hình
+ Em sử dụng firebase để cho việc đăng nhập, đăng ký, quên mật khẩu, đổi mật khẩu và cập nhật thông tin

