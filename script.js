const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");
const bookingForm = document.querySelector("[data-booking-form]");
const formNote = document.querySelector("[data-form-note]");
const bookingOpenButtons = document.querySelectorAll("[data-booking-open]");
const bookingPanel = document.querySelector("[data-booking-panel]");
const bookingCloseButtons = document.querySelectorAll("[data-booking-close]");
const calendarGrid = document.querySelector("[data-calendar-grid]");
const calendarLabel = document.querySelector("[data-calendar-label]");
const calendarPrev = document.querySelector("[data-calendar-prev]");
const calendarNext = document.querySelector("[data-calendar-next]");
const timePicker = document.querySelector("[data-time-picker]");
const timeGrid = document.querySelector("[data-time-grid]");
const selectedDateLabel = document.querySelector("[data-selected-date-label]");
const bookingDateInput = document.querySelector("[data-booking-date]");
const bookingTimeInput = document.querySelector("[data-booking-time]");
const serviceSelect = document.querySelector("[data-service-select]");
const serviceList = document.querySelector("[data-service-list]");
const priceList = document.querySelector("[data-price-list]");
const adminOpenButton = document.querySelector("[data-admin-open]");
const adminPanel = document.querySelector("[data-admin-panel]");
const adminCloseButtons = document.querySelectorAll("[data-admin-close]");
const adminLogin = document.querySelector("[data-admin-login]");
const adminContent = document.querySelector("[data-admin-content]");
const adminLoginForm = document.querySelector("[data-admin-login-form]");
const adminLoginNote = document.querySelector("[data-admin-login-note]");
const passwordToggleButtons = document.querySelectorAll("[data-password-toggle]");
const passwordResetButtons = document.querySelectorAll("[data-password-reset]");
const currentPasswordInput = document.querySelector("[data-current-password]");
const passwordForm = document.querySelector("[data-password-form]");
const styleAddForm = document.querySelector("[data-style-add-form]");
const adminStyleList = document.querySelector("[data-admin-style-list]");
const adminNote = document.querySelector("[data-admin-note]");
const galleryUpload = document.querySelector("[data-gallery-upload]");
const galleryGrid = document.querySelector("[data-gallery-grid]");
const emptyGallery = document.querySelector("[data-empty-gallery]");
const adminGalleryList = document.querySelector("[data-admin-gallery-list]");
const adminBookingList = document.querySelector("[data-admin-booking-list]");
const adminBookingForm = document.querySelector("[data-admin-booking-form]");
const adminBookingServiceSelect = document.querySelector("[data-admin-booking-service]");
const adminBookingServiceList = document.querySelector("[data-admin-booking-service-list]");
const contactForm = document.querySelector("[data-contact-form]");
const publicPhoneLink = document.querySelector("[data-public-phone]");
const publicEmailLink = document.querySelector("[data-public-email]");
const adminCalendarGrid = document.querySelector("[data-admin-calendar-grid]");
const adminCalendarLabel = document.querySelector("[data-admin-calendar-label]");
const adminCalendarPrev = document.querySelector("[data-admin-calendar-prev]");
const adminCalendarNext = document.querySelector("[data-admin-calendar-next]");
const adminSelectedDateLabel = document.querySelector("[data-admin-selected-date]");
const adminBookingsTitle = document.querySelector("[data-admin-bookings-title]");
const adminRegularTimeList = document.querySelector("[data-regular-time-list]");
const adminDateTimeList = document.querySelector("[data-admin-date-time-list]");
const adminDateTimeForm = document.querySelector("[data-date-time-form]");
const adminDateAddToggle = document.querySelector("[data-date-add-toggle]");
const adminDateAddCancel = document.querySelector("[data-date-add-cancel]");
const adminDateDeleteSelectedButton = document.querySelector("[data-date-delete-selected]");
const adminDateNotWorkingButton = document.querySelector("[data-date-not-working]");
const lightboxPanel = document.querySelector("[data-lightbox-panel]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCloseButtons = document.querySelectorAll("[data-lightbox-close]");

const priceStorageKey = "hairByNechamaPrices";
const stylesStorageKey = "hairByNechamaStyles";
const galleryStorageKey = "hairByNechamaGallery";
const galleryDbName = "hairByNechamaGalleryDb";
const galleryStoreName = "photos";
const bookingStorageKey = "hairByNechamaBookings";
const availabilityStorageKey = "hairByNechamaAvailability";
const adminPasswordStorageKey = "hairByNechamaAdminPassword";
const contactStorageKey = "hairByNechamaContactDetails";
const defaultContactDetails = {
  phone: "+44 7385 034659",
  email: "nechamabrenig@gmail.com",
};
const legacyContactEmailTypo = "nechmaabrenig@gmail.com";
const defaultAdminPassword = "nechama123";
const defaultStyles = [
  { id: "styling", name: "Styling", price: "Price on request" },
  { id: "cutting", name: "Cutting", price: "Price on request" },
  { id: "wigs", name: "Wig styling", price: "Price on request" },
];
const defaultRegularTimes = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30"];
const defaultWorkingDays = {
  0: false,
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: false,
};
const weekdayOptions = [
  { day: 1, label: "Mon" },
  { day: 2, label: "Tue" },
  { day: 3, label: "Wed" },
  { day: 4, label: "Thu" },
  { day: 5, label: "Fri" },
  { day: 6, label: "Sat" },
  { day: 0, label: "Sun" },
];
const adminSettingMeta = [
  { key: "contact", title: "Contact details" },
  { key: "prices", title: "Styles and prices" },
  { key: "gallery", title: "Gallery photos" },
  { key: "bookings", title: "Bookings calendar" },
];

const getDefaultRegularTimesByDay = () =>
  weekdayOptions.reduce((timesByDay, option) => {
    timesByDay[option.day] = defaultWorkingDays[option.day] ? defaultRegularTimes : [];
    return timesByDay;
  }, {});
const today = new Date();
let visibleMonth = new Date(today.getFullYear(), today.getMonth(), 1);
let selectedDate = "";
let selectedTime = "";
let adminVisibleMonth = new Date(today.getFullYear(), today.getMonth(), 1);
let adminSelectedDate = "";
let adminSelectedDateTime = "";
let adminLoggedIn = false;
const approvalSearchParams = new URLSearchParams(window.location.search);
const approvalBookingId = approvalSearchParams.get("approve");

const readJson = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
};

const saveJson = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

const getAdminPassword = () => localStorage.getItem(adminPasswordStorageKey) || defaultAdminPassword;

const setAdminPassword = (password) => {
  try {
    localStorage.setItem(adminPasswordStorageKey, password);
    return true;
  } catch {
    return false;
  }
};

const getContactDetails = () => {
  const savedContact = readJson(contactStorageKey, {});
  const savedEmail = String(savedContact.email || defaultContactDetails.email).trim();

  return {
    phone: String(savedContact.phone || defaultContactDetails.phone).trim(),
    email: savedEmail === legacyContactEmailTypo ? defaultContactDetails.email : savedEmail,
  };
};

const saveContactDetails = (contactDetails) => saveJson(contactStorageKey, contactDetails);

const getPhoneHref = (phone) => `tel:${String(phone).replace(/[^\d+]/g, "")}`;

const renderContactDetails = () => {
  const contactDetails = getContactDetails();

  if (publicPhoneLink) {
    publicPhoneLink.href = getPhoneHref(contactDetails.phone);
    publicPhoneLink.textContent = `Text or call: ${contactDetails.phone}`;
  }

  if (publicEmailLink) {
    publicEmailLink.href = `mailto:${contactDetails.email}`;
    publicEmailLink.textContent = contactDetails.email;
  }

  if (contactForm) {
    contactForm.elements.phone.value = contactDetails.phone;
    contactForm.elements.email.value = contactDetails.email;
  }
};

const sendWebsiteEmail = async (payload) => {
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok || !result.ok) {
    throw new Error(result.error || "Email could not be sent.");
  }

  return result;
};

const openEmailDraft = (to, subject, body) => {
  window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const getStyles = () => {
  const savedStyles = readJson(stylesStorageKey, null);

  if (Array.isArray(savedStyles) && savedStyles.length) {
    return savedStyles;
  }

  const legacyPrices = readJson(priceStorageKey, {});
  return defaultStyles.map((style) => ({
    ...style,
    price: legacyPrices[style.id] || style.price,
  }));
};

const saveStyles = (styles) => {
  return saveJson(stylesStorageKey, styles);
};

const getServiceChoices = () => [...getStyles(), { id: "not-sure", name: "Not sure yet", price: "" }];

const renderServiceQuantityList = (container, choices, prefix) => {
  if (!container) return;

  container.innerHTML = "";
  choices.forEach((style) => {
    const row = document.createElement("label");
    const check = document.createElement("input");
    const name = document.createElement("span");
    const quantity = document.createElement("input");

    row.className = "service-quantity-row";
    row.dataset.serviceRow = "";
    check.type = "checkbox";
    check.value = style.name;
    check.dataset.serviceCheckbox = "";
    check.name = `${prefix}Service`;
    quantity.type = "number";
    quantity.min = "1";
    quantity.step = "1";
    quantity.value = "1";
    quantity.inputMode = "numeric";
    quantity.disabled = true;
    quantity.dataset.serviceQuantity = "";
    quantity.name = `${prefix}Quantity`;
    quantity.setAttribute("aria-label", `${style.name} quantity`);
    name.textContent = style.name;

    row.append(check, name, quantity);
    container.append(row);
  });
};

const resetServiceQuantityList = (container) => {
  if (!container) return;

  container.querySelectorAll("[data-service-row]").forEach((row) => {
    const checkbox = row.querySelector("[data-service-checkbox]");
    const quantity = row.querySelector("[data-service-quantity]");

    if (checkbox) checkbox.checked = false;
    if (quantity) {
      quantity.value = "1";
      quantity.disabled = true;
    }
  });
};

const collectSelectedServices = (container) => {
  if (!container) return [];

  return Array.from(container.querySelectorAll("[data-service-row]"))
    .map((row) => {
      const checkbox = row.querySelector("[data-service-checkbox]");
      const quantityInput = row.querySelector("[data-service-quantity]");

      if (!checkbox || !checkbox.checked) return null;

      const name = String(checkbox.value || "").trim();
      const quantity = Math.max(1, Number.parseInt(quantityInput?.value || "1", 10) || 1);
      return {
        name,
        quantity,
        label: name === "Not sure yet" ? name : `${name} x${quantity}`,
      };
    })
    .filter(Boolean);
};

const updateServiceQuantityState = (event) => {
  const checkbox = event.target.closest("[data-service-checkbox]");
  if (!checkbox) return;

  const row = checkbox.closest("[data-service-row]");
  const quantity = row?.querySelector("[data-service-quantity]");
  if (!quantity) return;

  const isUnsure = checkbox.value === "Not sure yet";
  quantity.disabled = !checkbox.checked || isUnsure;
  if (isUnsure) quantity.value = "1";
};

let galleryCache = readJson(galleryStorageKey, []);
const getGallery = () => galleryCache;

const openGalleryDb = () =>
  new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("IndexedDB is not available."));
      return;
    }

    const request = indexedDB.open(galleryDbName, 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(galleryStoreName)) {
        db.createObjectStore(galleryStoreName, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

const readGalleryFromDb = async () => {
  const db = await openGalleryDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(galleryStoreName, "readonly");
    const store = transaction.objectStore(galleryStoreName);
    const request = store.getAll();

    request.onsuccess = () => {
      db.close();
      resolve(
        request.result.sort((first, second) =>
          String(second.createdAt || second.id).localeCompare(String(first.createdAt || first.id))
        )
      );
    };
    request.onerror = () => {
      db.close();
      reject(request.error);
    };
  });
};

const writeGalleryToDb = async (gallery) => {
  const db = await openGalleryDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(galleryStoreName, "readwrite");
    const store = transaction.objectStore(galleryStoreName);
    store.clear();
    gallery.forEach((item) => store.put(item));

    transaction.oncomplete = () => {
      db.close();
      resolve(true);
    };
    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
};

const loadGallery = async () => {
  const legacyGallery = readJson(galleryStorageKey, []);

  try {
    const savedGallery = await readGalleryFromDb();
    galleryCache = savedGallery.length ? savedGallery : legacyGallery;

    if (!savedGallery.length && legacyGallery.length) {
      await writeGalleryToDb(legacyGallery);
      localStorage.removeItem(galleryStorageKey);
    }
  } catch {
    galleryCache = legacyGallery;
  }
};

const saveGallery = async (gallery) => {
  galleryCache = gallery;

  try {
    await writeGalleryToDb(gallery);
    localStorage.removeItem(galleryStorageKey);
    galleryCache = await readGalleryFromDb();
    return true;
  } catch {
    const saved = saveJson(galleryStorageKey, gallery);
    galleryCache = saved ? readJson(galleryStorageKey, []) : galleryCache;
    return saved;
  }
};
const getBookings = () => readJson(bookingStorageKey, []);

const normalizeTimes = (times) =>
  [...new Set((times || []).map((time) => String(time).trim()).filter((time) => /^\d{2}:\d{2}$/.test(time)))].sort();

const getAvailability = () => {
  const saved = readJson(availabilityStorageKey, {});
  const workingDays = {
    ...defaultWorkingDays,
    ...(saved.workingDays || {}),
  };
  const legacyRegularTimes = normalizeTimes(saved.regularTimes?.length ? saved.regularTimes : defaultRegularTimes);
  const defaultRegularTimesByDay = getDefaultRegularTimesByDay();
  const savedRegularTimesByDay =
    saved.regularTimesByDay && typeof saved.regularTimesByDay === "object" ? saved.regularTimesByDay : {};
  const regularTimesByDay = weekdayOptions.reduce((timesByDay, option) => {
    const dayKey = String(option.day);
    const savedDayTimes = savedRegularTimesByDay[dayKey] || savedRegularTimesByDay[option.day];
    timesByDay[dayKey] = Array.isArray(savedDayTimes)
      ? normalizeTimes(savedDayTimes)
      : normalizeTimes(workingDays[option.day] ? legacyRegularTimes : defaultRegularTimesByDay[option.day]);
    return timesByDay;
  }, {});

  return {
    workingDays,
    regularTimesByDay,
    dateOverrides: saved.dateOverrides && typeof saved.dateOverrides === "object" ? saved.dateOverrides : {},
  };
};

const saveAvailability = (availability) => saveJson(availabilityStorageKey, availability);

const formatDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

adminSelectedDate = formatDateKey(today);

const formatDisplayDate = (dateKey) => {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
};

const getDateFromKey = (dateKey) => {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const getRegularTimesForDate = (dateKey) => {
  const availability = getAvailability();
  const day = getDateFromKey(dateKey).getDay();
  return availability.workingDays[day] ? normalizeTimes(availability.regularTimesByDay[String(day)] || []) : [];
};

const getAvailableTimesForDate = (dateKey) => {
  const availability = getAvailability();
  const override = availability.dateOverrides[dateKey];

  if (override?.closed) return [];
  if (override && Array.isArray(override.times)) return normalizeTimes(override.times);

  return getRegularTimesForDate(dateKey);
};

const getOpenTimesForDate = (dateKey) => {
  const bookedTimes = getBookedTimes(dateKey);
  return getAvailableTimesForDate(dateKey).filter((time) => !bookedTimes.includes(time));
};

const getBookedTimes = (dateKey) =>
  getBookings()
    .filter((booking) => booking.date === dateKey)
    .map((booking) => booking.time);

const getBookingsForDate = (dateKey) =>
  getBookings()
    .filter((booking) => booking.date === dateKey)
    .sort((first, second) => String(first.time).localeCompare(String(second.time)));

const getApprovalLink = (booking) => {
  const approvalUrl = new URL(window.location.href);
  approvalUrl.searchParams.set("approve", booking.id);
  approvalUrl.searchParams.set("date", booking.date || "");
  approvalUrl.searchParams.set("time", booking.time || "");
  approvalUrl.searchParams.set("name", booking.name || "");
  approvalUrl.searchParams.set("email", booking.email || "");
  approvalUrl.searchParams.set("phone", booking.phone || "");
  approvalUrl.searchParams.set("service", booking.service || "");
  approvalUrl.searchParams.set("createdAt", booking.createdAt || new Date().toISOString());
  approvalUrl.hash = "";
  return approvalUrl.toString();
};

const getBookingFromApprovalParams = () => {
  if (!approvalBookingId) return null;

  const date = approvalSearchParams.get("date");
  const time = approvalSearchParams.get("time");
  if (!date || !time) return null;

  return {
    id: approvalBookingId,
    date,
    time,
    name: approvalSearchParams.get("name") || "",
    email: approvalSearchParams.get("email") || "",
    phone: approvalSearchParams.get("phone") || "",
    service: approvalSearchParams.get("service") || "",
    status: "pending",
    createdAt: approvalSearchParams.get("createdAt") || new Date().toISOString(),
  };
};

const ensureLinkedApprovalBooking = () => {
  if (!approvalBookingId) return null;

  const bookings = getBookings();
  const existingBooking = bookings.find((item) => item.id === approvalBookingId);
  if (existingBooking) return existingBooking;

  const linkedBooking = getBookingFromApprovalParams();
  if (!linkedBooking) return null;

  const saved = saveJson(bookingStorageKey, [...bookings, linkedBooking]);
  return saved ? linkedBooking : null;
};

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  header.classList.toggle("menu-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a, button")) {
    nav.classList.remove("is-open");
    header.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

const setAdminSettingOpen = (section, isOpen) => {
  const toggle = section.querySelector("[data-admin-setting-toggle]");
  const body = section.querySelector("[data-admin-setting-body]");
  const icon = toggle?.querySelector("[data-admin-setting-icon]");

  if (!toggle || !body) return;

  section.classList.toggle("is-open", isOpen);
  toggle.setAttribute("aria-expanded", String(isOpen));
  body.hidden = !isOpen;
  if (icon) icon.textContent = isOpen ? "-" : "+";
};

const openAdminSetting = (settingKey) => {
  const section = adminContent.querySelector(`[data-admin-setting="${settingKey}"]`);
  if (section) setAdminSettingOpen(section, true);
};

const setupAdminSettingAccordions = () => {
  const sections = Array.from(adminContent.querySelectorAll(":scope > .admin-upload"));

  sections.forEach((section, index) => {
    if (section.classList.contains("admin-setting")) return;

    const meta = adminSettingMeta[index] || { key: `setting-${index}`, title: "Setting" };
    const heading = section.querySelector(":scope > h3");
    const title = heading?.textContent.trim() || meta.title;
    const toggle = document.createElement("button");
    const titleSpan = document.createElement("span");
    const iconSpan = document.createElement("span");
    const body = document.createElement("div");

    if (heading) heading.remove();

    section.classList.add("admin-setting");
    section.dataset.adminSetting = meta.key;
    toggle.className = "admin-setting-toggle";
    toggle.type = "button";
    toggle.dataset.adminSettingToggle = "";
    toggle.setAttribute("aria-expanded", "false");
    titleSpan.textContent = title;
    iconSpan.dataset.adminSettingIcon = "";
    iconSpan.setAttribute("aria-hidden", "true");
    iconSpan.textContent = "+";
    body.className = "admin-setting-body";
    body.dataset.adminSettingBody = "";
    body.hidden = true;

    while (section.firstChild) {
      body.append(section.firstChild);
    }

    toggle.append(titleSpan, iconSpan);
    section.append(toggle, body);
  });

  const bookingsSection = adminContent.querySelector('[data-admin-setting="bookings"]');
  if (bookingsSection) adminContent.prepend(bookingsSection);
};

const renderStyles = () => {
  const styles = getStyles();

  priceList.innerHTML = "";
  adminStyleList.innerHTML = "";
  if (serviceSelect) serviceSelect.innerHTML = "";
  if (adminBookingServiceSelect) adminBookingServiceSelect.innerHTML = "";
  renderServiceQuantityList(serviceList, getServiceChoices(), "public");
  renderServiceQuantityList(adminBookingServiceList, getServiceChoices(), "admin");

  styles.forEach((style) => {
    const priceItem = document.createElement("div");
    const priceName = document.createElement("strong");
    const priceValue = document.createElement("span");

    priceItem.className = "price-item";
    priceName.textContent = style.name;
    priceValue.textContent = style.price || "Price on request";
    priceItem.append(priceName, priceValue);
    priceList.append(priceItem);

    if (serviceSelect || adminBookingServiceSelect) {
      const serviceOption = document.createElement("option");
      serviceOption.value = style.name;
      serviceOption.textContent = style.name;
      if (serviceSelect) serviceSelect.append(serviceOption);
      if (adminBookingServiceSelect) adminBookingServiceSelect.append(serviceOption.cloneNode(true));
    }

    const adminItem = document.createElement("div");
    const nameLabel = document.createElement("label");
    const priceLabel = document.createElement("label");
    const actions = document.createElement("div");
    const nameInput = document.createElement("input");
    const priceInput = document.createElement("input");
    const deleteButton = document.createElement("button");

    adminItem.className = "admin-style-item";
    adminItem.dataset.styleId = style.id;
    nameLabel.textContent = "Style";
    priceLabel.textContent = "Price";
    nameInput.type = "text";
    nameInput.value = style.name;
    nameInput.dataset.styleName = "";
    priceInput.type = "text";
    priceInput.value = style.price;
    priceInput.dataset.stylePrice = "";
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.dataset.styleDelete = "";
    deleteButton.textContent = "Delete";
    actions.className = "style-actions";

    nameLabel.append(nameInput);
    priceLabel.append(priceInput);
    actions.append(deleteButton);
    adminItem.append(nameLabel, priceLabel, actions);
    adminStyleList.append(adminItem);
  });

  const saveAllButton = document.createElement("button");
  saveAllButton.className = "button primary full save-all-styles";
  saveAllButton.type = "button";
  saveAllButton.dataset.stylesSaveAll = "";
  saveAllButton.textContent = "Save all prices";
  adminStyleList.append(saveAllButton);

  if (serviceSelect || adminBookingServiceSelect) {
    const unsureOption = document.createElement("option");
    unsureOption.value = "Not sure yet";
    unsureOption.textContent = "Not sure yet";
    if (serviceSelect) serviceSelect.append(unsureOption);
    if (adminBookingServiceSelect) adminBookingServiceSelect.append(unsureOption.cloneNode(true));
  }
};

const renderGallery = () => {
  const gallery = getGallery();
  galleryGrid.innerHTML = "";
  adminGalleryList.innerHTML = "";
  emptyGallery.hidden = gallery.length > 0;

  gallery.forEach((item) => {
    const galleryItem = document.createElement("figure");
    const galleryButton = document.createElement("button");
    galleryItem.className = "gallery-item";
    galleryButton.className = "gallery-button";
    galleryButton.type = "button";
    galleryButton.dataset.lightboxSrc = item.src;
    galleryButton.dataset.lightboxAlt = item.name || "Hair by Nechama gallery photo";
    galleryButton.setAttribute("aria-label", "Open gallery image");

    const image = document.createElement("img");
    image.src = item.src;
    image.alt = item.name || "Hair by Nechama gallery photo";
    galleryButton.append(image);
    galleryItem.append(galleryButton);
    galleryGrid.append(galleryItem);

    const adminItem = document.createElement("div");
    const adminImage = document.createElement("img");
    const adminName = document.createElement("span");
    const deleteButton = document.createElement("button");

    adminItem.className = "admin-gallery-item";
    adminImage.src = item.src;
    adminImage.alt = "";
    adminName.textContent = item.name || "Gallery photo";
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.dataset.deleteImage = item.id;
    deleteButton.textContent = "Delete";
    adminItem.append(adminImage, adminName, deleteButton);
    adminGalleryList.append(adminItem);
  });
};

const renderAdminAvailability = () => {
  const availability = getAvailability();
  const selectedOverride = availability.dateOverrides[adminSelectedDate];
  const selectedTimes = getAvailableTimesForDate(adminSelectedDate);
  const selectedBookedTimes = getBookedTimes(adminSelectedDate);
  if (!selectedTimes.includes(adminSelectedDateTime)) adminSelectedDateTime = "";

  adminRegularTimeList.innerHTML = "";
  weekdayOptions.forEach((option) => {
    const row = document.createElement("div");
    const header = document.createElement("div");
    const dayToggle = document.createElement("label");
    const checkbox = document.createElement("input");
    const dayName = document.createElement("span");
    const dayStatus = document.createElement("span");
    const chips = document.createElement("div");
    const form = document.createElement("form");
    const input = document.createElement("input");
    const addButton = document.createElement("button");
    const dayKey = String(option.day);
    const dayTimes = normalizeTimes(availability.regularTimesByDay[dayKey] || []);

    row.className = `weekday-card ${checkbox.checked ? "is-working" : "is-closed"}`;
    header.className = "weekday-time-header";
    dayToggle.className = "weekday-switch";
    checkbox.type = "checkbox";
    checkbox.value = dayKey;
    checkbox.dataset.workingDay = dayKey;
    checkbox.checked = Boolean(availability.workingDays[dayKey]);
    dayName.textContent = option.label;
    dayStatus.className = "weekday-status";
    dayStatus.textContent = checkbox.checked ? "Working" : "Closed";
    chips.className = "weekday-times";
    form.className = "weekday-add-form";
    form.dataset.regularTimeForm = dayKey;
    input.type = "time";
    input.name = "time";
    input.required = true;
    addButton.className = "small-button";
    addButton.type = "submit";
    addButton.setAttribute("aria-label", `Add ${option.label} regular time`);
    addButton.textContent = "Add time";

    dayToggle.append(checkbox, dayName);
    header.append(dayToggle, dayStatus);

    if (!dayTimes.length) {
      const empty = document.createElement("span");
      empty.className = "empty-times";
      empty.textContent = "No regular times";
      chips.append(empty);
    }

    dayTimes.forEach((time) => {
      const chip = document.createElement("span");
      const label = document.createElement("span");
      const removeButton = document.createElement("button");

      chip.className = "admin-time-row";
      label.textContent = time;
      removeButton.type = "button";
      removeButton.dataset.removeRegularTime = time;
      removeButton.dataset.regularDay = dayKey;
      removeButton.setAttribute("aria-label", `Remove ${option.label} regular time ${time}`);
      removeButton.textContent = "x";

      chip.append(label, removeButton);
      chips.append(chip);
    });

    form.append(input, addButton);
    row.append(header, chips, form);
    adminRegularTimeList.append(row);
  });

  adminSelectedDateLabel.textContent = `Times for ${formatDisplayDate(adminSelectedDate)}`;
  adminDateTimeList.innerHTML = "";
  adminDateTimeForm.hidden = true;
  adminDateTimeForm.reset();
  adminDateDeleteSelectedButton.hidden = !adminSelectedDateTime;
  adminDateNotWorkingButton.textContent = selectedOverride?.closed ? "Open" : "Close";

  if (!selectedTimes.length) {
    const empty = document.createElement("span");
    empty.className = "empty-times";
    empty.textContent = selectedOverride?.closed ? "Not working today." : "No times set for this date.";
    adminDateTimeList.append(empty);
    return;
  }

  selectedTimes.forEach((time) => {
    const button = document.createElement("button");
    const isBooked = selectedBookedTimes.includes(time);

    button.className = "time-button admin-date-time-button";
    if (isBooked) button.classList.add("is-booked");
    if (time === adminSelectedDateTime) button.classList.add("is-selected");
    button.type = "button";
    button.dataset.adminDateTime = time;
    button.textContent = isBooked ? `${time} booked` : time;
    adminDateTimeList.append(button);
  });
};

const renderAdminBookings = () => {
  const bookings = getBookings();
  const year = adminVisibleMonth.getFullYear();
  const month = adminVisibleMonth.getMonth();
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);
  const firstWeekday = (monthStart.getDay() + 6) % 7;
  const todayKey = formatDateKey(today);

  adminCalendarLabel.textContent = monthStart.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  adminCalendarGrid.innerHTML = "";

  for (let index = 0; index < firstWeekday; index += 1) {
    const spacer = document.createElement("span");
    spacer.className = "admin-calendar-day is-empty";
    adminCalendarGrid.append(spacer);
  }

  for (let day = 1; day <= monthEnd.getDate(); day += 1) {
    const date = new Date(year, month, day);
    const dateKey = formatDateKey(date);
    const dayButton = document.createElement("button");
    const dayNumber = document.createElement("span");
    const dayBookings = bookings
      .filter((booking) => booking.date === dateKey)
      .sort((first, second) => String(first.time).localeCompare(String(second.time)));
    const pendingCount = dayBookings.filter((booking) => (booking.status || "pending") === "pending").length;
    const confirmedCount = dayBookings.filter((booking) => booking.status === "confirmed").length;
    const bookingPreview = document.createElement("span");

    dayButton.className = "admin-calendar-day";
    dayButton.type = "button";
    dayButton.dataset.adminDate = dateKey;
    dayNumber.className = "admin-calendar-number";
    dayNumber.textContent = day;
    bookingPreview.className = "admin-calendar-bookings";

    if (pendingCount) {
      dayButton.classList.add("has-pending");
    }

    if (confirmedCount) {
      dayButton.classList.add("has-confirmed");
    }

    if (dateKey === todayKey) dayButton.classList.add("is-today");
    if (dateKey === adminSelectedDate) dayButton.classList.add("is-selected");

    dayBookings.slice(0, 2).forEach((booking) => {
      const bookingLabel = document.createElement("span");
      const status = booking.status || "pending";
      const name = booking.name || "Booking";
      bookingLabel.className = `calendar-booking-label ${status}`;
      bookingLabel.textContent = status === "pending" ? `Pending ${booking.time} ${name}` : `${booking.time} ${name}`;
      bookingPreview.append(bookingLabel);
    });

    if (dayBookings.length > 2) {
      const moreLabel = document.createElement("span");
      moreLabel.className = "calendar-booking-label more";
      moreLabel.textContent = `+${dayBookings.length - 2} more`;
      bookingPreview.append(moreLabel);
    }

    dayButton.append(dayNumber, bookingPreview);
    adminCalendarGrid.append(dayButton);
  }

  renderAdminAvailability();

  adminBookingList.innerHTML = "";
  adminBookingsTitle.textContent = `Bookings for ${formatDisplayDate(adminSelectedDate)}`;

  const selectedBookings = getBookingsForDate(adminSelectedDate);
  if (!selectedBookings.length) {
    const empty = document.createElement("span");
    empty.textContent = "No bookings for this date.";
    adminBookingList.append(empty);
    return;
  }

  selectedBookings.forEach((booking) => {
    const status = booking.status || "pending";
    const item = document.createElement("div");
    const details = document.createElement("div");
    const titleRow = document.createElement("div");
    const title = document.createElement("strong");
    const statusBadge = document.createElement("span");
    const meta = document.createElement("span");
    const actions = document.createElement("div");
    const deleteButton = document.createElement("button");

    item.className = `admin-booking-item ${status}`;
    titleRow.className = "booking-title-row";
    title.textContent = `${booking.time} - ${booking.name || "No name"}`;
    statusBadge.className = `status-pill ${status}`;
    statusBadge.textContent = status;
    meta.textContent = `${booking.email || "No email"} - ${booking.phone || "No phone"} - ${booking.service || "No service"}`;
    actions.className = "booking-actions";

    if (status === "pending") {
      const approveButton = document.createElement("button");
      approveButton.className = "small-button approve-button";
      approveButton.type = "button";
      approveButton.dataset.approveBooking = booking.id;
      approveButton.textContent = "Approve";
      actions.append(approveButton);
    }

    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.dataset.deleteBooking = booking.id;
    deleteButton.textContent = "Delete";

    titleRow.append(title, statusBadge);
    details.append(titleRow, meta);
    actions.append(deleteButton);
    item.append(details, actions);
    adminBookingList.append(item);
  });
};

const renderAdminAuthState = () => {
  adminLogin.hidden = adminLoggedIn;
  adminContent.hidden = !adminLoggedIn;
  if (currentPasswordInput) currentPasswordInput.value = getAdminPassword();
};

const openAdmin = () => {
  adminPanel.classList.add("is-open");
  adminPanel.setAttribute("aria-hidden", "false");
  renderAdminAuthState();
};

const closeAdmin = () => {
  adminPanel.classList.remove("is-open");
  adminPanel.setAttribute("aria-hidden", "true");
};

const showLinkedApprovalBooking = () => {
  if (!approvalBookingId) return;

  const booking = ensureLinkedApprovalBooking();
  if (!booking) {
    adminNote.textContent = "The booking from this approval link could not be loaded.";
    return;
  }

  const [year, month] = booking.date.split("-").map(Number);
  adminVisibleMonth = new Date(year, month - 1, 1);
  adminSelectedDate = booking.date;
  openAdminSetting("bookings");
  renderAdminBookings();
  adminNote.textContent =
    (booking.status || "pending") === "confirmed"
      ? "This linked booking is already confirmed."
      : "This booking was loaded from the email link. Review it, then click Approve.";
};

const renderCalendar = () => {
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);
  const firstWeekday = (monthStart.getDay() + 6) % 7;
  const todayKey = formatDateKey(today);

  calendarLabel.textContent = monthStart.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  calendarGrid.innerHTML = "";

  for (let index = 0; index < firstWeekday; index += 1) {
    const spacer = document.createElement("span");
    spacer.className = "calendar-day is-empty";
    calendarGrid.append(spacer);
  }

  for (let day = 1; day <= monthEnd.getDate(); day += 1) {
    const date = new Date(year, month, day);
    const dateKey = formatDateKey(date);
    const dayButton = document.createElement("button");
    const isPast = dateKey < todayKey;
    const hasOpenTimes = getOpenTimesForDate(dateKey).length > 0;

    dayButton.className = "calendar-day";
    dayButton.type = "button";
    dayButton.textContent = day;
    dayButton.dataset.date = dateKey;
    dayButton.disabled = isPast || !hasOpenTimes;

    if (dateKey === todayKey) dayButton.classList.add("is-today");
    if (dateKey === selectedDate) dayButton.classList.add("is-selected");

    calendarGrid.append(dayButton);
  }

  const firstVisibleMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  calendarPrev.disabled = visibleMonth <= firstVisibleMonth;
};

const renderTimes = () => {
  timeGrid.innerHTML = "";
  bookingForm.hidden = true;
  selectedTime = "";
  bookingTimeInput.value = "";

  if (!selectedDate) {
    timePicker.hidden = true;
    return;
  }

  const availableDateTimes = getAvailableTimesForDate(selectedDate);
  const bookedTimes = getBookedTimes(selectedDate);
  timePicker.hidden = false;
  selectedDateLabel.textContent = formatDisplayDate(selectedDate);
  bookingDateInput.value = selectedDate;

  if (!availableDateTimes.length) {
    const empty = document.createElement("span");
    empty.className = "empty-times";
    empty.textContent = "No times available for this date.";
    timeGrid.append(empty);
    return;
  }

  availableDateTimes.forEach((time) => {
    const button = document.createElement("button");
    const isBooked = bookedTimes.includes(time);

    button.className = "time-button";
    button.type = "button";
    button.dataset.time = time;
    button.textContent = isBooked ? `${time} booked` : time;
    button.disabled = isBooked;
    timeGrid.append(button);
  });
};

const openBooking = () => {
  bookingPanel.classList.add("is-open");
  bookingPanel.setAttribute("aria-hidden", "false");
  renderCalendar();
  renderTimes();
};

const closeBooking = () => {
  bookingPanel.classList.remove("is-open");
  bookingPanel.setAttribute("aria-hidden", "true");
};

const openLightbox = (src, alt) => {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightboxPanel.classList.add("is-open");
  lightboxPanel.setAttribute("aria-hidden", "false");
};

const closeLightbox = () => {
  lightboxPanel.classList.remove("is-open");
  lightboxPanel.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  lightboxImage.alt = "";
};

const resizeImage = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        const maxSize = 640;
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);

        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.62));
      };

      image.onerror = reject;
      image.src = reader.result;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const refreshAfterAvailabilityChange = (message) => {
  renderCalendar();
  renderTimes();
  renderAdminBookings();
  adminNote.textContent = message;
};

const saveDateTimes = (dateKey, times, message) => {
  const availability = getAvailability();
  availability.dateOverrides[dateKey] = {
    ...(availability.dateOverrides[dateKey] || {}),
    closed: false,
    times: normalizeTimes(times),
  };

  const saved = saveAvailability(availability);
  if (!saved) {
    adminNote.textContent = "This browser could not save the date times.";
    return;
  }

  refreshAfterAvailabilityChange(message);
};

adminOpenButton.addEventListener("click", openAdmin);
adminCloseButtons.forEach((button) => button.addEventListener("click", closeAdmin));
bookingOpenButtons.forEach((button) => button.addEventListener("click", openBooking));
bookingCloseButtons.forEach((button) => button.addEventListener("click", closeBooking));
if (serviceList) serviceList.addEventListener("change", updateServiceQuantityState);
if (adminBookingServiceList) adminBookingServiceList.addEventListener("change", updateServiceQuantityState);
lightboxCloseButtons.forEach((button) => button.addEventListener("click", closeLightbox));

adminContent.addEventListener("click", (event) => {
  const toggle = event.target.closest("[data-admin-setting-toggle]");
  if (!toggle) return;

  const section = toggle.closest("[data-admin-setting]");
  const isOpen = toggle.getAttribute("aria-expanded") === "true";
  setAdminSettingOpen(section, !isOpen);
});

galleryGrid.addEventListener("click", (event) => {
  const galleryButton = event.target.closest("[data-lightbox-src]");
  if (!galleryButton) return;

  openLightbox(galleryButton.dataset.lightboxSrc, galleryButton.dataset.lightboxAlt);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  closeLightbox();
  closeBooking();
  closeAdmin();
});

calendarPrev.addEventListener("click", () => {
  visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1);
  renderCalendar();
});

calendarNext.addEventListener("click", () => {
  visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1);
  renderCalendar();
});

calendarGrid.addEventListener("click", (event) => {
  const dayButton = event.target.closest("[data-date]");
  if (!dayButton) return;

  selectedDate = dayButton.dataset.date;
  renderCalendar();
  renderTimes();
});

adminCalendarPrev.addEventListener("click", () => {
  adminVisibleMonth = new Date(adminVisibleMonth.getFullYear(), adminVisibleMonth.getMonth() - 1, 1);
  renderAdminBookings();
});

adminCalendarNext.addEventListener("click", () => {
  adminVisibleMonth = new Date(adminVisibleMonth.getFullYear(), adminVisibleMonth.getMonth() + 1, 1);
  renderAdminBookings();
});

adminCalendarGrid.addEventListener("click", (event) => {
  const dayButton = event.target.closest("[data-admin-date]");
  if (!dayButton) return;

  adminSelectedDate = dayButton.dataset.adminDate;
  adminSelectedDateTime = "";
  renderAdminBookings();
});

adminRegularTimeList.addEventListener("change", (event) => {
  const checkbox = event.target.closest("[data-working-day]");
  if (!checkbox) return;

  const availability = getAvailability();
  availability.workingDays[String(checkbox.value)] = checkbox.checked;

  const saved = saveAvailability(availability);
  if (!saved) {
    adminNote.textContent = "This browser could not save the working days.";
    renderAdminBookings();
    return;
  }

  refreshAfterAvailabilityChange("Working days saved.");
});

adminRegularTimeList.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-regular-time-form]");
  if (!form) return;

  event.preventDefault();
  const formData = new FormData(form);
  const time = String(formData.get("time") || "").trim();
  const dayKey = String(form.dataset.regularTimeForm);

  if (!/^\d{2}:\d{2}$/.test(time)) {
    adminNote.textContent = "Enter a valid time.";
    return;
  }

  const availability = getAvailability();
  availability.regularTimesByDay[dayKey] = normalizeTimes([...(availability.regularTimesByDay[dayKey] || []), time]);
  availability.workingDays[dayKey] = true;

  const saved = saveAvailability(availability);
  if (!saved) {
    adminNote.textContent = "This browser could not save the regular time.";
    return;
  }

  form.reset();
  refreshAfterAvailabilityChange("Regular time added.");
});

adminRegularTimeList.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-regular-time]");
  if (!removeButton) return;

  const availability = getAvailability();
  const dayKey = String(removeButton.dataset.regularDay);
  availability.regularTimesByDay[dayKey] = normalizeTimes(availability.regularTimesByDay[dayKey] || []).filter(
    (time) => time !== removeButton.dataset.removeRegularTime
  );

  const saved = saveAvailability(availability);
  if (!saved) {
    adminNote.textContent = "This browser could not remove the regular time.";
    return;
  }

  refreshAfterAvailabilityChange("Regular time removed.");
});

adminDateAddToggle.addEventListener("click", () => {
  adminSelectedDateTime = "";
  renderAdminAvailability();
  adminDateTimeForm.hidden = false;
  adminDateTimeForm.querySelector("input")?.focus();
});

adminDateAddCancel.addEventListener("click", () => {
  adminDateTimeForm.reset();
  adminDateTimeForm.hidden = true;
});

adminDateTimeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(adminDateTimeForm);
  const time = String(formData.get("time") || "").trim();

  if (!/^\d{2}:\d{2}$/.test(time)) {
    adminNote.textContent = "Enter a valid time.";
    return;
  }

  adminSelectedDateTime = "";
  saveDateTimes(adminSelectedDate, [...getAvailableTimesForDate(adminSelectedDate), time], "Time added for this date.");
  adminDateTimeForm.reset();
  adminDateTimeForm.hidden = true;
});

adminDateTimeList.addEventListener("click", (event) => {
  const timeButton = event.target.closest("[data-admin-date-time]");
  if (!timeButton) return;

  adminSelectedDateTime = timeButton.dataset.adminDateTime;
  adminDateTimeForm.reset();
  adminDateTimeForm.hidden = true;
  renderAdminAvailability();
});

adminDateDeleteSelectedButton.addEventListener("click", () => {
  if (!adminSelectedDateTime) {
    adminNote.textContent = "Choose a time to delete.";
    return;
  }

  const timeToRemove = adminSelectedDateTime;
  adminSelectedDateTime = "";
  saveDateTimes(
    adminSelectedDate,
    getAvailableTimesForDate(adminSelectedDate).filter((time) => time !== timeToRemove),
    "Time removed from this date."
  );
});

adminDateNotWorkingButton.addEventListener("click", () => {
  const availability = getAvailability();
  const currentOverride = availability.dateOverrides[adminSelectedDate] || {};
  const isClosed = Boolean(currentOverride.closed);

  availability.dateOverrides[adminSelectedDate] = {
    ...currentOverride,
    closed: !isClosed,
    times: currentOverride.times || getRegularTimesForDate(adminSelectedDate),
  };

  const saved = saveAvailability(availability);
  if (!saved) {
    adminNote.textContent = "This browser could not save the date setting.";
    return;
  }

  adminDateTimeForm.reset();
  adminDateTimeForm.hidden = true;
  adminSelectedDateTime = "";
  refreshAfterAvailabilityChange(isClosed ? "Date reopened." : "Date closed.");
});

timeGrid.addEventListener("click", (event) => {
  const timeButton = event.target.closest("[data-time]");
  if (!timeButton) return;

  selectedTime = timeButton.dataset.time;
  bookingTimeInput.value = selectedTime;
  timeGrid.querySelectorAll(".time-button").forEach((button) => button.classList.remove("is-selected"));
  timeButton.classList.add("is-selected");
  bookingForm.hidden = false;
  formNote.textContent = "";
});

bookingForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!selectedDate || !selectedTime) {
    formNote.textContent = "Choose a date and time first.";
    return;
  }

  if (!getOpenTimesForDate(selectedDate).includes(selectedTime)) {
    formNote.textContent = "That time is no longer available. Choose another time.";
    renderTimes();
    return;
  }

  const formData = new FormData(bookingForm);
  const bookings = getBookings();
  const selectedServices = collectSelectedServices(serviceList);
  if (!selectedServices.length) {
    formNote.textContent = "Choose at least one service.";
    return;
  }

  const bookingDetails = {
    date: selectedDate,
    time: selectedTime,
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    service: selectedServices.map((service) => service.label).join(", "),
    services: selectedServices,
  };

  const bookingRecord = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    ...bookingDetails,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  bookings.push(bookingRecord);

  const bookingSaved = saveJson(bookingStorageKey, bookings);
  const confirmation = "This booking is not confirmed yet. You will receive a confirmation email in the next 24 hours.";
  const emailSubject = `Hair by Nechama booking - ${formatDisplayDate(selectedDate)} at ${selectedTime}`;
  const approvalUrl = getApprovalLink(bookingRecord);
  const emailBody = [
    "New booking request",
    "",
    `Date: ${formatDisplayDate(bookingDetails.date)}`,
    `Time: ${bookingDetails.time}`,
    `Name: ${bookingDetails.name}`,
    `Email: ${bookingDetails.email}`,
    `Phone: ${bookingDetails.phone}`,
    `Services: ${bookingDetails.service}`,
    "",
    `Approve on the website: ${approvalUrl}`,
  ].join("\n");

  bookingForm.reset();
  resetServiceQuantityList(serviceList);
  renderTimes();
  formNote.textContent = bookingSaved
    ? `${confirmation} Sending email now.`
    : `${confirmation} Sending email now, but this browser could not save the booking locally.`;
  renderAdminBookings();

  try {
    await sendWebsiteEmail({
      type: "booking-request",
      booking: bookingRecord,
      approvalUrl,
    });
    formNote.textContent = `${confirmation} Your request has been emailed and a copy has been sent to you.`;
  } catch (error) {
    console.error(error);
    formNote.textContent = `${confirmation} Automatic email is not ready, so an email draft is opening now.`;
    openEmailDraft(getContactDetails().email, emailSubject, emailBody);
  }
});

adminLoginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(adminLoginForm);
  const password = String(formData.get("password") || "");

  if (password !== getAdminPassword()) {
    adminLoginNote.textContent = "Wrong password.";
    return;
  }

  adminLoggedIn = true;
  adminLoginForm.reset();
  adminLoginNote.textContent = "";
  renderAdminAuthState();
  if (approvalBookingId) {
    showLinkedApprovalBooking();
  } else {
    adminNote.textContent = "Logged in.";
  }
});

passwordToggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.passwordTarget);
    if (!input) return;

    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";
    button.textContent = isPassword ? "Hide" : "Show";
  });
});

passwordResetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const saved = setAdminPassword(defaultAdminPassword);
    adminNote.textContent = saved
      ? `Password reset to ${defaultAdminPassword}.`
      : "This browser could not save the password reset.";
    adminLoginNote.textContent = saved
      ? `Password reset to ${defaultAdminPassword}.`
      : "This browser could not save the password reset.";
    renderAdminAuthState();
  });
});

if (passwordForm) {
  passwordForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(passwordForm);
    const password = String(formData.get("password") || "").trim();

    if (!password) {
      adminNote.textContent = "Enter a new password.";
      return;
    }

    const saved = setAdminPassword(password);
    if (!saved) {
      adminNote.textContent = "This browser could not save the new password.";
      return;
    }

    passwordForm.reset();
    adminNote.textContent = "Password saved.";
    renderAdminAuthState();
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const contactDetails = {
      phone: String(formData.get("phone") || "").trim(),
      email: String(formData.get("email") || "").trim(),
    };

    if (!contactDetails.phone || !contactDetails.email) {
      adminNote.textContent = "Enter a phone number and email.";
      return;
    }

    const saved = saveContactDetails(contactDetails);
    if (!saved) {
      adminNote.textContent = "This browser could not save the contact details.";
      return;
    }

    renderContactDetails();
    adminNote.textContent = "Contact details saved.";
  });
}

if (adminBookingForm) {
  adminBookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(adminBookingForm);
    const date = String(formData.get("date") || "").trim();
    const time = String(formData.get("time") || "").trim();
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const services = collectSelectedServices(adminBookingServiceList);
    const status = String(formData.get("status") || "confirmed").trim();

    if (!date || !time || !name) {
      adminNote.textContent = "Add a date, time, and name.";
      return;
    }

    const nextBooking = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      date,
      time,
      name,
      email,
      phone,
      service: services.length ? services.map((service) => service.label).join(", ") : "Not specified",
      services,
      status: status === "pending" ? "pending" : "confirmed",
      createdAt: new Date().toISOString(),
      createdBy: "admin",
    };

    if (nextBooking.status === "confirmed") {
      nextBooking.confirmedAt = new Date().toISOString();
    }

    const saved = saveJson(bookingStorageKey, [...getBookings(), nextBooking]);
    if (!saved) {
      adminNote.textContent = "This browser could not save the booking.";
      return;
    }

    const [year, month] = date.split("-").map(Number);
    adminVisibleMonth = new Date(year, month - 1, 1);
    adminSelectedDate = date;
    adminBookingForm.reset();
    resetServiceQuantityList(adminBookingServiceList);
    renderCalendar();
    renderTimes();
    renderAdminBookings();
    adminNote.textContent = "Booking added.";
  });
}

styleAddForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(styleAddForm);
  const name = String(formData.get("name") || "").trim();
  const price = String(formData.get("price") || "").trim();

  if (!name || !price) {
    adminNote.textContent = "Add a style name and price.";
    return;
  }

  const styles = getStyles();
  styles.push({
    id: `style-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name,
    price,
  });

  const saved = saveStyles(styles);
  if (!saved) {
    adminNote.textContent = "This browser could not save the style. Try deleting some gallery photos first.";
    return;
  }

  styleAddForm.reset();
  renderStyles();
  adminNote.textContent = "Style added.";
});

adminStyleList.addEventListener("click", (event) => {
  const styles = getStyles();

  if (event.target.closest("[data-styles-save-all]")) {
    const rows = Array.from(adminStyleList.querySelectorAll("[data-style-id]"));
    const nextStyles = rows.map((styleRow) => {
      const originalStyle = styles.find((style) => style.id === styleRow.dataset.styleId);

      return {
        ...(originalStyle || { id: styleRow.dataset.styleId }),
        name: styleRow.querySelector("[data-style-name]").value.trim() || originalStyle?.name || "Style",
        price: styleRow.querySelector("[data-style-price]").value.trim() || "Price on request",
      };
    });

    const saved = saveStyles(nextStyles);
    if (!saved) {
      adminNote.textContent = "This browser could not save the styles. Try deleting some gallery photos first.";
      return;
    }

    renderStyles();
    adminNote.textContent = "Styles and prices saved.";
    return;
  }

  const row = event.target.closest("[data-style-id]");
  if (!row) return;

  if (event.target.closest("[data-style-delete]")) {
    const saved = saveStyles(styles.filter((style) => style.id !== row.dataset.styleId));
    if (!saved) {
      adminNote.textContent = "This browser could not save the change.";
      return;
    }

    renderStyles();
    adminNote.textContent = "Style deleted.";
    return;
  }

});

galleryUpload.addEventListener("change", async (event) => {
  const files = Array.from(event.target.files || []);
  if (!files.length) return;

  adminNote.textContent = "Saving gallery photos...";
  const currentGallery = getGallery();
  const newItems = [];

  try {
    for (const file of files) {
      if (!file.type.startsWith("image/")) continue;
      const src = await resizeImage(file);
      newItems.push({
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        name: file.name,
        src,
        createdAt: new Date().toISOString(),
      });
    }
  } catch {
    adminNote.textContent = "This browser could not read one of those photos.";
    galleryUpload.value = "";
    return;
  }

  const saved = await saveGallery([...newItems, ...currentGallery]);
  galleryUpload.value = "";
  if (!saved) {
    adminNote.textContent = "Those photos could not be saved in this browser. Try uploading fewer photos at once.";
    return;
  }

  renderGallery();
  adminNote.textContent = `${newItems.length} photo${newItems.length === 1 ? "" : "s"} saved to the gallery.`;
});

adminGalleryList.addEventListener("click", async (event) => {
  const deleteButton = event.target.closest("[data-delete-image]");
  if (!deleteButton) return;

  const nextGallery = getGallery().filter((item) => item.id !== deleteButton.dataset.deleteImage);
  const saved = await saveGallery(nextGallery);
  if (!saved) {
    adminNote.textContent = "This browser could not save the gallery change.";
    return;
  }

  renderGallery();
  adminNote.textContent = "Photo removed.";
});

adminBookingList.addEventListener("click", async (event) => {
  const approveButton = event.target.closest("[data-approve-booking]");
  if (approveButton) {
    const bookings = getBookings();
    const booking = bookings.find((item) => item.id === approveButton.dataset.approveBooking);

    if (!booking) {
      adminNote.textContent = "That booking could not be found.";
      return;
    }

    if (!booking.email) {
      adminNote.textContent = "This booking has no customer email.";
      return;
    }

    booking.status = "confirmed";
    booking.confirmedAt = new Date().toISOString();

    const saved = saveJson(bookingStorageKey, bookings);
    if (!saved) {
      adminNote.textContent = "This browser could not save the confirmed booking.";
      return;
    }

    renderTimes();
    renderAdminBookings();
    adminNote.textContent = "Booking confirmed. Sending confirmation email now.";

    const emailSubject = `Hair by Nechama booking confirmed - ${formatDisplayDate(booking.date)} at ${booking.time}`;
    const emailBody = [
      `Hi ${booking.name || ""},`,
      "",
      "Your Hair by Nechama booking is confirmed.",
      "",
      `Date: ${formatDisplayDate(booking.date)}`,
      `Time: ${booking.time}`,
      `Services: ${booking.service || "Not specified"}`,
      "",
      "Thank you,",
      "Hair by Nechama",
    ].join("\n");

    try {
      await sendWebsiteEmail({
        type: "booking-confirmation",
        booking,
      });
      adminNote.textContent = "Booking confirmed and confirmation email sent.";
    } catch (error) {
      console.error(error);
      adminNote.textContent = "Booking confirmed. Automatic email is not ready, so a confirmation draft is opening now.";
      openEmailDraft(booking.email, emailSubject, emailBody);
    }
    return;
  }

  const deleteButton = event.target.closest("[data-delete-booking]");
  if (!deleteButton) return;

  const nextBookings = getBookings().filter((booking) => booking.id !== deleteButton.dataset.deleteBooking);
  const saved = saveJson(bookingStorageKey, nextBookings);
  if (!saved) {
    adminNote.textContent = "This browser could not save the booking change.";
    return;
  }

  renderCalendar();
  renderTimes();
  renderAdminBookings();
  adminNote.textContent = "Booking removed.";
});

setupAdminSettingAccordions();
renderContactDetails();
renderStyles();
renderAdminBookings();

loadGallery().then(() => {
  renderGallery();
});

if (approvalBookingId) {
  openAdmin();
  adminLoginNote.textContent = "Log in to approve the booking from the email.";
  showLinkedApprovalBooking();
}
