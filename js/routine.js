//주간 루틴 데이터 - tasks가 빈 배열이면 쉬는 날
const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const dayKo = ["월", "화", "수", "목", "금", "토", "일"];

const routines = {
    beginner: [
        [{ t: "워밍업·스트레칭", m: "5분" }, { t: "제자리 드리블 (양손 번갈아)", m: "10분" }, { t: "슛 기본 자세 (BEEF) 연습", m: "10분" }],
        [],
        [{ t: "워밍업·스트레칭", m: "5분" }, { t: "레이업 좌우 각 10개", m: "15분" }, { t: "벽에 체스트·바운드 패스", m: "10분" }],
        [],
        [{ t: "워밍업·스트레칭", m: "5분" }, { t: "수비 자세 + 슬라이드 스텝", m: "10분" }, { t: "자유투 20개", m: "10분" }],
        [],
        []
    ],
    novice: [
        [{ t: "워밍업·스트레칭", m: "5분" }, { t: "크로스오버 연습", m: "15분" }, { t: "점프슛 30개", m: "15분" }],
        [{ t: "워밍업·스트레칭", m: "5분" }, { t: "스피드 드리블 코트 왕복 10번", m: "10분" }, { t: "레이업 좌우 각 20개", m: "15분" }],
        [],
        [{ t: "워밍업·스트레칭", m: "5분" }, { t: "박스아웃 연습", m: "10분" }, { t: "클로즈아웃 연습", m: "10분" }, { t: "자유투 30개", m: "10분" }],
        [],
        [{ t: "워밍업·스트레칭", m: "5분" }, { t: "1대1 또는 3대3 게임", m: "30분" }, { t: "쿨다운 스트레칭", m: "5분" }],
        []
    ]
};

let level = "beginner";

//체크 기록 저장·불러오기 (localStorage) - 막혀 있는 환경에서도 에러가 나지 않게 try로 감쌈
function loadChecked() {
    try {
        return JSON.parse(localStorage.getItem("rookieRoutine_" + level)) || [];
    } catch (e) {
        return [];
    }
}

function saveChecked(list) {
    try {
        localStorage.setItem("rookieRoutine_" + level, JSON.stringify(list));
    } catch (e) {
        // 저장이 안 되는 환경이면 그냥 넘어감
    }
}

//오늘 요일 번호 (월요일 = 0)
const today = (new Date().getDay() + 6) % 7;

//주간 표 그리기
function showWeek() {
    const checked = loadChecked();
    let html = "";

    routines[level].forEach(function (tasks, d) {
        html += '<li class="' + (d === today ? "today" : "") + '">';
        html += '<p class="day">' + days[d] + "<span>" + dayKo[d] + "</span></p>";
        if (d === today) html += '<span class="today-badge">TODAY</span>';

        if (tasks.length === 0) {
            html += '<p class="rest"><b>REST</b>가벼운 스트레칭</p>';
        } else {
            tasks.forEach(function (task, k) {
                const id = d + "-" + k;     // 요일-순서 (예: 0-1)
                const on = checked.indexOf(id) !== -1 ? " checked" : "";
                html += '<label class="task"><input type="checkbox" value="' + id + '"' + on + '>'
                    + '<span class="box"></span>'
                    + '<span class="t">' + task.t + "<em>" + task.m + "</em></span></label>";
            });
        }
        html += "</li>";
    });

    $(".week").html(html);
    updateProgress();
}

//진행률 계산
function updateProgress() {
    const total = $(".week input").length;
    const done = $(".week input:checked").length;
    const pct = total === 0 ? 0 : Math.round(done / total * 100);

    $(".done").text(done);
    $(".total").text(total);
    $(".pct").text(pct + "%");
    $(".progress-box .bar i").stop().animate({ width: pct + "%" }, 400);

    // 하루 연습을 다 끝낸 요일은 요일 글자를 오렌지로
    $(".week > li").each(function () {
        const all = $(this).find("input").length;
        const ok = $(this).find("input:checked").length;
        if (all > 0 && all === ok) {
            $(this).addClass("complete");
        } else {
            $(this).removeClass("complete");
        }
    });
}

showWeek();

//체크할 때마다 저장 (체크박스는 다시 그려지므로 on으로 연결)
$(".week").on("change", "input", function () {
    const list = $(".week input:checked").map(function () {
        return $(this).val();
    }).get();
    saveChecked(list);
    updateProgress();
});

//레벨 바꾸기
$(".level button").click(function () {
    $(".level button").removeClass("on");
    $(this).addClass("on");
    level = $(this).data("lv");
    showWeek();
});

//기록 초기화
$(".reset").click(function () {
    if (confirm("이번 주 체크 기록을 모두 지울까요?")) {
        saveChecked([]);
        showWeek();
    }
});
