$(document).ready(function () {
  $("img.lazy").lazyload({
    effect: "fadeIn"
  })
  $("[data-fancybox]").fancybox({
    loop: true,
    scrolling: "no",
    buttons: [
      "close"
    ],
    protect: true,
    iframe: {
      tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" src="" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>',
      preload: false
    }
  });
})  