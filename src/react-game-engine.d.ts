declare module "react-game-engine" {
  export type GameEngineProps<EntityType> = {
    className?: string;
    systems: { (entities: EntityType, { input: any }?): any }[];
    entities: EntityType;
    renderer?: { (entities, screen): void };
    timer?: {};
    running?: boolean;
    onEvent?: { (): void };
    style?: {};
    children?: JSX.Element;
  };

  export function GameEngine<EntityType>(props: GameEngineProps<EntityType>);
}
