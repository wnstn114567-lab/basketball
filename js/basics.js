//규칙 아코디언 - 하나를 열면 나머지는 닫힘
$(".acc-head").click(function () {
    const li = $(this).parent();

    if (li.hasClass("on")) {
        li.removeClass("on");
        li.find(".acc-body").stop().slideUp(300);
    } else {
        $(".acc > li.on").removeClass("on").find(".acc-body").stop().slideUp(300);
        li.addClass("on");
        li.find(".acc-body").stop().slideDown(300);
    }
});

//포지션 상세 정보
const positions = {
    1: { name: "포인트 가드", en: "PG", role: "공을 코트 앞으로 가져가고, 어떤 공격을 할지 정하는 팀의 사령관이에요. 동료가 좋은 자리에 있을 때 패스를 넣어주는 게 가장 큰 역할이에요.",
         need: "드리블, 패스, 넓은 시야", practice: "크로스오버, 체스트 패스", player: "스테픈 커리" },
    2: { name: "슈팅 가드", en: "SG", role: "외곽에서 슛을 던져 점수를 만드는 득점원이에요. 공이 없을 때도 빈 자리를 찾아 움직여야 해요.",
         need: "정확한 슛, 공 없이 움직이기", practice: "점프슛, 자유투 루틴", player: "마이클 조던" },
    3: { name: "스몰 포워드", en: "SF", role: "돌파, 슛, 수비를 모두 하는 만능형이에요. 상황에 따라 가드처럼도, 포워드처럼도 뛰어요.",
         need: "돌파, 중거리 슛, 수비", practice: "레이업, 클로즈아웃", player: "르브론 제임스" },
    4: { name: "파워 포워드", en: "PF", role: "골밑에서 몸싸움을 하며 리바운드를 따내요. 가까운 거리 슛과 스크린도 중요한 역할이에요.",
         need: "힘, 리바운드, 스크린", practice: "박스아웃, 수비 자세", player: "팀 던컨" },
    5: { name: "센터", en: "C", role: "골대 바로 앞을 지키는 팀의 기둥이에요. 상대 슛을 막고(블록), 리바운드를 잡고, 골밑에서 득점해요.",
         need: "키, 몸싸움, 자리 잡기", practice: "박스아웃, 슬라이드 스텝", player: "샤킬 오닐" }
};

//코트 위 동그라미 강조 - jQuery 1.12는 SVG에 addClass가 안 돼서 attr("class")로 바꿈
function highlight(n) {
    $(".spot").attr("class", "spot");
    $('.spot[data-n="' + n + '"]').attr("class", "spot on");
    $(".pos-list li").removeClass("on");
    $('.pos-list li[data-n="' + n + '"]').addClass("on");
}
highlight(1);

$(".pos-list li").mouseenter(function () {
    highlight($(this).data("n"));
});
$(".spot").mouseenter(function () {
    highlight($(this).data("n"));
});

//포지션 팝업
function openPosition(n) {
    const p = positions[n];
    $(".popcon .label").text("POSITION " + n);
    $(".popcon h2").text(p.name + " (" + p.en + ")");
    $(".popcon .desc").html(
        "<p>" + p.role + "</p>"
        + '<dl class="pos-detail">'
        + "<div><dt>필요한 능력</dt><dd>" + p.need + "</dd></div>"
        + "<div><dt>추천 연습</dt><dd>" + p.practice + "</dd></div>"
        + "<div><dt>대표 선수</dt><dd>" + p.player + "</dd></div>"
        + "</dl>"
    );
    $("#popup").fadeIn(200);
}

$(".pos-list a").click(function (e) {
    e.preventDefault();
    openPosition($(this).parent().data("n"));
});
$(".spot").click(function () {
    openPosition($(this).data("n"));
});

$(".close button").click(function () {
    $("#popup").fadeOut(200);
});
$("#popup").click(function (e) {
    if (e.target === this) {
        $("#popup").fadeOut(200);
    }
});

//용어 사전
const terms = [
    { word: "레이업", cat: "공격", mean: "골대 가까이 뛰어 들어가 한 손으로 공을 올려놓듯 넣는 슛" },
    { word: "어시스트", cat: "공격", mean: "동료가 바로 득점할 수 있게 해준 패스" },
    { word: "스크린", cat: "공격", mean: "수비수 앞을 몸으로 막아 동료가 자유롭게 움직이게 돕는 것" },
    { word: "픽앤롤", cat: "공격", mean: "스크린을 걸어준 뒤 골대 쪽으로 돌아 들어가 패스를 받는 2대2 공격" },
    { word: "크로스오버", cat: "공격", mean: "몸 앞에서 공을 반대 손으로 빠르게 옮기는 드리블" },
    { word: "컷인", cat: "공격", mean: "공 없는 선수가 빈 공간으로 빠르게 파고드는 움직임" },
    { word: "앨리웁", cat: "공격", mean: "공중에 띄운 패스를 점프해서 잡자마자 바로 넣는 플레이" },
    { word: "풀업 점퍼", cat: "공격", mean: "드리블하다가 바로 멈춰 점프슛을 쏘는 것" },
    { word: "리바운드", cat: "수비", mean: "슛이 안 들어가고 튀어나온 공을 잡는 것. 공격 리바운드도 있어요" },
    { word: "스틸", cat: "수비", mean: "상대의 공을 가로채는 것" },
    { word: "블록", cat: "수비", mean: "상대가 쏜 슛을 손으로 쳐내서 막는 것" },
    { word: "박스아웃", cat: "수비", mean: "리바운드 때 상대를 등으로 밀어내 좋은 자리를 먼저 차지하는 것" },
    { word: "클로즈아웃", cat: "수비", mean: "슛을 쏘려는 선수에게 빠르게 달려가 막는 수비" },
    { word: "트래블링", cat: "규칙", mean: "드리블 없이 공을 들고 세 걸음 이상 걷는 반칙" },
    { word: "더블 드리블", cat: "규칙", mean: "드리블을 멈췄다가 다시 하거나 두 손으로 드리블하는 반칙" },
    { word: "앤드원", cat: "규칙", mean: "슛 동작 중 파울을 당했는데 슛이 들어가서 자유투 1개를 더 받는 것" },
    { word: "자유투", cat: "규칙", mean: "파울을 당한 뒤 자유투 라인에서 방해 없이 던지는 1점짜리 슛" },
    { word: "턴오버", cat: "규칙", mean: "실수로 공격권을 상대에게 넘겨주는 것" }
];

let termCat = "all";
let termKey = "";

function showTerms() {
    let html = "";
    let count = 0;
    terms.forEach(function (t) {
        const okCat = termCat === "all" || t.cat === termCat;
        const okKey = t.word.indexOf(termKey) !== -1 || t.mean.indexOf(termKey) !== -1;   // 용어와 뜻 둘 다에서 찾기
        if (okCat && okKey) {
            html += "<li><h4>" + t.word + "<span>" + t.cat + "</span></h4><p>" + t.mean + "</p></li>";
            count++;
        }
    });
    $(".terms").html(html);
    if (count === 0) {
        $(".empty").show();
    } else {
        $(".empty").hide();
    }
}
showTerms();

$(".term-cat button").click(function () {
    $(".term-cat button").removeClass("on");
    $(this).addClass("on");
    termCat = $(this).data("cat");
    showTerms();
});

$("#term-search").on("input", function () {
    termKey = $(this).val().trim();
    showTerms();
});
