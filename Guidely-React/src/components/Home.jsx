import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import { FaArrowRight } from 'react-icons/fa';
import './Home.css';


// hook de comptage
const useCounter = (target, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
          start += step;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(start);
          }
        }, 16);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
};
const StatItem = ({ target, label }) => {
  const { count, ref } = useCounter(target);
  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-number">+{count}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

const Home = () => {
  return (
    <>
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-tower" />
        <div className="hero-content">
          <h1>Bienvenue sur Guidely !</h1>
          <p>
            Découvrez des expériences authentiques avec des guides locaux de confiance.
            Guidely aide les touristes à explorer les villes, les monuments et les lieux cachés
            tout en réservant facilement un guide professionnel selon la langue, le prix et
            l'expérience. Que vous souhaitiez visiter des sites célèbres ou vivre une aventure
            locale unique, notre plateforme vous connecte avec le guide idéal pour un voyage
            inoubliable.
          </p>
          <button className="btn-hero">Click Here</button>
        </div>
      </section>

     <section className="stats">
        <StatItem target={125} label="Touriste satisfaits" />
        <StatItem target={48}  label="Guides certifiés"   />
        <StatItem target={12}  label="Villes couvertes"   />
      </section>

      {/* ===== VILLE SECTION ===== */}
      <section className="ville">
        <div className="ville-card">
          <div className="ville-text">
            <h2>MARRAKESH</h2>
            <p>
              Marrakesh est l'une des villes les plus célèbres du Maroc, connue pour son riche
              patrimoine historique, ses souks animés et son atmosphère unique. Surnommée la
              Ville Rouge, elle séduit les visiteurs par ses monuments emblématiques, ses jardins
              magnifiques et sa célèbre place Jemaa el-Fna, où se mêlent culture, traditions et
              divertissement. C'est une destination idéale pour découvrir l'authenticité et la
              beauté du Maroc.
            </p>
            <button className="btn-plus">
            Plus <FaArrowRight className="btn-icon" />
            </button>
          </div>
          <div className="ville-img">
            <img src="src/components/jamaa_fana_marrakech.jpg" alt="Marrakesh" />
          </div>
        </div>
      </section>

      {/* ===== VILLE SECTION ===== */}
      <section className="ville">
        <div className="ville-card">
            <div className="ville-img">
            <img src="src/components/Rabat_accueil.jpg" alt="Marrakesh" />
          </div>
          <div className="ville-text">
            <h2>RABAT</h2>
            <p>
              Rabat, capitale du Maroc, est une ville élégante qui allie histoire, modernité et calme. Connue pour ses monuments historiques, 
              ses jardins verdoyants et ses belles plages atlantiques, 
              elle offre un cadre agréable aux visiteurs. Avec ses sites 
              emblématiques comme la Tour Hassan et la Kasbah des Oudayas, Rabat est une destination idéale pour 
              découvrir la richesse culturelle du Maroc.
            </p>
            <button className="btn-plus">
            Plus <FaArrowRight className="btn-icon" />
            </button>
          </div>
          
        </div>
      </section>

        <section className="ville">
        <div className="ville-card">
          <div className="ville-text">
            <h2>TANGER</h2>
            <p>
              Tangier est une ville magnifique du nord du Maroc,
               située entre la mer Méditerranée et l’océan 
               Atlantique. Connue pour son histoire riche, 
               ses plages, sa médina authentique et ses paysages 
               exceptionnels, elle offre un mélange unique de 
               tradition et de modernité. C’est une destination 
               idéale pour découvrir la beauté et le charme du 
               nord du Maroc.
            </p>
            <button className="btn-plus">
            Plus <FaArrowRight className="btn-icon" />
            </button>
          </div>
          <div className="ville-img">
            <img src="src/components/TANGER.jpg" alt="Marrakesh" />
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section className="contact">
        <h2>NOUS CONTACTEZ</h2>
        <div className="contact-form">
          <div className="form-row">
            <input type="text" placeholder="Prénom" />
            <input type="text" placeholder="Name" />
          </div>
          <div className="form-full">
            <input type="email" placeholder="Email Address" />
          </div>
          <div className="form-full">
            <textarea placeholder="Message" rows={6} />
          </div>
          <div className="form-submit">
            <button type="button">Submit</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;