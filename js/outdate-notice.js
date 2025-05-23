window.onload = function () {
  //不同的日期显示不同的样式，200 天为黄色提示，400天为红色提示，可以自己定义。
  let warningDay = 200;
  let errorDay = 600;
  // 确保能够获取到文章时间以及在文章详情页
  let times = document.getElementsByTagName('time');
  if (times.length === 0) { return; }
  let posts = document.getElementsByClassName('post-content');
  if (posts.length === 0) { return; }

  // 获取系统当前的时间
  let pubTime = new Date(times[0].dateTime);  /* 文章发布时间戳 */
  let now = Date.now()  /* 当前时间戳 */
  let interval = parseInt(now - pubTime)
  let days = parseInt(interval / 86400000)
  /* 发布时间超过指定时间（毫秒） */
  if (interval > warningDay * 3600 * 24 * 1000 && interval < errorDay * 3600 * 24 * 1000) {
    posts[0].innerHTML = '<div class="fold warning">' +
      '<h5>提示</h5><p>这是一篇发布于 ' + days + ' 天前的文章，部分信息可能已发生改变，请注意甄别。</p>' +
      '</div>' + posts[0].innerHTML;
  } else if (interval >= errorDay * 3600 * 24 * 1000) {
    posts[0].innerHTML = '<div class="fold danger">' +
      '<h5>提示</h5><p>这是一篇发布于 ' + days + ' 天前的文章，部分信息可能已发生改变，请注意甄别。</p>' +
      '</div>' + posts[0].innerHTML;
  }
};