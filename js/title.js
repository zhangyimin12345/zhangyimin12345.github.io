var OriginTitle = document.title;

var titleTime;

document.addEventListener('visibilitychange', function () {

  if (document.hidden) {

    document.title = '(ง •̀_•́)ง‼这里是zhangyimin12345的博客~';

    clearTimeout(titleTime);

  }

  else {

    document.title = '( つ•̀ω•́)つ欢迎回来！';

    titleTime = setTimeout(function () {

      document.title = OriginTitle;

    }, 2000);

  }

});