//즉각실행함수 단 한번 실행(메모리절약), 의미있는 코드를 블락으로 감싸고 싶을때
(function () {
    // new를 쓰지 않아도 되게 꼼수 함수
    function factory(p_selector) {
        return new mydom(p_selector);
    }
    // 실제 중요한 함수(class역할)
    var mydom = function (p_selector) {
        // css선택자를 사용하는 querySelectorAll,querySelector
        var v_elems = document.querySelectorAll(p_selector);
        this.length = v_elems.length;
        for (var i = 0; i < this.length; i++) {
            this[i] = v_elems[i];   // 배열식 접근법을 쓴 JSON
        }
        return this;    // 명시적 return 없어도 됨
    }
    window.$ = factory;
    factory.fn = mydom.prototype;
    // $.fn은 mydom.prototype을 가리킴
})();

// 메소드 추가
$.fn.eq = function (p_index) {
    return this[p_index];
}


// jQuery 메소드 만들어보기
//.attr("속성명", "값")

/*
$.fn.attr = function(p_attr, p_val){
    for(var i=0; i<this.length; i++){
        this[i].setAttribute(p_attr, p_val);
    }
    return this;    // 메소드 체이닝
}
*/
/*
$.fn.attr = function(p_attr, p_callback){
    for(var i=0; i < this.length; i++){
        this[i].setAttribute(p_attr,p_callback(i));
    }
}
*/
/*
$.fn.attr = function(p_json){
    // 매개변수로 json을 받았을 떄, 코드 작성 
    for(var i=0; i<this.length; i++){
        // json의 key값 뽑아내기
        for(var v_attr in p_json){
            this[i].setAttribute(v_attr, p_json[v_attr]);
        }
    }
*/
// 자바스크립트에는 오버로딩이 없어용~~ ㅠㅠ

$.fn.attr = function (p_attr, p_callback) {
    var v_firsrType = typeof (p_attr);
    var v_secondType = typeof (p_callback);
    if (v_firsrType == "string" && v_secondType == "function") {
        for (var i = 0; i < this.length; i++) {
            var p_val = this[i].getAttribute(p_attr);
            this[i].setAttribute(p_attr, p_callback.call(this[i], i, p_val));
        }
    } else if (v_firstType == "object" && v_secondType == "undefined") {
        for (var i = 0; i < this.length; i++) {
            // json의 key값 뽑아내서 값 주기
            for (var v_attr in p_json) {
                this[i].setAttribute(v_attr, p_json[v_attr]);
            }
        }
    }
    return this;
}
$.fn.html = function(f_callback){
    // jQuery html(function) 처럼 동작하도록 코드 작성해보시오
    for(var i=0; i<this.length; i++){   // jQuery는 맨날 반복문이에영
        this[i].innerHTML = f_callback(i, this[i].innerHTML);
    }
}
$.fn.on = function(p_evtName, f_callback){
    for(var i=0; i<this.length; i++){
        // f_callback 함수안의 this를 명시적으로 각 요소로 대응시킴
        this[i].addEventListener(p_evtName,f_callback.bind(this[i]));
    }
}
// 이제 메소드 추가가 가능
/*
$.fn.huk = function(){
    console.log(this);
}
var kkk= "흥";
console.log($('body')[0].innerHTML);
$('body').huk();
*/
