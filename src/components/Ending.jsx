import { CONFIG } from '../config.js';
import { ENDING } from '../photos.js';
import { copyText, dateKo } from '../utils.js';
import { useToast } from './common.jsx';

const KAKAO_SDK = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';

function loadKakao(key) {
  return new Promise((resolve, reject) => {
    const init = () => {
      if (!window.Kakao.isInitialized()) window.Kakao.init(key);
      resolve(window.Kakao);
    };
    if (window.Kakao) return init();
    const s = document.createElement('script');
    s.src = KAKAO_SDK;
    s.onload = init;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

const pageUrl = () => location.href.split('#')[0];

export default function Ending() {
  const toast = useToast();
  const { groom, bride, venue, closing, kakaoKey, siteUrl } = CONFIG;
  const title = `${groom.name} ♥ ${bride.name} 결혼합니다`;

  const copyLink = async () => {
    const ok = await copyText(pageUrl());
    toast(ok ? '링크가 복사되었습니다. 카카오톡에 붙여넣어 주세요' : '복사에 실패했습니다');
  };

  const shareKakao = async () => {
    if (!kakaoKey) {
      if (navigator.share) {
        try {
          await navigator.share({ title, text: dateKo(), url: pageUrl() });
          return;
        } catch (e) {
          if (e.name === 'AbortError') return;
        }
      }
      return copyLink();
    }
    try {
      const Kakao = await loadKakao(kakaoKey);
      const url = pageUrl();
      Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title,
          description: `${dateKo()}\n${venue.name} ${venue.hall}`,
          imageUrl: `${siteUrl}og.jpg?v=1`,
          imageWidth: 800,
          imageHeight: 400,
          link: { mobileWebUrl: url, webUrl: url },
        },
        buttons: [{ title: '청첩장 보기', link: { mobileWebUrl: url, webUrl: url } }],
      });
    } catch {
      copyLink();
    }
  };

  return (
    <section className="ending">
      <div className="ending-photo reveal">
        <img src={ENDING} alt="" loading="lazy" />
        <div className="ending-shade" />
        <p className="script gold-foil ending-thanks">Thank you</p>
      </div>
      <p className="ending-text reveal">
        {closing.split('\n').map((l, i) => (
          <span key={i}>
            {l}
            <br />
          </span>
        ))}
      </p>
      <p className="ending-sign reveal">
        {groom.first} <span>&amp;</span> {bride.first}
      </p>

      <div className="share reveal">
        <button className="btn-kakao" onClick={shareKakao}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3C6.5 3 2 6.5 2 10.8c0 2.8 1.9 5.2 4.7 6.6l-1 3.6c-.1.3.3.6.6.4l4.2-2.8c.5.1 1 .1 1.5.1 5.5 0 10-3.5 10-7.9S17.5 3 12 3z" />
          </svg>
          카카오톡으로 공유하기
        </button>
        <button className="btn-outline" onClick={copyLink}>
          청첩장 주소 복사하기
        </button>
      </div>

      <footer className="footer">
        <p className="script">
          {groom.en} &amp; {bride.en}
        </p>
        <p>© {CONFIG.date.y} Our Wedding Day</p>
      </footer>
    </section>
  );
}
