/* ==========================================================================
   ITALO REDESIGN - APPLICATION JAVASCRIPT
   ========================================================================== */

function initApp() {
  // Current App State
  const state = {
    currentScreen: 'home',
    passengers: 1,
    stations: {
      from: 'Catania Centrale',
      to: 'Taormina Giardini'
    },
    dates: {
      departure: '23 Ottobre 2025',
      return: null
    },
    selectedTrain: {
      number: '9950',
      depTime: '07:43',
      arrTime: '10:14',
      depStation: 'Catania Centrale',
      arrStation: 'Taormina Giardini',
      price: '298,00€',
      duration: '2h 31min'
    },
    selectedPayment: 'apple',
    homeCarouselIndex: 0
  };

  const carouselOffers = [
    {
      img: 'assets/italo-friends.png',
      text: ', viaggia in compagnia e risparmia più della metà.'
    },
    {
      img: 'assets/italo-autunno.png',
      text: 'Scopri l’Italia che cambia colore. Sconti fino al 40% su alcune tratte'
    },
    {
      img: 'assets/italo-friends.png',
      text: 'Italo Friends: fino al 60% per gruppi da 2 a 5 persone!'
    }
  ];

  // DOM Elements
  const phoneFrame = document.getElementById('phoneFrame');
  const toggleFrameBtn = document.getElementById('toggleFrameBtn');
  const clockTime = document.getElementById('clockTime');
  const toastNotice = document.getElementById('toastNotice');
  const appScrollContent = document.getElementById('appScrollContent');

  // Navigation elements
  const toolbarButtons = document.querySelectorAll('.toolbar-btn');
  const navItems = document.querySelectorAll('.nav-item');
  const screenViews = document.querySelectorAll('.screen-view');
  const headerHomeBtn = document.getElementById('headerHomeBtn');
  const btnNotifications = document.getElementById('btnNotifications');
  const btnProfile = document.getElementById('btnProfile');

  // Home screen elements
  const inputPartenza = document.getElementById('inputPartenza');
  const inputArrivo = document.getElementById('inputArrivo');
  const btnSwapStations = document.getElementById('btnSwapStations');
  const passengerCountDisplay = document.getElementById('passengerCountDisplay');
  const btnDecPassengers = document.getElementById('btnDecPassengers');
  const btnIncPassengers = document.getElementById('btnIncPassengers');
  const btnCercaBiglietti = document.getElementById('btnCercaBiglietti');
  const btnDataAndata = document.getElementById('btnDataAndata');
  const valDataAndata = document.getElementById('valDataAndata');
  const btnDataRitorno = document.getElementById('btnDataRitorno');
  const valDataRitorno = document.getElementById('valDataRitorno');
  const homeOfferImg = document.getElementById('homeOfferImg');
  const homeOfferText = document.getElementById('homeOfferText');
  const btnHomePrevOffer = document.getElementById('btnHomePrevOffer');
  const btnHomeNextOffer = document.getElementById('btnHomeNextOffer');
  const homeDots = [document.getElementById('dot0'), document.getElementById('dot1'), document.getElementById('dot2')];

  // Cerca screen elements
  const trainCardsButtons = document.querySelectorAll('.train-cta-btn');
  const filterSortBtn = document.getElementById('filterSortBtn');

  // Acquisto screen elements
  const chkTrainNum = document.getElementById('chkTrainNum');
  const chkDepTime = document.getElementById('chkDepTime');
  const chkArrTime = document.getElementById('chkArrTime');
  const chkPrice = document.getElementById('chkPrice');
  const paymentOptionItems = document.querySelectorAll('.payment-option-item');
  const btnFinalizePurchase = document.getElementById('btnFinalizePurchase');

  // Biglietti screen elements
  const tktDepTime = document.getElementById('tktDepTime');
  const tktArrTime = document.getElementById('tktArrTime');
  const qrCodeTrigger = document.getElementById('qrCodeTrigger');
  const qrModalBackdrop = document.getElementById('qrModalBackdrop');
  const btnCloseQrModal = document.getElementById('btnCloseQrModal');
  const purchaseModalBackdrop = document.getElementById('purchaseModalBackdrop');
  const btnGoToTickets = document.getElementById('btnGoToTickets');
  const btnBuyMore = document.getElementById('btnBuyMore');

  // Offerte screen elements
  const accordionButtons = document.querySelectorAll('.btn-offer-accordion');

  // 1. Clock updates
  function updateClock() {
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    if (clockTime) clockTime.textContent = `${hrs}:${mins}`;
  }
  updateClock();
  setInterval(updateClock, 30000);

  // 2. Toast Notice helper
  function showToast(msg) {
    if (!toastNotice) return;
    toastNotice.textContent = msg;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 2400);
  }

  // 3. Screen Switching Navigation
  function navigateTo(screenId) {
    if (!screenId) return;
    state.currentScreen = screenId;

    // Switch view visibility
    screenViews.forEach(view => {
      if (view.id === `view-${screenId}`) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    // Update Desktop Toolbar
    toolbarButtons.forEach(btn => {
      if (btn.getAttribute('data-screen') === screenId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update Bottom Nav Bar
    navItems.forEach(item => {
      const navTarget = item.getAttribute('data-nav');
      if (navTarget === screenId || (screenId === 'acquisto' && navTarget === 'cerca')) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Scroll back to top smoothly
    if (appScrollContent) {
      appScrollContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Event Listeners for Toolbar and Bottom Nav
  toolbarButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      navigateTo(btn.getAttribute('data-screen'));
    });
  });

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.getAttribute('data-nav');
      if (target === 'club') {
        showToast('Benvenuto in Italo Più: accumula punti ad ogni viaggio!');
        return;
      }
      navigateTo(target);
    });
  });

  if (headerHomeBtn) {
    headerHomeBtn.addEventListener('click', () => navigateTo('home'));
  }

  // 4. Header buttons
  if (btnNotifications) {
    btnNotifications.addEventListener('click', () => {
      showToast('Nessun nuovo avviso per la tratta selezionata.');
    });
  }

  if (btnProfile) {
    btnProfile.addEventListener('click', () => {
      showToast('Profilo: Diego (Italo Più Card n° 8492048)');
    });
  }

  // 5. Desktop Frame Toggle
  if (toggleFrameBtn) {
    toggleFrameBtn.addEventListener('click', () => {
      document.body.classList.toggle('fullscreen-mode');
      if (document.body.classList.contains('fullscreen-mode')) {
        toggleFrameBtn.textContent = '📱 Modalità iPhone';
      } else {
        toggleFrameBtn.textContent = '🖥️ A Tutto Schermo';
      }
    });
  }

  // 6. Home: Stations Swap
  if (btnSwapStations && inputPartenza && inputArrivo) {
    btnSwapStations.addEventListener('click', () => {
      const tmp = inputPartenza.value;
      inputPartenza.value = inputArrivo.value;
      inputArrivo.value = tmp;
      state.stations.from = inputPartenza.value;
      state.stations.to = inputArrivo.value;
      showToast(`Tratta invertita: ${state.stations.from} → ${state.stations.to}`);
    });
  }

  // 7. Home: Passengers Stepper
  function updatePassengerUI() {
    if (passengerCountDisplay) {
      passengerCountDisplay.textContent = state.passengers;
    }
    if (btnDecPassengers) {
      btnDecPassengers.disabled = state.passengers <= 1;
    }
  }

  if (btnIncPassengers) {
    btnIncPassengers.addEventListener('click', () => {
      if (state.passengers < 9) {
        state.passengers++;
        updatePassengerUI();
      }
    });
  }

  if (btnDecPassengers) {
    btnDecPassengers.addEventListener('click', () => {
      if (state.passengers > 1) {
        state.passengers--;
        updatePassengerUI();
      }
    });
  }

  // 8. Calendar Modal (Reference Design) & Date Selection (Andata / Ritorno)
  const calendarModalBackdrop = document.getElementById('calendarModalBackdrop');
  const calendarModalCard = document.getElementById('calendarModalCard');
  const calendarMonthTitle = document.getElementById('calendarMonthTitle');
  const calendarTargetSubtitle = document.getElementById('calendarTargetSubtitle');
  const calendarPrevMonth = document.getElementById('calendarPrevMonth');
  const calendarNextMonth = document.getElementById('calendarNextMonth');
  const calendarCloseBtn = document.getElementById('calendarCloseBtn');
  const calendarDaysGrid = document.getElementById('calendarDaysGrid');
  const calendarConfirmBtn = document.getElementById('calendarConfirmBtn');

  const monthNames = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];

  let calendarMode = 'ritorno'; // 'andata' | 'ritorno'
  let calYear = 2025;
  let calMonth = 9; // 9 = Ottobre (0-indexed)
  let selectedDepartureDate = { year: 2025, month: 9, day: 23 };
  let selectedReturnDate = { year: 2025, month: 9, day: 26 };

  function renderCalendar() {
    if (!calendarMonthTitle || !calendarDaysGrid) return;

    calendarMonthTitle.textContent = `${monthNames[calMonth]} ${calYear}`;
    if (calendarTargetSubtitle) {
      calendarTargetSubtitle.textContent = (calendarMode === 'andata') ? 'Data di Andata' : 'Data di Ritorno';
    }
    calendarDaysGrid.innerHTML = '';

    // Monday-first calculation (0 = Mon, 6 = Sun)
    const firstDayIndex = (new Date(calYear, calMonth, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

    // Empty offset cells for days before the 1st
    for (let i = 0; i < firstDayIndex; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'calendar-day-btn empty';
      calendarDaysGrid.appendChild(emptyCell);
    }

    // Days 1 through daysInMonth
    for (let day = 1; day <= daysInMonth; day++) {
      const dayBtn = document.createElement('button');
      dayBtn.type = 'button';
      dayBtn.className = 'calendar-day-btn';
      dayBtn.textContent = day;

      const isDep = (selectedDepartureDate &&
                     selectedDepartureDate.year === calYear &&
                     selectedDepartureDate.month === calMonth &&
                     selectedDepartureDate.day === day);

      const isRet = (selectedReturnDate &&
                     selectedReturnDate.year === calYear &&
                     selectedReturnDate.month === calMonth &&
                     selectedReturnDate.day === day);

      if (calendarMode === 'andata') {
        if (isDep) {
          dayBtn.classList.add('selected');
        }
        dayBtn.addEventListener('click', () => {
          selectedDepartureDate = { year: calYear, month: calMonth, day: day };
          renderCalendar();
        });
      } else {
        // Mode: ritorno
        if (isDep) {
          dayBtn.classList.add('departure-date');
          dayBtn.title = 'Data di andata (fissata)';
        }

        if (isRet) {
          dayBtn.classList.add('selected');
        }

        // Return date cannot be before departure
        const isBeforeDeparture = (calYear < selectedDepartureDate.year) ||
          (calYear === selectedDepartureDate.year && calMonth < selectedDepartureDate.month) ||
          (calYear === selectedDepartureDate.year && calMonth === selectedDepartureDate.month && day < selectedDepartureDate.day);

        if (isBeforeDeparture) {
          dayBtn.classList.add('disabled');
          dayBtn.disabled = true;
        } else {
          dayBtn.addEventListener('click', () => {
            selectedReturnDate = { year: calYear, month: calMonth, day: day };
            renderCalendar();
          });
        }
      }

      calendarDaysGrid.appendChild(dayBtn);
    }
  }

  function openCalendarModal(mode = 'ritorno') {
    calendarMode = mode;
    const refDate = (calendarMode === 'andata') ? selectedDepartureDate : (selectedReturnDate || selectedDepartureDate);
    if (refDate) {
      calYear = refDate.year;
      calMonth = refDate.month;
    } else {
      calYear = 2025;
      calMonth = 9;
    }
    renderCalendar();
    if (calendarModalBackdrop) {
      calendarModalBackdrop.classList.add('active');
    }
  }

  function closeCalendarModal() {
    if (calendarModalBackdrop) {
      calendarModalBackdrop.classList.remove('active');
    }
  }

  // Expose globally for inline onclick fallbacks
  window.openCalendarModal = openCalendarModal;
  window.closeCalendarModal = closeCalendarModal;

  if (calendarPrevMonth) {
    calendarPrevMonth.addEventListener('click', () => {
      calMonth--;
      if (calMonth < 0) {
        calMonth = 11;
        calYear--;
      }
      renderCalendar();
    });
  }

  if (calendarNextMonth) {
    calendarNextMonth.addEventListener('click', () => {
      calMonth++;
      if (calMonth > 11) {
        calMonth = 0;
        calYear++;
      }
      renderCalendar();
    });
  }

  if (calendarCloseBtn) {
    calendarCloseBtn.addEventListener('click', () => {
      closeCalendarModal();
    });
  }

  if (calendarConfirmBtn) {
    calendarConfirmBtn.addEventListener('click', () => {
      if (calendarMode === 'andata' && selectedDepartureDate) {
        const formatted = `${selectedDepartureDate.day} ${monthNames[selectedDepartureDate.month]} ${selectedDepartureDate.year}`;
        state.dates.departure = formatted;
        if (valDataAndata) {
          valDataAndata.textContent = formatted;
        }
        showToast(`Data di andata impostata: ${formatted}`);
      } else if (calendarMode === 'ritorno' && selectedReturnDate) {
        const formatted = `${selectedReturnDate.day} ${monthNames[selectedReturnDate.month]} ${selectedReturnDate.year}`;
        state.dates.return = formatted;
        if (valDataRitorno) {
          valDataRitorno.textContent = formatted;
        }
        const returnLabel = btnDataRitorno?.querySelector('.pill-label');
        if (returnLabel) {
          returnLabel.textContent = 'Data di ritorno';
        }
        showToast(`Data di ritorno confermata: ${formatted}`);
      }
      closeCalendarModal();
    });
  }

  // Open calendar on click "Data di andata"
  if (btnDataAndata) {
    btnDataAndata.addEventListener('click', (e) => {
      e.preventDefault();
      openCalendarModal('andata');
    });
  }

  // Open calendar on click "Aggiungi Ritorno"
  if (btnDataRitorno) {
    btnDataRitorno.addEventListener('click', (e) => {
      e.preventDefault();
      openCalendarModal('ritorno');
    });
  }

  // Close when clicking modal backdrop
  if (calendarModalBackdrop) {
    calendarModalBackdrop.addEventListener('click', (e) => {
      if (e.target === calendarModalBackdrop) {
        closeCalendarModal();
      }
    });
  }

  // ESC key to close calendar
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && calendarModalBackdrop?.classList.contains('active')) {
      closeCalendarModal();
    }
  });

  // 9. Home: Search Submit
  if (btnCercaBiglietti) {
    btnCercaBiglietti.addEventListener('click', () => {
      state.stations.from = inputPartenza.value || 'Catania Centrale';
      state.stations.to = inputArrivo.value || 'Taormina Giardini';
      navigateTo('cerca');
    });
  }

  // 10. Home: Offers Carousel
  function updateHomeOfferCarousel() {
    const item = carouselOffers[state.homeCarouselIndex];
    if (homeOfferImg) homeOfferImg.src = item.img;
    if (homeOfferText) homeOfferText.textContent = item.text;
    homeDots.forEach((dot, idx) => {
      if (dot) {
        if (idx === state.homeCarouselIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      }
    });
  }

  if (btnHomeNextOffer) {
    btnHomeNextOffer.addEventListener('click', () => {
      state.homeCarouselIndex = (state.homeCarouselIndex + 1) % carouselOffers.length;
      updateHomeOfferCarousel();
    });
  }

  if (btnHomePrevOffer) {
    btnHomePrevOffer.addEventListener('click', () => {
      state.homeCarouselIndex = (state.homeCarouselIndex - 1 + carouselOffers.length) % carouselOffers.length;
      updateHomeOfferCarousel();
    });
  }

  // 11. Cerca: Selecting a Train
  trainCardsButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const train = btn.getAttribute('data-train') || '9950';
      const dep = btn.getAttribute('data-dep') || '07:43';
      const arr = btn.getAttribute('data-arr') || '10:14';
      const price = btn.getAttribute('data-price') || '298,00€';

      state.selectedTrain = {
        number: train,
        depTime: dep,
        arrTime: arr,
        price: price
      };

      if (chkTrainNum) chkTrainNum.textContent = train;
      if (chkDepTime) chkDepTime.textContent = dep;
      if (chkArrTime) chkArrTime.textContent = arr;
      if (chkPrice) chkPrice.textContent = price;

      navigateTo('acquisto');
    });
  });

  if (filterSortBtn) {
    filterSortBtn.addEventListener('click', () => {
      showToast('Ordinato per: Orario di partenza più prossimo');
    });
  }

  // 12. Acquisto: Payment Methods Selection
  paymentOptionItems.forEach(item => {
    item.addEventListener('click', () => {
      paymentOptionItems.forEach(opt => opt.classList.remove('selected'));
      item.classList.add('selected');
      state.selectedPayment = item.getAttribute('data-method');
      const name = item.querySelector('.payment-name')?.textContent;
      showToast(`Metodo selezionato: ${name}`);
    });
  });

  // 13. Acquisto: Finalize Purchase
  if (btnFinalizePurchase) {
    btnFinalizePurchase.addEventListener('click', () => {
      if (purchaseModalBackdrop) {
        purchaseModalBackdrop.classList.add('active');
      }
    });
  }

  if (btnGoToTickets) {
    btnGoToTickets.addEventListener('click', () => {
      if (purchaseModalBackdrop) purchaseModalBackdrop.classList.remove('active');
      if (tktDepTime) tktDepTime.textContent = state.selectedTrain.depTime;
      if (tktArrTime) tktArrTime.textContent = state.selectedTrain.arrTime;
      navigateTo('biglietti');
    });
  }

  // 14. Biglietti: QR Code Modal
  if (qrCodeTrigger && qrModalBackdrop) {
    qrCodeTrigger.addEventListener('click', () => {
      qrModalBackdrop.classList.add('active');
    });
  }

  if (btnCloseQrModal && qrModalBackdrop) {
    btnCloseQrModal.addEventListener('click', () => {
      qrModalBackdrop.classList.remove('active');
    });
  }

  if (qrModalBackdrop) {
    qrModalBackdrop.addEventListener('click', (e) => {
      if (e.target === qrModalBackdrop) {
        qrModalBackdrop.classList.remove('active');
      }
    });
  }

  if (btnBuyMore) {
    btnBuyMore.addEventListener('click', () => {
      navigateTo('home');
    });
  }

  // 15. Offerte: Accordion Drawers
  accordionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const drawer = document.getElementById(targetId);
      if (!drawer) return;
      
      const isOpen = drawer.classList.contains('open');
      document.querySelectorAll('.offer-accordion-drawer').forEach(d => d.classList.remove('open'));
      document.querySelectorAll('.btn-offer-accordion svg, .btn-offer-accordion .material-symbols-rounded').forEach(icon => icon.style.transform = 'rotate(0deg)');

      if (!isOpen) {
        drawer.classList.add('open');
        const icon = btn.querySelector('svg, .material-symbols-rounded');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  // Segment tabs switching (Home & Biglietti)
  document.querySelectorAll('.segment-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const parent = tab.parentElement;
      parent.querySelectorAll('.segment-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      if (tab.id === 'tabCarnet' || tab.id === 'tabMyCarnet') {
        showToast('Nessun Carnet attivo al momento.');
      }
    });
  });

  // Initial setup
  updatePassengerUI();
  updateHomeOfferCarousel();
}

// Ensure execution even if DOMContentLoaded already fired
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
