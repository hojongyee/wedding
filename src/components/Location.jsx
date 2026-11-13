import { CONFIG } from '../config.js';
import { copyText } from '../utils.js';
import { SectionTitle, useToast } from './common.jsx';

export default function Location() {
  const toast = useToast();
  const { venue, transport } = CONFIG;
  const q = encodeURIComponent(venue.name);
  const addr = encodeURIComponent(venue.address);

  const copyAddress = async () => {
    const ok = await copyText(venue.address);
    toast(ok ? '주소가 복사되었습니다' : '복사에 실패했습니다');
  };

  return (
    <section className="section location">
      <SectionTitle en="LOCATION" ko="오시는 길" />

      <div className="venue reveal">
        <p className="venue-name">{venue.name}</p>
        <p className="venue-hall">{venue.hall}</p>
        <p className="venue-addr">
          {venue.address}
          <button className="chip" onClick={copyAddress}>
            복사
          </button>
        </p>
        {venue.tel && (
          <a className="venue-tel" href={`tel:${venue.tel}`}>
            Tel. {venue.tel}
          </a>
        )}
      </div>

      <div className="map-frame reveal">
        <iframe
          title="예식장 지도"
          src={`https://maps.google.com/maps?q=${addr}&z=16&hl=ko&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="nav-buttons reveal">
        <a href={`https://map.naver.com/p/search/${q}`} target="_blank" rel="noreferrer">
          <i className="dot naver" />
          네이버지도
        </a>
        <a href={`https://map.kakao.com/link/search/${q}`} target="_blank" rel="noreferrer">
          <i className="dot kakao" />
          카카오맵
        </a>
        <a href={`tmap://search?name=${q}`}>
          <i className="dot tmap" />
          티맵
        </a>
      </div>

      <dl className="transport">
        {transport.map((t) => (
          <div className="transport-item reveal" key={t.title}>
            <dt>{t.title}</dt>
            <dd>
              {t.lines.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
