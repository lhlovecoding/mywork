import $ from 'jquery';

let  myfun = {
    show:function(){
        $("li").css("background","red");
    }
}
myfun.show();
export default myfun;