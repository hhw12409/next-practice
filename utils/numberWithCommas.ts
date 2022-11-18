type Props = string | number;

const numberWithCommas = (x: Props) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default numberWithCommas;
