import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import { FaArrowRight } from 'react-icons/fa';
import { useScrollAnimation } from "./useScrollAnimation";
import './Home.css';

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

const activites = [
  {
    img: "src/components/Sahara.jpg",
    titre: "BALADE À DOS DE CHAMEAU",
    description: "Partez à la découverte des dunes dorées du Sahara sur le dos d'un chameau. Une expérience inoubliable au cœur du désert marocain avec un guide local.",
  },
  {
    img: "src/components/quad bike desert morocco dunes.jpg",
    titre: "QUAD DANS LE DÉSERT",
    description: "Survolez les palmeraies et les kasbahs de Marrakesh au lever du soleil. Une vue à couper le souffle sur les montagnes de l'Atlas et les jardins de la ville.",
  },
  {
    img: "src/components/hot air balloon marrakech morocco sunrise.jpg",
    titre: "VOL EN MONTGOLFIÈRE",
    description: "Survolez les palmeraies et les kasbahs de Marrakesh au lever du soleil. Une vue à couper le souffle sur les montagnes de l'Atlas et les jardins de la ville.",
  },
  {
    img: "src/components/medina marrakech souk guided tour.jpg",
    titre: "VISITE GUIDÉE DE LA MÉDINA",
    description: "Explorez les ruelles mystérieuses de la médina avec un guide certifié. Découvrez les souks, les mosquées et les palais cachés au cœur des villes impériales.",
  },
  {
    img: "src/components/surf taghazout morocco atlantic waves.jpg",
    titre: "SURF À TAGHAZOUT",
    description: "Taghazout est l'une des meilleures destinations surf d'Afrique. Profitez des vagues atlantiques avec des cours adaptés à tous les niveaux.",
  },
  {
    img: "src/components/moroccan food tagine couscous traditional.jpg",
    titre: "TOUR GASTRONOMIQUE",
    description: "Goûtez le tajine, le couscous et la pastilla dans les meilleures tables locales. Un voyage culinaire unique à travers les saveurs authentiques du Maroc.",
  },
];

const ActivitesSlider = () => {
  const [index, setIndex] = useState(0);
  const visible = 3;
  const ref = useScrollAnimation();

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(activites.length - visible, i + 1));

  return (
    <section className="activites animate-fade-up" ref={ref}>
      <div className="activites-header">
        <h2>Activités & Expériences</h2>
        <p>Découvrez ce que nos guides peuvent vous offrir</p>
      </div>

      <div className="activites-slider">
        <div
          className="activites-track"
          style={{ transform: `translateX(calc(-${index} * (350px + 24px)))` }}
        >
          {activites.map((act, i) => (
            <div className="activite-card" key={i}>
              <img src={act.img} alt={act.titre} />
              <div className="activite-body">
                <h3>{act.titre}</h3>
                <p>{act.description}</p>
                <span className="activite-link">Discover More</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="activites-nav">
        <button className="nav-arrow" onClick={prev} disabled={index === 0}>←</button>
        <button className="nav-arrow" onClick={next} disabled={index >= activites.length - visible}>→</button>
      </div>
    </section>
  );
};

const Home = () => {
   const statsRef      = useScrollAnimation();
  const ville1Ref     = useScrollAnimation();
  const ville2Ref     = useScrollAnimation();
  const ville3Ref     = useScrollAnimation();
  const ville4Ref     = useScrollAnimation();
  const ville5Ref     = useScrollAnimation();
  const ville6Ref     = useScrollAnimation();
  const galerieRef    = useScrollAnimation();
  const contactRef    = useScrollAnimation();

  return (
    <div >
      <Navbar />
<div style={{ overflowX: 'hidden' }}>
      {/* ===== HERO ===== */}
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

      {/* ===== STATS ===== */}
      <section ref={statsRef} className="stats animate-fade-up">
        <StatItem target={125} label="Touristes satisfaits" />
        <StatItem target={48}  label="Guides certifiés"    />
        <StatItem target={12}  label="Villes couvertes"    />
      </section>

      {/* ===== MARRAKESH ===== */}
      <section ref={ville1Ref} className="ville animate-fade-left">
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

      {/* ===== FEZ ===== */}
      <section ref={ville2Ref} className="ville animate-fade-right">
        <div className="ville-card">
          <div className="ville-img">
            <img src="src/components/fes.jpg" alt="Fes" />
          </div>
          <div className="ville-text">
            <h2>FES</h2>
            <p>
              La plus ancienne ville impériale du Maroc. Fès el-Bali, 
              son ancienne médina classée UNESCO, abrite les tanneries 
              Chouara, la medersa Bou Inania et des milliers de ruelles 
              mystérieuses. La capitale spirituelle et culturelle du Maroc.
              Fondée au IXe siècle, elle abrite la plus ancienne 
              université du monde, l'Université Al-Qarawiyyin. 
              Ses tanneries Chouara, visibles depuis les terrasses 
              des maisons, offrent un spectacle de couleurs unique. 
              La médina de Fès est considérée comme la plus grande 
              zone piétonne urbaine au monde.
            </p>
            <button className="btn-plus">
              Plus <FaArrowRight className="btn-icon" />
            </button>
          </div>
        </div>
      </section>

      {/* ===== TANGER ===== */}
      <section ref={ville3Ref} className="ville animate-fade-left">
        <div className="ville-card">
          <div className="ville-text">
            <h2>TANGER</h2>
            <p>
              Tangier est une ville magnifique du nord du Maroc, située entre la mer Méditerranée
              et l'océan Atlantique. Connue pour son histoire riche, ses plages, sa médina
              authentique et ses paysages exceptionnels, elle offre un mélange unique de tradition
              et de modernité. C'est une destination idéale pour découvrir la beauté et le charme
              du nord du Maroc.
            </p>
            <button className="btn-plus">
              Plus <FaArrowRight className="btn-icon" />
            </button>
          </div>
          <div className="ville-img">
            <img src="src/components/TANGER.jpg" alt="Tanger" />
          </div>
        </div>
      </section>

      {/* ===== OUARZAZATE ===== */}
      <section ref={ville4Ref} className="ville animate-fade-right">
        <div className="ville-card">
          <div className="ville-img">
            <img src="src/components/Ouarzazate.jpg" alt="Ouarzazate" />
          </div>
          <div className="ville-text">
            <h2>OUARZAZATE</h2>
            <p>
              Surnommée la Porte du Désert et le Hollywood d'Afrique, 
              Ouarzazate fascine par ses paysages lunaires et ses 
              kasbahs majestueuses. La kasbah Aït Ben Haddou, 
              classée patrimoine mondial UNESCO, a servi de décor 
              à des films légendaires comme Gladiator et Game of 
              Thrones. Ses studios de cinéma accueillent les plus 
              grandes productions mondiales. Entourée de palmeraies 
              et de montages ocre, Ouarzazate est une destination 
              époustouflante entre désert et montagne.
            </p>
            <button className="btn-plus">
              Plus <FaArrowRight className="btn-icon" />
            </button>
          </div>
        </div>
      </section>

      {/* ===== ESSAOUIRA ===== */}
      <section ref={ville5Ref} className="ville animate-fade-left">
        <div className="ville-card">
          <div className="ville-text">
            <h2>ESSAOUIRA</h2>
            <p>
              Cité portuaire aux remparts blancs et bleus face à 
              l'Atlantique, Essaouira est surnommée la Ville des 
              Vents. Son médina classée UNESCO, ses ruelles 
              artistiques et son port de pêche authentique séduisent 
              les voyageurs en quête d'authenticité. Paradis mondial 
              du windsurf et du kitesurf grâce à ses vents constants, 
              elle attire aussi les amateurs d'art avec ses nombreuses 
              galeries. Son célèbre festival Gnaoua, mêlant musique 
              traditionnelle et jazz, rassemble des milliers de 
              visiteurs chaque année.
            </p>
            <button className="btn-plus">
              Plus <FaArrowRight className="btn-icon" />
            </button>
          </div>
          <div className="ville-img">
            <img src="src/components/Essaouira.jpg" alt="Essaouira" />
          </div>
        </div>
      </section>

      {/* ===== MERZOUGA ===== */}
      <section ref={ville6Ref} className="ville animate-fade-right">
        <div className="ville-card">
          <div className="ville-img">
            <img src="src/components/Merzouga & le Sahara.jpg" alt="Merzouga" />
          </div>
          <div className="ville-text">
            <h2>Merzouga & le Sahara</h2>
            <p>
              Aux portes du grand désert du Sahara, Merzouga est 
              le point de départ idéal pour vivre une expérience 
              désertique inoubliable. Les dunes d'Erg Chebbi, 
              atteignant jusqu'à 150 mètres de hauteur, offrent 
              des panoramas à couper le souffle au lever et au 
              coucher du soleil. Une nuit en bivouac sous un ciel 
              étoilé, une balade à dos de chameau au crépuscule 
              et la rencontre avec les nomades berbères font de 
              Merzouga une destination de rêve pour tout voyageur.
            </p>
            <button className="btn-plus">
              Plus <FaArrowRight className="btn-icon" />
            </button>
          </div>
        </div>
      </section>

      {/* ===== ACTIVITÉS SLIDER ===== */}
      <ActivitesSlider />

      {/* ===== GALERIE ===== */}
      <section ref={galerieRef} className="galerie animate-fade-up">
        <div className="galerie-header">
          <h2>Galerie</h2>
          <p>Les plus beaux endroits du Maroc</p>
        </div>
        <div className="galerie-grid">
          <div className="galerie-item galerie-large">
            <img src="src/components/agadir.jpg" alt="agadir" />
            <div className="galerie-overlay"><span>agadir</span></div>
          </div>
          <div className="galerie-item">
            <img src="src/components/Rabat_accueil.jpg" alt="Rabat" />
            <div className="galerie-overlay"><span>Rabat</span></div>
          </div>
          <div className="galerie-item">
            <img src="src/components/chefchaouen blue city morocco streets.jpg" alt="chefchaouen" />
            <div className="galerie-overlay"><span>Chefchaouen</span></div>
          </div>
          <div className="galerie-item">
            <img src="src/components/Meknes.jpg" alt="Meknes" />
            <div className="galerie-overlay"><span>Meknès</span></div>
          </div>
          <div className="galerie-item">
            <img src="src/components/Ifrane.jpg" alt="Ifrane" />
            <div className="galerie-overlay"><span>Ifrane</span></div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section ref={contactRef} id="contact" className="contact animate-fade-up">
        <h2>NOUS CONTACTEZ</h2>
        <div className="contact-form">
          <div className="form-row">
            <input type="text" placeholder="Prénom" />
            <input type="text" placeholder="Nom" />
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
      </div>
    </div>
  );
};

export default Home;