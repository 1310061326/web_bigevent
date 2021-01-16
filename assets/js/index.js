$(function () {
    // 调用getUserInfo获取用户的基本信息
    getUserInfo()
})
// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头
        // options.headers = {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用renderAvatar() 渲染用户的头像
            renderAvatar(res.data)
        },
        // 不论成功还是i失败都会执行complete回调函数
        complete: function (res) {
            console.log(res);
            // 在complete回调函数中可以使用res.responseJSON 拿到服务器想赢回来的数据
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败!') {
                // 1. 清空token
                localStorage.removeItem('token')
                // 2. 跳转到登录页面
                location.href = '/login.html'
            }
        }
    })
    // $.ajax({
    //     method: 'GET',
    //     url: '/my/userinfo',
    //     headers: {
    //         Authorization: localStorage.getItem('token') || ''
    //     },
    //     success: function (res) {
    //         if (res.status !== 0) {
    //             return layui.layer.msg('获取用户信息失败')
    //         }
    //         renderAvatar()
    //     }
    // })
}

// 渲染用户的头像
function renderAvatar(user) {
    // 1.获取用户的名称
    var name = user.nickname || user.username
    // 2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp&nbsp' + name)
    // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text_avatar').hide()
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()// 获取用户名字的第一个字符并转化成大写
        $('.text_avatar').html(first).show()
    }
    // var name = user.nickname || user.username
    // $('#welcome').html('欢迎&nbsp&nbsp' + name)
    // if (user.user_pic !== null) {
    //     $('#.layui-nav-img').attr('src', user.user_pic)
    //     $('#text-avatar').hide()
    // } else {
    //     $('#.layui-nav-img').hide()
    //     var first = name[0].toUpperCase()
    //     $('#text-avatar').html(first).show()
    // }
}

$('#btnLogout').on('click', function () {
    // 提示用户是否确认退出
    var layer = layui.layer
    layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
        // 1. 清空本次存储的token
        localStorage.removeItem('token')
        // 2.重新跳转页面到登录页
        location.href = '/login.html'
        // 3.关闭confirm询问框
        layer.close(index)
    })
})