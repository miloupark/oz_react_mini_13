import { useCommandPalette } from "@/contexts/command-context";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function SearchTrigger({
  placeholder = "영화 제목 검색",
  defaultQuery = "",
}) {
  // 모달 열기 함수, 상태 받아오기
  const { open, isOpen } = useCommandPalette();
  const [params] = useSearchParams();

  // URL에서 현재 검색어 읽음 (?movie=...)
  const urlQuery = (params.get("movie") ?? "").trim();

  // 버튼 라벨: URL 검색어가 있으면 그걸 표시, 없으면 placeholder
  const label = urlQuery || placeholder;

  // 모달 열기: URL 검색어가 있으면 그걸 초기값으로 전달
  const handleOpen = () => {
    const initial = urlQuery || defaultQuery;
    open(initial);
  };

  return (
    <button
      type="button"
      onClick={handleOpen}
      aria-label="검색 열기"
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls="command-palette"
      className="flex h-10 w-[320px] items-center gap-2 rounded-md border px-3 text-sm text-muted-foreground bg-background hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring/40"
    >
      <Search className="h-4 w-4" />
      <span className="truncate">{label}</span>
      <kbd className="ml-auto rounded bg-muted px-1 text-xs">⌘K</kbd>
    </button>
  );
}
