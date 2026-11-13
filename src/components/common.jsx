import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { lockScroll } from '../utils.js';

export const Overlay = ({ children }) => createPortal(children, document.body);

export function Ornament({ className = '' }) {
  return (
    <svg className={`ornament ${className}`} viewBox="0 0 220 20" aria-hidden="true">
      <defs>
        <linearGradient id="orn-g" x1="0" x2="1">
          <stop offset="0" stopColor="#c9a25a" stopOpacity="0" />
          <stop offset=".5" stopColor="#c9a25a" />
          <stop offset="1" stopColor="#c9a25a" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" y1="10" x2="92" y2="10" stroke="url(#orn-g)" strokeWidth="1" />
      <line x1="128" y1="10" x2="220" y2="10" stroke="url(#orn-g)" strokeWidth="1" />
      <path d="M110 2 L118 10 L110 18 L102 10 Z" fill="none" stroke="#c9a25a" strokeWidth="1" />
      <circle cx="110" cy="10" r="2.2" fill="#c9a25a" />
      <circle cx="96" cy="10" r="1.2" fill="#c9a25a" />
      <circle cx="124" cy="10" r="1.2" fill="#c9a25a" />
    </svg>
  );
}

export function SectionTitle({ en, ko }) {
  return (
    <header className="section-title reveal">
      <p className="eyebrow">{en}</p>
      <h2>{ko}</h2>
      <Ornament />
    </header>
  );
}

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.setAttribute('data-in', ''));
      return;
    }
    // className 은 React 가 다시 쓰므로 표시 상태는 data 속성으로 둔다.
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute('data-in', '');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <Overlay>
      <div className="modal" role="dialog" aria-modal="true" onClick={onClose}>
        <div className="modal-card" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose} aria-label="닫기">
            ×
          </button>
          {title && <h3 className="modal-title">{title}</h3>}
          {children}
        </div>
      </div>
    </Overlay>
  );
}

const ToastCtx = createContext(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState('');
  const timer = useRef(0);
  const show = useCallback((text) => {
    setMsg(text);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(''), 2000);
  }, []);
  return (
    <ToastCtx.Provider value={show}>
      {children}
      <div className={`toast ${msg ? 'show' : ''}`} role="status">
        {msg}
      </div>
    </ToastCtx.Provider>
  );
}
