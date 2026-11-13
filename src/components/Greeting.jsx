import { useState } from 'react';
import { CONFIG } from '../config.js';
import { Modal, Ornament, SectionTitle } from './common.jsx';

function ContactRow({ label, name, phone }) {
  if (!phone) return null;
  return (
    <li className="contact-row">
      <span className="contact-label">{label}</span>
      <span className="contact-name">{name}</span>
      <a className="icon-btn" href={`tel:${phone}`} aria-label={`${name}에게 전화`}>
        <svg viewBox="0 0 24 24"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z" /></svg>
      </a>
      <a className="icon-btn" href={`sms:${phone}`} aria-label={`${name}에게 문자`}>
        <svg viewBox="0 0 24 24"><path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" /></svg>
      </a>
    </li>
  );
}

export default function Greeting() {
  const [open, setOpen] = useState(false);
  const { groom, bride, greeting } = CONFIG;

  return (
    <section className="section greeting">
      <SectionTitle en="INVITATION" ko="소중한 분들을 초대합니다" />

      <div className="greeting-text reveal">
        {greeting.map((line, i) => (line ? <p key={i}>{line}</p> : <br key={i} />))}
      </div>

      <Ornament className="reveal" />

      <div className="parents reveal">
        <p>
          <span className="parent-names">
            {groom.father} · {groom.mother}
          </span>
          <span className="rel">의 {groom.relation}</span>
          <strong>{groom.first}</strong>
        </p>
        <p>
          <span className="parent-names">
            {bride.father} · {bride.mother}
          </span>
          <span className="rel">의 {bride.relation}</span>
          <strong>{bride.first}</strong>
        </p>
      </div>

      <button className="btn-outline reveal" onClick={() => setOpen(true)}>
        혼주에게 연락하기
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="연락하기">
        <div className="contact-group">
          <p className="contact-side">신랑측 <em>GROOM</em></p>
          <ul>
            <ContactRow label="신랑" name={groom.name} phone={groom.phone} />
            <ContactRow label="아버지" name={groom.father} phone={groom.fatherPhone} />
            <ContactRow label="어머니" name={groom.mother} phone={groom.motherPhone} />
          </ul>
        </div>
        <div className="contact-group">
          <p className="contact-side">신부측 <em>BRIDE</em></p>
          <ul>
            <ContactRow label="신부" name={bride.name} phone={bride.phone} />
            <ContactRow label="아버지" name={bride.father} phone={bride.fatherPhone} />
            <ContactRow label="어머니" name={bride.mother} phone={bride.motherPhone} />
          </ul>
        </div>
      </Modal>
    </section>
  );
}
