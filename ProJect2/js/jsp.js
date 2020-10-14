var request = {};   // 빈객체 생성
request.getParameter = function(p_name){    // 메소드 추가
    var v_url = location.href;
    if(v_url.indexOf("?") == -1) return;
    var v_queryString = v_url.split("?")[1];
    var v_nameValues = v_queryString.split("&");
    for(var i=0; i<v_nameValues.length; i++){
        var v_nameValue = v_nameValues[i].split("=");
        if(decodeURIComponent(v_nameValue[0]) == p_name){
            return decodeURIComponent(v_nameValue[1]);
        }
    }
    return null;    // 못 찾았다는 표시
}
request.getParameterValues = function(p_name){
    var v_url = location.href;
    if(v_url.indexOf("?") == -1) return;
    var v_retArr = [];  // 값을 담을 빈배열 생성
    var v_queryString = v_url.split("?")[1];
    var v_nameValues = v_queryString.split("&");
    for(var i=0; i<v_nameValues.length; i++){
        var v_nameValue = v_nameValues[i].split("=");
        if(decodeURIComponent(v_nameValue[0]) == p_name){
            v_retArr[v_retArr.length] = decodeURIComponent(v_nameValue[1]);
        }
    }
    if(v_retArr.length == 0){
        return null;    // 찾은게 없다면 null 리턴
    }
    return v_retArr;    // 찾은게 있다면 배열을 리턴
}
var out = {} // 빈 객체 생성
out.print = function(p_msg){
    document.write(p_msg);
}
out.println = function(p_msg){
    document.write(p_msg + "<br>");
}