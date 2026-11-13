import { useEffect, useState } from 'react';
import { CONFIG } from '../config.js';
import { dateDot, lockScroll } from '../utils.js';

export default function Intro({ onDone }) {
  const [opening, setOpening] = useState(false);
  const { groom, bride } = CONFIG;

  useEffect(() => {
    lockScroll(true);
    return () => lockScroll(false);
  }, []);

  const open = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onDone, 1700);
  };

  return (
    <div className={`intro ${opening ? 'opening' : ''}`} onClick={open} role="button" aria-label="청첩장 열기">
      <div className="door left">
        <div className="door-frame" />
      </div>
      <div className="door right">
        <div className="door-frame" />
      </div>

      <div className="intro-content">
        <p className="intro-eyebrow">WEDDING INVITATION</p>
        <p className="intro-names">
          {groom.en} <span>&amp;</span> {bride.en}
        </p>
        <div className="seal">
          <div className="seal-ring" />
          <span className="seal-mono">
            {groom.en[0]}
            <i>&amp;</i>
            {bride.en[0]}
          </span>
        </div>
        <p className="intro-date">{dateDot()}</p>
        <p className="intro-hint">터치하여 열어보세요</p>
      </div>
    </div>
  );
}
