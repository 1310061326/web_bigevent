$(function () {
    $("#link_reg").on('click', function () {
        $(".login_box").hide()
        $(".reg_box").show()
    })
    $("#link_login").on('click', function () {
        $(".login_box").show()
        $(".reg_box").hide()
    })


    //从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    // 通过form.verify()来自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            //此时的value 是调用它的表单的值 
            var pwd = $('.reg_box [name=password]').val()
            if (value !== pwd) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                // return console.log(res.message);
                return layer.msg(res.message)
            }
            // console.log('注册成功');
            layer.msg('注册成功,请登录')
            $('#link_login').click()
        })
    })
    // 监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登陆成功')
                // 将token 保存到本地存储
                localStorage.setItem('token', res.token)
                //跳转到主页
                location.href = '/index.html'
            }
        })
    })
})