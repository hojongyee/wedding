import { CONFIG } from '../config.js';
import { COVER } from '../photos.js';
import { dateDot, timeEn } from '../utils.js';

export default function Cover({ started }) {
  const { groom, bride, venue } = CONFIG;
  return (
    <section className={`cover ${started ? 'play' : ''}`}>
      <div className="cover-img" style={{ backgroundImage: `url(${COVER})` }} />
      <div className="cover-shade" />
      <div className="cover-top">
        <p className="cover-eyebrow">THE WEDDING OF</p>
        <h1 className="script gold-foil">We're getting married</h1>
      </div>
      <div className="cover-bottom">
        <p className="cover-names">
          {groom.name}
          <span className="amp">&amp;</span>
          {bride.name}
        </p>
        <div className="cover-line" />
        <p className="cover-date">
          {dateDot()} &nbsp;·&nbsp; {timeEn()}
        </p>
        <p className="cover-venue">
          {venue.name} {venue.hall}
        </p>
      </div>
      <div className="scroll-hint" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
