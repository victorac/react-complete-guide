import classes from "./Home.module.css";

interface Props {

}

const Home: React.FC<Props> = ({ }) => {
  return (
    <div className={`${classes.home}`}>
        Home
    </div>
  );
};

export default Home;
