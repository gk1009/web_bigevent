$(function () {
    //昵称校验规则
    var form = layui.form

    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度为1-6之间！"
            }
        }
    })
    initUserInfo();
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                // 记住，修改通常都和id有关，所以显示的时候要记得显示id 
                form.val('formUserInfo', res.data)
            }
        })
    }
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo()
    })
    var layer = layui.layer
    //修改用户信息
    $('form').on('submit', function (e) {
        e.preventDefault();
        //发送ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('用户信息修改失败')
                }
                layer.msg('提交成功')
                //调用父页面中的更新用户信息和头像方法
                window.parent.getUserInfo()
            }
        })
    })

})