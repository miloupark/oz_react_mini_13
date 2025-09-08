import { useEffect, useState } from "react";

// 입력값이 바뀔 때마다 delay 후에 업데이트되는 값 반환
export default function useDebounce(value, delay = 1000) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    // delay 시간 후에 debounced 값 업데이트
    const timeoutId = setTimeout(() => setDebounced(value), delay);

    // 다음 입력 전에 기존 타이머 제거 (값 중첩 방지)
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debounced;
}
