//========== 1. 추천 테스트 ==========
const questions = [
    { key: "pos", q: "주로 어떤 포지션에서 뛰나요?", options: [
        { v: "guard", t: "가드", s: "공 운반·외곽 위주" },
        { v: "forward", t: "포워드", s: "돌파와 슛을 골고루" },
        { v: "center", t: "센터", s: "골밑 몸싸움·리바운드" },
        { v: "any", t: "아직 몰라요", s: "이제 막 시작했어요" }
    ] },
    { key: "style", q: "어떤 플레이를 좋아하나요?", options: [
        { v: "speed", t: "빠른 돌파", s: "드리블로 제치고 들어가기" },
        { v: "shoot", t: "슛", s: "외곽에서 던지는 게 좋아요" },
        { v: "power", t: "몸싸움", s: "리바운드·골밑 플레이" },
        { v: "all", t: "골고루", s: "이것저것 다 해요" }
    ] },
    { key: "foot", q: "발볼은 어떤 편인가요?", options: [
        { v: "narrow", t: "좁은 편", s: "운동화가 늘 헐렁해요" },
        { v: "normal", t: "보통", s: "대부분 신발이 잘 맞아요" },
        { v: "wide", t: "넓은 편", s: "앞쪽이 자주 끼어요" },
        { v: "unknown", t: "잘 모르겠어요", s: "신어보고 정할래요" }
    ] },
    { key: "budget", q: "예산은 얼마인가요?", options: [
        { v: "low", t: "15만 원 이하", s: "가성비가 제일 중요해요" },
        { v: "mid", t: "20만 원 이하", s: "적당한 선에서" },
        { v: "high", t: "20만 원 넘어도 OK", s: "좋은 걸로 오래 신을래요" },
        { v: "any", t: "상관없어요", s: "나한테 맞으면 돼요" }
    ] }
];

let step = 0;        // 지금 질문 번호 (0부터)
let answers = {};    // 고른 답 { pos, style, foot, budget }

function showQuestion() {
    const q = questions[step];
    let html = "";
    const abc = ["A", "B", "C", "D"];
    q.options.forEach(function (o, k) {
        const picked = answers[q.key] === o.v ? " picked" : "";      // 전에 골랐던 답 표시
        html += '<li><button class="' + picked + '" data-v="' + o.v + '">'
            + '<span class="abc">' + abc[k] + "</span>"
            + "<div><strong>" + o.t + '</strong><span class="sub">' + o.s + "</span></div>"
            + "</button></li>";
    });
    $(".question h4").html("<em>Q" + (step + 1) + "</em>" + q.q);
    $(".options").html(html);
    $(".progress .step").text("Q" + (step + 1) + " / " + questions.length);
    $(".progress .bar i").stop().animate({ width: ((step + 1) / questions.length * 100) + "%" }, 300);

    if (step === 0) {
        $(".prev").hide();
    } else {
        $(".prev").show();
    }
}
showQuestion();

//점수 계산 - 포지션 30 + 플레이 스타일 30 + 발볼 20 + 예산 20 = 100점
function score(s, a) {
    let pt = 0;
    const why = [];      // 추천 이유

    // 포지션
    if (a.pos === "any") {
        pt += 20;
        if (s.style.indexOf("all") !== -1) why.push("어느 포지션이든 무난해요");
    } else if (s.pos.indexOf(a.pos) !== -1) {
        pt += 30;
        why.push(posName[a.pos] + "에게 잘 맞는 모델");
    }

    // 플레이 스타일
    if (s.style.indexOf(a.style) !== -1) {
        pt += 30;
        why.push(styleName[a.style] + " 플레이에 어울려요");
    } else if (s.style.indexOf("all") !== -1) {
        pt += 15;
    }

    // 발볼
    if (a.foot === "wide") {
        if (s.wide) {
            pt += 20;
            why.push("발볼 넓은 사람도 편해요");
        }
    } else if (a.foot === "narrow") {
        if (s.wide) pt += 8;
        else pt += 20;
    } else {
        pt += 20;
    }

    // 예산
    let limit = Infinity;
    if (a.budget === "low") limit = 150000;
    if (a.budget === "mid") limit = 200000;

    if (s.price <= limit) {
        pt += 20;
        if (limit !== Infinity) why.push("예산 안에 들어와요");
    } else if (s.price - limit <= 30000) {
        pt += 8;
        why.push("예산보다 조금 비싸요");
    }

    if (why.length === 0) why.push(s.desc);

    // 발볼이 넓다고 했는데 넓은 발볼용이 아니면 따로 안내
    let warn = "";
    if (a.foot === "wide" && !s.wide) warn = "발볼이 좁게 느껴질 수 있어요. 꼭 신어보고 고르세요.";

    return { pt: pt, why: why, warn: warn };
}

function showResult() {
    // 16켤레 모두 점수를 매긴 뒤 높은 순(같으면 싼 순)으로 3개
    const ranked = shoes.map(function (s) {
        const r = score(s, answers);
        return { s: s, pt: r.pt, why: r.why, warn: r.warn };
    }).sort(function (x, y) {
        return y.pt - x.pt || x.s.price - y.s.price;
    }).slice(0, 3);

    let html = "";
    ranked.forEach(function (r, k) {
        let why = "";
        r.why.slice(0, 3).forEach(function (w) {
            why += "<li>" + w + "</li>";
        });
        html += "<li>"
            + '<span class="rank">' + (k + 1) + "</span>"
            + shoeImg(r.s)
            + '<p class="brand">' + r.s.brand + "</p>"
            + "<strong>" + r.s.name + "</strong>"
            + '<p class="price">' + won(r.s.price) + "</p>"
            + '<div class="match"><span>잘 맞음</span><div class="bar"><i data-w="' + r.pt + '"></i></div><span>' + r.pt + "%</span></div>"
            + '<ul class="dots">' + why + "</ul>"
            + (r.warn ? '<p class="fit-warn">' + r.warn + "</p>" : "")
            + "</li>";
    });

    $(".result-list").html(html);
    $(".progress .step").text("RESULT");
    $(".question").hide();
    $(".result").fadeIn(300);

    // 막대가 0에서 점수만큼 늘어나는 효과
    $(".result-list .match i").each(function () {
        $(this).animate({ width: $(this).data("w") + "%" }, 700);
    });
}

//답 고르기 (보기는 질문마다 새로 그려지므로 on으로 연결)
$(".options").on("click", "button", function () {
    answers[questions[step].key] = $(this).data("v");
    if (step < questions.length - 1) {
        step++;
        showQuestion();
    } else {
        showResult();
    }
});

$(".prev").click(function () {
    if (step > 0) {
        step--;
        showQuestion();
    }
});

$(".retry").click(function () {
    step = 0;
    answers = {};
    $(".result").hide();
    $(".question").fadeIn(300);
    showQuestion();
});

//========== 2. 농구화 목록 (필터·정렬) ==========
let fPos = "all";
let fPrice = "all";
let fWide = false;
let sortBy = "basic";
let picked = [];        // 비교함에 담은 농구화 id (최대 2개)

function inPrice(p) {
    if (fPrice === "low") return p <= 150000;
    if (fPrice === "mid") return p > 150000 && p <= 200000;
    if (fPrice === "high") return p > 200000;
    return true;
}

function showList() {
    let list = shoes.filter(function (s) {
        const okPos = fPos === "all" || s.pos.indexOf(fPos) !== -1;
        const okWide = !fWide || s.wide;
        return okPos && inPrice(s.price) && okWide;
    });

    // 정렬 (원본 순서는 그대로 두려고 slice()로 복사한 뒤 정렬)
    if (sortBy === "low") {
        list = list.slice().sort(function (a, b) { return a.price - b.price; });
    } else if (sortBy === "high") {
        list = list.slice().sort(function (a, b) { return b.price - a.price; });
    }

    let html = "";
    list.forEach(function (s) {
        const isOn = picked.indexOf(s.id) !== -1;
        const posText = s.pos.map(function (p) { return posName[p]; }).join("·");

        html += "<li>"
            + '<div class="art">' + shoeImg(s)
            + '<span class="brand">' + s.brand + "</span>"
            + '<button class="cmp' + (isOn ? " on" : "") + '" data-id="' + s.id + '">' + (isOn ? "✓ 비교중" : "+ 비교") + "</button>"
            + "</div>"
            + '<div class="info">'
            + "<strong>" + s.name + "</strong>"
            + '<p class="price">' + won(s.price) + "</p>"
            + '<p class="tags"><span>' + posText + "</span><span>" + s.cushion + "</span><span>" + s.weight + "</span>" + (s.wide ? "<span>발볼 넓음 OK</span>" : "") + "</p>"
            + '<p class="desc">' + s.desc + "</p>"
            + "</div>"
            + "</li>";
    });

    $(".shoe-list").html(html);
    $(".list-info b").text(list.length);
    if (list.length === 0) {
        $("#list .empty").show();
    } else {
        $("#list .empty").hide();
    }
}
showList();

$(".f-pos button").click(function () {
    $(".f-pos button").removeClass("on");
    $(this).addClass("on");
    fPos = $(this).data("v");
    showList();
});

$(".f-price button").click(function () {
    $(".f-price button").removeClass("on");
    $(this).addClass("on");
    fPrice = $(this).data("v");
    showList();
});

$("#wide").on("change", function () {
    fWide = $(this).prop("checked");
    showList();
});

$("#sort").on("change", function () {
    sortBy = $(this).val();
    showList();
});

//========== 3. 비교하기 ==========
function findShoe(id) {
    return shoes.filter(function (s) { return s.id === id; })[0];
}

function updateBar() {
    if (picked.length === 0) {
        $(".compare-bar").removeClass("show");
        return;
    }
    $(".compare-bar").addClass("show");

    const names = picked.map(function (id) { return findShoe(id).name; });
    if (picked.length === 2) {
        $(".compare-bar .names").text(names.join("  vs  "));
    } else {
        $(".compare-bar .names").text(names[0] + " - 1켤레 더 골라주세요");
    }
    $(".go-compare").prop("disabled", picked.length < 2);
}

//비교 담기 (카드는 다시 그려지므로 on으로 연결)
$(".shoe-list").on("click", ".cmp", function () {
    const id = $(this).data("id");
    const k = picked.indexOf(id);

    if (k !== -1) {
        picked.splice(k, 1);          // 이미 담겨 있으면 빼기
    } else {
        if (picked.length === 2) {
            picked.shift();           // 2개가 꽉 찼으면 먼저 담은 것을 빼고
        }
        picked.push(id);              // 새로 담기
    }
    showList();
    updateBar();
});

$(".compare-bar .clear").click(function () {
    picked = [];
    showList();
    updateBar();
});

$(".go-compare").click(function () {
    const a = findShoe(picked[0]);
    const b = findShoe(picked[1]);

    function row(title, va, vb, betterA, betterB) {
        return "<tr><th>" + title + "</th>"
            + '<td class="' + (betterA ? "better" : "") + '">' + va + "</td>"
            + '<td class="' + (betterB ? "better" : "") + '">' + vb + "</td></tr>";
    }
    function list(arr, names) {
        return arr.map(function (x) { return names[x]; }).join(", ");
    }

    let html = "<thead><tr><th></th>"
        + "<td>" + shoeImg(a) + "<strong>" + a.name + "</strong>" + a.brand + "</td>"
        + "<td>" + shoeImg(b) + "<strong>" + b.name + "</strong>" + b.brand + "</td>"
        + "</tr></thead><tbody>";
    html += row("가격", won(a.price), won(b.price), a.price < b.price, b.price < a.price);   // 더 싼 쪽 강조
    html += row("포지션", list(a.pos, posName), list(b.pos, posName));
    html += row("잘 맞는 플레이", list(a.style, styleName), list(b.style, styleName));
    html += row("쿠셔닝", a.cushion, b.cushion);
    html += row("무게감", a.weight, b.weight);
    html += row("넓은 발볼", a.wide ? "O" : "X", b.wide ? "O" : "X", a.wide && !b.wide, b.wide && !a.wide);
    html += "</tbody>";

    $(".cmp-table").html(html);
    $("#popup").fadeIn(200);
});

$(".close button").click(function () {
    $("#popup").fadeOut(200);
});
$("#popup").click(function (e) {
    if (e.target === this) {
        $("#popup").fadeOut(200);
    }
});
