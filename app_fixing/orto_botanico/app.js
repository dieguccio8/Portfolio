// Orto Botanico di Catania - Interactive Web Application Logic
// Redesigned with Senior UX/UI Standards • Consistent Design System

let currentScreen = 'home';
const navHistory = ['home'];
let currentPlantId = 1;
let currentRouteKey = 'breve';
let currentCategoryFilter = 'all';
let currentLanguage = 'it';
let isTorchOn = false;

// Map transform state
let mapScale = 1;
let mapTranslateX = 0;
let mapTranslateY = 0;
let isDraggingMap = false;
let startDragX = 0;
let startDragY = 0;
let currentSelectedPin = null;

// Translation strings (Italian / English)
const I18N = {
  it: {
    home_overline: "Esplora il Giardino",
    home_title: "Scegli il percorso<br>più adatto a te",
    discover_plants_title: "Scopri le piante!",
    discover_plants_sub: "Catalogo completo",
    view_map_title: "Visualizza la mappa",
    view_map_sub: "Mappa interattiva",
    duration: "Durata",
    plants: "Piante",
    all_plants: "Tutte le piante",
    search_placeholder: "Trova una pianta o settore...",
    habitat: "Habitat Naturale",
    curiosities: "Curiosità e Storia",
    botanical_desc: "Descrizione Botanica",
    view_on_map: "Visualizza nella mappa",
    start_route: "Inizia il percorso",
    end_route: "Termina percorso",
    map_pinch_help: "Tocca un settore per filtrare • Sposta o zooma la mappa",
    legend: "Settori e Punti di Interesse",
    details: "Dettagli",
    map_title: "Mappa dell'Orto",
    plant_detail_title: "Scheda Botanica",
    qr_prompt: "Inquadra il QR code sul cartellino della pianta",
    qr_test_title: "Simula scansione cartellino:",
    stops_title: "Le piante che incontrerai:"
  },
  en: {
    home_overline: "Explore the Garden",
    home_title: "Choose the route<br>best suited to you",
    discover_plants_title: "Discover plants!",
    discover_plants_sub: "Complete catalog",
    view_map_title: "View the map",
    view_map_sub: "Interactive map",
    duration: "Duration",
    plants: "Plants",
    all_plants: "All plants",
    search_placeholder: "Search for a plant or sector...",
    habitat: "Natural Habitat",
    curiosities: "Curiosities & History",
    botanical_desc: "Botanical Description",
    view_on_map: "View on map",
    start_route: "Start route",
    end_route: "End route",
    map_pinch_help: "Tap a sector to filter • Pan or zoom map",
    legend: "Sectors & Points of Interest",
    details: "Details",
    map_title: "Garden Map",
    plant_detail_title: "Botanical Sheet",
    qr_prompt: "Scan the QR code on the plant tag",
    qr_test_title: "Simulate plant tag scan:",
    stops_title: "Plants you will encounter:"
  }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initStatusClock();
  initLegendaChips();
  initMapMarkers();
  initSearchFilters();
  renderPlantsList();
  initMapInteractivity();
  initActiveMapInteractivity();
  initSearchInput();

  // Handle URL hash on load
  handleHashNavigation();
  window.addEventListener('hashchange', handleHashNavigation);
});

function handleHashNavigation() {
  const hash = window.location.hash.replace('#', '');
  if (!hash || hash === 'home') {
    navigateTo('home');
  } else if (hash.startsWith('route-')) {
    const key = hash.replace('route-', '');
    openRoute(key);
  } else if (hash.startsWith('plant-')) {
    const id = parseInt(hash.replace('plant-', ''), 10);
    if (!isNaN(id)) openPlantDetail(id);
  } else if (['map', 'search', 'qr', 'active-map'].includes(hash)) {
    navigateTo(hash);
  }
}

// Update Status Bar Clock
function initStatusClock() {
  const clockEl = document.getElementById('statusClock');
  function update() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    if (clockEl) clockEl.textContent = `${h}:${m}`;
  }
  update();
  setInterval(update, 30000);
}

// Navigation router
function navigateTo(screenId, params = {}) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(s => s.classList.remove('active'));

  const target = document.getElementById(`screen-${screenId}`);
  if (!target) return;

  target.classList.add('active');
  
  // Scroll viewport to top smoothly
  const viewport = document.getElementById('appViewport');
  if (viewport) viewport.scrollTop = 0;

  if (screenId !== currentScreen) {
    navHistory.push(screenId);
    currentScreen = screenId;
  }

  // Close map bottom sheet if open
  closeMapBottomSheet();

  // Screen specific setup
  if (screenId === 'map') {
    setTimeout(mapReset, 40);
  }
}

function goBack() {
  if (navHistory.length > 1) {
    navHistory.pop(); // remove current
    const prev = navHistory[navHistory.length - 1];
    currentScreen = prev;

    const screens = document.querySelectorAll('.screen');
    screens.forEach(s => s.classList.remove('active'));

    const target = document.getElementById(`screen-${prev}`);
    if (target) {
      target.classList.add('active');
    }
  } else {
    navigateTo('home');
  }
  closeMapBottomSheet();
}

// Route Selection Handlers
function openRoute(routeKey) {
  currentRouteKey = routeKey;
  const route = APP_DATA.routes.find(r => r.key === routeKey);
  if (!route) return;

  document.getElementById('routeDetailTitle').textContent = route.title;
  const headerRouteTitle = document.getElementById('headerRouteTitle');
  if (headerRouteTitle) headerRouteTitle.textContent = route.title;
  document.getElementById('routeDetailDuration').textContent = `Durata: ${route.durationVal}`;
  document.getElementById('routeDetailPlantsCount').textContent = `Piante: ${route.plantsCount}`;
  document.getElementById('routeDetailDescription').innerHTML = route.targetText;
  document.getElementById('routePlantListTitle').textContent = route.plantListTitle;
  document.getElementById('routeMapImg').src = route.mapImage;
  document.getElementById('activeRouteNameBadge').textContent = `${route.title} attivo`;

  // Render Interactive Timeline of Route Stops
  const listEl = document.getElementById('routeDetailPlantsList');
  listEl.innerHTML = '';
  
  route.plantItems.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'route-stop-card';
    card.onclick = () => {
      if (item.plantId) openPlantDetail(item.plantId);
    };

    const lead = document.createElement('div');
    lead.className = 'stop-lead';

    const dot = document.createElement('div');
    dot.className = 'stop-sector-dot';
    dot.style.backgroundColor = item.sectorColor || '#3d8940';

    const info = document.createElement('div');
    info.className = 'stop-info';

    const sectorName = document.createElement('span');
    sectorName.className = 'stop-sector-name';
    sectorName.textContent = `Tappa ${index + 1} • ${item.sector}`;

    const plantName = document.createElement('span');
    plantName.className = 'stop-plant-name';
    plantName.textContent = item.plant;

    info.appendChild(sectorName);
    info.appendChild(plantName);

    lead.appendChild(dot);
    lead.appendChild(info);

    const action = document.createElement('span');
    action.className = 'stop-action-pill';
    action.textContent = 'Scheda →';

    card.appendChild(lead);
    card.appendChild(action);

    listEl.appendChild(card);
  });

  navigateTo('route-detail');
}

function startActiveRoute() {
  navigateTo('active-map');
}

function endActiveRoute() {
  navigateTo('route-detail');
}

// Plant Detail Handlers
function openPlantDetail(plantId) {
  currentPlantId = plantId;
  const plant = APP_DATA.plants.find(p => p.id === plantId);
  if (!plant) return;

  document.getElementById('plantDetailImg').src = plant.heroImage || plant.image;
  document.getElementById('plantDetailNum').textContent = plant.num;
  document.getElementById('plantDetailName').textContent = plant.name;
  
  const scientificEl = document.getElementById('plantDetailScientific');
  if (scientificEl) {
    scientificEl.textContent = `${plant.scientificName || plant.name} • Famiglia ${plant.family || 'Botanica'}`;
  }

  const sectorBadge = document.getElementById('plantDetailSectorBadge');
  sectorBadge.style.backgroundColor = plant.sectorColor;
  document.getElementById('plantDetailSectorIcon').textContent = getSectorIcon(plant.sectorKey);
  document.getElementById('plantDetailSectorLabel').textContent = plant.sector;

  document.getElementById('plantDetailDesc').textContent = plant.desc;
  document.getElementById('plantDetailHabitat').textContent = plant.habitat;

  const curList = document.getElementById('plantDetailCuriosita');
  curList.innerHTML = '';
  plant.curiosita.forEach(c => {
    const div = document.createElement('div');
    div.className = 'plant-curiosita-item';
    div.innerHTML = `<span class="curiosita-bullet">•</span><span>${c}</span>`;
    curList.appendChild(div);
  });

  navigateTo('plant-detail');
}

function showPlantOnMap() {
  const plant = APP_DATA.plants.find(p => p.id === currentPlantId);
  navigateTo('map');
  if (plant && plant.mapCoords) {
    setTimeout(() => {
      focusMapOnPin(plant.mapCoords.x, plant.mapCoords.y, plant.name, plant.sector, plant.image, plant.id);
    }, 120);
  }
}

// Plant Search & Category Filters
function initSearchFilters() {
  const container = document.getElementById('categoryFilters');
  if (!container) return;

  container.innerHTML = '';

  // "Tutte" button
  const allBtn = document.createElement('button');
  allBtn.className = 'cat-filter-btn active';
  allBtn.textContent = 'Tutte le specie';
  allBtn.style.backgroundColor = 'var(--primary-green)';
  allBtn.onclick = () => filterCategory('all', allBtn);
  container.appendChild(allBtn);

  const searchSectorKeys = ['tropicale', 'arido', 'mediterraneo', 'orto_generale', 'orto_siculo'];
  searchSectorKeys.forEach(key => {
    const cat = APP_DATA.legendItems.find(c => c.key === key);
    if (!cat) return;
    const btn = document.createElement('button');
    btn.className = 'cat-filter-btn';
    btn.innerHTML = `<span>${cat.icon}</span><span>${cat.label}</span>`;
    btn.style.borderColor = cat.color;
    btn.onclick = () => filterCategory(cat.key, btn);
    container.appendChild(btn);
  });
}

function filterCategory(catKey, clickedBtn) {
  currentCategoryFilter = catKey;
  
  const allBtns = document.querySelectorAll('.cat-filter-btn');
  allBtns.forEach(b => {
    b.classList.remove('active');
    b.style.backgroundColor = 'var(--bg-surface)';
    b.style.color = 'var(--text-secondary)';
  });

  clickedBtn.classList.add('active');
  if (catKey === 'all') {
    clickedBtn.style.backgroundColor = 'var(--primary-green)';
    clickedBtn.style.color = '#ffffff';
  } else {
    const cat = APP_DATA.legendItems.find(c => c.key === catKey);
    if (cat) {
      clickedBtn.style.backgroundColor = cat.color;
      clickedBtn.style.color = '#ffffff';
    }
  }

  renderPlantsList();
}

function initSearchInput() {
  const input = document.getElementById('plantSearchInput');
  const clearBtn = document.getElementById('searchClearBtn');
  if (!input) return;

  input.addEventListener('input', () => {
    if (input.value.trim().length > 0) {
      clearBtn.style.display = 'block';
    } else {
      clearBtn.style.display = 'none';
    }
    renderPlantsList();
  });
}

function clearPlantSearch() {
  const input = document.getElementById('plantSearchInput');
  const clearBtn = document.getElementById('searchClearBtn');
  if (input) {
    input.value = '';
    input.focus();
  }
  if (clearBtn) clearBtn.style.display = 'none';
  renderPlantsList();
}

function renderPlantsList() {
  const container = document.getElementById('plantsListContainer');
  const countEl = document.getElementById('plantsFoundCount');
  const searchVal = (document.getElementById('plantSearchInput')?.value || '').toLowerCase().trim();
  if (!container) return;

  container.innerHTML = '';

  let filtered = APP_DATA.plants;

  // Filter by category
  if (currentCategoryFilter !== 'all') {
    filtered = filtered.filter(p => p.sectorKey === currentCategoryFilter);
  }

  // Filter by search query
  if (searchVal) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchVal) ||
      (p.scientificName && p.scientificName.toLowerCase().includes(searchVal)) ||
      p.sector.toLowerCase().includes(searchVal) ||
      p.desc.toLowerCase().includes(searchVal)
    );
  }

  if (countEl) {
    countEl.textContent = `${filtered.length} specie`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 48px 16px; background: var(--bg-subtle); border-radius: var(--r-lg); margin-top: 12px;">
        <span style="font-size: 32px; display: block; margin-bottom: 8px;">🌿</span>
        <div style="font-family: var(--font-display); font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">Nessuna pianta trovata</div>
        <div style="font-size: 13px; color: var(--text-tertiary);">Prova a cercare un altro nome o rimuovi i filtri per settore.</div>
      </div>
    `;
    return;
  }

  filtered.forEach(plant => {
    const card = document.createElement('div');
    card.className = 'plant-card';
    card.onclick = () => openPlantDetail(plant.id);

    const thumb = document.createElement('div');
    thumb.className = 'plant-card-thumb';
    const img = document.createElement('img');
    img.src = plant.image;
    img.alt = plant.name;
    img.loading = 'lazy';
    thumb.appendChild(img);

    const info = document.createElement('div');
    info.className = 'plant-card-info';

    const title = document.createElement('div');
    title.className = 'plant-card-title';
    title.textContent = plant.name;

    const sectorBadge = document.createElement('div');
    sectorBadge.className = 'plant-sector-pill';
    sectorBadge.style.backgroundColor = plant.sectorColor;
    sectorBadge.innerHTML = `<span>${getSectorIcon(plant.sectorKey)}</span><span>${plant.sector}</span>`;

    const snippet = document.createElement('div');
    snippet.className = 'plant-card-snippet';
    snippet.textContent = plant.shortSnippet || plant.family || '';

    info.appendChild(title);
    info.appendChild(sectorBadge);
    if (plant.shortSnippet) info.appendChild(snippet);

    const arrow = document.createElement('div');
    arrow.className = 'plant-card-arrow';
    arrow.innerHTML = '›';

    card.appendChild(thumb);
    card.appendChild(info);
    card.appendChild(arrow);

    container.appendChild(card);
  });
}

function getSectorIcon(key) {
  switch (key) {
    case 'tropicale': return '🌴';
    case 'orto_generale': return '🏛️';
    case 'arido': return '🌵';
    case 'mediterraneo': return '🌿';
    case 'orto_siculo': return '🍃';
    default: return '🌱';
  }
}

// Map Component Interactivity
function initLegendaChips() {
  const container = document.getElementById('legendaChips');
  if (!container) return;

  container.innerHTML = '';
  APP_DATA.legendItems.forEach(item => {
    const chip = document.createElement('button');
    chip.className = 'legenda-chip';
    chip.innerHTML = `<span>${item.icon}</span><span>${item.label}</span>`;
    chip.style.backgroundColor = item.color;
    chip.style.color = item.textLight ? '#ffffff' : '#111111';
    
    chip.onclick = () => toggleLegendaFilter(item.key, chip);
    container.appendChild(chip);
  });
}

let activeLegendaFilter = null;
function toggleLegendaFilter(key, chipEl) {
  const allChips = document.querySelectorAll('.legenda-chip');
  if (activeLegendaFilter === key) {
    activeLegendaFilter = null;
    allChips.forEach(c => c.classList.remove('muted'));
    filterMapMarkers(null);
  } else {
    activeLegendaFilter = key;
    allChips.forEach(c => {
      if (c === chipEl) {
        c.classList.remove('muted');
      } else {
        c.classList.add('muted');
      }
    });
    filterMapMarkers(key);
  }
}

function initMapMarkers() {
  const layer = document.getElementById('mapMarkersLayer');
  if (!layer) return;

  layer.innerHTML = '';
  APP_DATA.mapMarkers.forEach(m => {
    const el = document.createElement('div');
    el.className = 'map-marker';
    el.id = `marker-${m.id}`;
    el.dataset.sector = m.sector || m.type;
    el.style.left = `${m.x}%`;
    el.style.top = `${m.y}%`;

    if (m.type === 'tu_sei_qui') {
      el.innerHTML = `
        <div style="position: relative; display: flex; align-items: center; justify-content: center;">
          <div style="width: 26px; height: 26px; border-radius: 50%; background: rgba(234, 51, 35, 0.35); position: absolute; animation: markerPulse 1.8s infinite;"></div>
          <span style="font-size: 20px; z-index: 2; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">📍</span>
        </div>
      `;
    } else if (m.type === 'start') {
      el.innerHTML = `<div style="background: #ea3323; color: white; padding: 3px 8px; border-radius: 8px; font-family: var(--font-display); font-size: 11px; font-weight: 800; box-shadow: 0 3px 8px rgba(0,0,0,0.35);">Start</div>`;
    } else if (m.type === 'end') {
      el.innerHTML = `<div style="background: white; border: 2px solid #ea3323; color: #ea3323; padding: 2px 7px; border-radius: 8px; font-family: var(--font-display); font-size: 11px; font-weight: 800; box-shadow: 0 3px 8px rgba(0,0,0,0.35);">End</div>`;
    } else if (m.type === 'plant') {
      const plant = APP_DATA.plants.find(p => p.id === m.plantId);
      const color = plant ? plant.sectorColor : '#3d8940';
      el.innerHTML = `
        <div style="width: 28px; height: 28px; border-radius: 50%; background: ${color}; border: 2.5px solid white; box-shadow: 0 3px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 13px;">
          ${plant ? getSectorIcon(plant.sectorKey) : '🌱'}
        </div>
      `;
    } else if (m.type === 'fontanella') {
      el.innerHTML = `<div style="width: 24px; height: 24px; border-radius: 50%; background: #589fef; border: 2px solid white; box-shadow: 0 3px 8px rgba(0,0,0,0.25); display: flex; align-items: center; justify-content: center; font-size: 12px;">💧</div>`;
    } else if (m.type === 'bagni') {
      el.innerHTML = `<div style="width: 24px; height: 24px; border-radius: 50%; background: #000259; border: 2px solid white; box-shadow: 0 3px 8px rgba(0,0,0,0.25); display: flex; align-items: center; justify-content: center; font-size: 12px; color: white;">🚻</div>`;
    }

    el.onclick = (e) => {
      e.stopPropagation();
      openMarkerSheet(m);
    };

    layer.appendChild(el);
  });
}

function filterMapMarkers(sectorKey) {
  const markers = document.querySelectorAll('.map-marker');
  markers.forEach(m => {
    if (!sectorKey) {
      m.style.opacity = '1';
      m.style.pointerEvents = 'auto';
    } else {
      const s = m.dataset.sector ? m.dataset.sector.toLowerCase() : '';
      if (s.includes(sectorKey.toLowerCase())) {
        m.style.opacity = '1';
        m.style.pointerEvents = 'auto';
        m.classList.add('active');
      } else {
        m.style.opacity = '0.12';
        m.style.pointerEvents = 'none';
        m.classList.remove('active');
      }
    }
  });
}

function openMarkerSheet(marker) {
  const sheet = document.getElementById('mapBottomSheet');
  const title = document.getElementById('sheetTitle');
  const sub = document.getElementById('sheetSub');
  const thumb = document.getElementById('sheetThumb');
  const btn = document.getElementById('sheetBtnAction');

  currentSelectedPin = marker;

  if (marker.type === 'plant') {
    const plant = APP_DATA.plants.find(p => p.id === marker.plantId);
    title.textContent = plant.name;
    sub.textContent = `Settore ${plant.sector} • Collezione #${plant.num}`;
    thumb.style.display = 'block';
    thumb.querySelector('img').src = plant.image;
    btn.style.display = 'block';
    btn.textContent = 'Apri Scheda';
  } else {
    title.textContent = marker.label || marker.desc;
    sub.textContent = marker.desc || 'Punto di interesse Orto Botanico';
    thumb.style.display = 'none';
    btn.style.display = 'none';
  }

  sheet.classList.add('open');
}

function closeMapBottomSheet() {
  const sheet = document.getElementById('mapBottomSheet');
  if (sheet) sheet.classList.remove('open');
}

function openPlantFromSheet() {
  if (currentSelectedPin && currentSelectedPin.plantId) {
    openPlantDetail(currentSelectedPin.plantId);
  }
}

// Pan & Zoom Controls for Map
function initMapInteractivity() {
  const viewport = document.getElementById('generalMapViewport');
  const plane = document.getElementById('generalMapPlane');
  if (!viewport || !plane) return;

  viewport.addEventListener('mousedown', (e) => {
    isDraggingMap = true;
    startDragX = e.clientX - mapTranslateX;
    startDragY = e.clientY - mapTranslateY;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDraggingMap) return;
    mapTranslateX = e.clientX - startDragX;
    mapTranslateY = e.clientY - startDragY;
    applyMapTransform();
  });

  window.addEventListener('mouseup', () => {
    isDraggingMap = false;
  });

  let touchStartDist = 0;
  viewport.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDraggingMap = true;
      startDragX = e.touches[0].clientX - mapTranslateX;
      startDragY = e.touches[0].clientY - mapTranslateY;
    } else if (e.touches.length === 2) {
      touchStartDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    }
  }, { passive: true });

  viewport.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1 && isDraggingMap) {
      mapTranslateX = e.touches[0].clientX - startDragX;
      mapTranslateY = e.touches[0].clientY - startDragY;
      applyMapTransform();
    } else if (e.touches.length === 2 && touchStartDist > 0) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / touchStartDist;
      mapScale = Math.min(Math.max(0.65, mapScale * factor), 3.5);
      touchStartDist = dist;
      applyMapTransform();
    }
  }, { passive: true });

  viewport.addEventListener('touchend', () => {
    isDraggingMap = false;
    touchStartDist = 0;
  });

  viewport.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
    mapZoom(zoomFactor);
  }, { passive: false });
}

function applyMapTransform() {
  const plane = document.getElementById('generalMapPlane');
  if (plane) {
    plane.style.transform = `translate(${mapTranslateX}px, ${mapTranslateY}px) scale(${mapScale})`;
  }
}

function mapZoom(factor) {
  mapScale = Math.min(Math.max(0.65, mapScale * factor), 3.5);
  applyMapTransform();
}

function mapReset() {
  mapScale = 1;
  mapTranslateX = 0;
  mapTranslateY = 0;
  applyMapTransform();
  closeMapBottomSheet();
}

function focusOnYou() {
  mapScale = 1.8;
  const viewport = document.getElementById('generalMapViewport');
  const w = viewport ? viewport.clientWidth : 393;
  const h = viewport ? viewport.clientHeight : 520;
  mapTranslateX = (w / 2) - (57 / 100 * w * mapScale);
  mapTranslateY = (h / 2) - (87 / 100 * h * mapScale);
  applyMapTransform();
  openMarkerSheet({ type: 'tu_sei_qui', label: 'Tu sei qui', desc: 'Posizione attuale rilevata presso viale principale' });
}

function focusMapOnPin(xPercent, yPercent, name, sector, img, plantId) {
  mapScale = 2.2;
  const viewport = document.getElementById('generalMapViewport');
  const w = viewport ? viewport.clientWidth : 393;
  const h = viewport ? viewport.clientHeight : 520;
  mapTranslateX = (w / 2) - (xPercent / 100 * w * mapScale);
  mapTranslateY = (h / 2) - (yPercent / 100 * h * mapScale);
  applyMapTransform();
  openMarkerSheet({ type: 'plant', plantId, label: name, desc: sector, name, sector, image: img });
}

// Active Route Map Panning
function initActiveMapInteractivity() {
  const container = document.getElementById('activeMapContainer');
  const plane = document.getElementById('activeMapPlane');
  if (!container || !plane) return;

  let aScale = 1;
  let aX = 0;
  let aY = 0;
  let isDrag = false;
  let sX = 0;
  let sY = 0;

  container.addEventListener('mousedown', (e) => {
    isDrag = true;
    sX = e.clientX - aX;
    sY = e.clientY - aY;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDrag) return;
    aX = e.clientX - sX;
    aY = e.clientY - sY;
    plane.style.transform = `translate(${aX}px, ${aY}px) scale(${aScale})`;
  });

  window.addEventListener('mouseup', () => { isDrag = false; });

  container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDrag = true;
      sX = e.touches[0].clientX - aX;
      sY = e.touches[0].clientY - aY;
    }
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1 && isDrag) {
      aX = e.touches[0].clientX - sX;
      aY = e.touches[0].clientY - sY;
      plane.style.transform = `translate(${aX}px, ${aY}px) scale(${aScale})`;
    }
  }, { passive: true });

  container.addEventListener('touchend', () => { isDrag = false; });
}

// QR Code Scanner Simulation & Laser Feedback
function simulateScan(plantId) {
  if (navigator.vibrate) navigator.vibrate([40, 50, 40]);
  
  const targetBox = document.querySelector('.qr-target-box');
  if (targetBox) {
    targetBox.style.boxShadow = '0 0 35px #00e676';
    setTimeout(() => {
      targetBox.style.boxShadow = 'none';
      openPlantDetail(plantId);
    }, 280);
  } else {
    openPlantDetail(plantId);
  }
}

function toggleTorch() {
  isTorchOn = !isTorchOn;
  const btn = document.getElementById('btnTorch');
  if (btn) btn.classList.toggle('active', isTorchOn);
  const bgImg = document.getElementById('qrBgImg');
  if (bgImg) {
    bgImg.style.filter = isTorchOn ? 'brightness(1.35)' : 'brightness(0.85)';
  }
}

// Language Switcher
function openLanguageModal() {
  const modal = document.getElementById('languageModal');
  if (modal) modal.classList.add('active');
}

function closeLanguageModal(e) {
  const modal = document.getElementById('languageModal');
  if (modal) modal.classList.remove('active');
}

function setLanguage(lang) {
  currentLanguage = lang;
  closeLanguageModal();

  // Highlight selected option
  const optIt = document.getElementById('optLangIt');
  const optEn = document.getElementById('optLangEn');
  if (optIt && optEn) {
    optIt.classList.toggle('selected', lang === 'it');
    optEn.classList.toggle('selected', lang === 'en');
  }

  // Update header buttons
  document.querySelectorAll('.btn-icon-circle').forEach(btn => {
    const flagIt = btn.querySelector('.flag-it');
    const flagEn = btn.querySelector('.flag-en');
    if (flagIt || flagEn) {
      if (lang === 'en') {
        btn.innerHTML = `<div class="flag-en">🇬🇧</div>`;
      } else {
        btn.innerHTML = `<div class="flag-it"><span></span><span></span><span></span></div>`;
      }
    }
  });

  // Apply translations
  const dict = I18N[lang];
  if (dict) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.getAttribute('data-i18n');
      if (dict[k]) el.innerHTML = dict[k];
    });

    const searchInput = document.getElementById('plantSearchInput');
    if (searchInput && dict.search_placeholder) {
      searchInput.placeholder = dict.search_placeholder;
    }
  }
}

// Desktop simulator toggle
function toggleDeviceView() {
  document.body.classList.toggle('fullscreen-mode');
}
