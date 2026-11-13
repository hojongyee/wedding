import { CONFIG } from './config.js';

const WEEK_KO = ['일', '월', '화', '수', '목', '금', '토'];
const WEEK_EN = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const { y, m, d, hh, mm } = CONFIG.date;

export const WEDDING_TIME = Date.UTC(y, m - 1, d, hh - 9, mm);
export const WEEKDAY = new Date(Date.UTC(y, m - 1, d)).getUTCDay();

const pad = (n) => String(n).padStart(2, '0');

export function timeKo() {
  const ampm = hh < 12 ? '오전' : '오후';
  const h12 = hh % 12 || 12;
  return `${ampm} ${h12}시${mm ? ` ${mm}분` : ''}`;
}

export const dateKo = () => `${y}년 ${m}월 ${d}일 ${WEEK_KO[WEEKDAY]}요일 ${timeKo()}`;
export const dateDot = () => `${y}. ${pad(m)}. ${pad(d)}. ${WEEK_EN[WEEKDAY]}`;
export const timeEn = () => `${hh % 12 || 12}:${pad(mm)} ${hh < 12 ? 'AM' : 'PM'}`;

export function monthGrid() {
  const first = new Date(Date.UTC(y, m - 1, 1)).getUTCDay();
  const days = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const cells = Array(first).fill(null);
  for (let i = 1; i <= days; i++) cells.push(i);
  while (cells.length % 7) cells.push(null);
  return cells;
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {}
    ta.remove();
    return ok;
  }
}

let locks = 0;
export function lockScroll(lock) {
  locks = Math.max(0, locks + (lock ? 1 : -1));
  const v = locks ? 'hidden' : '';
  document.documentElement.style.overflow = v;
  document.body.style.overflow = v;
}
