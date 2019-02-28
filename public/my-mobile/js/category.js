$(function () {
    //  发送请求,获取一级分类名称
    $.ajax({
        url: '/category/queryTopCategory',
        type: 'get',
        dataType: 'json',
        success: function (res) {
            console.log(res);
            var str = template('leftTpl', res);
            $('.category-left ul').html(str);

            // 渲染第一个一级分类对应的二级分类
            var id = res.rows[0].id;
            render(id);
        }
    });

    // 点击左侧一级分类,显示对应的二级分类(事件委托)
    $('.category-left').on('click', 'a', function () {
        // 所有a移除active类名
        $('.category-left ul a').removeClass('active');
        // 当前a添加active类名
        $(this).addClass('active');
        // 获取当前一级分类id
        var id = $(this).data("id");
        // 渲染对应的二级分类
        render(id);

    })
    // 发送请求,获取二级分类数据
    function render(id) {
        $.ajax({
            url: '/category/querySecondCategory',
            type: 'get',
            data: {
                id: id
            },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                var str = template('rightTpl',res);
                $('.category-right ul').html(str);
            }
        })

    }


})