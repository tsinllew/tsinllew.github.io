血的教训
我不小心把
\ja\_pages\publication.md (文件1)
文件复制到了
D:\VMShare\academicpages_aist_new导航3\assets\css\publication.md (文件2)

整个项目其实还是用的(文件2)进行编译
我怎么修改(文件1)，都得不到自己想要的结果
特别是
js下的var offset = target.offsetTop - pubBody.offsetTop - 4;   // 这一句是调整链接的相对位置
这样一句话我怎么改都不起作用，改到+ 50没反应
我甚至怀疑是不是js没有执行，两个js之间的冲突。。。
怎么找也找不出答案。
后来在chatgpt的指引下
在生成的网页中，查看源代码
搜素offsetTop - pubBody.offsetTop
发现是var offset = target.offsetTop - pubBody.offsetTop + 20
这和我写的代码不一样
这才发现编译执行的文件不是我认为的 (文件1)
然后又在ubuntu工程下搜寻grep -R "offsetTop - pubBody.offsetTop + 20"
终于找到了(文件2)
这是我不经意复制的，却制造了极大的麻烦，改了整整两天，人都崩溃了
所以千万不要复制md文件
如果在同项目内复制，方法(*)也不管用，很难察觉
最后我把 (文件2)开头的
permalink: /publication/
先删除，保存
然后再把这个文件删除，清空回收站，最后才解决

所以
千万不能随便复制剪切md文件



导致我怎么也找不出毛病
因为系统还在根据 1.md(old)来编译
虽然 1.md(old)已经移到了其它文件夹
这时不管我怎么检查1.md(new)都不会找出毛病
不小心复制了md文件
真的让人崩溃，
根本找不出错误来



原因如下：

--------------
为啥剪切/重建 1.md 之后，编译还是看旧的 1.md(old)？

这个其实是 Jekyll 的规则问题，不是“md 不能剪切复制”，大概率是这几种情况之一：

(1) 旧的 1.md(old) 还在站点目录里

你可能只是把 1.md(old) 移到了某个子目录，比如
Publication页面按照导航不变的写法/原始的导航条可以移动/publication_ja.md
只要它还在站点的源码目录里，而且：

文件名是 .md

里面有 YAML front matter（--- 开头那块）

Jekyll 还是会把它当作一个页面来编译。

如果 1.md(old) 和 1.md(new) 的 front matter 里有同一个 permalink，比如都写了：

permalink: /ja/publication/


那 Jekyll 就会：

生成同一个 URL /ja/publication/

但这两个文件会“抢”同一个输出

结果是：有时候是 old 覆盖 new，你看到的就是旧页面的内容

这就是你感觉“不管 old 被剪到哪里，编译还是找 old”的真正原因：
因为 old 还在工程里，而且 permalink 一样，所以它在输出时覆盖了 new。

(2) 解决办法

你可以选一个方式：

彻底移出工程目录

把 1.md(old) 移到仓库外面（比如桌面、Documents 等），
只要不在 Jekyll 的根目录下面，就不会被编译。

或者取消它的 front matter

把 1.md(old) 的最上面 --- 到 --- 那一段删除，
让它变成普通文本备份，Jekyll 就不会再当作页面。

或者改掉 permalink

old 文件的 front matter 里去掉 permalink:，或改成别的 URL，
确保和 new 不冲突。

清理缓存再编译（可选）

终端里执行：

bundle exec jekyll clean
bundle exec jekyll serve


这样可以确保 _site 里没有老版本残留。
--------------



导致我怎么也找不出毛病
因为系统还在根据 1.md(old)来编译
虽然 1.md(old)已经移到了其它文件夹
这时不管我怎么检查1.md(new)都不会找出毛病
不小心复制了md文件
真的让人崩溃，
根本找不出错误来



我目前的方法(*)是：
1. 把1.md(old)全部移出academic_aist
2. 删除academic_site/_site/下的所有
3. 复制整个academic_aist到academic_aist1
4. 进入academic_aist1，用这个作为新的项目

















https://www.flaticon.com/
找icon图标创意的网站


.scss文件的路径要用相对路径
../../files/这样

.html文件可以取得
base_path, relative_url等
故不要写相对路径


urlicon.scss
写了publication的url链接的图标


images\icons
这里放有各种icons，及icon的制作ppt文件
favicon文件


_sass\_font_custom.scss
全站字体，字号统一设定
研究图像尺寸设定



_sass\_miscellaneous.scss
contact.md页面对齐的定制
member.md页面的定制


_sass\_publication.scss
publication.md页面快速导航到每年的论文的导航栏(导航栏跳转的定制写在publication.md)
Publication页面字号行距设定



_sass\_software.scss
software.md页面的定制


_includes\masthead.html
顶部Log TsinGraph设定
主导航菜单设定


_includes\head.html
我添加了JS设定，使得从新网页打开链接

_includes\head\custom.html
导航上方 Logo + TsinGraph 设定
顶部导航栏样式设定
导航栏国旗设定
侧边栏布局设定
favicon路径的设定
禁止 iOS Safari 自动把数字识别为电话的设定（publication页面页码在手机端自动加了下划线）


_includes\author-profile.html
侧边栏各种设定

_data\authors.yml
侧边栏的名字，Location，Email，Scholar，Link等信息

_data\publication.yml
我的publication数据
publication.md从这里读取数据

ja\
各种日语.md网页

_pages\
各种英语.md网页


assets\js\publication.js
里面写了Publication页面年份导航条点击的js程序
英文日文publication.md统一用这个


_sass\_custom.scss
这个文件暂时没用
里面内容可删除
在assets\css\main.scss里，已注释掉此句
/* 
@import "custom";   // 就加这一行！更改字体
*/


assets\css\main.scss
1
各种scss文件的导入
比如Publication / Software 等子页面专用模块
@import "urlicon";   // Publication 页面图标
@import "software";  // Software 页面排版
@import "publication";  // Publication 页面排版

2
取消侧栏（sidebar）的页面设定
#main.page-no-sidebar {
  .sidebar { display:none !important; }
  .page { width:100% !important; }
  padding-left:1em !important;
}
用在 Research.md / Publication.md 等

3
侧边栏的一些设定也在这里，有点乱
比如Sidebar Location图标和Tokyo, Japan文字对齐的设定
Sidebar author卡片设定

4
关于page_no_sidebar.html的设定
#main.page-no-sidebar {
比如和Navigation左对齐的微调设置


_layouts\page_no_sidebar.html
用于Research.md / Publication.md 等页面的layout的page_no_sidebar.html的设定



files
各种文件放在这里
注意不能命名为_files，因为默认前下划线的文件夹不会生成到_site\里