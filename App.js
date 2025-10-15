const { useState, useEffect } = React;

const games = ["Shell Top Up", "Free Fire", "Call of Duty", "Delta Force", "Haikyu!!", "AOV", "Undawn", "Speed Drifters"];
const diamondOptions = [25, 100, 310, 520, 1060, 2180, 5600, 11500];
const slideshowImages = ["1 SLIDESHOW.png", "2 SLIDESHOW.png"];

function App() {
  const [selectedGame, setSelectedGame] = useState("Free Fire");
  const [playerId, setPlayerId] = useState("");
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const [loginPopup, setLoginPopup] = useState(false);
  const [sendPopup, setSendPopup] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slideshowImages.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + slideshowImages.length) % slideshowImages.length);
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slideshowImages.length);
  };

  const goToSlide = (index) => {
    setCurrentImageIndex(index);
  };

  const handleLogin = () => {
    if (!playerId.trim()) return;
    setLoginPopup(true);
    setTimeout(() => setLoginPopup(false), 2000);
  };

  const handleSend = () => {
    if (!selectedDiamond) return;
    setSendPopup(true);
    setTimeout(() => setSendPopup(false), 2000);
  };

  return (
    <div>
      {/* Header */}
      <header>
        <div className="header-container">
          <div className="logo">
            <img src="garena-logo.png" alt="Garena" />
            <span>Official Top Up Center</span>
          </div>
          <div className="user-icon"></div>
        </div>
      </header>

      {/* Slideshow Banner */}
      <section className="slideshow">
        <img src={slideshowImages[currentImageIndex]} alt="Slideshow Banner" />
      </section>



      {/* Game Selection */}
      <section className="game-selection">
        <h2>Game Selection</h2>
        <div id="gameList">
          {games.map((game) => (
            <button
              key={game}
              className={selectedGame === game ? "active" : ""}
              onClick={() => setSelectedGame(game)}
            >
              {game}
            </button>
          ))}
        </div>
      </section>

      {/* Game Banner */}
      <section className="game-banner">
        <div className="banner-box">
          <img src="freefire-banner.png" alt="Free Fire" />
          <div className="banner-info">
            <img src="freefire-icon.png" alt="Free Fire" />
            <h3>Free Fire</h3>
            <span>100% Secure Payment</span>
          </div>
        </div>
      </section>

      {/* Login */}
      <section className="login-section">
        <h3>1 Login</h3>
        <label>Player ID</label>
        <input
          type="text"
          placeholder="Please enter player ID here"
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </section>

      {/* Top-up */}
      <section className="topup-section">
        <h3>2 Top-up Amount</h3>
        <div className="tabs">
          <button className="active">Purchase</button>
          <button>Redeem</button>
        </div>
        <div className="diamond-grid">
          {diamondOptions.map((d) => (
            <div
              key={d}
              className={selectedDiamond === d ? "selected" : ""}
              onClick={() => setSelectedDiamond(d)}
            >
              💎 {d}
            </div>
          ))}
        </div>
        {selectedDiamond && (
          <button className="send-btn" onClick={handleSend}>
            Send
          </button>
        )}
      </section>

      {/* Footer */}
      <footer>
        © 2025 Garena • Official Top Up Center (Maxx7)
      </footer>

      {/* Popups */}
      {loginPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg animate-fade-in">
            ✅ ᴜɪᴅ ꜱᴜᴄᴄᴇᴇᴅ
          </div>
        </div>
      )}
      {sendPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg animate-fade-in">
            💎 Diamonds Sent Successfully!
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
