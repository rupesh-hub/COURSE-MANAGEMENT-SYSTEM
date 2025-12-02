export class StorageUtils {
  static setItem(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('[StorageUtils] Error setting item:', error);
    }
  }

  static getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('[StorageUtils] Error getting item:', error);
      return null;
    }
  }

  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('[StorageUtils] Error removing item:', error);
    }
  }

  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('[StorageUtils] Error clearing storage:', error);
    }
  }

  static hasItem(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}
