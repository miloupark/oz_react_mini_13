import { createContext, useContext } from "react";

// 컨텍스트 생성
export const CommandPaletteContext = createContext(null);

// 컨텍스트 훅
export function useCommandPalette() {
  const commandPalette = useContext(CommandPaletteContext);

  // Provider 없이 쓰면 에러 투척
  if (!commandPalette)
    throw new Error(
      "CommandPaletteProvider로 컴포넌트를 감싸야 useCommandPalette를 사용할 수 있습니다."
    );
  return commandPalette;
}
