# dao-ui
自己开发的UI
> =============================分页===================================


    示例：

        html     <div class="page"></div>

        script:

           var createPage = function (showpage, pagestart) {
                $('.page').daoPage({
                    showpage: showpage,
                    pagestart: pagestart,
                    pagetotal: 1000,
                    toPage: function (page, pagesize) {
                        createPage(pagesize, page, 1000)
                    }
                });
            }
            createPage(10, 1);

    说明:(以下都是默认的样式或属性)
        bgcolor: '#6acdbe',//背景颜色
        bghovercolor: '#390040',//鼠标悬浮北京颜色
        bgshowcolor: '#03401d',//当前页背景颜色
        fontcolor: '#03401d',//字体颜色
        defaultbgcolor: '#2F4F4F',//输入框背景颜色
        defaultcolor: '#E0FFFF',//输入框字体颜色
        showpage: 7,//默认显示页码数量
        pagestart: 1,//当前页
        pagetotal: 10,//总页数
        pagesize: 10,//当前页面大小
        toPage: function () {//点击页码回调函数，返回点击的页码 page 和当前页面大小 pagesize;
            return false;
        }

> =============================效果===================================



    示例:

        1.<div class="dao-gradient dao-btn-success">鼠标移到此处显示渐变效果</div>

        2.<div class="dao-gradient-time-2.5 dao-btn-info">鼠标移到此处显示自定义时间渐变效果</div>

        3.<div class="dao-rotate dao-gradient" style="background-color: #ff28cd;">鼠标移到此处显示旋转360度效果</div>

        4.<div class="dao-rotate-half dao-gradient" style="background-color: #2192f5;">鼠标移到此处显示旋转180度效果</div>

        5.<div class="dao-rotate-num-123  dao-gradient" style="background-color: #bd13f5;">鼠标移到此处显示自定义角度旋转效果</div>

        6.<div class="dao-scale-lager dao-gradient" style="background-color: #82ffd6;">鼠标移到此处显示变大效果</div>

        7.<div class="dao-scale-small dao-gradient" style="background-color: #35a696;">鼠标移到此处显示变小效果</div>

        8.<div class="dao-scale-num-2.3 dao-gradient" style="background-color: #3c39f5;">鼠标移到此处显示自定义大小效果</div>

        9.<div class="dao-rotate-scale dao-gradient-time-4.5" style="background-color: #a688f5;">旋转并放大</div>

        10.<div class="dao-rotate-scale-num-2.5-3600 dao-gradient-time-4.5" style="background-color: #c8cef5;">自定义角度自定义放大倍数</div>

    样式说明：

        1.渐变效果 class="dao-gradient"

        2.自定义渐变时间 class="dao-gradient-time-2.5"

        3.360度旋转 class="dao-rotate"

        4.180度旋转 class="dao-rotate-half"

        5.自定义角度旋转 class="dao-rotate-num-123"

        6.放大效果 class="dao-scale-lager"

        7.缩小效果 class="dao-scale-small"

        8.自定义缩放效果 class="dao-scale-num-2.3"

        9.旋转并放大 class="dao-rotate-scale"

        10.自定义角度和放大倍数 class="class="dao-rotate-scale-num-2.5-3600" 【2.5倍旋转3600度】

> =============================按钮===================================


    示例：

        1.<a class="dao-btn dao-btn-default  dao-gradient">默认</a>

        2.<a class="dao-btn dao-btn-info  dao-gradient">消息</a>

        3.<a class="dao-btn dao-btn-wraning dao-gradient">警告</a>

        4.<a class="dao-btn dao-btn-error dao-gradient">错误</a>

        5.<a class="dao-btn dao-btn-success dao-gradient" title="这是成功按钮">成功</a>

        6.<a class="dao-btn dao-btn-color-123456 dao-gradient">自定义颜色按钮</a>

    说明：

        1.默认按钮样式 class="dao-btn dao-btn-default"

        2.消息按钮样式 class="dao-btn dao-btn-info"

        3.警告按钮样式 class="dao-btn dao-btn-wraning"

        4.错误按钮样式 class="dao-btn dao-btn-error"

        5.成功按钮样式 class="dao-btn dao-btn-success"

        6.自定义颜色按钮 class="dao-btn dao-btn-color-123456"


> =============================弹出框===================================


> =============================悬浮提示===================================


    直接在元素上写属性配置：

        1.<a class="dao-btn dao-btn-default dao-gradient" dao-title="万物皆导万物皆导万物皆导万物皆导万物皆导万物皆导万物皆导万物皆导"
            dao-title-detail="position:left;opacity:0.75">左侧显示</a>

        2.<a class="dao-btn dao-btn-default dao-gradient" dao-title="万物皆导万物皆导万物皆导万物皆导万物皆导万物皆导万物皆导万物皆导"
            dao-title-detail="position:top;width:350">顶部显示</a>

        3.<a class="dao-btn dao-btn-default dao-gradient" dao-title="万物皆导万物皆导万物皆导万物皆导万物皆导万物皆导万物皆导万物皆导"
            dao-title-detail="position:bottom;color:#1effc9">下端显示</a>

        4.<a class="dao-btn dao-btn-default dao-gradient" dao-title="万物皆导万物皆导万物皆导万物皆导万物皆导万物皆导万物皆导万物皆导"
            dao-title-detail="position:right;width:700">右侧显示</a>


        元素配置说明：

            1.dao-title 显示提示的信息

            2.dao-title-detail 配置提示语的样式

                position:位置（top(默认),bottom,right,left）,

                color: 背景色 默认-'#03401d',

                width: 提示语宽度 默认-130,

                disappear:提示语消失方式，默认-'hover'

                opacity:透明度

    用 js 实现：

        1.$('.dao-btn-wraning ').daoToolTip({disappear:2000,msg:'这是警告按钮',color:'#ff9f1d'})

        2.$('.dao-btn-success ').daoToolTip({position:'bottom',msg:'这是成功按钮',color:'#148b00'})

        3.$('.dao-btn-error ').daoToolTip({disappear:'other',position:'right',msg:'这是错误按钮',color:'#8b0f54'})

        属性配置说明

                msg:显示的内容

                position:位置（top(默认),bottom,right,left）,

                color: 背景色 默认-'#03401d',

                width: 提示语宽度 默认-130,

                disappear:提示语消失方式，默认-'hover'
