import { useEffect, useRef, useState } from 'react';
import { createMusicBox } from './music.js';
import { COVER } from './photos.js';
import { ToastProvider, useReveal } from './components/common.jsx';
import Intro from './components/Intro.jsx';
import Cover from './components/Cover.jsx';
import Greeting from './components/Greeting.jsx';
import WeddingDay from './components/WeddingDay.jsx';
import Gallery from './components/Gallery.jsx';
import Location from './components/Location.jsx';
import Accounts from './components/Accounts.jsx';
import Rsvp from './components/Rsvp.jsx';
import Ending from './components/Ending.jsx';
import Petals from './components/Petals.jsx';

function MusicButton({ visible }) {
  const box = useRef(null);
  const [on, setOn] = useState(false);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    if (!visible) return;
    setHint(true);
    const t = setTimeout(() => setHint(false), 4200);
    return () => clearTimeout(t);
  }, [visible]);

  const toggle = async () => {
    box.current ||= createMusicBox();
    setHint(false);
    if (box.current.playing) {
      box.current.stop();
      setOn(false);
    } else {
      await box.current.start();
      setOn(true);
    }
  };

  return (
    <div className={`music ${visible ? 'show' : ''}`}>
      <span className={`music-hint ${hint ? 'show' : ''}`}>♪ 음악을 켜보세요</span>
      <button className={`music-btn ${on ? 'on' : ''}`} onClick={toggle} aria-label={on ? '음악 끄기' : '음악 켜기'}>
        <span className="bars">
          <i />
          <i />
          <i />
          <i />
        </span>
      </button>
    </div>
  );
}

export default function App() {
  const [opened, setOpened] = useState(false);
  useReveal();

  return (
    <ToastProvider>
      <div className="backdrop" style={{ backgroundImage: `url(${COVER})` }} aria-hidden="true" />
      <main className="app">
        <Cover started={opened} />
        <Greeting />
        <WeddingDay />
        <Gallery />
        <Location />
        <Accounts />
        <Rsvp />
        <Ending />
      </main>
      <Petals />
      <MusicButton visible={opened} />
      {!opened && <Intro onDone={() => setOpened(true)} />}
    </ToastProvider>
  );
}
