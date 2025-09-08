import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { Loader2, Film, Grid2X2 } from "lucide-react";
import { CommandPaletteContext } from "@/contexts/command-context";

export function CommandPaletteProvider({ children }) {
  const [isPaletteOpen, setPaletteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const debounced = useDebounce(searchQuery, 500);
  const navigate = useNavigate();
  const token = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

  // Command/Ctrl+K로 모달 토글
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // 디바운스된 검색어를 URL ?movie에 "쓰기" (모달이 열렸을 때만)
  useEffect(() => {
    if (!isPaletteOpen) return;
    const query = debounced.trim();
    if (query.length >= 2) setSearchParams({ movie: query }, { replace: true });
    else setSearchParams({}, { replace: true });
  }, [debounced, isPaletteOpen, setSearchParams]);

  // 모달이 열리고, 입력이 비어있으면 URL 입력
  useEffect(() => {
    if (!isPaletteOpen) return;
    const urlQuery = (searchParams.get("movie") ?? "").trim();

    if (urlQuery && searchQuery === "") {
      setSearchQuery(urlQuery);
    }
  }, [isPaletteOpen, searchParams, searchQuery]);

  // 디바운스된 값으로 TMDB API 검색 (모달이 열려 있을 때만)
  useEffect(() => {
    const query = debounced.trim();
    // 검색어가 너무 짧거나 모달이 닫혀 있으면 결과 초기화
    if (!isPaletteOpen || !token || query.length < 2) {
      setMovies([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        query
      )}&language=ko-KR&page=1&include_adult=false`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      // 요청 성공
      .then((res) => res.json())
      .then((data) => {
        const items = (data?.results ?? [])
          .filter((m) => m && m.adult === false)
          .slice(0, 10)
          .map((m) => ({
            id: m.id,
            title: m.title ?? m.original_title ?? "",
          }));
        setMovies(items);
      })

      // 실패 시 빈 배열
      .catch(() => {
        setMovies([]);
      })

      // 성공/실패 관계없이 무조건 실행
      .finally(() => {
        setLoading(false);
      });
  }, [debounced, isPaletteOpen, token]);

  // 전체 결과 페이지로 이동
  const openCardView = () => {
    const q = (searchQuery || "").trim();
    if (q.length < 2) return;
    setPaletteOpen(false);
    navigate(`/search?movie=${encodeURIComponent(q)}`);
    setSearchQuery("");
    setMovies([]);
  };

  // 영화 검색 결과 클릭 시 상세페이지 이동
  const navigateToMovie = (id) => {
    setPaletteOpen(false);
    navigate(`/details/${id}`);
    setSearchQuery("");
    setMovies([]);
  };

  // 모달 제어 함수를 Context 값으로 제공
  // 하위 컴포넌트에서 useCommandPalette()로 열기/닫기/토글/초기 검색어 설정 가능
  const ctxValue = useMemo(
    () => ({
      isOpen: isPaletteOpen,
      open: (initialQuery = "") => {
        setSearchQuery(initialQuery);
        setPaletteOpen(true);
      },
      close: () => setPaletteOpen(false),
      toggle: () => setPaletteOpen((v) => !v),
    }),
    [isPaletteOpen]
  );

  return (
    <CommandPaletteContext.Provider value={ctxValue}>
      <CommandDialog
        open={isPaletteOpen}
        onOpenChange={(open) => {
          setPaletteOpen(open);
          if (!open) {
            setSearchQuery("");
            setMovies([]);
          }
        }}
        shouldFilter={false}
      >
        <div id="command-palette">
          <CommandInput
            value={searchQuery}
            onValueChange={setSearchQuery}
            placeholder="영화 제목 검색"
          />
          <CommandList>
            {searchQuery.trim().length >= 2 && (
              <CommandGroup heading="전체 결과">
                <CommandItem
                  value={`list-view-${searchQuery}`}
                  onSelect={openCardView}
                >
                  <Grid2X2 className="mr-2 h-4 w-4" />
                  <span className="truncate">
                    {searchQuery.trim()} 관련 영화 전체 보기
                  </span>
                </CommandItem>
              </CommandGroup>
            )}

            {/* 로딩 */}
            {loading && (
              <div className="flex items-center gap-2 p-3 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                {searchQuery.trim()} 검색 중…
              </div>
            )}

            {/* 빈 상태 */}
            {!loading && movies.length === 0 && (
              <CommandEmpty>
                {searchQuery.trim() ? (
                  <>“{searchQuery.trim()}”에 대한 검색 결과가 없습니다.</>
                ) : (
                  "영화 제목을 입력해 주세요."
                )}
              </CommandEmpty>
            )}

            {!loading && movies.length > 0 && (
              <CommandGroup heading="영화 검색 결과">
                {movies.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.title}
                    onSelect={() => navigateToMovie(item.id)}
                  >
                    <Film className="mr-2 h-4 w-4" />
                    <span className="truncate">{item.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </div>
      </CommandDialog>
      {children}
    </CommandPaletteContext.Provider>
  );
}
