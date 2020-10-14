/*
  자바스크립트 & CSS & HTML  자주쓰는 키워드들, 추후 추가 업데이트 예정
*/
var v_jsStudy = [ 
    //?
    "use strict","var","Number","String","Boolean","Array []","Object {}","true","false","null","NaN","undefined","infinite","JSON","case",
    "for","while","switch","continue","break","function","return","if elseif else","&& and","|| or","typeof","instanceof","new","==","===",
    "trim","indexOf","replace","split","substr","push","splice","sort","this","call","apply","bind","stringify","parse","regexp //","test","$1 $2",
    "i++","++i", "i +=3","Math","random","ceil","floor","sin","cos","round","FileReader","prototype","readAsDataURL","readAsText","result",
    //?
    "window","location","history","navigator","screen","userAgent","opener",
    "open","close","frames","self","top","innerWidth","innerHeight","href","reload","replace","setTimeout","clearTimeout",
    //?
    "document","write","getElementById","getElementsByName","getElementsByTagName","getElementsByClassName","querySelector","querySelectorAll",
    "styleSheets","cssRules","cssText","style","selectorText","innerHTML","children","parentElement","createElement","setAttribute",
    "getAttribue","appendChild",
    //?
    "onload","onclick","onchange","onmouseover","onmousemove","ondragover","ondrop","ondragstart","onunload","onkeydown","clientX","clientY","key",
    "onmousedown","onmouseup","onfocus","onblur","stopPropagation","preventDefault","addEventListener","dataTransfer",
    //?
    "display","position","z-index","overflow","transform","visibility","background","margin","padding","border","opacity",
    "block","inline","static","relative","absolute","hidden","auto","visible","width","height","auto","text-align","line-height",
    "rotate","translate","skew","scale","id #","class .",
    //?
    "a","input","img","div","p","h1~h6","pre","span","ul","ol","li","select","option","textarea","form","audio","video","canvas","svg",
    "table","tr","td",
    //?
    "type","name","value","pattern","action","method","required","readonly","disabled","checked","download","target","accept",
    "rowspan","colspan","rows","cols","data-",
    //?
    "button","radio","checkbox","date","color","file","submit","reset"
];
/*
  전체 흐름
  window.onload -> tajaInit 함수호출
  시작 클릭 -> tajaGoGo 함수호출
  tajaGoGo -> wordManufacture, wordsMove 함수 호출, 이후 각각 무한 재귀호출
  사용자 엔터키 이벤트 -> wordsCheck 함수호출
  onDiv 배열이 가장 중요한 역할!
*/

/*
  전역변수 선언
  movTime   : 떨어지는 속도
  makeTime  : 글자박스 선택 주기(시간)
  tajaStart : 시작여부
  tajaTyping: 사용자 타이핑 입력 텍스트상자
  onDiv     : 화면에서 움직이는 div만 담을 배열
*/
var movTime = 1000;    
var makeTime = 2000;  
var tajaStart=null;  
var tajaTyping=null;  
var onDiv = [];  

var v_imgBaseURL = "../images/roze0";
var v_imgNum=9;
function backImgChg(){
  tajaBackground.style.backgroundImage = "url("+v_imgBaseURL+ v_imgNum+".jpg)";
  v_imgNum++;
  if(v_imgNum > 9){
    v_imgNum=1;
  }
  setTimeout(backImgChg,3000);
}

/*
  v_jsStudy  배열에서 단어를 뽑아 화면에 보이기 
 */
function wordsManufacture() {
  var wordRanId = Math.round(Math.random() * (v_jsStudy.length - 1));
  var wordRanX = Math.round(Math.random() * 500);
  var newDiv = document.getElementById("word" + wordRanId);
  var wordWidth = newDiv.innerHTML.length * 12;  // 글자길이에 맞춰 대략 div 넓이 주기

  newDiv.style.width = wordWidth + "px";
  newDiv.style.left = wordRanX + "px";
  newDiv.style.display = "block";
  onDiv.push(newDiv);
  setTimeout(wordsManufacture, makeTime);
}

/* 
  뽑은 단어를 가진 DIV 움직이기 
*/
function wordsMove() {
  var v_bottomLimit=parseInt(tajaBackground.getBoundingClientRect().height);
  for (var i = 0; i < onDiv.length; i++) {
    //if (onDiv[i] == "") continue;
    var speed = Math.round(Math.random() * 20) + 1;       // 개별 떨어지는 속도 랜덤
    if(!onDiv[i].style.top) {onDiv[i].style.top="-30px"}  //이런 경우 잘 디버깅하면 굳!
    onDiv[i].style.top = (parseInt(onDiv[i].style.top) + speed) + "px";
    if (parseInt(onDiv[i].style.top) > v_bottomLimit) {
      onDiv[i].style.display = "none";
      onDiv[i].style.top = "-30px";
      onDiv.splice(i,1);
    }
  }
  setTimeout(wordsMove, movTime);
}

/*
  시작 함수로 글자만드는 함수와 글자 움직임함수 불러줌! 
*/
function tajaGoGo() {
  wordsManufacture();
  wordsMove();
  tajaTyping.focus();
}

/* 
  사용자가 글자입력후 엔터키 치면 처리~ 
*/
function wordsCheck() {
  var wordAnswer = tajaTyping.value;
  if(event.key == "Enter") {
    for (var i = 0; i < onDiv.length; i++) {
      if (onDiv[i].innerHTML == wordAnswer) {
        onDiv[i].style.display = "none";
        onDiv[i].style.top = "-30px";       // 초기치로 되돌림
        onDiv.splice(i,1);
      }
    }
    tajaTyping.value = "";
  }
}

/*
  v_jsStudy 배열 만큼 div 태그 만들고
  시작 클릭과, 엔터키 입력 이벤트  함수에 연결 
*/
function tajaInit() {
  tajaBackground = document.getElementById("tajaBackground");
  tajaTyping = document.getElementById("tajaTyping");
  tajaStart = document.getElementById("tajaStart");
  for (var i = 0; i < v_jsStudy.length; i++) {
    var movDiv = document.createElement("div");
    movDiv.setAttribute("id","word"+i);
    movDiv.setAttribute("class","txtBox");
    movDiv.innerHTML = v_jsStudy[i];
    tajaBackground.appendChild(movDiv);
  }
  backImgChg();
}

/*
 페이지 로딩되면 자동 스타트
*/
window.onload = tajaInit;

