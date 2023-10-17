import { Button } from '@components/ui/button';
import { IconProps } from '@radix-ui/react-icons/dist/types';
import { NavigateOptions, useMatch, useNavigate } from 'react-router-dom';

interface Props {
  to: string;
  options?: NavigateOptions;
  name: string;
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
}

export function SidebarItem(props: Props) {
  const navigate = useNavigate();
  const matches = useMatch(props.to) != null;

  const handleClick = () => {
    navigate(props.to, props.options);
  };

  return (
    <Button
      variant={matches ? 'secondary' : 'ghost'}
      className="w-full justify-start"
      onClick={handleClick}
    >
      <props.icon className="mr-2 h-4 w-4" />
      {props.name}
    </Button>
  );
}
