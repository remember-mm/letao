$(document).ajaxStart(function () {
    NProgress.start();
});

$(document).ajaxStop(function () {
    setTimeout(function () {
        NProgress.done();
    }, 1000)
});


// 分类管理
$('.lt_nav .user_list .category').on('click',function(){
    $(this).next().stop().slideToggle();
})

// 侧边栏导航
$('.lt_main .main_top .icon_memu').on('click',function(){
    $('.lt_aside').toggleClass('hidenav');
    $('.lt_main').toggleClass('hidenav');
    $('.lt_main .main_top').toggleClass('hidenav');
})

// 退出登录
$('.lt_main .main_top .icon_logout').on('click',function(){
 $('#logout_modal').modal('show');
})

$('.logout_btn').on("click",function(){
    $.ajax({
        url:"/employee/employeeLogout",
        type:'get',
        success:function(res){
            location.href = "my-login.html"
        }
    })
})