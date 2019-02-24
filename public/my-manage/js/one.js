$(function () {
    var currentPage = 1;
    var pageSize = 5;
    render();

    function render() {
        // 发送请求,获取数据
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                var str = template('oneTpl', res);
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
    })

    // 添加校验
    //使用表单校验插件
    $('#form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [':disabled', ':hidden', ':not(:visible)'],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入一级类名'
                    }
                }
            }
        }
    });

    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            url: "/category/addTopCategory",
            type: "POST",
            data: $('#form').serialize(),
            dataType: "json",
            success: function (res) {
                if(res.success){
                    $('#add_modal').modal('hide');
                    // 重新渲染
                    render();
                    // 将表单内容重置
                    $('#form').data('bootstrapValidator').resetForm(true);
                }
            }
        })
    })
})