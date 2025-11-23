declare module "react-game-engine" {
  export type GameEngineProps<EntityType, InputType> = {
    className?: string;
    systems: { (entities: EntityType, { input }: { input: InputType[] }) }[];
    entities: EntityType;
    renderer?: { (entities, screen): void };
    timer?: object;
    running?: boolean;
    onEvent?: { (): void };
    style?: object;
    children?: JSX.Element;
  };

  export function GameEngine<EntityType, InputType>(
    props: GameEngineProps<EntityType, InputType>
  );
}
