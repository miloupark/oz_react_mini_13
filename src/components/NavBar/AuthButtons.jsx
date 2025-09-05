import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

export default function AuthButtons({ ButtonText, LinkDir }) {
  return (
    <>
      <Button variant="outline" asChild>
        <NavLink to={LinkDir}>{ButtonText}</NavLink>
      </Button>
    </>
  );
}
