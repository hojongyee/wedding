import { useCallback, useEffect, useRef, useState } from 'react';
import { GALLERY } from '../photos.js';
import { lockScroll } from '../utils.js';
import { Overlay, SectionTitle } from './common.jsx';

function Lightbox({ index, onClose, onMove }) {
  const touch = useRef(null);
  const [dx, setDx] = useState(0);

  useEffect(() => {
    lockScroll(true);
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onMove(-1);
      if (e.key === 'ArrowRight') onMove(1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, onMove]);

  const onStart = (e) => {
    touch.current = e.touches[0].clientX;
  };
  const onTouchMove = (e) => {
    if (touch.current != null) setDx(e.touches[0].clientX - touch.current);
  };
  const onEnd = () => {
    if (Math.abs(dx) > 50) onMove(dx < 0 ? 1 : -1);
    touch.current = null;
    setDx(0);
  };

  const item = GALLERY[index];
  return (
    <div className="lightbox" role="dialog" aria-modal="true" onClick={onClose}>
      <p className="lb-count">
        {String(index + 1).padStart(2, '0')} <span>/ {String(GALLERY.length).padStart(2, '0')}</span>
      </p>
      <button className="lb-close" onClick={onClose} aria-label="닫기">
        ×
      </button>
      <div
        className="lb-stage"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onEnd}
      >
        <img
          key={index}
          src={item.src}
          alt={item.caption}
          style={{ transform: `translateX(${dx}px)`, transition: dx ? 'none' : undefined }}
        />
      </div>
      <p className="lb-caption script">{item.caption}</p>
      <button className="lb-nav prev" onClick={(e) => (e.stopPropagation(), onMove(-1))} aria-label="이전 사진">
        ‹
      </button>
      <button className="lb-nav next" onClick={(e) => (e.stopPropagation(), onMove(1))} aria-label="다음 사진">
        ›
      </button>
    </div>
  );
}

export default function Gallery() {
  const [index, setIndex] = useState(-1);
  const close = useCallback(() => setIndex(-1), []);
  const move = useCallback((step) => setIndex((i) => (i + step + GALLERY.length) % GALLERY.length), []);

  return (
    <section className="section gallery">
      <SectionTitle en="OUR MOMENTS" ko="우리의 순간들" />
      <div className="moodboard">
        {GALLERY.map((p, i) => (
          <button
            key={i}
            className={`mood-item reveal area-${p.area}`}
            style={{ transitionDelay: `${i * 90}ms` }}
            onClick={() => setIndex(i)}
            aria-label={`${p.caption} 크게 보기`}
          >
            <img src={p.src} alt={p.caption} style={{ objectPosition: p.pos }} loading="lazy" />
            <span className="mood-no">{String(i + 1).padStart(2, '0')}</span>
          </button>
        ))}
      </div>
      <p className="hint reveal">사진을 누르면 크게 볼 수 있어요</p>
      {index >= 0 && (
        <Overlay>
          <Lightbox index={index} onClose={close} onMove={move} />
        </Overlay>
      )}
    </section>
  );
}
