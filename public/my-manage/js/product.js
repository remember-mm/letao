$(function () {
    var currentPage = 1;
    var pageSize = 3;
    var picArr = []; //存放上传的图片

    render();

    function render() {
        //发送请求获取数据
        $.ajax({
            url: '/product/queryProductDetailList',
            type: 'get',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                var str = template('productTpl', res);
                $('.main_content .table tbody').html(str);
                // 分页插件
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

    // 点击添加商品按钮
    $('#addBtn').click(function () {
        // 显示模态框
        $('#add_modal').modal('show');
        // 点击二级分类按钮,显示二级分类名称
        $.ajax({
            url: '/category/querySecondCategoryPaging',
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
    // 点击二级类名
    $('.dropdown-menu').on('click', 'a', function () {
        // 获取当前点击的a的内容,渲染到dropdown-text中
        var txt = $(this).text();
        $('.dropdown-text').text(txt);
        // 获取id,设置给隐藏域
        var id = $(this).data('id');
        $('[name = "brandId"]').val(id);
        // 只要给隐藏域赋值了, 此时校验状态应该更新成成功
        $('#form').data('bootstrapValidator').updateStatus('brandId', 'VALID');
    })

    // 选择上传图片
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            console.log(data);
            console.log(data.result);

            var picUrl = data.result.picAddr;

            // 添加在picArr的前面
            picArr.unshift(picUrl);
            // 添加在imgBox的最前面
            $("#imgBox").prepend('<img src="' + picUrl + '"style="height: 100px; margin-right:5px;">');
            if (picArr.length > 3) {
                // 删除最后一个, 数组的最后一项, 图片结构的最后一张图也要移除
                picArr.pop();
                // 找到最后一张图, 让他自杀, 找最后一个 img 类型的 元素
                $('#imgBox img:last-of-type').remove();
            }
            if (picArr.length == 3) {
                // 只要给隐藏域赋值了, 此时校验状态应该更新成成功
                $('#form').data('bootstrapValidator').updateStatus('picStatus', 'VALID');
            }
        }
    });

    // 表单校验
    $('#form').bootstrapValidator({
        // 配置 excluded 排除项, 对隐藏域完成校验
        excluded: [],

        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 配置字段列表
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择二级分类'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '请输入商品名称'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '请输入商品描述'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '请输入商品库存'
                    },
                    // 1  10  111  1111
                    // 正则校验, 必须非零开头的数字
                    // \d  0-9 数字
                    // ?   表示 0 次 或 1 次
                    // +   表示 1 次 或 多次
                    // *   表示 0 次 或 多次
                    // {n} 表示 出现 n 次
                    // {n, m}  表示 出现 n ~ m 次
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存必须是非零开头的数字'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '请输入商品尺码'
                    },
                    // 尺码格式, 必须是 xx-xx 格式,  xx 是两位的数字
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '尺码格式, 必须是 xx-xx 格式,  xx 是两位数字, 例如: 32-40 '
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '请输入商品原价'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '请输入商品现价'
                    }
                }
            },
            // 标记图片是否上传满三张的
            picStatus: {
                validators: {
                    notEmpty: {
                        message: '请上传三张图片'
                    }
                }
            }
        }
    });


    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url: '/product/addProduct',
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
                    $('.dropdown-text').text('请选择二级分类');
                    $('.modal-body img').remove();
                    picArr = [];
                }
            }
        })
    });



})