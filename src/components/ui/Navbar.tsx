import classes from "./Navbar.module.css";
interface Props {
  children: React.ReactNode;
  className?: string,
}
const Navbar: React.FC<Props> = ({ children, className }) => {
  return <div className={`${classes.navBar} ${className}`}>{children}</div>;
};

export default Navbar;
