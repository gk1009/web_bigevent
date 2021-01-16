$(function () {
    getUserInfo()
    var layer = layui.layer;
    $("#btnLogout").on('click', function () {
        layer.confirm('是否退出？', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html';
            layer.close(index)
        })
    })
})

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ""
        },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('1')
            }
            renderAvater(res.data)
        }
    })
}
function renderAvater(user) {
    //渲染名称
    var name = user.nicknume || user.username
    $("#welcome").html('欢迎&nbsp;&nbsp;' + name);
    //渲染头像
    if (user.user_pic !== null) {
        //有头像
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text-avater').hide();
    } else {
        //没头像
        $('.layui-nav-img').hide;
        var text = name[0].toUpperCase();
        $(".text-avater").show().html(text)
    }

}