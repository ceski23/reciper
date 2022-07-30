import { renderHook } from '@testing-library/react-hooks';

import { useImageCompression } from 'hooks/useImageCompression';

vi.mock('browser-image-compression', () => ({
  default: (file: File, { onProgress }: {
    onProgress: (val: number) => void
  }) => new Promise((resolve) => {
    let progress = 0;
    let id: NodeJS.Timer;

    const updateProgress = () => {
      onProgress(progress);

      if (progress >= 100) {
        clearInterval(id);
        resolve(file);
      } else {
        progress += 20;
      }
    };

    id = setInterval(updateProgress, 100);
  }),
}));

describe('useImageCompression', () => {
  it('should compress image', async () => {
    vi.useFakeTimers();

    const { result } = renderHook(() => useImageCompression({
      maxSize: Number.POSITIVE_INFINITY,
    }));

    const fileCompression = result.current.compressImage(new File([], 'test.jpg'));

    vi.advanceTimersByTime(1000);

    const file = await fileCompression;
    expect(file.name).toBe('test.jpg');

    vi.useRealTimers();
  });

  it('should update compression progress', async () => {
    vi.useFakeTimers();

    const { result } = renderHook(() => useImageCompression({
      maxSize: Number.POSITIVE_INFINITY,
    }));

    const fileCompression = result.current.compressImage(new File([], 'test.jpg'));
    expect(result.current.progress).toBe(0);

    vi.advanceTimersByTime(500);
    expect(result.current.progress).toBeGreaterThan(0);

    vi.advanceTimersToNextTimer();
    await fileCompression;
    expect(result.current.progress).toBe(100);

    vi.useRealTimers();
  });
});
