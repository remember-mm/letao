$(function () {

   render();

   // 获取本地存储数据
   function getArr() {
      var his_val = localStorage.getItem('searchList') || '[]';
      // console.log(his_val);
      var arr = JSON.parse(his_val);
      console.log(arr);
      return arr;
   }

   // 渲染数据到模板中
   function render() {
      var arr = getArr();
      var str = template('searchTpl', {
         list: arr
      });
      $('.history').html(str);
   }

   // 点击清空所有记录(事件委托)
   $('.history').on('click', '.del-history', function () {
      mui.confirm('你确认要清空历史记录吗?', '温馨提示', ['取消', '确认'], function (e) {
         // 可以通过 e.index 确定用户的选择, 就是点击的按钮在数组中的下标
         if (e.index === 1) {
            // 清空本地存储
            localStorage.removeItem('searchList');
            // 重新渲染
            render();
         }

      })

   })

   // 点击单个删除按钮
   $('.history').on('click', '.del-btn', function () {

      var arr = getArr();
      var index = arr.indexOf($(this).prev().text());
      // var index = $(this).data('index');
      console.log(index);
      // 删除数组中的内容
      arr.splice(index, 1);
      // 转成字符串
      var str = JSON.stringify(arr);
      //  重新存入本地
      localStorage.setItem('searchList', str);
      // 重新渲染
      render();
   })

   // 点击搜索按钮,添加搜索记录
   $('.search_btn').click(function () {
      // 获取输入框中的内容
      var txt = $('.search_input').val().trim();
      // 清空输入框内容
      $('.search_input').val('');

      if (txt.length === 0) {
         // mui提示框
         mui.toast('请输入搜索关键字.')
         return
      }
      var arr = getArr();

      // 去除重复项
      var index = arr.indexOf(txt); //当前项在数组中的索引
      if (index != -1) { //说明数组中一存在该项
         arr.splice(index, 1);
      }

      // 数组长度超过10,从后面删除
      if (arr.length >= 10) {
         arr.pop();
      }

      // 将内容添加到数组的最前面
      arr.unshift(txt);
      // 转成字符串
      var str = JSON.stringify(arr);
      // 存储到本地
      localStorage.setItem('searchList', str);
      // 重新渲染
      render();
   })

})