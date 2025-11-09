// frontend/src/components/AuthLayout.jsx (FINAL FLOATING CARD DESIGN)
import React from 'react';

// --- Color Palette (Based on the second image) ---
const COLORS = {
  primaryDark: '#38765A',      // Dark green for the header/left panel
  lightGreen: '#A0D68F',        // Light green for buttons/accents
  background: '#EAEAEA',       // Light grey/off-white main background
  cardBackground: '#FFFFFF',   // White for the form card
  inputBorder: '#D1D1D1',      // Border color
  containerBorder: '#5E8B7A',  // The defining border around the floating card (darker than lightGreen)
  logoGreen: '#1E6E4C',         // Darker logo background
};

// --- Auth Layout Component ---
const AuthLayout = ({ children, isSignUp }) => {
    const title = "Welcome to FinAI";
    const subtitle = "Empowering SMEs with AI-driven financial insights";
    
    // Widths are set to match the floating card look
    const containerWidth = '1000px'; 
    const sidePanelWidth = '500px'; 
    const formWidth = '500px';    

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: COLORS.background,
            fontFamily: 'Arial, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            padding: '50px 0', 
            boxSizing: 'border-box',
        }}>
            {/* The main content card, centered and defined by a single border */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'stretch', // Ensures panels share the same height
                margin: 'auto', // Centers the whole block
                
                width: containerWidth,
                height: '650px', // Fixed height based on visual
                borderRadius: '10px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)', // Subtle shadow
                backgroundColor: COLORS.cardBackground, 
                border: `1px solid ${COLORS.containerBorder}`, // Single border around the whole card
                overflow: 'hidden', 
            }}>
                {/* Left Info/Image Section (Green Panel) */}
                <div style={{
                    width: sidePanelWidth,
                    backgroundColor: COLORS.primaryDark,
                    padding: '40px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    // Removing border radius from the right side of the green panel
                    borderRadius: '10px 0 0 10px', 
                }}>
                    <h1 style={{ color: COLORS.lightGreen, fontSize: '40px', margin: '0 0 10px 0' }}>
                        {title}
                    </h1>
                    <p style={{ color: COLORS.background, fontSize: '18px', margin: '0 0 30px 0' }}>
                        {subtitle}
                    </p>
                    <div style={{
                        flexGrow: 1, 
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)', 
                        borderRadius: '5px',
                        // Alignment fix for the image within the panel
                        margin: '0 -5px -5px -5px', // Subtle pull for the image
                        backgroundImage: `url('/images/h3.jpg')`, 
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: '350px', 
                    }}>
                    </div>
                </div>

                {/* Right Form Section (White Panel) */}
                <div style={{
                    width: formWidth,
                    padding: '40px 50px', // Sufficient internal padding
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'flex-start', 
                    justifyContent: 'center', 
                    flexDirection: 'column',
                    // The right side inherits the border radius from the main container
                }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;