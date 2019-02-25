$(function () {

    var currentPage = 1;
    var pageSize = 5;
    render();

    function render() {

        // 发送请求,获取数据
        $.ajax({
            url: "/category/querySecondCategoryPaging",
            type: "get",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (res) {
                console.log(res);
                var str = template('twoTpl', res);
                $('.main_content .table tbody').html(str);

                // 配置分页
                $('#paginator').bootstrapPaginator({
                    // 指定bootstrap版本
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage: res.page,
                    // 总页数
                    totalPages: Math.ceil(res.total / res.size),

                    // 当页面被点击时触发
                    onPageClicked: function (a, b, c, page) {
                        // page 当前点击的页码
                        currentPage = page;
                        render();
                    }
                });
            }
        })

    }

    // 点击添加按钮,显示模态框
    $('#addBtn').click(function () {
        // 显示模态框
        $('#add_modal').modal('show');
        // 点击选择一级分类按钮,显示一级分类名称
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: 1,
                pageSize: 999
            },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                var str = template('dropdownTpl', res);
                $('.dropdown-menu').html(str);
            }
        });
    });
    // 点击一级类名
    $('.dropdown-menu').on('click','a',function(){
        // 获取当前点击的a的内容,渲染到dropdown-text中
        var txt = $(this).text();
        $('.dropdown-text').text(txt);
    })

})