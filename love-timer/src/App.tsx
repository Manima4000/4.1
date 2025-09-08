import React, { useEffect, useState, useRef } from "react";

interface Boda {
  ano: number;
  nome: string;
  significado: string;
}

const bodasLista: Boda[] = [
  { ano: 1, nome: "Bodas de Papel", significado: "Fragilidade e começo de uma história." },
  { ano: 2, nome: "Bodas de Algodão", significado: "Suavidade e conforto no relacionamento." },
  { ano: 3, nome: "Bodas de Trigo", significado: "Prosperidade e sustento do amor." },
  { ano: 4, nome: "Bodas de Flores", significado: "Beleza e delicadeza da vida a dois." },
  { ano: 5, nome: "Bodas de Madeira", significado: "Força e crescimento sólido do amor." },
  { ano: 6, nome: "Bodas de Perfume", significado: "Perfume que exala do relacionamento maduro." },
  { ano: 7, nome: "Bodas de Lã", significado: "Aconchego e proteção mútua." },
  { ano: 8, nome: "Bodas de Barro", significado: "Moldagem e adaptação do casal." },
  { ano: 9, nome: "Bodas de Vime", significado: "Flexibilidade e entrelaçamento das vidas." },
  { ano: 10, nome: "Bodas de Estanho", significado: "Durabilidade e resistência do amor." },
];

// Lista de fotos
const fotosList = [
  { src: "/foto1.jpg", alt: "Em ilha Grande" },
  { src: "/foto2.jpg", alt: "No beach park" },
  { src: "/foto3.jpg", alt: "Indo pro sushi" },
  { src: "/foto4.jpg", alt: "Na beira mar" },
  { src: "/foto5.jpg", alt: "Almoço no meu aniversario" },
  { src: "/foto6.jpg", alt: "Na praia pós surf" },
  { src: "/foto7.jpg", alt: "No metro indo pra minha casa" },
  { src: "/foto8.jpg", alt: "Foto com IA porque tava na moda" },
  { src: "/foto9.jpg", alt: "Na balsa indo pra ilha grande" },
  { src: "/foto10.jpg", alt: "No aniversario do lobão" },
  { src: "/foto11.jpg", alt: "No New York apos encontrar o luiz e a nicole" },
  { src: "/foto12.jpg", alt: "Voce sendo linda no quarto" },
  { src: "/foto13.jpg", alt: "Na brás comando a melhor pizza" },
];

const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [fraseIndex, setFraseIndex] = useState(0);
  const [currentBodaIndex, setCurrentBodaIndex] = useState(0);
  const [showSignificado, setShowSignificado] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFotoIndex, setCurrentFotoIndex] = useState(0);
  const [showFullGallery, setShowFullGallery] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Caminho da música (public/)
  const musicFile = "/photography.mp3"; 

  const startDate = new Date("2024-02-13");

  // Tentar autoplay + desbloqueio com clique
  useEffect(() => {
    const tryPlay = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.loop = true;
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            window.removeEventListener("click", tryPlay); // remove depois do 1º clique
          })
          .catch(() => {
            console.log("Autoplay bloqueado, esperando interação do usuário...");
          });
      }
    };

    tryPlay(); // tenta autoplay
    window.addEventListener("click", tryPlay); // fallback no clique
    return () => window.removeEventListener("click", tryPlay);
  }, []);

  // Relógio
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Frases
  const frases = [
    "Desde que você chegou, tudo ganhou mais cor 🌹",
    "Com você aprendi o verdadeiro significado de amar 💕",
    "Cada segundo ao seu lado vale a pena ✨",
  ];

  useEffect(() => {
    const timer = setInterval(
      () => setFraseIndex((prev) => (prev + 1) % frases.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  // Galeria automática
  useEffect(() => {
    if (!showFullGallery) {
      const timer = setInterval(
        () => setCurrentFotoIndex((prev) => (prev + 1) % fotosList.length),
        3000
      );
      return () => clearInterval(timer);
    }
  }, [showFullGallery]);

  // Controle música
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((e) => console.log("Erro ao tocar música:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Tempo juntos
  const diff = currentTime.getTime() - startDate.getTime();
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor(
    (diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
  );
  const days = Math.floor(
    (diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
  );
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));

  // Calcula quanto falta para cada boda
  const calcularBoda = (ano: number) => {
    const bodaDate = new Date(startDate);
    bodaDate.setFullYear(startDate.getFullYear() + ano);
    const faltaMs = bodaDate.getTime() - currentTime.getTime();
    const faltaDias = Math.ceil(faltaMs / (1000 * 60 * 60 * 24));
    return faltaDias <= 0 ? "✅ Completo!" : `Faltam ${faltaDias} dias`;
  };

  const nextBoda = () => {
    setCurrentBodaIndex((prev) => (prev + 1) % bodasLista.length);
  };

  const prevBoda = () => {
    setCurrentBodaIndex((prev) => (prev - 1 + bodasLista.length) % bodasLista.length);
  };

  const nextFoto = () => {
    setCurrentFotoIndex((prev) => (prev + 1) % fotosList.length);
  };

  const prevFoto = () => {
    setCurrentFotoIndex((prev) => (prev - 1 + fotosList.length) % fotosList.length);
  };

  const currentBoda = bodasLista[currentBodaIndex];

  return (
    <div className="app-container">
      {/* Background animado */}
      <div className="background-animation">
        <div className="floating-hearts">
          {[...Array(15)].map((_, i) => (
            <div key={i} className={`heart heart-${i + 1}`}>💕</div>
          ))}
        </div>
        <div className="floating-stars">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`star star-${i + 1}`}>✨</div>
          ))}
        </div>
      </div>

      {/* Áudio */}
      <audio ref={audioRef} src={musicFile} preload="auto" />

      <div className="container">
        {/* Player */}
      <div className="music-player">
        <button onClick={toggleMusic} className="music-btn">
          {isPlaying ? "🎵 Pausar" : "🎵 Tocar"}
        </button>
        <span className="music-status">
          {isPlaying ? "♪ Tocando música romântica..." : "Música pausada"}
        </span>
      </div>

        <h1>Matheus e Raquel 💖</h1>
        <p>{frases[fraseIndex]}</p>

        {/* Contador */}
        <div className="contador">
          <div className="caixa">
            <div className="numero">{years}</div>
            <div>Anos</div>
          </div>
          <div className="caixa">
            <div className="numero">{months}</div>
            <div>Meses</div>
          </div>
          <div className="caixa">
            <div className="numero">{days}</div>
            <div>Dias</div>
          </div>
          <div className="caixa">
            <div className="numero">{hours}</div>
            <div>Horas</div>
          </div>
          <div className="caixa">
            <div className="numero">{minutes}</div>
            <div>Minutos</div>
          </div>
          <div className="caixa">
            <div className="numero">{seconds}</div>
            <div>Segundos</div>
          </div>
        </div>

        <p>{totalDays} dias de história juntos 💕</p>

        {/* Galeria de Fotos Melhorada */}
        <h2>Nossos momentos</h2>
        <div className="foto-gallery">
          {!showFullGallery ? (
            // Modo carrossel - uma foto por vez
            <div className="foto-carousel">
              <button className="foto-nav prev" onClick={prevFoto}>
                ←
              </button>
              <div className="foto-main">
                <img 
                  src={fotosList[currentFotoIndex].src} 
                  alt={fotosList[currentFotoIndex].alt}
                />
                <div className="foto-counter">
                  {currentFotoIndex + 1} de {fotosList.length}
                </div>
              </div>
              <button className="foto-nav next" onClick={nextFoto}>
                →
              </button>
            </div>
          ) : (
            // Modo galeria - todas as fotos
            <div className="fotos-grid">
              {fotosList.map((foto, index) => (
                <img 
                  key={index}
                  src={foto.src} 
                  alt={foto.alt}
                  onClick={() => {
                    setCurrentFotoIndex(index);
                    setShowFullGallery(false);
                  }}
                />
              ))}
            </div>
          )}
          
          <div className="gallery-controls">
            <button 
              onClick={() => setShowFullGallery(!showFullGallery)}
              className="gallery-toggle"
            >
              {showFullGallery ? "🎠 Carrossel" : "🖼️ Ver todas"}
            </button>
          </div>
        </div>

        {/* Bodas - Layout existente */}
        <div className="bodas-container">
          <h2>Nossas bodas 🎉</h2>
          <div className="bodas-carousel">
            {/* Bodas laterais (anteriores) */}
            <div className="bodas-lateral esquerda">
              {currentBodaIndex > 0 && (
                <div className="boda-mini" onClick={prevBoda}>
                  <h4>{bodasLista[currentBodaIndex - 1].nome}</h4>
                  <span>{bodasLista[currentBodaIndex - 1].ano} ano{bodasLista[currentBodaIndex - 1].ano > 1 ? 's' : ''}</span>
                </div>
              )}
            </div>

            {/* Boda central */}
            <div className="boda-central">
              <div className="boda-principal">
                <h3>{currentBoda.nome}</h3>
                <div className="ano-badge">{currentBoda.ano} ano{currentBoda.ano > 1 ? 's' : ''}</div>
                <p className="status">{calcularBoda(currentBoda.ano)}</p>
                <div className="boda-controls">
                  <button 
                    onClick={() => setShowSignificado(true)} 
                    className="significado-btn"
                  >
                    Ver Significado
                  </button>
                </div>
              </div>
              
              {/* Botões de navegação */}
              <div className="nav-buttons">
                <button 
                  onClick={prevBoda} 
                  disabled={currentBodaIndex === 0}
                  className="nav-btn prev"
                >
                  ← Anterior
                </button>
                <span className="boda-counter">
                  {currentBodaIndex + 1} de {bodasLista.length}
                </span>
                <button 
                  onClick={nextBoda} 
                  disabled={currentBodaIndex === bodasLista.length - 1}
                  className="nav-btn next"
                >
                  Próxima →
                </button>
              </div>
            </div>

            {/* Bodas laterais (próximas) */}
            <div className="bodas-lateral direita">
              {currentBodaIndex < bodasLista.length - 1 && (
                <div className="boda-mini" onClick={nextBoda}>
                  <h4>{bodasLista[currentBodaIndex + 1].nome}</h4>
                  <span>{bodasLista[currentBodaIndex + 1].ano} ano{bodasLista[currentBodaIndex + 1].ano > 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal do Significado */}
        {showSignificado && (
          <div className="modal-overlay" onClick={() => setShowSignificado(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>{currentBoda.nome}</h3>
              <div className="modal-body">
                <p>{currentBoda.significado}</p>
              </div>
              <button 
                onClick={() => setShowSignificado(false)}
                className="modal-close"
              >
                Fechar
              </button>
            </div>
          </div>
        )}

        {/* Carta */}
        <h2>Minha mensagem 💌</h2>
        <div className="carta">
        Querida, cada instante contigo é um presente. <br />
        Obrigado por tornar minha vida mais feliz, mais leve e cheia de amor. <br />
        Tenho certeza que escolhi a pessoa certa para caminhar por essa vida. <br />
        Estarei sempre ao seu lado. ❤️ <br />
        </div>
      </div>
    </div>
  );
};

export default App;