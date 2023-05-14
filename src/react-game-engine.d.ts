declare module "react-game-engine" {
  export type GameEngineProps<EntityType, InputType> = {
    className?: string;
    systems: { (entities: EntityType, { input }: { input: InputType[] }) }[];
    entities: EntityType;
    renderer?: { (entities, screen): void };
    timer?: {};
    running?: boolean;
    onEvent?: { (): void };
    style?: {};
    children?: JSX.Element;
  };

  export function GameEngine<EntityType, InputType>(
    props: GameEngineProps<EntityType, InputType>
  );
}
