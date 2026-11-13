import { useState } from 'react';
import { CONFIG } from '../config.js';
import { copyText } from '../utils.js';
import { SectionTitle, useToast } from './common.jsx';

function AccountGroup({ title, accounts }) {
  const [open, setOpen] = useState(false);
  const toast = useToast();

  const copy = async (a) => {
    const ok = await copyText(`${a.bank} ${a.number}`);
    toast(ok ? '계좌번호가 복사되었습니다' : '복사에 실패했습니다');
  };

  return (
    <div className={`acc-group reveal ${open ? 'open' : ''}`}>
      <button className="acc-head" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span>{title}</span>
        <i className="chev" />
      </button>
      <div className="acc-body">
        <div className="acc-inner">
          {accounts.map((a) => (
            <div className="acc-row" key={a.role + a.number}>
              <div>
                <p className="acc-who">
                  <em>{a.role}</em> {a.name}
                </p>
                <p className="acc-num">
                  {a.bank} {a.number}
                </p>
              </div>
              <button className="chip" onClick={() => copy(a)}>
                복사
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Accounts() {
  const { groom, bride } = CONFIG;
  return (
    <section className="section accounts">
      <SectionTitle en="WITH HEART" ko="마음 전하실 곳" />
      <p className="sub reveal">
        참석이 어려우신 분들을 위해 계좌번호를 기재하였습니다.
        <br />
        너그러운 마음으로 양해 부탁드립니다.
      </p>
      <AccountGroup title="신랑측 계좌번호" accounts={groom.accounts} />
      <AccountGroup title="신부측 계좌번호" accounts={bride.accounts} />
    </section>
  );
}
