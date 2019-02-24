// 拦截登录
$.ajax({
    url: "/employee/checkRootLogin",
    type: "get",
    success: function (res) {
        if (res.error === 400) {
            location.href = "my-login.html"
        }
    }
})