import { useCommandPalette } from '@/contexts/command-context';
import { Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../ui/button';

export default function SearchTrigger({
  placeholder = '영화 제목 검색',
  defaultQuery = '',
}) {
  // 모달 열기 함수, 상태 받아오기
  const { open, isOpen } = useCommandPalette();
  const [params] = useSearchParams();

  // URL에서 현재 검색어 읽음 (?movie=...)
  const urlQuery = (params.get('movie') ?? '').trim();

  // 버튼 라벨: URL 검색어가 있으면 그걸 표시, 없으면 placeholder
  const label = urlQuery || placeholder;

  // 모달 열기: URL 검색어가 있으면 그걸 초기값으로 전달
  const handleOpen = () => {
    const initial = urlQuery || defaultQuery;
    open(initial);
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleOpen}
      aria-label="검색 열기"
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls="command-palette"
      className=" w-10 h-10 sm:w-full
        justify-center sm:justify-start
        gap-2 text-sm"
    >
      <Search className="h-4 w-4" />
      <span className="hidden sm:block truncate text-muted-foreground">
        {label}
      </span>
      <kbd className="hidden sm:inline-flex ml-auto rounded bg-muted px-1 text-xs ">
        ⌘K
      </kbd>
    </Button>
  );
}
