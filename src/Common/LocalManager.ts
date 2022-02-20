export default class LocalManager {
  static LOCAL_MEMOS = "local_memos";
  static getLocalMemos(): { [key: string]: Memo } {
    try {
      const item = window.localStorage.getItem(LocalManager.LOCAL_MEMOS);
      return item ? JSON.parse(item) : {};
    } catch (error) {
      console.log(error);
      return {};
    }
  }

  static saveMemosToLocal(memos: { [key: string]: Memo }) {
    window.localStorage.setItem(
      LocalManager.LOCAL_MEMOS,
      JSON.stringify(memos)
    );
  }
}
