/**
 * Created by zxdong on 2017/6/26.
 */

(function ($) {
    /**
     * 分页
     * @param data
     * @returns {*}
     */
    $.fn.daoPage = function (data) {
        var opts = $.extend({}, $.fn.daoPage.defaults, data);
        return this.each(function () {
            $this = $(this);
            var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
            $.fn.drawPage(o, $this, o.pagestart);
        });
    };
    $.fn.daoPage.defaults = {
        bgcolor: '#6acdbe',
        bghovercolor: '#390040',
        bgshowcolor: '#03401d',
        fontcolor: '#03401d',
        defaultbgcolor: '#2F4F4F',
        defaultcolor: '#E0FFFF',
        showpage: 7,
        pagestart: 1,
        pagetotal: 10,
        pagesize: 10,
        toPage: function () {
            return false;
        }
    };
    $.fn.drawPage = function (o, obj, selectpage) {
        var oldps = o.pagestart;
        var pagestart = selectpage;
        var showpage = o.showpage;
        var bgcolor = o.bgcolor;
        var bghovercolor = o.bghovercolor;
        var bgshowcolor = o.bgshowcolor;
        var pagetotal = o.pagetotal;
        var fontcolor = daoCommon.oppositeColor(bgshowcolor);
        var color = daoCommon.oppositeColor(bgcolor);
        var hcolor = daoCommon.oppositeColor(bghovercolor);
        var str = '<div  class="dao-in" style="float: left;"><span>页面大小：</span><input id="pagesize" value="' + o.pagesize + '"/></div>';

        str += '<div class="dao-sy dao-page topage" id="1">首页</div>';
        str += '<div class="dao-li dao-page" id="dao-pre">&lt;&lt;</div>';

        if (pagetotal < showpage) {
            showpage = pagetotal;
        }
        //这个宽度可能要重新调整。。。原因（放在jsp里面width包含了线条，html没包含），应该就在这两个之内
        var wd = 430 + 37 * showpage;

        //	var wd = 406 + 35* showpage;
        //页面显示情况
        var page = Math.floor(showpage / 2);

        if (oldps == pagestart) {
            if (oldps - page <= 0) {
                pagestart = 1;
            } else if (pagetotal - oldps < page) {
                pagestart = pagetotal - showpage + 1;
            } else {
                pagestart = oldps - page;
            }
        } else {
            if (pagestart + showpage > pagetotal + 1) {
                pagestart = pagetotal - showpage + 1;
            } else if (pagestart < 1) {
                pagestart = 1;
            }
        }
        for (var i = 0; i < showpage; i++) {
            str += '<div class="dao-li dao-page topage" id="' + (pagestart + i) + '">' + (pagestart + i) + '</div>';
        }

        str += '<div class="dao-li dao-page" id="dao-next">&gt;&gt;</div>';
        str += '<div class="dao-wy dao-page topage" id="' + pagetotal + '">尾页</div>';
        str += '<div class="dao-in"><input type="text" id="goPage" value="' + oldps + '"/><div class="xu-btn">Go</div></div>';
        $(obj).html(str);

        $(obj).css({
            'display': 'block',
            'line-height': '25px',
            'width': wd + 'px',
            'height': '27px',
            'margin': 'auto'
        })

        $(obj).find('.dao-page').css({
            'display': 'block',
            'float': 'left',
            'border': '1px solid #003333',
            'margin-left': '5px',
            'text-align': 'center',
            'background-color': bgcolor,
            'color': color,
            'cursor': 'pointer',
            'transition': '0.5s ease-out',
            '-moz-transition': '0.5s ease-out',
            '-webkit-transition': '0.5s ease-out'
        });
        $(obj).find('.dao-in #goPage,.dao-in #pagesize').css({
            'width': '50px',
            'height': '23px',
            'border': '1px solid #9400D3',
            'border-radius': '9px',
            'background': o.defaultbgcolor,
            'color': o.defaultcolor,
            'transition': '0.3s ease-out',
            '-moz-transition': '0.3s ease-out',
            '-webkit-transition': '0.3s ease-out'
        });
        $(obj).find('.dao-in #goPage').css({
            'margin-left': '25px'
        });


        $(obj).find('.dao-in #pagesize').focus(function () {
            $(this).css({
                'background': o.bgcolor,
                'color': o.fontcolor,
            });

            var filter = /^[0-9]*[1-9][0-9]*$/;
            $thispagesize = $(this);

            $(document).on('keyup', function (event) {
                if ($($thispagesize).val() != '') {
                    if (!filter.test($($thispagesize).val())) {
                        $($thispagesize).val('');
                        return;
                    }
                    if (parseInt($($thispagesize).val()) > 100) {
                        $($thispagesize).val('100')
                    }
                }
            })
        });
        $(obj).find('.dao-in #pagesize').focusout(function () {
            $(this).css({
                'background': o.defaultbgcolor,
                'color': o.defaultcolor,
            });
            if ($($thispagesize).val() == '') {
                $($thispagesize).val(o.pagesize)
            }
        });

        $(obj).find('.dao-in #goPage').focus(function () {
            $(this).css({
                'background': o.bgcolor,
                'color': o.fontcolor,
            });
            var filter = /^[0-9]*[1-9][0-9]*$/;
            $thispage = $(this);

            $(document).on('keyup', function (event) {
                if ($($thispage).val() != '') {

                    if (!filter.test($($thispage).val())) {
                        $($thispage).val('');
                        return;
                    }
                    if (parseInt($($thispage).val()) > pagetotal) {
                        $($thispage).val('')
                    }
                }
            })
        });

        $(obj).find('.dao-in #goPage').focusout(function () {
            $(this).css({
                'background': o.defaultbgcolor,
                'color': o.defaultcolor,
            });
            if ($($thispage).val() == '') {
                $($thispage).val(oldps)
            }
        });

        $(obj).find('.dao-in .xu-btn').css({
            'display': 'block',
            'float': 'right',
            'width': '30px',
            'line-height': '25px',
            'border': '1px solid #9400D3',
            'border-radius': '8px',
            'text-align': 'center',
            'cursor': 'pointer',
            'background': '#363636',
            'color': '#00FF00',
            'transition': '0.5s ease-out',
            '-moz-transition': '0.5s ease-out',
            '-webkit-transition': '0.5s ease-out'
        });
        $(obj).find('.dao-in .xu-btn').hover(function () {
            $(this).css({
                'background': '#1C1C1C',
                'color': '#FFA500',
                'transform': 'scale(0.9)'
            });
        }, function () {
            $(this).css({
                'background': '#363636',
                'color': '#00FF00',
                'transform': 'scale(1.0)'
            });
        });

        $(obj).find('.dao-li').css({
            'width': '30px'
        });
        $(obj).find('.dao-sy').css({
            'width': '50px'
        });

        $(obj).find('.dao-wy').css({
            'width': '50px'
        });

        $(obj).find('.dao-page#' + oldps).css({

            'background-color': bgshowcolor,
            'color': fontcolor,
            'transition': '0.5s ease-out',
            '-moz-transition': '0.5s ease-out',
            '-webkit-transition': '0.5s ease-out'

        });
        $(obj).find('.dao-page').hover(function () {
            $(this).css({
                'background-color': bghovercolor,
                'color': hcolor,
                'transform': 'scale(1.1)'
            })
        }, function () {
            if (this.id != oldps) {
                $(this).css({
                    'background-color': bgcolor,
                    'color': color,
                    'transform': 'scale(1.0)'
                })
            } else {
                $(this).css({
                    'background-color': bgshowcolor,
                    'color': fontcolor,
                    'transform': 'scale(1.0)'
                })
            }
        });

        $(obj).find('.topage').click(function () {
            if (this.id != oldps) {
                o.toPage(this.id, $(obj).find('.dao-in #pagesize').val());
            }
        });
        $(obj).find('.dao-in .xu-btn').click(function () {
            if ($(obj).find('.dao-in #goPage').val() != oldps || $(obj).find('.dao-in #pagesize').val() != o.pagesize) {
                o.toPage($(obj).find('.dao-in #goPage').val(), $(obj).find('.dao-in #pagesize').val());
            }
        });

        $('#dao-pre').click(function () {

            if (pagestart != 0) {
                pagestart = pagestart - showpage;
                $.fn.drawPage(o, obj, pagestart);

            }
        });
        $('#dao-next').click(function () {

            if (pagestart < pagetotal) {

                pagestart = pagestart + showpage;
                $.fn.drawPage(o, obj, pagestart);

            }
        });

    };


    /**
     * 提示语生成
     * @param data
     * @returns {*}
     */
    $.fn.daoToolTip = function (data) {
        var detail = $.extend({}, daoCommon.daoTitle, data);
        return this.each(function () {
            $this = $(this);
            var o = $.meta ? $.extend({}, detail, $this.data()) : detail;
            $.fn.drawToolTip(o, $this);
        });
    };
    $.fn.drawToolTip = function (detail, $this) {
        var x = $($this).offset().left;
        var y = $($this).offset().top;
        var tools = $('#daotitle-' + Math.ceil(x) + '-' + Math.ceil(y));
        if (tools.length == 0) {
            var width = $($this).width();
            var msg = detail.msg;
            var height = $($this).height();
            var htmlstr = '';
            if (detail.position == 'top') {
                htmlstr = '<div id="daotitle-' + Math.ceil(x) + '-' + Math.ceil(y) + '" style="display: none;opacity:' + detail.opacity + '">' +
                    '<div style="width:' + detail.width + 'px;position:absolute;left:' + (x + width / 2 - parseInt(detail.width) / 2) + 'px;bottom: ' + ($(window).height() - y + 10) + 'px;text-align:center;background-color: ' + detail.color + ';color:' + daoCommon.oppositeColor(detail.color) + ';border-radius: 8px;padding: 8px 8px;">' + msg + '</div>' +
                    '<div style="position:absolute;left:' + (x + width / 2) + 'px;top: ' + (y - 10) + 'px;border-top: 8px solid ' + detail.color + ';" class="triangle-down"><div>' +
                    '</div>';
            } else if (detail.position == 'left') {
                htmlstr = '<div id="daotitle-' + Math.ceil(x) + '-' + Math.ceil(y) + '" style="display: none;opacity:' + detail.opacity + '">' +
                    '<div style="width:' + detail.width + 'px;position:absolute;left:' + (x - parseInt(detail.width) - 25) + 'px;top: ' + y + 'px;text-align:center;background-color: ' + detail.color + ';color:' + daoCommon.oppositeColor(detail.color) + ';border-radius: 8px;padding: 8px 8px;">' + msg + '</div>' +
                    '<div style="position:absolute;left:' + (x - 10) + 'px;top: ' + (y + height / 2) + 'px;border-left: 8px solid ' + detail.color + ';" class="triangle-right"><div>' +
                    '</div>';
            } else if (detail.position == 'right') {
                htmlstr = '<div id="daotitle-' + Math.ceil(x) + '-' + Math.ceil(y) + '" style="display: none;opacity:' + detail.opacity + '">' +
                    '<div style="width:' + detail.width + 'px;position:absolute;left:' + (x + width + 20) + 'px;top: ' + y + 'px;text-align:center;background-color: ' + detail.color + ';color:' + daoCommon.oppositeColor(detail.color) + ';border-radius: 8px;padding: 8px 8px;">' + msg + '</div>' +
                    '<div style="position:absolute;left:' + (x + width + 12) + 'px;top: ' + (y + height / 2) + 'px;border-right: 8px solid ' + detail.color + ';" class="triangle-left"><div>' +
                    '</div>';
            } else if (detail.position == 'bottom') {
                htmlstr = '<div id="daotitle-' + Math.ceil(x) + '-' + Math.ceil(y) + '" style="display: none;opacity:' + detail.opacity + '">' +
                    '<div style="width:' + detail.width + 'px;position:absolute;left:' + (x + width / 2 - parseInt(detail.width) / 2) + 'px;top: ' + (y + height + 20) + 'px;text-align:center;background-color: ' + detail.color + ';color:' + daoCommon.oppositeColor(detail.color) + ';border-radius: 8px;padding: 8px 8px;">' + msg + '</div>' +
                    '<div style="position:absolute;left:' + (x + width / 2) + 'px;top: ' + (y + height + 12) + 'px;border-bottom: 8px solid ' + detail.color + ';" class="triangle-up"><div>' +
                    '</div>';
            }

            $('body').prepend(htmlstr);
        }
        if (detail.disappear == 'hover') {
            $($this).hover(function () {
                $('#daotitle-' + Math.ceil(x) + '-' + Math.ceil(y)).show();
                $(this).daoToolTip(detail);
            }, function () {
                $('#daotitle-' + Math.ceil(x) + '-' + Math.ceil(y)).remove();
            })
        } else {

            if (/^[0-9]*$/.test(detail.disappear)) {
                $('#daotitle-' + Math.ceil(x) + '-' + Math.ceil(y)).show();
                setTimeout(function () {
                    $('#daotitle-' + Math.ceil(x) + '-' + Math.ceil(y)).remove();
                }, detail.disappear)
            } else if (detail.disappear == 'other') {
                $('#daotitle-' + Math.ceil(x) + '-' + Math.ceil(y)).show();
                //处理其他点击事件
                $(document).bind('click', function (e) {
                    var e = e || window.event; //浏览器兼容性
                    var elem = e.target || e.srcElement;
                    while (elem) { //循环判断至跟节点，防止点击的是div子元素
                        if (elem.id && elem.id == 'daotitle-' + Math.ceil(x) + '-' + Math.ceil(y)) {
                            return;
                        }
                        elem = elem.parentNode;
                    }
                    $('#daotitle-' + Math.ceil(x) + '-' + Math.ceil(y)).remove();
                });

            } else {
                $($this).hover(function () {
                    $('#daotitle-' + Math.ceil(x) + '-' + Math.ceil(y)).show();
                    $(this).daoToolTip(detail);
                }, function () {
                    $('#daotitle-' + Math.ceil(x) + '-' + Math.ceil(y)).remove();
                })
            }
        }

    }
})(jQuery);


/**
 * 公共模块
 */
var daoCommon = {
    daogradientTimeNum: 0,
    daobtnColorNum: 0,
    daoTitle: {
        position: 'top',
        color: '#03401d',
        width: 130,
        disappear: 'hover',
        opacity: '1'
    }, trim: function (str) {
        if (str == null || str == '') {
            str = "";
        }
        str += '';
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    oppositeColor: function (a) {
        a = a.replace('#', '');
        var c16, c10, max16 = 15,
            b = [];
        for (var i = 0; i < a.length; i++) {
            c16 = parseInt(a.charAt(i), 16); //  to 16进制
            c10 = parseInt(max16 - c16, 10); // 10进制计算
            b.push(c10.toString(16)); // to 16进制
        }
        return '#' + b.join('');
    },
    setBtnColor: function ($this) {
        var colors = $($this).attr('class').split(' ');
        var color = '2F4F4F';
        for (var pox = 0; pox < colors.length; pox++) {
            if (colors[pox].indexOf('dao-btn-color-') != -1) {
                var colo = colors[pox].split('-');
                color = colo[colo.length - 1]
                pox = colors.length;
            }
        }
        if (daoCommon.trim(color) == '') {
            color = '2F4F4F';
        }
        $($this).css({
            'color': daoCommon.oppositeColor(color),
            'background-color': '#' + color
        });

        $($this).hover(function () {
            $($this).css({
                'background-color': daoCommon.oppositeColor(color),
                'color': '#' + color
            });
        }, function () {
            $($this).css({
                'color': daoCommon.oppositeColor(color),
                'background-color': '#' + color
            });
        });
    },
    setGradientTime: function ($this) {
        var times = $($this).attr('class').split(' ');
        var time = '0.5';
        for (var pox = 0; pox < times.length; pox++) {
            if (times[pox].indexOf('dao-gradient-time-') != -1) {
                var tim = times[pox].split('-');
                time = tim[tim.length - 1]
                pox = times.length;
            }
        }
        if (daoCommon.trim(tim) == '') {
            time = '0.5';
        }
        $($this).css({
            'transition': time + 's ease-out',
            '-ms-transition': time + 's ease-out',
            '-moz-transition': time + 's ease-out',
            '-webkit-transition': time + 's ease-out'
        });
    }
}


var daoBombBox = {
    bombBoxNum: 0,
    bombBoxDefault: {
        title: '温馨提示',
        content: '您确认处理这件事？',
        okVal: '确认',
        ok: true,
        okClose: true,
        onOk: function () {
            return false;
        },
        cancelVal: '取消',
        cancel: false,
        cancelColse: true,
        onCancel: function () {
            return false;
        },
        closeVal: '关闭',
        close: false,
        closeClose: true,
        onClose: function () {
            return false;
        },
        shadowbgcolor: '#0c0c0c',
        shadowOpacity: '0.3',
        wrapcolor: '#f4ffff',
        wrapWidth: '280',
        wrapHeight: '160',
        wrapOpacity: '0.9',
        lineStyle: '1px dashed #999999',
        titleAlign: 'center',
        titleColor: '#001a35',
        contentColor: '#333333',
        contentHeight: '70',
        bobmPosition: 'default',
        offersetX: 0,
        offersetY: 0

    },
    daoAlert: function (opt) {
        var opts = $.extend({}, daoBombBox.bombBoxDefault, opt);
        opts.ok = true;
        opts.cancel = false;
        opts.close = false;
        daoBombBox.daoOtherbombBox(opts);

    },
    daoMessage: function (opt) {
        var opts = $.extend({}, daoBombBox.bombBoxDefault, opt);
        opts.ok = true;
        opts.cancel = true;
        opts.close = false;
        daoBombBox.daoOtherbombBox(opts);
    },
    daoOtherbombBox: function (opt) {
        var opts = $.extend({}, daoBombBox.bombBoxDefault, opt);
        var bombBoxNum = ++daoBombBox.bombBoxNum;
        var shadow = '<div class="bxm-okcancel-shadow"></div>'
        var btnNum = 0;
        var btn = '';
        if (opts.ok) {
            btn += '<a class="dao-btn dao-btn-success ok-add-btn-' + bombBoxNum + '">' + opts.okVal + '</a>';
            btnNum++;
        }
        if (opts.cancel) {
            btn += '<a class="dao-btn dao-btn-info cancel-add-btn-' + bombBoxNum + '">' + opts.cancelVal + '</a>';
            btnNum++;
        }
        if (opts.close) {
            btn += '<a class="dao-btn dao-btn-default close-add-btn-' + bombBoxNum + '">' + opts.closeVal + '</a>';
            btnNum++;
        }

        var body = '<div class="bxm-okcancel-wrap">' +
            '<div class="bxm-okcancel-title">' + opts.title + '</div>' +
            '<div class="bxm-okcancel-content">' + opts.content + '</div>' +
            '<div class="bxm-okcancel-btn">' +
            btn +
            '</div>' +
            '</div>';

        $('body').prepend(body);
        //if(okCancelNum==1){
        $('body').prepend(shadow);


        //样式
        $('.bxm-okcancel-shadow').addClass('dao-shadow');
        $('.bxm-okcancel-shadow').show();
        $('.bxm-okcancel-wrap').css({
            'position': 'fixed',
            'left': ($(window).width() / 2 - opts.wrapWidth / 2 - opts.offersetX) + 'px',
            'top': ($(window).height() / 2 - opts.wrapHeight / 2 - opts.offersetY ) + 'px',
            'z-index': '999',
            'opacity': opts.wrapOpacity,
            'background-color': opts.wrapcolor,
            'width': opts.wrapWidth + 'px',
            'height': opts.wrapHeight + 'px',
            'border-radius': '12px'
        });
        $('.bxm-okcancel-wrap>div').css({
            'margin-top': '10px',
        });
        $('.bxm-okcancel-title').css({
            'text-align': opts.titleAlign,
            'color': opts.titleColor,
            'border-bottom': opts.lineStyle
        });
        $('.bxm-okcancel-content').css({
            'padding-left': '8px',
            'color': opts.contentColor,
            'border-bottom': opts.lineStyle,
            'height': opts.contentHeight + 'px',
        });
        if (btnNum == 1) {
            $('.bxm-okcancel-btn>a').css({
                'margin-left': (opts.wrapWidth / 2 - 30) + 'px',
            });
        } else if (btnNum == 2) {
            $('.bxm-okcancel-btn>a').css({
                'margin-left': (opts.wrapWidth / 2 - 80) + 'px',
            });
        } else if (btnNum == 3) {
            $('.bxm-okcancel-btn>a').css({
                'margin-left': (opts.wrapWidth / 2 - 110) + 'px',
            });
        }
        // $('.bxm-okcancel-shadow').show();

        //触发事件
        $(document).on('click', 'a.ok-add-btn-' + bombBoxNum, function () {
            opts.onOk(opts.data);
            if (opts.okClose) {
                $(this).parents('.bxm-okcancel-wrap').remove();
                $('.bxm-okcancel-shadow').remove();
            }
        });
        $(document).on('click', 'a.cancel-add-btn-' + bombBoxNum, function () {
            opts.onCancel(opts.data);
            if (opts.cancelColse) {
                $(this).parents('.bxm-okcancel-wrap').remove();
                $('.bxm-okcancel-shadow').remove();
            }
        });
        $(document).on('click', 'a.close-add-btn-' + bombBoxNum, function () {
            opts.onClose(opts.data);
            if (opts.closeClose) {
                $(this).parents('.bxm-okcancel-wrap').remove();
                $('.bxm-okcancel-shadow').remove();
            }
        });

    }
}


$(function () {

    setInterval(function () {

        /**
         * 自定义渐变时间
         */
        var gradientTime = $('[class*="dao-gradient-time-"]');
        if (gradientTime.length != daoCommon.daogradientTimeNum) {
            for (var pox = 0; pox < gradientTime.length; pox++) {
                daoCommon.setGradientTime(gradientTime[pox]);
            }
            daoCommon.daogradientTimeNum = gradientTime.length;
        }

        /**
         * 自定义按钮颜色
         */
        var btnColor = $('[class*="dao-btn-color-"]');
        if (btnColor.length != daoCommon.daobtnColorNum) {
            for (var pox = 0; pox < btnColor.length; pox++) {
                daoCommon.setBtnColor(btnColor[pox]);
            }
            daoCommon.daobtnColorNum = btnColor.length;
        }

    }, 200);
    /**
     * 悬浮提示语
     */
    $(document).on('mouseover', '[dao-title]', function () {
        var x = $(this).offset().left;
        var y = $(this).offset().top;
        var msg = $(this).attr('dao-title');
        var detail = $.extend({}, daoCommon.daoTitle, {msg: msg});
        if ($(this).attr('dao-title-detail') != '' && "undefined" != typeof $(this).attr('dao-title-detail')) {
            var data = $(this).attr('dao-title-detail').split(';');
            $.each(data, function (index, item) {
                var items = item.split(':');
                if (items[0] == 'position') {
                    detail = $.extend({}, detail, {position: items[1]});
                } else if (items[0] == 'color') {
                    detail = $.extend({}, detail, {color: items[1]});
                } else if (items[0] == 'width') {
                    detail = $.extend({}, detail, {width: items[1]});
                } else if (items[0] == 'disappear') {
                    detail = $.extend({}, detail, {disappear: items[1]});
                } else if (items[0] == 'opacity') {
                    detail = $.extend({}, detail, {opacity: items[1]})
                }
            })
        }
        $(this).daoToolTip(detail);
        $('#daotitle-' + Math.ceil(x) + '-' + Math.ceil(y)).show();
    });
    $(document).on('mouseout', '[dao-title]', function () {
        var x = $(this).offset().left;
        var y = $(this).offset().top;
        $('#daotitle-' + Math.ceil(x) + '-' + Math.ceil(y)).remove();
    });


    /**
     * 自定义角度旋转
     */
    $(document).on('mouseover', '[class*="dao-rotate-num-"]', function () {
        var classs = $(this).attr('class').split(' ');
        var num = 0;
        for (var pox = 0; pox < classs.length; pox++) {
            if (classs[pox].indexOf('dao-rotate-num-') != -1) {
                var nums = classs[pox].split('-');
                num = nums[nums.length - 1]
                pox = classs.length;
            }
        }
        if (daoCommon.trim(num) == '') {
            num = 0;
        }
        $(this).css({
            'transform': 'rotate(' + num + 'deg)',
            '-ms-transform': 'rotate(' + num + 'deg)',
            '-moz-transform': 'rotate(' + num + 'deg)',
            '-webkit-transform': 'rotate(' + num + 'deg)'
        });
    });

    $(document).on('mouseout', '[class*="dao-rotate-num-"]', function () {
        $(this).css({
            'transform': 'rotate(0deg)',
            '-ms-transform': 'rotate(0deg)',
            '-moz-transform': 'rotate(0deg)',
            '-webkit-transform': 'rotate(0deg)'
        });
    });

    /**
     * 自定义缩放
     */
    $(document).on('mouseover', '[class*="dao-scale-num-"]', function () {
        var classs = $(this).attr('class').split(' ');
        var num = 1;
        for (var pox = 0; pox < classs.length; pox++) {
            if (classs[pox].indexOf('dao-scale-num-') != -1) {
                var nums = classs[pox].split('-');
                num = nums[nums.length - 1]
                pox = classs.length;
            }
        }
        if (daoCommon.trim(num) == '') {
            num = 1;
        }
        $(this).css({
            'transform': 'scale(' + num + ')',
            '-ms-transform': 'scale(' + num + ')',
            '-moz-transform': 'scale(' + num + ')',
            '-webkit-transform': 'scale(' + num + ')'
        });
    });
    $(document).on('mouseout', '[class*="dao-scale-num-"]', function () {
        $(this).css({
            'transform': 'scale(1)',
            '-ms-transform': 'scale(1)',
            '-moz-transform': 'scale(1)',
            '-webkit-transform': 'scale(1)'
        });
    });
    $(document).on('mouseover', '[class*="dao-rotate-scale-num-"]', function () {
        var classs = $(this).attr('class').split(' ');
        var num1 = 1;//放大倍数
        var num2 = 0;//角度
        for (var pox = 0; pox < classs.length; pox++) {
            if (classs[pox].indexOf('dao-rotate-scale-num-') != -1) {
                var nums = classs[pox].split('-');
                num1 = nums[nums.length - 2]
                num2 = nums[nums.length - 1]
                pox = classs.length;
            }
        }
        if (daoCommon.trim(num1) == '') {
            num1 = 1;
        }
        if (daoCommon.trim(num2) == '') {
            num2 = 0;
        }
        $(this).css({
            'transform': 'rotate(' + num2 + 'deg) scale(' + num1 + ')',
            '-ms-transform': 'rotate(' + num2 + 'deg) scale(' + num1 + ')',
            '-moz-transform': 'rotate(' + num2 + 'deg) scale(' + num1 + ')',
            '-webkit-transform': 'rotate(' + num2 + 'deg) scale(' + num1 + ')'
        });
    });
    $(document).on('mouseout', '[class*="dao-rotate-scale-num-"]', function () {
        $(this).css({
            'transform': 'rotate(0deg) scale(1)',
            '-ms-transform': 'rotate(0deg) scale(1)',
            '-moz-transform': 'rotate(0deg) scale(1)',
            '-webkit-transform': 'rotate(0deg) scale(1)'
        });
    });


})