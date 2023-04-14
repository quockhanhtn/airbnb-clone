import classNames from 'classnames';

interface MenuItemProps {
  label: string;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick }) => {
  const classes = classNames('px-4', 'py-3', 'hover:bg-neutral-100', 'transition', 'font-semibold');

  return (
    <div className={classes} onClick={onClick} role="menu">
      {label}
    </div>
  );
};

export default MenuItem;
