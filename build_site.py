import os
import re

project_dir = r"c:\Users\skund\Downloads\NexusDigital"

# -------------------------------------------------------------
# 1. NAVBAR DROPDOWN HTML (UNIFORM BRAND STYLING)
# -------------------------------------------------------------
nav_dropdown_html = """<li class="nav-dropdown">
            <a href="#" class="nav-link nav-dropdown-trigger" aria-haspopup="true" aria-expanded="false">
              Services <i class="fas fa-chevron-down" style="font-size: 0.75rem;"></i>
            </a>
            <div class="dropdown-menu">
              <a href="website-design" class="dropdown-item">
                <span><i class="fas fa-laptop-code" style="margin-right:8px; color:var(--primary);"></i> Website Development</span>
                <span class="badge badge-available">Available Now</span>
              </a>
              <a href="app-development" class="dropdown-item">
                <span><i class="fas fa-mobile-screen-button" style="margin-right:8px; color:var(--primary);"></i> App Development</span>
                <span class="badge badge-available">Available Now</span>
              </a>
              <a href="cotmit-ai" class="dropdown-item">
                <span><i class="fas fa-brain" style="margin-right:8px; color:var(--primary);"></i> Cotmit AI</span>
                <span class="badge badge-progress">In Progress</span>
              </a>
              <a href="javascript:void(0)" onclick="notifyUnavailable('Run Ads & Campaign Management')" class="dropdown-item">
                <span><i class="fas fa-bullhorn" style="margin-right:8px; color:var(--text-dim);"></i> Run Ads</span>
                <span class="badge badge-unavailable">Coming Soon</span>
              </a>
              <a href="javascript:void(0)" onclick="notifyUnavailable('Social Media Marketing')" class="dropdown-item">
                <span><i class="fas fa-share-nodes" style="margin-right:8px; color:var(--text-dim);"></i> Social Media Marketing</span>
                <span class="badge badge-unavailable">Coming Soon</span>
              </a>
              <a href="javascript:void(0)" onclick="notifyUnavailable('Digital Marketing')" class="dropdown-item">
                <span><i class="fas fa-chart-line" style="margin-right:8px; color:var(--text-dim);"></i> Digital Marketing</span>
                <span class="badge badge-unavailable">Coming Soon</span>
              </a>
            </div>
          </li>"""

# Update nav dropdown across all html files
all_html_files = [f for f in os.listdir(project_dir) if f.endswith(".html")]
for filename in all_html_files:
    file_path = os.path.join(project_dir, filename)
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Replace nav-dropdown block
    new_content = re.sub(r'<li class="nav-dropdown">.*?</li>', nav_dropdown_html, content, flags=re.DOTALL)
    if new_content != content:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated navbar dropdown in {filename}")

# -------------------------------------------------------------
# 2. HOMEPAGE INDEX.HTML SERVICES GRID (100% UNIFORM BRAND COLOR)
# -------------------------------------------------------------
services_grid_html = """<div class="cards-grid">
          <!-- 1. Website Design & Development (Available Now) -->
          <div class="service-card service-card-active">
            <div class="active-badge-ribbon"><i class="fas fa-star" style="color: #f59e0b; margin-right: 4px;"></i> CORE SPECIALTY</div>
            <div class="card-header">
              <div class="card-icon card-icon-primary">
                <i class="fas fa-laptop-code"></i>
              </div>
              <span class="badge badge-available"><i class="fas fa-check-circle"></i> Available Now</span>
            </div>
            <h3>Website Design & Development</h3>
            <p>Custom-coded, responsive, and visual-first websites engineered for maximum speed, user engagement, and client conversions.</p>

            <div class="service-features-list">
              <span><i class="fas fa-check"></i> Custom Code</span>
              <span><i class="fas fa-check"></i> 100% Responsive</span>
              <span><i class="fas fa-check"></i> SEO Ready</span>
            </div>

            <div class="card-footer-action">
              <a href="website-design" class="card-link" style="font-weight: 700;">View Service Details <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>

          <!-- 2. App Development (Available Now) -->
          <div class="service-card service-card-active">
            <div class="card-header">
              <div class="card-icon card-icon-primary">
                <i class="fas fa-mobile-screen-button"></i>
              </div>
              <span class="badge badge-available"><i class="fas fa-check-circle"></i> Available Now</span>
            </div>
            <h3>iOS & Android App Development</h3>
            <p>Bespoke mobile applications for Android & iOS built with Flutter, React Native, and native architecture for fluid UX & offline speed.</p>

            <div class="service-features-list">
              <span><i class="fas fa-check"></i> Flutter & React Native</span>
              <span><i class="fas fa-check"></i> iOS & Android</span>
              <span><i class="fas fa-check"></i> Play Store Deploy</span>
            </div>

            <div class="card-footer-action">
              <a href="app-development" class="card-link" style="font-weight: 700;">View Service Details <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>

          <!-- 3. Cotmit AI (In Progress) -->
          <div class="service-card service-card-active">
            <div class="card-header">
              <div class="card-icon card-icon-primary">
                <i class="fas fa-brain"></i>
              </div>
              <span class="badge badge-available" style="background: rgba(79, 70, 229, 0.15); color: var(--primary); border: 1px solid rgba(79, 70, 229, 0.3);"><i class="fas fa-spinner fa-spin"></i> In Progress</span>
            </div>
            <h3>Cotmit AI Engine & Workflows</h3>
            <p>Flagship AI agent automation, custom LLM fine-tuning, autonomous customer bots, and zero-hallucination enterprise intelligence.</p>

            <div class="service-features-list">
              <span><i class="fas fa-check"></i> Custom AI Workflows</span>
              <span><i class="fas fa-check"></i> Autonomous Agents</span>
              <span><i class="fas fa-check"></i> Beta Preview Access</span>
            </div>

            <div class="card-footer-action">
              <a href="cotmit-ai" class="card-link" style="font-weight: 700;">View AI Service Details <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>

          <!-- 4. Run Ads & Campaign Management (Coming Soon) -->
          <div class="service-card service-card-disabled">
            <div class="card-header">
              <div class="card-icon">
                <i class="fas fa-bullhorn"></i>
              </div>
              <span class="badge badge-unavailable"><i class="fas fa-lock"></i> Coming Soon</span>
            </div>
            <h3>Run Ads & Campaign Management</h3>
            <p>Targeted PPC and ad management across Meta, Google, and LinkedIn. Currently undergoing platform analytics upgrades.</p>

            <div class="service-features-list">
              <span><i class="fas fa-clock"></i> Meta Ads</span>
              <span><i class="fas fa-clock"></i> Google PPC</span>
            </div>

            <div class="card-footer-action">
              <button onclick="notifyUnavailable('Run Ads & Campaign Management')" class="btn-service-disabled">Service Unavailable <i class="fas fa-lock"></i></button>
            </div>
          </div>

          <!-- 5. Social Media Marketing (Coming Soon) -->
          <div class="service-card service-card-disabled">
            <div class="card-header">
              <div class="card-icon">
                <i class="fas fa-share-nodes"></i>
              </div>
              <span class="badge badge-unavailable"><i class="fas fa-lock"></i> Coming Soon</span>
            </div>
            <h3>Social Media Marketing</h3>
            <p>Strategic organic content creation, brand positioning, and social community growth. Launching in our upcoming release.</p>

            <div class="service-features-list">
              <span><i class="fas fa-clock"></i> Content Strategy</span>
              <span><i class="fas fa-clock"></i> Growth Engine</span>
            </div>

            <div class="card-footer-action">
              <button onclick="notifyUnavailable('Social Media Marketing')" class="btn-service-disabled">Service Unavailable <i class="fas fa-lock"></i></button>
            </div>
          </div>

          <!-- 6. Digital Marketing (Coming Soon) -->
          <div class="service-card service-card-disabled">
            <div class="card-header">
              <div class="card-icon">
                <i class="fas fa-chart-line"></i>
              </div>
              <span class="badge badge-unavailable"><i class="fas fa-lock"></i> Coming Soon</span>
            </div>
            <h3>Digital Marketing</h3>
            <p>Full-funnel digital marketing, email automation, performance analytics, and growth marketing solutions for modern businesses.</p>

            <div class="service-features-list">
              <span><i class="fas fa-clock"></i> Growth Funnels</span>
              <span><i class="fas fa-clock"></i> Analytics</span>
            </div>

            <div class="card-footer-action">
              <button onclick="notifyUnavailable('Digital Marketing')" class="btn-service-disabled">Service Unavailable <i class="fas fa-lock"></i></button>
            </div>
          </div>
        </div>"""

index_path = os.path.join(project_dir, "index.html")
with open(index_path, "r", encoding="utf-8") as f:
    index_content = f.read()

index_content = re.sub(r'<div class="cards-grid">.*?</div>\s*</div>\s*</section>', services_grid_html + "\n</div>\n</section>", index_content, flags=re.DOTALL)
with open(index_path, "w", encoding="utf-8") as f:
    f.write(index_content)
print("Updated index.html services grid with uniform brand styling!")

# -------------------------------------------------------------
# 3. REDESIGN APP-DEVELOPMENT.HTML (100% BRAND THEME HARMONY)
# -------------------------------------------------------------
app_html_code = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary SEO Meta Tags -->
  <title>Mobile App Development Services & iOS/Android Apps | Nexus Digital</title>
  <meta name="title" content="Mobile App Development Services & iOS/Android Apps | Nexus Digital">
  <meta name="description" content="Explore custom mobile app development packages & transparent pricing by Nexus Digital. High-performance Android & iOS apps built with Flutter, React Native, and native code.">
  <meta name="keywords" content="Mobile App Development, iOS App Development, Android Apps, Flutter, React Native, Nexus Digital Services">
  <meta name="author" content="Nexus Digital">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://nexusdigital.net.in/app-development">
  <meta name="theme-color" content="#4f46e5">

  <!-- Open Graph / Facebook / WhatsApp Preview Tags -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://nexusdigital.net.in/app-development">
  <meta property="og:title" content="Mobile App Development Services & iOS/Android Apps | Nexus Digital">
  <meta property="og:description" content="High-performance Android & iOS apps built with Flutter, React Native, and native code. Transparent pricing & custom UI.">
  <meta property="og:image" content="https://nexusdigital.net.in/assets/images/hero_person.png">

  <!-- Favicon & Styles -->
  <link rel="icon" type="image/png" href="https://nexusdigital.net.in/favicon.png">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <!-- Navbar -->
  <header class="navbar">
    <div class="container nav-container">
      <a href="/" class="logo">
        <img src="assets/images/logo.png" alt="Nexus Digital Logo" class="nav-logo-img">
        <div class="logo-text">
          <span class="brand-title">Nexus<span style="color: var(--primary)">Digital</span></span>
          <span class="brand-tagline">Digital Marketing</span>
        </div>
      </a>

      <nav class="nav">
        <ul class="nav-menu">
          <li><a href="/" class="nav-link">Home</a></li>
          <li><a href="about" class="nav-link">About Us</a></li>
          """ + nav_dropdown_html + """
          <li><a href="portfolio" class="nav-link">Portfolio</a></li>
          <li><a href="contact" class="nav-link">Contact Us</a></li>
          <li class="mobile-cta-item">
            <a href="https://www.fiverr.com/s/VYjxoKm" target="_blank" class="btn btn-primary" style="width: 100%; justify-content: center;">Get Started <i class="fas fa-arrow-right"></i></a>
          </li>
        </ul>
      </nav>

      <div class="nav-actions" style="display: flex; align-items: center; gap: 15px;">
        <a href="https://www.fiverr.com/s/VYjxoKm" target="_blank" class="btn btn-primary nav-cta">Get Started <i class="fas fa-arrow-right"></i></a>
        <button class="mobile-toggle" aria-label="Toggle Navigation">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section style="padding: 160px 0 70px; text-align: center; background: radial-gradient(circle at 50% 20%, rgba(79, 70, 229, 0.1) 0%, transparent 60%);">
    <div class="container">
      <div class="section-tag"><i class="fas fa-mobile-screen-button"></i> Specialized Service</div>
      <h1 style="font-size: 3.2rem; margin-bottom: 16px; line-height: 1.15;">
        Bespoke Mobile <span class="gradient-text">App Development</span>
      </h1>
      <p style="color: var(--text-muted); max-width: 680px; margin: 0 auto 28px; font-size: 1.1rem; line-height: 1.6;">
        High-performance Android & iOS mobile applications engineered with Flutter, React Native, and native architecture. Crafted for fluid UX, offline speed, and Play Store / App Store success.
      </p>
      
      <div class="feature-pills-strip" style="justify-content: center; margin-bottom: 32px;">
        <div class="feature-pill-item"><i class="fab fa-android"></i> Android & iOS</div>
        <div class="feature-pill-item"><i class="fas fa-bolt"></i> Native Performance</div>
        <div class="feature-pill-item"><i class="fas fa-code"></i> Flutter & React Native</div>
        <div class="feature-pill-item"><i class="fas fa-cloud-arrow-up"></i> App Store Deployment</div>
      </div>

      <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
        <a href="#pricing-packages" class="btn btn-primary"><i class="fas fa-tags"></i> View App Packages</a>
        <a href="contact" class="btn btn-outline"><i class="fas fa-paper-plane"></i> Request Custom Quote</a>
      </div>
    </div>
  </section>

  <!-- Service Features Grid Section -->
  <section class="section" style="background: #ffffff; border-top: 1px solid var(--border-light); border-bottom: 1px solid var(--border-light);">
    <div class="container">
      <div class="section-header">
        <div class="section-tag"><i class="fas fa-cubes"></i> App Architecture</div>
        <h2>Engineered For <span class="gradient-text">App Store Excellence</span></h2>
        <p>Complete end-to-end mobile application development lifecycle tailored to your exact business specifications.</p>
      </div>

      <div class="cards-grid" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));">
        <div class="service-card" style="background: #ffffff; border: 1px solid var(--border-light);">
          <div class="card-icon card-icon-primary"><i class="fab fa-apple"></i></div>
          <h3>iOS App Development</h3>
          <p>Native Swift and Flutter iOS applications crafted for iPhones and iPads, strictly adhering to Apple Human Interface Guidelines.</p>
        </div>

        <div class="service-card" style="background: #ffffff; border: 1px solid var(--border-light);">
          <div class="card-icon card-icon-primary"><i class="fab fa-google-play"></i></div>
          <h3>Android App Development</h3>
          <p>Native Kotlin and React Native mobile applications optimized across thousands of Android device models for maximum stability.</p>
        </div>

        <div class="service-card" style="background: #ffffff; border: 1px solid var(--border-light);">
          <div class="card-icon card-icon-primary"><i class="fas fa-layer-group"></i></div>
          <h3>Cross-Platform Efficiency</h3>
          <p>Single codebase architecture utilizing Flutter & React Native to reduce development cost while delivering 60 FPS native speed.</p>
        </div>

        <div class="service-card" style="background: #ffffff; border: 1px solid var(--border-light);">
          <div class="card-icon card-icon-primary"><i class="fas fa-paint-brush"></i></div>
          <h3>UI/UX Mobile Design</h3>
          <p>Intuitive user onboarding, dark mode UI, fluid gestures, and interactive mobile wireframes engineered for high retention.</p>
        </div>

        <div class="service-card" style="background: #ffffff; border: 1px solid var(--border-light);">
          <div class="card-icon card-icon-primary"><i class="fas fa-network-wired"></i></div>
          <h3>API & Cloud Backend</h3>
          <p>Secure REST APIs, GraphQL, Firebase, Supabase, push notification servers, and real-time database synchronization.</p>
        </div>

        <div class="service-card" style="background: #ffffff; border: 1px solid var(--border-light);">
          <div class="card-icon card-icon-primary"><i class="fas fa-shield-halved"></i></div>
          <h3>Publishing & Maintenance</h3>
          <p>Complete Google Play Console & Apple App Store review submission, SSL encryption, and post-launch maintenance support.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Transparent Pricing Section -->
  <section id="pricing-packages" class="section" style="background: var(--bg-surface);">
    <div class="container">
      <div class="section-header">
        <div class="section-tag"><i class="fas fa-tags"></i> Transparent Pricing</div>
        <h2>App Development <span class="gradient-text">Packages</span></h2>
        <p>Fixed transparent pricing for custom mobile app development. Zero hidden fees.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 28px; max-width: 1100px; margin: 0 auto;">
        <!-- Package 1: Starter App -->
        <div class="pricing-card" style="background: var(--bg-card); border: 1px solid var(--border-light); border-radius: var(--radius-lg); padding: 32px; position: relative;">
          <h3 style="font-size: 1.4rem; margin-bottom: 8px;">Starter App</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">Ideal for startups & local businesses needing a streamlined mobile app.</p>
          <div style="font-size: 2.5rem; font-weight: 800; color: var(--text-main); margin-bottom: 20px;">
            ₹14,999 <span style="font-size: 0.9rem; color: var(--text-muted); font-weight: 400;">/ one-time</span>
          </div>
          <ul style="list-style: none; padding: 0; margin: 0 0 28px; display: flex; flex-direction: column; gap: 12px; font-size: 0.92rem; color: var(--text-muted);">
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> Android or iOS App</li>
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> Up to 5 Custom Screens</li>
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> Basic REST API Integration</li>
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> Play Store Upload Assistance</li>
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> 30 Days Post-Launch Support</li>
          </ul>
          <a href="https://wa.me/919475320402?text=Hi%20Nexus%20Digital,%20I%20am%20interested%20in%20the%20Starter%20App%20Package" target="_blank" class="btn btn-outline" style="width: 100%; justify-content: center;"><i class="fab fa-whatsapp"></i> Order Starter App</a>
        </div>

        <!-- Package 2: Growth App (Featured) -->
        <div class="pricing-card" style="background: var(--bg-card); border: 2px solid var(--primary); border-radius: var(--radius-lg); padding: 32px; position: relative; box-shadow: var(--shadow-glow);">
          <div style="position: absolute; top: -14px; right: 24px; background: var(--primary); color: #fff; padding: 4px 14px; border-radius: 20px; font-size: 0.78rem; font-weight: 700; text-transform: uppercase;">Most Popular</div>
          <h3 style="font-size: 1.4rem; margin-bottom: 8px;">Growth App Solution</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">Complete cross-platform Android & iOS app with push notifications & Firebase.</p>
          <div style="font-size: 2.5rem; font-weight: 800; color: var(--text-main); margin-bottom: 20px;">
            ₹34,999 <span style="font-size: 0.9rem; color: var(--text-muted); font-weight: 400;">/ one-time</span>
          </div>
          <ul style="list-style: none; padding: 0; margin: 0 0 28px; display: flex; flex-direction: column; gap: 12px; font-size: 0.92rem; color: var(--text-muted);">
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> Android & iOS Cross-Platform</li>
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> Up to 12 Interactive Screens</li>
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> Firebase Backend & Authentication</li>
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> Push Notifications System</li>
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> Play Store & App Store Publishing</li>
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> 60 Days Post-Launch Support</li>
          </ul>
          <a href="https://wa.me/919475320402?text=Hi%20Nexus%20Digital,%20I%20am%20interested%20in%20the%20Growth%20App%20Package" target="_blank" class="btn btn-primary" style="width: 100%; justify-content: center;"><i class="fab fa-whatsapp"></i> Order Growth App</a>
        </div>

        <!-- Package 3: Enterprise App -->
        <div class="pricing-card" style="background: var(--bg-card); border: 1px solid var(--border-light); border-radius: var(--radius-lg); padding: 32px; position: relative;">
          <h3 style="font-size: 1.4rem; margin-bottom: 8px;">Enterprise Mobile Ecosystem</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">Bespoke mobile architecture for scalable SaaS, e-commerce, and enterprise portals.</p>
          <div style="font-size: 2.5rem; font-weight: 800; color: var(--text-main); margin-bottom: 20px;">
            ₹79,999 <span style="font-size: 0.9rem; color: var(--text-muted); font-weight: 400;">/ starting</span>
          </div>
          <ul style="list-style: none; padding: 0; margin: 0 0 28px; display: flex; flex-direction: column; gap: 12px; font-size: 0.92rem; color: var(--text-muted);">
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> Native Android & iOS Apps</li>
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> Unlimited Custom Screens & Workflows</li>
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> Payment Gateway & Live Tracking</li>
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> Dedicated Admin Control Panel</li>
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> 1 Year Dedicated Maintenance & SLA</li>
          </ul>
          <a href="https://wa.me/919475320402?text=Hi%20Nexus%20Digital,%20I%20am%20interested%20in%20the%20Enterprise%20App%20Package" target="_blank" class="btn btn-outline" style="width: 100%; justify-content: center;"><i class="fab fa-whatsapp"></i> Order Enterprise App</a>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Banner Creative -->
  <section style="padding: 70px 0; background: var(--bg-surface);">
    <div class="container">
      <div class="cta-banner-creative">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 30px;">
          <div>
            <div class="section-tag" style="background: rgba(255, 255, 255, 0.1); color: #fff; margin-bottom: 12px;"><i class="fas fa-rocket"></i> Ready To Build Your App?</div>
            <h2 style="color: #fff; font-size: 2.2rem; margin-bottom: 10px;">
              Let's Build Something <span style="background: linear-gradient(135deg, #818cf8, #38bdf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Extraordinary</span> Together
            </h2>
            <p style="color: #94a3b8; font-size: 1.05rem; max-width: 600px; margin: 0;">
              Get a custom mobile app consultation and project quote from Nexus Digital. We reply within 24 hours.
            </p>
          </div>

          <div class="cta-action-side">
            <a href="contact" class="btn-cta-main">
              <i class="fas fa-paper-plane"></i> Get Free Proposal
            </a>
            <a href="https://wa.me/919475320402" target="_blank" class="btn-cta-whatsapp">
              <i class="fab fa-whatsapp"></i> Chat On WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Flipkart Style Live Reviews Section -->
  <section class="section reviews-section" id="reviews">
    <div class="container">
      <div class="section-header section-header-left" style="margin-bottom: 32px;">
        <div class="section-tag"><i class="fas fa-star" style="color: #f59e0b;"></i> Customer Ratings & Feedback</div>
        <h2>Verified Client <span class="gradient-text">Reviews</span></h2>
      </div>
      
      <div class="flipkart-reviews-container" id="flipkartReviewsContainer">
        <!-- Rendered dynamically by js/reviews-database.js -->
      </div>
    </div>
  </section>

  <!-- Ultra-Professional Agency Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <!-- Col 1: Brand Info -->
        <div class="footer-brand">
          <a href="/" class="logo" style="margin-bottom: 18px;">
            <img src="assets/images/logo.png" alt="Nexus Digital Logo" class="nav-logo-img">
            <div class="logo-text">
              <span class="brand-title" style="color: #ffffff;">Nexus<span style="color: var(--primary)">Digital</span></span>
              <span class="brand-tagline" style="color: #94a3b8;">Digital Marketing</span>
            </div>
          </a>
          <p style="color: #94a3b8; font-size: 0.92rem; line-height: 1.6; margin-bottom: 22px;">Crafting bespoke, high-converting digital experiences that elevate modern brands & drive real growth.</p>
          <div class="footer-socials">
            <a href="https://wa.me/919475320402" target="_blank" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
            <a href="https://www.facebook.com/profile.php?id=61592571871118" target="_blank" title="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/nexusofficial.digital/" target="_blank" title="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="https://www.linkedin.com/company/nexus-digital2/" target="_blank" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>

        <!-- Col 2: Quick Links -->
        <div class="footer-col">
          <h4>Navigation</h4>
          <ul class="footer-links">
            <li><a href="/"><i class="fas fa-chevron-right"></i> Home</a></li>
            <li><a href="about"><i class="fas fa-chevron-right"></i> About Us</a></li>
            <li><a href="website-design"><i class="fas fa-chevron-right"></i> Website Design</a></li>
            <li><a href="app-development"><i class="fas fa-chevron-right"></i> App Development</a></li>
            <li><a href="cotmit-ai"><i class="fas fa-chevron-right"></i> Cotmit AI</a></li>
            <li><a href="portfolio"><i class="fas fa-chevron-right"></i> Portfolio</a></li>
            <li><a href="contact"><i class="fas fa-chevron-right"></i> Contact Us</a></li>
          </ul>
        </div>

        <!-- Col 3: Direct Contact -->
        <div class="footer-col">
          <h4>Get In Touch</h4>
          <ul class="footer-contact-list">
            <li>
              <i class="fas fa-phone"></i>
              <div>
                <span>Call Us</span>
                <a href="tel:+918972722259" style="display:block;">+91 89727 22259</a>
                <a href="tel:+919475320402" style="display:block; margin-top:2px;">+91 94753 20402</a>
              </div>
            </li>
            <li>
              <i class="fas fa-envelope"></i>
              <div>
                <span>Email Us</span>
                <a href="mailto:contact@nexusdigital.net.in">contact@nexusdigital.net.in</a>
              </div>
            </li>
            <li>
              <i class="fas fa-location-dot"></i>
              <div>
                <span>Address</span>
                <p style="margin:0; font-size:0.85rem; color:#94a3b8;">Ashokenagar Kalyangarh, West Bengal - 743223</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Col 4: Newsletter -->
        <div class="footer-col">
          <h4>Newsletter</h4>
          <p style="color: #94a3b8; font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">Subscribe for exclusive web design insights and digital growth strategies.</p>
          <form class="footer-newsletter-form" onsubmit="event.preventDefault(); alert('Thank you for subscribing!');">
            <input type="email" placeholder="Enter your email" required style="background: #1e293b; border: 1px solid #334155; color: #fff; padding: 10px 14px; border-radius: 8px; width: 100%; margin-bottom: 10px;">
            <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; background: linear-gradient(135deg, #4f46e5, #4338ca);">Subscribe <i class="fas fa-paper-plane"></i></button>
          </form>
        </div>
      </div>

      <div class="footer-bottom" style="border-top: 1px solid rgba(255,255,255,0.08); margin-top: 50px; padding-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px; font-size: 0.85rem; color: #64748b;">
        <p>© 2026 Nexus Digital. All Rights Reserved.</p>
        <div style="display: flex; gap: 20px;">
          <a href="privacy-policy" style="color: #64748b; text-decoration: none;">Privacy Policy</a>
          <a href="terms-and-conditions" style="color: #64748b; text-decoration: none;">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="js/reviews-database.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
"""

app_path = os.path.join(project_dir, "app-development.html")
with open(app_path, "w", encoding="utf-8") as f:
    f.write(app_html_code)
print("Redesigned app-development.html with 100% brand theme harmony!")

# -------------------------------------------------------------
# 4. REDESIGN COTMIT-AI.HTML (100% BRAND THEME HARMONY)
# -------------------------------------------------------------
ai_html_code = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary SEO Meta Tags -->
  <title>Cotmit AI Workflows & Autonomous AI Solutions | Nexus Digital</title>
  <meta name="title" content="Cotmit AI Workflows & Autonomous AI Solutions | Nexus Digital">
  <meta name="description" content="Explore Cotmit AI workflows & autonomous AI agent solutions by Nexus Digital. Custom LLM fine-tuning, automated WhatsApp bots, RAG knowledge bases, and enterprise AI automation.">
  <meta name="keywords" content="Cotmit AI, AI Agent Automation, Custom LLM, WhatsApp AI Chatbots, Zero Hallucination AI, Nexus Digital">
  <meta name="author" content="Nexus Digital">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://nexusdigital.net.in/cotmit-ai">
  <meta name="theme-color" content="#4f46e5">

  <!-- Open Graph / Facebook / WhatsApp Preview Tags -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://nexusdigital.net.in/cotmit-ai">
  <meta property="og:title" content="Cotmit AI Workflows & Autonomous AI Solutions | Nexus Digital">
  <meta property="og:description" content="Custom LLM fine-tuning, automated WhatsApp bots, zero hallucination RAG knowledge bases, and enterprise AI automation.">
  <meta property="og:image" content="https://nexusdigital.net.in/assets/images/hero_person.png">

  <!-- Favicon & Styles -->
  <link rel="icon" type="image/png" href="https://nexusdigital.net.in/favicon.png">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <!-- Navbar -->
  <header class="navbar">
    <div class="container nav-container">
      <a href="/" class="logo">
        <img src="assets/images/logo.png" alt="Nexus Digital Logo" class="nav-logo-img">
        <div class="logo-text">
          <span class="brand-title">Nexus<span style="color: var(--primary)">Digital</span></span>
          <span class="brand-tagline">Digital Marketing</span>
        </div>
      </a>

      <nav class="nav">
        <ul class="nav-menu">
          <li><a href="/" class="nav-link">Home</a></li>
          <li><a href="about" class="nav-link">About Us</a></li>
          """ + nav_dropdown_html + """
          <li><a href="portfolio" class="nav-link">Portfolio</a></li>
          <li><a href="contact" class="nav-link">Contact Us</a></li>
          <li class="mobile-cta-item">
            <a href="https://www.fiverr.com/s/VYjxoKm" target="_blank" class="btn btn-primary" style="width: 100%; justify-content: center;">Get Started <i class="fas fa-arrow-right"></i></a>
          </li>
        </ul>
      </nav>

      <div class="nav-actions" style="display: flex; align-items: center; gap: 15px;">
        <a href="https://www.fiverr.com/s/VYjxoKm" target="_blank" class="btn btn-primary nav-cta">Get Started <i class="fas fa-arrow-right"></i></a>
        <button class="mobile-toggle" aria-label="Toggle Navigation">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section style="padding: 160px 0 70px; text-align: center; background: radial-gradient(circle at 50% 20%, rgba(79, 70, 229, 0.12) 0%, transparent 60%);">
    <div class="container">
      <div style="display: inline-flex; align-items: center; gap: 8px; margin-bottom: 16px;">
        <span class="section-tag" style="margin:0;"><i class="fas fa-brain" style="color: var(--primary);"></i> Next-Gen AI Technology</span>
        <span class="badge" style="background: rgba(79, 70, 229, 0.15); color: var(--primary); border: 1px solid rgba(79, 70, 229, 0.3); font-weight: 700; padding: 6px 14px; border-radius: 20px; font-size: 0.82rem;"><i class="fas fa-spinner fa-spin"></i> In Progress / Beta Access</span>
      </div>

      <h1 style="font-size: 3.2rem; margin-bottom: 16px; line-height: 1.15;">
        Autonomous AI Agents & <span class="gradient-text">Cotmit AI Solutions</span>
      </h1>
      <p style="color: var(--text-muted); max-width: 700px; margin: 0 auto 28px; font-size: 1.1rem; line-height: 1.6;">
        Custom AI agent workflows, autonomous customer bots, enterprise LLM fine-tuning, and zero-hallucination knowledge bases built to automate modern business operations.
      </p>
      
      <div class="feature-pills-strip" style="justify-content: center; margin-bottom: 32px;">
        <div class="feature-pill-item"><i class="fas fa-robot"></i> Autonomous Agents</div>
        <div class="feature-pill-item"><i class="fas fa-database"></i> Zero Hallucination RAG</div>
        <div class="feature-pill-item"><i class="fab fa-whatsapp"></i> WhatsApp AI Bots</div>
        <div class="feature-pill-item"><i class="fas fa-microchip"></i> Enterprise API Integrations</div>
      </div>

      <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
        <a href="#pricing-packages" class="btn btn-primary"><i class="fas fa-tags"></i> View AI Tier Packages</a>
        <a href="contact" class="btn btn-outline"><i class="fas fa-paper-plane"></i> Request Beta Access</a>
      </div>
    </div>
  </section>

  <!-- Service Features Grid Section -->
  <section class="section" style="background: #ffffff; border-top: 1px solid var(--border-light); border-bottom: 1px solid var(--border-light);">
    <div class="container">
      <div class="section-header">
        <div class="section-tag"><i class="fas fa-sparkles"></i> Core Intelligence</div>
        <h2>Engineered For <span class="gradient-text">Enterprise Automation</span></h2>
        <p>Explore the flagship capabilities of the Cotmit AI platform and custom enterprise intelligence integrations.</p>
      </div>

      <div class="cards-grid" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));">
        <div class="service-card" style="background: #ffffff; border: 1px solid var(--border-light);">
          <div class="card-icon card-icon-primary"><i class="fas fa-robot"></i></div>
          <h3>Autonomous AI Agents</h3>
          <p>Multi-step AI agents that execute complex business workflows, extract structured data, and make autonomous decisions.</p>
        </div>

        <div class="service-card" style="background: #ffffff; border: 1px solid var(--border-light);">
          <div class="card-icon card-icon-primary"><i class="fab fa-whatsapp"></i></div>
          <h3>WhatsApp & Web AI Chatbots</h3>
          <p>24/7 intelligent customer support agents trained on your business documents, FAQs, and product catalogs with natural voice/text response.</p>
        </div>

        <div class="service-card" style="background: #ffffff; border: 1px solid var(--border-light);">
          <div class="card-icon card-icon-primary"><i class="fas fa-database"></i></div>
          <h3>Zero-Hallucination RAG</h3>
          <p>Retrieval-Augmented Generation (RAG) vector databases that strictly cite source documents, ensuring 100% factual accuracy.</p>
        </div>

        <div class="service-card" style="background: #ffffff; border: 1px solid var(--border-light);">
          <div class="card-icon card-icon-primary"><i class="fas fa-sliders"></i></div>
          <h3>Custom LLM Fine-Tuning</h3>
          <p>Domain-specific model customization for legal, medical, real estate, and finance applications trained on proprietary datasets.</p>
        </div>

        <div class="service-card" style="background: #ffffff; border: 1px solid var(--border-light);">
          <div class="card-icon card-icon-primary"><i class="fas fa-cogs"></i></div>
          <h3>Workflow Process Automation</h3>
          <p>Automate document scanning, email auto-replies, lead qualification, and CRM updates with zero human intervention.</p>
        </div>

        <div class="service-card" style="background: #ffffff; border: 1px solid var(--border-light);">
          <div class="card-icon card-icon-primary"><i class="fas fa-shield-halved"></i></div>
          <h3>Enterprise Security & Privacy</h3>
          <p>SOC-2 compliance, end-to-end data encryption, private cloud hosting, and zero data training retention policies.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Transparent Pricing Section -->
  <section id="pricing-packages" class="section" style="background: var(--bg-surface);">
    <div class="container">
      <div class="section-header">
        <div class="section-tag"><i class="fas fa-tags"></i> Transparent Pricing</div>
        <h2>Cotmit AI <span class="gradient-text">Tier Packages</span></h2>
        <p>Flexible pricing tiers for custom AI bot development & enterprise workflows. Zero hidden fees.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 28px; max-width: 1100px; margin: 0 auto;">
        <!-- Package 1: Starter AI Bot -->
        <div class="pricing-card" style="background: var(--bg-card); border: 1px solid var(--border-light); border-radius: var(--radius-lg); padding: 32px; position: relative;">
          <h3 style="font-size: 1.4rem; margin-bottom: 8px;">Starter AI Bot</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">Ideal for small businesses needing an automated customer support chatbot.</p>
          <div style="font-size: 2.5rem; font-weight: 800; color: var(--text-main); margin-bottom: 20px;">
            ₹9,999 <span style="font-size: 0.9rem; color: var(--text-muted); font-weight: 400;">/ starting</span>
          </div>
          <ul style="list-style: none; padding: 0; margin: 0 0 28px; display: flex; flex-direction: column; gap: 12px; font-size: 0.92rem; color: var(--text-muted);">
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> Web Widget or WhatsApp Bot</li>
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> Trained on Up to 50 Company Docs</li>
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> Up to 1,000 Monthly Conversations</li>
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> Zero Hallucination Guarantee</li>
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> 30 Days Setup & Maintenance</li>
          </ul>
          <a href="https://wa.me/919475320402?text=Hi%20Nexus%20Digital,%20I%20am%20interested%20in%20the%20Starter%20AI%20Bot%20Package" target="_blank" class="btn btn-outline" style="width: 100%; justify-content: center;"><i class="fab fa-whatsapp"></i> Request Starter AI Bot</a>
        </div>

        <!-- Package 2: Growth AI Workflow (Featured) -->
        <div class="pricing-card" style="background: var(--bg-card); border: 2px solid var(--primary); border-radius: var(--radius-lg); padding: 32px; position: relative; box-shadow: var(--shadow-glow);">
          <div style="position: absolute; top: -14px; right: 24px; background: var(--primary); color: #fff; padding: 4px 14px; border-radius: 20px; font-size: 0.78rem; font-weight: 700; text-transform: uppercase;">Popular Choice</div>
          <h3 style="font-size: 1.4rem; margin-bottom: 8px;">Growth AI Agent Workflow</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">Autonomous AI agent system integrated with CRM, lead forms & WhatsApp.</p>
          <div style="font-size: 2.5rem; font-weight: 800; color: var(--text-main); margin-bottom: 20px;">
            ₹24,999 <span style="font-size: 0.9rem; color: var(--text-muted); font-weight: 400;">/ starting</span>
          </div>
          <ul style="list-style: none; padding: 0; margin: 0 0 28px; display: flex; flex-direction: column; gap: 12px; font-size: 0.92rem; color: var(--text-muted);">
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> Multi-Channel (Web, WhatsApp, Email)</li>
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> Trained on Unlimited Enterprise Docs</li>
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> Up to 10,000 Monthly Conversations</li>
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> CRM & Lead Qualification Integration</li>
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> Custom Voice & Tone Fine-Tuning</li>
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> 60 Days Post-Launch Support</li>
          </ul>
          <a href="https://wa.me/919475320402?text=Hi%20Nexus%20Digital,%20I%20am%20interested%20in%20the%20Growth%20AI%20Workflow%20Package" target="_blank" class="btn btn-primary" style="width: 100%; justify-content: center;"><i class="fab fa-whatsapp"></i> Request Growth AI Agent</a>
        </div>

        <!-- Package 3: Enterprise AI Ecosystem -->
        <div class="pricing-card" style="background: var(--bg-card); border: 1px solid var(--border-light); border-radius: var(--radius-lg); padding: 32px; position: relative;">
          <h3 style="font-size: 1.4rem; margin-bottom: 8px;">Enterprise AI Ecosystem</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">Bespoke LLM fine-tuning, private vector DBs, and dedicated enterprise AI infrastructure.</p>
          <div style="font-size: 2.5rem; font-weight: 800; color: var(--text-main); margin-bottom: 20px;">
            ₹59,999 <span style="font-size: 0.9rem; color: var(--text-muted); font-weight: 400;">/ custom</span>
          </div>
          <ul style="list-style: none; padding: 0; margin: 0 0 28px; display: flex; flex-direction: column; gap: 12px; font-size: 0.92rem; color: var(--text-muted);">
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> Proprietary LLM Fine-Tuning</li>
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> Dedicated Vector Database & RAG</li>
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> Unlimited Monthly Messages & API</li>
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> Private On-Premise Cloud Setup</li>
            <li><i class="fas fa-check" style="color: var(--primary); margin-right: 8px;"></i> 1 Year SLA & Dedicated AI Engineer</li>
          </ul>
          <a href="https://wa.me/919475320402?text=Hi%20Nexus%20Digital,%20I%20am%20interested%20in%20the%20Enterprise%20AI%20Ecosystem" target="_blank" class="btn btn-outline" style="width: 100%; justify-content: center;"><i class="fab fa-whatsapp"></i> Request Enterprise AI</a>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Banner Creative -->
  <section style="padding: 70px 0; background: var(--bg-surface);">
    <div class="container">
      <div class="cta-banner-creative">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 30px;">
          <div>
            <div class="section-tag" style="background: rgba(255, 255, 255, 0.1); color: #fff; margin-bottom: 12px;"><i class="fas fa-brain"></i> Unlock Cotmit AI Beta</div>
            <h2 style="color: #fff; font-size: 2.2rem; margin-bottom: 10px;">
              Accelerate Your Growth With <span style="background: linear-gradient(135deg, #818cf8, #38bdf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Cotmit AI</span>
            </h2>
            <p style="color: #94a3b8; font-size: 1.05rem; max-width: 600px; margin: 0;">
              Get early beta access and custom AI automation workflow consultation from Nexus Digital. We reply within 24 hours.
            </p>
          </div>

          <div class="cta-action-side">
            <a href="contact" class="btn-cta-main">
              <i class="fas fa-paper-plane"></i> Request Beta Proposal
            </a>
            <a href="https://wa.me/919475320402" target="_blank" class="btn-cta-whatsapp">
              <i class="fab fa-whatsapp"></i> Chat On WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Flipkart Style Live Reviews Section -->
  <section class="section reviews-section" id="reviews">
    <div class="container">
      <div class="section-header section-header-left" style="margin-bottom: 32px;">
        <div class="section-tag"><i class="fas fa-star" style="color: #f59e0b;"></i> Customer Ratings & Feedback</div>
        <h2>Verified Client <span class="gradient-text">Reviews</span></h2>
      </div>
      
      <div class="flipkart-reviews-container" id="flipkartReviewsContainer">
        <!-- Rendered dynamically by js/reviews-database.js -->
      </div>
    </div>
  </section>

  <!-- Ultra-Professional Agency Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <!-- Col 1: Brand Info -->
        <div class="footer-brand">
          <a href="/" class="logo" style="margin-bottom: 18px;">
            <img src="assets/images/logo.png" alt="Nexus Digital Logo" class="nav-logo-img">
            <div class="logo-text">
              <span class="brand-title" style="color: #ffffff;">Nexus<span style="color: var(--primary)">Digital</span></span>
              <span class="brand-tagline" style="color: #94a3b8;">Digital Marketing</span>
            </div>
          </a>
          <p style="color: #94a3b8; font-size: 0.92rem; line-height: 1.6; margin-bottom: 22px;">Crafting bespoke, high-converting digital experiences that elevate modern brands & drive real growth.</p>
          <div class="footer-socials">
            <a href="https://wa.me/919475320402" target="_blank" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
            <a href="https://www.facebook.com/profile.php?id=61592571871118" target="_blank" title="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/nexusofficial.digital/" target="_blank" title="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="https://www.linkedin.com/company/nexus-digital2/" target="_blank" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>

        <!-- Col 2: Quick Links -->
        <div class="footer-col">
          <h4>Navigation</h4>
          <ul class="footer-links">
            <li><a href="/"><i class="fas fa-chevron-right"></i> Home</a></li>
            <li><a href="about"><i class="fas fa-chevron-right"></i> About Us</a></li>
            <li><a href="website-design"><i class="fas fa-chevron-right"></i> Website Design</a></li>
            <li><a href="app-development"><i class="fas fa-chevron-right"></i> App Development</a></li>
            <li><a href="cotmit-ai"><i class="fas fa-chevron-right"></i> Cotmit AI</a></li>
            <li><a href="portfolio"><i class="fas fa-chevron-right"></i> Portfolio</a></li>
            <li><a href="contact"><i class="fas fa-chevron-right"></i> Contact Us</a></li>
          </ul>
        </div>

        <!-- Col 3: Direct Contact -->
        <div class="footer-col">
          <h4>Get In Touch</h4>
          <ul class="footer-contact-list">
            <li>
              <i class="fas fa-phone"></i>
              <div>
                <span>Call Us</span>
                <a href="tel:+918972722259" style="display:block;">+91 89727 22259</a>
                <a href="tel:+919475320402" style="display:block; margin-top:2px;">+91 94753 20402</a>
              </div>
            </li>
            <li>
              <i class="fas fa-envelope"></i>
              <div>
                <span>Email Us</span>
                <a href="mailto:contact@nexusdigital.net.in">contact@nexusdigital.net.in</a>
              </div>
            </li>
            <li>
              <i class="fas fa-location-dot"></i>
              <div>
                <span>Address</span>
                <p style="margin:0; font-size:0.85rem; color:#94a3b8;">Ashokenagar Kalyangarh, West Bengal - 743223</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Col 4: Newsletter -->
        <div class="footer-col">
          <h4>Newsletter</h4>
          <p style="color: #94a3b8; font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">Subscribe for exclusive web design insights and digital growth strategies.</p>
          <form class="footer-newsletter-form" onsubmit="event.preventDefault(); alert('Thank you for subscribing!');">
            <input type="email" placeholder="Enter your email" required style="background: #1e293b; border: 1px solid #334155; color: #fff; padding: 10px 14px; border-radius: 8px; width: 100%; margin-bottom: 10px;">
            <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; background: linear-gradient(135deg, #4f46e5, #4338ca);">Subscribe <i class="fas fa-paper-plane"></i></button>
          </form>
        </div>
      </div>

      <div class="footer-bottom" style="border-top: 1px solid rgba(255,255,255,0.08); margin-top: 50px; padding-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px; font-size: 0.85rem; color: #64748b;">
        <p>© 2026 Nexus Digital. All Rights Reserved.</p>
        <div style="display: flex; gap: 20px;">
          <a href="privacy-policy" style="color: #64748b; text-decoration: none;">Privacy Policy</a>
          <a href="terms-and-conditions" style="color: #64748b; text-decoration: none;">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="js/reviews-database.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
"""

ai_path = os.path.join(project_dir, "cotmit-ai.html")
with open(ai_path, "w", encoding="utf-8") as f:
    f.write(ai_html_code)
print("Redesigned cotmit-ai.html with 100% brand theme harmony!")
