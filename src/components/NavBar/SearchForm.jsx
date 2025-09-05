import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function SearchForm() {
  return (
    <form className="flex gap-2 items-center">
      <label htmlFor="search" className="sr-only">
        영화 검색
      </label>
      <Input id="search" type="text" placeholder="영화 검색" />
      <Button variant="outline" type="submit">
        <Search />
      </Button>
    </form>
  );
}
