// 渲染数据
var currentPage = 1;
var pageSize = 5;

render();

function render() {
    // 发送请求,获取数据
    $.ajax({
        url: '/user/queryUser',
        type: 'get',
        data: {
            page: currentPage,
            pageSize: pageSize
        },
        dataType: 'json',
        success: function (res) {
            console.log(res);
            var str = template('userTpl', res);
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
                    // 调用 render 重新渲染页面
                    render();
                }
            });

        }

    })
}




// 执行操作
$('.lt_main .main_content tbody').on('click', '.btn', function () {
    $('#change_modal').modal('show');

    // 获取id
    var id = $(this).parent().data('id');
    console.log(id);
    // 获取用户状态
    var isDelete = $(this).hasClass('btn-success') ? 1 : 0;
    console.log(isDelete);

    $('.change_btn').on("click", function () {
        $.ajax({
            url:'/user/updateUser',
            type:'post',
            data:{
                id:id,
                isDelete:isDelete
            },
            dataType:'json',
            success:function(res){
                if(res.success){
                    // 关闭模态框
                    $('#change_modal').modal('hide');
                    // 重新渲染
                    render();
                }
            }
        })
    })
})