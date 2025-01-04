import React from "react";
import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to Our App</h1>
          <p>Your one-stop solution for all your needs.</p>
          <button>Get Started</button>
        </div>
      </header>
      <main className="content">
        <section className="features">
          <h2>Features</h2>
          <div className="feature-cards">
            <div className="card">
              <h3>Feature 1</h3>
              <p>Description of Feature 1.</p>
            </div>
            <div className="card">
              <h3>Feature 2</h3>
              <p>Description of Feature 2.</p>
            </div>
            <div className="card">
              <h3>Feature 3</h3>
              <p>Description of Feature 3.</p>
            </div>
          </div>
        </section>
        <section className="about">
          <h2>About Us</h2>
          <p>
            Learn more about our mission, vision, and the story behind our app.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
