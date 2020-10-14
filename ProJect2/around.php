<?php
    /* 
        file_get_contents 함수는 url내용을 읽는 함수, 자바로 만들면 조금 길어짐
        보통 자바의 URL 클래스를 이용해서 만듬.
        cross-origin 문제 발생시, 대부분 이런식으로 서버 경유로 문제를 해결
    $content = file_get_contents("https://naver.com");
    echo $content;
    */
    // echo $_GET["zone"];
    // $fileContents= file_get_contents("https://news.google.com/rss/search?q=".urlencode($_GET["search"])."&hl=ko&gl=KR&ceid=KR:ko");
    $fileContents= file_get_contents("http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=".$_GET["zone"]);
    /* xml문자열 -> xml문서 -> json */
    $simpleXml = simplexml_load_string($fileContents);
    $json = json_encode($simpleXml);
    echo $json;
?>
