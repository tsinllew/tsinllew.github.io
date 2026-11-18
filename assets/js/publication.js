/* 针对publication.md上面的年份导航写的js */
/* 针对publication.md上面的年份导航写的js */
/* 针对publication.md上面的年份导航写的js */
/* 针对publication.md上面的年份导航写的js */
/* 针对publication.md上面的年份导航写的js */

document.addEventListener('DOMContentLoaded', function () {

  /* ============================================================
     1. 自动识别当前页面：优先找 .pubs-en，其次 .pubs-ja
     ============================================================ */
  var pubsEn = document.querySelector('.pubs-en');
  var pubsJa = document.querySelector('.pubs-ja');

  // 当前页面真正的 container（只会有一个）
  var pubs = pubsEn || pubsJa;
  if (!pubs) {
    // 不是 publication 页面，什么都不做
    return;
  }

  var pubBody = pubs.querySelector('.pubs-body');
  if (!pubBody) {
    console.warn('publication: .pubs-body not found');
    return;
  }

  var html   = document.documentElement;
  var body   = document.body;
  var footer = document.querySelector('.page__footer');

  // 只作用在当前这个 container 里查找年份导航 & back-to-top
  var yearLinks = pubs.querySelectorAll('.year-nav .chip[href^="#"]');
  var backToTop = pubs.querySelector('a[href="#top"]');

  /* ============================================================
     2. 锁定整页滚动，只让 pubBody 滚动
     ============================================================ */
  html.classList.add('pubpage-lock');
  body.classList.add('pubpage-lock');

  /* ============================================================
     3. 动态设置 .pubs 高度，让 footer 永远露出来
     ============================================================ */
  function resizePubs() {
    // 注意：这里 pubs 一定存在
    var rect = pubs.getBoundingClientRect();
    var footerHeight = footer ? footer.offsetHeight : 0;

    var h = window.innerHeight - rect.top - footerHeight;
    if (h < 120) h = 120;    // 防止高度过小/负数

    pubs.style.height = h + 'px';
  }

  resizePubs();
  window.addEventListener('resize', resizePubs);

  /* ============================================================
     4. 年份导航：只滚动中间的 pubBody
     ============================================================ */
  yearLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();          // 不让默认锚点滚整页
      e.stopPropagation();         // 不让主题的平滑滚动接管

      var id = this.getAttribute('href').substring(1);
      var target = document.getElementById(id);
      if (!target) return;

      // 目标在 pubBody 内部的相对位置
      // 用你已经验证过有效的写法：offsetTop 差值 - 4
      var offset = target.offsetTop - pubBody.offsetTop - 4;
      if (offset < 0) offset = 0;

      pubBody.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }, true);   // ★ 用捕获阶段，确保先于主题的平滑滚动
  });

  /* ============================================================
     5. Back to top：滚回 pubBody 顶部
     ============================================================ */
  if (backToTop) {
    backToTop.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      pubBody.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});