import { useEffect, useState } from 'react';
import { CONFIG } from '../config.js';
import { WEDDING_TIME, dateKo, monthGrid } from '../utils.js';
import { SectionTitle } from './common.jsx';

const MONTH_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function useNow() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function Countdown() {
  const now = useNow();
  const { groom, bride } = CONFIG;
  const diff = WEDDING_TIME - now;

  if (diff <= 0) {
    const passed = Math.floor(-diff / 86400000);
    return (
      <p className="dday-text reveal">
        {passed === 0 ? '오늘, 두 사람이 부부가 됩니다.' : `${groom.first} ♥ ${bride.first}, 함께한 지 ${passed}일`}
      </p>
    );
  }

  const units = [
    ['DAYS', Math.floor(diff / 86400000)],
    ['HOUR', Math.floor(diff / 3600000) % 24],
    ['MIN', Math.floor(diff / 60000) % 60],
    ['SEC', Math.floor(diff / 1000) % 60],
  ];
  const kstToday = Math.floor((now + 9 * 3600000) / 86400000);
  const kstWedding = Math.floor((WEDDING_TIME + 9 * 3600000) / 86400000);
  const dday = kstWedding - kstToday;

  return (
    <>
      <div className="countdown reveal">
        {units.map(([label, v], i) => (
          <div className="cd-unit" key={label}>
            <span className="cd-num" key={v}>
              {String(v).padStart(2, '0')}
            </span>
            <span className="cd-label">{label}</span>
            {i < units.length - 1 && <span className="cd-colon">:</span>}
          </div>
        ))}
      </div>
      <p className="dday-text reveal">
        {groom.first} <span className="heart">♥</span> {bride.first}의 결혼식 <b>{dday ? `D-${dday}` : 'D-DAY'}</b>
      </p>
    </>
  );
}

export default function WeddingDay() {
  const { y, m, d } = CONFIG.date;
  const cells = monthGrid();

  return (
    <section className="section wedding-day">
      <SectionTitle en="WEDDING DAY" ko={dateKo()} />

      <div className="calendar reveal">
        <p className="cal-month">
          <span className="script">{MONTH_EN[m - 1]}</span>
          <span className="cal-year">{y}</span>
        </p>
        <div className="cal-grid">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((w, i) => (
            <span key={i} className={`cal-head ${i === 0 ? 'sun' : ''} ${i === 6 ? 'sat' : ''}`}>
              {w}
            </span>
          ))}
          {cells.map((day, i) => (
            <span
              key={i}
              className={`cal-day ${i % 7 === 0 ? 'sun' : ''} ${i % 7 === 6 ? 'sat' : ''} ${day === d ? 'active' : ''}`}
            >
              {day || ''}
            </span>
          ))}
        </div>
      </div>

      <Countdown />
    </section>
  );
}
