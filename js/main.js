$(document).ready(function () {
  var func = {
    initLazyload() {
      $("img.lazy").lazyload({
        effect: "fadeIn",
        placeholder: "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwoKCggAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADGwi6MjRiSenIm9hqPOvljAOBZGmeaKqubOu6CQAh+QQJCgAAACwAAAAAEAAQAAADHAi63A5ikCEek2TalftWmPZFU/WdaKqubOu+bwIAIfkECQoAAAAsAAAAABAAEAAAAxwIutz+UIlBhoiKkorB/p3GYVN1dWiqrmzrvmkCACH5BAkKAAAALAAAAAAQABAAAAMbCLrc/jDKycQgQ8xL8OzgBg6ThWlUqq5s604JACH5BAkKAAAALAAAAAAQABAAAAMbCLrc/jDKSautYpAhpibbBI7eOEzZ1l1s6yoJACH5BAkKAAAALAAAAAAQABAAAAMaCLrc/jDKSau9OOspBhnC5BHfRJ7iOXAe2CQAIfkECQoAAAAsAAAAABAAEAAAAxoIutz+MMpJ6xSDDDEz0dMnduJwZZulrmzbJAAh+QQJCgAAACwAAAAAEAAQAAADGwi63P4wRjHIEBJUYjP/2dZJlIVlaKqubOuyCQAh+QQJCgAAACwAAAAAEAAQAAADHAi63A5ikCEek2TalftWmPZFU/WdaKqubOu+bwIAOwAAAAAAAAAAAA==",
      });
    },
    autotype() {
      if ($("#about p").length < 2) {
        return;
      }
      var $text = $("#about p:first-child")
      var content = $text.html()
      var index = 0;
      var timer = setInterval(function () {
        var current = content.substr(index, 1);

        if (current == '<') {
          index = content.indexOf('>', index) + 1;
        } else {
          index++;
        }

        $text.html(content.substring(0, index) + (index & 1 ? '_' : ''));
        if (index >= content.length) {
          clearInterval(timer);
        }
      }, 100);
    },
    backtop() {
      var progressPath = document.querySelector('.progress-wrap path');
      var pathLength = progressPath.getTotalLength();
      progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
      progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
      progressPath.style.strokeDashoffset = pathLength;
      progressPath.getBoundingClientRect();
      progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
      var updateProgress = function () {
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength - (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = progress;
      }
      updateProgress();
      $(window).scroll(updateProgress);
      var offset = 50;
      var duration = 550;
      $(window).on('scroll', function () {
        if ($(this).scrollTop() > offset) {
          $('.progress-wrap').addClass('active-progress');
        } else {
          $('.progress-wrap').removeClass('active-progress');
        }
      });
      $('.progress-wrap').on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: 0
        }, duration);
        return false;
      })
    },
    anchorMove() {
      $('.toc .toc-link, .tag-list .tag-list-item').on("click", function () {
        $('html, body').animate({
          scrollTop: $($.attr(this, 'href')).offset().top
        });
        return false;
      });
    },
    tocFixed() {
      var HEADER_OFFSET = 20;
      var $toc = $('#post-toc');
      if ($toc.length) {
        var minScrollTop = $toc.offset().top;
        console.log("minScrollTop", minScrollTop)
        $(window).scroll(function () {
          var scrollTop = $(window).scrollTop();
          if (scrollTop + HEADER_OFFSET < minScrollTop) {
            $toc.css({
              'position': 'absolute',
              'top': minScrollTop
            });
          } else {
            $toc.css({
              'position': 'fixed',
              'top': HEADER_OFFSET + 'px'
            });
          }
        });
      }
    },
    tocActive() {
      var HEADER_OFFSET = 30;
      var $toclink = $('.toc-link');
      var $headerlink = $('.headerlink');

      var headerlinkTop = $.map($headerlink, function (link) {
        return $(link).offset().top;
      });
      $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        for (var i = 0; i < $toclink.length; i++) {
          var currentHeaderTop = headerlinkTop[i] - HEADER_OFFSET,
            nextHeaderTop = i + 1 === $toclink.length ? Infinity : headerlinkTop[i + 1] - HEADER_OFFSET;
          if (currentHeaderTop < scrollTop && scrollTop <= nextHeaderTop) {
            $($toclink[i]).addClass('active');
          } else {
            $($toclink[i]).removeClass('active');
          }
        }
      });
    },
    colorRGB2Hex(color) {
      var rgb = color.split(',');
      var r = parseInt(rgb[0].split('(')[1]);
      var g = parseInt(rgb[1]);
      var b = parseInt(rgb[2].split(')')[0]);

      var hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      return hex;
    },
    postQrcode() {
      if ($(".post").length) {
        var $qrcodeClick = $('.postqrcode a'),
          $qrcodePanel = $('.postqrcode .panel'),
          $qrcodePanelImg = $('.postqrcode .panel img');

        $qrcodeClick.click(function () {
          if ($qrcodePanel.is(":hidden")) {
            $qrcodePanel.show();
            if ($qrcodePanelImg.attr("src") == undefined) {
              var color = func.colorRGB2Hex($qrcodePanelImg.css('color'));
              var bgcolor = func.colorRGB2Hex($qrcodePanelImg.css('background-color'));
              $qrcodePanelImg.attr("src", $qrcodePanelImg.data("qrcode") + '&bgcolor=' + bgcolor + '&color=' + color);
            }
          } else {
            $qrcodePanel.hide();
          }
        })
      }
    },
    changeTitle() {
      t = document.title;
      $(window).blur(function () {
        // document.title = '哔哩哔哩 (゜-゜)つロ 干杯~-bilibili'
      }).focus(function () {
        document.title = t
      });
    }
  }

  func.autotype()
  func.backtop()
  func.anchorMove()
  func.tocFixed()
  func.tocActive()
  func.initLazyload()
  func.postQrcode()
  func.changeTitle()
});