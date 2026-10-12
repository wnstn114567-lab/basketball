//기술 데이터 - lv: 1 입문 / 2 초급 / 3 중급
// video: 유튜브 강좌 영상 (id는 주소 watch?v= 뒤의 값)
const skills = {
    dribble: [
        { lv: 1, title: "제자리 드리블", time: "10분",
          video: { id: "uqtHD41RldE", title: "초등학생도 할 수 있는 기초농구 (드리블편)", ch: "급식백선생" },
          steps: ["무릎을 살짝 굽히고 낮은 자세를 잡아요", "손바닥이 아니라 손가락 끝으로 공을 눌러 튀겨요", "공은 허리 아래 높이로, 시선은 정면에 둬요"],
          mistake: "공을 손바닥으로 때리듯 치면 공이 멀리 튀어서 컨트롤이 어려워요." },
        { lv: 2, title: "스피드 드리블", time: "10분",
          video: { id: "bGurHLE21pA", title: "속공은 드리블은 제대로 해야 돼 꿀팁 알려줄게", ch: "전태풍" },
          steps: ["공을 몸 앞 대각선 방향으로 밀어 놓듯 튀겨요", "드리블 높이를 허리 정도로 조금 높여요", "한 번 튀길 때 두세 걸음씩 달려요"],
          mistake: "공을 너무 앞에 두면 따라가다 놓치기 쉬워요." },
        { lv: 2, title: "크로스오버", time: "15분",
          video: { id: "Qh3JkOAEF3k", title: "농구 초보자는 꼭 봐야 하는 크로스오버 강좌", ch: "변코치" },
          steps: ["오른손 드리블로 낮게 시작해요", "공을 몸 앞에서 V자로 낮고 빠르게 왼손으로 넘겨요", "넘기는 순간 어깨와 발도 같은 방향으로 움직여요"],
          mistake: "공을 높게 넘기면 수비가 손을 뻗어 쉽게 뺏을 수 있어요." },
        { lv: 3, title: "비하인드 백", time: "15분",
          video: { id: "OU2LjprbzL8", title: "비하인드 백, 쉽게 바꿔볼게요.", ch: "농알멋" },
          steps: ["드리블하는 손 쪽 다리를 살짝 앞으로 내밀어요", "공을 엉덩이 뒤로 감싸듯 반대 손으로 보내요", "받는 손을 미리 뒤쪽에 준비해요"],
          mistake: "공을 보려고 고개를 돌리면 균형이 무너져요." }
    ],
    shoot: [
        { lv: 1, title: "슛 기본 자세 (BEEF)", time: "10분",
          video: { id: "4ifJ7Kcm-Dw", title: "농구 슛의 기본 중의 기본 (BEEF)", ch: "농알멋" },
          steps: ["B 밸런스: 발은 어깨너비, 무릎은 살짝 굽혀요", "E 시선: 림 앞쪽 고리를 봐요", "E 팔꿈치: 림 쪽을 향해 곧게 세워요", "F 팔로스루: 손목을 꺾어 손가락이 바닥을 향하게 마무리해요"],
          mistake: "팔꿈치가 옆으로 벌어지면 공이 좌우로 빗나가요." },
        { lv: 1, title: "레이업", time: "15분",
          video: { id: "pZ86_MxklmU", title: "왕초보를 위한 기본 레이업 5가지 꿀팁", ch: "SKILL FACTORY" },
          steps: ["오른쪽에서는 오른발 → 왼발 두 걸음", "왼발로 점프하면서 오른손으로 공을 들어 올려요", "백보드 네모 칸의 위쪽 모서리를 맞혀요"],
          mistake: "걸음 순서가 바뀌면 리듬이 깨지고 트래블링이 되기 쉬워요." },
        { lv: 2, title: "자유투 루틴", time: "10분",
          video: { id: "WTLSrIkRBGs", title: "농구 자유투 잘하는 법 & 슛 연습 방법", ch: "빵빵브래드TV" },
          steps: ["매번 같은 위치에서 같은 횟수만큼 드리블해요", "숨을 한 번 내쉬고 림을 봐요", "같은 자세로 끝까지 팔로스루해요"],
          mistake: "루틴이 매번 달라지면 슛 감각도 들쭉날쭉해져요." },
        { lv: 3, title: "점프슛", time: "20분",
          video: { id: "t-aX4VI7TNQ", title: "양동근 선수에게 배우는 점프슛 잘 쏘는 방법", ch: "슬램덕후" },
          steps: ["드리블을 멈추며 두 발로 착지해 자세를 잡아요", "제자리에서 위로 곧게 점프해요", "점프가 가장 높은 순간에 공을 놓아요"],
          mistake: "앞으로 뛰면서 쏘면 거리 조절이 어려워요." }
    ],
    pass: [
        { lv: 1, title: "체스트 패스", time: "10분",
          video: { id: "reklCXhCseI", title: "체스트 패스 마스터가 되기 위한 Tip", ch: "SKILL FACTORY" },
          steps: ["공을 가슴 앞에서 두 손으로 잡아요", "한 발을 앞으로 내딛으며 팔을 쭉 뻗어요", "엄지가 아래를 향하도록 손목을 털어 마무리해요"],
          mistake: "팔만 써서 던지면 패스가 약하고 느려져요." },
        { lv: 1, title: "바운드 패스", time: "10분",
          video: { id: "XJFNlKXu8mY", title: "쉽게 배우는 농구교실 - 체스트 패스, 바운드 패스", ch: "마포구체육회" },
          steps: ["받는 사람까지 거리의 3분의 2 지점을 노려요", "체스트 패스처럼 밀되 바닥을 향해 보내요", "공이 받는 사람 허리 높이로 튀어 오르게 해요"],
          mistake: "너무 가까이 튀기면 공이 낮게 와서 받기 어려워요." },
        { lv: 2, title: "오버헤드 패스", time: "10분",
          video: { id: "LZnxAUr8kXg", title: "오버헤드 패스에 대해", ch: "배스킷볼 다이제스트" },
          steps: ["공을 이마 위로 들어 올려요", "팔꿈치를 살짝 굽혔다가 앞으로 뻗어요", "수비 머리 위로 넘겨 멀리 있는 동료에게 보내요"],
          mistake: "공을 머리 뒤로 너무 넘기면 뒤에서 뺏기기 쉬워요." },
        { lv: 3, title: "원핸드 푸시 패스", time: "15분",
          video: { id: "m8pyVFs3vI0", title: "체스트 패스와 원핸드 패스 연습하기", ch: "스티브앤지니" },
          steps: ["드리블하던 손으로 공을 바로 밀어서 패스해요", "손목 스냅으로 빠르게 보내요", "패스할 방향을 너무 오래 쳐다보지 않아요"],
          mistake: "보는 방향이 뻔하면 수비가 패스 길을 먼저 읽어요." }
    ],
    defense: [
        { lv: 1, title: "수비 기본 자세", time: "5분",
          video: { id: "PZbyrDClX9U", title: "농구 수비 자세와 꿀팁!", ch: "스티브앤지니" },
          steps: ["발을 어깨너비보다 조금 넓게 벌려요", "무릎을 굽히고 엉덩이를 낮춰요", "한 손은 공 쪽, 다른 손은 패스 길을 막아요"],
          mistake: "허리만 숙이면 금방 지치고 반응이 느려져요." },
        { lv: 1, title: "슬라이드 스텝", time: "10분",
          video: { id: "PoxcxK3kWm0", title: "농구 수비의 기초! 사이드 스텝과 크로스 스텝", ch: "스티브앤지니" },
          steps: ["가려는 방향의 발을 먼저 옆으로 내딛어요", "반대 발을 끌듯이 따라붙여요", "두 발이 서로 교차하거나 붙지 않게 해요"],
          mistake: "발을 교차하면 상대가 방향을 바꿀 때 따라가지 못해요." },
        { lv: 2, title: "박스아웃", time: "10분",
          video: { id: "zDeDAP9qtmk", title: "리바운드를 잘하기 위한 박스아웃 연습하기", ch: "스티브앤지니" },
          steps: ["슛이 올라가면 가까운 상대를 먼저 찾아요", "상대에게 등을 대고 엉덩이로 밀어내요", "팔을 벌려 자리를 지킨 뒤 공을 잡아요"],
          mistake: "공만 보고 뛰어들면 상대에게 리바운드를 뺏겨요." },
        { lv: 3, title: "클로즈아웃", time: "10분",
          video: { id: "aWlhlgyDu1s", title: "기초 수비 클로즈 아웃 팀 레슨", ch: "HIGH P PRO" },
          steps: ["슈터에게 빠르게 달려가요", "가까워지면 짧은 잔발로 속도를 줄여요", "한 손을 높이 들어 슛을 방해해요"],
          mistake: "끝까지 전력으로 달려들면 돌파에 쉽게 뚫려요." }
    ]
};

const lvName = ["", "입문", "초급", "중급"];
let cat = "dribble";
let lv = "all";

//카드 그리기 - 고른 종목(cat)과 난이도(lv)에 맞는 기술만
function showSkills() {
    let html = "";
    let count = 0;

    skills[cat].forEach(function (s, k) {
        if (lv !== "all" && s.lv !== lv) return;
        count++;

        let steps = "";
        s.steps.forEach(function (text, n) {
            steps += "<li><b>" + (n + 1) + "</b><p>" + text + "</p></li>";
        });

        html += "<li>"
            + '<p class="meta"><span class="lv lv' + s.lv + '">' + lvName[s.lv] + "</span>연습 " + s.time + "</p>"
            + "<h4>" + s.title + "</h4>"
            + '<ol class="steps">' + steps + "</ol>"
            + '<div class="card-btns">'
            + '<button class="video-btn" data-k="' + k + '">영상으로 보기</button>'
            + '<button class="mistake-btn">자주 하는 실수 보기</button>'
            + '</div>'
            + '<p class="mistake">' + s.mistake + "</p>"
            + "</li>";
    });

    $(".skill-list").html(html);
    $(".count b").text(count);
    if (count === 0) {
        $(".empty").show();
    } else {
        $(".empty").hide();
    }
}
showSkills();

//종목 탭
$(".skill-tabs button").click(function () {
    $(".skill-tabs button").removeClass("on");
    $(this).addClass("on");
    cat = $(this).data("cat");
    showSkills();
});

//난이도 버튼
$(".level button").click(function () {
    $(".level button").removeClass("on");
    $(this).addClass("on");
    lv = $(this).data("lv");       // "all" 또는 숫자 1·2·3
    showSkills();
});

//자주 하는 실수 펼치기 (카드는 다시 그려지므로 on으로 연결)
$(".skill-list").on("click", ".mistake-btn", function () {
    const box = $(this).closest("li").find(".mistake");
    box.stop().slideToggle(200);
    if ($(this).text() === "자주 하는 실수 보기") {
        $(this).text("자주 하는 실수 닫기");
    } else {
        $(this).text("자주 하는 실수 보기");
    }
});

//영상 팝업 - 유튜브 영상을 팝업 안에서 재생
$(".skill-list").on("click", ".video-btn", function () {
    const s = skills[cat][$(this).data("k")];

    $(".video-box").html('<iframe src="https://www.youtube-nocookie.com/embed/' + s.video.id + '?autoplay=1&rel=0"'
        + ' title="' + s.title + ' 강좌 영상" allow="autoplay; encrypted-media; picture-in-picture"'
        + ' referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>');
    $(".video-pop .label").text("VIDEO · " + s.title);
    $(".video-pop h2").text(s.video.title);
    $(".video-pop .desc").text("채널: " + s.video.ch);
    $(".yt-link").attr("href", "https://www.youtube.com/watch?v=" + s.video.id);
    $("#popup").fadeIn(200);
});

//팝업 닫기 - 닫을 때 iframe을 비워서 영상 소리도 멈춤
function closeVideo() {
    $("#popup").fadeOut(200, function () {
        $(".video-box").html("");
    });
}
$(".close button").click(closeVideo);
$("#popup").click(function (e) {
    if (e.target === this) {
        closeVideo();
    }
});
