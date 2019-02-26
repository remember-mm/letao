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
    $('.dropdown-menu').on('click', 'a', function () {
        // 获取当前点击的a的内容,渲染到dropdown-text中
        var txt = $(this).text();
        $('.dropdown-text').text(txt);
        // 获取id,设置给隐藏域
        var id = $(this).data('id');
        $('[name = "categoryId"]').val(id);
        // 只要给隐藏域赋值了, 此时校验状态应该更新成成功
        $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID');
    })

    // 选择上传图片
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            console.log(data);
            // 设置给 img src
            $('.modal-body img').attr('src', data.result.picAddr);
            $('[name = "brandLogo"]').val(data.result.picAddr);
            // 只要给隐藏域赋值了, 此时校验状态应该更新成成功
            $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID');
        }
    });

    $('#form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            categoryId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入二级分类名称'
                    }
                }
            },
            brandLogo: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择图片'
                    }
                }
            },
        }

    });

    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url: '/category/addSecondCategory',
            type: 'post',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (res) {
                console.log(res);
                if (res.success) {
                    // 关闭模态框
                    $('#add_modal').modal('hide');
                    // 重新渲染
                    currentPage = 1;
                    render();

                    // 将表单元素重置 (内容和状态都重置)
                    $('#form').data('bootstrapValidator').resetForm(true);
                    // button 和 img 不是表单元素, 手动重置
                    $('.dropdown-text').text('请选择一级分类');
                    $('.modal-body img').attr('src', "./images/none.png");

                }
            }
        })
    });


})