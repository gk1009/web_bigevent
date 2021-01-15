$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $(".reg-box").show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $(".reg-box").hide()
    })

    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须为6到12位字符'],
        //校验两次密码
        repwd: function (value) {
            //获取
            var pwd = $('.reg-box input[name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    });
    var layer = layui.layer
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val(),
            },
            success: function (res) {
                //校验
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //成功
                layer.msg('注册成功')
                $('#link_login').click()
                $('#form_reg').click()
            }
        })

    })
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜您，登录成功')
                localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }
        })
    })
})