export default class LocalManager {
  static MEMOED_CACHE_KEY = "memoed_cache";
  static LOCAL_MEMOS_KEY = "local_memos";
  static getLocalMemos(): { [key: string]: Memo } {
    try {
      const item = window.localStorage.getItem(LocalManager.LOCAL_MEMOS_KEY);
      return item ? JSON.parse(item) : {};
    } catch (error) {
      console.log(error);
      return {};
    }
  }

  static saveMemosToLocal(memos: { [key: string]: Memo }) {
    window.localStorage.setItem(
      LocalManager.LOCAL_MEMOS_KEY,
      JSON.stringify(memos)
    );
  }

  static clear() {
    window.localStorage.removeItem(LocalManager.LOCAL_MEMOS_KEY);
    window.localStorage.removeItem(LocalManager.MEMOED_CACHE_KEY);
  }
}
