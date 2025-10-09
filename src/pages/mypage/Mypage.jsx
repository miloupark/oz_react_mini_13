// [TODO]
// - 프로필 이미지: 디폴트 이미지, 수정하기
// - 비밀번호: 수정하기

import { MypageSidebar } from '@/components/MypageSidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Link, Outlet } from 'react-router-dom';

export default function Mypage() {
  const { user: supaUser } = useAuth();

  const userDefault = {
    name: supaUser?.user_metadata?.name ?? null,
    email: supaUser?.email ?? null,
    avatarUrl: supaUser?.user_metadata?.avatar_url ?? null,
  };

  const displayName =
    userDefault.name || userDefault.email?.split('@')?.[0] || '사용자';
  const email = userDefault.email ?? 'no-email@example.com';

  return (
    <SidebarProvider>
      <MypageSidebar user={userDefault} />

      <SidebarInset className="flex-1 w-full p-4">
        <header className="mb-4 flex items-center justify-between">
          <SidebarTrigger />
          <h1 className="text-base font-semibold"></h1>
        </header>

        <Card className="mx-auto w-full max-w-4xl">
          <CardHeader>
            <CardTitle>내 프로필</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={userDefault.avatarUrl ?? undefined}
                  alt={displayName}
                />
                <AvatarFallback className="text-sm">
                  {displayName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{displayName}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {email}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Button asChild>
              <Link to="/">이미지 수정</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/mypage/password">비밀번호 변경</Link>
            </Button>
          </CardFooter>
        </Card>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
