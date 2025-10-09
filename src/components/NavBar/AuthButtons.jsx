import { NavLink } from 'react-router-dom';
import { Button } from '../ui/button';

export default function AuthButtons({ ButtonText, LinkDir, className }) {
  return (
    <>
      <Button variant="outline" asChild className={className}>
        <NavLink to={LinkDir}>{ButtonText}</NavLink>
      </Button>
    </>
  );
}
