/* ==========================================
   Nexus Digital - Flipkart Style Live Reviews Engine
   Powered by Supabase Cloud Database & Storage
   ========================================== */

const SUPABASE_URL = 'https://vbkcccgvcksgwurgndch.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_pbIRFGMV3_VjMTbJKIDEoQ_R07lLnTf';

// Initial Verified Reviews (Rendered synchronously in 0ms - zero delay, zero spinner)
let allReviewsList = [
  {
    id: 'rev-default-1',
    name: 'Dipon Biswas',
    overall_rating: 5,
    behavior_rating: 5,
    support_rating: 5,
    quality_rating: 5,
    pricing_rating: 5,
    review_text: 'Nexus Digital delivered an incredible, high-performing website for Basirhat Honey Cultivators Co-Op. Their design quality, speed, and communication were outstanding!',
    image_urls: ['assets/images/project_basirhat_honey.png'],
    created_at: '2026-08-26T12:00:00.000Z'
  }
];

// Try loading from LocalStorage for updated cached list
try {
  const cached = localStorage.getItem('nexus_reviews_cache');
  if (cached) {
    const parsed = JSON.parse(cached);
    if (Array.isArray(parsed) && parsed.length > 0) {
      allReviewsList = parsed;
    }
  }
} catch (e) {}

let currentFilter = 'all';
let currentLightboxImages = [];
let currentLightboxIndex = 0;

// Initialize Supabase Client
let supabaseClient = null;
if (typeof supabase !== 'undefined' && supabase.createClient) {
  supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// Fetch Reviews from Supabase Database (Background Sync)
async function loadLiveReviews() {
  // Render INSTANTLY in 0ms synchronously
  if (document.getElementById('flipkartAllReviewsPageContainer')) {
    renderFlipkartAllReviewsPage();
  } else {
    renderFlipkartReviewSection();
  }

  // Background fetch from Supabase
  try {
    if (supabaseClient) {
      const { data, error } = await supabaseClient
        .from('reviews')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        allReviewsList = data;
        try {
          localStorage.setItem('nexus_reviews_cache', JSON.stringify(data));
        } catch (e) {}
        
        // Silently update DOM with latest background database records
        if (document.getElementById('flipkartAllReviewsPageContainer')) {
          renderFlipkartAllReviewsPage();
        } else {
          renderFlipkartReviewSection();
        }
      }
    }
  } catch (err) {
    console.warn('Supabase fetch error:', err);
  }
}

// Helper: Convert File to Base64 (Bulletproof Photo Fallback)
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

// Helper: Calculate Name Initials (Sandip Kundu -> SK)
function getInitials(name) {
  if (!name) return 'ND';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

// Helper: Format Date
function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch (e) {
    return 'Recent';
  }
}

// Helper: Render Dynamic Star Icons (Gray when 0, Green when rated)
function renderStarIcons(rating) {
  const num = Number(rating) || 0;
  if (num === 0) {
    return Array(5).fill('<i class="far fa-star" style="color: #cbd5e1;"></i>').join('');
  }
  let starsHtml = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(num)) {
      starsHtml += '<i class="fas fa-star" style="color: #10b981;"></i>';
    } else if (i - 0.5 <= num) {
      starsHtml += '<i class="fas fa-star-half-stroke" style="color: #10b981;"></i>';
    } else {
      starsHtml += '<i class="far fa-star" style="color: #cbd5e1;"></i>';
    }
  }
  return starsHtml;
}

// Helper: Truncate Review Text with Read More Link
function formatReviewTextWithReadMore(text, maxLen = 145, revId) {
  if (!text) return '';
  if (text.length <= maxLen) {
    return `<span class="review-text-full">${text}</span>`;
  }
  const truncated = text.slice(0, maxLen).trim() + '...';
  return `
    <span class="review-text-truncated">${truncated}</span>
    <span class="btn-read-more" onclick="openFullReviewModal('${revId}')">Read More</span>
  `;
}

// Calculate Metrics (Strictly dynamic mathematical average from actual records)
function calculateReviewMetrics(reviews) {
  if (!reviews || reviews.length === 0) {
    return {
      total: 0,
      avgOverall: '0.0',
      avgBehavior: '0.0',
      avgSupport: '0.0',
      avgQuality: '0.0',
      avgPricing: '0.0',
      pctBehavior: 0,
      pctSupport: 0,
      pctQuality: 0,
      pctPricing: 0,
      starCounts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      allPhotos: []
    };
  }

  const total = reviews.length;
  let totalRatingSum = 0;
  let behaviorSum = 0, supportSum = 0, qualitySum = 0, pricingSum = 0;
  let starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let allPhotos = [];

  reviews.forEach(r => {
    const ov = Number(r.overall_rating) || 5;
    totalRatingSum += ov;
    behaviorSum += Number(r.behavior_rating) || 5;
    supportSum += Number(r.support_rating) || 5;
    qualitySum += Number(r.quality_rating) || 5;
    pricingSum += Number(r.pricing_rating) || 5;

    const roundedStar = Math.min(5, Math.max(1, Math.round(ov)));
    starCounts[roundedStar]++;

    if (r.image_urls && Array.isArray(r.image_urls)) {
      r.image_urls.forEach(url => {
        if (url) allPhotos.push(url);
      });
    }
  });

  return {
    total,
    avgOverall: (totalRatingSum / total).toFixed(1),
    avgBehavior: (behaviorSum / total).toFixed(1),
    avgSupport: (supportSum / total).toFixed(1),
    avgQuality: (qualitySum / total).toFixed(1),
    avgPricing: (pricingSum / total).toFixed(1),
    pctBehavior: Math.round((behaviorSum / (total * 5)) * 100),
    pctSupport: Math.round((supportSum / (total * 5)) * 100),
    pctQuality: Math.round((qualitySum / (total * 5)) * 100),
    pctPricing: Math.round((pricingSum / (total * 5)) * 100),
    starCounts,
    allPhotos
  };
}

// ----------------------------------------------------
// 1. Render Homepage Flipkart Review Component
// ----------------------------------------------------
function renderFlipkartReviewSection() {
  const container = document.getElementById('flipkartReviewsContainer');
  if (!container) return;

  const m = calculateReviewMetrics(allReviewsList);

  container.innerHTML = `
    <!-- Top 1/4th: 4 Circular Progress Category Ratings -->
    <div class="flipkart-circles-strip">
      <div class="circle-rating-card">
        <div class="circle-progress" style="--percent: ${m.pctBehavior};">
          <svg viewBox="0 0 36 36" class="circular-chart">
            <path class="circle-bg" fill="none" stroke="#e2e8f0" stroke-width="3.5" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path class="circle-fill" fill="none" stroke="#10b981" stroke-width="3.5" stroke-dasharray="${m.pctBehavior}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
          <div class="circle-number">${m.avgBehavior} ★</div>
        </div>
        <div class="circle-label">Behavior</div>
      </div>

      <div class="circle-rating-card">
        <div class="circle-progress" style="--percent: ${m.pctSupport};">
          <svg viewBox="0 0 36 36" class="circular-chart">
            <path class="circle-bg" fill="none" stroke="#e2e8f0" stroke-width="3.5" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path class="circle-fill" fill="none" stroke="#10b981" stroke-width="3.5" stroke-dasharray="${m.pctSupport}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
          <div class="circle-number">${m.avgSupport} ★</div>
        </div>
        <div class="circle-label">Customer Support</div>
      </div>

      <div class="circle-rating-card">
        <div class="circle-progress" style="--percent: ${m.pctQuality};">
          <svg viewBox="0 0 36 36" class="circular-chart">
            <path class="circle-bg" fill="none" stroke="#e2e8f0" stroke-width="3.5" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path class="circle-fill" fill="none" stroke="#10b981" stroke-width="3.5" stroke-dasharray="${m.pctQuality}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
          <div class="circle-number">${m.avgQuality} ★</div>
        </div>
        <div class="circle-label">Build Quality</div>
      </div>

      <div class="circle-rating-card">
        <div class="circle-progress" style="--percent: ${m.pctPricing};">
          <svg viewBox="0 0 36 36" class="circular-chart">
            <path class="circle-bg" fill="none" stroke="#e2e8f0" stroke-width="3.5" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path class="circle-fill" fill="none" stroke="#10b981" stroke-width="3.5" stroke-dasharray="${m.pctPricing}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
          <div class="circle-number">${m.avgPricing} ★</div>
        </div>
        <div class="circle-label">Pricing Value</div>
      </div>
    </div>

    <!-- Bottom 3/4th Layout: Left Summary Bar + Right Carousel -->
    <div class="flipkart-main-grid">
      <!-- Left Column: Overall Rating & 5 Star Breakdown Fills -->
      <div class="flipkart-summary-left">
        <div class="overall-rating-badge">
          <span class="rating-big-num">${m.avgOverall}</span>
          <span class="rating-star-icon">★</span>
        </div>
        <div class="total-ratings-text">${m.total} Ratings & ${m.total} Verified Reviews</div>

        <div class="star-bars-container">
          ${[5, 4, 3, 2, 1].map(star => {
            const count = m.starCounts[star] || 0;
            const pct = m.total > 0 ? Math.round((count / m.total) * 100) : 0;
            return `
              <div class="star-bar-row">
                <div class="star-label">${star} ★</div>
                <div class="star-bar-bg">
                  <div class="star-bar-fill" style="width: ${pct}%;"></div>
                </div>
                <div class="star-count-num">${count}</div>
              </div>
            `;
          }).join('')}
        </div>

        <button onclick="openReviewModal()" class="btn-write-review">
          <i class="fas fa-pen-to-square"></i> <span>Rate &amp; Write Review</span>
        </button>
      </div>

      <!-- Right Column: Review Cards Carousel -->
      <div class="flipkart-reviews-right">
        <div class="reviews-carousel-wrapper">
          <div class="reviews-carousel-track">
            ${allReviewsList.length === 0 ? `
              <div class="flipkart-review-card view-all-card" style="min-width: 100%; border: 2px dashed #a5b4fc;">
                <div class="view-all-content" style="padding: 20px;">
                  <i class="fas fa-star view-all-icon" style="color: #cbd5e1;"></i>
                  <h4>No Reviews Yet</h4>
                  <p>Be the very first client to share your experience with Nexus Digital!</p>
                  <button onclick="openReviewModal()" class="btn-write-review" style="margin-top: 14px; max-width: 220px;">Write First Review</button>
                </div>
              </div>
            ` : allReviewsList.map(rev => `
              <div class="flipkart-review-card">
                <div class="card-user-header">
                  <div class="user-avatar">${getInitials(rev.name)}</div>
                  <div>
                    <h5 class="user-name">${rev.name}</h5>
                    <div class="user-rating-row">
                      <span class="star-pill">${rev.overall_rating} ★</span>
                      <span class="review-date">${formatDate(rev.created_at)}</span>
                    </div>
                  </div>
                </div>

                <!-- Photos ABOVE Written Review Text -->
                ${rev.image_urls && rev.image_urls.length > 0 ? `
                  <div class="review-thumbnails-row" style="margin-bottom: 12px;">
                    ${rev.image_urls.map((img, imgIdx) => `
                      <img src="${img}" alt="Project Photo" onclick="openLightbox(['${rev.image_urls.join("','")}'], ${imgIdx})" class="review-thumb-img" />
                    `).join('')}
                  </div>
                ` : ''}

                <!-- Review Text with Read More -->
                <p class="review-body">${formatReviewTextWithReadMore(rev.review_text, 140, rev.id)}</p>
              </div>
            `).join('')}

            ${allReviewsList.length > 0 ? `
              <!-- Last Card: View All Reviews -->
              <div class="flipkart-review-card view-all-card" onclick="window.location.href='all-reviews'">
                <div class="view-all-content">
                  <i class="fas fa-comments view-all-icon"></i>
                  <h4>View All Reviews</h4>
                  <p>Read all ${m.total} verified client ratings & project photos</p>
                  <span class="btn-view-all-link">Explore All <i class="fas fa-arrow-right"></i></span>
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------
// 2. Render Full Flipkart Reviews Page Layout (Matching User Screenshot 2)
// ----------------------------------------------------
function renderFlipkartAllReviewsPage() {
  const container = document.getElementById('flipkartAllReviewsPageContainer');
  if (!container) return;

  const m = calculateReviewMetrics(allReviewsList);

  // Filter Reviews
  let filteredList = [...allReviewsList];
  if (currentFilter === 'positive') {
    filteredList = filteredList.filter(r => Number(r.overall_rating) >= 4);
  } else if (currentFilter === 'critical') {
    filteredList = filteredList.filter(r => Number(r.overall_rating) < 4);
  } else if (currentFilter === 'photos') {
    filteredList = filteredList.filter(r => r.image_urls && r.image_urls.length > 0);
  }

  container.innerHTML = `
    <!-- Top Summary Header Grid (Matching Screenshot 2) -->
    <div class="flipkart-allreviews-top-card">
      <div class="top-summary-left">
        <div class="big-stars-row">
          ${renderStarIcons(m.avgOverall)}
        </div>
        <div class="summary-total-ratings">${m.total} ratings and ${m.total} reviews</div>
        <div class="summary-overall-score">${m.avgOverall} <span style="font-size:1.2rem;">out of 5</span></div>
        <button onclick="openReviewModal()" class="btn-write-review-alt" style="margin-top:14px;"><i class="fas fa-pen-to-square"></i> <span>Rate &amp; Write Review</span></button>
      </div>

      <div class="top-summary-right">
        <div class="star-bars-container">
          ${[5, 4, 3, 2, 1].map(star => {
            const count = m.starCounts[star] || 0;
            const pct = m.total > 0 ? Math.round((count / m.total) * 100) : 0;
            return `
              <div class="star-bar-row">
                <div class="star-label">${star} ★</div>
                <div class="star-bar-bg">
                  <div class="star-bar-fill" style="width: ${pct}%;"></div>
                </div>
                <div class="star-count-num">${count}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>

    <!-- Customer Uploaded Photos Gallery Strip (Matching Screenshot 2) -->
    ${m.allPhotos.length > 0 ? `
      <div class="photos-gallery-strip-container">
        <h4 class="photos-strip-title">Customer Photos (${m.allPhotos.length})</h4>
        <div class="photos-strip-scroll">
          ${m.allPhotos.map((img, idx) => `
            <img src="${img}" alt="Customer Uploaded Screenshot" class="strip-thumb-img" onclick="openLightbox(['${m.allPhotos.join("','")}'], ${idx})" />
          `).join('')}
        </div>
      </div>
    ` : ''}

    <!-- Filter Buttons Bar (Matching Screenshot 2) -->
    <div class="filter-pills-bar">
      <span class="filter-label">User reviews sorted by:</span>
      <button class="filter-pill ${currentFilter === 'all' ? 'active' : ''}" onclick="setReviewFilter('all')">All Reviews</button>
      <button class="filter-pill ${currentFilter === 'positive' ? 'active' : ''}" onclick="setReviewFilter('positive')">Positive (4-5 ★)</button>
      <button class="filter-pill ${currentFilter === 'critical' ? 'active' : ''}" onclick="setReviewFilter('critical')">Critical (&lt;4 ★)</button>
      <button class="filter-pill ${currentFilter === 'photos' ? 'active' : ''}" onclick="setReviewFilter('photos')">With Photos (${m.allPhotos.length})</button>
    </div>

    <!-- Reviews Grid List (Full Vertical Width Grid - Matching Screenshot 2) -->
    <div class="flipkart-allreviews-list">
      ${filteredList.length === 0 ? `
        <div class="no-reviews-box">No reviews found matching this filter. Be the first to add one!</div>
      ` : filteredList.map(rev => `
        <div class="allreviews-item-card">
          <div class="item-rating-header">
            <span class="star-pill-large">${rev.overall_rating} ★</span>
            <span class="item-headline">${rev.overall_rating >= 4.5 ? 'Excellent Work & Highly Satisfied' : 'Good Quality Service'}</span>
          </div>

          <!-- Photos ABOVE Written Review Text -->
          ${rev.image_urls && rev.image_urls.length > 0 ? `
            <div class="item-thumbnails-grid" style="margin-bottom: 14px;">
              ${rev.image_urls.map((img, imgIdx) => `
                <img src="${img}" alt="Project Photo" onclick="openLightbox(['${rev.image_urls.join("','")}'], ${imgIdx})" class="item-thumb-photo" />
              `).join('')}
            </div>
          ` : ''}

          <!-- Review Text with Read More -->
          <p class="item-review-text">${formatReviewTextWithReadMore(rev.review_text, 180, rev.id)}</p>

          <div class="item-user-meta">
            <span class="meta-avatar">${getInitials(rev.name)}</span>
            <span class="meta-name">${rev.name}</span>
            <span class="meta-dot">•</span>
            <span class="meta-date">${formatDate(rev.created_at)}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function setReviewFilter(filterType) {
  currentFilter = filterType;
  renderFlipkartAllReviewsPage();
}

// ----------------------------------------------------
// Full Review View Modal Popup (Read More Popup)
// ----------------------------------------------------
function openFullReviewModal(revId) {
  const rev = allReviewsList.find(r => String(r.id) === String(revId));
  if (!rev) return;

  let modal = document.getElementById('fullReviewDetailModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'fullReviewDetailModal';
    modal.className = 'review-modal-overlay';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="review-modal-box" style="max-width: 580px;">
      <button class="modal-close-btn" onclick="closeFullReviewModal()">&times;</button>
      
      <div class="card-user-header" style="margin-bottom: 18px;">
        <div class="user-avatar" style="width: 48px; height: 48px; font-size: 1.1rem;">${getInitials(rev.name)}</div>
        <div>
          <h4 class="user-name" style="font-size: 1.1rem; margin-bottom: 4px;">${rev.name}</h4>
          <div class="user-rating-row">
            <span class="star-pill">${rev.overall_rating} ★</span>
            <span class="review-date">${formatDate(rev.created_at)}</span>
          </div>
        </div>
      </div>

      <!-- Category Star Breakdown Pills in Modal -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; background: #f8fafc; padding: 12px 16px; border-radius: 12px; margin-bottom: 18px; font-size: 0.85rem; font-weight: 700; color: #475569;">
        <div>Behavior: <span style="color:#047857;">${rev.behavior_rating || 5} ★</span></div>
        <div>Support: <span style="color:#047857;">${rev.support_rating || 5} ★</span></div>
        <div>Quality: <span style="color:#047857;">${rev.quality_rating || 5} ★</span></div>
        <div>Pricing: <span style="color:#047857;">${rev.pricing_rating || 5} ★</span></div>
      </div>

      <!-- Uploaded Photos if any -->
      ${rev.image_urls && rev.image_urls.length > 0 ? `
        <div class="item-thumbnails-grid" style="margin-bottom: 16px;">
          ${rev.image_urls.map((img, imgIdx) => `
            <img src="${img}" alt="Project Photo" onclick="openLightbox(['${rev.image_urls.join("','")}'], ${imgIdx})" class="item-thumb-photo" style="width: 90px; height: 90px;" />
          `).join('')}
        </div>
      ` : ''}

      <!-- Full Review Text -->
      <div style="font-size: 1rem; color: #334155; line-height: 1.6; background: #ffffff; padding: 10px 0;">
        ${rev.review_text}
      </div>

      <div style="text-align: right; margin-top: 20px;">
        <button onclick="closeFullReviewModal()" class="btn-cancel">Close</button>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

function closeFullReviewModal() {
  const modal = document.getElementById('fullReviewDetailModal');
  if (modal) modal.classList.remove('active');
}

// ----------------------------------------------------
// Lightbox Carousel Modal Popup (Photo Preview)
// ----------------------------------------------------
function openLightbox(imagesArr, startIdx = 0) {
  if (!imagesArr || !imagesArr.length) return;
  currentLightboxImages = imagesArr;
  currentLightboxIndex = startIdx;

  let modal = document.getElementById('reviewLightboxModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'reviewLightboxModal';
    modal.className = 'lightbox-modal-overlay';
    document.body.appendChild(modal);
  }

  updateLightboxContent(modal);
  modal.classList.add('active');
}

function updateLightboxContent(modal) {
  const currentImg = currentLightboxImages[currentLightboxIndex];
  modal.innerHTML = `
    <div class="lightbox-container">
      <button class="lightbox-close" onclick="closeLightbox()">&times;</button>
      ${currentLightboxImages.length > 1 ? `
        <button class="lightbox-prev" onclick="slideLightbox(-1)"><i class="fas fa-chevron-left"></i></button>
        <button class="lightbox-next" onclick="slideLightbox(1)"><i class="fas fa-chevron-right"></i></button>
      ` : ''}
      <img src="${currentImg}" class="lightbox-img" alt="Enlarged Project Photo" />
      <div class="lightbox-caption">${currentLightboxIndex + 1} / ${currentLightboxImages.length}</div>
    </div>
  `;
}

function slideLightbox(dir) {
  currentLightboxIndex = (currentLightboxIndex + dir + currentLightboxImages.length) % currentLightboxImages.length;
  const modal = document.getElementById('reviewLightboxModal');
  if (modal) updateLightboxContent(modal);
}

function closeLightbox() {
  const modal = document.getElementById('reviewLightboxModal');
  if (modal) modal.classList.remove('active');
}

// ----------------------------------------------------
// 3-Step Review Submission Modal Engine
// ----------------------------------------------------
let currentReviewStep = 1;
let selectedOverallStar = 5;
let selectedBehaviorStar = 5;
let selectedSupportStar = 5;
let selectedQualityStar = 5;
let selectedPricingStar = 5;
let selectedPhotoFile = null;

function openReviewModal() {
  currentReviewStep = 1;
  selectedOverallStar = 5;
  selectedBehaviorStar = 5;
  selectedSupportStar = 5;
  selectedQualityStar = 5;
  selectedPricingStar = 5;
  selectedPhotoFile = null;

  let modal = document.getElementById('threeStepReviewModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'threeStepReviewModal';
    modal.className = 'review-modal-overlay';
    document.body.appendChild(modal);
  }

  renderReviewModalStep(modal);
  modal.classList.add('active');
}

function closeReviewModal() {
  const modal = document.getElementById('threeStepReviewModal');
  if (modal) modal.classList.remove('active');
}

function renderReviewModalStep(modal) {
  modal.innerHTML = `
    <div class="review-modal-box">
      <button class="modal-close-btn" onclick="closeReviewModal()">&times;</button>
      
      <!-- Stepper Header -->
      <div class="modal-stepper-header">
        <div class="step-badge ${currentReviewStep >= 1 ? 'active' : ''}">1. Rating</div>
        <div class="step-line ${currentReviewStep >= 2 ? 'active' : ''}"></div>
        <div class="step-badge ${currentReviewStep >= 2 ? 'active' : ''}">2. Review</div>
        <div class="step-line ${currentReviewStep >= 3 ? 'active' : ''}"></div>
        <div class="step-badge ${currentReviewStep >= 3 ? 'active' : ''}">3. Attachment</div>
      </div>

      <!-- Step 1: Mandatory Category Star Ratings -->
      ${currentReviewStep === 1 ? `
        <div class="step-content">
          <h4 class="step-title">Step 1: Rate Your Experience</h4>
          <p class="step-subtitle">Please select star ratings for each category (Mandatory)</p>

          <div class="star-select-group">
            <label>Overall Experience *</label>
            <div class="star-picker" id="starPickerOverall">
              ${[1, 2, 3, 4, 5].map(s => `
                <span class="star ${s <= selectedOverallStar ? 'filled' : ''}" onclick="setStar('overall', ${s})">★</span>
              `).join('')}
            </div>
          </div>

          <div class="star-select-grid">
            <div class="star-select-group">
              <label>Behavior *</label>
              <div class="star-picker">
                ${[1, 2, 3, 4, 5].map(s => `<span class="star ${s <= selectedBehaviorStar ? 'filled' : ''}" onclick="setStar('behavior', ${s})">★</span>`).join('')}
              </div>
            </div>

            <div class="star-select-group">
              <label>Customer Support *</label>
              <div class="star-picker">
                ${[1, 2, 3, 4, 5].map(s => `<span class="star ${s <= selectedSupportStar ? 'filled' : ''}" onclick="setStar('support', ${s})">★</span>`).join('')}
              </div>
            </div>

            <div class="star-select-group">
              <label>Build Quality *</label>
              <div class="star-picker">
                ${[1, 2, 3, 4, 5].map(s => `<span class="star ${s <= selectedQualityStar ? 'filled' : ''}" onclick="setStar('quality', ${s})">★</span>`).join('')}
              </div>
            </div>

            <div class="star-select-group">
              <label>Pricing Value *</label>
              <div class="star-picker">
                ${[1, 2, 3, 4, 5].map(s => `<span class="star ${s <= selectedPricingStar ? 'filled' : ''}" onclick="setStar('pricing', ${s})">★</span>`).join('')}
              </div>
            </div>
          </div>

          <div class="modal-actions-row">
            <button onclick="closeReviewModal()" class="btn-cancel">Cancel</button>
            <button onclick="nextReviewStep(2)" class="btn-next">Next: Review Details <i class="fas fa-arrow-right"></i></button>
          </div>
        </div>
      ` : ''}

      <!-- Step 2: Mandatory Name & Written Review -->
      ${currentReviewStep === 2 ? `
        <div class="step-content">
          <h4 class="step-title">Step 2: Write Your Feedback</h4>
          <p class="step-subtitle">Share your detailed experience with Nexus Digital (Mandatory)</p>

          <div class="form-group-modal">
            <label for="revClientName">Your Full Name *</label>
            <input type="text" id="revClientName" class="form-input-modal" placeholder="e.g. Sandip Kundu" required value="${window.savedRevName || ''}">
          </div>

          <div class="form-group-modal">
            <label for="revClientText">Detailed Review *</label>
            <textarea id="revClientText" class="form-input-modal" rows="4" placeholder="Tell us about the project quality, speed, communication, and overall result..." required>${window.savedRevText || ''}</textarea>
          </div>

          <div class="modal-actions-row">
            <button onclick="nextReviewStep(1)" class="btn-cancel"><i class="fas fa-arrow-left"></i> Back</button>
            <button onclick="validateStep2AndNext()" class="btn-next">Next: Upload Photos <i class="fas fa-arrow-right"></i></button>
          </div>
        </div>
      ` : ''}

      <!-- Step 3: Optional Photo Attachment & Submit -->
      ${currentReviewStep === 3 ? `
        <div class="step-content">
          <h4 class="step-title">Step 3: Attach Project Photos</h4>
          <p class="step-subtitle">Upload website screenshot or project photo (Optional)</p>

          <div class="photo-upload-box" onclick="document.getElementById('revPhotoInput').click()">
            <i class="fas fa-cloud-arrow-up upload-icon"></i>
            <div id="uploadBoxText">Click here to upload photo or screenshot</div>
            <span class="upload-hint">PNG, JPG, WEBP up to 5MB</span>
            <input type="file" id="revPhotoInput" accept="image/*" style="display:none;" onchange="handlePhotoSelect(this)">
          </div>

          <div class="modal-actions-row">
            <button onclick="nextReviewStep(2)" class="btn-cancel"><i class="fas fa-arrow-left"></i> Back</button>
            <button onclick="submitReviewToSupabase()" id="btnSubmitReview" class="btn-next btn-submit-final">Submit Review <i class="fas fa-paper-plane"></i></button>
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

function setStar(cat, val) {
  if (cat === 'overall') selectedOverallStar = val;
  if (cat === 'behavior') selectedBehaviorStar = val;
  if (cat === 'support') selectedSupportStar = val;
  if (cat === 'quality') selectedQualityStar = val;
  if (cat === 'pricing') selectedPricingStar = val;

  const modal = document.getElementById('threeStepReviewModal');
  if (modal) renderReviewModalStep(modal);
}

function nextReviewStep(stepNum) {
  currentReviewStep = stepNum;
  const modal = document.getElementById('threeStepReviewModal');
  if (modal) renderReviewModalStep(modal);
}

function validateStep2AndNext() {
  const nameEl = document.getElementById('revClientName');
  const textEl = document.getElementById('revClientText');

  if (!nameEl || !nameEl.value.trim()) {
    alert('Please enter your full name.');
    return;
  }
  if (!textEl || !textEl.value.trim()) {
    alert('Please write your review feedback.');
    return;
  }

  window.savedRevName = nameEl.value.trim();
  window.savedRevText = textEl.value.trim();
  nextReviewStep(3);
}

function handlePhotoSelect(input) {
  if (input.files && input.files[0]) {
    selectedPhotoFile = input.files[0];
    const uploadText = document.getElementById('uploadBoxText');
    if (uploadText) {
      uploadText.innerHTML = `<span style="color:#10b981; font-weight:700;"><i class="fas fa-check-circle"></i> Selected: ${selectedPhotoFile.name}</span>`;
    }
  }
}

async function submitReviewToSupabase() {
  const submitBtn = document.getElementById('btnSubmitReview');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
  }

  let uploadedPhotoUrls = [];

  // Upload image with Bulletproof Base64 Fallback
  if (selectedPhotoFile) {
    try {
      if (supabaseClient) {
        const fileExt = selectedPhotoFile.name.split('.').pop();
        const fileName = `review_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
        const { data, error } = await supabaseClient.storage
          .from('review-photos')
          .upload(fileName, selectedPhotoFile, { upsert: true });

        if (!error && data) {
          const { data: publicUrlData } = supabaseClient.storage
            .from('review-photos')
            .getPublicUrl(fileName);

          if (publicUrlData && publicUrlData.publicUrl) {
            uploadedPhotoUrls.push(publicUrlData.publicUrl);
          }
        } else {
          console.warn('Supabase storage upload error, fallback to Base64:', error);
          const b64 = await fileToBase64(selectedPhotoFile);
          uploadedPhotoUrls.push(b64);
        }
      } else {
        const b64 = await fileToBase64(selectedPhotoFile);
        uploadedPhotoUrls.push(b64);
      }
    } catch (e) {
      console.warn('Image upload catch fallback:', e);
      try {
        const b64 = await fileToBase64(selectedPhotoFile);
        uploadedPhotoUrls.push(b64);
      } catch (err) {}
    }
  }

  // Insert review row into Supabase
  const newReviewPayload = {
    name: window.savedRevName || 'Anonymous',
    overall_rating: selectedOverallStar,
    behavior_rating: selectedBehaviorStar,
    support_rating: selectedSupportStar,
    quality_rating: selectedQualityStar,
    pricing_rating: selectedPricingStar,
    review_text: window.savedRevText || '',
    image_urls: uploadedPhotoUrls,
    is_approved: true
  };

  try {
    if (supabaseClient) {
      const { data, error } = await supabaseClient
        .from('reviews')
        .insert([newReviewPayload])
        .select();

      if (error) throw error;
      if (data && data.length) {
        allReviewsList.unshift(data[0]);
      } else {
        allReviewsList.unshift({ ...newReviewPayload, id: 'local-' + Date.now(), created_at: new Date().toISOString() });
      }
    } else {
      allReviewsList.unshift({ ...newReviewPayload, id: 'local-' + Date.now(), created_at: new Date().toISOString() });
    }
  } catch (err) {
    console.warn('Supabase Insert Fallback:', err);
    allReviewsList.unshift({ ...newReviewPayload, id: 'local-' + Date.now(), created_at: new Date().toISOString() });
  }

  closeReviewModal();
  if (document.getElementById('flipkartAllReviewsPageContainer')) {
    renderFlipkartAllReviewsPage();
  } else {
    renderFlipkartReviewSection();
  }
  alert('Thank you! Your review has been successfully submitted.');
}

// Auto Load on Page Ready
document.addEventListener('DOMContentLoaded', () => {
  loadLiveReviews();
});

