class JXUserStore {
  constructor({ dbName = "jiexu-calendar-db", version = 1 } = {}) {
    this.dbName = dbName;
    this.version = version;
    this.db = null;
    this.mode = "indexeddb";
    this.fallbackKeys = {
      settings: "jiexu-calendar-settings-v1",
      reminders: "jiexu-calendar-reminders-v2",
      schedules: "jiexu-calendar-schedules-v1"
    };
  }

  async init() {
    if (this.db) {
      return this.db;
    }

    if (!window.indexedDB) {
      this.mode = "local";
      return null;
    }

    try {
      this.db = await new Promise((resolve, reject) => {
        const request = window.indexedDB.open(this.dbName, this.version);
        request.onerror = () => reject(request.error);
        request.onupgradeneeded = () => {
          const database = request.result;
          if (!database.objectStoreNames.contains("settings")) {
            database.createObjectStore("settings", { keyPath: "key" });
          }
          if (!database.objectStoreNames.contains("reminders")) {
            database.createObjectStore("reminders", { keyPath: "id" });
          }
          if (!database.objectStoreNames.contains("schedules")) {
            database.createObjectStore("schedules", { keyPath: "id" });
          }
        };
        request.onsuccess = () => resolve(request.result);
      });
    } catch (error) {
      console.warn("IndexedDB unavailable, switched to localStorage fallback.", error);
      this.mode = "local";
      this.db = null;
      return null;
    }

    return this.db;
  }

  async migrateFromLocalStorage({ reminderKey, themeKey }) {
    await this.init();

    const migrated = await this.getSetting("migration_v1");
    if (migrated?.value) {
      return;
    }

    try {
      const reminderRaw = window.localStorage.getItem(reminderKey);
      if (reminderRaw) {
        const reminders = JSON.parse(reminderRaw);
        if (Array.isArray(reminders)) {
          await Promise.all(reminders.map((item) => this.saveReminder(item)));
        }
      }

      const themeRaw = window.localStorage.getItem(themeKey);
      if (themeRaw) {
        const theme = JSON.parse(themeRaw);
        if (theme) {
          await this.setSetting("theme", theme);
        }
      }
    } catch (error) {
      console.warn("Migration skipped", error);
    }

    await this.setSetting("migration_v1", true);
  }

  async getSetting(key) {
    await this.init();
    return this.readOne("settings", key);
  }

  async setSetting(key, value) {
    await this.init();
    return this.writeOne("settings", { key, value });
  }

  async listReminders() {
    await this.init();
    return this.readAll("reminders");
  }

  async saveReminder(reminder) {
    await this.init();
    return this.writeOne("reminders", reminder);
  }

  async deleteReminder(id) {
    await this.init();
    return this.deleteOne("reminders", id);
  }

  async listSchedules() {
    await this.init();
    return this.readAll("schedules");
  }

  async saveSchedule(schedule) {
    await this.init();
    return this.writeOne("schedules", schedule);
  }

  async deleteSchedule(id) {
    await this.init();
    return this.deleteOne("schedules", id);
  }

  async readOne(storeName, key) {
    const db = await this.init();
    if (this.mode === "local") {
      const store = this.readLocalStore(storeName);
      if (storeName === "settings") {
        return store[key] ? { key, value: store[key] } : null;
      }
      return store.find((item) => item.id === key) || null;
    }

    return new Promise((resolve, reject) => {
      const request = db.transaction(storeName, "readonly").objectStore(storeName).get(key);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    });
  }

  async readAll(storeName) {
    const db = await this.init();
    if (this.mode === "local") {
      const store = this.readLocalStore(storeName);
      return Array.isArray(store) ? store : [];
    }

    return new Promise((resolve, reject) => {
      const request = db.transaction(storeName, "readonly").objectStore(storeName).getAll();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  async writeOne(storeName, value) {
    const db = await this.init();
    if (this.mode === "local") {
      if (storeName === "settings") {
        const store = this.readLocalStore(storeName);
        store[value.key] = value.value;
        this.writeLocalStore(storeName, store);
        return value;
      }

      const store = this.readLocalStore(storeName);
      const next = store.filter((item) => item.id !== value.id);
      next.push(value);
      this.writeLocalStore(storeName, next);
      return value;
    }

    return new Promise((resolve, reject) => {
      const request = db.transaction(storeName, "readwrite").objectStore(storeName).put(value);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(value);
    });
  }

  async deleteOne(storeName, key) {
    const db = await this.init();
    if (this.mode === "local") {
      if (storeName === "settings") {
        const store = this.readLocalStore(storeName);
        delete store[key];
        this.writeLocalStore(storeName, store);
        return true;
      }

      const store = this.readLocalStore(storeName).filter((item) => item.id !== key);
      this.writeLocalStore(storeName, store);
      return true;
    }

    return new Promise((resolve, reject) => {
      const request = db.transaction(storeName, "readwrite").objectStore(storeName).delete(key);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(true);
    });
  }

  readLocalStore(storeName) {
    const key = this.fallbackKeys[storeName];
    const fallback = storeName === "settings" ? {} : [];

    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) {
        return fallback;
      }
      const parsed = JSON.parse(raw);
      return parsed ?? fallback;
    } catch (error) {
      console.warn(`Failed to read ${storeName} from localStorage fallback.`, error);
      return fallback;
    }
  }

  writeLocalStore(storeName, value) {
    const key = this.fallbackKeys[storeName];
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

window.JXUserStore = JXUserStore;
