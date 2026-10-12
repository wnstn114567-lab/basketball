//농구화 그림 넣기 - data-colors에 적힌 색으로 shoes-data.js의 shoeSVG()를 그림
$(".shoe-art").each(function () {
    $(this).html(shoeSVG($(this).data("colors").split(",")));
});

//슬라이드
let i = 0;
function slide() {
    if (i < 2) {
        i++;
    } else {
        i = 0;
    }
    $(".slide ul").animate({ marginLeft: -1200 * i }, 800);
    $(".pager li").removeClass("on").eq(i).addClass("on");
    $(".pager .num b").text("0" + (i + 1));      // 01 / 03 숫자 바꾸기
}
setInterval(slide, 4000);

//탭메뉴
let t;
$(".tabmenu > li > h2 > a").click(function (e) {
    e.preventDefault();
    t = $(this).closest("li").index();          // 0: 공지사항, 1: 오늘의 팁

    $(".tabmenu > li").removeClass("on");
    $(".tabmenu > li").eq(t).addClass("on");

    $(".tabcon").hide();
    $(".tabcon").eq(t).show();
});

//팝업 - 클릭한 항목의 data-* 내용으로 채움
$(".pop").click(function (e) {
    e.preventDefault();
    const img = $(this).data("img");

    if (img) {
        $(".popcon .img img").attr("src", img).attr("alt", $(this).data("title"));
        $(".popcon .img").show();
    } else {
        $(".popcon .img").hide();               // 사진 없는 항목은 사진 칸 숨김
    }
    $(".popcon .label").text($(this).data("label"));
    $(".popcon h2").text($(this).data("title"));
    $(".popcon .desc").html($(this).data("text"));
    $("#popup").fadeIn(200);
});

//팝업 닫기
$(".close button").click(function () {
    $("#popup").fadeOut(200);
});
$("#popup").click(function (e) {
    if (e.target === this) {
        $("#popup").fadeOut(200);
    }
});
