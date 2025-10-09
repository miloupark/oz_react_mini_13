// 🧩 UserMenu: 헤더 우측에 표시되는 사용자 드롭다운 메뉴
// 마이페이지, 나의 취향, 설정 이동 및 로그아웃 기능 제공

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { CircleUser } from 'lucide-react';

export default function UserMenu({ user, onLogout }) {
  return (
    <DropdownMenu>
      {/* 드롭다운 트리거 */}
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          {user?.avatarUrl ? (
            <Avatar>
              <AvatarImage src={user.avatarUrl} alt={user.name || user.email} />
              <AvatarFallback>
                {(user.name || user.email)?.[0]?.toUpperCase() ?? 'U'}
              </AvatarFallback>
            </Avatar>
          ) : (
            <>
              <CircleUser aria-hidden="true" />
              <span className="sr-only">Open user menu</span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {/* 유저 이메일 */}
        <DropdownMenuLabel className="max-w-64 truncate">
          {user?.email}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* 페이지 이동 메뉴 */}
        <DropdownMenuItem asChild>
          <Link to="/mypage">마이페이지</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="mypage/favorite">나의 취향</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="mypage/setting">설정</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* 로그아웃 btn */}
        <DropdownMenuItem
          className="text-destructive"
          onSelect={(e) => {
            e.preventDefault();
            onLogout();
          }}
        >
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
