// 농구화 데이터 (메인·농구화 추천 페이지에서 같이 사용)
// ※ 가격과 특징은 학습용 참고 정보입니다. 실제 판매가·사양은 구매 전에 꼭 확인하세요.
// pos: 잘 맞는 포지션 (guard 가드 / forward 포워드 / center 센터)
// style: 잘 맞는 플레이 (speed 돌파·방향전환 / shoot 슛 / power 몸싸움·리바운드 / all 골고루)
// wide: 발볼 넓은 사람에게 추천하는지
// img: 제품 사진 (각 브랜드·판매처 이미지) / 사진을 못 불러오면 colors로 그린 일러스트가 대신 나옴
// colors: 신발 그림 색 [갑피, 포인트, 미드솔, 밑창]

const shoes = [
    { id: "giannis4", brand: "Nike", name: "Giannis Immortality 4", img: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/374678a7-9200-4127-9fd0-34d55ce6b8c8/GIANNIS+IMMORTALITY+4+EP.png",
      price: 109000, pos: ["guard", "forward"], style: ["all"], wide: false, cushion: "균형", weight: "가벼움",
      desc: "가볍고 무난한 입문용. 첫 농구화로 가장 많이 고르는 가성비 모델", colors: ["#f4efe6", "#e8590c", "#ffffff", "#2b2b2b"] },
    { id: "ja2", brand: "Nike", name: "Ja 2", img: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/cef4d529-bf61-4fa2-baa2-57309562b9b0/JA+2.png",
      price: 149000, pos: ["guard"], style: ["speed"], wide: false, cushion: "반응형", weight: "가벼움",
      desc: "바닥에 붙는 낮은 착화감. 돌파가 많은 가드에게", colors: ["#1d3557", "#f2c94c", "#ffffff", "#1d3557"] },
    { id: "sabrina2", brand: "Nike", name: "Sabrina 2", img: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/e18c7dbc-8775-44c9-98a6-973898d9f8c3/custom-nike-sabrina-2-by-you.png",
      price: 159000, pos: ["guard"], style: ["shoot", "speed"], wide: false, cushion: "반응형", weight: "가벼움",
      desc: "가볍고 접지력이 좋아 슛과 방향 전환이 많은 플레이에 잘 맞음", colors: ["#e9e4f7", "#7b61ff", "#ffffff", "#c9b8ff"] },
    { id: "gtcut3", brand: "Nike", name: "G.T. Cut 3", img: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/2862aaec-49ff-408c-a5e2-12a5de36dc7d/gt-cut-3-basketball-shoes-GLHCGc.png",
      price: 229000, pos: ["guard"], style: ["speed"], wide: false, cushion: "반응형", weight: "가벼움",
      desc: "코트 감각이 예민하게 느껴지는 고급 가드화", colors: ["#111111", "#e8590c", "#f5f2ec", "#e8590c"] },
    { id: "kd17", brand: "Nike", name: "KD 17", img: "https://www.nike.sa/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dw2ebb7beb/nk/72c/9/9/a/2/5/72c99a25_b72d_4ba0_8821_39efeab34826.png?sw=700&sh=700&sm=fit",
      price: 209000, pos: ["forward"], style: ["shoot", "all"], wide: false, cushion: "균형", weight: "보통",
      desc: "쿠션과 안정감의 균형이 좋아 슛 많은 포워드에게 무난", colors: ["#d8e6f3", "#1d3557", "#ffffff", "#5b7da8"] },
    { id: "witness8", brand: "Nike", name: "LeBron Witness 8", img: "https://www.nike.ae/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dwf2c3496e/nk/29b/9/e/9/a/a/29b9e9aa_a247_4728_a1b8_d021226a8dd8.jpg?sw=700&sh=700&sm=fit",
      price: 139000, pos: ["forward", "center"], style: ["power"], wide: true, cushion: "푹신함", weight: "묵직함",
      desc: "넉넉한 쿠션과 넓은 바닥. 몸싸움 많은 포지션의 가성비 선택", colors: ["#5a1e2b", "#f2c94c", "#f5f2ec", "#3a131c"] },
    { id: "lebron22", brand: "Nike", name: "LeBron XXII", img: "https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto/4cc2f96b-772f-44ac-8042-bf68c3534616/LEBRON+XXII+NRG+EP.png",
      price: 259000, pos: ["forward", "center"], style: ["power"], wide: true, cushion: "푹신함", weight: "묵직함",
      desc: "착지 충격을 잘 잡아주는 최상급 쿠션. 센터·파워포워드용", colors: ["#2b2b2b", "#c8a24a", "#ffffff", "#111111"] },
    { id: "dame9", brand: "adidas", name: "Dame 9", img: "https://assets.adidas.com/images/w_600,f_auto,q_auto/0fc6b440dfe54328aa1d33f1207bc742_9366/Dame_9_Shoes_Blue_JH6625_01_00_standard.jpg",
      price: 129000, pos: ["guard"], style: ["speed", "shoot"], wide: false, cushion: "균형", weight: "가벼움",
      desc: "합리적인 가격에 가볍게 신는 가드용", colors: ["#ffffff", "#d62828", "#f1f1f1", "#d62828"] },
    { id: "ae1", brand: "adidas", name: "AE 1", img: "https://assets.adidas.com/images/w_600,f_auto,q_auto/f4777f527d1849ecb31024a2e51ca3de_9366/IG6669_01_00_standard.jpg",
      price: 159000, pos: ["guard", "forward"], style: ["all", "power"], wide: false, cushion: "균형", weight: "보통",
      desc: "단단하게 잡아주는 지지력. 공수 모두 활발한 플레이어에게", colors: ["#9fd8cb", "#111111", "#ffffff", "#2a9d8f"] },
    { id: "harden8", brand: "adidas", name: "Harden Vol. 8", img: "https://assets.adidas.com/images/w_600,f_auto,q_auto/b59ecde63c134aecb67e95c19bcb592f_9366/Harden_Volume_8_Shoes_Red_IG6588_01_standard.jpg",
      price: 199000, pos: ["guard", "forward"], style: ["shoot"], wide: true, cushion: "푹신함", weight: "보통",
      desc: "넓은 발볼과 푹신한 쿠션. 발볼 때문에 고민인 사람에게", colors: ["#f4a261", "#264653", "#fff4e6", "#264653"] },
    { id: "allpro", brand: "PUMA", name: "All-Pro Nitro", img: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/309688/01/sv01/fnd/PHL/fmt/png/All-Pro-NITRO-Unisex-Basketball-Shoes",
      price: 149000, pos: ["guard", "forward", "center"], style: ["all"], wide: false, cushion: "균형", weight: "가벼움",
      desc: "어느 포지션이든 무난하게 신는 올라운더", colors: ["#ffffff", "#e8590c", "#ffffff", "#1d3557"] },
    { id: "mb03", brand: "PUMA", name: "MB.03", img: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/378916/01/sv01/fnd/PNA/fmt/png/PUMA-x-LAMELO-BALL-MB.03-Toxic-Basketball-Shoes",
      price: 169000, pos: ["guard", "forward"], style: ["speed"], wide: false, cushion: "반응형", weight: "보통",
      desc: "튀는 디자인과 통통 튀는 쿠션 반응", colors: ["#3ddc97", "#ff4f8b", "#f9f871", "#111111"] },
    { id: "curry11", brand: "Under Armour", name: "Curry 11", img: "https://underarmour.scene7.com/is/image/Underarmour/3027725-400_DEFAULT?rp=standard-30pad|pdpZoomDesktop&scl=1&fmt=jpg&qlt=85&wid=700&hei=700",
      price: 219000, pos: ["guard"], style: ["shoot", "speed"], wide: false, cushion: "반응형", weight: "가벼움",
      desc: "고무 대신 특수 폼으로 만든 밑창이라 접지력이 뛰어난 슈터용", colors: ["#f5f2ec", "#1d3557", "#f2c94c", "#1d3557"] },
    { id: "twowxy4", brand: "New Balance", name: "TWO WXY v4", img: "https://www.tradeinn.com/f/14012/140124067/new-balance-two-wxy-v4-basketball-shoes.webp",
      price: 179000, pos: ["forward"], style: ["all"], wide: true, cushion: "균형", weight: "보통",
      desc: "발볼 넓은 사람도 편하게 신는 올라운드화", colors: ["#d9d4cc", "#c1121f", "#ffffff", "#6c757d"] },
    { id: "wow10", brand: "Li-Ning", name: "Way of Wade 10", img: "https://wowsole.com/wp-content/uploads/2023/05/Way-of-Wade-10-South-Beach-1200x1200.jpg",
      price: 249000, pos: ["guard", "forward"], style: ["all"], wide: false, cushion: "푹신함", weight: "보통",
      desc: "고급 쿠션과 마감. 오래 신을 신발을 찾는다면", colors: ["#111111", "#ffffff", "#e9ecef", "#e63946"] },
    { id: "kai1", brand: "ANTA", name: "KAI 1", img: "https://anta.com/cdn/shop/files/01_d9df7080-7d82-4beb-9444-523c7c94bdaa.jpg?v=1737448782&width=700",
      price: 169000, pos: ["guard"], style: ["speed"], wide: false, cushion: "반응형", weight: "가벼움",
      desc: "빠른 방향 전환에 강한 가드용 시그니처", colors: ["#fefae0", "#606c38", "#ffffff", "#283618"] }
];

// 포지션·스타일 한글 이름
const posName = { guard: "가드", forward: "포워드", center: "센터" };
const styleName = { speed: "돌파·방향전환", shoot: "슛", power: "몸싸움·리바운드", all: "올라운드" };

// 가격을 "149,000원" 형태로
function won(n) {
    return n.toLocaleString("ko-KR") + "원";
}

// 신발 옆모습 그림 (색만 바꿔서 16켤레를 모두 그림)
function shoeSVG(c) {
    const line = '" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>';
    return '<svg class="shoe" viewBox="0 0 252 136" aria-hidden="true">'
        + '<path d="M12 112 Q10 126 24 126 L224 126 Q240 126 238 112 Z" fill="' + c[3] + line                                   // 밑창
        + '<path d="M12 92 H228 Q242 92 240 104 Q239 112 231 112 H17 Q8 112 8 103 Q8 92 12 92 Z" fill="' + c[2] + line          // 미드솔
        + '<path d="M26 102 H196" stroke="' + c[1] + '" stroke-width="3" stroke-linecap="round"/>'                              // 미드솔 줄
        + '<path d="M14 92 C8 66 10 36 20 18 C28 10 44 10 56 16 C64 20 72 22 80 18 L94 7 C100 3 108 5 110 13 L122 44 C144 54 172 58 198 64 C224 70 238 80 236 92 Z" fill="' + c[0] + line   // 갑피
        + '<path d="M14 92 C8 68 10 46 18 28 L38 34 C32 54 32 74 36 92 Z" fill="' + c[1] + line                                  // 뒤꿈치
        + '<path d="M188 62 C214 66 236 78 236 92 L194 92 C190 82 186 72 188 62 Z" fill="' + c[1] + line                         // 앞코
        + '<path d="M52 84 C90 58 144 50 182 56 C146 64 108 74 74 92 L56 92 Z" fill="' + c[1] + line                             // 옆 라인
        + '<path d="M16 22 L10 8 L22 6 L27 16 Z" fill="' + c[1] + line                                                           // 뒤꿈치 탭
        + '<path d="M22 20 C30 12 44 12 54 18 C44 20 34 22 24 28 Z" fill="#111"/>'                                               // 발목 안감
        + '<path d="M100 18 l12 -5 M106 27 l12 -5 M112 36 l12 -5 M118 45 l12 -5" stroke="#111" stroke-width="3" stroke-linecap="round"/>'   // 신발끈
        + '</svg>';
}

// 신발 사진 - 사진을 못 불러오면(onerror) 같은 자리에 일러스트를 그려 넣음
// referrerpolicy="no-referrer": 다른 사이트 이미지를 가져올 때 막히지 않게
function shoeImg(s) {
    return '<img class="shoe-photo" src="' + s.img + '" alt="' + s.brand + ' ' + s.name + '" loading="lazy"'
        + ' referrerpolicy="no-referrer" data-id="' + s.id + '" onerror="noImg(this)">';
}

function noImg(img) {
    const id = $(img).data("id");
    const s = shoes.filter(function (x) { return x.id === id; })[0];
    $(img).replaceWith(shoeSVG(s.colors));
}
