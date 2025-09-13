// Safe Yatra - Smart Tourist Safety System
// Main Application JavaScript

class SafeYatraApp {
  constructor() {
    this.currentUser = null;
    this.currentLanguage = 'en';
    this.map = null;
    this.userMarker = null;
    this.safetyZones = [];
    this.isTracking = false;
    this.currentStep = 1;
    
    // Application data
    this.data = {
      tourists: [
        {
          id: "TOUR-7834",
          name: "Rahul Sharma",
          email: "rahul.sharma@email.com",
          phone: "+91-9876543210",
          nationality: "Indian",
          passport: "A12345678",
          startDate: "2025-09-15",
          endDate: "2025-09-25",
          currentLocation: { lat: 28.6139, lng: 77.2090 },
          safetyScore: 8.5,
          status: "active"
        },
        {
          id: "TOUR-9156",
          name: "Emma Johnson",
          email: "emma.johnson@email.com",
          phone: "+1-555-0123",
          nationality: "American",
          passport: "US987654321",
          startDate: "2025-09-10",
          endDate: "2025-09-30",
          currentLocation: { lat: 28.6200, lng: 77.2150 },
          safetyScore: 6.2,
          status: "caution"
        }
      ],
      safetyZones: [
        {
          id: "zone-1",
          name: "Red Fort Area",
          center: { lat: 28.6562, lng: 77.2410 },
          radius: 500,
          type: "safe",
          color: "green",
          safetyScore: 9.1,
          description: "Major tourist attraction with high security"
        },
        {
          id: "zone-2", 
          name: "Diplomatic Enclave",
          center: { lat: 28.5984, lng: 77.1892 },
          radius: 800,
          type: "embassy",
          color: "purple",
          safetyScore: 9.8,
          description: "High security diplomatic area"
        },
        {
          id: "zone-3",
          name: "Construction Zone",
          center: { lat: 28.6200, lng: 77.2150 },
          radius: 300,
          type: "restricted",
          color: "red",
          safetyScore: 3.2,
          description: "Active construction - safety hazards present"
        }
      ],
      alerts: [
        {
          id: "alert-001",
          type: "weather",
          severity: "medium",
          title: "Heavy Rain Alert",
          message: "Monsoon rains expected in Delhi NCR. Avoid low-lying areas.",
          location: "Delhi NCR",
          timestamp: "2025-09-13T16:30:00Z",
          source: "IMD"
        },
        {
          id: "alert-002",
          type: "security",
          severity: "high",
          title: "Heightened Security",
          message: "Increased security measures at major tourist sites due to festival season.",
          location: "All Major Monuments",
          timestamp: "2025-09-13T14:15:00Z",
          source: "Intelligence Bureau"
        }
      ],
      embassies: [
        {
          country: "United States",
          name: "U.S. Embassy New Delhi",
          address: "Shantipath, Chanakyapuri, New Delhi",
          phone: "+91-11-2419-8000",
          emergency: "+91-11-2419-8000",
          location: { lat: 28.5984, lng: 77.1892 },
          services: ["Emergency Services", "Passport Replacement", "Consular Services"]
        },
        {
          country: "United Kingdom", 
          name: "British High Commission",
          address: "Shantipath, Chanakyapuri, New Delhi",
          phone: "+91-11-2419-2100",
          emergency: "+91-11-2419-2100",
          location: { lat: 28.5960, lng: 77.1895 },
          services: ["Emergency Services", "Consular Assistance", "Travel Documents"]
        }
      ],
      languages: [
        { code: "en", name: "English", flag: "ðŸ‡ºðŸ‡¸" },
        { code: "hi", name: "à¤¹à¤¿à¤‚à¤¦à¥€", flag: "ðŸ‡®ðŸ‡³" },
        { code: "es", name: "EspaÃ±ol", flag: "ðŸ‡ªðŸ‡¸" },
        { code: "fr", name: "FranÃ§ais", flag: "ðŸ‡«ðŸ‡·" },
        { code: "ar", name: "Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©", flag: "ðŸ‡¸ðŸ‡¦" },
        { code: "zh", name: "ä¸­æ–‡", flag: "ðŸ‡¨ðŸ‡³" }
      ],
      translations: {
        en: {
          welcome: "Welcome to Safe Yatra",
          register: "Get Started - Register Now",
          emergency: "EMERGENCY SOS",
          safetyScore: "Safety Score",
          currentLocation: "Current Status",
          alerts: "Active Alerts",
          embassy: "Embassy Services"
        },
        hi: {
          welcome: "à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤®à¥‡à¤‚ à¤†à¤ªà¤•à¤¾ à¤¸à¥à¤µà¤¾à¤—à¤¤ à¤¹à¥ˆ",
          register: "à¤¶à¥à¤°à¥à¤†à¤¤ à¤•à¤°à¥‡à¤‚ - à¤…à¤¬ à¤ªà¤‚à¤œà¥€à¤•à¤°à¤£ à¤•à¤°à¥‡à¤‚",
          emergency: "à¤†à¤ªà¤¾à¤¤à¤•à¤¾à¤²à¥€à¤¨ à¤à¤¸à¤“à¤à¤¸", 
          safetyScore: "à¤¸à¥à¤°à¤•à¥à¤·à¤¾ à¤¸à¥à¤•à¥‹à¤°",
          currentLocation: "à¤µà¤°à¥à¤¤à¤®à¤¾à¤¨ à¤¸à¥à¤¥à¤¿à¤¤à¤¿",
          alerts: "à¤¸à¤•à¥à¤°à¤¿à¤¯ à¤…à¤²à¤°à¥à¤Ÿ",
          embassy: "à¤¦à¥‚à¤¤à¤¾à¤µà¤¾à¤¸ à¤¸à¥‡à¤µà¤¾à¤à¤‚"
        },
        es: {
          welcome: "Bienvenido a Safe Yatra",
          register: "Comenzar - Registrarse Ahora",
          emergency: "SOS DE EMERGENCIA",
          safetyScore: "PuntuaciÃ³n de Seguridad",
          currentLocation: "Estado Actual",
          alerts: "Alertas Activas",
          embassy: "Servicios de Embajada"
        },
        fr: {
          welcome: "Bienvenue Ã  Safe Yatra",
          register: "Commencer - S'inscrire Maintenant",
          emergency: "SOS D'URGENCE",
          safetyScore: "Score de SÃ©curitÃ©",
          currentLocation: "Statut Actuel",
          alerts: "Alertes Actives",
          embassy: "Services d'Ambassade"
        },
        ar: {
          welcome: "Ù…Ø±Ø­Ø¨Ø§ Ø¨Ùƒ ÙÙŠ Ø±Ø­Ù„Ø© Ø¢Ù…Ù†Ø©",
          register: "Ø§Ø¨Ø¯Ø£ - Ø³Ø¬Ù„ Ø§Ù„Ø¢Ù†",
          emergency: "Ø·ÙˆØ§Ø±Ø¦ SOS",
          safetyScore: "Ù†Ù‚Ø§Ø· Ø§Ù„Ø£Ù…Ø§Ù†",
          currentLocation: "Ø§Ù„Ø­Ø§Ù„Ø© Ø§Ù„Ø­Ø§Ù„ÙŠØ©",
          alerts: "ØªÙ†Ø¨ÙŠÙ‡Ø§Øª Ù†Ø´Ø·Ø©",
          embassy: "Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ø³ÙØ§Ø±Ø©"
        },
        zh: {
          welcome: "æ¬¢è¿Žæ¥åˆ°å®‰å…¨æ—…è¡Œ",
          register: "å¼€å§‹ - ç«‹å³æ³¨å†Œ",
          emergency: "ç´§æ€¥æ±‚æ•‘",
          safetyScore: "å®‰å…¨è¯„åˆ†",
          currentLocation: "å½“å‰çŠ¶æ€",
          alerts: "æ´»è·ƒè­¦æŠ¥",
          embassy: "å¤§ä½¿é¦†æœåŠ¡"
        }
      },
      aiResponses: {
        riskAssessment: [
          "Based on current data, your location shows moderate risk due to heavy tourist traffic. Recommend staying in groups.",
          "AI Analysis: Weather conditions optimal, security presence high. Safe to explore major attractions.",
          "Alert: Unusual crowd patterns detected near your location. Consider alternative routes."
        ],
        recommendations: [
          "Popular local restaurant 'Spice Garden' nearby - highly rated by other tourists",
          "ATM location: State Bank of India, 200m north of your position",
          "Tourist Police Station: Contact +91-11-2334-5678 for any assistance"
        ]
      }
    };

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateTranslations();
    this.showSection('welcome');
    this.startRealTimeUpdates();
    this.setDefaultDates();
  }

  setDefaultDates() {
    // Set minimum date to today for journey dates
    const today = new Date().toISOString().split('T')[0];
    const dobField = document.getElementById('dob');
    const startDateField = document.getElementById('start-date');
    const endDateField = document.getElementById('end-date');
    
    if (dobField) {
      dobField.max = today; // Max date for DOB is today
    }
    
    if (startDateField) {
      startDateField.min = today; // Min date for start is today
      startDateField.value = today; // Set default to today
    }
    
    if (endDateField) {
      endDateField.min = today; // Min date for end is today
      // Set default end date to 7 days from today
      const weekFromToday = new Date();
      weekFromToday.setDate(weekFromToday.getDate() + 7);
      endDateField.value = weekFromToday.toISOString().split('T')[0];
    }
  }

  setupEventListeners() {
    // Language selector
    document.getElementById('language-selector').addEventListener('change', (e) => {
      this.changeLanguage(e.target.value);
    });

    // Navigation
    document.getElementById('start-registration').addEventListener('click', () => {
      this.showSection('registration');
    });

    document.getElementById('view-dashboard').addEventListener('click', () => {
      this.showSection('dashboard');
    });

    document.getElementById('auth-toggle').addEventListener('click', (e) => {
      const button = e.target;
      if (button.textContent === 'Login') {
        this.showSection('authority-dashboard');
        button.textContent = 'Dashboard';
      } else {
        this.showSection('dashboard');
        button.textContent = 'Login';
      }
    });

    // Registration steps
    document.getElementById('next-step-1').addEventListener('click', () => this.nextStep());
    document.getElementById('next-step-2').addEventListener('click', () => this.nextStep());
    document.getElementById('prev-step-2').addEventListener('click', () => this.prevStep());
    document.getElementById('prev-step-3').addEventListener('click', () => this.prevStep());
    document.getElementById('complete-registration').addEventListener('click', () => this.completeRegistration());

    // Emergency SOS
    document.getElementById('emergency-sos').addEventListener('click', () => this.triggerEmergencySOS());

    // Map controls
    document.getElementById('center-location')?.addEventListener('click', () => this.centerMap());
    document.getElementById('toggle-zones')?.addEventListener('click', () => this.toggleSafetyZones());

    // Chat
    document.getElementById('send-message').addEventListener('click', () => this.sendChatMessage());
    document.getElementById('chat-input').addEventListener('keypress', (e) => {
      if (e.key === 'AIzaSyA9Mc_KI7KkYPtYKcKahHJ6xnGo3eKSkt0') this.sendChatMessage();
    });

    // Refresh buttons
    document.getElementById('refresh-alerts')?.addEventListener('click', () => this.loadAlerts());
    document.getElementById('refresh-data')?.addEventListener('click', () => this.refreshAuthorityData());
  }

  showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section-container');
    sections.forEach(section => section.classList.add('hidden'));

    // Show specific section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.remove('hidden');
      targetSection.classList.add('fade-in');

      // Initialize section-specific functionality
      if (sectionId === 'dashboard') {
        this.initDashboard();
      } else if (sectionId === 'authority-dashboard') {
        this.initAuthorityDashboard();
      }
    }

    // Toggle welcome vs other sections
    const welcomeSection = document.getElementById('welcome');
    if (sectionId === 'welcome') {
      welcomeSection.classList.remove('hidden');
    } else {
      welcomeSection.classList.add('hidden');
    }
  }

  changeLanguage(langCode) {
    this.currentLanguage = langCode;
    this.updateTranslations();
    this.showAlert(`Language changed to ${this.data.languages.find(l => l.code === langCode)?.name}`);
  }

  updateTranslations() {
    const translations = this.data.translations[this.currentLanguage];
    if (!translations) return;

    document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.getAttribute('data-translate');
      if (translations[key]) {
        element.textContent = translations[key];
      }
    });
  }

  // Registration Process
  nextStep() {
    if (this.validateCurrentStep()) {
      this.currentStep++;
      this.updateRegistrationStep();
      
      if (this.currentStep === 3) {
        this.simulateKYC();
      }
    } else {
      this.showAlert('Please fill in all required fields correctly.');
    }
  }

  prevStep() {
    this.currentStep--;
    this.updateRegistrationStep();
  }

  updateRegistrationStep() {
    // Update progress indicator
    document.querySelectorAll('.progress-step').forEach((step, index) => {
      if (index + 1 <= this.currentStep) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });

    // Show current step
    document.querySelectorAll('.registration-step').forEach((step, index) => {
      if (index + 1 === this.currentStep) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });
  }

  validateCurrentStep() {
    const currentStepElement = document.querySelector('.registration-step.active');
    const inputs = currentStepElement.querySelectorAll('input[required], select[required]');
    let valid = true;

    inputs.forEach(input => {
      // Reset previous error styling
      input.style.borderColor = '';
      
      if (!input.value || input.value.trim() === '') {
        input.style.borderColor = '#e74c3c';
        valid = false;
      } else if (input.type === 'email' && !this.isValidEmail(input.value)) {
        input.style.borderColor = '#e74c3c';
        valid = false;
      } else if (input.type === 'date' && !this.isValidDate(input.value)) {
        input.style.borderColor = '#e74c3c';
        valid = false;
      }
    });

    // Special validation for travel dates
    if (this.currentStep === 2) {
      const startDate = document.getElementById('start-date').value;
      const endDate = document.getElementById('end-date').value;
      
      if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
        document.getElementById('end-date').style.borderColor = '#e74c3c';
        this.showAlert('End date must be after start date.');
        valid = false;
      }
    }

    return valid;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidDate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  }

  simulateKYC() {
    const kycItems = document.querySelectorAll('.kyc-item');
    let completedItems = 0;

    const processKYC = () => {
      if (completedItems < kycItems.length) {
        const item = kycItems[completedItems];
        const loadingDots = item.querySelector('.loading-dots');
        const icon = item.querySelector('i');
        
        setTimeout(() => {
          loadingDots.style.display = 'none';
          icon.style.color = '#27ae60';
          icon.className = 'fas fa-check-circle';
          completedItems++;
          processKYC();
        }, 1500 + (completedItems * 1000));
      } else {
        setTimeout(() => {
          this.generateDigitalID();
        }, 500);
      }
    };

    processKYC();
  }

  generateDigitalID() {
    const name = document.getElementById('full-name').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const digitalId = 'TOUR-' + Math.floor(Math.random() * 10000);

    document.getElementById('id-name').textContent = name;
    document.getElementById('id-number').textContent = digitalId;
    document.getElementById('id-validity').textContent = `${startDate} to ${endDate}`;

    document.getElementById('digital-id').style.display = 'block';
    document.getElementById('complete-registration').style.display = 'block';

    // Store user data for dashboard
    this.currentUser = {
      id: digitalId,
      name: name,
      startDate: startDate,
      endDate: endDate,
      safetyScore: 8.5,
      status: 'active'
    };

    this.showAlert('Digital ID generated successfully!');
  }

  completeRegistration() {
    document.getElementById('view-dashboard').style.display = 'inline-flex';
    document.getElementById('start-registration').style.display = 'none';
    this.showSection('dashboard');
    this.showAlert('Registration completed! Welcome to Safe Yatra.');
  }

  // Dashboard Functionality
  initDashboard() {
    this.initMap();
    this.loadAlerts();
    this.loadEmbassyServices();
    this.updateDashboardStats();
  }

  initMap() {
    if (this.map) {
      this.map.remove();
    }

    this.map = L.map('map').setView([28.6139, 77.2090], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Â© OpenStreetMap contributors'
    }).addTo(this.map);

    // Add user marker
    this.userMarker = L.marker([28.6139, 77.2090])
      .addTo(this.map)
      .bindPopup('Your Current Location')
      .openPopup();

    // Add safety zones
    this.addSafetyZones();
    
    // Add embassy markers
    this.addEmbassyMarkers();

    // Start tracking simulation
    this.startLocationTracking();
  }

  addSafetyZones() {
    this.data.safetyZones.forEach(zone => {
      const circle = L.circle([zone.center.lat, zone.center.lng], {
        color: zone.color,
        fillColor: zone.color,
        fillOpacity: 0.2,
        radius: zone.radius
      }).addTo(this.map);

      circle.bindPopup(`
        <strong>${zone.name}</strong><br>
        Safety Score: ${zone.safetyScore}/10<br>
        ${zone.description}
      `);
    });
  }

  addEmbassyMarkers() {
    this.data.embassies.forEach(embassy => {
      const marker = L.marker([embassy.location.lat, embassy.location.lng], {
        icon: L.divIcon({
          html: '<i class="fas fa-flag" style="color: purple; font-size: 20px;"></i>',
          iconSize: [30, 30],
          className: 'embassy-marker'
        })
      }).addTo(this.map);

      marker.bindPopup(`
        <strong>${embassy.name}</strong><br>
        ${embassy.address}<br>
        Phone: ${embassy.phone}<br>
        Emergency: ${embassy.emergency}
      `);
    });
  }

  startLocationTracking() {
    this.isTracking = true;
    setInterval(() => {
      if (this.isTracking && this.userMarker) {
        // Simulate movement
        const currentPos = this.userMarker.getLatLng();
        const newLat = currentPos.lat + (Math.random() * 0.001 - 0.0005);
        const newLng = currentPos.lng + (Math.random() * 0.001 - 0.0005);
        
        this.userMarker.setLatLng([newLat, newLng]);
        this.checkSafetyZones(newLat, newLng);
      }
    }, 5000);
  }

  checkSafetyZones(lat, lng) {
    let currentZone = null;
    
    this.data.safetyZones.forEach(zone => {
      const distance = this.calculateDistance(
        lat, lng, 
        zone.center.lat, zone.center.lng
      ) * 1000; // Convert to meters

      if (distance <= zone.radius) {
        currentZone = zone;
      }
    });

    if (currentZone) {
      this.updateZoneStatus(currentZone);
    } else {
      this.updateZoneStatus({ type: 'safe', name: 'General Area' });
    }
  }

  calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  updateZoneStatus(zone) {
    const zoneStatus = document.getElementById('zone-status');
    const indicator = zoneStatus.querySelector('.zone-indicator');
    
    indicator.className = `zone-indicator ${zone.type}`;
    
    let statusText = '';
    let iconClass = '';
    
    switch (zone.type) {
      case 'safe':
        statusText = zone.name ? `You are in ${zone.name} - Safe Zone` : 'You are in a Safe Zone';
        iconClass = 'fas fa-check-circle';
        break;
      case 'restricted':
        statusText = `âš ï¸ You have entered ${zone.name} - Restricted Area`;
        iconClass = 'fas fa-exclamation-triangle';
        this.showAlert('You have entered a restricted area. Please exercise caution.');
        break;
      case 'embassy':
        statusText = `You are near ${zone.name} - Embassy Zone`;
        iconClass = 'fas fa-flag';
        break;
      default:
        statusText = 'You are in a Safe Zone';
        iconClass = 'fas fa-check-circle';
    }
    
    indicator.innerHTML = `<i class="${iconClass}"></i><span>${statusText}</span>`;
  }

  centerMap() {
    if (this.map && this.userMarker) {
      this.map.setView(this.userMarker.getLatLng(), 15);
    }
  }

  toggleSafetyZones() {
    this.showAlert('Safety zones visibility toggled');
  }

  // Chat System
  sendChatMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;

    this.addChatMessage(message, true);
    input.value = '';

    // Simulate AI response
    setTimeout(() => {
      const response = this.generateAIResponse(message);
      this.addChatMessage(response, false);
    }, 1000);
  }

  addChatMessage(message, isUser) {
    const chatContainer = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user-message' : 'ai-message'}`;
    
    messageDiv.innerHTML = `
      <div class="message-avatar">
        <i class="fas fa-${isUser ? 'user' : 'robot'}"></i>
      </div>
      <div class="message-content">
        <p>${message}</p>
      </div>
    `;
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  generateAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('safety') || message.includes('risk')) {
      const responses = this.data.aiResponses.riskAssessment;
      return responses[Math.floor(Math.random() * responses.length)];
    } else if (message.includes('food') || message.includes('restaurant') || message.includes('atm')) {
      const responses = this.data.aiResponses.recommendations;
      return responses[Math.floor(Math.random() * responses.length)];
    } else if (message.includes('emergency') || message.includes('help')) {
      return "In case of emergency, use the red SOS button above. I can also provide immediate contact information for local authorities and your embassy. What specific assistance do you need?";
    } else if (message.includes('weather')) {
      return "Current weather conditions are favorable for tourism. However, monsoon season is approaching. I recommend checking weather alerts regularly and avoiding low-lying areas during heavy rains.";
    } else if (message.includes('translate') || message.includes('language')) {
      return "I can help with basic translations and local language assistance. You can also change the app language using the selector in the top navigation. What would you like me to translate?";
    } else {
      return "I'm your AI safety assistant. I can help with safety assessments, local recommendations, emergency procedures, weather updates, and real-time threat analysis. How can I assist you today?";
    }
  }

  // Emergency System
  triggerEmergencySOS() {
    // Show the SOS modal immediately
    document.getElementById('sos-modal').classList.remove('hidden');
    
    // Update the SOS status section
    const sosStatus = document.getElementById('sos-status');
    sosStatus.innerHTML = `
      <i class="fas fa-exclamation-triangle"></i>
      ðŸš¨ Emergency alert sent! Local authorities notified.
      <br>Location: 28.6139, 77.2090
      <br>Timestamp: ${new Date().toLocaleString()}
    `;
    sosStatus.style.display = 'block';

    // Start countdown
    let countdown = 10;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(() => {
      countdown--;
      if (countdownElement) {
        countdownElement.textContent = countdown;
      }
      
      if (countdown <= 0) {
        clearInterval(countdownInterval);
        document.getElementById('sos-modal').classList.add('hidden');
      }
    }, 1000);

    // Also show an alert notification
    this.showAlert('Emergency SOS activated! Authorities have been notified.');
  }

  // Alerts and Notifications
  loadAlerts() {
    const alertsList = document.getElementById('alerts-list');
    alertsList.innerHTML = '';

    this.data.alerts.forEach(alert => {
      const alertDiv = document.createElement('div');
      alertDiv.className = 'alert-item';
      alertDiv.innerHTML = `
        <div class="alert-icon ${alert.type}">
          <i class="fas fa-${alert.type === 'weather' ? 'cloud-rain' : 'shield-alt'}"></i>
        </div>
        <div class="alert-content">
          <h4>${alert.title}</h4>
          <p>${alert.message}</p>
          <div class="alert-meta">
            <span>${alert.location} â€¢ ${alert.source} â€¢ ${new Date(alert.timestamp).toLocaleString()}</span>
          </div>
        </div>
      `;
      alertsList.appendChild(alertDiv);
    });

    // Update alerts count
    document.getElementById('active-alerts-count').textContent = this.data.alerts.length;
  }

  loadEmbassyServices() {
    const embassyServices = document.getElementById('embassy-services');
    embassyServices.innerHTML = '';

    this.data.embassies.forEach(embassy => {
      const embassyDiv = document.createElement('div');
      embassyDiv.className = 'embassy-item';
      embassyDiv.innerHTML = `
        <div class="embassy-header">
          <h4>${embassy.name}</h4>
          <span class="embassy-contact">${embassy.emergency}</span>
        </div>
        <p>${embassy.address}</p>
        <div class="embassy-services-list">
          ${embassy.services.map(service => `<span class="service-tag">${service}</span>`).join('')}
        </div>
      `;
      embassyServices.appendChild(embassyDiv);
    });
  }

  updateDashboardStats() {
    if (this.currentUser) {
      document.getElementById('current-safety-score').textContent = this.currentUser.safetyScore;
    }
  }

  // Authority Dashboard
  initAuthorityDashboard() {
    this.loadTouristList();
    this.loadIncidentsList();
    this.updateCommunicationsPanel();
  }

  loadTouristList() {
    const touristList = document.getElementById('tourist-list');
    touristList.innerHTML = '';

    this.data.tourists.forEach(tourist => {
      const touristDiv = document.createElement('div');
      touristDiv.className = 'tourist-item';
      touristDiv.innerHTML = `
        <div class="tourist-info">
          <h5>${tourist.name}</h5>
          <p>ID: ${tourist.id} â€¢ Status: ${tourist.status}</p>
        </div>
        <div class="status status--${tourist.status === 'active' ? 'success' : 'warning'}">
          ${tourist.safetyScore}
        </div>
      `;
      touristList.appendChild(touristDiv);
    });
  }

  loadIncidentsList() {
    const incidentsList = document.getElementById('incidents-list');
    incidentsList.innerHTML = '<p>No active incidents reported. System monitoring normally.</p>';
  }

  updateCommunicationsPanel() {
    const panel = document.getElementById('communications-panel');
    panel.innerHTML = `
      <div class="communications-status">
        <i class="fas fa-satellite-dish"></i>
        <p>Emergency Communication Center - Online</p>
        <p>Monitoring ${this.data.tourists.length} registered tourists</p>
        <p>Last update: ${new Date().toLocaleTimeString()}</p>
      </div>
    `;
  }

  refreshAuthorityData() {
    this.loadTouristList();
    this.loadIncidentsList();
    this.updateCommunicationsPanel();
    this.showAlert('Authority data refreshed successfully.');
  }

  // Real-time Updates
  startRealTimeUpdates() {
    // Simulate real-time updates every 30 seconds
    setInterval(() => {
      if (!document.getElementById('dashboard').classList.contains('hidden')) {
        // Update safety scores randomly
        this.data.tourists.forEach(tourist => {
          const change = (Math.random() - 0.5) * 0.2;
          tourist.safetyScore = Math.max(1, Math.min(10, tourist.safetyScore + change));
        });
        
        this.updateDashboardStats();
      }
    }, 30000);
  }

  // Utility Functions
  showAlert(message) {
    // Create temporary alert notification
    const alert = document.createElement('div');
    alert.className = 'alert-notification';
    alert.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: var(--color-primary);
      color: white;
      padding: 16px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 10000;
      max-width: 300px;
      animation: slideIn 0.3s ease-out;
    `;
    
    // Add slide-in animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    
    alert.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <i class="fas fa-info-circle"></i>
        <span>${message}</span>
      </div>
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
      alert.style.animation = 'slideIn 0.3s ease-out reverse';
      setTimeout(() => alert.remove(), 300);
    }, 4000);
  }

  showLoading(message = 'Loading...') {
    const overlay = document.getElementById('loading-overlay');
    const messageElement = document.getElementById('loading-message');
    messageElement.textContent = message;
    overlay.classList.remove('hidden');
  }

  hideLoading() {
    document.getElementById('loading-overlay').classList.add('hidden');
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.safeYatraApp = new SafeYatraApp();
});

// Additional utility functions for enhanced functionality
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function formatTime(dateString) {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SafeYatraApp;
}