$(".btn").on("click", function() {
    $(".wrap").toggleClass("none");
    $(".dizhi").toggleClass("none");
})
$(".btnb").on("click", function() {
    $(".wrap").toggleClass("none");
    $(".dizhi").toggleClass("none");

})

var str = localStorage.getItem("name") || "北京";
$(".btn").html(str);


$(".h5>ul").on("click", "li", function() {
    $(this).toggleClass("topactive").siblings().removeClass("topactive");
    var html = $(this).html();
    $(".gop").html(html);
    $(".btn").html(html);
    localStorage.setItem("name", html);

})

var mySwiper = new Swiper(".banner", {
    on: {
        slideChange: function() {
            var ind = mySwiper.activeIndex;
            $(".pag span").eq(ind).toggleClass("active").siblings().removeClass("active");
        }
    }
});
$(".pag").on("click", "span", function() {
    mySwiper.slideTo($(this).index());
})

var myBScroll = new BScroll(".wrapper", {
    scrollbar: true,
    probeType: 2
});
myBScroll.on("scroll", function() {
    if (this.y < this.maxScrollY - 120) {
        $(".load").html("释放加载")
    } else if (this.y < this.maxScrollY - 80) {
        $(".load").html("下拉加载")
    }
})
myBScroll.on("scrollEnd", function() {
    $(".load").html("下拉加载")
})
myBScroll.on("touchEnd", function() {
    if ($(".load").html() === "释放加载") {
        ajax();
        myBScroll.refresh();
    }
})


ajax();


function ajax() {

    $.ajax({
        url: "data/data.json",
        success: function(data) {
            var html = "";
            $.each(data, function(i, v) {
                html += `  <li>
                    <img src="${v.img}" alt="">
                    <p>
                        <span><b>${v.name}</b></span><br>
                        <span><b>限时抢购</b><b>${v.moey}<i>起</i></b></span><br>
                        <span><b>${v.fen}</b><b>${v.ji}</b><b class="iconfont icon-WIFI"></b><b>p</b></span><br>
                        <span><b  class="iconfont icon-dizhi-01">${v.dizhi}</b><b>${v.juli}</b></span>
                    </p>
                </li>`;
            })
            $(".content>ul").append(html);
        }
    })
}
$(".banner").on("click", function() {
    location.href = "index1.html"
})