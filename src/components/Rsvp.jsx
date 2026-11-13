import { CONFIG } from '../config.js';
import { SectionTitle } from './common.jsx';

export default function Rsvp() {
  if (!CONFIG.rsvpUrl) return null;
  return (
    <section className="section rsvp">
      <SectionTitle en="R.S.V.P" ko="참석 의사 전달" />
      <p className="sub reveal">
        특별한 날 귀한 걸음 해주시는 분들을
        <br />
        더욱 정성껏 모실 수 있도록 참석 여부를 알려주세요.
      </p>
      <a className="btn-gold reveal" href={CONFIG.rsvpUrl} target="_blank" rel="noreferrer">
        참석 의사 전달하기
      </a>
    </section>
  );
}
