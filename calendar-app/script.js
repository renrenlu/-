const today = startOfDay(new Date());
const reminderStorageKey = "perennial-calendar-reminders-v1";
const themeStorageKey = "perennial-calendar-theme-v1";
let deferredInstallPrompt = null;
const calendarData = window.JX_CALENDAR_DATA || {};
const userStore = new window.JXUserStore();
const officialSources = calendarData.officialSources || {};
const philosophyQuotes = calendarData.philosophyQuotes || [];

const themePresets = {
  rose: {
    name: "玫红模式",
    accent: "#ea5b96",
    glow: "#ffd7e8",
    accentDark: "#b3346d",
    heroStart: "#e55497",
    heroMid: "#eb5b9c",
    heroEnd: "#f06aa6",
    buttonStart: "#ff91c0",
    buttonEnd: "#f774ad",
    buttonShadow: "rgba(244, 106, 165, 0.28)",
    mint: "#f0a8c5",
    gold: "#ffc0d7"
  },
  amber: {
    name: "黑金模式",
    accent: "#d8b15b",
    glow: "#f6e4b8",
    accentDark: "#2a2019",
    heroStart: "#14100d",
    heroMid: "#362617",
    heroEnd: "#d8b15b",
    buttonStart: "#f1cf80",
    buttonEnd: "#d4a84d",
    buttonShadow: "rgba(212, 168, 77, 0.3)",
    mint: "#d1b06e",
    gold: "#f0d69a"
  },
  tiffany: {
    name: "提夫尼蓝模式",
    accent: "#28d2cb",
    glow: "#dffaf7",
    accentDark: "#0f7f7c",
    heroStart: "#18b8b3",
    heroMid: "#36d2cb",
    heroEnd: "#8ef0e8",
    buttonStart: "#83ece4",
    buttonEnd: "#41d1ca",
    buttonShadow: "rgba(65, 209, 202, 0.28)",
    mint: "#75e0da",
    gold: "#aaf6f1"
  }
};

const solarFestivals = calendarData.solarFestivals || [];

const zodiacAnimals = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
const lunarMonthMap = {
  正月: 1,
  二月: 2,
  三月: 3,
  四月: 4,
  五月: 5,
  六月: 6,
  七月: 7,
  八月: 8,
  九月: 9,
  十月: 10,
  冬月: 11,
  十一月: 11,
  腊月: 12,
  十二月: 12
};

const solarTermFormula = [
  { name: "小寒", month: 1, c20: 6.11, c21: 5.4055 },
  { name: "大寒", month: 1, c20: 20.84, c21: 20.12 },
  { name: "立春", month: 2, c20: 4.6295, c21: 3.87 },
  { name: "雨水", month: 2, c20: 19.4599, c21: 18.73 },
  { name: "惊蛰", month: 3, c20: 6.3826, c21: 5.63 },
  { name: "春分", month: 3, c20: 21.4155, c21: 20.646 },
  { name: "清明", month: 4, c20: 5.59, c21: 4.81 },
  { name: "谷雨", month: 4, c20: 20.888, c21: 20.1 },
  { name: "立夏", month: 5, c20: 6.318, c21: 5.52 },
  { name: "小满", month: 5, c20: 21.86, c21: 21.04 },
  { name: "芒种", month: 6, c20: 6.5, c21: 5.678 },
  { name: "夏至", month: 6, c20: 22.2, c21: 21.37 },
  { name: "小暑", month: 7, c20: 7.928, c21: 7.108 },
  { name: "大暑", month: 7, c20: 23.65, c21: 22.83 },
  { name: "立秋", month: 8, c20: 8.35, c21: 7.5 },
  { name: "处暑", month: 8, c20: 23.95, c21: 23.13 },
  { name: "白露", month: 9, c20: 8.44, c21: 7.646 },
  { name: "秋分", month: 9, c20: 23.822, c21: 23.042 },
  { name: "寒露", month: 10, c20: 9.098, c21: 8.318 },
  { name: "霜降", month: 10, c20: 24.218, c21: 23.438 },
  { name: "立冬", month: 11, c20: 8.218, c21: 7.438 },
  { name: "小雪", month: 11, c20: 23.08, c21: 22.36 },
  { name: "大雪", month: 12, c20: 7.9, c21: 7.18 },
  { name: "冬至", month: 12, c20: 22.6, c21: 21.94 }
];

const solarTermMeta = calendarData.solarTermMeta || {};
const holidayPlans = calendarData.holidayPlans || {};

const state = {
  viewYear: today.getFullYear(),
  viewMonth: today.getMonth(),
  selectedDate: today,
  reminders: [],
  schedules: [],
  theme: { preset: "rose" }
};

const dom = {
  jumpTodayButton: document.querySelector("#jumpTodayButton"),
  heroDateText: document.querySelector("#heroDateText"),
  heroLunarText: document.querySelector("#heroLunarText"),
  heroMeta: document.querySelector("#heroMeta"),
  quoteText: document.querySelector("#quoteText"),
  quoteSource: document.querySelector("#quoteSource"),
  installAppButton: document.querySelector("#installAppButton"),
  installHintText: document.querySelector("#installHintText"),
  themeNameText: document.querySelector("#themeNameText"),
  themePresetList: document.querySelector("#themePresetList"),
  dockItems: [...document.querySelectorAll("[data-dock-target]")],
  quickStrip: document.querySelector("#quickStrip"),
  calendarTitle: document.querySelector("#calendarTitle"),
  prevMonthButton: document.querySelector("#prevMonthButton"),
  nextMonthButton: document.querySelector("#nextMonthButton"),
  calendarGrid: document.querySelector("#calendarGrid"),
  selectedDatePill: document.querySelector("#selectedDatePill"),
  selectedDateTitle: document.querySelector("#selectedDateTitle"),
  selectedLunarText: document.querySelector("#selectedLunarText"),
  selectedTags: document.querySelector("#selectedTags"),
  selectedZodiac: document.querySelector("#selectedZodiac"),
  selectedStarSign: document.querySelector("#selectedStarSign"),
  selectedYi: document.querySelector("#selectedYi"),
  selectedJi: document.querySelector("#selectedJi"),
  selectedAdvice: document.querySelector("#selectedAdvice"),
  selectedSchedulePreview: document.querySelector("#selectedSchedulePreview"),
  solarPhaseBadge: document.querySelector("#solarPhaseBadge"),
  solarTermTitle: document.querySelector("#solarTermTitle"),
  solarTermDateText: document.querySelector("#solarTermDateText"),
  solarTermDescription: document.querySelector("#solarTermDescription"),
  solarMetaList: document.querySelector("#solarMetaList"),
  reminderForm: document.querySelector("#reminderForm"),
  reminderTitleInput: document.querySelector("#reminderTitleInput"),
  reminderDateInput: document.querySelector("#reminderDateInput"),
  reminderCountText: document.querySelector("#reminderCountText"),
  reminderList: document.querySelector("#reminderList"),
  scheduleForm: document.querySelector("#scheduleForm"),
  scheduleTitleInput: document.querySelector("#scheduleTitleInput"),
  scheduleDateInput: document.querySelector("#scheduleDateInput"),
  scheduleTimeInput: document.querySelector("#scheduleTimeInput"),
  scheduleNoteInput: document.querySelector("#scheduleNoteInput"),
  scheduleCountText: document.querySelector("#scheduleCountText"),
  scheduleList: document.querySelector("#scheduleList"),
  dateDiffForm: document.querySelector("#dateDiffForm"),
  diffStartInput: document.querySelector("#diffStartInput"),
  diffEndInput: document.querySelector("#diffEndInput"),
  dateDiffResult: document.querySelector("#dateDiffResult"),
  leavePlannerList: document.querySelector("#leavePlannerList"),
  countdownList: document.querySelector("#countdownList"),
  dataCoverageText: document.querySelector("#dataCoverageText"),
  persistenceSummaryText: document.querySelector("#persistenceSummaryText")
};

init().catch((error) => {
  console.error("Calendar app init failed", error);
});

async function init() {
  await hydrateUserState();
  applyThemePreviewOverride();
  applyThemeSettings(state.theme);
  dom.reminderDateInput.value = formatISO(state.selectedDate);
  dom.scheduleDateInput.value = formatISO(state.selectedDate);
  dom.diffStartInput.value = formatISO(today);
  dom.diffEndInput.value = formatISO(addDays(today, 7));

  dom.jumpTodayButton.addEventListener("click", () => {
    state.viewYear = today.getFullYear();
    state.viewMonth = today.getMonth();
    state.selectedDate = today;
    renderAll();
    void persistCalendarView();
    document.querySelector("#calendarSection").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  dom.prevMonthButton.addEventListener("click", () => shiftMonth(-1));
  dom.nextMonthButton.addEventListener("click", () => shiftMonth(1));
  dom.installAppButton.addEventListener("click", handleInstallClick);

  dom.reminderForm.addEventListener("submit", handleReminderSubmit);
  dom.scheduleForm.addEventListener("submit", handleScheduleSubmit);
  dom.dateDiffForm.addEventListener("submit", handleDateDiffSubmit);
  bindThemeControls();
  bindInstallPrompt();
  bindDockNavigation();
  registerServiceWorker();

  renderAll();
}

async function hydrateUserState() {
  await userStore.init();
  await userStore.migrateFromLocalStorage({
    reminderKey: reminderStorageKey,
    themeKey: themeStorageKey
  });

  const [reminders, schedules, themeSetting, viewSetting] = await Promise.all([
    userStore.listReminders(),
    userStore.listSchedules(),
    userStore.getSetting("theme"),
    userStore.getSetting("calendar_view")
  ]);

  state.reminders = reminders.sort((left, right) => left.date.localeCompare(right.date));
  state.schedules = schedules.sort(compareSchedules);
  state.theme = themeSetting?.value?.preset && themePresets[themeSetting.value.preset] ? themeSetting.value : { preset: "rose" };

  if (viewSetting?.value?.selectedDate) {
    const restoredDate = parseISODate(viewSetting.value.selectedDate);
    if (restoredDate) {
      state.selectedDate = restoredDate;
      state.viewYear = Number(viewSetting.value.viewYear) || restoredDate.getFullYear();
      state.viewMonth = Number(viewSetting.value.viewMonth) || restoredDate.getMonth();
    }
  }
}

function applyThemePreviewOverride() {
  const params = new URLSearchParams(window.location.search);
  const preset = params.get("theme");
  if (preset && themePresets[preset]) {
    state.theme = { preset };
  }
}

function renderAll() {
  renderHero();
  renderQuickStrip();
  renderCalendar();
  renderSelectedDetail();
  renderReminders();
  renderSchedules();
  renderLeavePlanner();
  renderCountdowns();
  renderDateDiffResult(getDefaultDateDiffMessage());
  renderDataStatus();
}

function renderHero() {
  const lunar = getLunarInfo(today);
  const festivals = getFestivalNames(today, lunar);
  const holiday = getHolidayInfo(today);
  const currentTerm = getCurrentSolarTerm(today);
  const nextTerm = getNextSolarTerm(today);
  const quote = philosophyQuotes[dayOfYear(today) % philosophyQuotes.length];

  dom.heroDateText.textContent = `${today.getFullYear()}.${pad(today.getMonth() + 1)}.${pad(today.getDate())}`;
  dom.heroLunarText.textContent = `农历${lunar.monthLabel}${lunar.dayLabel} · ${lunar.yearName}年`;
  dom.quoteText.textContent = quote.text;
  dom.quoteSource.textContent = quote.source;

  dom.heroMeta.innerHTML = "";
  [
    `${formatWeekday(today)} · 第 ${getWeekOfYear(today)} 周`,
    `${currentTerm.name}中`,
    nextTerm ? `${nextTerm.name}还有 ${daysBetween(today, nextTerm.date)} 天` : "节气信息已加载"
  ].forEach((text) => {
    const span = document.createElement("span");
    span.textContent = text;
    dom.heroMeta.appendChild(span);
  });

  renderThemeControls();
}

function renderQuickStrip() {
  const items = getQuickStats();
  dom.quickStrip.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "quick-card";
    card.innerHTML = `<strong>${item.value}</strong><p>${item.title}</p><span>${item.note}</span>`;
    dom.quickStrip.appendChild(card);
  });
}

function renderCalendar() {
  const monthDate = new Date(state.viewYear, state.viewMonth, 1);
  dom.calendarTitle.textContent = `${state.viewYear} 年 ${state.viewMonth + 1} 月`;
  dom.calendarGrid.innerHTML = "";

  const firstWeekday = normalizeWeekday(monthDate.getDay());
  const daysInMonth = new Date(state.viewYear, state.viewMonth + 1, 0).getDate();
  const prevMonthDays = new Date(state.viewYear, state.viewMonth, 0).getDate();

  for (let index = 0; index < 42; index += 1) {
    let cellDate;
    let outsideMonth = false;

    if (index < firstWeekday) {
      cellDate = new Date(state.viewYear, state.viewMonth - 1, prevMonthDays - firstWeekday + index + 1);
      outsideMonth = true;
    } else if (index >= firstWeekday + daysInMonth) {
      cellDate = new Date(state.viewYear, state.viewMonth + 1, index - firstWeekday - daysInMonth + 1);
      outsideMonth = true;
    } else {
      cellDate = new Date(state.viewYear, state.viewMonth, index - firstWeekday + 1);
    }

    const date = startOfDay(cellDate);
    const lunar = getLunarInfo(date);
    const holiday = getHolidayInfo(date);
    const festivals = getFestivalNames(date, lunar);
    const solarTerm = getSolarTermForDate(date);
    const reminderCount = countRemindersOnDate(date);
    const scheduleCount = countSchedulesOnDate(date);
    const note = solarTerm || festivals[0] || lunar.dayLabel;

    const button = document.createElement("button");
    button.type = "button";
    button.className = [
      "day-cell",
      outsideMonth ? "is-outside" : "",
      sameDate(date, today) ? "is-today" : "",
      sameDate(date, state.selectedDate) ? "is-selected" : "",
      holiday && !holiday.isMakeup ? "is-holiday" : "",
      holiday && holiday.isMakeup ? "is-makeup" : ""
    ]
      .filter(Boolean)
      .join(" ");
    button.setAttribute("role", "gridcell");
    button.setAttribute("aria-label", `${formatDateTitle(date)}，${note}`);
    button.addEventListener("click", () => {
      selectDate(date, { revealDetail: scheduleCount > 0 });
    });

    const badge = holiday
      ? `<span class="day-badge ${holiday.isMakeup ? "makeup" : "holiday"}">${holiday.isMakeup ? "班" : "休"}</span>`
      : "";
    const reminderDots = reminderCount
      ? `<div class="reminder-markers">${Array.from({ length: Math.min(reminderCount, 3) }, () => "<i></i>").join("")}</div>`
      : "";
    const scheduleDots = scheduleCount
      ? `<div class="schedule-markers">${Array.from({ length: Math.min(scheduleCount, 3) }, () => "<i></i>").join("")}</div>`
      : "";

    button.innerHTML = `
      <div class="day-top">
        <span class="day-number">${date.getDate()}</span>
        ${badge}
      </div>
      <div class="day-label">${lunar.monthDayText}</div>
      <div class="day-note">${note}</div>
      ${reminderDots}
      ${scheduleDots}
    `;
    dom.calendarGrid.appendChild(button);
  }
}

function renderSelectedDetail() {
  const date = state.selectedDate;
  const lunar = getLunarInfo(date);
  const festivals = getFestivalNames(date, lunar);
  const holiday = getHolidayInfo(date);
  const solarTerm = getSolarTermForDate(date);
  const currentTerm = getCurrentSolarTerm(date);
  const nextTerm = getNextSolarTerm(date);
  const yiJi = getLightHuangLi(date);
  const reminders = getRemindersForDate(date);
  const schedules = getSchedulesForDate(date);
  const zodiac = getZodiac(lunar.relatedYear);
  const starSign = getStarSign(date);

  dom.selectedDatePill.textContent = sameDate(date, today) ? "今天" : daysBetween(today, date) > 0 ? `还有 ${daysBetween(today, date)} 天` : `${Math.abs(daysBetween(today, date))} 天前`;
  dom.selectedDateTitle.textContent = formatDateTitle(date);
  dom.selectedLunarText.textContent = `农历${lunar.monthLabel}${lunar.dayLabel} · ${lunar.yearName}年`;
  dom.selectedZodiac.textContent = zodiac;
  dom.selectedStarSign.textContent = starSign;
  dom.selectedYi.textContent = yiJi.yi.join("、");
  dom.selectedJi.textContent = yiJi.ji.join("、");

  const adviceBits = [];
  if (holiday) {
    adviceBits.push(holiday.isMakeup ? `今天是${holiday.name}调休上班日` : `今天处于${holiday.name}假期`);
  }
  if (reminders.length) {
    adviceBits.push(`你有 ${reminders.length} 条提醒需要照顾`);
  }
  if (schedules.length) {
    adviceBits.push(`还有 ${schedules.length} 项个人日程`);
  }
  adviceBits.push(yiJi.advice);
  dom.selectedAdvice.textContent = adviceBits.join("，") + "。";
  dom.scheduleDateInput.value = formatISO(date);
  renderSelectedSchedulePreview(schedules);

  dom.selectedTags.innerHTML = "";
  const tagLabels = [];
  if (solarTerm) {
    tagLabels.push(solarTerm);
  }
  if (holiday) {
    tagLabels.push(holiday.isMakeup ? `调休 · ${holiday.name}` : `放假 · ${holiday.name}`);
  }
  tagLabels.push(...festivals);
  if (!tagLabels.length) {
    tagLabels.push("普通日");
  }
  tagLabels.slice(0, 5).forEach((label) => {
    const span = document.createElement("span");
    span.textContent = label;
    dom.selectedTags.appendChild(span);
  });

  const meta = solarTermMeta[currentTerm.name];
  dom.solarPhaseBadge.textContent = solarTerm ? "今日节气" : "当前节气";
  dom.solarTermTitle.textContent = solarTerm || currentTerm.name;
  dom.solarTermDateText.textContent = solarTerm
    ? `${solarTerm}当天 · ${formatMonthDay(currentTerm.date)}`
    : `当前处于 ${currentTerm.name}，距离 ${nextTerm.name} 还有 ${daysBetween(date, nextTerm.date)} 天`;
  dom.solarTermDescription.textContent = meta.summary;
  dom.solarMetaList.innerHTML = "";
  [meta.habits, meta.cue].forEach((text) => {
    const span = document.createElement("span");
    span.textContent = text;
    dom.solarMetaList.appendChild(span);
  });
}

function renderReminders() {
  const allReminders = [...state.reminders].sort((left, right) => left.date.localeCompare(right.date));
  const selectedReminders = getRemindersForDate(state.selectedDate);

  dom.reminderCountText.textContent = `${allReminders.length} 条`;
  dom.reminderList.innerHTML = "";

  if (!allReminders.length) {
    dom.reminderList.innerHTML = `<div class="empty-state">还没有提醒。可以先加一条生日、缴费日、出发日或自己的纪念日。</div>`;
    return;
  }

  const list = selectedReminders.length ? selectedReminders : allReminders.slice(0, 4);
  list.forEach((item) => {
    const wrapper = document.createElement("div");
    wrapper.className = "reminder-item";
    const days = daysBetween(today, parseISODate(item.date));
    wrapper.innerHTML = `
      <div>
        <strong>${item.title}</strong>
        <p>${item.date}${sameDate(parseISODate(item.date), state.selectedDate) ? " · 当天提醒" : days >= 0 ? ` · 还有 ${days} 天` : ` · 已过 ${Math.abs(days)} 天`}</p>
      </div>
      <button type="button" data-remove-reminder="${item.id}">删除</button>
    `;
    wrapper.querySelector("button").addEventListener("click", async () => {
      await userStore.deleteReminder(item.id);
      state.reminders = state.reminders.filter((entry) => entry.id !== item.id);
      renderCalendar();
      renderSelectedDetail();
      renderReminders();
      renderCountdowns();
      renderDataStatus();
    });
    dom.reminderList.appendChild(wrapper);
  });
}

function renderSchedules() {
  const selectedSchedules = getSchedulesForDate(state.selectedDate);
  const upcomingSchedules = [...state.schedules]
    .filter((item) => daysBetween(today, parseISODate(item.date)) >= 0)
    .sort(compareSchedules)
    .slice(0, 4);

  dom.scheduleCountText.textContent = selectedSchedules.length
    ? `当天 ${selectedSchedules.length} 项 / 全部 ${state.schedules.length} 项`
    : `全部 ${state.schedules.length} 项`;
  dom.scheduleList.innerHTML = "";

  if (!state.schedules.length) {
    dom.scheduleList.innerHTML = `<div class="empty-state">还没有个人日程。可以先记一条会议、出发、体检或家人安排。</div>`;
    return;
  }

  const list = selectedSchedules.length ? selectedSchedules : upcomingSchedules;
  list.forEach((item) => {
    const wrapper = document.createElement("div");
    wrapper.className = `schedule-item${item.done ? " is-done" : ""}`;
    const scheduleDate = parseISODate(item.date);
    const summary = sameDate(scheduleDate, state.selectedDate)
      ? `${item.time || "全天"} · 当天安排`
      : `${item.date}${item.time ? ` ${item.time}` : ""}`;

    wrapper.innerHTML = `
      <button type="button" class="schedule-toggle" aria-label="${item.done ? "标记未完成" : "标记已完成"}">
        ${item.done ? "✓" : ""}
      </button>
      <div class="schedule-copy">
        <strong>${item.title}</strong>
        <p>${summary}</p>
        ${item.note ? `<p>${item.note}</p>` : ""}
      </div>
      <button type="button" class="schedule-remove">删除</button>
    `;

    wrapper.querySelector(".schedule-toggle").addEventListener("click", async () => {
      item.done = !item.done;
      item.updatedAt = new Date().toISOString();
      await userStore.saveSchedule(item);
      state.schedules = [...state.schedules].sort(compareSchedules);
      renderSelectedDetail();
      renderSchedules();
      renderCountdowns();
      renderDataStatus();
    });

    wrapper.querySelector(".schedule-remove").addEventListener("click", async () => {
      await userStore.deleteSchedule(item.id);
      state.schedules = state.schedules.filter((entry) => entry.id !== item.id);
      renderSelectedDetail();
      renderSchedules();
      renderCountdowns();
      renderDataStatus();
    });

    dom.scheduleList.appendChild(wrapper);
  });
}

function renderLeavePlanner() {
  dom.leavePlannerList.innerHTML = "";
  const suggestions = getLeaveSuggestions(state.viewYear);

  if (!suggestions.length) {
    dom.leavePlannerList.innerHTML = `<div class="empty-state">当前只收录了 2025 和 2026 的官方放假调休安排。其它年份仍可查看普通节日和节气信息。</div>`;
    return;
  }

  suggestions.forEach((item) => {
    const card = document.createElement("article");
    card.className = "planner-item";
    card.innerHTML = `
      <strong>${item.name}</strong>
      <div class="summary">${item.summary}</div>
      <p>${item.rangeText}</p>
    `;
    dom.leavePlannerList.appendChild(card);
  });
}

function renderCountdowns() {
  const countdowns = getCountdownItems();
  dom.countdownList.innerHTML = "";
  countdowns.forEach((item) => {
    const card = document.createElement("article");
    card.className = "countdown-card";
    card.innerHTML = `<strong>${item.days}</strong><p>${item.title}</p><p>${item.note}</p>`;
    dom.countdownList.appendChild(card);
  });
}

async function handleReminderSubmit(event) {
  event.preventDefault();
  const title = dom.reminderTitleInput.value.trim();
  const date = dom.reminderDateInput.value;
  if (!title || !date) {
    return;
  }

  const reminder = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title,
    date,
    createdAt: new Date().toISOString()
  };
  await userStore.saveReminder(reminder);
  state.reminders.push(reminder);
  state.reminders.sort((left, right) => left.date.localeCompare(right.date));
  dom.reminderForm.reset();
  dom.reminderDateInput.value = formatISO(state.selectedDate);
  renderCalendar();
  renderSelectedDetail();
  renderReminders();
  renderCountdowns();
  renderDataStatus();
}

async function handleScheduleSubmit(event) {
  event.preventDefault();
  const title = dom.scheduleTitleInput.value.trim();
  const date = dom.scheduleDateInput.value;
  const time = dom.scheduleTimeInput.value;
  const note = dom.scheduleNoteInput.value.trim();
  if (!title || !date) {
    return;
  }

  const schedule = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title,
    date,
    time,
    note,
    done: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  await userStore.saveSchedule(schedule);
  state.schedules.push(schedule);
  state.schedules.sort(compareSchedules);
  dom.scheduleForm.reset();
  const scheduleDate = parseISODate(schedule.date);
  if (scheduleDate) {
    selectDate(scheduleDate, { revealDetail: true });
  } else {
    renderSelectedDetail();
    renderSchedules();
  }
  renderCountdowns();
  renderDataStatus();
}

function handleDateDiffSubmit(event) {
  event.preventDefault();
  const start = parseISODate(dom.diffStartInput.value);
  const end = parseISODate(dom.diffEndInput.value);
  if (!start || !end) {
    return;
  }

  const diff = daysBetween(start, end);
  const abs = Math.abs(diff);
  const direction = diff >= 0 ? "之后" : "之前";
  const result = [
    `${formatMonthDay(end)} 在 ${formatMonthDay(start)} ${direction} ${abs} 天。`,
    diff >= 0
      ? `如果从 ${formatMonthDay(start)} 开始倒数，${formatMonthDay(end)} 会在第 ${abs + 1} 天出现。`
      : `如果反过来看，${formatMonthDay(start)} 在 ${formatMonthDay(end)} 之后 ${abs} 天。`
  ].join(" ");
  renderDateDiffResult(result);
}

async function handleInstallClick() {
  if (!deferredInstallPrompt) {
    setInstallHint("当前设备暂不支持安装入口。");
    return;
  }

  deferredInstallPrompt.prompt();
  const choice = await deferredInstallPrompt.userChoice;
  if (choice.outcome === "accepted") {
    setInstallHint("安装已发起，稍后可从桌面打开。");
  }
  deferredInstallPrompt = null;
  dom.installAppButton.classList.add("is-hidden");
}

function renderDateDiffResult(text) {
  dom.dateDiffResult.textContent = text;
}

function getDefaultDateDiffMessage() {
  const nextHoliday = getNextOfficialHoliday(today);
  if (!nextHoliday) {
    return "先选两个日期试试看，或者用它算离下个重要日子还有多久。";
  }
  return `从今天到下一个法定假期 ${nextHoliday.name} 首日还有 ${daysBetween(today, parseISODate(nextHoliday.start))} 天。`;
}

function shiftMonth(offset) {
  const next = new Date(state.viewYear, state.viewMonth + offset, 1);
  state.viewYear = next.getFullYear();
  state.viewMonth = next.getMonth();
  state.selectedDate = startOfDay(next);
  renderCalendar();
  renderSelectedDetail();
  renderReminders();
  renderSchedules();
  renderLeavePlanner();
  void persistCalendarView();
}

function getQuickStats() {
  const lunar = getLunarInfo(today);
  const nextOfficialHoliday = getNextOfficialHoliday(today);
  const nextSolarTerm = getNextSolarTerm(today);
  const reminderCount = state.reminders.filter((item) => daysBetween(today, parseISODate(item.date)) >= 0).length;
  const todaySchedules = getSchedulesForDate(today).length;

  return [
    {
      value: `${lunar.yearName}年`,
      title: "今日农历",
      note: `${lunar.monthLabel}${lunar.dayLabel} · 属${getZodiac(lunar.relatedYear)}`
    },
    {
      value: nextOfficialHoliday ? `${daysBetween(today, parseISODate(nextOfficialHoliday.start))} 天` : "已载入",
      title: "距离下个法定假期",
      note: nextOfficialHoliday ? `${nextOfficialHoliday.name}从 ${nextOfficialHoliday.start} 开始` : "当前年份暂无官方节假日数据"
    },
    {
      value: `${daysBetween(today, nextSolarTerm.date)} 天`,
      title: "距离下个节气",
      note: `${nextSolarTerm.name} · ${formatMonthDay(nextSolarTerm.date)}`
    },
    {
      value: `${todaySchedules} 项`,
      title: "今日日程",
      note: todaySchedules ? "今天的个人安排已经排进日历里了" : reminderCount ? `还有 ${reminderCount} 条提醒待处理` : "提醒和日程会长期保存在你的设备里"
    }
  ];
}

function getCountdownItems() {
  const items = [];
  const nextTerm = getNextSolarTerm(today);
  items.push({
    title: `下一个节气 · ${nextTerm.name}`,
    days: `${daysBetween(today, nextTerm.date)} 天`,
    note: `${formatMonthDay(nextTerm.date)} 到来`
  });

  const nextHoliday = getNextOfficialHoliday(today);
  if (nextHoliday) {
    items.push({
      title: `下一个法定假期 · ${nextHoliday.name}`,
      days: `${daysBetween(today, parseISODate(nextHoliday.start))} 天`,
      note: `${nextHoliday.start} 开始`
    });
  }

  const reminder = [...state.reminders]
    .filter((item) => daysBetween(today, parseISODate(item.date)) >= 0)
    .sort((left, right) => left.date.localeCompare(right.date))[0];
  if (reminder) {
    items.push({
      title: `最近提醒 · ${reminder.title}`,
      days: `${daysBetween(today, parseISODate(reminder.date))} 天`,
      note: reminder.date
    });
  }

  const schedule = [...state.schedules]
    .filter((item) => !item.done && daysBetween(today, parseISODate(item.date)) >= 0)
    .sort(compareSchedules)[0];
  if (schedule) {
    items.push({
      title: `最近日程 · ${schedule.title}`,
      days: `${daysBetween(today, parseISODate(schedule.date))} 天`,
      note: `${schedule.date}${schedule.time ? ` ${schedule.time}` : ""}`
    });
  }

  const yearEnd = new Date(today.getFullYear(), 11, 31);
  items.push({
    title: `${today.getFullYear()} 还剩`,
    days: `${daysBetween(today, yearEnd)} 天`,
    note: "适合安排还想完成的事"
  });

  return items;
}

function getFestivalNames(date, lunar) {
  const festivals = [];
  solarFestivals.forEach((item) => {
    if (item.month === date.getMonth() + 1 && item.day === date.getDate()) {
      festivals.push(item.name);
    }
  });

  const lunarKey = `${lunar.monthNumber}-${lunar.dayNumber}`;
  const lunarFestivals = {
    "1-1": "春节",
    "1-15": "元宵节",
    "5-5": "端午节",
    "7-7": "七夕",
    "8-15": "中秋节",
    "9-9": "重阳节",
    "12-8": "腊八节",
    "12-23": "北方小年",
    "12-24": "南方小年"
  };
  if (lunarFestivals[lunarKey]) {
    festivals.push(lunarFestivals[lunarKey]);
  }

  if (isLunarNewYearsEve(lunar, date)) {
    festivals.push("除夕");
  }

  return [...new Set(festivals)];
}

function getHolidayInfo(date) {
  const plans = holidayPlans[date.getFullYear()] || [];
  const iso = formatISO(date);

  for (const item of plans) {
    if (iso >= item.start && iso <= item.end) {
      return { name: item.name, isMakeup: false };
    }
    if (item.makeup.includes(iso)) {
      return { name: item.name, isMakeup: true };
    }
  }

  return null;
}

function getNextOfficialHoliday(date) {
  const allPlans = [...(holidayPlans[date.getFullYear()] || []), ...(holidayPlans[date.getFullYear() + 1] || [])];
  return allPlans.find((item) => parseISODate(item.start) >= date) || null;
}

function getLeaveSuggestions(year) {
  const plans = holidayPlans[year] || [];
  return plans.map((item) => buildLeaveSuggestion(item)).filter(Boolean);
}

function buildLeaveSuggestion(plan) {
  const start = parseISODate(plan.start);
  const end = parseISODate(plan.end);
  if (!start || !end) {
    return null;
  }

  const officialDays = daysBetween(start, end) + 1;
  return {
    name: plan.name,
    summary: `法定休假 ${officialDays} 天`,
    rangeText: `${formatMonthDay(start)} - ${formatMonthDay(end)}`
  };
}

function getCurrentSolarTerm(date) {
  const all = [
    ...getSolarTermsForYear(date.getFullYear() - 1),
    ...getSolarTermsForYear(date.getFullYear()),
    ...getSolarTermsForYear(date.getFullYear() + 1)
  ].sort((left, right) => left.date - right.date);

  let current = all[0];
  for (const item of all) {
    if (item.date <= date) {
      current = item;
    } else {
      break;
    }
  }
  return current;
}

function getNextSolarTerm(date) {
  const all = [
    ...getSolarTermsForYear(date.getFullYear()),
    ...getSolarTermsForYear(date.getFullYear() + 1)
  ].sort((left, right) => left.date - right.date);
  return all.find((item) => item.date > date) || all[0];
}

function getSolarTermForDate(date) {
  const iso = formatISO(date);
  const term = getSolarTermsForYear(date.getFullYear()).find((item) => formatISO(item.date) === iso);
  return term ? term.name : "";
}

function getSolarTermsForYear(year) {
  return solarTermFormula.map((item) => ({
    name: item.name,
    date: new Date(year, item.month - 1, getSolarTermDay(year, item))
  }));
}

function getSolarTermDay(year, term) {
  const yearNumber = year % 100;
  const coefficient = year >= 2001 ? term.c21 : term.c20;
  const leapAdjust = term.month <= 2 ? Math.floor((yearNumber - 1) / 4) : Math.floor(yearNumber / 4);
  return Math.floor(yearNumber * 0.2422 + coefficient) - leapAdjust;
}

function getLunarInfo(date) {
  try {
    const formatter = new Intl.DateTimeFormat("zh-Hans-CN-u-ca-chinese", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    const parts = formatter.formatToParts(date);
    const relatedYear = Number(parts.find((part) => part.type === "relatedYear")?.value || date.getFullYear());
    const yearName = parts.find((part) => part.type === "yearName")?.value || "";
    const monthLabel = parts.find((part) => part.type === "month")?.value || "";
    const dayNumber = Number(parts.find((part) => part.type === "day")?.value || 1);
    const monthNumber = lunarMonthMap[monthLabel] || 1;

    return {
      relatedYear,
      yearName,
      monthLabel,
      dayNumber,
      dayLabel: lunarDayLabel(dayNumber),
      monthNumber,
      monthDayText: `${monthLabel}${dayNumber === 1 ? "" : lunarDayLabel(dayNumber)}`
    };
  } catch (error) {
    return {
      relatedYear: date.getFullYear(),
      yearName: "",
      monthLabel: "农历",
      dayNumber: 1,
      dayLabel: "初一",
      monthNumber: 1,
      monthDayText: "农历"
    };
  }
}

function getLightHuangLi(date) {
  const weekdayIndex = normalizeWeekday(date.getDay());
  const monthIndex = date.getMonth();
  const dayIndex = date.getDate() % 5;

  const yiPool = [
    ["整理", "沟通", "复盘"],
    ["推进", "开会", "对账"],
    ["学习", "写作", "做计划"],
    ["拜访", "出行", "运动"],
    ["收尾", "归档", "早睡"]
  ];
  const jiPool = [
    ["拖延", "冲动消费"],
    ["熬夜", "安排过满"],
    ["情绪化回复", "久坐"],
    ["临时加塞", "分心"],
    ["无准备开工", "过量社交"]
  ];
  const advicePool = [
    "适合把精力放在一到两件最重要的事上",
    "今天更适合稳推进，不适合同时开太多线",
    "如果有会议或沟通，提前准备会让今天轻松很多",
    "把零碎任务收掉，会明显提升今晚的松弛感",
    "今天适合做小结和校准，别把节奏拉得过满"
  ];

  return {
    yi: yiPool[(weekdayIndex + dayIndex) % yiPool.length],
    ji: jiPool[(monthIndex + weekdayIndex) % jiPool.length],
    advice: advicePool[(dayOfYear(date) + weekdayIndex) % advicePool.length]
  };
}

function getStarSign(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const boundaries = [
    [1, 20, "水瓶座"],
    [2, 19, "双鱼座"],
    [3, 21, "白羊座"],
    [4, 20, "金牛座"],
    [5, 21, "双子座"],
    [6, 22, "巨蟹座"],
    [7, 23, "狮子座"],
    [8, 23, "处女座"],
    [9, 23, "天秤座"],
    [10, 24, "天蝎座"],
    [11, 23, "射手座"],
    [12, 22, "摩羯座"]
  ];
  for (let index = boundaries.length - 1; index >= 0; index -= 1) {
    const [boundaryMonth, boundaryDay, sign] = boundaries[index];
    if (month > boundaryMonth || (month === boundaryMonth && day >= boundaryDay)) {
      return sign;
    }
  }
  return "摩羯座";
}

function getZodiac(year) {
  return zodiacAnimals[(year - 4 + 1200) % 12];
}

function getWeekOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = daysBetween(startOfDay(start), date);
  return Math.ceil((diff + normalizeWeekday(start.getDay()) + 1) / 7);
}

function getRemindersForDate(date) {
  const iso = formatISO(date);
  return state.reminders.filter((item) => item.date === iso);
}

function countRemindersOnDate(date) {
  return getRemindersForDate(date).length;
}

function countSchedulesOnDate(date) {
  return getSchedulesForDate(date).length;
}

function getSchedulesForDate(date) {
  const iso = formatISO(date);
  return state.schedules.filter((item) => item.date === iso).sort(compareSchedules);
}

function selectDate(date, options = {}) {
  state.selectedDate = startOfDay(date);
  state.viewYear = state.selectedDate.getFullYear();
  state.viewMonth = state.selectedDate.getMonth();
  renderCalendar();
  renderSelectedDetail();
  renderReminders();
  renderSchedules();
  if (options.revealDetail) {
    revealSelectedDetail();
  }
  void persistCalendarView();
}

function revealSelectedDetail() {
  const target = dom.selectedDateTitle?.closest(".focus-card");
  if (!target) {
    return;
  }

  window.setTimeout(() => {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 50);
}

function renderSelectedSchedulePreview(schedules) {
  if (!dom.selectedSchedulePreview) {
    return;
  }

  if (!schedules.length) {
    dom.selectedSchedulePreview.innerHTML = "";
    return;
  }

  const items = schedules
    .slice(0, 3)
    .map(
      (item) => `
        <div class="selected-schedule-item${item.done ? " is-done" : ""}">
          <strong>${item.title}</strong>
          <p>${item.time || "全天"}${item.note ? ` · ${item.note}` : ""}</p>
        </div>
      `
    )
    .join("");

  dom.selectedSchedulePreview.innerHTML = `
    <div class="selected-schedule-head">当日日程</div>
    <div class="selected-schedule-list">${items}</div>
  `;
}

function compareSchedules(left, right) {
  const leftStamp = `${left.date} ${left.time || "99:99"}`;
  const rightStamp = `${right.date} ${right.time || "99:99"}`;
  return leftStamp.localeCompare(rightStamp);
}

function bindThemeControls() {
  dom.themePresetList.querySelectorAll("[data-theme-preset]").forEach((button) => {
    button.addEventListener("click", async () => {
      const presetKey = button.dataset.themePreset;
      const preset = themePresets[presetKey];
      if (!preset) {
        return;
      }
      state.theme = { preset: presetKey };
      applyThemeSettings(state.theme);
      await userStore.setSetting("theme", state.theme);
      renderThemeControls();
      renderDataStatus();
    });
  });
}

function renderDataStatus() {
  if (!dom.dataCoverageText || !dom.persistenceSummaryText) {
    return;
  }

  const sourceYears = Object.keys(holidayPlans)
    .map(Number)
    .sort((left, right) => left - right);
  const holidaySourceCount = officialSources.holidays?.length || 0;
  const storeLabel = userStore.mode === "local" ? "本机兼容保存" : "本机长期保存";
  const themeLabel = themePresets[state.theme.preset]?.name || "玫红模式";

  dom.dataCoverageText.textContent = sourceYears.length
    ? `法定假期已接入 ${sourceYears[0]} - ${sourceYears[sourceYears.length - 1]} 官方安排，节气、农历和常规节日全年可查。`
    : "当前仍可查看公历、农历、节气和常规节日。";

  dom.persistenceSummaryText.textContent = `${storeLabel} · ${state.reminders.length} 条提醒 · ${state.schedules.length} 项日程 · 当前主题 ${themeLabel}${holidaySourceCount ? ` · 已载入 ${holidaySourceCount} 份官方假期通知` : ""}`;
}

async function persistCalendarView() {
  await userStore.setSetting("calendar_view", {
    selectedDate: formatISO(state.selectedDate),
    viewYear: state.viewYear,
    viewMonth: state.viewMonth
  });
}

function setInstallHint(text) {
  if (dom.installHintText) {
    dom.installHintText.textContent = text;
  }
}

function bindInstallPrompt() {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    dom.installAppButton.classList.remove("is-hidden");
    setInstallHint("当前设备支持安装。");
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    dom.installAppButton.classList.add("is-hidden");
    setInstallHint("安装完成，可从桌面打开。");
  });
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {
      setInstallHint("当前页面可正常使用。");
    });
  });
}

function bindDockNavigation() {
  dom.dockItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      const targetId = item.dataset.dockTarget;
      const target = targetId === "top" ? document.querySelector("#top") : document.querySelector(`#${targetId}`);
      if (!target) {
        return;
      }
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveDock(targetId);
    });
  });

  const sections = ["top", "calendarSection", "toolsSection", "notesSection"]
    .map((id) => (id === "top" ? document.querySelector("#top") : document.querySelector(`#${id}`)))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
      if (!visible) {
        return;
      }
      const targetId = visible.target.id || "top";
      setActiveDock(targetId);
    },
    {
      rootMargin: "-30% 0px -45% 0px",
      threshold: [0.2, 0.45, 0.7]
    }
  );

  sections.forEach((section) => observer.observe(section));
}

function setActiveDock(targetId) {
  dom.dockItems.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.dockTarget === targetId);
  });
}

function renderThemeControls() {
  const presetName = themePresets[state.theme.preset]?.name || "玫红模式";
  dom.themeNameText.textContent = presetName;

  dom.themePresetList.querySelectorAll("[data-theme-preset]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.themePreset === state.theme.preset);
  });
}

function applyThemeSettings(theme) {
  const preset = themePresets[theme.preset] || themePresets.rose;
  const accent = normalizeHex(preset.accent);
  const glow = normalizeHex(preset.glow);
  const accentDeep = mixHex(accent, "#ffffff", 0.78);
  const accentSoft = mixHex(accent, "#ffffff", 0.32);
  const accentSoft2 = mixHex(glow, "#ffffff", 0.48);
  const accentDark = preset.accentDark;
  const mint = preset.mint;
  const gold = preset.gold;
  const heroStart = preset.heroStart;
  const heroMid = preset.heroMid;
  const heroEnd = preset.heroEnd;
  const buttonStart = preset.buttonStart || "#ff91c0";
  const buttonEnd = preset.buttonEnd || "#f774ad";
  const buttonShadow = preset.buttonShadow || "rgba(244, 106, 165, 0.28)";

  const root = document.documentElement;
  root.style.setProperty("--accent", accent);
  root.style.setProperty("--accent-deep", accentDeep);
  root.style.setProperty("--accent-soft", accentSoft);
  root.style.setProperty("--accent-soft-2", accentSoft2);
  root.style.setProperty("--accent-dark", accentDark);
  root.style.setProperty("--mint", mint);
  root.style.setProperty("--gold", gold);
  root.style.setProperty("--hero-start", heroStart);
  root.style.setProperty("--hero-mid", heroMid);
  root.style.setProperty("--hero-end", heroEnd);
  root.style.setProperty("--button-start", buttonStart);
  root.style.setProperty("--button-end", buttonEnd);
  root.style.setProperty("--button-shadow", buttonShadow);
  root.style.setProperty("--glow-1", mixHex(glow, "#fff7fb", 0.28));
  root.style.setProperty("--glow-2", mixHex(glow, "#ece8eb", 0.48));
  root.style.setProperty("--glow-3", mixHex(accent, "#fff0f6", 0.7));
}

function normalizeHex(value) {
  if (!value || typeof value !== "string") {
    return "#d998b1";
  }
  return value.startsWith("#") ? value : `#${value}`;
}

function mixHex(colorA, colorB, ratio) {
  const a = hexToRgb(colorA);
  const b = hexToRgb(colorB);
  const weight = Math.max(0, Math.min(1, ratio));
  const mixed = {
    r: Math.round(a.r * weight + b.r * (1 - weight)),
    g: Math.round(a.g * weight + b.g * (1 - weight)),
    b: Math.round(a.b * weight + b.b * (1 - weight))
  };
  return rgbToHex(mixed.r, mixed.g, mixed.b);
}

function hexToRgb(hex) {
  const safeHex = normalizeHex(hex).replace("#", "");
  const normalized = safeHex.length === 3 ? safeHex.split("").map((item) => item + item).join("") : safeHex;
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16)
  };
}

function rgbToHex(red, green, blue) {
  return `#${[red, green, blue].map((item) => item.toString(16).padStart(2, "0")).join("")}`;
}

function isLunarNewYearsEve(lunar, date) {
  if (lunar.monthNumber !== 12) {
    return false;
  }
  const tomorrow = addDays(date, 1);
  const nextLunar = getLunarInfo(tomorrow);
  return nextLunar.monthNumber === 1 && nextLunar.dayNumber === 1;
}

function lunarDayLabel(day) {
  const labels = [
    "",
    "初一",
    "初二",
    "初三",
    "初四",
    "初五",
    "初六",
    "初七",
    "初八",
    "初九",
    "初十",
    "十一",
    "十二",
    "十三",
    "十四",
    "十五",
    "十六",
    "十七",
    "十八",
    "十九",
    "二十",
    "廿一",
    "廿二",
    "廿三",
    "廿四",
    "廿五",
    "廿六",
    "廿七",
    "廿八",
    "廿九",
    "三十"
  ];
  return labels[day] || `${day}`;
}

function formatDateTitle(date) {
  return `${date.getMonth() + 1} 月 ${date.getDate()} 日 ${formatWeekday(date)}`;
}

function formatWeekday(date) {
  return `星期${"日一二三四五六"[date.getDay()]}`;
}

function formatMonthDay(date) {
  return `${date.getMonth() + 1} 月 ${date.getDate()} 日`;
}

function pad(value) {
  return `${value}`.padStart(2, "0");
}

function formatISO(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function parseISODate(value) {
  if (!value) {
    return null;
  }
  return startOfDay(new Date(`${value}T12:00:00`));
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date, amount) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return startOfDay(next);
}

function dayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  return daysBetween(start, date);
}

function daysBetween(start, end) {
  const difference = startOfDay(end).getTime() - startOfDay(start).getTime();
  return Math.round(difference / 86400000);
}

function sameDate(left, right) {
  return formatISO(left) === formatISO(right);
}

function normalizeWeekday(day) {
  return day === 0 ? 6 : day - 1;
}
