import React from "react";

export const About = () => {
  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>About Our Restaurant</h2>
            <p>
              Experience culinary excellence with our carefully curated menu
              featuring fresh, locally-sourced ingredients. Our chefs are
              passionate about creating memorable dining experiences that
              celebrate flavor, tradition, and innovation.
            </p>
            <p>
              From farm to table, every dish is prepared with meticulous
              attention to detail and a commitment to quality. Whether you're
              here for a casual meal or a special celebration, we're dedicated
              to serving you the finest food and hospitality.
            </p>

            <div className="about-highlights">
              <div className="highlight-item">
                <div className="highlight-item-icon">👨‍🍳</div>
                <h4>Expert Chefs</h4>
                <p style={{ marginBottom: 0, fontSize: "0.875rem" }}>
                  Seasoned professionals with years of culinary expertise
                </p>
              </div>
              <div className="highlight-item">
                <div className="highlight-item-icon">🌱</div>
                <h4>Fresh Ingredients</h4>
                <p style={{ marginBottom: 0, fontSize: "0.875rem" }}>
                  Local, organic, and sustainably sourced
                </p>
              </div>
              <div className="highlight-item">
                <div className="highlight-item-icon">⚡</div>
                <h4>Fast Service</h4>
                <p style={{ marginBottom: 0, fontSize: "0.875rem" }}>
                  Quick turnaround without compromising quality
                </p>
              </div>
              <div className="highlight-item">
                <div className="highlight-item-icon">❤️</div>
                <h4>Made with Love</h4>
                <p style={{ marginBottom: 0, fontSize: "0.875rem" }}>
                  Every dish prepared with passion and care
                </p>
              </div>
            </div>
          </div>

          <div className="about-image" style={{ textAlign: "center" }}>
            <div
              style={{
                width: "100%",
                height: "400px",
                backgroundColor: "#f5f5f5",
                borderRadius: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "3rem",
              }}
            >
              🍕
            </div>
            <p
              style={{
                marginTop: "1rem",
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              Restaurant image goes here
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
