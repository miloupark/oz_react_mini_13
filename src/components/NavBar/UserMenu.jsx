import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CircleUser } from "lucide-react";

export default function UserMenu({ user, onLogout }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          {user?.avatarUrl ? (
            <Avatar>
              <AvatarImage src={user.avatarUrl} alt={user.name || user.email} />
              <AvatarFallback>
                {(user.name || user.email)?.[0]?.toUpperCase() ?? "U"}
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
        <DropdownMenuLabel className="max-w-64 truncate">
          {user?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile">프로필</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/favorite">나의 취향</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/setting">설정</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
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
