import { Button, ButtonGroup } from "reactstrap";
import { PetShops } from "../data";

type Props = {
  handleClick: (shop: PetShops) => void;
  activeShop: number;
};

const ShopSelector = ({ handleClick, activeShop }: Props) => {
  return (
    <ButtonGroup size="lg">
      {Object.entries(PetShops)
        .filter(([_, value]) => !isNaN(Number(value)))
        .map(([key, value]) => (
          <Button
            key={value}
            id={String(value)}
            type="button"
            color="info"
            outline
            onClick={() => handleClick(Number(value))}
            active={activeShop === value}
          >
            {key}
          </Button>
        ))}
    </ButtonGroup>
  );
};

export default ShopSelector;
