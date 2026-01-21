<template>
  <div class="home">
    <section class="hero">
      <div class="hero-text">
        <h1 class="hero-title">
          <span class="welcome-text">Welcome to</span>
          <span class="company-name">SilicoInformatics</span>
        </h1>
        <p class="hero-tagline">Empowering businesses through innovative AI solutions and measurable results.</p>
      </div>

      <div ref="videoContainer" class="video-card">
        <div class="video-frame">
          <video
            ref="heroVideo"
            autoplay
            loop
            muted
            playsinline
            preload="metadata"
          >
            <source src="/logos/humanoid-logo-animated.mp4" type="video/mp4">
          </video>
        </div>

        <div class="video-footer">
          <div class="marquee" aria-hidden="true">
            <div ref="captionLine" class="caption-line">
              We Give Multi-Faceted Attention to <span class="highlight">Your Business</span><span class="spacer"> -|- </span>
              Turn Data into <span class="highlight">Knowledge &amp; Insights</span><span class="spacer"> -|- </span>
              Insights into <span class="highlight">Actions</span><span class="spacer"> -|- </span>
              Action into <span class="highlight">Outcomes</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="industries">
      <h2>Industries We Serve</h2>
      <div class="industries-grid" role="list">
        <button
          type="button"
          class="industry-card industry-button"
          role="listitem"
          @click="toggleIndustry('pharmaceutical')"
          :aria-pressed="selected === 'pharmaceutical'"
        >
          <div class="icon-wrapper">
            <i class="fas fa-pills" aria-hidden="true"></i>
          </div>
          <h3>Pharmaceutical</h3>
          <p>AI-driven drug discovery and development solutions</p>
        </button>

        <button
          type="button"
          class="industry-card industry-button"
          role="listitem"
          @click="toggleIndustry('agriculture')"
          :aria-pressed="selected === 'agriculture'"
        >
          <div class="icon-wrapper">
            <i class="fas fa-leaf" aria-hidden="true"></i>
          </div>
          <h3>Agriculture</h3>
          <p>Smart farming and crop optimization analytics</p>
        </button>

        <button
          type="button"
          class="industry-card industry-button"
          role="listitem"
          @click="toggleIndustry('biotechnology')"
          :aria-pressed="selected === 'biotechnology'"
        >
          <div class="icon-wrapper">
            <i class="fas fa-dna" aria-hidden="true"></i>
          </div>
          <h3>Biotechnology</h3>
          <p>Advanced genomics and research analytics</p>
        </button>

        <button
          type="button"
          class="industry-card industry-button"
          role="listitem"
          @click="toggleIndustry('healthcare')"
          :aria-pressed="selected === 'healthcare'"
        >
          <div class="icon-wrapper">
            <i class="fas fa-hospital-user" aria-hidden="true"></i>
          </div>
          <h3>Healthcare</h3>
          <p>Patient care and operational excellence</p>
        </button>
      </div>

      <!-- Hidden details panel -->
      <div
        class="industry-details"
        v-if="selected"
        role="region"
        :aria-label="selectedLabel + ' details'">
          <div class="industry-details-inner">
            <h3>{{ selectedLabel }}</h3>
            <p>{{ detailsText }}</p>
          </div>
      </div>
    </section>

     <section class="wordcloud">

      <!-- Info panel: shows context for hovered words in the wordcloud -->
      <div class="word-info">
        <textarea v-model="hoverText" rows="1" readonly aria-label="Word info" color="white"></textarea>
      </div>

      <div class="wc" @pointerover="onPointerOver" @pointerleave="onPointerLeave">
            <span class="word core" title="Transform your business with cutting-edge AI solutions">TRANSFORM</span>
            <span class="word core" title="Accelerate R&D, drug discovery, and time-to-market">ACCELERATE</span>
            <span class="word core" title="Optimize operations, workflows, and resource utilization">OPTIMIZE</span>
            <span class="word core" title="Measure ROI and demonstrate quantifiable impact">MEASURE</span>
            <span class="word core" title="Drive innovation with GenAI and ML solutions">INNOVATE</span>
            <span class="word core" title="Integrate systems, data, and cross-industry insights">INTEGRATE</span>
            <span class="word core" title="Deliver end-to-end implementation with proven results">DELIVER</span>
            <span class="word support" title="Empower businesses through trusted AI">Empower</span>
            <span class="word support" title="Predict outcomes with advanced analytics">Predict</span>
            <span class="word support" title="Automate workflows and data pipelines">Automate</span>
            <span class="word support" title="Validate with scientific rigor and compliance">Validate</span>
            <span class="word support" title="Scale from consulting to platform solutions">Scale</span>
            <span class="word domain" title="Healthcare provider solutions">Healthcare</span>
            <span class="word domain" title="Pharmaceutical R&D acceleration">Pharma</span>
            <span class="word domain" title="Life sciences expertise">LifeSciences</span>
            <span class="word domain" title="Clinical trial optimization">Clinical</span>
            <span class="word domain" title="FDA and regulatory compliance">Compliance</span>
            <span class="word tech" title="Artificial Intelligence solutions">AI</span>
            <span class="word tech" title="Generative AI applications">GenAI</span>
            <span class="word tech" title="Machine Learning models">ML</span>
            <span class="word tech" title="Retrieval-Augmented Generation">RAG</span>
            <span class="word tech" title="Natural Language Processing">NLP</span>
            <span class="word tech" title="Predictive Analytics">Analytics</span>
            <span class="word tech" title="MLOps and deployment">MLOps</span>
            <span class="word tech" title="Data Science pipelines">DataScience</span>
            <span class="word tech" title="Return on Investment">ROI</span>
        </div>
        
    </section> 
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Reference to the hero video element and caption
const heroVideo = ref<HTMLVideoElement | null>(null)
const videoContainer = ref<HTMLElement | null>(null)
const captionLine = ref<HTMLElement | null>(null)

// Set video playback speed and setup caption animation when component mounts
onMounted(() => {
  if (heroVideo.value) {
    heroVideo.value.playbackRate = 0.8

    const setupCaptionAnimation = () => {
      const video = heroVideo.value
      const container = videoContainer.value
      const caption = captionLine.value

      if (!video || !container || !caption) return

      requestAnimationFrame(() => {
        const frameW = container.getBoundingClientRect().width
        const captionW = Math.ceil(caption.scrollWidth || caption.getBoundingClientRect().width)

        const duration = 36 // duration for full scroll
        caption.style.setProperty('--start', frameW + 'px')
        caption.style.setProperty('--end', -(captionW + 8) + 'px')
        caption.style.animationDuration = duration + 's'
        caption.style.animationDelay = '0s'
      })
    }

    // Setup animation when video is ready
    if (heroVideo.value.readyState >= 1) {
      setupCaptionAnimation()
    } else {
      heroVideo.value.addEventListener('loadedmetadata', setupCaptionAnimation, { once: true })
    }

    // Restart animation on video loop
    let prevTime = 0
    heroVideo.value.addEventListener('timeupdate', () => {
      if (heroVideo.value) {
        const ct = heroVideo.value.currentTime
        if (ct < prevTime - 0.2) {
          setupCaptionAnimation()
        }
        prevTime = ct
      }
    })
  }
})

// currently selected industry key or null
const selected = ref<string | null>(null)

const detailsMap: Record<string, { label: string; text: string }> = {
  pharmaceutical: {
    label: 'Pharmaceutical',
    text: 'We provide AI-driven solutions for drug discovery, predictive modeling, and clinical trial optimization tailored for pharma organizations.'
  },
  agriculture: {
    label: 'Agriculture',
    text: 'Our smart farming tools combine remote sensing, IoT and ML to boost crop yields, reduce waste and optimize resource usage.'
  },
  biotechnology: {
    label: 'Biotechnology',
    text: 'Advanced genomics, bioinformatics pipelines, and research analytics that accelerate discovery and reproducible science.'
  },
  healthcare: {
    label: 'Healthcare',
    text: 'Solutions for patient analytics, operational improvements, and decision support to improve outcomes and reduce costs.'
  }
}

function toggleIndustry(key: string) {
  if (selected.value === key) {
    selected.value = null
  } else {
    selected.value = key
  }
}

const selectedLabel = computed(() => {
  if (!selected.value) return ''
  return detailsMap[selected.value as keyof typeof detailsMap]?.label ?? ''
})

const detailsText = computed(() => {
  if (!selected.value) return ''
  return detailsMap[selected.value as keyof typeof detailsMap]?.text ?? ''
})

// hover text shown in the textarea above the wordcloud
const defaultHoverText = 'Engage with SilicoInformatics to empower your Agentic AI journey second to none!'
const hoverText = ref<string>(defaultHoverText)

function onPointerOver(e: PointerEvent) {
  const target = e.target as HTMLElement | null
  const wordEl = target?.closest('.word') as HTMLElement | null
  if (wordEl) {
    hoverText.value = wordEl.getAttribute('title') || ''
  }
}

function onPointerLeave() {
  hoverText.value = defaultHoverText
}
</script>

<style scoped>
.home {
  padding: 0;
}

/* Wordcloud styles moved from template into scoped styles (fixes SFC error) */
.wc {
  /* soft animated wordcloud container */
  min-height: 50vh;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 40px 20px;
  text-align: center;
  width: 100%;
  position: relative;
  perspective: 800px;
  -webkit-font-smoothing: antialiased;
}

.word {
  position: relative;
  display: inline-block;
  cursor: pointer;
  padding: 8px 10px;
  border-radius: 6px;
  transition: transform 320ms cubic-bezier(.2,.8,.2,1), color 220ms ease, filter 220ms ease;
  will-change: transform, color, filter;
  animation: float 6.5s ease-in-out infinite;
  transform-origin: center;
}

/* Stagger durations and delays for a natural, non-uniform motion */
.wc .word:nth-child(3n) { animation-duration: 5.6s; animation-delay: -1.1s; }
.wc .word:nth-child(4n) { animation-duration: 7.2s; animation-delay: -0.6s; }
.wc .word:nth-child(5n) { animation-duration: 8.2s; animation-delay: -1.9s; }
.wc .word:nth-child(7n) { animation-duration: 6.8s; animation-delay: -0.4s; }

.wc .word:hover {
  transform: translateY(-10px) scale(1.18);
  filter: brightness(1.12);
  color: var(--color-primary-alpha-85);
  z-index: 3;
}

@keyframes float {
  0% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-6px) rotate(-1.2deg); }
  50% { transform: translateY(-10px) rotate(1deg); }
  75% { transform: translateY(-6px) rotate(-0.6deg); }
 100% { transform: translateY(0) rotate(0deg); }
}
.word.core {
  font-size: 3em;
  color: var(--color-wordcloud-core);
  font-weight: 900;
}

.word.support {
  font-size: 2.2em;
  color: var(--color-wordcloud-support);
  font-weight: 700;
}

.word.domain {
  font-size: 1.8em;
  color: var(--color-wordcloud-domain);
  font-weight: 600;
}

.word.tech {
  font-size: 1.4em;
  color: var(--color-wordcloud-tech);
  font-weight: 500;
}

/* Info panel styles */
.word-info {
  max-width: 1200px;
  margin: 1.5rem auto;
}
.word-info textarea {
  width: 100%;
  max-width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  resize: none;
  background-color: var(--color-cream-low-opacity);
  color: var(--color-wordcloud-info-text);
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.hero {
  display: grid;
  grid-template-columns: 1.05fr 1.25fr;
  gap: 6rem;
  align-items: center;
  padding: 4rem 2rem 6rem;
  max-width: 1160px;
  margin: 0 auto;
  position: relative;
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
}

.hero-title {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0 0 1rem;
}

.welcome-text {
  font-size: 1.5rem;
  font-weight: 300;
  color: var(--color-brown);
  letter-spacing: 2px;
  text-transform: uppercase;
}

.company-name {
  font-size: clamp(2.5rem, 4.2vw, 4rem);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #0047ab, #0066cc, #0099ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 15px rgba(0, 102, 204, 0.25));
}

.hero-tagline {
  font-size: 1rem;
  line-height: 1.55;
  color: var(--color-text-primary);
  margin: 0 0 1.5rem;
  max-width: 52ch;
}

.hero-bullets {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
}

.hero-bullets p {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text-primary);
  margin: 0.5rem 0;
}

.hero-bullets p em {
  font-style: normal;
  font-weight: 600;
  color: var(--color-secondary);
}

/* Dark mode - ensure yellow gradient shows for company name */
[data-theme="dark"] .company-name {
  background: linear-gradient(135deg, #ffaa00, #ffe57f, #ffd700);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.4));
}

[data-theme="dark"] .welcome-text {
  color: rgba(255, 255, 255, 0.7);
}

[data-theme="dark"] .hero-tagline {
  color: rgba(255, 255, 255, 0.8);
}

[data-theme="dark"] .hero-bullets p {
  color: rgba(255, 255, 255, 0.8);
}

[data-theme="dark"] .hero-bullets p em {
  color: #ffd700;
}

/* Video card */
.video-card {
  position: relative;
  border-radius: 22px;
  background: transparent;
  border: none;
  overflow: hidden;
  isolation: isolate;
}

/* Add soft edge fade overlay - moved to a separate pseudo-element layer */
.video-frame::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: 22px;
  box-shadow:
    inset 0 0 40px 12px rgba(0, 0, 0, 0.6),
    0 20px 80px rgba(0, 0, 0, 0.3);
  z-index: 3;
}

.video-frame {
  width: 100%;
  aspect-ratio: 16 / 10;
  background: rgba(0,0,0,0.2);
  position: relative;
  border-radius: 22px;
  overflow: hidden;
}

.video-frame video {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
  border-radius: 22px;
}

/* Overlay gradient - moved to video-frame */
.video-frame::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(700px 320px at 25% 15%, rgba(79,209,255,0.22), transparent 55%),
    radial-gradient(700px 320px at 85% 0%, rgba(124,92,255,0.20), transparent 60%),
    linear-gradient(180deg, rgba(0,0,0,0.10), rgba(0,0,0,0.55));
  mix-blend-mode: screen;
  opacity: 0.65;
  z-index: 1;
  border-radius: 22px;
}

.video-footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 14px;
  z-index: 2;
  display: block;
  padding: 0;
  border: none;
  background: transparent;
  font-size: 16px;
  color: rgba(255,255,255,0.92);
  pointer-events: none;
  overflow: visible;
}

.marquee {
  position: relative;
  width: 100%;
  height: 56px;
  overflow: hidden;
}

.caption-line {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  font-weight: 700;
  letter-spacing: -0.015em;
  color: var(--color-primary);
  font-size: 18px;
  will-change: transform, opacity;
  opacity: 1;
  padding: 0 8px;
  transform: translateX(var(--start, 110%)) translateY(-50%);
  animation-name: slide;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  display: inline-block;
  backface-visibility: hidden;
  transform-origin: 0 50%;
}

.caption-line .highlight {
  color: #ffd24d;
  font-weight: 800;
  margin-left: 8px;
}

.caption-line .spacer {
  color: #ff4df9;
  font-weight: 800;
  margin-left: 8px;
}

@keyframes slide {
  from {
    transform: translateX(var(--start, 110%)) translateY(-50%);
  }
  to {
    transform: translateX(var(--end, -110%)) translateY(-50%);
  }
}

@media (max-width: 980px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 3rem 1.5rem 4rem;
  }

  .hero-tagline {
    max-width: none;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 2rem 1rem 3rem;
  }

  .company-name {
    font-size: 2.5rem;
  }
}

.industries {
  margin: 4rem 0;
  text-align: center;
}

.industries h2 {
  margin-bottom: 2rem;
  color: var(--color-secondary-dark);
  font-size: 2rem;
}

.industries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.industry-card {
  background: var(--color-cream);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px var(--color-border-shadow);
  transition: all 0.3s ease;
  text-align: center;
  border: 1px solid var(--color-border-light);
}

.industry-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 15px var(--color-border-shadow-hover);
  border-color: var(--color-border-medium);
}

.icon-wrapper {
  background: var(--gradient-primary);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 4px 8px var(--color-border-shadow);
}

.icon-wrapper i {
  font-size: 2rem;
  color: var(--color-cream);
}


.industry-card h3 {
  color: var(--color-secondary-dark);
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.industry-card p {
  color: var(--color-brown);
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}

.services {
  margin: 2rem 0;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.service-item {
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: transform 0.2s ease;
}

.service-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

/* Make industry cards behave like buttons */
.industry-button {
  cursor: pointer;
  text-align: inherit;
  border: none;
  background: inherit;
  padding: 0;
}

.industry-button:focus {
  outline: 3px solid var(--color-primary-alpha-40);
  outline-offset: 4px;
}

.industry-button .industry-card {
  /* no-op: kept if nested, but we keep single class on button for styling */
}

/* When using button with class industry-card apply same internals */
.industry-button {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: var(--color-cream);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px var(--color-border-shadow);
  transition: all 0.3s ease;
  text-align: center;
  border: 1px solid var(--color-border-light);
}

.industry-button:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 15px var(--color-border-shadow-hover);
  border-color: var(--color-border-medium);
}

/* Details panel */
.industry-details {
  max-width: 1000px;
  margin: 1.5rem auto 0 auto;
  background: linear-gradient(180deg, var(--color-bg-primary), var(--color-cream));
  border-radius: 8px;
  padding: 1.5rem 2rem;
  box-shadow: 0 6px 18px var(--color-black-alpha-10);
  border: 1px solid var(--color-border-light);
  animation: detailsFadeIn 0.25s ease-out;
}

.industry-details-inner h3 {
  margin-top: 0;
  color: var(--color-secondary-dark);
}

.close-details {
  background: transparent;
  border: none;
  color: var(--color-secondary-dark);
  font-weight: 600;
  margin-top: 1rem;
  cursor: pointer;
}

@keyframes detailsFadeIn {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>