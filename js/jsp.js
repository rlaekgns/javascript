    // 아래 내용은 서버에서 동작하는 것이 아니고 브라우져(클라이언트)에서 동작합니다.
    // JSP의 메소드를 클라이언트쪽에서 구현해 본것입니다.

    /* 
    만약 = 이  %27 이라고 하면
        디코딩 전,  이 상태에서 split("=") 하면 원하는대로 문자열이 잘리는데 
          aaa.html?content=djkflj%27fkldjjf
        디코딩 후, 이 상태에서 split("=") 하면 내용이 중간에 잘려버림
          aaa.html?content=djkflj=fkldjjf
    */
    
    var request = {}; // 빈객체 생성
   request.getParameter = function(p_name){    // 메소드 추가
       var v_url = location.href;
       if(v_url.indexOf("?") == -1) return;
       // 디코딩을 너무 빨리해서, 넘어온 값속에 =, 이 섞여있으면
       // split에서 문제가 됨 
       // v_url = decodeURIComponent(v_url);  // 디코딩
       var v_queryString = v_url.split("?")[1];
       var v_nameValues =  v_queryString.split("&");
       for(var i=0; i< v_nameValues.length; i++){
           var v_nameValue = v_nameValues[i].split("=");
           if(decodeURIComponent(v_nameValue[0]) == p_name){
               return decodeURIComponent(v_nameValue[1]);  
           }
       }
       return null;  // 못찾았다는 표시, 개발자 맘
   }
   request.getParameterValues = function(p_name){
       var v_url = location.href;
       if(v_url.indexOf("?") == -1) return;
      // v_url = decodeURIComponent(v_url);  // 디코딩
       var v_retArr = [];   // 값을 담을 빈배열 생성
       var v_queryString = v_url.split("?")[1];
       var v_nameValues =  v_queryString.split("&");
       for(var i=0; i< v_nameValues.length; i++){
           var v_nameValue = v_nameValues[i].split("=");
           if(decodeURIComponent(v_nameValue[0]) == p_name){
               v_retArr[v_retArr.length] = decodeURIComponent(v_nameValue[1]);  
           }
       }
       if(v_retArr.length == 0){
           return null;             // 찾은게 없다면 null리턴
       }
       return v_retArr;   // 찾은게 있다면 배열을 리턴
   }

var out = {};   // 빈객체 생성
out.print = function(p_msg){
   document.write(p_msg);
}
out.println = function(p_msg){
   document.write(p_msg + "<br>");
}