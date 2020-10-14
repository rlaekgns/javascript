// 순서에 영향받기 때문에 편하게 쓰라고 만들어준 이벤트 window.onload
// page 로딩이 끝난다음에 자동으로 발생되는 이벤트
// 곧 </html> 까지 진행된 다음에 ..
// 아주 많이 많이 사용되는 이벤트
var f_center = function () { // 중앙 정렬시키는 함수
    // alert(document.getElementById("id_test").innerHTML);
    // Page 로딩되자 마자 가운데로 옮기기
    var v_div = document.getElementById("id_test");
    var v_winWidth = window.innerWidth;   // 브라우져 사용자가 보는 화면 넓이
    var v_winHeight = window.innerHeight; // 브라우져 사용자가 보는 화면 높이
    var v_centerX = parseInt(v_winWidth / 2);   // 수평 중앙 값
    var v_centerY = parseInt(v_winHeight / 2);  // 수직 중앙 값

    // id_test를 중앙으로 옮기기
    v_div.style.left = (v_centerX - 75) + "px";
    v_div.style.top = (v_centerY - 75) + "px";
}
window.onload = f_center; // onload 이벤트때 f_center 함수 call

window.onresize = function() { // window 사이즈가 변경되었을 때 자동 발생
    f_center();  // 중앙정렬시키는 함수 call
    console.log("window의 폭: ", window.innerWidth);
    console.log("window의 높이: ", window.innerHeight);
}
var f_myFunc = function (msg) {
    alert(msg);
}