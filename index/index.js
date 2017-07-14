/**
 * Created by zxdong on 2017/6/29.
 */
$(function () {
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

    $(document).on('click', 'a.dao-alert', function () {
        daoBombBox.daoAlert({
            content: '这是个默认按钮！',
            onOk: function (p) {
                alert('样式比我好看，我也很无赖！')
            }
        });
    })
    $(document).on('click', 'a.dao-message', function () {


        daoBombBox.daoMessage({
            offersetY: 20,
            data: {
                msg: 'what fuck with you?'
            },
            content: '这是个消息按钮！',
            onOk: function (p) {
                alert(p.msg)
            }
        });
    })

    $(document).on('click', 'a.dao-other', function () {
        daoBombBox.daoOtherbombBox({
            cancel: true,
            close: true,
            offersetY: 20,
            data: {
                msg: 'I never know love is true,It\'s one here? just for you! '
            },
            content: '这是个错误按钮！',
            onOk: function (p) {
                alert(p.msg)
            }
        });
    })

    $('.dao-btn-wraning').daoToolTip({disappear: 2000, msg: '这是警告按钮', color: '#ff9f1d'})
    $('.dao-btn-default').daoToolTip({position: 'left', msg: '这是默认按钮', color: '#2F4F4F'})
    $('.dao-btn-error').daoToolTip({disappear: 'other', position: 'bottom', msg: '这是错误按钮', color: '#a1112e'})

    $('#okhtml').click(function () {
        $('#showhtml').html($('#txt').val());
    })

    $('.testhtml').css({
        'top': ($(window).height() / 2 - 150) + 'px',
        'left': ($(window).width() / 2 - 300) + 'px',
        'z-index': '999'
    });
    $('.testhtml').hide();

    $('#pagehtml').click(function () {
        var htmlstr = '<div class="page1"></div>\n' +

            '<script>\n' +
            '  var createPage1 = function (showpage, pagestart) {\n' +
            '    $(\'.page1\').daoPage({\n' +
            '           showpage: showpage,\n' +
            '           pagestart: pagestart,\n' +
            '           pagetotal: 1000,\n' +
            '           toPage: function (page, pagesize) {\n' +
            '            createPage1(pagesize, page, 1000)\n' +
            '         }\n' +
            '      });\n' +
            '   };\n' +
            '  createPage1(10, 1);\n' +
            '</script>\n';

        $('#txt').val(htmlstr);
        $('.dao-shadow').slideDown();
        $('.testhtml').show();
        $('#okhtml').trigger('click');
    });
    $('#cancelhtml').click(function () {
        $('.dao-shadow').slideUp();
        $('.testhtml').hide();
    });

})