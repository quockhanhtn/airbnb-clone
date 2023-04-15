import classNames from 'classnames';

interface MenuItemProps {
  label: string;
  onClick: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick, setIsOpen }) => {
  const classes = classNames('px-4', 'py-3', 'hover:bg-neutral-100', 'transition', 'font-semibold');

  const handleOnClick = () => {
    onClick();
    setIsOpen(false);
  };

  return (
    <div className={classes} onClick={handleOnClick} role="menu">
      {label}
    </div>
  );
};

export default MenuItem;
