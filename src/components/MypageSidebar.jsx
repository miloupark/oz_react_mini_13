// 🧩 MypageSidebar: 마이페이지 내부 전용 사이드 바
// 사용자 정보를 표시, 프로필/나의취향/설정 등 마이페이지 관련 메뉴 제공
// [TODO] SidebarFooter > Avatar
// - 클릭/hover 시, UserMenu active
// - 모바일은 클릭만 허용

import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from './ui/sidebar';
import { User, ImageIcon, KeyRound, Settings, Heart, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAuth } from '@/contexts/AuthContext';

export function MypageSidebar({ user: userProp }) {
  const { user: supaUser } = useAuth(); // supabase user

  // props로 받은 user가 있으면 우선 사용, 없으면 AuthContext fallback
  const user =
    userProp ??
    (supaUser && {
      name: supaUser.user_metadata?.name ?? null,
      email: supaUser.email ?? null,
      avatarUrl: supaUser.user_metadata?.avatar_url ?? null,
    });

  // 사용자 이름 / 이메일 / 아바타 URL
  const displayName = user?.name || user?.email?.split('@')?.[0] || '사용자';
  const email = user?.email ?? 'no-email@example.com';
  const avatarUrl = user?.avatarUrl ?? undefined;

  // 사이드 메뉴 구성 (라우트 구조 변경 시 이 배열만 수정)
  const items = [
    { to: '/mypage', label: '프로필', icon: User, end: true },
    { to: '/mypage/favorite', label: '나의 취향', icon: Star },
    // { to: '/mypage/avatar', label: '이미지 변경', icon: ImageIcon },
    // { to: '/mypage/password', label: '비밀번호 변경', icon: KeyRound },
    { to: '/mypage/setting', label: '설정', icon: Settings },
  ];

  return (
    // 전역 Navbar: 80px
    <Sidebar className="top-20 h-[calc(100vh-80px)]">
      {/* 상단 title (fix)*/}
      <SidebarHeader>
        <h2 className="text-lg font-semibold">마이페이지</h2>
      </SidebarHeader>

      {/* 메뉴 리스트 (scroll) */}
      <SidebarContent className="overflow-y-auto">
        <nav aria-label="마이페이지 메뉴" className="flex flex-col gap-1">
          {items.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                [
                  'flex items-center gap-2 rounded px-3 py-2 text-sm transition',
                  isActive
                    ? 'bg-muted font-medium'
                    : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                ].join(' ')
              }
            >
              {Icon ? <Icon className="h-4 w-4" /> : null}
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </SidebarContent>

      {/* 유저 프로필 (fix) */}
      <SidebarFooter className="p-3">
        <div className="flex items-center gap-3 rounded-lg border p-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src={avatarUrl} alt={displayName} />
            <AvatarFallback className="text-xs">
              {displayName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{displayName}</p>
            <p className="truncate text-xs text-muted-foreground">{email}</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
