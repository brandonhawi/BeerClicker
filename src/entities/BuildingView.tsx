import { Grid, Menu, Popup } from "semantic-ui-react";
import prettyPrintNumber from "../helpers/prettyPrintNumber";
import "./Building.css";

type Props = {
  className: string;
  canPurchase: boolean;
  purchaseText: string;
  beersPerSecond: number;
  owned: number;
  cost: number;
  description: string;
};

const BuildingView = ({
  className,
  canPurchase,
  purchaseText,
  beersPerSecond,
  owned,
  cost,
  description,
}: Props) => {
  const displayedCost = () => {
    cost = Math.ceil(cost);
    return prettyPrintNumber(cost);
  };
  return (
    <Popup
      trigger={
        <Menu.Item as="a" className={className} disabled={!canPurchase}>
          <Grid.Row>
            <Grid.Column>
              {purchaseText} [{beersPerSecond} beers / second]
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="owned">
            <Grid.Column>Owned: {prettyPrintNumber(owned)}</Grid.Column>
          </Grid.Row>
          <Grid.Row className="cost">
            <Grid.Column>Cost: {displayedCost()}</Grid.Column>
          </Grid.Row>
        </Menu.Item>
      }
      content={description}
      position="right center"
    />
  );
};

export default BuildingView;
