// 每次调用$.get(),$post()或$.ajax()的时候斗湖i先调用$.ajaxPrefilter这个函数 ,在这个函数中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    console.log(options.url);
    // 在发起真正的ajax之前 统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})