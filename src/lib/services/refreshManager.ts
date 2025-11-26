let isRefreshing = false;

type QueueItem = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

let queue: QueueItem[] = [];

export const refreshManager = {
  isRefreshing() {
    return isRefreshing;
  },

  enqueue(resolve: (token: string) => void, reject: (error: unknown) => void) {
    queue.push({ resolve, reject });
  },

  async refresh(refreshFn: () => Promise<string>) {
    isRefreshing = true;

    try {
      const newToken = await refreshFn();

      // 대기 중인 요청들 모두 성공 처리
      queue.forEach((item) => item.resolve(newToken));
      queue = [];

      return newToken;
    } catch (error) {
      // 대기 중인 요청들 모두 실패 처리
      queue.forEach((item) => item.reject(error));
      queue = [];
      throw error;
    } finally {
      isRefreshing = false;
    }
  },
};
