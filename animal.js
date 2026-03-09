// ===== 카카오 SDK 초기화 =====
// ※ JavaScript 앱키를 아래에 입력하세요 (https://developers.kakao.com)
const KAKAO_APP_KEY = 'f7d5bff80bc9385e89fd3ab472528d77';

window.addEventListener('load', function () {
  if (typeof Kakao !== 'undefined' && KAKAO_APP_KEY !== 'YOUR_KAKAO_JAVASCRIPT_APP_KEY') {
    Kakao.init(KAKAO_APP_KEY);
  }
});

// ===== 질문 데이터 =====
const questions = [
  {
    text: '눈의 모양은 어떤가요?',
    emoji: '👀',
    options: [
      { emoji: '😺', text: '아몬드형 — 끝이 살짝 올라가 있어요', value: { cat: 3, fox: 2 } },
      { emoji: '🐶', text: '둥글고 큰 편이에요', value: { dog: 3, rabbit: 2, bear: 1 } },
      { emoji: '🦊', text: '날카롭고 가늘어요', value: { fox: 3, wolf: 2, tiger: 1 } },
      { emoji: '🦌', text: '크고 맑아요 — 초롱초롱한 느낌', value: { deer: 3, rabbit: 2 } },
    ],
  },
  {
    text: '코의 모양은 어떤가요?',
    emoji: '👃',
    options: [
      { emoji: '🐱', text: '작고 오뚝해요', value: { cat: 2, fox: 2, rabbit: 1 } },
      { emoji: '🐻', text: '넓고 둥그스름해요', value: { bear: 3, dog: 2 } },
      { emoji: '🐯', text: '콧방울이 크고 힘 있어요', value: { tiger: 3, wolf: 2 } },
      { emoji: '🦋', text: '작고 날렵한 편이에요', value: { deer: 2, rabbit: 2, fox: 1 } },
    ],
  },
  {
    text: '입술과 입의 특징은?',
    emoji: '👄',
    options: [
      { emoji: '😊', text: '작고 도톰해요', value: { cat: 2, rabbit: 3 } },
      { emoji: '😄', text: '크고 입꼬리가 올라가요', value: { dog: 3, bear: 2 } },
      { emoji: '😏', text: '얇고 날렵해요', value: { fox: 3, wolf: 2, tiger: 1 } },
      { emoji: '🥹', text: '보통이지만 입술이 예뻐요', value: { deer: 3, rabbit: 1 } },
    ],
  },
  {
    text: '얼굴형은 어떤가요?',
    emoji: '🫦',
    options: [
      { emoji: '🟡', text: '둥근형 — 볼이 통통해요', value: { dog: 2, bear: 3, rabbit: 1 } },
      { emoji: '🫐', text: '달걀형 — 이마가 넓고 턱이 갸름해요', value: { cat: 2, fox: 2, deer: 2 } },
      { emoji: '🔷', text: '각진형 — 턱선이 뚜렷해요', value: { tiger: 3, wolf: 3 } },
      { emoji: '🫀', text: '하트형 — 광대가 살짝 있어요', value: { fox: 3, cat: 1, rabbit: 1 } },
    ],
  },
  {
    text: '처음 만난 사람들이 나에게 느끼는 첫인상은?',
    emoji: '🤝',
    options: [
      { emoji: '😎', text: '도도하고 시크해 보인다', value: { cat: 3, fox: 2 } },
      { emoji: '🥰', text: '친근하고 편안해 보인다', value: { dog: 3, bear: 2, rabbit: 1 } },
      { emoji: '😤', text: '카리스마 있고 강해 보인다', value: { tiger: 3, wolf: 3 } },
      { emoji: '🫣', text: '청순하고 순해 보인다', value: { deer: 3, rabbit: 2 } },
    ],
  },
  {
    text: '나의 성격에 가장 가까운 것은?',
    emoji: '🧠',
    options: [
      { emoji: '🐱', text: '독립적이고 자유로운 영혼', value: { cat: 3, fox: 1 } },
      { emoji: '🐶', text: '충성스럽고 사람을 좋아함', value: { dog: 3, bear: 1 } },
      { emoji: '🦊', text: '영리하고 전략적', value: { fox: 3, wolf: 2 } },
      { emoji: '🐰', text: '순하고 감성적', value: { rabbit: 3, deer: 2 } },
      { emoji: '🐯', text: '리더십 강하고 진취적', value: { tiger: 3, wolf: 1 } },
    ],
  },
  {
    text: '피부와 전체적인 분위기는?',
    emoji: '✨',
    options: [
      { emoji: '🌙', text: '신비롭고 쿨한 분위기', value: { cat: 2, wolf: 2, fox: 1 } },
      { emoji: '☀️', text: '밝고 건강한 분위기', value: { dog: 2, bear: 2, tiger: 1 } },
      { emoji: '🌸', text: '청순하고 맑은 분위기', value: { deer: 3, rabbit: 2 } },
      { emoji: '🔥', text: '강렬하고 카리스마 있는 분위기', value: { tiger: 2, wolf: 3, fox: 1 } },
    ],
  },
];

// ===== 동물 결과 데이터 =====
const animals = {
  cat: {
    emoji: '🐱',
    name: '고양이상',
    desc: '신비롭고 도도한 매력의 소유자입니다. 눈매가 날카롭고 독립적인 분위기를 풍겨 처음엔 차가워 보이지만, 친해지면 의외로 다정하고 애교가 넘칩니다. 섬세한 감수성과 뛰어난 심미안을 가지고 있어 예술적인 분야에서 두각을 나타내는 경우가 많습니다.',
    traits: ['신비로운', '도도한', '섬세한', '독립적', '감수성 풍부'],
    good: [{ emoji: '🐶', name: '강아지상' }, { emoji: '🦌', name: '사슴상' }],
    bad:  [{ emoji: '🐱', name: '고양이상' }, { emoji: '🦊', name: '여우상' }],
  },
  dog: {
    emoji: '🐶',
    name: '강아지상',
    desc: '친근하고 따뜻한 에너지로 주변 사람들에게 사랑받는 타입입니다. 둥글고 선한 눈매에 밝은 미소가 특징이며, 신뢰감을 주는 인상 덕분에 처음 보는 사람과도 금방 친해집니다. 의리와 정이 넘치고 팀워크를 중시합니다.',
    traits: ['친근한', '따뜻한', '의리 있는', '활발한', '신뢰감'],
    good: [{ emoji: '🐱', name: '고양이상' }, { emoji: '🐻', name: '곰상' }],
    bad:  [{ emoji: '🐯', name: '호랑이상' }, { emoji: '🐺', name: '늑대상' }],
  },
  fox: {
    emoji: '🦊',
    name: '여우상',
    desc: '영리하고 세련된 매력으로 사람들의 시선을 사로잡는 타입입니다. 하트형 얼굴에 날카로운 눈매가 특징이며, 상황 파악이 빠르고 화술이 뛰어납니다. 전략적인 사고와 뛰어난 적응력으로 어떤 환경에서도 두각을 나타냅니다.',
    traits: ['영리한', '세련된', '매력적', '전략적', '적응력'],
    good: [{ emoji: '🐶', name: '강아지상' }, { emoji: '🐰', name: '토끼상' }],
    bad:  [{ emoji: '🐯', name: '호랑이상' }, { emoji: '🐺', name: '늑대상' }],
  },
  rabbit: {
    emoji: '🐰',
    name: '토끼상',
    desc: '청순하고 사랑스러운 인상의 소유자입니다. 크고 맑은 눈과 작은 코, 도톰한 입술이 특징이며 보는 것만으로도 기분이 좋아지는 분위기를 가지고 있습니다. 감수성이 풍부하고 공감 능력이 뛰어나 주변 사람들의 마음을 잘 헤아립니다.',
    traits: ['청순한', '사랑스러운', '감성적', '공감 능력', '온화한'],
    good: [{ emoji: '🦊', name: '여우상' }, { emoji: '🐶', name: '강아지상' }],
    bad:  [{ emoji: '🐯', name: '호랑이상' }, { emoji: '🐺', name: '늑대상' }],
  },
  bear: {
    emoji: '🐻',
    name: '곰상',
    desc: '든든하고 포근한 매력의 소유자입니다. 넓은 이마와 둥그스름한 인상이 특징이며, 함께 있으면 편안함을 주는 타입입니다. 겉으로는 강해 보이지만 속은 따뜻하고 섬세한 반전 매력이 있습니다. 한번 믿으면 끝까지 지켜주는 의리파입니다.',
    traits: ['든든한', '포근한', '의리 있는', '반전 매력', '믿음직한'],
    good: [{ emoji: '🐶', name: '강아지상' }, { emoji: '🐰', name: '토끼상' }],
    bad:  [{ emoji: '🦊', name: '여우상' }, { emoji: '🐱', name: '고양이상' }],
  },
  deer: {
    emoji: '🦌',
    name: '사슴상',
    desc: '우아하고 청아한 분위기의 소유자입니다. 초롱초롱한 큰 눈과 갸름한 얼굴형이 특징이며, 보는 것만으로도 기품이 느껴집니다. 섬세하고 예민한 감수성을 지니고 있어 예술적 재능이 뛰어나며, 선하고 순수한 이미지로 주변에 긍정적인 영향을 줍니다.',
    traits: ['우아한', '청아한', '기품 있는', '감수성', '선한'],
    good: [{ emoji: '🐱', name: '고양이상' }, { emoji: '🐶', name: '강아지상' }],
    bad:  [{ emoji: '🐯', name: '호랑이상' }, { emoji: '🐻', name: '곰상' }],
  },
  tiger: {
    emoji: '🐯',
    name: '호랑이상',
    desc: '강렬한 카리스마와 리더십을 갖춘 타입입니다. 뚜렷한 이목구비와 강한 눈빛이 특징이며, 처음 만나는 자리에서도 존재감이 남다릅니다. 진취적이고 도전을 즐기며 목표를 향해 직진하는 추진력을 가지고 있습니다. 주변 사람들에게 자연스럽게 의지가 되는 존재입니다.',
    traits: ['카리스마', '리더십', '강렬한', '추진력', '존재감'],
    good: [{ emoji: '🐶', name: '강아지상' }, { emoji: '🦌', name: '사슴상' }],
    bad:  [{ emoji: '🐯', name: '호랑이상' }, { emoji: '🐺', name: '늑대상' }],
  },
  wolf: {
    emoji: '🐺',
    name: '늑대상',
    desc: '날카롭고 신비로운 야성미를 가진 타입입니다. 강한 눈빛과 뚜렷한 턱선이 특징이며, 무리 속에서도 혼자 빛나는 독보적인 분위기를 풍깁니다. 겉으로는 냉철해 보이지만 믿는 사람에게는 한없이 헌신적입니다. 직관력과 판단력이 뛰어나 위기 상황에서 두각을 나타냅니다.',
    traits: ['야성적', '신비로운', '냉철한', '독보적', '직관력'],
    good: [{ emoji: '🦌', name: '사슴상' }, { emoji: '🐰', name: '토끼상' }],
    bad:  [{ emoji: '🐯', name: '호랑이상' }, { emoji: '🦊', name: '여우상' }],
  },
};

// ===== 퀴즈 상태 =====
let currentQ = 0;
let scores = { cat: 0, dog: 0, fox: 0, rabbit: 0, bear: 0, deer: 0, tiger: 0, wolf: 0 };

function startQuiz() {
  currentQ = 0;
  scores = { cat: 0, dog: 0, fox: 0, rabbit: 0, bear: 0, deer: 0, tiger: 0, wolf: 0 };
  document.getElementById('quiz-intro').style.display = 'none';
  document.getElementById('ad-intro').style.display = 'none';
  document.getElementById('quiz-result').style.display = 'none';
  document.getElementById('quiz-container').style.display = 'block';
  renderQuestion();
}

function renderQuestion() {
  const q = questions[currentQ];
  const total = questions.length;
  const pct = ((currentQ) / total) * 100;

  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-text').textContent = (currentQ + 1) + ' / ' + total;

  const wrap = document.getElementById('question-wrap');
  wrap.innerHTML = `
    <p class="question-num">질문 ${currentQ + 1}</p>
    <p class="question-text">${q.emoji} ${q.text}</p>
    <div class="options-grid">
      ${q.options.map((opt, i) => `
        <button class="option-btn" onclick="selectOption(${i})">
          <span class="opt-emoji">${opt.emoji}</span>
          <span>${opt.text}</span>
        </button>
      `).join('')}
    </div>
  `;
}

function selectOption(idx) {
  const opt = questions[currentQ].options[idx];
  Object.entries(opt.value).forEach(([animal, pts]) => {
    scores[animal] = (scores[animal] || 0) + pts;
  });

  currentQ++;
  if (currentQ < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById('quiz-container').style.display = 'none';

  const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  const animal = animals[top];

  document.getElementById('result-animal').textContent = animal.emoji;
  document.getElementById('result-name').textContent = animal.name;
  document.getElementById('result-desc').textContent = animal.desc;

  document.getElementById('result-traits').innerHTML =
    animal.traits.map(t => `<span class="trait-tag">${t}</span>`).join('');

  document.getElementById('result-compatibility').innerHTML = `
    <h4>궁합 분석</h4>
    <div class="compat-row">
      <span>💚</span>
      <span><strong>잘 맞는 상:</strong> ${animal.good.map(a => a.emoji + ' ' + a.name).join(', ')}</span>
    </div>
    <div class="compat-row">
      <span>💔</span>
      <span><strong>충돌하는 상:</strong> ${animal.bad.map(a => a.emoji + ' ' + a.name).join(', ')}</span>
    </div>
  `;

  document.getElementById('quiz-result').style.display = 'block';
  document.getElementById('quiz-result').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function restartQuiz() {
  document.getElementById('quiz-result').style.display = 'none';
  document.getElementById('quiz-intro').style.display = 'block';
  document.getElementById('ad-intro').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function shareKakao() {
  const name = document.getElementById('result-name').textContent;
  const emoji = document.getElementById('result-animal').textContent;

  if (typeof Kakao === 'undefined' || !Kakao.isInitialized()) {
    alert('카카오 앱키가 설정되지 않았습니다.\nanimal.js의 KAKAO_APP_KEY를 입력해 주세요.');
    return;
  }

  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: `나의 동물 관상은 ${emoji} ${name}!`,
      description: '7가지 질문으로 알아보는 나의 동물상은? 친구에게도 공유해보세요 🐾',
      imageUrl: 'https://via.placeholder.com/800x400/5b5ef4/ffffff?text=동물+관상+테스트',
      link: {
        mobileWebUrl: 'https://smartdaily.kr/animal.html',
        webUrl: 'https://smartdaily.kr/animal.html',
      },
    },
    buttons: [
      {
        title: '나도 테스트하기',
        link: {
          mobileWebUrl: 'https://smartdaily.kr/animal.html',
          webUrl: 'https://smartdaily.kr/animal.html',
        },
      },
    ],
  });
}

function shareResult() {
  const name = document.getElementById('result-name').textContent;
  const emoji = document.getElementById('result-animal').textContent;
  const text = `나의 동물 관상은 ${emoji} ${name}! 🐾 너는 어떤 동물상이야?`;
  const url = 'https://smartdaily.kr/animal.html';

  if (navigator.share) {
    navigator.share({ title: '동물 관상 테스트', text, url });
  } else {
    navigator.clipboard.writeText(`${text} → ${url}`)
      .then(() => alert('링크가 복사되었습니다!'));
  }
}
