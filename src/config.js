// 청첩장 내용은 이 파일만 고치면 됩니다. 수정 후 `npm run build`.
export const CONFIG = {
  // GitHub Pages 주소 (끝에 / 포함). 카카오톡 미리보기 이미지 절대경로에 쓰입니다.
  siteUrl: 'https://hojongyee.github.io/wedding/',

  // 카카오 JavaScript 키 (선택). 비워두면 '링크 복사'로 공유합니다.
  kakaoKey: '',

  // 참석 의사 구글폼 등 링크 (선택). 비워두면 섹션이 숨겨집니다.
  rsvpUrl: '',

  groom: {
    name: '문선준',
    first: '선준',
    en: 'Seonjun',
    father: '선준스 파더',
    mother: '선준스 마더',
    relation: '장남',
    phone: '010-0000-0000',
    fatherPhone: '010-0000-0000',
    motherPhone: '010-0000-0000',
    accounts: [
      { role: '신랑', name: '문선준', bank: '국민', number: '430502-01-266808' },
      { role: '아버지', name: '선준스 파더', bank: '국민', number: '430502-01-266808' },
      { role: '어머니', name: '선준스 마더', bank: '국민', number: '430502-01-266808' },
    ],
  },

  bride: {
    name: '이가은',
    first: '가은',
    en: 'Gaeun',
    father: '가은스 파더',
    mother: '가은스 마더',
    relation: '장녀',
    phone: '010-0000-0000',
    fatherPhone: '010-0000-0000',
    motherPhone: '010-0000-0000',
    accounts: [
      { role: '신부', name: '이가은', bank: '국민', number: '430502-01-266808' },
      { role: '아버지', name: '가은스 파더', bank: '국민', number: '430502-01-266808' },
      { role: '어머니', name: '가은스 마더', bank: '국민', number: '430502-01-266808' },
    ],
  },

  // 예식 일시 (한국 시간)
  date: { y: 2027, m: 4, d: 17, hh: 12, mm: 30 },

  venue: {
    name: '더 플라자 호텔 서울',
    hall: '22층 다이아몬드홀',
    address: '서울 중구 소공로 119',
    tel: '02-771-2200',
  },

  transport: [
    { title: '지하철', lines: ['1·2호선 시청역 6번 출구 도보 1분', '2호선 을지로입구역 1번 출구 도보 5분'] },
    { title: '버스', lines: ['시청앞·덕수궁 정류장 하차', '간선 103 · 150 · 401 · 402 · 501'] },
    { title: '주차', lines: ['호텔 지하주차장 2시간 무료', '주차 공간이 협소하니 대중교통을 권해드립니다'] },
  ],

  greeting: [
    '서로 다른 길을 걸어온 두 사람이',
    '이제 같은 곳을 바라보며',
    '한 길을 함께 걸어가려 합니다.',
    '',
    '저희의 새로운 시작을',
    '가까이에서 축복해 주시면',
    '더없는 기쁨으로 간직하겠습니다.',
  ],

  closing: '함께해 주시는 모든 분들께\n진심으로 감사드립니다.',
};
